import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './config';

// Get client security incidents
export const getClientIncidents = async ( clientId ) => {
    try {
        const incidentsRef = collection( db, 'incidents' );
        const q = query( incidentsRef, where( 'clientId', '==', clientId ), orderBy( 'date', 'desc' ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting client incidents:', error );
        return [];
    }
};

// Add new security incident
export const addSecurityIncident = async ( clientId, incidentData ) => {
    try {
        const incident = {
            clientId,
            ...incidentData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc( collection( db, 'incidents' ), incident );
        return { id: docRef.id, ...incident };
    } catch ( error ) {
        console.error( 'Error adding security incident:', error );
        throw error;
    }
};

// Update incident status
export const updateIncidentStatus = async ( incidentId, updates ) => {
    try {
        const incidentRef = doc( db, 'incidents', incidentId );
        await updateDoc( incidentRef, {
            ...updates,
            updatedAt: new Date()
        } );
        return { success: true, error: null };
    } catch ( error ) {
        console.error( 'Error updating incident status:', error );
        return { success: false, error: error.message };
    }
};

// Get incident by ID
export const getIncidentById = async ( incidentId ) => {
    try {
        const incidentDoc = await getDoc( doc( db, 'incidents', incidentId ) );
        if ( incidentDoc.exists() ) {
            return { id: incidentDoc.id, ...incidentDoc.data() };
        }
        return null;
    } catch ( error ) {
        console.error( 'Error getting incident by ID:', error );
        return null;
    }
};

// Delete incident
export const deleteIncident = async ( incidentId ) => {
    try {
        await deleteDoc( doc( db, 'incidents', incidentId ) );
        return { success: true, error: null };
    } catch ( error ) {
        console.error( 'Error deleting incident:', error );
        return { success: false, error: error.message };
    }
};

// Get all incidents (admin only)
export const getAllIncidents = async () => {
    try {
        const incidentsRef = collection( db, 'incidents' );
        const q = query( incidentsRef, orderBy( 'date', 'desc' ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting all incidents:', error );
        return [];
    }
};

// Get incidents by severity
export const getIncidentsBySeverity = async ( severity ) => {
    try {
        const incidentsRef = collection( db, 'incidents' );
        const q = query( incidentsRef, where( 'severity', '==', severity ), orderBy( 'date', 'desc' ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting incidents by severity:', error );
        return [];
    }
};

// Get incidents by status
export const getIncidentsByStatus = async ( status ) => {
    try {
        const incidentsRef = collection( db, 'incidents' );
        const q = query( incidentsRef, where( 'status', '==', status ), orderBy( 'date', 'desc' ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting incidents by status:', error );
        return [];
    }
}; 