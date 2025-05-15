import { test, expect } from '@playwright/test'

test("Simple basic test", async ({page}) => {

    await page.goto('https://www.automationexercise.com/')
    const image = page.locator('img[alt="Website for automation practice"]');
    await expect(image).toBeVisible();

})