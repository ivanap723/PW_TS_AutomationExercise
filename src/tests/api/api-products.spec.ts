import { test, expect, type Page } from '@playwright/test';
import { productListEndpoint, productSearchEndpoint } from "../../api/endpoints";
import { ProductListSchema } from '../../api/schemas/productsList';
import { Product } from '../../utils/testData';
import * as utilities from '../../api/utilities';


test('should GET list of all products and get status 200', async ({ request }) => 
{
	const response = await request.get(productListEndpoint);
	expect(response.status()).toBe(200);
    
	const responseBody = await response.json();
	const parsed = ProductListSchema.parse(responseBody);

	expect(parsed.responseCode).toBe(200);
	expect(parsed.products.length).toBeGreaterThan(0);

});

test.only('should POST to search product with one parameter and get status 200', async ({ request }) => 
{
	const keyword = 'white top';
	const products = await utilities.searchProducts(request, keyword);
	const matching = utilities.filterProductsByName(products, keyword);
  	expect(matching.length).toBeGreaterThan(0);

	console.log(`Found ${matching.length} product(s):`);
  	matching.forEach(product => console.log(`- ${product.name}`));
});