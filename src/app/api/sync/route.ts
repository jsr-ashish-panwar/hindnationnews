import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';
import { fetchInstagramPosts, fetchYoutubeVideos, fetchXPosts } from '@/lib/api';

export async function GET(request: Request) {
  // Check for admin secret if provided (optional security)
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (process.env.ADMIN_SECRET && secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    // Sync Instagram
    const igPosts = await fetchInstagramPosts();
    const igResults = await Promise.all(igPosts.map(async (post: any) => {
      return await Post.findOneAndUpdate(
        { sourceId: post.sourceId },
        { ...post },
        { upsert: true, new: true }
      );
    }));

    // Sync YouTube
    const ytVideos = await fetchYoutubeVideos();
    const ytResults = await Promise.all(ytVideos.map(async (video: any) => {
      return await Post.findOneAndUpdate(
        { sourceId: video.sourceId },
        { ...video },
        { upsert: true, new: true }
      );
    }));

    // Sync X (Twitter)
    const xPosts = await fetchXPosts();
    const xResults = await Promise.all(xPosts.map(async (post: any) => {
      return await Post.findOneAndUpdate(
        { sourceId: post.sourceId },
        { ...post },
        { upsert: true, new: true }
      );
    }));

    return NextResponse.json({
      message: 'Sync completed successfully',
      instagramCount: igResults.length,
      youtubeCount: ytResults.length,
      xCount: xResults.length
    });
  } catch (error: any) {
    console.error('Sync Error:', error);
    const status = error.name === 'MongooseServerSelectionError' ? 503 : 500;
    const message = error.name === 'MongooseServerSelectionError' 
      ? 'Database connection failed. Please ensure MongoDB is running.' 
      : error.message;
    return NextResponse.json({ error: message }, { status });
  }
}
