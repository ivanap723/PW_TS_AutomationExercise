import { APIRequestContext, expect } from '@playwright/test';
import { productListEndpoint, productSearchEndpoint } from "../api/endpoints";
import { Product } from '../utils/testData';
import { ProductListSchema } from '../api/schemas/productsList';

// export async function getAllProducts(request: APIRequestContext): Promise<Product[]>
// {
// 	// const response = await request.get(productListEndpoint);
// 	// expect(response.status()).toBe(200);
        
// 	// const responseBody = await response.json();
// 	// const parsed = ProductListSchema.parse(responseBody);
    
// 	// expect(parsed.responseCode).toBe(200);
// 	// expect(parsed.products.length).toBeGreaterThan(0);

// 	// return parsed.products as Product[];

// }
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