import admin from 'firebase-admin';

let isFirebaseAdminReady = false;

if (!admin.apps.length) {
  try {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    
    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`
      });
      isFirebaseAdminReady = true;
    } else if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && (process.env.NODE_ENV === 'production' || process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      // Only attempt ADC in production (e.g. Google Cloud) or if explicitly set
      admin.initializeApp({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
      });
      isFirebaseAdminReady = true;
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
} else {
  isFirebaseAdminReady = true;
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth, isFirebaseAdminReady };
