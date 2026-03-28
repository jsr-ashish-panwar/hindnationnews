import dbConnect from './mongodb';
import Post from '@/models/Post';
import Settings from '@/models/Settings';
import Video from '@/models/Video';
import { readPosts, writePosts, readSettings, writeSettings, readVideos, writeVideos } from './jsonDb';

export interface PostData {
  id?: string;
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  source: string;
  sourceId: string;
  publishDate: string | Date;
  author?: string;
  isTrending?: boolean;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SettingsData {
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactLandline: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  articlesPerPage: number;
  breakingNewsTicker: string;
}

const isMongoEnabled = !!process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb');

export async function getPosts(): Promise<PostData[]> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const posts = await Post.find({}).sort({ publishDate: -1 }).lean();
      return JSON.parse(JSON.stringify(posts));
    } catch (error) {
      console.error('MongoDB Fetch Error, falling back to JSON:', error);
    }
  }
  
  const posts = readPosts();
  return posts.sort((a: any, b: any) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export async function getPostById(id: string): Promise<PostData | null> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const post = await Post.findOne({ $or: [{ _id: id }, { id: id }] }).lean();
      if (post) return JSON.parse(JSON.stringify(post));
    } catch (error) {
      console.error('MongoDB Detail Fetch Error:', error);
    }
  }
  
  const posts = readPosts();
  return posts.find((p: any) => p.id === id || p._id === id) || null;
}

export async function savePost(data: PostData): Promise<PostData> {
  const isUpdate = !!(data.id || data._id);
  const targetId = data.id || data._id;

  // Ensure publishDate is valid
  const pDate = data.publishDate ? new Date(data.publishDate) : new Date();
  const publishDate = isNaN(pDate.getTime()) ? new Date() : pDate;
  
  const refinedData = {
    ...data,
    publishDate: publishDate.toISOString()
  };

  if (isMongoEnabled) {
    try {
      await dbConnect();
      if (isUpdate) {
        const updated = await Post.findOneAndUpdate(
          { $or: [{ _id: targetId }, { id: targetId }] },
          { ...refinedData, updatedAt: new Date() },
          { new: true, upsert: true }
        ).lean();
        return JSON.parse(JSON.stringify(updated));
      } else {
        const created = await Post.create({
          ...refinedData,
          id: data.id || `manual-${Date.now()}`,
          source: data.source || 'manual',
          sourceId: data.sourceId || `manual-${Date.now()}`
        });
        return JSON.parse(JSON.stringify(created));
      }
    } catch (error) {
      console.error('MongoDB Save Error:', error);
      throw error;
    }
  }

  // JSON Fallback
  if (isServerless()) {
    throw new Error('Database not connected. Cannot persist changes on Netlify/Vercel without MongoDB.');
  }

  const posts = readPosts();
  const refinedPost = {
    ...refinedData,
    id: targetId || `manual-${Date.now()}`,
    source: data.source || 'manual',
    sourceId: data.sourceId || `manual-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };

  if (isUpdate) {
    const idx = posts.findIndex((p: any) => p.id === targetId || p._id === targetId);
    if (idx !== -1) posts[idx] = refinedPost;
    else posts.push(refinedPost);
  } else {
    posts.push({ ...refinedPost, createdAt: new Date().toISOString() });
  }

  writePosts(posts);
  return refinedPost;
}

export async function deletePost(id: string): Promise<boolean> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const result = await Post.deleteOne({ $or: [{ _id: id }, { id: id }] });
      if (result.deletedCount > 0) return true;
    } catch (error) {
      console.error('MongoDB Delete Error:', error);
      throw error;
    }
  }

  const posts = readPosts();
  const filtered = posts.filter((p: any) => p.id !== id && p._id !== id);
  if (filtered.length < posts.length) {
    writePosts(filtered);
    return true;
  }
  return false;
}

export async function getSettings(): Promise<SettingsData> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const settings = await Settings.findOne({ id: 'global' }).lean();
      if (settings) return JSON.parse(JSON.stringify(settings));
    } catch (error) {
      console.error('MongoDB Settings Fetch Error:', error);
    }
  }

  return readSettings() || {
    siteName: 'HIND NATION NEWS',
    tagline: "India's Voice, Your News Portal",
    contactEmail: 'hindnationnews18x7@gmail.com',
    contactPhone: '+91 99108 35426',
    contactLandline: '0120-5044958',
    articlesPerPage: 10,
    breakingNewsTicker: 'Stay tuned for the latest breaking news from across India.'
  };
}

export async function saveSettings(data: SettingsData): Promise<SettingsData> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const updated = await Settings.findOneAndUpdate(
        { id: 'global' },
        { ...data, id: 'global' },
        { new: true, upsert: true }
      ).lean();
      return JSON.parse(JSON.stringify(updated));
    } catch (error) {
      console.error('MongoDB Settings Save Error:', error);
      throw error;
    }
  }

  if (isServerless()) {
    throw new Error('Database not connected. Cannot persist changes on Netlify/Vercel without MongoDB.');
  }

  writeSettings(data);
  return data;
}

export async function getVideos(): Promise<any[]> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const videos = await Video.find({}).sort({ publishDate: -1 }).lean();
      if (videos && videos.length > 0) return JSON.parse(JSON.stringify(videos));
    } catch (error) {
      console.error('MongoDB Video Fetch Error:', error);
    }
  }
  return readVideos();
}

export async function saveVideo(data: any): Promise<any> {
  const isUpdate = !!data.id;
  
  if (isMongoEnabled) {
    try {
      await dbConnect();
      if (isUpdate) {
        const updated = await Video.findOneAndUpdate(
          { id: data.id },
          { ...data, updatedAt: new Date() },
          { new: true, upsert: true }
        ).lean();
        return JSON.parse(JSON.stringify(updated));
      } else {
        const created = await Video.create({
          ...data,
          id: data.id || `vid-${Date.now()}`,
          publishDate: data.publishDate || new Date()
        });
        return JSON.parse(JSON.stringify(created));
      }
    } catch (error) {
      console.error('MongoDB Video Save Error:', error);
      throw error;
    }
  }

  // JSON Fallback
  if (isServerless()) {
    throw new Error('Database not connected. Cannot persist changes on Netlify/Vercel without MongoDB.');
  }

  const videos = readVideos();
  const refinedVideo = {
    ...data,
    id: data.id || `vid-${Date.now()}`,
    updatedAt: new Date().toISOString()
  };

  if (isUpdate) {
    const idx = videos.findIndex((v: any) => v.id === data.id);
    if (idx !== -1) videos[idx] = refinedVideo;
    else videos.push(refinedVideo);
  } else {
    videos.unshift(refinedVideo);
  }

  writeVideos(videos);
  return refinedVideo;
}

export async function deleteVideo(id: string): Promise<boolean> {
  if (isMongoEnabled) {
    try {
      await dbConnect();
      const result = await Video.deleteOne({ id });
      if (result.deletedCount > 0) return true;
    } catch (error) {
      console.error('MongoDB Video Delete Error:', error);
      throw error;
    }
  }

  const videos = readVideos();
  const filtered = videos.filter((v: any) => v.id !== id);
  if (filtered.length < videos.length) {
    writeVideos(filtered);
    return true;
  }
  return false;
}

function isServerless() {
  return process.env.NETLIFY === 'true' || process.env.VERCEL === '1' || !!process.env.LAMBDA_TASK_ROOT;
}
