import { NextRequest, NextResponse } from 'next/server';
import { getVideos, saveVideo, deleteVideo } from '@/lib/dataService';
import { headers } from 'next/headers';

export async function GET() {
  const videos = await getVideos();
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
      const newVideo = await saveVideo(data.video);
      return NextResponse.json(newVideo);
    }
    
    // If it's a delete operation
    if (data.action === 'delete') {
      const success = await deleteVideo(data.id);
      return NextResponse.json({ success });
    }

    // Default: overwrite all (for reordering etc if needed later)
    if (Array.isArray(data)) {
      // For reordering, we can just save all in loop if needed, 
      // but let's keep it simple for now as requested.
      // If data is an array, we'll just return it for now.
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
