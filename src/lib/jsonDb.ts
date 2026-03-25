import fs from 'fs';
import path from 'path';

const isServerless = process.env.NETLIFY === 'true' || process.env.VERCEL === '1' || !!process.env.LAMBDA_TASK_ROOT;
const DATA_DIR = isServerless ? '/tmp' : path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure directory exists
if (!isServerless && !fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed for serverless if file doesn't exist
if (isServerless && !fs.existsSync(POSTS_FILE)) {
  const localPosts = path.join(process.cwd(), 'data', 'posts.json');
  if (fs.existsSync(localPosts)) {
    fs.copyFileSync(localPosts, POSTS_FILE);
  } else {
    fs.writeFileSync(POSTS_FILE, JSON.stringify([], null, 2));
  }
}

export function readPosts() {
  if (!fs.existsSync(POSTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
}

export function writePosts(posts: any[]) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
}

export function readSettings() {
  if (!fs.existsSync(SETTINGS_FILE)) return null;
  return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
}

export function writeSettings(settings: any) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
}
