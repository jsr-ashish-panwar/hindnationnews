# HIND NATION NEWS - Premium News Portal

A professional, modern, and fully responsive news website for **Lalit Shiahodia**.

## Features
- **Modern UI**: Red + White + Black theme inspired by India TV and HT.
- **Dynamic Content**: Auto-syncs news from Instagram and videos from YouTube.
- **Multi-Page**: Home, Journalist Profile, Instagram Feed, YouTube Feed, X Feed, and Contact.
- **SEO Optimized**: Built with Next.js 15 for maximum performance and search visibility.
- **Admin Ready**: MongoDB integrated to store and manage synced content.

## Tech Stack
- **Frontend**: Next.js 15, React 19, Tailwind CSS 4.
- **Backend**: Next.js API Routes (Node.js).
- **Database**: MongoDB (via Mongoose).
- **Icons**: Lucide React.
- **APIs**: Instagram Graph API, YouTube Data API.

## Project Structure
```text
src/
├── app/            # Next.js App Router (Pages & API Routes)
├── components/     # UI Components (Header, Footer, NewsCard, etc.)
├── lib/            # Utilities (DB connection, API fetchers)
├── models/         # Mongoose Schemas (Post model)
├── hooks/          # Custom React hooks
└── types/          # TypeScript definitions
```

## Setup Instructions

### 1. Prerequisite
- Node.js 18+ installed.
- MongoDB instance (local or Atlas).

### 2. Environment Variables
Create a `.env.local` file in the root directory based on `.env.example`:
```bash
MONGODB_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_key
YOUTUBE_CHANNEL_ID=your_id
INSTAGRAM_ACCESS_TOKEN=your_token
INSTAGRAM_USER_ID=your_id
ADMIN_SECRET=your_secret_for_manual_sync
```

### 3. Installation
```bash
npm install
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 5. Content Sync
To manually sync content from social media to your database, visit:
`http://localhost:3000/api/sync?secret=your_admin_secret`

## Deployment
Recommended: **Vercel**
1. Connect your GitHub repository to Vercel.
2. Add the environment variables in the Vercel dashboard.
3. Deploy!

## Credits
**Owner/Journalist**: Lalit Shishodia
**Developer**: Antigravity
