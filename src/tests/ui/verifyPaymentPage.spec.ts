import { test, expect, type Page } from '@playwright/test';
import { PaymentPage } from '../../pages/PaymentPage';
import { CartPage } from '../../pages/CartPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { LoginPage } from '../../pages/LoginPage';
import * as constants from '../../utils/constants';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { existingUser } from '../../utils/testData';

test.describe('Tests for verifying Payment Page', () => 
{

	let paymentPage: PaymentPage;
	let checkoutPage: CheckoutPage;
	let loginPage: LoginPage;
	let cartPage: CartPage;
	let productsPage: ProductsPage;


	test.beforeEach(async ({ page }) => 
	{
		paymentPage = new PaymentPage(page);
		productsPage = new ProductsPage(page);
		checkoutPage = new CheckoutPage(page);
		cartPage = new CartPage(page);
		loginPage = new LoginPage(page);

		await loginPage.visitLoginPage();
		await loginPage.performLogin(existingUser);

		await productsPage.addProductToCart(constants.secondProduct, true);
		await productsPage.addProductToCart(constants.fourthProduct, false);
		await cartPage.proceedToCheckout.click(); 
		await checkoutPage.placeOrder.click();
    
	});

	test("Verify field names are visible", async () => 
	{
		await expect(paymentPage.NameOnCard).toHaveText('Name on Card');
		await expect(paymentPage.cardNumber).toHaveText('Card Number');
		await expect(paymentPage.CVC).toHaveText('CVC');
		await expect(paymentPage.expiration).toHaveText('Expiration');

	});


	test("Enter billing info and pay and confirm order", async ({page, baseURL}) => 
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