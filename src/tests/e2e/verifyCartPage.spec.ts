import { test, expect, type Page } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { loginPath } from '../../utils/constants';
import { CookiesPopUp } from '../../pages/CookiesPopUp';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Cart Page', () => 
{

	let productsPage: ProductsPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;
	let cookiesPopUp: CookiesPopUp;

	test.beforeEach(async ({ page }) => 
	{
		productsPage = new ProductsPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);
		cookiesPopUp = new CookiesPopUp(page);

		await page.goto(loginPath);
		await cookiesPopUp.clickConsent();
		await loginPage.enterEmail(constants.userEmail);
		await loginPage.enterPassword(constants.userPassword);
		await loginPage.loginButton.click();
		await productsPage.productsLink.click();
    
	});

	test("Add two products to the Cart and verify everything is visible in Cart page", async ({page}) => 
	{
               
		await page.locator('.add-to-cart').first().click();
		await productsPage.continueShoppingButton.click();
		await page.locator('.add-to-cart').nth(2).click();
		await productsPage.viewCartLink.click();

		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await expect(cartPage.cartMenu).toBeVisible();
		await cartPage.verifyCartProducts(page);

	});


	test("Click proceed to checkout and verify you landed on checkout page", async ({page}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await cartPage.proceedToCheckout.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/checkout');

	});

	test.only("Remove products from the cart", async ({page}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await cartPage.removeAllCartProducts(page);
		await cartPage.clickHereToBuy.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/products');

	});    
});