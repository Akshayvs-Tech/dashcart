import { login, getCurrentUser } from './procedures/auth';
import { getProducts, getProduct, getCategories, addProduct, updateProduct, deleteProduct } from './procedures/products';
import { getUserCarts, addCart } from './procedures/carts';

export const appRouter = {
  auth: {
    login,
    getCurrentUser,
  },
  products: {
    getProducts,
    getProduct,
    getCategories,
    addProduct,
    updateProduct,
    deleteProduct,
  },
  carts: {
    getUserCarts,
    addCart,
  },
};

export type AppRouter = typeof appRouter;
