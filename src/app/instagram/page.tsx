import React from 'react';
import { Instagram, Heart, MessageCircle, Bookmark, Share2, Grid, Layers, PlayCircle, ExternalLink } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function InstagramPage() {
  let igPosts = [];
  try {
    await dbConnect();
    igPosts = await Post.find({ source: 'instagram' }).sort({ publishDate: -1 }).limit(12);
  } catch (error) {
    console.error('Failed to fetch Instagram posts:', error);
  }

  return (
    <div className="bg-white min-h-screen">
      {/* IG Header */}
      <section className="py-20 border-b">
        <div className="container mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="relative p-1 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full shadow-2xl">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden bg-white">
                    <img src="/hindnews.png" className="w-full h-full object-cover" alt="HNN Profile" />
                 </div>
              </div>
              <div className="text-center md:text-left space-y-4">
                 <div className="flex flex-col md:flex-row items-center md:space-x-4 mb-4">
                    <h1 className="text-3xl font-bold tracking-tight text-black">hind_nation_news_15x7</h1>
                    <div className="flex space-x-3 mt-4 md:mt-0">
                        <button className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-6 py-1.5 rounded-lg font-bold text-sm transition-colors shadow-sm">Follow</button>
                        <button className="bg-gray-100 hover:bg-gray-200 px-6 py-1.5 rounded-lg font-bold text-sm transition-colors text-black border border-gray-200">Message</button>
                    </div>
                 </div>
                 <div className="flex justify-center md:justify-start space-x-10">
                    <div className="text-center md:text-left"><span className="font-bold block text-xl">{igPosts.length}+</span> <span className="text-gray-500 text-sm">posts</span></div>
                    <div className="text-center md:text-left"><span className="font-bold block text-xl">1.2M</span> <span className="text-gray-500 text-sm">followers</span></div>
                    <div className="text-center md:text-left"><span className="font-bold block text-xl">154</span> <span className="text-gray-500 text-sm">following</span></div>
                 </div>
                 <div className="pt-2">
                    <h2 className="font-bold text-lg text-black">HIND NATION NEWS | Lalit Shishodia</h2>
                    <p className="text-gray-600 max-w-md">India's leading digital news destination. Independent, Bold, and Fast. Ground reports that matter to YOU.</p>
                    <a href="https://hindnationnews.com" className="text-[#00376b] font-bold text-sm hover:underline flex items-center mt-2">
                        <ExternalLink className="w-4 h-4 mr-1" /> hindnationnews.com
                    </a>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-white sticky top-[72px] md:top-[88px] z-30 border-b">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-center space-x-12">
               <button className="flex items-center space-x-2 py-4 border-t-2 border-black -mt-px text-xs font-bold uppercase tracking-widest transition-all">
                  <Grid className="w-4 h-4" /> <span>Posts</span>
               </button>
               <button className="flex items-center space-x-2 py-4 text-gray-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-all">
                  <PlayCircle className="w-4 h-4" /> <span>Reels</span>
               </button>
               <button className="flex items-center space-x-2 py-4 text-gray-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-all">
                  <Layers className="w-4 h-4" /> <span>Guides</span>
               </button>
            </div>
         </div>
      </section>

      {/* Grid Feed */}
      <section className="py-12 bg-gray-50 min-h-screen">
         <div className="container mx-auto px-4 md:px-6">
            {igPosts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {igPosts.map((post: any) => (
                     <a href={post.url} target="_blank" rel="noopener noreferrer" key={post.sourceId} className="group bg-white flex flex-col shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden border border-gray-100">
                        <div className="relative aspect-square overflow-hidden bg-gray-200">
                           <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-8 text-white">
                              <div className="flex items-center font-bold text-xl"><Heart className="w-7 h-7 fill-white mr-2" /> {post.likes || 0}</div>
                              <div className="flex items-center font-bold text-xl"><MessageCircle className="w-7 h-7 fill-white mr-2" /> {post.comments || 0}</div>
                           </div>
                        </div>
                        <div className="p-8 space-y-4">
                           <div className="flex items-center space-x-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-0.5">
                                 <div className="w-full h-full rounded-full border border-white overflow-hidden">
                                    <img src="/hindnews.png" alt="HNN" />
                                 </div>
                              </div>
                              <span className="text-sm font-bold uppercase tracking-widest">hind_nation_news_15x7</span>
                           </div>
                           <p className="text-gray-800 text-[15px] leading-relaxed line-clamp-3 italic">"{post.content || post.title}"</p>
                           <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                              <span className="text-primary text-[10px] font-bold uppercase tracking-widest border border-primary px-4 py-1.5 rounded-full">View on Instagram</span>
                              <Share2 className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer transition-colors" />
                           </div>
                        </div>
                     </a>
                  ))}
               </div>
            ) : (
               <div className="text-center py-20">
                  <h3 className="text-2xl font-bold text-gray-400 italic">"No Instagram posts synced yet..."</h3>
                  <p className="mt-4 text-gray-500">Add your credentials to .env and trigger a sync to see posts here.</p>
               </div>
            )}
            
            <div className="mt-20 flex justify-center">
               <a href="https://www.instagram.com/hind_nation_news_15x7?igsh=MXhjM3p1dW53MGJoNA==" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-12 py-4 rounded-xl font-bold uppercase tracking-[0.3em] text-xs hover:bg-primary transition-all shadow-xl hover:-translate-y-1">Explore More on Instagram</a>
            </div>
         </div>
      </section>
    </div>
  );
}
