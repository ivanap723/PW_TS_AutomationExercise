import { test, expect } from '../fixtures';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Checkout Page', () =>
{
	let checkoutPage: CheckoutPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ cartWithTwoProductsPage }) =>
	{
		checkoutPage = new CheckoutPage(cartWithTwoProductsPage);
		cartPage = new CartPage(cartWithTwoProductsPage);
		await cartPage.proceedToCheckout.click();
	});

	test("Verify Checkout page elements are visible", async () =>
	{
		
		await checkoutPage.verifyAddressVisible();
		await expect(checkoutPage.reviewOrderHeading).toBeVisible();
		await expect(checkoutPage.item).toBeVisible();
		await expect(checkoutPage.description).toBeVisible();
		await expect(checkoutPage.price).toBeVisible();
		await expect(checkoutPage.quantity).toBeVisible();
		await expect(checkoutPage.total).toBeVisible();
		await checkoutPage.verifyItemsInTable();
	});

	test("Verify total price is calculated correctly", async ({ cartWithTwoProductsPage }) =>
	{
		await checkoutPage.calculateTotalPrice(cartWithTwoProductsPage);
	});

	test("Verify adding a comment works", async ({ cartWithTwoProductsPage, baseURL }) =>
	{
		await expect(checkoutPage.orderMsg).toHaveText('If you would like to add a comment about your order, please write it in the field below.');
		await checkoutPage.textArea.fill('Pack it in wrapping paper, please');
		await checkoutPage.placeOrder.click();
		await expect(cartWithTwoProductsPage).toHaveURL(baseURL + constants.paymentPath);
	});
});
