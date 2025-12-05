'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/config';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export function FirestoreWarning() {
  const [isFirestoreEnabled, setIsFirestoreEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const checkFirestore = async () => {
      try {
        // Try to query Firestore with a timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const testQuery = query(collection(db, 'users'), limit(1));
        await getDocs(testQuery);
        
        clearTimeout(timeoutId);
        setIsFirestoreEnabled(true);
      } catch (error) {
        // Only log errors that aren't permission-related
        if (error instanceof Error && 
            !error.message.includes('permission') && 
            !error.message.includes('insufficient permissions')) {
          console.error('Firestore check error:', error);
        }
        
        if (error instanceof Error) {
          // Permission errors mean Firestore IS enabled, just needs rules setup
          if (error.message.includes('permission') || 
              error.message.includes('insufficient permissions')) {
            setIsFirestoreEnabled(true);
          } else if (error.message.includes('offline') || 
                     error.message.includes('unavailable') ||
                     error.message.includes('not found')) {
            setIsFirestoreEnabled(false);
          } else {
            setIsFirestoreEnabled(true); // Other errors mean Firestore is enabled
          }
        }
      }
    };

    // Check immediately and then every 5 seconds if failed
    checkFirestore();
    const interval = setInterval(() => {
      if (isFirestoreEnabled === false) {
        checkFirestore();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isFirestoreEnabled]);

  if (isFirestoreEnabled !== false) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white px-4 py-3 shadow-lg z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">⚠️ Firestore Database Not Enabled</h3>
            <p className="text-sm mb-2">The app cannot work without Firestore. Please follow these steps:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://console.firebase.google.com/project/rauanagym/firestore" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Firebase Console → Firestore</a></li>
              <li>Click <strong>&quot;Create database&quot;</strong></li>
              <li>Choose <strong>&quot;Start in test mode&quot;</strong></li>
              <li>Select region (e.g., europe-west1)</li>
              <li>Click <strong>&quot;Enable&quot;</strong></li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
