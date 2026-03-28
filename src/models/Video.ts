import mongoose, { Schema, Document } from 'mongoose';

export interface IVideo extends Document {
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  category: string;
  publishDate: Date;
  id?: string;
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  duration: { type: String },
  category: { type: String, default: 'General' },
  publishDate: { type: Date, default: Date.now },
  id: { type: String, unique: true }
}, {
  timestamps: true
});

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
