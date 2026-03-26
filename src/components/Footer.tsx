'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Twitter, Mail, Phone, MapPin, ChevronRight, Send } from 'lucide-react';

const footerLinks = [
  { name: 'Politics', href: '/category/politics' },
  { name: 'Local News', href: '/category/local-news' },
  { name: 'Real Estate', href: '/category/real-estate' },
  { name: 'Trending', href: '/category/trending' },
  { name: 'Entertainment', href: '/category/entertainment' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Journalist Profile', href: '/journalist' },
  { name: 'Contact Form', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => setSettings(data))
      .catch(err => console.error('Failed to fetch settings:', err));
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 5000);
  };

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

  const contactInfo = {
    phone: settings?.contactPhone || '+91 99108 35426',
    email: settings?.contactEmail || 'hindnationnews18x7@gmail.com'
  };

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t border-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* About Section */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img 
                src="/hindnewsfoot.png" 
                alt="HIND NATION NEWS" 
                className="h-16 md:h-20 w-auto object-contain" 
              />
            </Link>
            <p className="text-gray-400 font-medium text-sm leading-relaxed">
              {settings?.siteName || 'HIND NATION NEWS'} is India's leading digital news portal, providing news with integrity and accuracy.
            </p>
            <div className="flex space-x-4">
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:bg-white/5 transition-all rounded-lg text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:bg-white/5 transition-all rounded-lg text-gray-400 hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 hover:bg-white/5 transition-all rounded-lg text-gray-400 hover:text-white">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-semibold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-primary transition-colors text-sm font-semibold">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold mb-6 text-primary">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{contactInfo.phone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs font-medium gap-4">
          <p>© {new Date().getFullYear()} {settings?.siteName || 'HIND NATION NEWS'}. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/admin/login" className="text-primary font-bold">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

