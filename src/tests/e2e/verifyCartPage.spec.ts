import { test, expect, type Page } from '@playwright/test'
import { ProductsPage } from '../../pages/ProductsPage'
import { CartPage } from '../../pages/CartPage';
import { CookiesPopUp } from '../../pages/CookiesPopUp';

test.describe('Tests for verifying Cart Page', () => {

    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let cookiesPopUp: CookiesPopUp;

    test.beforeEach(async ({ page }) => {
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        cookiesPopUp = new CookiesPopUp(page);

        await page.goto('/') //visits home page
        await cookiesPopUp.clickConsent();
        await productsPage.productsLink.click();
    
    });

    test.only("Add two products to the Cart and verify everything is visible in Cart page", async ({page}) => {
               
        await page.locator('.add-to-cart').first().click();
        await productsPage.continueShoppingButton.click();
        await page.locator('.add-to-cart').nth(2).click();
        await productsPage.viewCartLink.click();

        await expect(page).toHaveURL('https://www.automationexercise.com/view_cart');
        await expect(cartPage.cartMenu).toBeVisible();
        await cartPage.verifyCartProducts(page);

        });

});