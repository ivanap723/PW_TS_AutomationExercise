import { test as base, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { existingUser } from '../utils/testData';
import { secondProduct, thirdProduct } from '../utils/constants';

type UiFixtures = {
	loggedInPage: Page;
	cartWithTwoProductsPage: Page;
};

export const test = base.extend<UiFixtures>({
	loggedInPage: async ({ page }, use) =>
	{
		const loginPage = new LoginPage(page);
		await loginPage.visitLoginPage();
		await loginPage.performLogin(existingUser);
		await use(page);
	},

	cartWithTwoProductsPage: async ({ loggedInPage }, use) =>
	{
		const productsPage = new ProductsPage(loggedInPage);
		await productsPage.productsLink.click();
		await productsPage.addProductToCart(secondProduct, true);
		await productsPage.addProductToCart(thirdProduct, false);
		await use(loggedInPage);
	},
});

export { expect } from '@playwright/test';
