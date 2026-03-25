import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const categories = [
  "All News", "Politics", "Local News", "Real Estate", "Trending", "Economy", "Entertainment", "Sports", "Technology"
];

export default function CategoryBar() {
  const currentCategory = "All News"; // This could be dynamic based on pathname

  return (
    <div className="bg-white border-b sticky top-[64px] md:top-[88px] z-40 shadow-sm overflow-x-auto no-scrollbar text-black">
      <div className="container mx-auto px-2 md:px-6">
        <div className="flex items-center space-x-6 md:space-x-8 py-3 md:py-4 min-w-max">
          {categories.map((cat, idx) => (
            <Link 
              key={cat} 
              href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
              className={cn(
                "text-[13px] md:text-[15px] font-bold transition-all hover:text-primary whitespace-nowrap px-1.5",
                cat === currentCategory ? "text-primary border-b-2 border-primary" : "text-black/80 hover:text-primary"
              )}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
