import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    console.log('Secure Contact Submission Received:', { name, email, subject, message });

    // TODO: Connect to Supabase when client environment variables are injected.
    // E.g.:
    // const { data, error } = await supabaseClient.from('contact_submissions').insert([{ name, email, subject, message }]);
    
    // Simulate successful write
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ success: true, message: 'Message logged successfully' }, { status: 200 });
  } catch (err: unknown) {
    console.error('Contact endpoint error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
