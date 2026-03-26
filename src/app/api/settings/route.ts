import { NextResponse } from 'next/server';
import { readSettings } from '@/lib/jsonDb';

export async function GET() {
  try {
    const settings = readSettings() || {
      siteName: 'HIND NATION NEWS',
      tagline: "India's Voice, Your News Portal",
      contactEmail: 'hindnationnews18x7@gmail.com',
      contactPhone: '+91 99108 35426',
      twitterUrl: 'https://x.com/cahindnews',
      instagramUrl: 'https://www.instagram.com/hind_nation_news_15x7',
      youtubeUrl: 'https://www.youtube.com/@lalitshishodia15',
      articlesPerPage: 10,
      breakingNewsTicker: 'Stay tuned for the latest breaking news from across India.'
    };
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
