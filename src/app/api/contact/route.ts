import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Save to Payload
    const payload = await getPayload({ config });
    const entry = await payload.create({
      collection: 'contacts',
      data: { name, email, message },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save newsletter' }, { status: 500 });
  }
}