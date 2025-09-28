import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhyPMCAytahLYh31WN-2YAG3b2xdLmJ2g",
    authDomain: "webinfant-455ac.firebaseapp.com",
    projectId: "webinfant-455ac",
    storageBucket: "webifant-455ac.firebasestorage.app",
    messagingSenderId: "357935755631",
    appId: "1:357935755631:web:c0f3489aa2d82da261f89a",
    measurementId: "G-MFN9XPZ80L"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

// Initialize Firebase services
export const db = getFirestore( app );
export const auth = getAuth( app );
export const storage = getStorage( app );
export const functions = getFunctions( app );

export default app; 