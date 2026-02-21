import { type Locator, type Page } from '@playwright/test';

export class ProductsPage 
{

	//products page
	readonly page: Page; 
	readonly productsLink: Locator;
	readonly productsTitle: Locator;
	readonly productCard: Locator;
	readonly productView: Locator;
	readonly searchBar: Locator;
	readonly submitSearch: Locator;
	readonly productNameOverlay: Locator;
	readonly addToCartOverlay: Locator;

	//added to Cart modal
	readonly addedModal: Locator;
	readonly addedModalText: Locator;
	readonly viewCartLink: Locator;
	readonly continueShoppingButton: Locator;

	//product details page
	readonly productInfo: Locator;
	readonly productName: Locator;
	readonly productPrice: Locator;
	readonly productQuantity: Locator;




	constructor(page: Page) 
	{

		this.page = page;
		this.productsLink = page.getByRole('link', { name: 'Products' });
		this.productsTitle = page.getByText('All Products');
		this.productCard = page.locator('div.col-sm-4');
		this.productView = page.locator('a[href="/product_details/1"]');
		this.productInfo = page.locator('.product-information');
		this.productName = this.productInfo.locator('h2');
		this.productPrice = this.productInfo.locator('span span');
		this.productQuantity = this.productInfo.locator('label');
		this.searchBar = page.locator('#search_product');
		this.submitSearch = page.locator('#submit_search');
		this.productNameOverlay = page.locator('.overlay-content p');
		this.addToCartOverlay = page.locator('.add-to-cart');
		this.addedModal = page.locator('h4.modal-title.w-100');
		this.addedModalText = (page.locator('p.text-center', { hasText: 'added to cart' }));
		this.viewCartLink = page.locator('a, button').filter({ hasText: /View Cart/i });
		this.continueShoppingButton = page.locator('a, button').filter({ hasText: /Continue Shopping/i });


	}

	async addProductToCart(ordinalNum: number, proceed?: boolean): Promise<void>
	{
		const productContainer: Locator = this.page.locator('.product-image-wrapper').nth(ordinalNum);
		await productContainer.hover();

		const addToCartButton: Locator = productContainer.locator('.product-overlay .add-to-cart');
		await addToCartButton.waitFor({ state: 'visible', timeout: 5000 });
		await addToCartButton.click({ force: true });

		const modalActionTimeout = 20000;

		if(proceed)
		{
			await this.continueShoppingButton.waitFor({ state: 'attached', timeout: modalActionTimeout });
			await this.page.waitForTimeout(2000);
			await this.continueShoppingButton.click({ force: true, timeout: 10000 });
		}
		else
		{
			await this.viewCartLink.waitFor({ state: 'attached', timeout: modalActionTimeout });
			await this.page.waitForTimeout(2000);
			await this.viewCartLink.click({ force: true, timeout: 10000 });
		}
		
	}
}