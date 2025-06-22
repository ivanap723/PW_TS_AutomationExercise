import { expect, type Locator, type Page } from '@playwright/test';
import { loginPath } from '../utils/constants';
import * as testData from '../utils/testData';
import * as constants from '../utils/constants';

export class SignupPage {
//login page
readonly page: Page;
readonly signupButton: Locator;
readonly signupHeading: Locator;
readonly signupName: Locator;
readonly signupEmail: Locator;
//signup page - enter account info
readonly signupForm: Locator;
readonly optionMrs: Locator;
readonly optionMr: Locator;
readonly nameField: Locator;
readonly emailField: Locator;
readonly password: Locator;
readonly birthDays: Locator;
readonly birthMonths: Locator;
readonly birthYears: Locator;
readonly checkboxNewsletter: Locator;
readonly checkboxSpecialOffers: Locator;
//signup page - address information
readonly firstName: Locator;
readonly lastName: Locator;
readonly company: Locator;
readonly address1: Locator;
readonly address2: Locator;
readonly country: Locator;
readonly state: Locator;
readonly city: Locator;
readonly zip: Locator;
readonly phone: Locator;
readonly submitButton: Locator;
//account created
readonly accountCreated: Locator;
readonly continueButton: Locator;
readonly categoryHeading: Locator;
readonly loggedInAs: Locator;
//deleting account
readonly deleteAccount: Locator;
readonly accountDeleted: Locator;


constructor(page: Page) {
    this.page = page;
    this.signupButton = page.getByRole('button', { name: 'Signup' });
    this.signupHeading = page.getByRole('heading', { name: 'New User Signup!' });
    this.signupName = page.locator('[data-qa="signup-name"]');
    this.signupEmail = page.locator('[data-qa="signup-email"]');
    this.signupForm = page.locator('.login-form');
    this.optionMrs = page.locator('#id_gender2');
    this.optionMr = page.locator('#id_gender1');
    this.nameField = page.locator('#name');
    this.emailField = page.locator('#email');
    this.password = page.locator('#password');
    this.birthDays = page.locator('#days');
    this.birthMonths = page.locator('#months');
    this.birthYears = page.locator('#years');
    this.checkboxNewsletter = page.locator('#newsletter');
    this.checkboxSpecialOffers = page.locator('#optin');
    this.firstName = page.locator('#first_name');
    this.lastName = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address1 = page.locator('#address1');
    this.address2 = page.locator('#address2');
    this.country = page.locator('#country');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zip = page.locator('#zipcode');
    this.phone = page.locator('#mobile_number');
    this.submitButton = page.getByRole('button', {name: 'Create Account'});
    this.accountCreated = page.getByRole('heading', { name: 'Account Created!' });
    this.continueButton = page.getByRole('link', { name: 'Continue'});
    this.categoryHeading = page.getByRole('heading', { name: 'Category' });
    this.loggedInAs = page.locator('text=Logged in as ');
    this.deleteAccount = page.locator('text=Delete Account');
    this.accountDeleted = page.getByRole('heading', { name: 'Account Deleted!' });
    
  }

  async goToLoginPage(){
    await this.page.goto(loginPath);
  }

  async enterName(name: string){
    await this.signupName.fill(name);
  }
  
  async enterRandomEmail(){
    await this.signupEmail.fill(testData.generateRandomEmail());
  }

  async enterFakerEmail(email: string){
    await this.signupEmail.fill(email);
  }

  async pickRandomGender(){
    const genderOptions = [this.optionMr, this.optionMrs]
    const randomIndex = Math.floor(Math.random() * genderOptions.length);
    await genderOptions[randomIndex].click();
  }

  async checkNameField(name: string){
    const value = await this.nameField.inputValue();
    expect(value).toEqual(name)
  }

  async checkEmailField(email: string){
    const value = await this.emailField.inputValue();
    expect(value).toEqual(email)
  }

  async setRandomBirhday(){

    const minYear = 1900;
    const maxYear = 2021;
    const randomDay = Math.floor(Math.random() * 31) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

    await this.birthDays.selectOption(randomDay.toString());
    await this.birthMonths.selectOption(randomMonth.toString());
    await this.birthYears.selectOption(randomYear.toString());
    

  }

  async clickCheckbox(element: Locator){
    element.click({ force: true });
  }

  async selectCountry(country: string){
    this.country.selectOption(country)
    
  }

  async registerUserFromCountry(user: testData.User){
    
      //enter and submit random Name and email
         
        await this.enterName(user.firstName);
        await this.enterRandomEmail();
        await this.signupButton.click();
        await expect(this.signupForm).toBeVisible();

        //enter account information section
        await this.pickRandomGender();
        await this.checkNameField(user.firstName); 
        await this.checkEmailField(testData.getGeneratedEmail());
        await this.password.fill(constants.userPassword)
        
        await this.setRandomBirhday(); 
        await this.clickCheckbox(this.checkboxNewsletter)
        await this.clickCheckbox(this.checkboxSpecialOffers)

        //address information section
        await this.firstName.fill(user.firstName);
        await this.lastName.fill(user.lastName);
        await this.company.fill(user.company);
        await this.address1.fill(user.address1);
        await this.address2.fill(user.address2);
        await this.selectCountry(user.country);
        await this.state.fill(user.state);
        await this.city.fill(user.city);
        await this.zip.fill(user.zip);
        await this.phone.fill(user.phone);

        //submit
        await this.submitButton.click();
        await expect(this.accountCreated).toBeVisible();
        await this.continueButton.click();
        await expect(this.categoryHeading).toBeVisible();
        await expect(this.page.locator(`text=Logged in as ${user.firstName}`)).toBeVisible();

        //delete account
        await this.deleteAccount.click();
        await expect(this.accountDeleted).toBeVisible();
        await this.continueButton.click();
        await expect(this.page).toHaveURL("https://www.automationexercise.com/");

  }
}
