import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from './config';

const COLLECTION_NAME = 'blog-posts';

// Get all blog posts
export const getAllPosts = async () => {
    try {
        const q = query( collection( db, COLLECTION_NAME ), orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const posts = [];
        querySnapshot.forEach( ( doc ) => {
            posts.push( {
                id: doc.id,
                slug: doc.data().slug,
                frontmatter: {
                    title: doc.data().title,
                    excerpt: doc.data().excerpt,
                    date: doc.data().date,
                    image: doc.data().image,
                    author: doc.data().author,
                    tags: doc.data().tags || []
                },
                content: doc.data().content
            } );
        } );

        return posts;
    } catch ( error ) {
        console.error( 'Error getting posts:', error );
        return [];
    }
};

// Get a single blog post by slug
export const getPostBySlug = async ( slug ) => {
    try {
        const q = query( collection( db, COLLECTION_NAME ) );
        const querySnapshot = await getDocs( q );

        let post = null;
        querySnapshot.forEach( ( doc ) => {
            if ( doc.data().slug === slug ) {
                post = {
                    id: doc.id,
                    slug: doc.data().slug,
                    frontmatter: {
                        title: doc.data().title,
                        excerpt: doc.data().excerpt,
                        date: doc.data().date,
                        image: doc.data().image,
                        author: doc.data().author,
                        tags: doc.data().tags || []
                    },
                    content: doc.data().content
                };
            }
        } );

        return post;
    } catch ( error ) {
        console.error( 'Error getting post:', error );
        return null;
    }
};

// Create a new blog post
export const createPost = async ( postData ) => {
    try {
        const docRef = await addDoc( collection( db, COLLECTION_NAME ), {
            ...postData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        } );

        return { id: docRef.id, ...postData };
    } catch ( error ) {
        console.error( 'Error creating post:', error );
        throw error;
    }
};

// Update an existing blog post
export const updatePost = async ( postId, postData ) => {
    try {
        const postRef = doc( db, COLLECTION_NAME, postId );
        await updateDoc( postRef, {
            ...postData,
            updatedAt: serverTimestamp()
        } );

        return { id: postId, ...postData };
    } catch ( error ) {
        console.error( 'Error updating post:', error );
        throw error;
    }
};

// Delete a blog post
export const deletePost = async ( postId ) => {
    try {
        await deleteDoc( doc( db, COLLECTION_NAME, postId ) );
        return true;
    } catch ( error ) {
        console.error( 'Error deleting post:', error );
        throw error;
    }
};

// Generate a unique slug from title
export const generateSlug = ( title ) => {
    return title
        .toLowerCase()
        .replace( /[^a-z0-9 -]/g, '' )
        .replace( /\s+/g, '-' )
        .replace( /-+/g, '-' )
        .trim( '-' );
}; 