import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './config';

// Sign in with email and password
export const signIn = async ( email, password ) => {
    try {
        const userCredential = await signInWithEmailAndPassword( auth, email, password );
        return { user: userCredential.user, error: null };
    } catch ( error ) {
        return { user: null, error: error.message };
    }
};

// Sign out
export const signOutUser = async () => {
    try {
        await signOut( auth );
        return { error: null };
    } catch ( error ) {
        return { error: error.message };
    }
};

// Listen to auth state changes
export const onAuthStateChange = ( callback ) => {
    return onAuthStateChanged( auth, callback );
};

// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
}; 