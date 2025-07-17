import { test, expect, type Page } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import * as testData from '../../utils/testData'
import { CookiesPopUp } from '../../pages/CookiesPopUp';
import { loginPath } from '../../utils/constants';
import * as constants from '../../utils/constants';


test.describe('Tests for registering new users - different approaches', () => {

    let signupPage: SignupPage;
    let cookiesPopUp: CookiesPopUp;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        cookiesPopUp = new CookiesPopUp(page);

        await page.goto(loginPath);
        await expect(signupPage.signupButton).toBeVisible();
        await cookiesPopUp.clickConsent();
    
    });


    test("Register new user from specific country using generated Faker information", async ({page}) => {

        const userData = testData.generateRandomUser();

        //enter and submit random Name and email 
        await signupPage.enterName(userData.firstName);
        await signupPage.enterFakerEmail(userData.email);
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

    test("Register new users from India", async ({page}) => {
        await signupPage.registerUserFromCountry(testData.IndiaUser)
    });

    test("Register new users from USA", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.USAUser)
    });

    test("Register new users from Canada", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.CanadaUser)
    });

    test("Register new users from Australia", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.AustraliaUser)
    });

    test("Register new users from Israel", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.IsraelUser)
    });

    test("Register new users from New Zealand", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.NewZealandUser)
    });

    test("Register new users from Singapore", async ({page}) => {
    await signupPage.registerUserFromCountry(testData.SingaporeUser)
    });

    test("Try to register with existing user", async ({page}) => {
    await signupPage.enterName(constants.username);
    await signupPage.signupEmail.fill(constants.userEmail);
    await signupPage.signupButton.click();
    await expect(signupPage.existingEmailError).toBeVisible();

    });
});



