import { db } from './config';
import { collection, doc, getDoc, getDocs, updateDoc, addDoc, query, where, orderBy, serverTimestamp } from 'firebase/firestore';

// Create a new client
export const createClient = async ( clientData ) => {
    try {
        const clientsRef = collection( db, 'clients' );

        const newClient = {
            ...clientData,
            status: 'active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc( clientsRef, newClient );

        return {
            id: docRef.id,
            ...newClient
        };
    } catch ( error ) {
        console.error( 'Error creating client:', error );
        throw error;
    }
};

// Get client services by client ID
export const getClientServices = async ( clientId ) => {
    try {
        const servicesRef = collection( db, 'client-services' );
        const q = query( servicesRef, where( 'clientId', '==', clientId ), orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const services = [];
        querySnapshot.forEach( ( doc ) => {
            services.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return services;
    } catch ( error ) {
        console.error( 'Error fetching client services:', error );
        throw error;
    }
};

// Get client information
export const getClientInfo = async ( clientId ) => {
    try {
        const clientRef = doc( db, 'clients', clientId );
        const clientDoc = await getDoc( clientRef );

        if ( clientDoc.exists() ) {
            return {
                id: clientDoc.id,
                ...clientDoc.data()
            };
        } else {
            throw new Error( 'Client not found' );
        }
    } catch ( error ) {
        console.error( 'Error fetching client info:', error );
        throw error;
    }
};

// Update service progress (legacy function for backward compatibility)
export const updateServiceProgress = async ( serviceId, progress, status, findings, nextSteps ) => {
    try {
        const serviceRef = doc( db, 'client-services', serviceId );
        await updateDoc( serviceRef, {
            progress,
            status,
            findings,
            nextSteps,
            updatedAt: new Date()
        } );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating service progress:', error );
        throw error;
    }
};

// Comprehensive service update function
export const updateClientService = async ( serviceId, updates ) => {
    try {
        const serviceRef = doc( db, 'client-services', serviceId );

        // Prepare update data with timestamp
        const updateData = {
            ...updates,
            updatedAt: new Date()
        };

        await updateDoc( serviceRef, updateData );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating client service:', error );
        throw error;
    }
};

// Add new service for client
export const addClientService = async ( clientId, serviceData ) => {
    try {
        const servicesRef = collection( db, 'client-services' );
        const newService = {
            clientId,
            ...serviceData,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc( servicesRef, newService );
        return {
            id: docRef.id,
            ...newService
        };
    } catch ( error ) {
        console.error( 'Error adding client service:', error );
        throw error;
    }
};

// Get client notifications
export const getClientNotifications = async ( clientId ) => {
    try {
        const notificationsRef = collection( db, 'client-notifications' );
        const q = query( notificationsRef, where( 'clientId', '==', clientId ), orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const notifications = [];
        querySnapshot.forEach( ( doc ) => {
            notifications.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return notifications;
    } catch ( error ) {
        console.error( 'Error fetching client notifications:', error );
        throw error;
    }
};

// Mark notification as read
export const markNotificationAsRead = async ( notificationId ) => {
    try {
        const notificationRef = doc( db, 'client-notifications', notificationId );
        await updateDoc( notificationRef, {
            read: true,
            readAt: new Date()
        } );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error marking notification as read:', error );
        throw error;
    }
};

// Add notification for client
export const addClientNotification = async ( clientId, notificationData ) => {
    try {
        const notificationsRef = collection( db, 'client-notifications' );
        const newNotification = {
            clientId,
            ...notificationData,
            read: false,
            createdAt: new Date()
        };

        const docRef = await addDoc( notificationsRef, newNotification );
        return {
            id: docRef.id,
            ...newNotification
        };
    } catch ( error ) {
        console.error( 'Error adding client notification:', error );
        throw error;
    }
}; 