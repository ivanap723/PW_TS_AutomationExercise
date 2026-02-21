import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage 
{
	page: Page;
	//Checkout page
	//Fields
	readonly NameField: Locator;
	readonly CCNumberField: Locator;
	readonly CVC: Locator;
	readonly expMonthField: Locator;
	readonly expYearField: Locator;

	//buttons
	readonly payAndConfirm: Locator;
	readonly continueButton: Locator;
	
	//orderPlaced
	readonly orderPlacedConfirmation: Locator;



	constructor(page: Page)
	{

		this.page = page;
		//Field names
		this.CVC = page.locator('col-sm-4 form-group cvc label.control-label');
		//Fields
		this.NameField = page.locator('[data-qa="name-on-card"]');
		this.CCNumberField = page.locator('[data-qa="card-number"]');
		this.CVC = page.locator('[data-qa="cvc"]');
		this.expMonthField = page.locator('[data-qa="expiry-month"]');
		this.expYearField = page.locator('[data-qa="expiry-year"]');

		//button
		this.payAndConfirm = page.locator('[data-qa="pay-button"]');
		this.continueButton = page.locator('[data-qa="continue-button"]');

		//orderPlaced
		this.orderPlacedConfirmation = page.locator('[data-qa="order-placed"]');
		

	}


}