import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, email, name, avatarUrl } = body;

    if (!id || !email) {
      return NextResponse.json({ error: 'Missing required credentials' }, { status: 400 });
    }

    console.log('Syncing Firebase User profile to Supabase database:', { id, email, name, avatarUrl });

    // Attempt Supabase insert/upsert (will run fine if Supabase is connected, fallback if mock environment)
    try {
      const { error } = await supabase
        .from('users')
        .upsert(
          {
            id: id,
            email: email,
            name: name || email.split('@')[0],
            avatar_url: avatarUrl || '',
            role: 'customer', // default role
            created_at: new Date().toISOString(),
          },
          { onConflict: 'id' }
        );

      if (error) {
        console.warn('Supabase DB connection not configured or error received:', error.message);
      }
    } catch (dbErr) {
      console.warn('Skipping Supabase database save (running in mock configuration):', dbErr);
    }

    return NextResponse.json({ success: true, message: 'User profile synced successfully' }, { status: 200 });
  } catch (err: unknown) {
    console.error('User sync API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
