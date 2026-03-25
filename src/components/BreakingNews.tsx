'use client';

import React, { useState, useEffect } from 'react';

export default function BreakingNews() {
  const [tickerText, setTickerText] = useState("Stay tuned for the latest breaking news from across India.");

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.breakingNewsTicker) {
          setTickerText(data.breakingNewsTicker);
        }
      })
      .catch(err => console.error('Failed to fetch breaking news ticker:', err));
  }, []);

  const items = [
    tickerText,
    "HIND NATION NEWS: India's Voice, Your News Portal.",
    "Updates: Real-time coverage of local and national events.",
    "Politics: Deep dives into the latest political landscape.",
    tickerText // Repeat to ensure smooth loop
  ];

  return (
    <div className="bg-primary text-white py-1.5 md:py-2 overflow-hidden flex items-center border-y border-red-800">
      <div className="bg-black text-white px-3 md:px-4 py-0.5 md:py-1 font-bold text-[10px] md:text-xs uppercase tracking-widest z-10 whitespace-nowrap ml-2 md:ml-4 rounded shadow-lg">
        Breaking News
      </div>
      <div className="flex-1 relative h-5 md:h-6 flex items-center">
        <div className="absolute whitespace-nowrap breaking-news-anim flex items-center space-x-8 md:space-x-12">
          {items.map((item, idx) => (
            <span key={idx} className="text-xs md:text-base font-bold flex items-center uppercase tracking-wide">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full mr-2 md:mr-4 inline-block shadow-lg"></span>
              {item}
            </span>
          ))}
          {items.map((item, idx) => (
            <span key={`dup-${idx}`} className="text-xs md:text-base font-bold flex items-center uppercase tracking-wide">
              <span className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full mr-2 md:mr-4 inline-block shadow-lg"></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
