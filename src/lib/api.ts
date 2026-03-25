/**
 * Utility functions for YouTube and Instagram API integrations.
 */

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

export async function fetchYoutubeVideos() {
  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    console.warn('YouTube API credentials missing');
    return [];
  }

  const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) throw new Error(data.error.message);
    
    return data.items.map((item: any) => ({
      sourceId: item.id.videoId,
      title: item.snippet.title,
      excerpt: item.snippet.description,
      image: item.snippet.thumbnails.high.url,
      publishDate: new Date(item.snippet.publishedAt),
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      source: 'youtube'
    }));
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

export async function fetchInstagramPosts() {
  if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
    console.warn('Instagram API credentials missing');
    return [];
  }

  const url = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    if (data.error) throw new Error(data.error.message);
    
    return data.data.map((item: any) => {
      // Basic logic to convert caption into headline
      const caption = item.caption || '';
      const headline = caption.split('\n')[0].substring(0, 100) || 'Latest Update';
      
      return {
        sourceId: item.id,
        title: headline,
        excerpt: caption.substring(headline.length, headline.length + 200),
        content: caption,
        image: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
        publishDate: new Date(item.timestamp),
        url: item.permalink,
        source: 'instagram'
      };
    });
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return [];
  }
}
export async function fetchXPosts() {
  console.warn('X sync not yet fully implemented due to API restrictions');
  return [];
}
