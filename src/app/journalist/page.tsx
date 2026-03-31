import React from 'react';
import { Youtube, Instagram, Twitter, Phone, MapPin } from 'lucide-react';

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
                src="/lalitsh.png"
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
                <a href="https://x.com/cahindnews" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Twitter className="w-8 h-8" /></a>
                <a href="https://www.instagram.com/hind_nation_news_15x7?igsh=MXhjM3p1dW53MGJoNA==" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Instagram className="w-8 h-8" /></a>
                <a href="https://www.youtube.com/@lalitshishodia15" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-primary transition-all rounded-xl"><Youtube className="w-8 h-8" /></a>
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
      {/* HNN Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black mb-4">
              HNN <span className="text-primary italic">Team</span>
            </h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-500 font-bold uppercase tracking-widest text-sm">The pillars of Hind Nation News</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Lalit Shishodia - Featured Card */}
            <div className="group space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border-4 border-primary">
                <img
                  src="/lalitsh.png"
                  alt="Lalit Shishodia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-xl">Founder</div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-black uppercase tracking-tight text-black group-hover:text-primary transition-colors">Lalit Shishodia</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1 italic">CEO & Lead Journalist</p>
              </div>
            </div>

            {/* Nisha Verma */}
            <div className="group space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-xl transition-all duration-500 group-hover:-translate-y-2">
                <img
                  src="/Nisha.png"
                  alt="Nisha Verma"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold text-xs uppercase tracking-widest">Chief Managing Director</p>
                </div>
              </div>
              <div className="px-2">
                <h3 className="text-xl font-black uppercase tracking-tight text-black group-hover:text-primary transition-colors">Nisha Verma</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">CMD (Noida, Uttar Pradesh)</p>
              </div>
            </div>

            {/* Deepak Verma */}
            <div className="group space-y-6 bg-gray-50/50 p-4 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 group-hover:rotate-1">
                <img
                  src="/Deepak.png"
                  alt="Deepak Verma"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-4 px-2">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-black group-hover:text-primary transition-colors">Deepak Verma</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Noida Reporter</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center text-[11px] font-bold text-gray-600">
                    <Phone className="w-3 h-3 mr-2 text-primary" />
                    <span>+91 98711 78278</span>
                  </div>
                  <div className="flex items-start text-[10px] font-medium text-gray-500 leading-tight">
                    <MapPin className="w-3 h-3 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Hindon Vihar Sector 49<br />Noida, Uttar Pradesh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Brijesh Kumar */}
            <div className="group space-y-6 bg-gray-50/50 p-4 rounded-[2.5rem] border border-transparent hover:border-primary/20 transition-all">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 group-hover:-rotate-1">
                <img
                  src="/Brijesh.png"
                  alt="Brijesh Kumar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="space-y-4 px-2">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-black group-hover:text-primary transition-colors">Brijesh Kumar</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Reporter, Dhaulana</p>
                </div>
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <div className="flex items-center text-[11px] font-bold text-gray-600">
                    <Phone className="w-3 h-3 mr-2 text-primary" />
                    <span>+91 99278 46712</span>
                  </div>
                  <div className="flex items-start text-[10px] font-medium text-gray-500 leading-tight">
                    <MapPin className="w-3 h-3 mr-2 text-primary shrink-0 mt-0.5" />
                    <span>Village-Sapnawat<br />Dhaulana, Uttar Pradesh</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
