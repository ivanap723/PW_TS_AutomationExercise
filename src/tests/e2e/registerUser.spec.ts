import { test, expect, type Page } from '@playwright/test'
import { SignupPage } from '../../pages/SignupPage'

test.describe('Registering new users', () => {

    let signupPage: SignupPage;

    test.beforeEach(async ({ page }) => {
        signupPage = new SignupPage(page);
        
    
        await signupPage.goToLoginPage();
        await expect(signupPage.signupButton).toBeVisible();
    
    });


    test.only("Register new user", async ({page}) => {

        //enter and submit Name and email
        await page.waitForTimeout(5000);
        await signupPage.enterName();
        await signupPage.enterEmail();
        await page.waitForTimeout(5000);
        await signupPage.signupButton.click();
        await expect(signupPage.signupForm).toBeVisible();

        //fill out the signup form
        await signupPage.pickRandomGender();
        await page.waitForTimeout(5000);
        //define creds data somewhere else
        //await signupPage.checkNameField(); 
        //await signupPage.checkEmailField();
        await signupPage.password.fill('CheeseCake123.')
        
        await signupPage.setRandomBirhday();
        await page.waitForTimeout(5000);

    
    });

});



