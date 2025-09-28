import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from './config';

// Create new lead
export const createLead = async ( leadData ) => {
    try {
        const newLead = {
            ...leadData,
            status: 'new',
            assignedTo: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc( collection( db, 'leads' ), newLead );
        return { id: docRef.id, ...newLead };
    } catch ( error ) {
        console.error( 'Error creating lead:', error );
        throw error;
    }
};

// Get all leads
export const getAllLeads = async () => {
    try {
        const leadsRef = collection( db, 'leads' );
        const q = query( leadsRef, orderBy( 'createdAt', 'desc' ) );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting leads:', error );
        return [];
    }
};

// Get lead by ID
export const getLeadById = async ( leadId ) => {
    try {
        const leadDoc = await getDoc( doc( db, 'leads', leadId ) );
        if ( leadDoc.exists() ) {
            return { id: leadDoc.id, ...leadDoc.data() };
        }
        return null;
    } catch ( error ) {
        console.error( 'Error getting lead:', error );
        return null;
    }
};

// Update lead status
export const updateLeadStatus = async ( leadId, status, notes = '' ) => {
    try {
        const leadRef = doc( db, 'leads', leadId );
        await updateDoc( leadRef, {
            status,
            notes,
            updatedAt: new Date()
        } );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating lead:', error );
        throw error;
    }
};

// Assign lead to admin
export const assignLead = async ( leadId, adminId ) => {
    try {
        const leadRef = doc( db, 'leads', leadId );
        await updateDoc( leadRef, {
            assignedTo: adminId,
            updatedAt: new Date()
        } );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error assigning lead:', error );
        throw error;
    }
};

// Convert lead to client
export const convertLeadToClient = async ( leadId, clientData ) => {
    try {
        // Update lead status
        await updateLeadStatus( leadId, 'converted' );

        // Create client profile (this would be handled by authService)
        return { success: true };
    } catch ( error ) {
        console.error( 'Error converting lead:', error );
        throw error;
    }
};

// Delete lead
export const deleteLead = async ( leadId ) => {
    try {
        await deleteDoc( doc( db, 'leads', leadId ) );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error deleting lead:', error );
        throw error;
    }
};

// Get leads by status
export const getLeadsByStatus = async ( status ) => {
    try {
        const leadsRef = collection( db, 'leads' );
        const q = query(
            leadsRef,
            where( 'status', '==', status ),
            orderBy( 'createdAt', 'desc' )
        );
        const snapshot = await getDocs( q );

        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting leads by status:', error );
        return [];
    }
}; 