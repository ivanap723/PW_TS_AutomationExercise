import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {

//Cart page
readonly page: Page; 
readonly cartMenu: Locator;
readonly products: Locator;
readonly productName: Locator;
readonly productCategory: Locator;
readonly productPrice: Locator;
readonly productQuantity: Locator;
readonly productTotal: Locator;


constructor(page: Page) {

    this.page = page;
    this.cartMenu = page.locator('tr.cart_menu');
    this.products = page.locator('tbody tr[id^="product-"]');

}


async verifyCartProducts(page: Page) {

    const count = await this.products.count();
    console.log(`Total products in cart: ${count}`);

    for (let i = 0; i < count; i++) {
    const row = this.products.nth(i);

    const name = await row.locator('.cart_description h4 a').textContent();
    const category = await row.locator('.cart_description p').textContent();
    const price = await row.locator('.cart_price p').textContent();
    const quantity = await row.locator('.cart_quantity button').textContent();
    const total = await row.locator('.cart_total_price').textContent();

    console.log(`Product ${i + 1}:`);
    console.log(`  Name: ${name}`);
    console.log(`  Category: ${category}`);
    console.log(`  Price: ${price}`);
    console.log(`  Quantity: ${quantity}`);
    console.log(`  Total: ${total}`);

    // Assertions
    await expect(row.locator('.cart_description h4 a')).not.toHaveText('');
    await expect(row.locator('.cart_description p')).not.toHaveText('');
    await expect(row.locator('.cart_price p')).not.toHaveText('');
    await expect(row.locator('.cart_quantity button')).not.toHaveText('');
    await expect(row.locator('.cart_total_price')).not.toHaveText('');
  }

}
}