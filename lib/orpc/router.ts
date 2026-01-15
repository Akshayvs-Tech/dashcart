import { os } from '@orpc/server';
import { authRouter } from './procedures/auth';
import { productsRouter } from './procedures/products';
import { cartsRouter } from './procedures/carts';

export const appRouter = os.router({
  auth: authRouter,
  products: productsRouter,
  carts: cartsRouter,
});

export type AppRouter = typeof appRouter;
