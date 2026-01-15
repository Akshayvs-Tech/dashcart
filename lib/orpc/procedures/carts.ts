import { z } from 'zod';
import { publicProcedure } from '../init';
import { os } from '@orpc/server';

const getUserCarts = publicProcedure
  .input(z.object({ userId: z.number() }))
  .handler(async ({ input }) => {
    const response = await fetch(`https://dummyjson.com/carts/user/${input.userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user carts');
    }
    return response.json();
  });

const addCart = publicProcedure
  .input(
    z.object({
      userId: z.number(),
      products: z.array(
        z.object({
          id: z.number(),
          quantity: z.number(),
        })
      ),
    })
  )
  .handler(async ({ input }) => {
    const response = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to create cart');
    }

    return response.json();
  });

export const cartsRouter = os.router({
  getUserCarts,
  addCart,
});
