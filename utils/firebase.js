import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_FIREBASE_KEY}`,
  authDomain: 'kiosk-db.firebaseapp.com',
  projectId: 'kiosk-db',
  storageBucket: 'kiosk-db.appspot.com',
  messagingSenderId: '462384137747',
  appId: '1:462384137747:web:6b7d26516035949ef861e6',
  measurementId: 'G-Q4N42XBJ0H',
};

initializeApp(firebaseConfig);

export const db = getFirestore();
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth();
