export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check environment variables
    const envCheck = {
      apiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      projectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      authDomain: !!process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      storageBucket: !!process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: !!process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: !!process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const missingKeys = Object.entries(envCheck)
      .filter(([key, exists]) => !exists)
      .map(([key]) => key);

    if (missingKeys.length > 0) {
      return res.status(500).json({
        error: 'Missing Firebase environment variables',
        missing: missingKeys,
        timestamp: new Date().toISOString()
      });
    }

    // Try to initialize Firebase
    const { initializeApp, getApps } = require('firebase/app');
    const { getFirestore, collection, query, limit, getDocs } = require('firebase/firestore');

    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    let app;
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }

    const db = getFirestore(app);

    // Test a simple query
    try {
      const testQuery = query(collection(db, 'blogs'), limit(1));
      await getDocs(testQuery);
      
      return res.status(200).json({
        success: true,
        message: 'Firebase connection successful',
        projectId: firebaseConfig.projectId,
        timestamp: new Date().toISOString()
      });
    } catch (queryError) {
      return res.status(500).json({
        error: 'Firebase query failed',
        message: queryError.message,
        code: queryError.code,
        timestamp: new Date().toISOString()
      });
    }
    
  } catch (error) {
    console.error('Firebase connection test error:', error);
    return res.status(500).json({
      error: 'Firebase initialization failed',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
} 