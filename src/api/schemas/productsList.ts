import { z } from 'zod';

export const ProductSchema = z.object({
	id: z.number(),
	name: z.string(),
	price: z.string(),
	brand: z.string(),
	category: z.object(), 
});

export const ProductListSchema = z.object({
	responseCode: z.number(),
	products: z.array(ProductSchema),
});