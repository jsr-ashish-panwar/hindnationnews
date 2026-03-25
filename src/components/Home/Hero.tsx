"use client";
import React, { useState } from 'react';
import NewsCard from '@/components/NewsCard';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export default function Hero({ 
  featuredArticle, 
  currentThought 
}: { 
  featuredArticle: Article; 
  currentThought?: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const featured = featuredArticle || {
    id: 'default',
    title: "India's Voice, Your News Portal",
    excerpt: "Bringing you the truth from every corner of the nation with integrity and speed.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    category: "WELCOME",
    date: new Date().toLocaleDateString()
  };



  return (
    <section className="py-12 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Featured */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-none md:rounded-2xl shadow-xl md:shadow-2xl -mx-4 md:mx-0">
            <div className="relative aspect-[4/3] md:aspect-video lg:aspect-auto lg:h-[500px] overflow-hidden">
               <img 
                 src={featured.image} 
                 alt={featured.title}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent lg:hidden"></div>
               <div className="absolute top-6 left-6 z-20">
                  <span className="bg-primary text-white text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-sm shadow-xl">
                    {featured.category}
                  </span>
               </div>
            </div>

            {/* Desktop Overlay Content */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
                <div className="max-w-3xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                   <div className="flex items-center text-primary-light/80 text-xs font-bold uppercase tracking-widest mb-4">
                      <div className="w-8 h-0.5 bg-primary mr-3"></div>
                      <span className="text-primary">{featured.date}</span>
                   </div>
                   <h1 className="text-4xl xl:text-6xl font-bold text-white mb-6 leading-[1.1] group-hover:text-primary transition-colors cursor-pointer tracking-tight drop-shadow-xl">
                       {featured.title}
                   </h1>
                   <p className="text-white font-medium mb-8 text-lg md:text-xl leading-relaxed line-clamp-2 drop-shadow-md">{featured.excerpt}</p>
                   <button className="bg-primary text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-sm shadow-xl flex items-center group/btn">
                       <span>Read Full Story</span>
                   </button>
                </div>
            </div>
            
            {/* Mobile/Tablet Content (Visible on non-overlay) */}
            <div className="lg:hidden p-6 md:p-8 bg-white border-b-4 border-primary">
               <div className="flex items-center text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-3">
                  <span className="text-primary">{featured.date}</span>
               </div>
               <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 leading-tight tracking-tight">
                  {featured.title}
               </h2>
               <p className="text-gray-900 font-medium text-sm md:text-base leading-snug line-clamp-2 md:line-clamp-3 mb-4">{featured.excerpt}</p>
               <button className="text-primary font-bold uppercase tracking-widest text-xs">Read Full Story →</button>
            </div>
          </div>

          {/* Founder Editorial Card */}
          <div className="mt-6 lg:mt-0 flex flex-col h-full md:space-y-6">
            <h2 className="text-lg md:text-2xl font-bold tracking-tight border-b-2 md:border-b-4 border-black pb-1 md:pb-2 inline-block self-start mb-4 lg:mb-0">Founder's Note</h2>
            
            <div className="w-full relative rounded-lg overflow-hidden shadow-xl flex-grow min-h-[350px] md:h-[400px] lg:h-auto group bg-black hidden md:flex">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img 
                      src="/lalit.PNG" 
                      alt="Lalit Shishodia" 
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105 opacity-100" 
                    />
                </div>
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20"></div>
                <div className="absolute top-0 right-0 p-8 w-full aspect-square bg-primary/10 blur-[100px] rounded-full mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
                
                {/* Content Container */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full w-full">
                    
                    {/* Top: Small Badge */}
                    <div className="flex justify-end w-full">
                       <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Daily Thought</span>
                       </div>
                    </div>
                    
                    {/* Bottom: Quote and Author */}
                    <div className="flex flex-col mt-auto pt-10">
                        {/* The Quote */}
                        <div className="relative mb-6">
                            <span className="absolute -top-4 -left-2 text-5xl text-primary font-serif leading-none select-none opacity-50">"</span>
                            <p className="text-white text-lg md:text-xl lg:text-2xl italic leading-relaxed relative z-10 font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transform group-hover:-translate-y-1 transition-transform duration-500">
                              {currentThought || "The pen and the camera are our instruments of accountability."}
                            </p>
                        </div>
                        
                        {/* Author Block Linked to Image Modal */}
                        <button onClick={() => setIsModalOpen(true)} className="flex text-left items-center space-x-4 pt-5 border-t border-white/20 group/author hover:border-primary transition-colors cursor-pointer focus:outline-none shrink-0 w-full">
                            <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden shrink-0 shadow-xl group-hover/author:scale-105 transition-transform bg-black">
                                <img src="/lalit.PNG" className="w-full h-full object-cover object-top" alt="Avatar" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-white drop-shadow-md group-hover/author:text-primary-light transition-colors line-clamp-1">Lalit Shishodia</h3>
                                <p className="text-gray-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] mt-0.5 group-hover/author:text-white transition-colors line-clamp-1">Founder & Lead Journalist</p>
                            </div>
                        </button>
                    </div>

                </div>
            </div>
            
            {/* Mobile Founder Note (Reduced) */}
            <div className="md:hidden mt-2 bg-gray-50 border-l-4 border-primary p-4 rounded-sm">
                <p className="text-black text-sm italic font-medium leading-snug mb-2">"{currentThought || "Bringing you the truth from every corner of the nation with integrity and speed."}"</p>
                <div className="flex items-center space-x-2">
                    <img src="/lalit.PNG" className="w-6 h-6 rounded-full border border-gray-300 object-cover object-top" alt="Avatar" />
                    <span className="text-xs font-bold text-gray-800">Lalit Shishodia</span>
                </div>
            </div>

            {/* Newsletter Box */}
            <div className="hidden md:block bg-gray-50 p-6 rounded-lg border-l-8 border-primary mt-8 shadow-sm">
                <h4 className="text-xl font-bold mb-2 text-black uppercase tracking-tighter">Subscribe to News</h4>
                <p className="text-gray-900 text-[11px] font-bold uppercase tracking-widest mb-4">Get updates directly in your inbox.</p>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                    setTimeout(() => setSubscribed(false), 5000);
                  }}
                  className="space-y-3"
                >
                    <div className="flex space-x-2">
                        <input 
                          type="email" 
                          placeholder="EMAIL ADDRESS" 
                          required
                          className="w-full px-4 py-3 bg-white border-2 border-transparent focus:border-black outline-none transition-all text-sm font-bold rounded-sm shadow-inner uppercase tracking-widest" 
                        />
                        <button className="bg-primary hover:bg-black text-white px-6 font-bold uppercase tracking-widest text-xs transition-colors rounded-sm shadow-md">Join</button>
                    </div>
                    {subscribed && (
                      <p className="text-green-600 font-bold uppercase text-[10px] tracking-widest animate-pulse text-center">Thank you! Subscribed.</p>
                    )}
                </form>
            </div>
          </div>

        </div>
      </div>
      
      {/* High-Resolution Image Lightbox Modal */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-black p-2 rounded-2xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col items-center group overflow-hidden" onClick={e => e.stopPropagation()}>
               <button 
                  className="absolute top-4 right-4 bg-black/50 hover:bg-white text-white hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors z-50 font-bold text-xl backdrop-blur-md" 
                  onClick={() => setIsModalOpen(false)}
               >
                  ×
               </button>
               
               <div className="w-full relative bg-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
                   <img 
                     src="/lalit.PNG" 
                     alt="Lalit Shishodia - Full Portrait" 
                     className="w-auto h-auto max-w-full max-h-[75vh] object-contain" 
                   />
               </div>
               
               <div className="w-full text-center mt-6 mb-2">
                  <h3 className="text-3xl font-bold text-white tracking-tighter uppercase drop-shadow-lg">Lalit Shishodia</h3>
                  <div className="flex items-center justify-center mt-2 space-x-4">
                      <div className="h-px w-12 bg-primary"></div>
                      <p className="text-primary-light font-bold text-xs uppercase tracking-[0.3em] text-white">Founder & Editor-in-Chief</p>
                      <div className="h-px w-12 bg-primary"></div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </section>
  );
}
