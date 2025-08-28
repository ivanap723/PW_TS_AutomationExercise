import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage 
{

	//Checkout page
	readonly page: Page; 

	//addresses
	readonly addressItem: Locator;
	readonly addressDetailsHeading: Locator;
	readonly billingAddressHeading: Locator;
	readonly deliveryAddressHeading: Locator;
	readonly Name: Locator;
	readonly Address1: Locator;
	readonly CityStatePostCode: Locator;
	readonly Country: Locator;
	readonly Phone: Locator;

	//order table
	readonly reviewOrderHeading: Locator;
	readonly item: Locator;
	readonly description: Locator;
	readonly price: Locator;
	readonly quantity: Locator;
	readonly total: Locator;
	readonly cartItem: Locator;


	//order comment




	constructor(page: Page)
	{

		this.page = page;
	    //addresses        
		this.addressItem = page.locator('.col-xs-12 col-sm-6');
		this.addressDetailsHeading = page.locator('#address_delivery');
		this.billingAddressHeading = page.locator('#address_invoice');
		this.Name = page.locator('.address_firstname address_lastname');
		this.Address1 = page.locator('.address_address1 address_address2');
		this.CityStatePostCode = page.locator('.address_city address_state_name address_postcode');
		this.Country = page.locator('.address_country_name');
		this.Phone = page.locator('.address_phone');

		//order table
		this.reviewOrderHeading = page.getByRole('heading', { name: 'Review Your Order' });
		this.item = page.locator('td.image');
		this.description = page.locator('td.description');
		this.price = page.locator('td.price');
		this.quantity = page.locator('td.quantity');
		this.total = page.locator('td.total');
		this.cartItem = page.locator('tbody tr[id^="product-"]');

		//order comment

	}

	async verifyAddressVisible(page: Page) 
	{
		const count = await this.addressItem.count();

		for (let i = 0; i < count; i++) 
		{
			const row = this.addressItem.nth(i);

			await expect(row.locator('.address_firstname.address_lastname')).toBeVisible();
			await expect(row.locator('.address_address1.address_address2')).toBeVisible();
			await expect(row.locator('.address_city.address_state_name.address_postcode')).toBeVisible();
			await expect(row.locator('.address_country_name')).toBeVisible();
			await expect(row.locator('.address_phone')).toBeVisible();
		}
	}

	async verifyItemsInTable(page: Page) 
	{

		const count = await this.cartItem.count();

		for (let i = 0; i < count; i++) 
		{
			const row = this.cartItem.nth(i);

			await expect(row.locator('td.cart_product img')).toBeVisible();
			await expect(row.locator('td.cart_description a')).toBeVisible();
			await expect(row.locator('td.cart_price p')).toBeVisible();
			await expect(row.locator('td.cart_quantity button')).toBeVisible();
			await expect(row.locator('td.cart_total p')).toBeVisible();
		}
    
	}
}