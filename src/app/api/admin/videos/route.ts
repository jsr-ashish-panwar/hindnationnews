import { NextRequest, NextResponse } from 'next/server';
import { readVideos, writeVideos } from '@/lib/jsonDb';
import { headers } from 'next/headers';

export async function GET() {
  const videos = readVideos();
  return NextResponse.json(videos);
}

export async function POST(req: NextRequest) {
  const headerList = await headers();
  const secret = headerList.get('x-admin-secret');
  
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await req.json();
    
    // If it's a single video addition
    if (data.action === 'add') {
      const videos = readVideos();
      const newVideo = {
        ...data.video,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      videos.unshift(newVideo); // Add to beginning
      writeVideos(videos);
      return NextResponse.json(newVideo);
    }
    
    // If it's a delete operation
    if (data.action === 'delete') {
      let videos = readVideos();
      videos = videos.filter((v: any) => v.id !== data.id);
      writeVideos(videos);
      return NextResponse.json({ success: true });
    }

    // Default: overwrite all (for reordering etc if needed later)
    if (Array.isArray(data)) {
      writeVideos(data);
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
