import { NextRequest, NextResponse } from 'next/server';
import { appRouter } from '@/lib/orpc/router';
import { createContext } from '@/lib/orpc/context';

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const procedure = url.pathname.replace('/api/orpc/', '');
    const body = await request.json().catch(() => ({}));

    // Parse the procedure path (e.g., "auth.login" -> ["auth", "login"])
    const [routerName, procedureName] = procedure.split('.');

    // @ts-ignore - Dynamic router access
    const router = appRouter[routerName];
    if (!router) {
      return NextResponse.json({ error: 'Router not found' }, { status: 404 });
    }

    // @ts-ignore - Dynamic procedure access
    const proc = router[procedureName];
    if (!proc) {
      return NextResponse.json({ error: 'Procedure not found' }, { status: 404 });
    }

    // Create context from request
    const context = await createContext();

    // Call the procedure handler with proper format
    const result = await proc(body, { context });
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const procedure = url.pathname.replace('/api/orpc/', '');

    const [routerName, procedureName] = procedure.split('.');

    // @ts-ignore
    const router = appRouter[routerName];
    if (!router) {
      return NextResponse.json({ error: 'Router not found' }, { status: 404 });
    }

    // @ts-ignore
    const proc = router[procedureName];
    if (!proc) {
      return NextResponse.json({ error: 'Procedure not found' }, { status: 404 });
    }

    // Create context from request
    const context = await createContext();

    const result = await proc({}, { context });
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}