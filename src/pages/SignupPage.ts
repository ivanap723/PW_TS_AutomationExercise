import { expect, type Locator, type Page } from '@playwright/test';

export class SignupPage {
readonly page: Page;
readonly signupButton: Locator;
readonly signupHeading: Locator;
readonly signupName: Locator;
readonly signupEmail: Locator;
readonly signupForm: Locator;
readonly optionMrs: Locator;
readonly optionMr: Locator;
readonly nameField: Locator;
readonly emailField: Locator;
readonly password: Locator;
readonly birthDays: Locator;
readonly birthMonths: Locator;
readonly birthYears: Locator;

constructor(page: Page) {
    this.page = page;
    this.signupButton = this.page.getByRole('button', { name: 'Signup' });
    this.signupHeading = this.page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupForm = page.locator('.login-form');
    this.optionMrs = page.locator('#id_gender2');
    this.optionMr = page.locator('#id_gender1');
    this.nameField = page.locator('#name');
    this.nameField = page.locator('#email');
    this.password = page.locator('#password');
    this.birthDays = page.locator('#days');
    this.birthMonths = page.locator('#months');
    this.birthYears = page.locator('#years');
    
  }



  async goToLoginPage(){
    await this.page.goto('https://www.automationexercise.com/login')

  }

  async enterName(){
    const name = 'Pera'
    await this.signupName.fill(name);
  }

  async enterEmail(){
    const email = 'zdera1111@test.com'
    await this.signupEmail.fill(email);
  }

  async pickRandomGender(){
    const genderOptions = [this.optionMr, this.optionMrs]
    const randomIndex = Math.floor(Math.random() * genderOptions.length);
    await genderOptions[randomIndex].click();
  }

  async checkNameField(){
    const input = this.nameField
    const value = await input.inputValue();
    expect(value).toBe(this.signupName)
  }

  async checkEmailField(){
    const input = this.emailField
    const value = await input.inputValue();
    expect(value).toBe(this.signupEmail)
  }

  async setRandomBirhday(){

    const randomDay = Math.floor(Math.random() * 31) + 1;

    await this.birthDays.click();
    await this.birthDays.selectOption(randomDay.toString());
    

  }
}
