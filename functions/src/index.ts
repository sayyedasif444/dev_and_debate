import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as next from 'next';

admin.initializeApp();

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: '.next' } });
const handle = app.getRequestHandler();

// Next.js SSR function
export const nextApp = functions.https.onRequest((req, res) => {
  return app.prepare().then(() => handle(req, res));
});

// Example function that triggers on Firestore document creation
export const onUserCreated = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const userData = snap.data();
    console.log('New user created:', userData);
    return null;
  }); 