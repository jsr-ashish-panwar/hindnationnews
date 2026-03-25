import React from 'react';
import { Youtube, Play, Calendar, ExternalLink, Share2, Filter } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function YoutubePage() {
  let ytVideos = [];
  try {
    await dbConnect();
    ytVideos = await Post.find({ source: 'youtube' }).sort({ publishDate: -1 }).limit(12);
  } catch (error) {
    console.error('Failed to fetch YouTube videos:', error);
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Header Section */}
      <section className="py-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/5 backdrop-blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="inline-flex items-center space-x-4 bg-red-600 px-6 py-2 rounded-full mb-8 shadow-xl">
             <Youtube className="w-8 h-8 fill-white" />
             <span className="font-bold uppercase tracking-widest text-sm">HIND NATION CHANNEL</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">Latest <span className="text-red-600">Broadcasts</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Watch in-depth investigative reports, exclusive interviews, and ground-zero updates from our official YouTube channel.</p>
        </div>
      </section>

      {/* Videos Feed */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-6 md:space-y-0">
             <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-red-600" />
                <span className="font-bold uppercase tracking-widest text-sm text-gray-400">Sort by: Newest First</span>
             </div>
             <a href="https://www.youtube.com/@lalitshishodia15" target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 font-bold uppercase tracking-widest text-sm rounded transition-all shadow-lg hover:scale-105 active:scale-95 text-center">Subscribe to Channel</a>
          </div>

          {ytVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {ytVideos.map((video: any) => (
                <div key={video.sourceId} className="group flex flex-col bg-zinc-900 overflow-hidden border border-white/5 hover:border-red-600/50 transition-all rounded-xl shadow-2xl">
                   <div className="relative aspect-video overflow-hidden">
                      <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <a href={video.url} target="_blank" rel="noopener noreferrer" className="bg-red-600 p-5 rounded-full scale-75 group-hover:scale-100 transition-transform shadow-2xl">
                              <Play className="w-8 h-8 fill-white" />
                          </a>
                      </div>
                   </div>
                   <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                          <div className="flex items-center justify-between mb-4">
                              <span className="text-[10px] font-bold uppercase bg-red-600/10 text-red-500 px-3 py-1 rounded border border-red-600/20">LATEST</span>
                              <div className="flex items-center space-x-1.5 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{new Date(video.publishDate).toLocaleDateString()}</span>
                              </div>
                          </div>
                          <h3 className="text-xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-red-500 transition-colors">{video.title}</h3>
                          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed mb-6">{video.excerpt}</p>
                      </div>
                      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                          <a href={video.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-xs font-bold uppercase tracking-[0.2em] text-white hover:text-red-500 transition-all">
                              <span>Watch Now</span>
                              <ExternalLink className="w-4 h-4" />
                          </a>
                          <button className="text-gray-500 hover:text-white transition-colors">
                              <Share2 className="w-5 h-5" />
                          </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
               <h3 className="text-2xl font-bold text-gray-600 italic">"No YouTube videos synced yet..."</h3>
               <p className="mt-4 text-gray-500">Enable YouTube Sync in .env to see broadcasts here.</p>
            </div>
          )}

          <div className="mt-20 text-center">
             <a href="https://www.youtube.com/@lalitshishodia15" target="_blank" rel="noopener noreferrer" className="px-12 py-4 border-2 border-white/10 rounded font-bold uppercase tracking-[0.3em] text-sm hover:border-red-600 hover:text-red-600 transition-all">Explore Entire Channel</a>
          </div>
        </div>
      </section>
    </div>
  );
}
