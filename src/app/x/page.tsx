import React from 'react';
import { Twitter, MessageSquare, Repeat2, Heart, Share, ExternalLink, ShieldCheck } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function XPage() {
  let xPosts = [];
  try {
    await dbConnect();
    xPosts = await Post.find({ source: 'x' }).sort({ publishDate: -1 }).limit(10);
  } catch (error) {
    console.error('Failed to fetch X posts:', error);
  }

  return (
    <div className="bg-[#1DA1F2]/5 min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#1DA1F2]/10 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-6 opacity-10 text-[#1DA1F2]"><Twitter className="w-32 h-32 fill-current" /></div>
           <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg shrink-0 z-10">
              <img src="/hindnews.png" className="w-full h-full object-cover" alt="HNN X" />
           </div>
           <div className="text-center md:text-left z-10">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                 <h1 className="text-3xl font-bold text-black">HIND NATION NEWS</h1>
                 <ShieldCheck className="w-6 h-6 text-[#1DA1F2] fill-current" />
              </div>
              <p className="text-[#1DA1F2] font-bold">@cahindnews</p>
              <p className="text-gray-600 mt-2 max-w-lg italic">"Your window to the truth. Official X handle of HIND NATION NEWS."</p>
           </div>
           <div className="md:ml-auto z-10">
              <a href="https://x.com/cahindnews" target="_blank" rel="noopener noreferrer" className="bg-black text-white px-8 py-2.5 rounded-full font-bold hover:bg-[#1DA1F2] transition-colors shadow-lg">Follow Now</a>
           </div>
        </div>

        {/* X Feed */}
        <div className="space-y-8">
           <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 flex items-center space-x-3 text-black">
              <span>Latest Updates</span>
              <div className="h-1 w-20 bg-[#1DA1F2] rounded-full"></div>
           </h2>
           
           {xPosts.length > 0 ? (
              xPosts.map((tweet: any) => (
                 <div key={tweet.sourceId} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-50 group hover:shadow-2xl transition-all duration-300">
                    <div className="flex space-x-4">
                       <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                          <img src="/hindnews.png" className="w-full h-full object-cover" alt="Avatar" />
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                             <span className="font-bold text-black">HIND NATION NEWS</span>
                             <ShieldCheck className="w-4 h-4 text-[#1DA1F2] fill-[#1DA1F2]" />
                             <span className="text-gray-400 text-sm">@cahindnews · {new Date(tweet.publishDate).toLocaleDateString()}</span>
                          </div>
                          <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">{tweet.content || tweet.title}</p>
                          
                          <div className="flex items-center justify-between text-gray-500 max-w-md">
                             <button className="flex items-center space-x-2 group/action hover:text-blue-500 transition-colors">
                                <div className="p-2 rounded-full group-hover/action:bg-blue-50"><MessageSquare className="w-5 h-5" /></div>
                                <span className="text-sm font-bold">{tweet.metadata?.replies || 0}</span>
                             </button>
                             <button className="flex items-center space-x-2 group/action hover:text-green-500 transition-colors">
                                <div className="p-2 rounded-full group-hover/action:bg-green-50"><Repeat2 className="w-5 h-5" /></div>
                                <span className="text-sm font-bold">{tweet.metadata?.retweets || 0}</span>
                             </button>
                             <button className="flex items-center space-x-2 group/action hover:text-red-500 transition-colors">
                                <div className="p-2 rounded-full group-hover/action:bg-red-50"><Heart className="w-5 h-5" /></div>
                                <span className="text-sm font-bold">{tweet.metadata?.likes || 0}</span>
                             </button>
                             <a href={tweet.url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 group/action hover:text-blue-500 transition-colors">
                                <div className="p-2 rounded-full group-hover/action:bg-blue-50"><Share className="w-5 h-5" /></div>
                             </a>
                          </div>
                       </div>
                    </div>
                 </div>
              ))
           ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                 <h3 className="text-2xl font-bold text-gray-300 italic">"No tweets synced yet..."</h3>
                 <p className="mt-4 text-gray-400">Syncing from X requires API access. Use manual posts for now or add X credentials.</p>
              </div>
           )}
        </div>

        <div className="mt-16 text-center">
            <a href="https://x.com/cahindnews" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-3 bg-white border border-[#1DA1F2] text-[#1DA1F2] px-10 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#1DA1F2] hover:text-white transition-all shadow-xl">
                <span>See More on X</span>
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
      </div>
    </div>
  );
}
