import { cookies } from 'next/headers';

export async function createContext() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  return {
    token: token || null,
    userId: null, // Will be populated after decoding token if needed
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
