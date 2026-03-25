import React from 'react';
import { Youtube, Instagram, Twitter } from 'lucide-react';

const recentArticles = [
  {
    id: '1',
    title: "Lalit Shishodia Shares Vision for Next-Gen Digital Journalism in India",
    excerpt: "In an exclusive piece, HIND NATION NEWS owner Lalit Shishodia discusses the transformation of news consumption.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
    category: "Featured",
    date: "Oct 24, 2026"
  }
];

export default function JournalistPage() {
  return (
    <div className="bg-white">
      {/* Profile Header */}
      <section className="bg-black text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-64 h-64 md:w-80 md:h-80 shrink-0 relative">
               <div className="absolute inset-0 border-4 border-primary translate-x-2 translate-y-2"></div>
               <img 
                 src="/lalit.PNG" 
                 alt="Lalit Shishodia" 
                 className="w-full h-full object-cover relative z-10 hover:scale-105 transition-all duration-500 shadow-xl"
               />
            </div>
            <div className="flex-1 text-center md:text-left">
               <span className="text-primary font-bold uppercase tracking-widest mb-4 block">Founder & Lead Journalist</span>
               <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight uppercase leading-none">Lalit <span className="text-primary italic">Shishodia</span></h1>
               <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl mb-8 leading-relaxed">
                 A visionary digital journalist and the force behind HIND NATION NEWS, dedicated to grassroot stories with uncompromising integrity.
               </p>
                <div className="flex justify-center md:justify-start space-x-8">
                   <a href="#" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Twitter className="w-8 h-8" /></a>
                   <a href="#" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Instagram className="w-8 h-8" /></a>
                   <a href="#" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Youtube className="w-8 h-8" /></a>
                 </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-12">
             <h2 className="text-3xl font-bold border-l-4 border-primary pl-6 text-black">Professional Bio</h2>
             <div className="text-gray-900 font-medium space-y-6 text-lg md:text-xl leading-relaxed">
               <p>
                 With over 15 years of experience in mainstream and digital media, Lalit Shishodia has established himself as a prominent voice in Indian journalism. His career has been marked by a relentless pursuit of truth.
               </p>
               <p>
                 As the founder of HIND NATION NEWS, Lalit envisions a platform where news is not just consumed but felt. Under his leadership, the portal has achieved significant growth.
               </p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12">
                <div className="bg-black p-8 rounded-2xl text-white transform hover:-translate-y-2 transition-all">
                    <span className="text-5xl font-bold text-primary block">15+</span>
                    <span className="text-sm uppercase tracking-[0.2em] font-bold text-gray-300">Years Exp</span>
                </div>
                <div className="bg-black p-8 rounded-2xl text-white transform hover:-translate-y-2 transition-all">
                    <span className="text-5xl font-bold text-white block">2M+</span>
                    <span className="text-sm uppercase tracking-[0.2em] font-bold text-gray-300">Reach</span>
                </div>
                <div className="bg-black p-8 rounded-2xl text-white transform hover:-translate-y-2 transition-all">
                    <span className="text-5xl font-bold text-primary block">500+</span>
                    <span className="text-sm uppercase tracking-[0.2em] font-bold text-gray-300">Stories</span>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
