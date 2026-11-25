import { Locator, Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  private productItem(name: string): Locator {
    return this.page
      .locator('[data-test="cart-list"] [data-test="inventory-item"]')
      .filter({ has: this.page.getByText(name, { exact: true }) });
  }

  productName(name: string): Locator {
    return this.productItem(name).getByText(name, { exact: true });
  }

  productQuantity(name: string): Locator {
    return this.productItem(name).locator('[data-test="item-quantity"]');
  }

  async removeProduct(name: string) {
    await this.productItem(name)
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}