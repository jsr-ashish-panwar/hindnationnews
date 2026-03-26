import dbConnect from './mongodb';
import Post from '@/models/Post';
import Settings from '@/models/Settings';
import { readPosts, writePosts, readSettings, writeSettings, readVideos, writeVideos } from './jsonDb';
import { adminDb } from './firebaseAdmin';

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
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  articlesPerPage: number;
  breakingNewsTicker: string;
}

const isMongoEnabled = !!process.env.MONGODB_URI && process.env.MONGODB_URI.startsWith('mongodb');
const isFirebaseEnabled = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export async function getPosts(): Promise<PostData[]> {
  if (isFirebaseEnabled) {
    try {
      const snapshot = await adminDb.collection('posts').orderBy('publishDate', 'desc').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PostData));
    } catch (error) {
      console.error('Firebase Fetch Error, falling back:', error);
    }
  }

  if (isServerless() && isMongoEnabled) {
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
  if (isFirebaseEnabled) {
    try {
      const doc = await adminDb.collection('posts').doc(id).get();
      if (doc.exists) return { id: doc.id, ...doc.data() } as PostData;
    } catch (error) {
      console.error('Firebase Detail Fetch Error:', error);
    }
  }

  if (isServerless() && isMongoEnabled) {
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

  if (isFirebaseEnabled) {
    try {
      const docRef = isUpdate 
        ? adminDb.collection('posts').doc(targetId)
        : adminDb.collection('posts').doc();
      
      const finalData = {
        ...refinedData,
        id: docRef.id,
        updatedAt: new Date().toISOString()
      };
      
      if (!isUpdate) {
        (finalData as any).createdAt = new Date().toISOString();
        (finalData as any).source = data.source || 'manual';
        (finalData as any).sourceId = data.sourceId || `manual-${Date.now()}`;
      }
      
      await docRef.set(finalData, { merge: true });
      return finalData as PostData;
    } catch (error) {
      console.error('Firebase Save Error:', error);
    }
  }

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
      console.error('MongoDB Save Error, fallback to JSON:', error);
      if (isServerless()) throw error;
    }
  }

  // JSON Fallback
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
  if (isFirebaseEnabled) {
    try {
      await adminDb.collection('posts').doc(id).delete();
      return true;
    } catch (error) {
      console.error('Firebase Delete Error:', error);
    }
  }

  if (isMongoEnabled) {
    try {
      await dbConnect();
      const result = await Post.deleteOne({ $or: [{ _id: id }, { id: id }] });
      if (result.deletedCount > 0) return true;
    } catch (error) {
      console.error('MongoDB Delete Error:', error);
      if (isServerless()) throw error;
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
  if (isFirebaseEnabled) {
    try {
      const doc = await adminDb.collection('settings').doc('global').get();
      if (doc.exists) return doc.data() as SettingsData;
    } catch (error) {
      console.error('Firebase Settings Fetch Error:', error);
    }
  }

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
    contactEmail: 'info@hindnationnews.com',
    contactPhone: '+91 99108 35426',
    articlesPerPage: 10,
    breakingNewsTicker: 'Stay tuned for the latest breaking news from across India.'
  };
}

export async function saveSettings(data: SettingsData): Promise<SettingsData> {
  if (isFirebaseEnabled) {
    try {
      await adminDb.collection('settings').doc('global').set(data, { merge: true });
      return data;
    } catch (error) {
      console.error('Firebase Settings Save Error:', error);
    }
  }

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
      if (isServerless()) throw error;
    }
  }

  writeSettings(data);
  return data;
}

export async function getVideos(): Promise<any[]> {
  if (isFirebaseEnabled) {
    try {
      const snapshot = await adminDb.collection('videos').get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Firebase Videos Fetch Error:', error);
    }
  }

  // For now, videos are only in JSON to keep it simple as requested
  return readVideos();
}

function isServerless() {
  return process.env.NETLIFY === 'true' || process.env.VERCEL === '1' || !!process.env.LAMBDA_TASK_ROOT;
}
