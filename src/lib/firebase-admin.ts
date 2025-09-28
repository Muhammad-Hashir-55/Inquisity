import * as admin from 'firebase-admin';

let adminAuth: admin.auth.Auth | null = null;

const hasAdminConfig = 
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

if (hasAdminConfig && !admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    adminAuth = admin.auth();
  } catch (error: any) {
    console.error('Firebase admin initialization error', error.stack);
  }
} else if (!hasAdminConfig) {
    console.warn("Firebase Admin SDK not configured. Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY environment variables.");
}


export { adminAuth };
