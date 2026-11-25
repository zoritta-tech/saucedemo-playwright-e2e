import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async addProductToCart(productName: string) {
    const product = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await product.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}