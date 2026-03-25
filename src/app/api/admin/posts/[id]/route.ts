import { NextResponse } from 'next/server';
import { readPosts, writePosts } from '@/lib/jsonDb';

type PageParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: PageParams) {
  const params = await context.params;
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = readPosts();
    const post = posts.find((p: any) => p.id === params.id || p._id === params.id);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: PageParams) {
  const params = await context.params;
  const secret = request.headers.get('x-admin-secret');
  
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const posts = readPosts();
    const postIndex = posts.findIndex((p: any) => p.id === params.id || p._id === params.id);
    
    if (postIndex === -1) {
       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    posts[postIndex] = { ...posts[postIndex], ...body };
    writePosts(posts);
    
    return NextResponse.json(posts[postIndex]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
  }
}

export async function PUT(request: Request, context: PageParams) {
  const params = await context.params;
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const posts = readPosts();
    const postIndex = posts.findIndex((p: any) => p.id === params.id || p._id === params.id);
    
    if (postIndex === -1) {
       return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    posts[postIndex] = body;
    writePosts(posts);

    return NextResponse.json(posts[postIndex]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: PageParams) {
  const params = await context.params;
  const secret = request.headers.get('x-admin-secret');

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = readPosts();
    const initialLength = posts.length;
    const filteredPosts = posts.filter((p: any) => p.id !== params.id && p._id !== params.id);
    
    if (filteredPosts.length === initialLength) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    writePosts(filteredPosts);
    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
