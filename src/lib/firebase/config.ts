/**
 * Legacy config file - now re-exports from firebaseClient.ts
 * This ensures single Firebase initialization across the app
 */
export { app as default, auth, db, storage } from '@/lib/firebaseClient';

