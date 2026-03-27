'use client';

import React, { useState } from 'react';
import { Calendar, User, Share2, Facebook, Twitter, Link as LinkIcon, Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleMetaProps {
  author: string;
  publishDate: string;
  title: string;
}

export default function ArticleMeta({ author, publishDate, title }: ArticleMetaProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: Send,
      href: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`,
      color: 'hover:bg-[#25D366] hover:text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-[#1877F2] hover:text-white',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-black hover:text-white',
    },
  ];

  return (
    <div className="relative flex flex-wrap items-center justify-between py-6 border-y border-gray-100 gap-4">
      <div className="flex flex-wrap items-center space-x-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-primary shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Author</p>
            <p className="text-sm font-bold text-black">{author || 'HNN Correspondent'}</p>
          </div>
        </div>
        <div className="hidden sm:block h-8 w-px bg-gray-100"></div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Published</p>
          <p className="text-sm font-bold text-black flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
            {publishDate}
          </p>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={handleNativeShare}
          className={cn(
            "p-3 rounded-full transition-all shadow-sm flex items-center space-x-2 border",
            showShareMenu ? "bg-black text-white border-black" : "bg-white text-gray-400 hover:text-black border-gray-100 hover:border-gray-300"
          )}
        >
          <Share2 className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-widest pr-1 hidden sm:inline">Share</span>
        </button>

        {showShareMenu && (
          <div className="absolute right-0 bottom-full mb-4 z-50 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="p-6 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Share this article</h4>
              <div className="grid grid-cols-1 gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-2xl transition-all font-bold text-xs text-gray-600",
                      social.color
                    )}
                  >
                    <social.icon className="w-4 h-4" />
                    <span>{social.name}</span>
                  </a>
                ))}
                <button
                  onClick={copyToClipboard}
                  className="flex items-center justify-between p-3 rounded-2xl transition-all font-bold text-xs text-gray-600 hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <LinkIcon className="w-4 h-4" />
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </div>
                  {copied && <Check className="w-4 h-4 text-green-500" />}
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 text-center">
               <button 
                onClick={() => setShowShareMenu(false)}
                className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors"
               >
                 Close Menu
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
