import React from 'react';
import CategoryBar from '@/components/Home/CategoryBar';
import NewsGrid from '@/components/Home/NewsGrid';
import { getPosts } from '@/lib/dataService';

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug).toLowerCase().replace(/-/g, ' ');
  
  const allArticles = await getPosts();
  const categoryArticles = allArticles.filter((art: any) => 
    art.isPublished !== false && 
    (decodedCategory === 'all news' || art.category.toLowerCase() === decodedCategory)
  ).map((art: any) => ({
    id: art.id || art._id,
    title: art.title,
    excerpt: art.excerpt,
    image: art.image,
    category: art.category,
    date: new Date(art.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }));

  return (
    <div className="flex flex-col">
      <CategoryBar />
      <div className="flex-1 container mx-auto px-4 py-12 bg-white text-black">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 border-b-4 border-primary pb-4 capitalize">
          {decodedCategory}
        </h1>
        
        {categoryArticles.length > 0 ? (
          <NewsGrid articles={categoryArticles} />
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="text-xl font-bold text-gray-600 tracking-widest uppercase italic">No news articles found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
