'use client';

import { useEffect } from 'react';

// Global error handler for Firebase internal assertion errors
export default function GlobalErrorHandler() {
  useEffect(() => {
    // Override console.error to catch Firebase internal assertion errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') && message.includes('INTERNAL ASSERTION FAILED')) ||
          message.includes('Unexpected state') ||
          message.includes('INTERNAL ASSERTION FAILED') ||
          message.includes('@firebase/firestore')) {
        // Completely suppress Firebase internal assertion errors
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Override console.warn to catch Firebase warnings
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0];
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') && message.includes('INTERNAL ASSERTION FAILED')) ||
          message.includes('Unexpected state') ||
          message.includes('@firebase/firestore')) {
        // Completely suppress Firebase internal assertion warnings
        return;
      }
      originalConsoleWarn.apply(console, args);
    };

    // Handle global error events
    const handleError = (event: ErrorEvent) => {
      // Check if this is a Firebase internal assertion error
      if (event.error && 
          typeof event.error === 'object' && 
          event.error.message && 
          (event.error.message.includes('INTERNAL ASSERTION FAILED') || 
           event.error.message.includes('Unexpected state') ||
           event.error.message.includes('@firebase/firestore'))) {
        
        console.warn('⚠️ Firebase internal assertion error caught and suppressed:', event.error.message);
        event.preventDefault();
        return false;
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      // Check if this is a Firebase internal assertion error
      if (event.reason && 
          typeof event.reason === 'object' && 
          event.reason.message && 
          (event.reason.message.includes('INTERNAL ASSERTION FAILED') || 
           event.reason.message.includes('Unexpected state') ||
           event.reason.message.includes('@firebase/firestore'))) {
        
        console.warn('⚠️ Firebase internal assertion promise rejection caught and suppressed:', event.reason.message);
        event.preventDefault();
        return false;
      }
    };

    // Override window.onerror
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      if (typeof message === 'string' && 
          (message.includes('FIRESTORE') || 
           message.includes('INTERNAL ASSERTION FAILED') || 
           message.includes('Unexpected state') ||
           message.includes('@firebase/firestore'))) {
        // Completely suppress Firebase internal assertion errors
        return true; // Prevent default error handling
      }
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }
      return false;
    };

    // Override window.onunhandledrejection
    const originalOnUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      const reason = event.reason;
      if (reason && typeof reason === 'object' && 
          (reason.message?.includes('FIRESTORE') || 
           reason.message?.includes('INTERNAL ASSERTION FAILED') ||
           reason.message?.includes('Unexpected state') ||
           reason.message?.includes('@firebase/firestore'))) {
        // Completely suppress Firebase internal assertion errors
        event.preventDefault(); // Prevent default error handling
        return;
      }
      if (originalOnUnhandledRejection) {
        originalOnUnhandledRejection.call(window, event);
      }
    };

    // Add global error event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      
      // Restore original console methods
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.onerror = originalOnError;
      window.onunhandledrejection = originalOnUnhandledRejection;
    };
  }, []);

  return null;
} 