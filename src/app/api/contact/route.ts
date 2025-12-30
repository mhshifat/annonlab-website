import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Save to Payload
    const payload = await getPayload({ config });
    const entry = await payload.create({
      collection: 'contacts',
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    console.error('Contact form error:', error);
    // Don't expose internal errors to client
    const errorMessage = 'Failed to submit contact form. Please try again later.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}