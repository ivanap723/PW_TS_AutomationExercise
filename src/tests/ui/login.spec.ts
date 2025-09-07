import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { existingUser, existingUserWrongPass, inexistingUser } from '../../utils/testData';

test.describe('Tests for login with wrong and correct credentials', () => 
{

	let loginPage: LoginPage;
    
	test.beforeEach(async ({ page }) => 
	{
		loginPage = new LoginPage(page);
		loginPage.visitLoginPage();

	});

	test("Try logging in with incorrect email", async ({page}) => 
	{
		await loginPage.performLogin(inexistingUser);
		await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible(); //napravi metodu u page objectu
	});

	test.only("Try logging in with incorrect password", async ({page}) => 
	{
		await loginPage.performLogin(existingUserWrongPass);
		await expect(page.locator('text=Your email or password is incorrect!')).toBeVisible();
	});

	test("Try logging in with correct credentials and then log out", async ({page}) => 
	{
		await loginPage.performLogin(existingUser);
		await expect(page.locator('text=Logged in as')).toBeVisible();
		await expect(page).toHaveURL("https://www.automationexercise.com/");
		await loginPage.logoutButton.click();
		await expect(page).toHaveURL("https://www.automationexercise.com/login");
	});
    
});