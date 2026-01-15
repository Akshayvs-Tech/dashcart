import { z } from 'zod';
import { publicProcedure } from '../init';
import { os } from '@orpc/server';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const login = publicProcedure
  .input(loginSchema)
  .handler(async ({ input }) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: input.username,
        password: input.password,
        expiresInMins: 60,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid credentials');
    }

    const data = await response.json();
    return data;
  });

const getCurrentUser = publicProcedure.handler(async ({ context }) => {
  if (!context.token) {
    return null;
  }

  try {
    const response = await fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const user = await response.json();
    return user;
  } catch (error) {
    return null;
  }
});

export const authRouter = os.router({
  login,
  getCurrentUser,
});
