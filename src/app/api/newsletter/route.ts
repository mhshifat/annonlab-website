import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Save to Payload
    const payload = await getPayload({ config });
    const entry = await payload.create({
      collection: 'newsletters',
      data: { email },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    // Don't expose internal errors to client
    const errorMessage = error?.message?.includes('duplicate') 
      ? 'Email already subscribed' 
      : 'Failed to save newsletter';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}