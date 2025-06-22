import { expect, type Locator, type Page } from '@playwright/test';



export class LoginPage {
readonly page: Page;
readonly loginButton: Locator;
readonly emailField: Locator;
readonly passwordField: Locator;
readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.emailField = page.locator('[data-qa="login-email"]');
        this.passwordField = page.locator('[data-qa="login-password"]');
        this.logoutButton = page.locator('a[href="/logout"]');

    }

    async enterEmail(email: string){
    await this.emailField.fill(email);
    }
     
    async enterPassword(pass: string){
    await this.passwordField.fill(pass);
    }

}