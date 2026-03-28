import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';

export async function GET(request: Request) {
  const secret = request.headers.get('x-admin-secret');
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: any = {
    envSet: !!process.env.MONGODB_URI,
    uriLength: process.env.MONGODB_URI?.length || 0,
    uriStartsWith: process.env.MONGODB_URI?.substring(0, 15),
    uriEndsWith: process.env.MONGODB_URI ? `...${process.env.MONGODB_URI.slice(-4)}` : null,
    connectionState: mongoose.connection.readyState,
    dbName: mongoose.connection.name,
    error: null,
    modelCount: Object.keys(mongoose.models).length,
  };

  try {
    await dbConnect();
    results.connectionState = mongoose.connection.readyState;
    results.dbName = mongoose.connection.name;
    results.status = 'Success';
  } catch (err: any) {
    results.error = err.message || 'Unknown error';
    results.status = 'Failed';
  }

  return NextResponse.json(results);
}
