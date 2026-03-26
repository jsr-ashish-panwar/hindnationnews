import { readPosts, readSettings, readVideos } from './src/lib/jsonDb';
import { adminDb } from './src/lib/firebaseAdmin';

async function migrate() {
  console.log('Starting migration...');

  // Migrate Settings
  const settings = readSettings();
  if (settings) {
    console.log('Migrating settings...');
    await adminDb.collection('settings').doc('global').set(settings);
  }

  // Migrate Posts
  const posts = readPosts();
  console.log(`Migrating ${posts.length} posts...`);
  const postBatch = adminDb.batch();
  posts.forEach((post: any) => {
    const ref = adminDb.collection('posts').doc(post.id || post._id);
    postBatch.set(ref, post);
  });
  await postBatch.commit();

  // Migrate Videos
  const videos = readVideos();
  console.log(`Migrating ${videos.length} videos...`);
  const videoBatch = adminDb.batch();
  videos.forEach((video: any) => {
    const ref = adminDb.collection('videos').doc(video.id);
    videoBatch.set(ref, video);
  });
  await videoBatch.commit();

  console.log('Migration complete!');
}

migrate().catch(console.error);
