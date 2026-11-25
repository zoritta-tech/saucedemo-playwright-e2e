import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users, products, customer } from '../test-data/testData';

test('standard user can complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.openCart();

  await expect(page).toHaveURL('/cart.html');
  await expect(cartPage.productName(products.backpack)).toBeVisible();

  await cartPage.checkout();

  await checkoutPage.fillCustomerDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );

  await checkoutPage.continue();

  await expect(page).toHaveURL('/checkout-step-two.html');
  await expect(checkoutPage.summaryProductName(products.backpack)).toBeVisible();
  await expect(checkoutPage.summaryProductQuantity(products.backpack)).toHaveText('1');

  await checkoutPage.finish();

  await expect(checkoutPage.orderConfirmation).toHaveText(
    'Thank you for your order!'
  );
});