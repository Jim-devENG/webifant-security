import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './config';

// Get client compliance status
export const getClientCompliance = async ( clientId ) => {
    try {
        const complianceRef = collection( db, 'compliance' );
        const q = query( complianceRef, where( 'clientId', '==', clientId ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting client compliance:', error );
        return [];
    }
};

// Add compliance framework for client
export const addComplianceFramework = async ( clientId, frameworkData ) => {
    try {
        const complianceData = {
            clientId,
            ...frameworkData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc( collection( db, 'compliance' ), complianceData );
        return { id: docRef.id, ...complianceData };
    } catch ( error ) {
        console.error( 'Error adding compliance framework:', error );
        throw error;
    }
};

// Update compliance status
export const updateComplianceStatus = async ( complianceId, updates ) => {
    try {
        const complianceRef = doc( db, 'compliance', complianceId );
        await updateDoc( complianceRef, {
            ...updates,
            updatedAt: new Date()
        } );
        return { success: true, error: null };
    } catch ( error ) {
        console.error( 'Error updating compliance status:', error );
        return { success: false, error: error.message };
    }
};

// Get compliance by ID
export const getComplianceById = async ( complianceId ) => {
    try {
        const complianceDoc = await getDoc( doc( db, 'compliance', complianceId ) );
        if ( complianceDoc.exists() ) {
            return { id: complianceDoc.id, ...complianceDoc.data() };
        }
        return null;
    } catch ( error ) {
        console.error( 'Error getting compliance by ID:', error );
        return null;
    }
};

// Delete compliance framework
export const deleteComplianceFramework = async ( complianceId ) => {
    try {
        await deleteDoc( doc( db, 'compliance', complianceId ) );
        return { success: true, error: null };
    } catch ( error ) {
        console.error( 'Error deleting compliance framework:', error );
        return { success: false, error: error.message };
    }
};

// Get all compliance frameworks
export const getAllComplianceFrameworks = async () => {
    try {
        const complianceRef = collection( db, 'compliance' );
        const snapshot = await getDocs( complianceRef );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting all compliance frameworks:', error );
        return [];
    }
}; 