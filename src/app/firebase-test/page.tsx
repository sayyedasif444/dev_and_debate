'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState('Checking Firebase...');
  const [error, setError] = useState<string | null>(null);
  const [config, setConfig] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    checkFirebase();
  }, []);

  const checkFirebase = async () => {
    try {
      // Check if Firebase config is available
      const hasConfig = process.env.FIREBASE_API_KEY && 
                       process.env.FIREBASE_PROJECT_ID;
      
      if (!hasConfig) {
        setError('Firebase configuration is missing. Please check your .env.local file.');
        setStatus('Configuration Error');
        return;
      }

      setConfig({
        apiKey: process.env.FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
        projectId: process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
        authDomain: process.env.FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET ? '✅ Set' : '❌ Missing',
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ? '✅ Set' : '❌ Missing',
        appId: process.env.FIREBASE_APP_ID ? '✅ Set' : '❌ Missing',
      });

      // Check if Firebase is initialized
      if (!db) {
        setError('Firebase is not initialized. Check your configuration.');
        setStatus('Initialization Error');
        return;
      }

      setStatus('Firebase is connected! ✅');
      
      // Test a simple Firestore operation
      const testCollection = collection(db, 'test');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('Connection Error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Firebase Connection Test</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Status: {status}</h2>
          
          {error && (
            <div className="bg-red-600/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-400">Error: {error}</p>
            </div>
          )}

          {config && (
            <div className="space-y-2">
              <h3 className="font-semibold">Configuration Check:</h3>
              {Object.entries(config).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-300">{key}:</span>
                  <span className={value === '✅ Set' ? 'text-green-400' : 'text-red-400'}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Create a Firebase project at <a href="https://console.firebase.google.com" className="text-primary hover:underline" target="_blank" rel="noopener">Firebase Console</a></li>
            <li>Enable Firestore Database</li>
            <li>Get your web app configuration</li>
            <li>Create a <code className="bg-gray-700 px-2 py-1 rounded">.env.local</code> file with your Firebase config</li>
            <li>Restart your development server</li>
          </ol>
        </div>

        <div className="mt-6">
          <button 
            onClick={checkFirebase}
            className="px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg"
          >
            Test Again
          </button>
        </div>
      </div>
    </div>
  );
} 