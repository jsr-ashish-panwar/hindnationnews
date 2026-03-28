import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in environment variables.');
  process.exit(1);
}

// Define Schemas (simplified for migration)
const PostSchema = new mongoose.Schema({
  id: String,
  title: String,
  excerpt: String,
  content: String,
  image: String,
  category: String,
  source: String,
  sourceId: { type: String, unique: true },
  publishDate: Date,
  author: String,
  isTrending: Boolean,
  isPublished: Boolean
}, { timestamps: true });

const VideoSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: String,
  url: String,
  thumbnail: String,
  duration: String,
  category: String,
  publishDate: Date
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  siteName: String,
  tagline: String,
  contactEmail: String,
  contactPhone: String,
  contactLandline: String,
  facebookUrl: String,
  twitterUrl: String,
  instagramUrl: String,
  youtubeUrl: String,
  articlesPerPage: Number,
  breakingNewsTicker: String
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);
const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI!);
    console.log('Connected successfully.');

    const dataDir = path.join(process.cwd(), 'data');

    // 1. Migrate Posts
    const postsPath = path.join(dataDir, 'posts.json');
    if (fs.existsSync(postsPath)) {
      const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
      console.log(`Found ${posts.length} posts. Migrating...`);
      for (const post of posts) {
        // Handle sourceId uniqueness
        await Post.findOneAndUpdate(
          { sourceId: post.sourceId || post.id },
          { ...post, sourceId: post.sourceId || post.id },
          { upsert: true, new: true }
        );
      }
      console.log('Posts migrated.');
    }

    // 2. Migrate Videos
    const videosPath = path.join(dataDir, 'videos.json');
    if (fs.existsSync(videosPath)) {
      const videos = JSON.parse(fs.readFileSync(videosPath, 'utf8'));
      console.log(`Found ${videos.length} videos. Migrating...`);
      for (const video of videos) {
        await Video.findOneAndUpdate(
          { id: video.id || video.url },
          { ...video, id: video.id || video.url },
          { upsert: true, new: true }
        );
      }
      console.log('Videos migrated.');
    }

    // 3. Migrate Settings
    const settingsPath = path.join(dataDir, 'settings.json');
    if (fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
      console.log('Migrating settings...');
      await Settings.findOneAndUpdate(
        { id: 'global' },
        { ...settings, id: 'global' },
        { upsert: true, new: true }
      );
      console.log('Settings migrated.');
    }

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
