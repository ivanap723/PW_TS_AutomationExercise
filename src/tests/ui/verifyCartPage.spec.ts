import { test, expect, type Page } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import { LoginPage } from '../../pages/LoginPage';
import { existingUser } from '../../utils/testData';
import * as constants from '../../utils/constants';


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

	test("Add two products to the Cart and verify everything is visible in Cart page", async ({page}) => 
	{
               
		await productsPage.addProductToCart(constants.secondProduct, true);
		await productsPage.addProductToCart(constants.thirdProduct, false);

		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await expect(cartPage.cartMenu).toBeVisible();
		await cartPage.verifyCartProducts();

	});


	test("Click proceed to checkout and verify you landed on checkout page", async ({page}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await cartPage.proceedToCheckout.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/checkout');

	});

	test("Remove products from the cart", async ({page}) => 
	{
               
		await cartPage.cartLink.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
		await cartPage.removeAllCartProducts();
		await cartPage.clickHereToBuy.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/products');

	});    
});