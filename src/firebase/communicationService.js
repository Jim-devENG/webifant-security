import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './config';

// Send email notification
export const sendEmailNotification = async ( clientId, notification ) => {
    try {
        // In a real implementation, this would call Firebase Functions
        // For now, we'll store the notification in Firestore
        const emailNotification = {
            clientId,
            type: 'email',
            subject: notification.subject || 'Security Update',
            message: notification.message,
            status: 'pending',
            createdAt: new Date()
        };

        await addDoc( collection( db, 'email-notifications' ), emailNotification );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error sending email notification:', error );
        throw error;
    }
};

// Send SMS alert
export const sendSMSAlert = async ( phoneNumber, message ) => {
    try {
        const smsNotification = {
            phoneNumber,
            message,
            status: 'pending',
            createdAt: new Date()
        };

        await addDoc( collection( db, 'sms-notifications' ), smsNotification );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error sending SMS alert:', error );
        throw error;
    }
};

// Send in-app message
export const sendMessage = async ( clientId, adminId, message ) => {
    try {
        const newMessage = {
            clientId,
            adminId,
            message,
            timestamp: new Date(),
            read: false,
            type: 'in-app'
        };

        const docRef = await addDoc( collection( db, 'messages' ), newMessage );
        return { id: docRef.id, ...newMessage };
    } catch ( error ) {
        console.error( 'Error sending message:', error );
        throw error;
    }
};

// Get messages for a client
export const getClientMessages = async ( clientId ) => {
    try {
        const messagesRef = collection( db, 'messages' );
        const q = query(
            messagesRef,
            where( 'clientId', '==', clientId ),
            orderBy( 'timestamp', 'desc' )
        );

        const snapshot = await getDocs( q );
        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting messages:', error );
        return [];
    }
};

// Mark message as read
export const markMessageAsRead = async ( messageId ) => {
    try {
        const messageRef = doc( db, 'messages', messageId );
        await updateDoc( messageRef, {
            read: true,
            readAt: new Date()
        } );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error marking message as read:', error );
        throw error;
    }
};

// Listen to real-time messages
export const listenToMessages = ( clientId, callback ) => {
    const messagesRef = collection( db, 'messages' );
    const q = query(
        messagesRef,
        where( 'clientId', '==', clientId ),
        orderBy( 'timestamp', 'desc' )
    );

    return onSnapshot( q, ( snapshot ) => {
        const messages = snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
        callback( messages );
    } );
};

// Get unread message count
export const getUnreadMessageCount = async ( clientId ) => {
    try {
        const messagesRef = collection( db, 'messages' );
        const q = query(
            messagesRef,
            where( 'clientId', '==', clientId ),
            where( 'read', '==', false )
        );

        const snapshot = await getDocs( q );
        return snapshot.size;
    } catch ( error ) {
        console.error( 'Error getting unread count:', error );
        return 0;
    }
};

// Send system notification
export const sendSystemNotification = async ( clientId, notification ) => {
    try {
        const systemNotification = {
            clientId,
            type: notification.type || 'info',
            title: notification.title,
            message: notification.message,
            read: false,
            createdAt: new Date()
        };

        const docRef = await addDoc( collection( db, 'system-notifications' ), systemNotification );
        return { id: docRef.id, ...systemNotification };
    } catch ( error ) {
        console.error( 'Error sending system notification:', error );
        throw error;
    }
};

// Get system notifications for a client
export const getSystemNotifications = async ( clientId ) => {
    try {
        const notificationsRef = collection( db, 'system-notifications' );
        const q = query(
            notificationsRef,
            where( 'clientId', '==', clientId ),
            orderBy( 'createdAt', 'desc' )
        );

        const snapshot = await getDocs( q );
        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting system notifications:', error );
        return [];
    }
};

// Mark system notification as read
export const markSystemNotificationAsRead = async ( notificationId ) => {
    try {
        const notificationRef = doc( db, 'system-notifications', notificationId );
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