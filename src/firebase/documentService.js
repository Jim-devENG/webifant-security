import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// Upload document
export const uploadDocument = async ( clientId, file, category, description = '' ) => {
    try {
        // Create unique filename
        const timestamp = new Date().getTime();
        const fileName = `${timestamp}_${file.name}`;
        const storageRef = ref( storage, `clients/${clientId}/documents/${category}/${fileName}` );

        // Upload file to Firebase Storage
        const snapshot = await uploadBytes( storageRef, file );
        const downloadURL = await getDownloadURL( snapshot.ref );

        // Save document metadata to Firestore
        const documentData = {
            clientId,
            fileName: file.name,
            originalName: file.name,
            fileType: file.type,
            fileSize: file.size,
            category,
            description,
            downloadURL,
            storagePath: `clients/${clientId}/documents/${category}/${fileName}`,
            uploadedAt: new Date(),
            updatedAt: new Date()
        };

        const docRef = await addDoc( collection( db, 'documents' ), documentData );
        return { id: docRef.id, ...documentData };
    } catch ( error ) {
        console.error( 'Error uploading document:', error );
        throw error;
    }
};

// Get client documents
export const getClientDocuments = async ( clientId, category = null ) => {
    try {
        const documentsRef = collection( db, 'documents' );
        let q;

        if ( category ) {
            q = query(
                documentsRef,
                where( 'clientId', '==', clientId ),
                where( 'category', '==', category ),
                orderBy( 'uploadedAt', 'desc' )
            );
        } else {
            q = query(
                documentsRef,
                where( 'clientId', '==', clientId ),
                orderBy( 'uploadedAt', 'desc' )
            );
        }

        const snapshot = await getDocs( q );
        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting client documents:', error );
        return [];
    }
};

// Get document by ID
export const getDocumentById = async ( documentId ) => {
    try {
        const documentDoc = await getDoc( doc( db, 'documents', documentId ) );
        if ( documentDoc.exists() ) {
            return { id: documentDoc.id, ...documentDoc.data() };
        }
        return null;
    } catch ( error ) {
        console.error( 'Error getting document:', error );
        return null;
    }
};

// Update document metadata
export const updateDocument = async ( documentId, updates ) => {
    try {
        const documentRef = doc( db, 'documents', documentId );
        await updateDoc( documentRef, {
            ...updates,
            updatedAt: new Date()
        } );
        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating document:', error );
        throw error;
    }
};

// Delete document
export const deleteDocument = async ( documentId ) => {
    try {
        // Get document data first
        const document = await getDocumentById( documentId );
        if ( !document ) {
            throw new Error( 'Document not found' );
        }

        // Delete from Firebase Storage
        const storageRef = ref( storage, document.storagePath );
        await deleteObject( storageRef );

        // Delete from Firestore
        await deleteDoc( doc( db, 'documents', documentId ) );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error deleting document:', error );
        throw error;
    }
};

// Get document categories
export const getDocumentCategories = () => {
    return [
        'Security Assessment',
        'Vulnerability Scan',
        'Penetration Testing',
        'Compliance Report',
        'Incident Report',
        'Training Material',
        'Policy Document',
        'Certificate',
        'Other'
    ];
};

// Get documents by category
export const getDocumentsByCategory = async ( clientId, category ) => {
    try {
        const documentsRef = collection( db, 'documents' );
        const q = query(
            documentsRef,
            where( 'clientId', '==', clientId ),
            where( 'category', '==', category ),
            orderBy( 'uploadedAt', 'desc' )
        );

        const snapshot = await getDocs( q );
        return snapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) );
    } catch ( error ) {
        console.error( 'Error getting documents by category:', error );
        return [];
    }
};

// Download document
export const downloadDocument = async ( documentId ) => {
    try {
        const document = await getDocumentById( documentId );
        if ( !document ) {
            throw new Error( 'Document not found' );
        }

        // Create a temporary link for download
        const link = document.createElement( 'a' );
        link.href = document.downloadURL;
        link.download = document.originalName;
        document.body.appendChild( link );
        link.click();
        document.body.removeChild( link );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error downloading document:', error );
        throw error;
    }
};

// Get document statistics
export const getDocumentStats = async ( clientId ) => {
    try {
        const documents = await getClientDocuments( clientId );

        const stats = {
            totalDocuments: documents.length,
            totalSize: documents.reduce( ( sum, doc ) => sum + ( doc.fileSize || 0 ), 0 ),
            categories: {},
            recentUploads: documents.slice( 0, 5 )
        };

        // Count documents by category
        documents.forEach( doc => {
            if ( !stats.categories[doc.category] ) {
                stats.categories[doc.category] = 0;
            }
            stats.categories[doc.category]++;
        } );

        return stats;
    } catch ( error ) {
        console.error( 'Error getting document stats:', error );
        return {
            totalDocuments: 0,
            totalSize: 0,
            categories: {},
            recentUploads: []
        };
    }
}; 