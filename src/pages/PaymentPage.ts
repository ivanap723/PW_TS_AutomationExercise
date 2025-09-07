import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage 
{

	//Checkout page
	//Field names
	readonly page: Page; 
	readonly NameOnCard: Locator;
	readonly cardNumber: Locator;
	readonly CVC: Locator;
	readonly expiration: Locator;

	//Fields
	readonly NameField: Locator;
	readonly CCNumberField: Locator;
	readonly CVCField: Locator;
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
		this.NameOnCard = page.locator('div.col-sm-12.form-group label.control-label');
		this.cardNumber = page.locator('col-sm-12 form-group card label.control-label');
		this.CVC = page.locator('col-sm-4 form-group cvc label.control-label');
		this.expiration = page.locator('col-sm-4 form-group expiration label.control-label');

		//Fields
		this.NameField = page.locator('[data-qa="name-on-card"]');
		this.CCNumberField = page.locator('[data-qa="card-number"]');
		this.CVC = page.locator('[data-qa="cvc"]');
		this.expMonthField = page.locator('[data-qa="expiry_month"]');
		this.expYearField = page.locator('[data-qa="expiry-year"]');

		//button
		this.payAndConfirm = page.locator('[data-qa="pay-button"]');
		this.continueButton = page.locator('[data-qa="continue-button"]');

		//orderPlaced
		this.orderPlacedConfirmation = page.locator('[data-qa="order-placed"]');
		

	}


}