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
		const consentButton = this.page.getByRole('button', {
			name: /Consent|Dismiss privacy and legal settings display/i
		});
		if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false))
		{
			await consentButton.click();
		}
	}
}
