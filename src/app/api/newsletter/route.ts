import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@payload-config';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Save to Payload
    const payload = await getPayload({ config });
    const entry = await payload.create({
      collection: 'newsletters',
      data: { email },
    });

    return NextResponse.json({ success: true, entry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save newsletter' }, { status: 500 });
  }
}