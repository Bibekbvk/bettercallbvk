import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, items, total } = body;

    if (!email || !items || !total) {
      return NextResponse.json({ error: 'Missing checkout parameters' }, { status: 400 });
    }

    console.log('Stripe checkout simulation triggered for:', email, { items, total });

    // Simulate database write of order (will be fully integrated with Supabase orders later)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: 'Transaction completed successfully' }, { status: 200 });
  } catch (err: unknown) {
    console.error('Checkout API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
