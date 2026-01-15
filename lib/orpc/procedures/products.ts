import { z } from 'zod';
import { publicProcedure } from '../init';
import { os } from '@orpc/server';

const getProductsSchema = z.object({
  limit: z.number().optional().default(10),
  skip: z.number().optional().default(0),
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

const productFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().optional(),
  stock: z.number().int().nonnegative('Stock must be non-negative').optional(),
  thumbnail: z.string().url('Invalid URL').optional(),
});

const getProducts = publicProcedure
  .input(getProductsSchema)
  .handler(async ({ input }) => {
    let url = 'https://dummyjson.com/products';

    if (input.search) {
      url = `https://dummyjson.com/products/search?q=${encodeURIComponent(input.search)}`;
    } else if (input.category) {
      url = `https://dummyjson.com/products/category/${encodeURIComponent(input.category)}`;
    }

    url += `${url.includes('?') ? '&' : '?'}limit=${input.limit}&skip=${input.skip}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await response.json();

    // Client-side filtering for price range (DummyJSON doesn't support this)
    let filteredProducts = data.products;
    if (input.minPrice !== undefined || input.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product: any) => {
        const price = product.price;
        if (input.minPrice !== undefined && price < input.minPrice) return false;
        if (input.maxPrice !== undefined && price > input.maxPrice) return false;
        return true;
      });
    }

    return {
      products: filteredProducts,
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  });

const getProduct = publicProcedure
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const response = await fetch(`https://dummyjson.com/products/${input.id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  });

const getCategories = publicProcedure.handler(async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
});

const addProduct = publicProcedure
  .input(productFormSchema)
  .handler(async ({ input }) => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }

    return response.json();
  });

const updateProduct = publicProcedure
  .input(
    z.object({
      id: z.number(),
      data: productFormSchema.partial(),
    })
  )
  .handler(async ({ input }) => {
    const response = await fetch(`https://dummyjson.com/products/${input.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input.data),
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  });

const deleteProduct = publicProcedure
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    const response = await fetch(`https://dummyjson.com/products/${input.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return response.json();
  });

export const productsRouter = os.router({
  getProducts,
  getProduct,
  getCategories,
  addProduct,
  updateProduct,
  deleteProduct,
});
