import { NextResponse } from 'next/server';
import { readSettings, writeSettings } from '@/lib/jsonDb';

export async function GET(request: Request) {
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = readSettings() || { siteName: 'HIND NATION NEWS' };
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    writeSettings(body);
    return NextResponse.json(body);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
  }
}
