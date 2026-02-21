import { APIRequestContext, expect } from '@playwright/test';
import { productSearchEndpoint } from '../api/endpoints';
import { Product } from '../utils/testData';

export async function searchProducts(request: APIRequestContext, searchTerm: string): Promise<Product[]> 
{
	const response = await request.post(productSearchEndpoint, { form: { search_product: searchTerm } });
	expect(response.status()).toBe(200);

	const responseBody = await response.json();
	console.log(responseBody);
	
	expect(responseBody).toHaveProperty('products');
	expect(Array.isArray(responseBody.products)).toBe(true);
	
	return responseBody.products as Product[];
}

export function filterProductsByName(products: Product[], keyword: string): Product[] 
{
	return products.filter(p =>
		p.name.toLowerCase().includes(keyword.toLowerCase())
	);
}