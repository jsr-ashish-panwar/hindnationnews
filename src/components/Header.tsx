'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Youtube, Instagram, Twitter, Search, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Journalist', href: '/journalist' },
  { name: 'YouTube', href: 'https://www.youtube.com/@lalitshishodia15' },
  { name: 'Instagram', href: 'https://www.instagram.com/hind_nation_news_15x7?igsh=MXhjM3p1dW53MGJoNA==' },
  { name: 'X', href: 'https://x.com/cahindnews' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to fetch settings:', err));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = settings ? {
    twitter: settings.twitterUrl || 'https://x.com/cahindnews',
    instagram: settings.instagramUrl || 'https://www.instagram.com/hind_nation_news_15x7',
    youtube: settings.youtubeUrl || 'https://www.youtube.com/@lalitshishodia15',
    whatsapp: `https://wa.me/${(settings.contactPhone || '919910835426').replace(/\D/g, '')}`
  } : {
    twitter: 'https://x.com/cahindnews',
    instagram: 'https://www.instagram.com/hind_nation_news_15x7',
    youtube: 'https://www.youtube.com/@lalitshishodia15',
    whatsapp: 'https://wa.me/919910835426'
  };

  const nameParts = (settings?.siteName || 'HIND NATION NEWS').split(' ');
  const displayTitle = nameParts.length > 2 ? nameParts.slice(0, 2).join(' ') : (nameParts[0] + ' ' + (nameParts[1] || ''));
  const subTitle = nameParts.length > 2 ? nameParts.slice(2).join(' ') : 'NEWS';

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 text-black",
      isScrolled ? "bg-white/95 backdrop-blur-md shadow-md py-1.5" : "bg-white border-b border-gray-100 py-2 md:py-3"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group shrink-0">
            <div className="relative w-8 h-8 md:w-12 md:h-12 shrink-0">
               {/* Try to load logo.png, fallback to icon if needed, or text if none */}
               <img 
                 src="/hindnews.png" 
                 alt="Logo" 
                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
               />
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-xl lg:text-2xl font-bold tracking-tighter text-primary leading-none uppercase">
                {displayTitle}
              </span>
              <span className="text-[9px] md:text-xs font-bold tracking-[0.2em] text-black leading-none uppercase mt-0.5">
                {subTitle}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-3 lg:space-x-6 xl:space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('http') ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] lg:text-[15px] font-bold text-black hover:text-primary transition-colors whitespace-nowrap px-1"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-[13px] lg:text-[15px] font-bold text-black hover:text-primary transition-colors whitespace-nowrap px-1"
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* Icons/Actions */}
          <div className="hidden md:flex items-center space-x-5 text-black">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              href="/admin/login" 
              className="p-2 hover:bg-black hover:text-white rounded-full transition-all border border-gray-100"
              title="Admin Panel"
            >
              <User className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-5 ml-2 text-black/60">
               <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" title="X (Twitter)"><Twitter className="w-5 h-5" /></a>
               <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] transition-colors" title="Instagram"><Instagram className="w-5 h-5" /></a>
               <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] transition-colors" title="YouTube"><Youtube className="w-5 h-5" /></a>
               <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors" title="WhatsApp">
                  <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-5 h-5" />
               </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white z-[60] flex flex-col items-center py-6 px-4 animate-in fade-in slide-in-from-top-2 duration-300 shadow-xl border-t border-gray-100 pb-8">
            <div className="flex flex-col items-center space-y-3 w-full">
            {navItems.map((item, idx) => (
              item.href.startsWith('http') ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-black hover:text-primary transition-all text-center w-full py-2.5 bg-gray-50/50 rounded-lg active:bg-gray-100"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-bold text-black hover:text-primary transition-all text-center w-full py-2.5 bg-gray-50/50 rounded-lg active:bg-gray-100"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  {item.name}
                </Link>
              )
            ))}
              <Link 
                href="/admin/login" 
                onClick={() => setIsOpen(false)}
                className="text-sm font-bold text-primary hover:text-black transition-all uppercase pt-4 border-t border-gray-100 w-full text-center mt-2"
              >
                Admin Access
              </Link>
             <div className="flex justify-center space-x-6 pt-6 border-t border-gray-100 w-full">
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"><Twitter className="w-5 h-5" /></a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-full hover:bg-pink-600 hover:text-white transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-sm"><Youtube className="w-5 h-5" /></a>
                <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-50 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-sm">
                   <img src="/whatsapp-icon.svg" alt="WhatsApp" className="w-5 h-5 transition-all" />
                </a>
             </div>
             </div>
          </div>
        )}
      </div>
    </header>
  );
}
