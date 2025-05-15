import { expect, type Locator, type Page } from '@playwright/test';

export class SignupPage {
readonly page: Page;
readonly signupButton: Locator;
readonly signupHeading: Locator;

constructor(page: Page) {
    this.page = page;
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
    this.signupHeading = this.page.getByRole('heading', { name: 'New User Signup!' });

      
      
  }

  async goToLoginPage(){
    await this.page.goto('https://www.automationexercise.com/login')

  }
}
