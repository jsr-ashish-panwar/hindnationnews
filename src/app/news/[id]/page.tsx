import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, TrendingUp, Clock, Tag } from 'lucide-react';
import { getPostById, getPosts } from '@/lib/dataService';
import ArticleMeta from '@/components/ArticleMeta';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter(p => (p.id || p._id) !== id && p.category === post.category)
    .slice(0, 3);
  
  const trendingPosts = allPosts
    .filter(p => p.isTrending && (p.id || p._id) !== id)
    .slice(0, 5);

  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-primary selection:text-white pb-20">
      <main className="container mx-auto px-4 md:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <article className="lg:col-span-8 space-y-8">
            {/* Breadcrumbs & Back */}
            <nav className="flex items-center space-x-4 mb-4">
              <Link href="/" className="group flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <span className="text-gray-200">/</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{post.category}</span>
            </nav>

            {/* Title Section */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight text-black">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed italic border-l-4 border-primary pl-6 py-1">
                {post.excerpt}
              </p>
            </div>

            {/* Author & Meta */}
            <ArticleMeta 
              author={post.author || 'HNN Correspondent'} 
              publishDate={formattedDate} 
              title={post.title} 
            />

            {/* Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-[21/9] bg-gray-100">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-900 font-medium leading-[1.8] space-y-6">
              {post.content.split('\n\n').map((para, index) => (
                <p key={index} className="mb-6 whitespace-pre-wrap">{para}</p>
              ))}
            </div>

            {/* Category Tags */}
            <div className="pt-10 border-t border-gray-100">
               <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Categories:</span>
                  <Link href={`/category/${post.category}`} className="bg-gray-50 hover:bg-primary hover:text-white transition-all px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full text-black">
                    {post.category}
                  </Link>
               </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            
            {/* Trending Sidebar */}
            <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black uppercase tracking-tighter flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Trending Now
                 </h3>
                 <div className="h-1 flex-grow ml-4 bg-primary/20 rounded-full"></div>
              </div>
              
              <div className="space-y-8">
                {trendingPosts.map((item, idx) => (
                  <Link 
                    key={item.id || item._id} 
                    href={`/news/${item.id || item._id}`}
                    className="group flex space-x-4 items-start"
                  >
                    <span className="text-3xl font-black text-primary/20 group-hover:text-primary transition-colors leading-none pt-1">
                      {idx + 1}
                    </span>
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-black group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {item.title}
                      </h4>
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Clock className="w-3 h-3 mr-1.5" />
                        {new Date(item.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="space-y-8">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center">
                  More in {post.category}
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map(related => (
                    <Link key={related.id || related._id} href={`/news/${related.id || related._id}`} className="group block space-y-3">
                      <div className="relative aspect-video rounded-2xl overflow-hidden">
                        <img src={related.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                      </div>
                      <h4 className="font-bold text-black group-hover:text-primary transition-colors leading-tight">
                        {related.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Advertisement Placeholder */}
            <div className="bg-gray-100 rounded-2xl p-10 text-center border-2 border-dashed border-gray-200">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Advertisement</p>
               <div className="mt-4 text-gray-300 font-bold text-xl uppercase italic">Promote Your Content Here</div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
