import { expect, type Locator, type Page } from '@playwright/test';
import { loginPath } from '../utils/constants';
import { CookiesPopUp } from './CookiesPopUp';


export class LoginPage 
{
	readonly page: Page;
	readonly loginButton: Locator;
	readonly emailField: Locator;
	readonly passwordField: Locator;
	readonly logoutButton: Locator;

	constructor(page: Page) 
	{
		this.page = page;
		this.loginButton = page.getByRole('button', { name: 'Login' });
		this.emailField = page.locator('[data-qa="login-email"]');
		this.passwordField = page.locator('[data-qa="login-password"]');
		this.logoutButton = page.locator('a[href="/logout"]');

	}



	async visitLoginPage()
	{
		let cookiesPopUp: CookiesPopUp;
		cookiesPopUp = new CookiesPopUp(this.page);

		await this.page.goto(loginPath);
		await expect(this.loginButton).toBeVisible();
		await cookiesPopUp.clickConsent();

	}

	async performLogin(loginUser: { email: string; password: string })
	{
		await this.emailField.fill(loginUser.email);
		await this.passwordField.fill(loginUser.password);
		await this.loginButton.click();

	}


}