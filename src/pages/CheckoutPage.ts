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
	readonly orderMsg: Locator;
	readonly textArea: Locator;

	//button
	placeOrder: Locator;




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
		this.cartItem = page.locator('tbody tr[id^="product-"]');

		//order comment
		this.orderMsg = page.locator('#ordermsg label');
		this.textArea = page.locator('textarea[name="message"]');

		//button
		this.placeOrder = page.getByRole('link', { name: 'Place Order' });

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

	async calculateTotalPrice(page: Page) {
		const count = await this.cartItem.count();
		let totalAmount = 0; // accumulator outside loop

		for (let i = 0; i < count; i++) {
			const row = this.cartItem.nth(i);

			// Quantity
			const quantityText = await row.locator('td.cart_quantity button').innerText();
			const quantity = parseInt(quantityText, 10);

			// Price
			const priceText = await row.locator('td.cart_price p').innerText();
			const price = parseInt(priceText.replace(/[^\d]/g, ''), 10);

			// Expected total
			const expectedTotal = quantity * price;

			// UI total
			const itemTotalText = await row.locator('td.cart_total p.cart_total_price').innerText();
			const uiTotal = parseInt(itemTotalText.replace(/[^\d]/g, ''), 10);

			// Assert row total matches calculation
			expect(uiTotal).toBe(expectedTotal);

			// Add to grand total
			totalAmount += expectedTotal;
		}

		// ✅ Now check the grand total in UI (example selector)
		const grandTotalText = await page.locator('#total_price').innerText(); 
		const grandTotal = parseInt(grandTotalText.replace(/[^\d]/g, ''), 10);

		expect(grandTotal).toBe(totalAmount);
	}
}