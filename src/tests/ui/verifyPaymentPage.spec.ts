import { test, expect, type Page } from '@playwright/test';
import { PaymentPage } from '../../pages/PaymentPage';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import { loginPath } from '../../utils/constants';
import { CookiesPopUp } from '../../pages/CookiesPopUp';
import * as constants from '../../utils/constants';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Tests for verifying Payment Page', () => 
{

	let paymentPage: PaymentPage;
	let checkoutPage: CheckoutPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;
	let productsPage: ProductsPage;
	let cookiesPopUp: CookiesPopUp;

	test.beforeEach(async ({ page }) => 
	{
		paymentPage = new PaymentPage(page);
		productsPage = new ProductsPage(page);
		checkoutPage = new CheckoutPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);
		cookiesPopUp = new CookiesPopUp(page);

		await page.goto(loginPath); //whole process to get to the payment page
		await cookiesPopUp.clickConsent();
 
		await loginPage.enterEmail(constants.userEmail); //replace with login method
		await loginPage.enterPassword(constants.userPassword);
		await loginPage.loginButton.click();

		await page.locator('.add-to-cart').first().click(); //create a method for adding multiple items to Cart
		await productsPage.continueShoppingButton.click();
		await page.locator('.add-to-cart').nth(2).click();
		await productsPage.viewCartLink.click(); //create method for getting to cart page
		await cartPage.proceedToCheckout.click(); // create method for proceeding to checkout
		await checkoutPage.placeOrder.click(); // create method for placing the order
    
	});

	test("Verify field names are visible", async ({page}) => 
	{
		await expect(paymentPage.NameOnCard).toHaveText('Name on Card');
		await expect(paymentPage.cardNumber).toHaveText('Card Number');
		await expect(paymentPage.CVC).toHaveText('CVC');
		await expect(paymentPage.expiration).toHaveText('Expiration');

	});


	test.only("Enter billing info and pay and confirm order", async ({page, baseURL}) => 
	{
		await paymentPage.NameField.fill(constants.CreditCardName);
		await paymentPage.CCNumberField.fill(constants.CreditCardNumber);
		await paymentPage.CVC.fill(constants.CVC);
		await paymentPage.expMonthField.fill(constants.expiryMonth);
		await paymentPage.expYearField.fill(constants.expiryYear);
		await paymentPage.payAndConfirm.click();
		await expect(paymentPage.orderPlacedConfirmation).toBeVisible();
		await paymentPage.continueButton.click();
		await expect(page.url()).toBe(baseURL + '/');

	});
    
});