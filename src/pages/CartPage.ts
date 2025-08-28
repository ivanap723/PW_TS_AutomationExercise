import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage 
{

	//Cart page
	readonly page: Page; 
	readonly cartMenu: Locator;
	readonly products: Locator;
	readonly cartLink: Locator;
	readonly proceedToCheckout: Locator;
	readonly removeProduct: Locator;
	readonly emptyCartMsg: Locator;
	readonly clickHereToBuy: Locator;



	constructor(page: Page)
  	{

		this.page = page;
		this.cartMenu = page.locator('tr.cart_menu');
		this.products = page.locator('tbody tr[id^="product-"]');
		this.cartLink = page.getByRole('link', { name: 'Cart' });
		this.proceedToCheckout = page.locator('a.btn.check_out');
		this.removeProduct = page.locator('.cart_quantity_delete');
		this.emptyCartMsg = page.locator('p.text-center');
		this.clickHereToBuy = page.getByRole('link', { name: 'here'});

	}


	async verifyCartProducts(page: Page) 
	{

		const count = await this.products.count();
		console.log(`Total products in cart: ${count}`);

		for (let i = 0; i < count; i++) 
		{
			const row = this.products.nth(i);

			const name = await row.locator('.cart_description h4 a').textContent();
			const category = await row.locator('.cart_description p').textContent();
			const price = await row.locator('.cart_price p').textContent();
			const quantity = await row.locator('.cart_quantity button').textContent();
			const total = await row.locator('.cart_total_price').textContent();

			console.log(`Product ${i + 1}:`);
			console.log(`  Name: ${name}`);
			console.log(`  Category: ${category}`);
			console.log(`  Price: ${price}`);
			console.log(`  Quantity: ${quantity}`);
			console.log(`  Total: ${total}`);

			// Assertions
			await expect(row.locator('.cart_description h4 a')).not.toHaveText('');
			await expect(row.locator('.cart_description p')).not.toHaveText('');
			await expect(row.locator('.cart_price p')).not.toHaveText('');
			await expect(row.locator('.cart_quantity button')).not.toHaveText('');
			await expect(row.locator('.cart_total_price')).not.toHaveText('');
		}

	}

	async removeAllCartProducts(page: Page) 
	{

		const count = await this.products.count();
		console.log(`Total products in cart: ${count}`);
		for (let i = 0; i < count; i++) 
		{
			const row = this.products.nth(i);
			await this.removeProduct.nth(i).click();
		}

		await expect(this.emptyCartMsg).toHaveText('Cart is empty! Click here to buy products.');

	}
}