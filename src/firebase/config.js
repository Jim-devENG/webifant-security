import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// 🔥 REPLACE THIS WITH YOUR FIREBASE CONFIGURATION
// Go to Firebase Console → Project Settings → General → Your Apps → Web App
// Copy the firebaseConfig object and paste it here
const firebaseConfig = {
    apiKey: "your-api-key-here",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

// Initialize Firebase services
export const db = getFirestore( app );
export const auth = getAuth( app );
export const storage = getStorage( app );

export default app; 