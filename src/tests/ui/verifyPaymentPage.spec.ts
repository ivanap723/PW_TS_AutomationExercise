import { test, expect } from '../fixtures';
import { PaymentPage } from '../../pages/PaymentPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CartPage } from '../../pages/CartPage';
import * as constants from '../../utils/constants';

test.describe('Tests for verifying Payment Page', () =>
{
	let paymentPage: PaymentPage;
	let checkoutPage: CheckoutPage;

	test.beforeEach(async ({ cartWithTwoProductsPage }) =>
	{
		paymentPage = new PaymentPage(cartWithTwoProductsPage);
		checkoutPage = new CheckoutPage(cartWithTwoProductsPage);
		const cartPage = new CartPage(cartWithTwoProductsPage);
		await cartPage.proceedToCheckout.click();
		await checkoutPage.placeOrder.click();
	});

	test("Enter billing info and pay and confirm order", async () =>
	{
		await paymentPage.NameField.fill(constants.CreditCardName);
		await paymentPage.CCNumberField.fill(constants.CreditCardNumber);
		await paymentPage.CVC.fill(constants.CVC);
		await paymentPage.expMonthField.fill(constants.expiryMonth);
		await paymentPage.expYearField.fill(constants.expiryYear);
		await paymentPage.payAndConfirm.click();
		await expect(paymentPage.orderPlacedConfirmation).toBeVisible();
		await paymentPage.continueButton.click();
	});
});
