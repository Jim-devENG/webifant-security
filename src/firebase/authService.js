import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    updatePassword,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './config';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with email and password
export const signIn = async ( email, password ) => {
    try {
        const userCredential = await signInWithEmailAndPassword( auth, email, password );
        return { user: userCredential.user, error: null };
    } catch ( error ) {
        return { user: null, error: error.message };
    }
};

// Sign in with Google
export const signInWithGoogle = async ( userType = 'client' ) => {
    try {
        const result = await signInWithPopup( auth, googleProvider );
        const user = result.user;

        // Check if user already exists
        const existingUser = await getUserProfile( user.uid );

        if ( existingUser.profile ) {
            // User exists, just return success
            return { user, error: null };
        } else {
            // New user, create profile
            const userData = {
                uid: user.uid,
                name: user.displayName || 'Unknown',
                email: user.email,
                role: userType,
                status: 'active',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            if ( userType === 'client' ) {
                // Add default client fields
                userData.company = 'Unknown Company';
                userData.phone = '';
                userData.industry = 'Technology';
                userData.companySize = '1-10 employees';
                userData.riskLevel = 'Medium';
                userData.complianceStatus = 'Non-Compliant';
                userData.lastAssessment = new Date().toISOString().split( 'T' )[0];
            }

            await setDoc( doc( db, userType === 'admin' ? 'admins' : 'clients', user.uid ), userData );
            return { user, error: null };
        }
    } catch ( error ) {
        return { user: null, error: error.message };
    }
};

// Register new client
export const registerClient = async ( clientData ) => {
    try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            clientData.email,
            clientData.password
        );

        // Create client profile in Firestore
        const clientProfile = {
            uid: userCredential.user.uid,
            name: clientData.name,
            company: clientData.company,
            email: clientData.email,
            phone: clientData.phone,
            industry: clientData.industry,
            companySize: clientData.companySize,
            role: 'client',
            status: 'active',
            riskLevel: 'Medium',
            complianceStatus: 'Non-Compliant',
            lastAssessment: new Date().toISOString().split( 'T' )[0],
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await setDoc( doc( db, 'clients', userCredential.user.uid ), clientProfile );

        // Update user profile
        await updateProfile( userCredential.user, {
            displayName: clientData.name
        } );

        return { user: userCredential.user, error: null };
    } catch ( error ) {
        let errorMessage = 'Registration failed. Please try again.';

        switch ( error.code ) {
            case 'auth/email-already-in-use':
                errorMessage = 'This email is already registered. Please try signing in instead, or use a different email address.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password is too weak. Please choose a stronger password (at least 6 characters).';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Please enter a valid email address.';
                break;
            case 'auth/operation-not-allowed':
                errorMessage = 'Email/password accounts are not enabled. Please contact support.';
                break;
            default:
                errorMessage = error.message || 'Registration failed. Please try again.';
        }

        return { user: null, error: errorMessage };
    }
};

// Register new admin
export const registerAdmin = async ( adminData ) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            adminData.email,
            adminData.password
        );

        const adminProfile = {
            uid: userCredential.user.uid,
            name: adminData.name,
            email: adminData.email,
            role: 'admin',
            status: 'active',
            createdAt: new Date()
        };

        await setDoc( doc( db, 'admins', userCredential.user.uid ), adminProfile );

        await updateProfile( userCredential.user, {
            displayName: adminData.name
        } );

        return { user: userCredential.user, error: null };
    } catch ( error ) {
        return { user: null, error: error.message };
    }
};

// Get user profile
export const getUserProfile = async ( uid ) => {
    try {
        // Check if user is admin
        const adminDoc = await getDoc( doc( db, 'admins', uid ) );
        if ( adminDoc.exists() ) {
            return { profile: adminDoc.data(), role: 'admin' };
        }

        // Check if user is client
        const clientDoc = await getDoc( doc( db, 'clients', uid ) );
        if ( clientDoc.exists() ) {
            return { profile: clientDoc.data(), role: 'client' };
        }

        return { profile: null, role: null };
    } catch ( error ) {
        console.error( 'Error getting user profile:', error );
        return { profile: null, role: null };
    }
};

// Update client profile
export const updateClientProfile = async ( clientId, updates ) => {
    try {
        const clientRef = doc( db, 'clients', clientId );
        await updateDoc( clientRef, {
            ...updates,
            updatedAt: new Date()
        } );
        return { success: true, error: null };
    } catch ( error ) {
        return { success: false, error: error.message };
    }
};

// Reset password
export const resetPassword = async ( email ) => {
    try {
        await sendPasswordResetEmail( auth, email );
        return { success: true, error: null };
    } catch ( error ) {
        return { success: false, error: error.message };
    }
};

// Change password
export const changePassword = async ( newPassword ) => {
    try {
        const user = auth.currentUser;
        if ( user ) {
            await updatePassword( user, newPassword );
            return { success: true, error: null };
        }
        return { success: false, error: 'No user logged in' };
    } catch ( error ) {
        return { success: false, error: error.message };
    }
};

// Sign out
export const signOutUser = async () => {
    try {
        await signOut( auth );
        return { success: true, error: null };
    } catch ( error ) {
        return { success: false, error: error.message };
    }
};

// Auth state change listener
export const onAuthStateChange = ( callback ) => {
    return onAuthStateChanged( auth, callback );
};

// Get all clients (admin only)
export const getAllClients = async () => {
    try {
        const clientsRef = collection( db, 'clients' );
        const snapshot = await getDocs( clientsRef );
        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting clients:', error );
        return [];
    }
};

// Get client by ID
export const getClientById = async ( clientId ) => {
    try {
        const clientDoc = await getDoc( doc( db, 'clients', clientId ) );
        if ( clientDoc.exists() ) {
            return { id: clientDoc.id, ...clientDoc.data() };
        }
        return null;
    } catch ( error ) {
        console.error( 'Error getting client:', error );
        return null;
    }
}; 