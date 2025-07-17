import { test, expect, type Page } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage';
import { loginPath } from '../../utils/constants';
import { CookiesPopUp } from '../../pages/CookiesPopUp';
import * as constants from '../../utils/constants';

test.describe('Tests for login with wrong and correct credentials', () => {

    let loginPage: LoginPage;
    let cookiesPopUp: CookiesPopUp;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        cookiesPopUp = new CookiesPopUp(page);

        await page.goto(loginPath);
        await expect(loginPage.loginButton).toBeVisible();
        await cookiesPopUp.clickConsent();
    
    });

    test("Try logging in with incorrect email", async ({page}) => {
           
        await loginPage.enterEmail(constants.wrongEmail)
        await loginPage.enterPassword(constants.userPassword)
        await loginPage.loginButton.click();
        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });

    test("Try logging in with incorrect password", async ({page}) => {
           
        await loginPage.enterEmail(constants.userEmail)
        await loginPage.enterPassword(constants.wrongPassword)
        await loginPage.loginButton.click();
        await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
    });

    test("Try logging in with correct credentials and then log out", async ({page}) => {
           
        await loginPage.enterEmail(constants.userEmail)
        await loginPage.enterPassword(constants.userPassword)
        await loginPage.loginButton.click();
        await expect(page.locator('text=Logged in as')).toBeVisible();
        await expect(page).toHaveURL("https://www.automationexercise.com/");
        await loginPage.logoutButton.click();
        await expect(page).toHaveURL("https://www.automationexercise.com/login");
    });
    
});