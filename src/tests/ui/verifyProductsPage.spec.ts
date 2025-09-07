import { test, expect, type Page } from '@playwright/test';
import { ProductsPage } from '../../pages/ProductsPage';
import { CookiesPopUp } from '../../pages/CookiesPopUp';

test.describe('Tests for verifying Products page and Product details', () => 
{

	let productsPage: ProductsPage;
	let cookiesPopUp: CookiesPopUp;

	test.beforeEach(async ({ page }) => 
	{
		productsPage = new ProductsPage(page);
		cookiesPopUp = new CookiesPopUp(page);

		await page.goto('/'); //visits home page
		await cookiesPopUp.clickConsent();
		await productsPage.productsLink.click();
		await expect(page).toHaveURL('https://www.automationexercise.com/products');
		await expect(productsPage.productsTitle).toBeVisible();
    
	});

	test("Verify All Products and first product's detail page", async ({page}) => 
	{
               
		const product = productsPage.productCard;
		const count = await product.count();
		for (let i = 0; i < count; i++) 
		{
			await expect(product.nth(i)).toBeVisible(); //verify all products are visible
		}
	});

	test("Verify Single Product details are visible", async ({page}) => 
	{
        
		await productsPage.productView.click();
		await expect(productsPage.productName).toBeVisible();
		await expect(productsPage.productPrice).toBeVisible();
		await expect(productsPage.productQuantity).toBeVisible();
		await expect(productsPage.addToCartButton).toBeVisible();
		await expect(page).toHaveURL('https://www.automationexercise.com/product_details/1');

	});

	test("Search for a product", async ({page}) => 
	{
               
		await expect(productsPage.searchBar).toBeVisible();
		await expect(productsPage.searchBar).toHaveAttribute('placeholder', 'Search Product');
		await productsPage.searchBar.fill('Frozen Top');
		await productsPage.submitSearch.click();
		await expect(productsPage.productNameOverlay).toContainText('Frozen Top');

	});

	test.only("Add single product to the cart and verify cart modal appeared", async ({page}) => 
	{
               
		await page.locator('.add-to-cart').first().click();
		await expect(productsPage.addedModal).toBeVisible();
		await expect(productsPage.addedModalText).toHaveText('Your product has been added to cart.');
		await expect(productsPage.viewCartLink).toBeVisible();
		await productsPage.continueShoppingButton.click();

	});   
});