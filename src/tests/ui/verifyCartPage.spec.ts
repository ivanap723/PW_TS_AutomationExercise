import { test, expect } from '../fixtures';
import { ProductsPage } from '../../pages/ProductsPage';
import { CartPage } from '../../pages/CartPage';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Cart Page', () =>
{
	let productsPage: ProductsPage;
	let cartPage: CartPage;

	test.beforeEach(async ({ loggedInPage }) =>
	{
		productsPage = new ProductsPage(loggedInPage);
		cartPage = new CartPage(loggedInPage);
		await productsPage.productsLink.click();
	});

	test("Add two products to the Cart and verify everything is visible in Cart page", async ({ loggedInPage, baseURL }) =>
	{
		await test.step("Add two products to the Cart and verify everything is visible in Cart page", async () =>
		{
			await productsPage.addProductToCart(constants.secondProduct, true);
			await productsPage.addProductToCart(constants.thirdProduct, false);
			await expect(loggedInPage).toHaveURL(baseURL + constants.viewCartPath);
			await expect(cartPage.cartMenu).toBeVisible();
			await cartPage.verifyCartProducts();
		});

		await test.step("Click proceed to checkout and verify you landed on checkout page", async () =>
		{
			await cartPage.cartLink.click();
			await expect(loggedInPage).toHaveURL(baseURL + constants.viewCartPath);
			await cartPage.proceedToCheckout.waitFor({ state: 'visible' });
			await cartPage.proceedToCheckout.click();
			await expect(loggedInPage).toHaveURL(baseURL + constants.checkoutPath);
		});

		await test.step("Remove products from the cart", async () =>
		{
			await cartPage.cartLink.click();
			await expect(loggedInPage).toHaveURL(baseURL + constants.viewCartPath);
			await cartPage.removeAllCartProducts();
			await cartPage.clickHereToBuy.click();
			await expect(loggedInPage).toHaveURL(baseURL + constants.productsPath);
		});
	});
});
