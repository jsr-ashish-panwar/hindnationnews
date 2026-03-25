'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Save, Image as ImageIcon, Type, FileText, Tag, 
  TrendingUp, Eye, CheckCircle2, AlertCircle, RefreshCw
} from 'lucide-react';

const CATEGORIES = ['Politics', 'Local News', 'Real Estate', 'Entertainment', 'Trending', 'Economy', 'Sports'];

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: 'Politics',
    image: '', isTrending: false, isPublished: true, author: 'Lalit Shishodia',
    publishDate: ''
  });

  useEffect(() => {
    const secret = localStorage.getItem('admin_secret');
    if (!secret) { router.push('/admin/login'); return; }
    fetchPost(secret);
  }, [id]);

  const fetchPost = async (secret: string) => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { headers: { 'x-admin-secret': secret } });
      if (res.status === 401) { localStorage.removeItem('admin_secret'); router.push('/admin/login'); return; }
      if (res.status === 404) { setError('Article not found.'); setLoading(false); return; }
      const data = await res.json();
      setFormData({
        title: data.title || '',
        excerpt: data.excerpt || '',
        content: data.content || '',
        category: data.category || 'Politics',
        image: data.image || '',
        isTrending: data.isTrending || false,
        isPublished: data.isPublished !== undefined ? data.isPublished : true,
        author: data.author || 'Lalit Shishodia',
        publishDate: data.publishDate || '',
      });
    } catch { setError('Failed to load article.'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError('');
    const secret = localStorage.getItem('admin_secret') || '';
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify(formData)
      });
      if (res.ok) { setSuccess(true); setTimeout(() => router.push('/admin'), 1500); }
      else { const data = await res.json(); setError(data.error || 'Failed to save article'); }
    } catch { setError('Connection error'); }
    finally { setSaving(false); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Article...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 lg:p-16">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <Link href="/admin" className="flex items-center space-x-2 text-gray-500 hover:text-black font-bold uppercase tracking-widest text-xs transition-all">
            <ArrowLeft className="w-4 h-4" /><span>Back to Dashboard</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-2 rounded-lg text-black"><FileText className="w-5 h-5" /></div>
            <h1 className="text-2xl font-bold uppercase tracking-tighter text-black">Edit Article</h1>
          </div>
        </header>

        {error && !success && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 shrink-0" /><span className="font-bold text-sm">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl flex items-center space-x-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" /><span className="font-bold text-sm">Article updated successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left - Main content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Article Title</label>
                  <div className="relative">
                    <Type className="absolute left-4 top-4 w-5 h-5 text-gray-300" />
                    <input type="text" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter compelling headline..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl font-bold text-lg text-black" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Short Excerpt</label>
                  <textarea rows={3} value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary for list views..." className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl font-medium text-sm resize-none text-black" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Article Body</label>
                  <textarea rows={14} required value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your story here..." className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl font-medium text-sm leading-relaxed text-black" />
                </div>
              </div>
            </div>

            {/* Right - Settings */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-3.5 w-4 h-4 text-gray-300" />
                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl font-bold text-sm appearance-none text-black">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Featured Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-3.5 w-4 h-4 text-gray-300" />
                    <input type="url" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..." className="w-full pl-12 pr-6 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl font-medium text-xs text-black" />
                  </div>
                  {formData.image && <div className="mt-3 aspect-video rounded-xl bg-gray-100 overflow-hidden border"><img src={formData.image} alt="Preview" className="w-full h-full object-cover" /></div>}
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.isTrending} onChange={e => setFormData({ ...formData, isTrending: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-primary cursor-pointer" />
                    <div className="flex items-center space-x-2">
                      <TrendingUp className={`w-4 h-4 ${formData.isTrending ? 'text-primary' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Mark as Trending</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} className="w-5 h-5 rounded border-gray-300 text-primary cursor-pointer" />
                    <div className="flex items-center space-x-2">
                      <Eye className={`w-4 h-4 ${formData.isPublished ? 'text-green-500' : 'text-gray-400'}`} />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Published / Live</span>
                    </div>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={saving}
                className="w-full bg-black text-white py-5 px-8 font-bold uppercase tracking-[0.2em] rounded-3xl hover:bg-primary hover:text-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-2xl shadow-black/10 disabled:opacity-50 text-sm">
                {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /><span>Update Article</span></>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
