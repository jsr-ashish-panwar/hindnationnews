import React from 'react';
import Link from 'next/link';
import { Play, Calendar, Youtube } from 'lucide-react';
import { getVideos } from '@/lib/dataService';

export default async function VideoSection() {
  const videos = await getVideos();
  
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 md:mb-12 space-y-6 md:space-y-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="p-2.5 md:p-3 bg-red-600 rounded-lg shadow-xl shadow-red-900/20">
                <Youtube className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">Video Portal</h2>
                <p className="text-gray-300 text-xs md:text-sm">Watch the latest reports by Lalit Shishodia</p>
            </div>
          </div>
          <Link 
            href="https://www.youtube.com/@lalitshishodia15" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-2.5 border border-white/20 hover:border-red-600 hover:bg-red-600 transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs text-center inline-block"
          >
            View All Videos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {videos.length === 0 && (
             <div className="col-span-full py-20 text-center text-gray-500 italic">
               No videos in the portal yet.
             </div>
          )}
          {videos.map((video: any) => (
            <a key={video.id} href={video.url || "https://www.youtube.com/@lalitshishodia15"} target="_blank" rel="noopener noreferrer" className="group">
              <div className="relative aspect-video overflow-hidden rounded-sm mb-4">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-red-600 p-4 rounded-full shadow-2xl scale-75 group-hover:scale-100 transition-transform">
                        <Play className="w-6 h-6 fill-white text-white" />
                    </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-[10px] font-bold px-2 py-1">
                    {video.duration || '00:00'}
                </div>
              </div>
              <h3 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                {video.title}
              </h3>
              <div className="flex items-center mt-3 text-gray-300 text-xs">
                <Calendar className="w-3 h-3 mr-1.5" />
                {video.date}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
