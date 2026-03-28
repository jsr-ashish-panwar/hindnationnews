import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  id: string; // "global"
  siteName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  contactLandline: string;
  facebookUrl?: string;
  twitterUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  articlesPerPage: number;
  breakingNewsTicker: string;
}

const SettingsSchema: Schema = new Schema({
  id: { type: String, default: 'global', unique: true },
  siteName: { type: String, default: 'HIND NATION NEWS' },
  tagline: { type: String, default: "India's Voice, Your News Portal" },
  contactEmail: { type: String, default: 'hindnationnews18x7@gmail.com' },
  contactPhone: { type: String, default: '+91 99108 35426' },
  contactLandline: { type: String, default: '0120-5044958' },
  facebookUrl: { type: String },
  twitterUrl: { type: String, default: 'https://x.com/cahindnews' },
  instagramUrl: { type: String, default: 'https://www.instagram.com/hind_nation_news_15x7' },
  youtubeUrl: { type: String, default: 'https://www.youtube.com/@lalitshishodia15' },
  articlesPerPage: { type: Number, default: 10 },
  breakingNewsTicker: { type: String, default: 'Stay tuned for the latest breaking news from across India.' },
}, {
  timestamps: true
});

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
