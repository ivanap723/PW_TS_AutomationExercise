import { test, expect, type Page } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'
import * as constants from '../../utils/constants'
import * as testData from '../../utils/testData'

test.describe('Registering new users', () => {

    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        
    
        await signupPage.goToLoginPage();
        await expect(signupPage.signupButton).toBeVisible();
    
    });


    test.only("Register new user", async ({page}) => {

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
        await page.waitForTimeout(5000);

        //submit
        await signupPage.submitButton.click();
        await page.waitForTimeout(5000);




    
    });

});



