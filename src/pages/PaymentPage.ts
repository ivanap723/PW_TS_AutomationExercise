import { expect, type Locator, type Page } from '@playwright/test';

export class PaymentPage
{
	readonly page: Page;

	readonly NameField: Locator;
	readonly CCNumberField: Locator;
	readonly CVC: Locator;
	readonly expMonthField: Locator;
	readonly expYearField: Locator;

	readonly payAndConfirm: Locator;
	readonly continueButton: Locator;
	readonly orderPlacedConfirmation: Locator;

	constructor(page: Page)
	{
		this.page = page;
		this.NameField = page.locator('[data-qa="name-on-card"]');
		this.CCNumberField = page.locator('[data-qa="card-number"]');
		this.CVC = page.locator('[data-qa="cvc"]');
		this.expMonthField = page.locator('[data-qa="expiry-month"]');
		this.expYearField = page.locator('[data-qa="expiry-year"]');
		this.payAndConfirm = page.locator('[data-qa="pay-button"]');
		this.continueButton = page.locator('[data-qa="continue-button"]');
		this.orderPlacedConfirmation = page.locator('[data-qa="order-placed"]');
	}
}