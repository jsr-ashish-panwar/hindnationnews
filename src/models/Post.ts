import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  source: 'instagram' | 'youtube' | 'x' | 'manual';
  sourceId: string;
  publishDate: Date;
  author: string;
  url: string;
  metadata?: any;
  isTrending: boolean;
  isPublished: boolean;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String },
  image: { type: String },
  category: { type: String, default: 'General' },
  source: { type: String, enum: ['instagram', 'youtube', 'x', 'manual'], required: true },
  sourceId: { type: String, unique: true },
  publishDate: { type: Date, default: Date.now },
  author: { type: String, default: 'Lalit Shishodia' },
  url: { type: String },
  metadata: { type: Schema.Types.Mixed },
  isTrending: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
