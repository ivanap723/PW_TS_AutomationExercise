import { expect, type Locator, type Page } from '@playwright/test';

export class CookiesPopUp 
{

	readonly page: Page;

	constructor(page: Page) 
	{
		this.page = page;

	}

	async clickConsent()
	{

		await this.page.getByRole('button', { name: 'Consent' }).click();

	}
}
