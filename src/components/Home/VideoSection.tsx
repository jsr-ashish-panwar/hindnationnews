'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Calendar, Youtube, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_CATEGORIES = ['All', 'Crime Story', 'Sports', 'Politics', 'Health and Yoga', 'Bollywood', 'World News'];

export default function VideoSection() {
  const [videos, setVideos] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/videos')
      .then(res => res.json())
      .then(data => {
        setVideos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch videos:', err);
        setLoading(false);
      });
  }, []);

  const filteredVideos = activeCategory === 'All' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 space-y-8 lg:space-y-0 text-left">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-600 rounded-2xl shadow-2xl shadow-red-600/20">
                  <Youtube className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">News <span className="text-red-600">Vision</span></h2>
            </div>
            <p className="text-gray-400 text-sm md:text-lg max-w-2xl font-medium">
              Experience the raw power of journalism. Watch high-impact reports and exclusive coverage from across the nation.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {VIDEO_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border shrink-0",
                    activeCategory === cat 
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/20 scale-105" 
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredVideos.length === 0 && (
               <div className="col-span-full py-24 text-center text-gray-500 italic border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                 <p className="text-xl font-bold uppercase tracking-wider mb-2">No videos found</p>
                 <p className="text-sm">There are no reports currently available in the "{activeCategory}" category.</p>
               </div>
            )}
            {filteredVideos.map((video: any) => (
              <a key={video.id} href={video.url || "https://www.youtube.com/@lalitshishodia15"} target="_blank" rel="noopener noreferrer" className="group">
                <div className="relative aspect-video overflow-hidden rounded-2xl mb-5 shadow-2xl border border-white/5">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="bg-red-600 p-5 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)] scale-75 group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
                      </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/90 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/10 tracking-widest">
                      {video.duration || '00:00'}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      {video.category || 'General'}
                    </span>
                  </div>
                </div>
                <h3 className="font-black text-xl leading-tight group-hover:text-red-500 transition-colors line-clamp-2 italic tracking-tight">
                  {video.title}
                </h3>
                <div className="flex items-center mt-4 space-x-4">
                  <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-red-600" />
                    {video.date}
                  </div>
                  <div className="flex items-center text-red-600 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                    <span>Watch Now</span>
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
