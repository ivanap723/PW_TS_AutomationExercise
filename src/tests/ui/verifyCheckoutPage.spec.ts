import { test, expect, type Page } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import { loginPath } from '../../utils/constants';
import { CookiesPopUp } from '../../pages/CookiesPopUp';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Checkout Page', () => 
{

	let checkoutPage: CheckoutPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;
	let productsPage: ProductsPage;
	let cookiesPopUp: CookiesPopUp;

	test.beforeEach(async ({ page }) => 
	{
		checkoutPage = new CheckoutPage(page);
		productsPage = new ProductsPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);
		cookiesPopUp = new CookiesPopUp(page);

		await page.goto(loginPath); //whole process to get to the checkout page
		await cookiesPopUp.clickConsent();
 
		await loginPage.enterEmail(constants.userEmail); //replace with login method
		await loginPage.enterPassword(constants.userPassword);
		await loginPage.loginButton.click();

		await page.locator('.add-to-cart').first().click(); //create a method for adding multiple items to Cart
		await productsPage.continueShoppingButton.click();
		await page.locator('.add-to-cart').nth(2).click();
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