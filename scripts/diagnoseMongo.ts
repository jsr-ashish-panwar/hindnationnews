import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function diagnose() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI not found');
    process.exit(1);
  }

  try {
    console.log('Connecting to:', MONGODB_URI.replace(/:([^@]+)@/, ':****@'));
    await mongoose.connect(MONGODB_URI);
    console.log('Connected!');
    
    const dbName = mongoose.connection.name;
    console.log('Database Name:', dbName);

    if (!mongoose.connection.db) {
      throw new Error('Database connection established but db object is undefined');
    }

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));

    for (const coll of collections) {
      if (mongoose.connection.db) {
        const count = await mongoose.connection.db.collection(coll.name).countDocuments();
        console.log(`Collection ${coll.name} Count:`, count);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  }
}

diagnose();
