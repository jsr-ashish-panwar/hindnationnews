import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
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
