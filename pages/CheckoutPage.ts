import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly orderConfirmation: Locator;

  constructor(private readonly page: Page) {
    this.orderConfirmation = page.locator('[data-test="complete-header"]');
  }

  private summaryItem(name: string): Locator {
    return this.page
      .locator('[data-test="checkout-summary-container"] [data-test="inventory-item"]')
      .filter({ has: this.page.getByText(name, { exact: true }) });
  }

  summaryProductName(name: string): Locator {
    return this.summaryItem(name).getByText(name, { exact: true });
  }

  summaryProductQuantity(name: string): Locator {
    return this.summaryItem(name).locator('[data-test="item-quantity"]');
  }

  async fillCustomerDetails(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  async continue() {
    await this.page.locator('[data-test="continue"]').click();
  }

  async finish() {
    await this.page.locator('[data-test="finish"]').click();
  }
}