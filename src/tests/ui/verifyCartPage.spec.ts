import { test, expect, type Page } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { existingUser } from '../../utils/testData';
import * as constants from '../../utils/constants';
import { base } from '@faker-js/faker';


test.describe('Tests for verifying Cart Page', () => 
{

	let productsPage: ProductsPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ page }) => 
	{
		productsPage = new ProductsPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);

		await loginPage.visitLoginPage();
		await loginPage.performLogin(existingUser);
		await productsPage.productsLink.click();
    
	});

	test("Add two products to the Cart and verify everything is visible in Cart page", async ({page, baseURL}) => 
	{
               
		await productsPage.addProductToCart(constants.secondProduct, true);
		await productsPage.addProductToCart(constants.thirdProduct, false);

		await expect(page).toHaveURL(baseURL + constants.viewCartPath);
		await expect(cartPage.cartMenu).toBeVisible();
		await cartPage.verifyCartProducts();

	});


	test("Click proceed to checkout and verify you landed on checkout page", async ({page, baseURL}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL(baseURL + constants.viewCartPath);
		await cartPage.proceedToCheckout.click();
		await expect(page).toHaveURL(baseURL + constants.checkoutPath);

	});

	test("Remove products from the cart", async ({page, baseURL}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL(baseURL + constants.viewCartPath);
		await cartPage.removeAllCartProducts();
		await cartPage.clickHereToBuy.click();
		await expect(page).toHaveURL(baseURL + constants.productsPath);

	});    
});