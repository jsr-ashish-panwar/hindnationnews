import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI && process.env.NODE_ENV === 'production') {
  throw new Error('Please define the MONGODB_URI environment variable on Netlify.');
}

const connectionString = MONGODB_URI || 'mongodb://localhost:27017/hindnationnews';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      connectTimeoutMS: 5000,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(connectionString, opts).then((mongoose) => {
      console.log('MongoDB Connected to:', connectionString.split('@')[1] || 'localhost');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
