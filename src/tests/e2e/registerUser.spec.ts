import { test, expect, type Page } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import * as testData from '../../utils/testData'

test.describe('Tests for registering new users - different approaches', () => {

    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        
    
        await signupPage.goToLoginPage();
        await expect(signupPage.signupButton).toBeVisible();
    
    });


    test("Register new user using generated Faker information", async ({page}) => {

        const userData = testData.generateRandomUser();

        //enter and submit random Name and email
        await signupPage.consentButton.click(); 
        await signupPage.enterName(userData.firstName);
        await signupPage.enterEmail(userData.email);
        await signupPage.signupButton.click();
        await expect(signupPage.signupForm).toBeVisible();

        //enter account information section
        await signupPage.pickRandomGender();
        await signupPage.checkNameField(userData.firstName); 
        await signupPage.checkEmailField(userData.email);
        await signupPage.password.fill(userData.password)
        
        await signupPage.setRandomBirhday(); 
        await signupPage.clickCheckbox(signupPage.checkboxNewsletter)
        await signupPage.clickCheckbox(signupPage.checkboxSpecialOffers)

        //address information section
        await signupPage.firstName.fill(userData.firstName);
        await signupPage.lastName.fill(userData.lastName);
        await signupPage.company.fill(userData.company);
        await signupPage.address1.fill(userData.address1);
        await signupPage.address2.fill(userData.address2);
        await signupPage.selectCountry("United States");
        await signupPage.state.fill(userData.state);
        await signupPage.city.fill(userData.city);
        await signupPage.zip.fill(userData.zipCode);
        await signupPage.phone.fill(userData.phone);

        //submit
        await signupPage.submitButton.click();
        await expect(signupPage.accountCreated).toBeVisible();
        await signupPage.continueButton.click();
        await expect(signupPage.categoryHeading).toBeVisible();

    });

    test("Register new user based on the country selected", async ({page}) => {


    });
});



