import { test, expect, type Page } from '@playwright/test';
import { productListEndpoint } from "../../api/endpoints";
import { ProductListSchema } from '../../api/schemas/productsList';



test('should get list of products', async ({ request }) => 
{
	const response = await request.get(productListEndpoint);
	expect(response.status()).toBe(200);
    
	const responseBody = await response.json();
	const parsed = ProductListSchema.parse(responseBody);

	expect(parsed.responseCode).toBe(200);
	expect(parsed.products.length).toBeGreaterThan(0);

});