import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users, products } from '../test-data/testData';

test('standard user can add a product to the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await inventoryPage.addProductToCart(products.backpack);

  await expect(inventoryPage.cartBadge).toHaveText('1');

  await inventoryPage.openCart();

  await expect(page).toHaveURL('/cart.html');
  await expect(cartPage.productName(products.backpack)).toBeVisible();
  await expect(cartPage.productQuantity(products.backpack)).toHaveText('1');
});

test('standard user can remove a product from the cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();

  await expect(page).toHaveURL('/cart.html');
  await expect(cartPage.productName(products.backpack)).toBeVisible();

  await cartPage.removeProduct(products.backpack);

  await expect(cartPage.productName(products.backpack)).toHaveCount(0);
  await expect(inventoryPage.cartBadge).toHaveCount(0);
  await expect(page).toHaveURL('/cart.html');
});