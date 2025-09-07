import { test, expect, type Page } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import { existingUser } from '../../utils/testData';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Checkout Page', () => 
{

	let checkoutPage: CheckoutPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;
	let productsPage: ProductsPage;

	test.beforeEach(async ({ page }) => 
	{
		checkoutPage = new CheckoutPage(page);
		productsPage = new ProductsPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);

		await loginPage.visitLoginPage();
		await loginPage.performLogin(existingUser);
		await productsPage.addProductToCart(constants.secondProduct, true);
		await productsPage.addProductToCart(constants.thirdProduct, false);
		await productsPage.viewCartLink.click(); 
		await cartPage.proceedToCheckout.click();
    
	});

	test("Verify Checkout page elements are visible", async ({page}) => 
	{
		await checkoutPage.verifyAddressVisible(page);

		await expect(checkoutPage.reviewOrderHeading).toBeVisible;
		await expect(checkoutPage.item).toBeVisible;
		await expect(checkoutPage.description).toBeVisible;
		await expect(checkoutPage.price).toBeVisible;
		await expect(checkoutPage.quantity).toBeVisible;
		await expect(checkoutPage.total).toBeVisible;

		await checkoutPage.verifyItemsInTable(page);

	});

	test("Verify total price is calculated correctly", async ({page}) => 
	{

		await checkoutPage.calculateTotalPrice(page);

	});

	test.only("Verify adding a comment works", async ({page}) => 
	{
		await expect(checkoutPage.orderMsg).toHaveText('If you would like to add a comment about your order, please write it in the field below.');
		await checkoutPage.textArea.fill('Pack it in wrapping paper, please');
		await checkoutPage.placeOrder.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/payment');


	});

    
});