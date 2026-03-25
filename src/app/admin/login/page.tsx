'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert } from 'lucide-react';

export default function AdminLogin() {
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret) return;

    setError('');
    
    // We'll store it in localStorage first
    localStorage.setItem('admin_secret', secret);
    
    // Attempt a test fetch to verify the secret immediately
    try {
      const res = await fetch('/api/admin/posts', {
        headers: { 'x-admin-secret': secret }
      });
      
      if (res.ok || res.status === 500) {
        // If 500, it means the secret was fine but the DB is offline.
        // We let them through so they see the "Critical Connection Error" banner.
        router.push('/admin');
      } else if (res.status === 401) {
        setError('Invalid Admin Secret Key. Access Denied.');
        localStorage.removeItem('admin_secret');
      } else {
        setError('Unexpected error communicating with server.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden text-black">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
        
        <div className="text-center mb-10">
          <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-6 text-primary">
            <Lock className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2 text-black">Admin Access</h1>
          <p className="text-gray-500 font-medium">HIND NATION NEWS PORTAL</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="admin_secret_key" className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Admin Secret Key</label>
            <input 
              type="password" 
              id="admin_secret_key"
              name="admin_secret_key"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary focus:bg-white outline-none transition-all rounded-2xl text-lg font-bold"
              required
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-black text-white py-5 px-8 font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-black/10"
          >
            <span>Authorize Access</span>
          </button>
        </form>

        <p className="mt-10 text-center text-gray-400 text-xs uppercase tracking-widest font-bold">
          Restricted Area &copy; {new Date().getFullYear()} Hind Nation News
        </p>
      </div>
    </div>
  );
}
