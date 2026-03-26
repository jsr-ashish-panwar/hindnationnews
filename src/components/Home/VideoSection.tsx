import React from 'react';
import Link from 'next/link';
import { Play, Calendar, Youtube } from 'lucide-react';

const videos = [
  {
    id: '23iKkISAOsk',
    title: "भारत में गैस की किल्लत कब तक? - Exclusive Report",
    thumbnail: "https://img.youtube.com/vi/23iKkISAOsk/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=23iKkISAOsk",
    duration: "10:32",
    date: "Mar 26, 2026"
  },
  {
    id: 'SowM75jy0Go',
    title: "अध्यापक के सामने नई समस्या टेट? - Latest Update",
    thumbnail: "https://img.youtube.com/vi/SowM75jy0Go/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=SowM75jy0Go",
    duration: "08:15",
    date: "Mar 25, 2026"
  },
  {
    id: 'F04VUEbesms',
    title: "फरसा बाबा की हत्या या फिर साजिश - Investigative Report",
    thumbnail: "https://img.youtube.com/vi/F04VUEbesms/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=F04VUEbesms",
    duration: "12:45",
    date: "Mar 24, 2026"
  },
  {
    id: 'aSPFJQbRChg',
    title: "दमोहा मध्यप्रदेश में भारत विश्वकर्मा हत्याकांड की सच्चाई",
    thumbnail: "https://img.youtube.com/vi/aSPFJQbRChg/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=aSPFJQbRChg",
    duration: "15:20",
    date: "Mar 23, 2026"
  }
];

export default function VideoSection() {
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
          {videos.map((video) => (
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
                    {video.duration}
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
