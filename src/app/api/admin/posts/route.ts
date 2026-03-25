import { NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/jsonDb';

export async function GET(request: Request) {
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = readPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const posts = readPosts();

    const newPost = {
      ...body,
      id: body.id || `manual-${Date.now()}`,
      source: 'manual',
      sourceId: body.sourceId || `manual-${Date.now()}`,
      createdAt: body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (body.id) {
      const idx = posts.findIndex((p: any) => p.id === body.id);
      if (idx !== -1) posts[idx] = newPost;
      else posts.push(newPost);
    } else {
      posts.push(newPost);
    }

    writePosts(posts);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create post' }, { status: 500 });
  }
}
