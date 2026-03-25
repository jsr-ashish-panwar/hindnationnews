import React from 'react';
import NewsCard from '@/components/NewsCard';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
}

export default function NewsGrid({ articles }: { articles: Article[] }) {
  const items = articles?.length > 0 ? articles : [];

  return (
    <section className="py-16 bg-gray-50 text-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-10 border-b-2 border-primary pb-3 md:pb-4">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-black">Latest News</h2>
          <button className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-primary hover:text-black transition-colors underline md:no-underline">See All</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {items.map((news: any) => (
            <NewsCard key={news.id || news._id} {...news} />
          ))}
        </div>
      </div>
    </section>
  );
}
