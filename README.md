# SauceDemo Playwright E2E

Small end-to-end test automation project for SauceDemo built with Playwright and TypeScript.

## Tech stack

- Playwright
- TypeScript
- Node.js 20 or newer (CI uses Node.js 24)
- Page Object Model

## Test coverage

The automated suite covers:

- successful login
- invalid login
- adding a product to the cart
- removing a product from the cart
- completing checkout

The suite runs against:

- Chromium
- Firefox
- WebKit

## Project structure

```text
pages/
  LoginPage.ts
  InventoryPage.ts
  CartPage.ts
  CheckoutPage.ts

test-data/
  testData.ts

tests/
  login.spec.ts
  cart.spec.ts
  checkout.spec.ts

playwright.config.ts
```

## Installation

Prerequisites:

- Node.js
- npm

Install project dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

On Linux, install the browsers and their system dependencies together:

```bash
npx playwright install --with-deps
```

## Running tests

Run the complete cross-browser test suite:

```bash
npm test
```

Run tests on Chromium only:

```bash
npm run test:chromium
```

Run tests in Playwright UI mode:

```bash
npm run test:ui
```

Open the latest HTML report:

```bash
npm run report
```

## Continuous integration

GitHub Actions runs the full suite on pull requests targeting `main` and on pushes to `main`. If the tests fail, download and extract the `playwright-report` artifact from the workflow run. Open the report with `npx playwright show-report <report-directory>`.

## Design decisions

The project intentionally keeps the framework small and readable.

Page Object Model is used to separate page interactions from test scenarios without introducing unnecessary framework layers.

Stable Playwright locators are preferred, including dedicated `data-test` attributes where available.

Assertions use Playwright web-first assertions instead of arbitrary waits.

Test data is separated from test logic for easier maintenance.

Tests are isolated and can run in parallel.

The base URL is configured centrally in `playwright.config.ts`.

The test suite is configured for Chromium, Firefox, and WebKit.

Git line endings are normalized to LF through `.gitattributes` to support development on Windows and macOS.