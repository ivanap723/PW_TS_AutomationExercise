import { expect, type Locator, type Page } from '@playwright/test';
import { baseUrl, loginPath } from '../utils/constants';
import * as testData from '../utils/testData';

export class SignupPage 
{
	readonly page: Page;
	// Try to use role-based, text-based, or test-id-based locators where possible for resilience

	readonly signupButton: Locator; // kept getByRole, resilient
	readonly signupHeading: Locator; // kept getByRole, resilient

	readonly signupName: Locator; // uses [data-qa], resilient
	readonly signupEmail: Locator; // uses [data-qa], resilient

	readonly existingEmailError: Locator; // brittle: matches full text, could be better with role or data-qa, else keep as-is if no better selector exists

	// signup page - enter account info
	readonly signupForm: Locator; // uses class, fragile if style changes; if possible use 'form[data-qa="signup-form"]'
	readonly optionMrs: Locator; // by id, resilient
	readonly optionMr: Locator; // by id, resilient
	readonly nameField: Locator; // by id, resilient
	readonly emailField: Locator; // by id, resilient
	readonly password: Locator; // by id, resilient
	readonly birthDays: Locator; // by id, resilient
	readonly birthMonths: Locator; // by id, resilient
	readonly birthYears: Locator; // by id, resilient
	readonly checkboxNewsletter: Locator; // by id, resilient
	readonly checkboxSpecialOffers: Locator; // by id, resilient

	// signup page - address information
	readonly firstName: Locator; // by id, resilient
	readonly lastName: Locator;
	readonly company: Locator;
	readonly address1: Locator;
	readonly address2: Locator;
	readonly country: Locator;
	readonly state: Locator;
	readonly city: Locator;
	readonly zip: Locator;
	readonly phone: Locator;

	// above address fields are by id, resilient

	readonly submitButton: Locator; // using getByRole, resilient

	// account created
	readonly accountCreated: Locator; // using getByRole, resilient
	readonly continueButton: Locator; // using getByRole, resilient
	readonly categoryHeading: Locator; // using getByRole, resilient
	readonly loggedInAs: Locator; // brittle: matches partial text, more resilient to select by a unique test-id or aria-label if available

	// deleting account
	readonly deleteAccount: Locator; // also brittle like above, 'text=Delete Account', better with a button role or test-id
	readonly accountDeleted: Locator; // using getByRole, resilient


	constructor(page: Page) 
	{
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
		this.loggedInAs = page.getByText(/Logged in as/);
		this.deleteAccount = page.getByRole('link', { name: ' Delete Account'});
		this.accountDeleted = page.getByRole('heading', { name: 'Account Deleted!' });
		this.existingEmailError = page.locator('text=Email Address already exist!');
    
	}

	async goToLoginPage()
	{
		await this.page.goto(loginPath);
	}

	async enterName(name?: string)
	{
		if(name)
		{
			await this.signupName.fill(name);
		}
	}
  
	async enterRandomEmail()
	{
		await this.signupEmail.fill(testData.generateRandomEmail());
	}

	async enterFakerEmail(email: string)
	{
		await this.signupEmail.fill(email);
	}

	async pickRandomGender()
	{
		const genderOptions = [this.optionMr, this.optionMrs];
		const randomIndex = Math.floor(Math.random() * genderOptions.length);
		await genderOptions[randomIndex].click();
	}

	async checkNameField(name: string)
	{
		const value = await this.nameField.inputValue();
		expect(value).toEqual(name);
	}

	async checkEmailField(email: string)
	{
		const value = await this.emailField.inputValue();
		expect(value).toEqual(email);
	}

	async setRandomBirthday()
	{
		const minYear = 1900;
		const maxYear = 2021;
		const randomDay = Math.floor(Math.random() * 31) + 1;
		const randomMonth = Math.floor(Math.random() * 12) + 1;
		const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

		await this.birthDays.selectOption(randomDay.toString());
		await this.birthMonths.selectOption(randomMonth.toString());
		await this.birthYears.selectOption(randomYear.toString());
	}

	async clickCheckbox(element: Locator)
	{
		await element.click({ force: true });
	}

	async selectCountry(country: string)
	{
		await this.country.selectOption(country);
	}

	async registerUserFromCountry(user: testData.User)
	{
    
		//enter and submit random Name and email
         
		await this.enterName(user.firstName);
		await this.enterRandomEmail();
		await this.signupButton.click();
		await expect(this.signupForm).toBeVisible();

		//enter account information section
		await this.pickRandomGender();
		await this.checkNameField(user.firstName); 
		await this.checkEmailField(testData.getGeneratedEmail());
		await this.password.fill(testData.existingUser.password);
        
		await this.setRandomBirthday(); 
		await this.clickCheckbox(this.checkboxNewsletter);
		await this.clickCheckbox(this.checkboxSpecialOffers);

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
		await expect(this.loggedInAs).toContainText(user.firstName);

		//delete account
		await this.deleteAccount.click();
		await expect(this.accountDeleted).toBeVisible();
		await this.continueButton.click();
		await expect(this.page).toHaveURL(baseUrl);

	}
}
