'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  BarChart3, 
  FilePlus2, 
  LayoutDashboard, 
  LogOut, 
  Newspaper, 
  Settings, 
  TrendingUp, 
  Trash2, 
  Edit3,
  Search,
  Eye,
  Plus,
  Star,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Globe,
  Users,
  Activity,
  Lock,
  Save,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Youtube,
  Play,
  Calendar
} from 'lucide-react';

interface Article {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  publishDate: string;
  isTrending: boolean;
  isPublished: boolean;
  image: string;
  excerpt?: string;
}

const getPostId = (post: Article) => post._id || post.id || '';

const CATEGORIES = ['Politics', 'Local News', 'Real Estate', 'Entertainment', 'Trending', 'Economy', 'Sports'];

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('news');
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<any[]>([]);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'HIND NATION NEWS',
    tagline: "India's Voice, Your News Portal",
    contactEmail: 'hindnationnews18x7@gmail.com',
    contactPhone: '+91 99108 35426',
    facebookUrl: '',
    twitterUrl: 'https://x.com/cahindnews',
    instagramUrl: 'https://www.instagram.com/hind_nation_news_15x7',
    youtubeUrl: 'https://www.youtube.com/@lalitshishodia15',
    articlesPerPage: '10',
    breakingNewsTicker: 'Stay tuned for the latest breaking news from across India.',
  });
  const router = useRouter();

  useEffect(() => {
    const secret = localStorage.getItem('admin_secret');
    if (!secret) { router.push('/admin/login'); return; }
    fetchPosts(secret);
    fetchSettings(secret);
    fetchVideos(secret);
  }, []);

  const fetchVideos = async (secret: string) => {
    try {
      const res = await fetch('/api/admin/videos', { headers: { 'x-admin-secret': secret } });
      if (res.ok) {
        const data = await res.json();
        setVideos(data);
      }
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    }
  };

  const fetchPosts = async (secret: string) => {
    try {
      const res = await fetch('/api/admin/posts', { headers: { 'x-admin-secret': secret } });
      if (res.status === 401) { localStorage.removeItem('admin_secret'); router.push('/admin/login'); return; }
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
      else setError(data.error || 'Failed to fetch posts');
    } catch { setError('Connection error'); }
    finally { setLoading(false); }
  };

  const fetchSettings = async (secret: string) => {
    try {
      const res = await fetch('/api/admin/settings', { headers: { 'x-admin-secret': secret } });
      if (res.ok) {
        const data = await res.json();
        setSettings({
          siteName: data.siteName || 'HIND NATION NEWS',
          tagline: data.tagline || "India's Voice, Your News Portal",
          contactEmail: data.contactEmail || 'hindnationnews18x7@gmail.com',
          contactPhone: data.contactPhone || '+91 99108 35426',
          facebookUrl: data.facebookUrl || '',
          twitterUrl: data.twitterUrl || 'https://x.com/cahindnews',
          instagramUrl: data.instagramUrl || 'https://www.instagram.com/hind_nation_news_15x7',
          youtubeUrl: data.youtubeUrl || 'https://www.youtube.com/@lalitshishodia15',
          articlesPerPage: String(data.articlesPerPage || '10'),
          breakingNewsTicker: data.breakingNewsTicker || 'Stay tuned for the latest breaking news from across India.',
        });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article? This cannot be undone.')) return;
    const secret = localStorage.getItem('admin_secret') || '';
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': secret } });
      if (res.ok) setPosts(posts.filter(p => getPostId(p) !== id));
      else alert('Failed to delete');
    } catch { alert('Error deleting post'); }
  };

  const handleToggleTrending = async (post: Article) => {
    const secret = localStorage.getItem('admin_secret') || '';
    const postId = getPostId(post);
    if (!postId) return alert('Invalid article ID');
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ isTrending: !post.isTrending })
      });
      if (res.ok) setPosts(posts.map(p => getPostId(p) === postId ? { ...p, isTrending: !p.isTrending } : p));
    } catch { alert('Error updating post'); }
  };

  const handleTogglePublish = async (post: Article) => {
    const secret = localStorage.getItem('admin_secret') || '';
    const postId = getPostId(post);
    if (!postId) return alert('Invalid article ID');
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ isPublished: !post.isPublished })
      });
      if (res.ok) setPosts(posts.map(p => getPostId(p) === postId ? { ...p, isPublished: !p.isPublished } : p));
    } catch { alert('Error updating post'); }
  };

  const handleLogout = () => { localStorage.removeItem('admin_secret'); router.push('/admin/login'); };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const secret = localStorage.getItem('admin_secret') || '';
    
    // Extract video ID from URL
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = newVideoUrl.match(regExp);
    const videoId = (match && match[2].length === 11) ? match[2] : null;

    if (!videoId) return alert('Invalid YouTube URL');

    const videoData = {
      id: videoId,
      title: newVideoTitle || 'Untitled Video',
      thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      url: newVideoUrl,
      duration: '00:00', // Mock duration or fetch if possible
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ action: 'add', video: videoData })
      });
      if (res.ok) {
        setVideos([videoData, ...videos]);
        setNewVideoUrl('');
        setNewVideoTitle('');
        setIsAddingVideo(false);
      } else {
        alert('Failed to add video');
      }
    } catch { alert('Network error'); }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Delete this video from the portal?')) return;
    const secret = localStorage.getItem('admin_secret') || '';
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify({ action: 'delete', id })
      });
      if (res.ok) setVideos(videos.filter(v => v.id !== id));
      else alert('Failed to delete video');
    } catch { alert('Network error'); }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const secret = localStorage.getItem('admin_secret') || '';
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-secret': secret
        },
        body: JSON.stringify({
          ...settings,
          articlesPerPage: parseInt(settings.articlesPerPage) || 10
        })
      });

      if (res.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      } else {
        alert('Failed to save settings to database');
      }
    } catch (err) {
      console.error('Error saving settings:', err);
      alert('Network error while saving settings');
    }
    
    // Also save to localStorage as a fallback
    localStorage.setItem('hnn_settings', JSON.stringify(settings));
  };

  // Computed analytics data
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.isPublished).length;
  const trendingPosts = posts.filter(p => p.isTrending).length;
  const draftPosts = posts.filter(p => !p.isPublished).length;
  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const categoryBreakdown = CATEGORIES.map(cat => ({
    name: cat,
    count: posts.filter(p => p.category === cat).length,
    pct: totalPosts > 0 ? Math.round((posts.filter(p => p.category === cat).length / totalPosts) * 100) : 0
  })).filter(c => c.count > 0).sort((a, b) => b.count - a.count);

  const trendingList = posts.filter(p => p.isTrending);
  const nonTrendingList = posts.filter(p => !p.isTrending && p.isPublished);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  const SidebarBtn = ({ id, icon: Icon, label }: { id: string; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 p-4 font-bold rounded-2xl transition-all text-left ${activeTab === id ? 'bg-primary text-black shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 flex-grow min-h-[calc(100vh-100px)]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white p-6 flex flex-col shrink-0 z-40 border-r border-gray-200 shadow-xl">
        <div className="flex items-center space-x-3 mb-10">
          <div className="p-2 bg-primary rounded-lg text-black"><LayoutDashboard className="w-5 h-5" /></div>
          <span className="text-lg font-bold uppercase tracking-tighter italic">Admin <span className="text-primary">Hub</span></span>
        </div>

        <nav className="space-y-1.5 flex-grow">
          <SidebarBtn id="news" icon={Newspaper} label="Manage News" />
          <SidebarBtn id="trending" icon={TrendingUp} label="Trending" />
          <SidebarBtn id="videos" icon={Youtube} label="Videos" />
          <SidebarBtn id="analytics" icon={BarChart3} label="Analytics" />
          <SidebarBtn id="settings" icon={Settings} label="Settings" />
        </nav>

        <div className="pt-6 border-t border-white/10 mt-6 space-y-2">
          <Link href="/admin/new" className="w-full flex items-center space-x-3 p-4 font-bold rounded-2xl transition-all bg-primary/10 text-primary hover:bg-primary hover:text-black">
            <Plus className="w-5 h-5" /><span>New Article</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center space-x-3 p-4 text-red-400 hover:bg-red-500/10 w-full font-bold rounded-2xl transition-all">
            <LogOut className="w-5 h-5" /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 overflow-x-hidden w-full">

        {/* ─── NEWS TAB ─── */}
        {activeTab === 'news' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-black mb-1">News Management</h1>
                <p className="text-gray-500 font-medium text-sm">Create, edit and manage your portal content.</p>
              </div>
              <Link href="/admin/new" className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3.5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-lg text-sm">
                <Plus className="w-4 h-4" /><span>Post New Article</span>
              </Link>
            </header>

            {error && (
              <div className="mb-6 p-5 bg-red-50 border-2 border-red-100 rounded-2xl flex items-start space-x-4">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-900 font-bold uppercase tracking-tight text-sm">Database Connection Error</h3>
                  <p className="text-red-700 text-sm mt-1">{error} — Running in offline mode. Start MongoDB to manage articles.</p>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total', value: totalPosts, icon: Newspaper, color: 'text-black' },
                { label: 'Published', value: publishedPosts, icon: Globe, color: 'text-green-600' },
                { label: 'Trending', value: trendingPosts, icon: TrendingUp, color: 'text-primary' },
                { label: 'Drafts', value: draftPosts, icon: FilePlus2, color: 'text-gray-400' },
              ].map(stat => (
                <div key={stat.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <div className="text-2xl font-bold text-black">{stat.value}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center space-x-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by title or category…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-grow bg-transparent outline-none text-sm font-medium text-black placeholder-gray-400"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-black"><XCircle className="w-4 h-4" /></button>}
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Article</th>
                      <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                      <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
                      <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredPosts.map(post => {
                      const postId = getPostId(post);
                      return (
                      <tr key={postId} className="hover:bg-gray-50 group transition-all">
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden shrink-0">
                              {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <Newspaper className="w-5 h-5 m-2.5 opacity-20" />}
                            </div>
                            <div className="font-bold text-black text-sm line-clamp-1 max-w-[220px]">{post.title}</div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">{post.category}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => handleTogglePublish(post)}
                              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all hover:scale-105 ${post.isPublished ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full ${post.isPublished ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <span>{post.isPublished ? 'Live' : 'Draft'}</span>
                            </button>
                            <button
                              onClick={() => handleToggleTrending(post)}
                              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border transition-all hover:scale-105 ${post.isTrending ? 'bg-red-50 text-primary border-primary/30' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                            >
                              <TrendingUp className="w-3 h-3" />
                              <span>{post.isTrending ? 'Hot' : 'Normal'}</span>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-xs font-medium text-gray-500 whitespace-nowrap">
                          {post.publishDate && !isNaN(new Date(post.publishDate).getTime()) 
                            ? new Date(post.publishDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                            : 'Recently'}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/news/${postId}`} target="_blank" className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-all"><Eye className="w-4 h-4" /></Link>
                            <Link href={`/admin/edit/${postId}`} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-all"><Edit3 className="w-4 h-4" /></Link>
                            <button onClick={() => handleDelete(postId)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    )})}
                    {filteredPosts.length === 0 && (
                      <tr><td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic font-medium text-sm">
                        {searchQuery ? `No articles found for "${searchQuery}"` : 'No articles yet. Start by posting your first story.'}
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TRENDING TAB ─── */}
        {activeTab === 'trending' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-black mb-1">Trending Manager</h1>
              <p className="text-gray-500 font-medium text-sm">Control which stories appear in the "Trending" spotlight.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Currently Trending */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 bg-primary/5 border-b border-primary/10 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h2 className="font-bold uppercase tracking-tighter text-black text-lg">Currently Trending</h2>
                  </div>
                  <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">{trendingList.length}</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {trendingList.length === 0 && (
                    <div className="p-12 text-center text-gray-400 text-sm italic">No trending articles. Add some from the right panel.</div>
                  )}
                  {trendingList.map(post => {
                    const postId = getPostId(post);
                    return (
                    <div key={postId} className="px-6 py-5 flex items-center space-x-4 group hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <Newspaper className="w-5 h-5 m-3.5 opacity-20" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold text-black text-sm line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-0.5">{post.category}</div>
                      </div>
                      <button
                        onClick={() => handleToggleTrending(post)}
                        title="Remove from trending"
                        className="ml-2 p-2 text-primary hover:bg-primary hover:text-black rounded-xl transition-all shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                    );
                  })}
                </div>
              </div>

              {/* Add to Trending */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-8 py-6 bg-gray-50 border-b border-gray-100 flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-gray-500" />
                  <h2 className="font-bold uppercase tracking-tighter text-black text-lg">Add to Trending</h2>
                </div>
                <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
                  {nonTrendingList.length === 0 && (
                    <div className="p-12 text-center text-gray-400 text-sm italic">All published articles are already trending!</div>
                  )}
                  {nonTrendingList.map(post => {
                    const postId = getPostId(post);
                    return (
                    <div key={postId} className="px-6 py-5 flex items-center space-x-4 group hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <Newspaper className="w-5 h-5 m-3.5 opacity-20" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold text-black text-sm line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-0.5">{post.category}</div>
                      </div>
                      <button
                        onClick={() => handleToggleTrending(post)}
                        title="Mark as trending"
                        className="ml-2 p-2 text-gray-400 hover:bg-primary hover:text-black rounded-xl transition-all shrink-0 opacity-0 group-hover:opacity-100"
                      >
                        <Star className="w-5 h-5" />
                      </button>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── ANALYTICS TAB ─── */}
        {activeTab === 'analytics' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-black mb-1">Analytics Overview</h1>
              <p className="text-gray-500 font-medium text-sm">Content performance and distribution insights.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Articles', value: totalPosts, icon: Newspaper, trend: null, color: 'bg-black text-white' },
                { label: 'Published', value: publishedPosts, icon: Globe, trend: 'up', color: 'bg-green-500 text-white' },
                { label: 'Trending', value: trendingPosts, icon: TrendingUp, trend: 'up', color: 'bg-primary text-black' },
                { label: 'Drafts', value: draftPosts, icon: FilePlus2, trend: null, color: 'bg-gray-200 text-black' },
              ].map(card => (
                <div key={card.label} className={`${card.color} p-6 rounded-2xl shadow-sm`}>
                  <div className="flex items-center justify-between mb-3">
                    <card.icon className="w-6 h-6 opacity-80" />
                    {card.trend === 'up' && <ArrowUp className="w-4 h-4 opacity-60" />}
                    {card.trend === 'down' && <ArrowDown className="w-4 h-4 opacity-60" />}
                    {card.trend === null && <Minus className="w-4 h-4 opacity-60" />}
                  </div>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70 mt-1">{card.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Breakdown */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" /><span>Content by Category</span>
                </h2>
                {categoryBreakdown.length === 0 ? (
                  <div className="text-center text-gray-400 italic py-8 text-sm">No articles yet.</div>
                ) : (
                  <div className="space-y-4">
                    {categoryBreakdown.map(cat => (
                      <div key={cat.name}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-bold text-black">{cat.name}</span>
                          <span className="text-xs font-bold text-gray-500">{cat.count} articles · {cat.pct}%</span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${cat.pct}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Health */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" /><span>Content Health</span>
                </h2>
                <div className="space-y-5">
                  {[
                    { label: 'Articles Published', value: publishedPosts, total: totalPosts, color: 'bg-green-500' },
                    { label: 'Articles Trending', value: trendingPosts, total: totalPosts, color: 'bg-primary' },
                    { label: 'Articles in Draft', value: draftPosts, total: totalPosts, color: 'bg-gray-400' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${item.color} shrink-0`}></div>
                      <div className="flex-grow">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-bold text-black">{item.label}</span>
                          <span className="text-sm font-bold text-gray-500">{totalPosts > 0 ? Math.round(item.value / totalPosts * 100) : 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full">
                          <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${totalPosts > 0 ? (item.value / totalPosts * 100) : 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <div className="text-2xl font-bold text-black">{totalPosts > 0 ? Math.round(publishedPosts / totalPosts * 100) : 0}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Publish Rate</div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 text-center">
                    <div className="text-2xl font-bold text-primary">{totalPosts > 0 ? Math.round(trendingPosts / totalPosts * 100) : 0}%</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1">Trending Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent articles list */}
            <div className="mt-8 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6">Recently Published</h2>
              {posts.filter(p => p.isPublished).slice(0, 5).length === 0 ? (
                <div className="text-center text-gray-400 italic text-sm py-6">No published articles yet.</div>
              ) : (
                <div className="space-y-3">
                  {posts.filter(p => p.isPublished).slice(0, 5).map((post, i) => {
                    const postId = getPostId(post);
                    return (
                    <div key={postId} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-gray-300 font-bold text-lg w-6 text-center">#{i + 1}</span>
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        {post.image ? <img src={post.image} alt="" className="w-full h-full object-cover" /> : <Newspaper className="w-5 h-5 m-2.5 opacity-20" />}
                      </div>
                      <div className="flex-grow min-w-0">
                        <div className="font-bold text-black text-sm line-clamp-1">{post.title}</div>
                        <div className="text-xs text-gray-400 uppercase">{post.category}</div>
                      </div>
                      {post.isTrending && <span className="bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full border border-primary/20">Trending</span>}
                    </div>
                  )})}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── VIDEOS TAB ─── */}
        {activeTab === 'videos' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
              <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-black mb-1">Video Portal Manager</h1>
                <p className="text-gray-500 font-medium text-sm">Manage the video content displayed on the home page.</p>
              </div>
              <button 
                onClick={() => setIsAddingVideo(!isAddingVideo)}
                className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3.5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-lg text-sm"
              >
                <Plus className={`w-4 h-4 transition-transform ${isAddingVideo ? 'rotate-45' : ''}`} />
                <span>{isAddingVideo ? 'Cancel' : 'Add New Video'}</span>
              </button>
            </header>

            {isAddingVideo && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 animate-in slide-in-from-top-4 duration-300">
                <form onSubmit={handleAddVideo} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">YouTube Video URL</label>
                      <input 
                        required
                        type="url" 
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newVideoUrl} 
                        onChange={e => setNewVideoUrl(e.target.value)} 
                        className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-bold text-sm outline-none transition-all text-black" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Video Title</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Enter video title..."
                        value={newVideoTitle} 
                        onChange={e => setNewVideoTitle(e.target.value)} 
                        className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-bold text-sm outline-none transition-all text-black" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full md:w-auto px-10 py-4 bg-primary text-black rounded-2xl font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-xl text-sm">
                    Save Video to Portal
                  </button>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.length === 0 && (
                <div className="col-span-full py-20 text-center text-gray-400 italic font-medium bg-white rounded-3xl border border-gray-100">
                  No videos added to the portal yet.
                </div>
              )}
              {videos.map((video: any) => (
                <div key={video.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-black shadow-xl opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                        <Play className="w-6 h-6 fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                       <button onClick={() => handleDeleteVideo(video.id)} className="p-2 bg-white/90 text-red-500 hover:bg-white rounded-xl shadow-lg transition-all">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-black group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3 mr-1.5" />
                        {video.date}
                      </div>
                      <a 
                        href={video.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── SETTINGS TAB ─── */}
        {activeTab === 'settings' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-bold uppercase tracking-tighter text-black mb-1">Portal Settings</h1>
              <p className="text-gray-500 font-medium text-sm">Configure your news portal branding and preferences.</p>
            </header>

            {settingsSaved && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-bold text-sm">Settings saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Site Identity */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6 flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-primary" /><span>Site Identity</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Portal Name</label>
                    <input type="text" value={settings.siteName} onChange={e => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-bold text-sm outline-none transition-all text-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Tagline</label>
                    <input type="text" value={settings.tagline} onChange={e => setSettings({ ...settings, tagline: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-bold text-sm outline-none transition-all text-black" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Breaking News Ticker Text</label>
                    <input type="text" value={settings.breakingNewsTicker} onChange={e => setSettings({ ...settings, breakingNewsTicker: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-bold text-sm outline-none transition-all text-black" />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" /><span>Contact Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input type="email" value={settings.contactEmail} onChange={e => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-medium text-sm outline-none transition-all text-black" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                    <input type="tel" value={settings.contactPhone} onChange={e => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-medium text-sm outline-none transition-all text-black" />
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-6 flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" /><span>Social Media Links</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'twitterUrl', label: 'X (Twitter) URL' },
                    { key: 'instagramUrl', label: 'Instagram URL' },
                    { key: 'youtubeUrl', label: 'YouTube URL' },
                    { key: 'facebookUrl', label: 'Facebook URL' },
                  ].map(field => (
                    <div key={field.key} className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{field.label}</label>
                      <input
                        type="url"
                        value={(settings as any)[field.key]}
                        onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-primary rounded-2xl font-medium text-sm outline-none transition-all text-black"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Security */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="font-bold uppercase tracking-tighter text-black text-lg mb-2 flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-primary" /><span>Security</span>
                </h2>
                <p className="text-sm text-gray-500 mb-6">Admin password is managed via the <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">.env</code> file using the <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">ADMIN_SECRET</code> variable.</p>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-sm font-medium text-gray-600 flex items-center space-x-3">
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span>Current password: <span className="font-bold text-black">{'●'.repeat(12)}</span> — Edit <code className="bg-white border px-1.5 rounded">.env</code> to change it.</span>
                </div>
              </div>

              <button type="submit" className="w-full md:w-auto flex items-center justify-center space-x-3 bg-black text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all shadow-xl text-sm">
                <Save className="w-5 h-5" /><span>Save All Settings</span>
              </button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
