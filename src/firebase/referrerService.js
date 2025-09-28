import { db } from './config';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    query,
    where,
    orderBy,
    limit,
    increment,
    serverTimestamp,
    deleteDoc,
    onSnapshot
} from 'firebase/firestore';

// Generate unique referrer code
const generateReferrerCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for ( let i = 0;i < 8;i++ ) {
        result += chars.charAt( Math.floor( Math.random() * chars.length ) );
    }
    return result;
};

// Create a new referrer
export const createReferrer = async ( referrerData ) => {
    try {
        const referrersRef = collection( db, 'referrers' );

        // Generate unique referrer code
        let referrerCode;
        let isUnique = false;
        let attempts = 0;

        while ( !isUnique && attempts < 10 ) {
            referrerCode = generateReferrerCode();
            const existingRef = query( referrersRef, where( 'referrerCode', '==', referrerCode ) );
            const existingDocs = await getDocs( existingRef );

            if ( existingDocs.empty ) {
                isUnique = true;
            }
            attempts++;
        }

        if ( !isUnique ) {
            throw new Error( 'Unable to generate unique referrer code' );
        }

        const newReferrer = {
            ...referrerData,
            referrerCode,
            totalReferrals: 0,
            successfulReferrals: 0,
            totalEarnings: 0,
            status: 'active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc( referrersRef, newReferrer );

        return {
            id: docRef.id,
            ...newReferrer
        };
    } catch ( error ) {
        console.error( 'Error creating referrer:', error );
        throw error;
    }
};

// Get referrer by ID
export const getReferrerById = async ( referrerId ) => {
    try {
        console.log( 'getReferrerById called with ID:', referrerId ); // Debug log
        const referrerRef = doc( db, 'referrers', referrerId );
        console.log( 'Referrer ref created:', referrerRef ); // Debug log

        const referrerDoc = await getDoc( referrerRef );
        console.log( 'Referrer doc fetched:', referrerDoc ); // Debug log
        console.log( 'Referrer doc exists:', referrerDoc.exists() ); // Debug log

        if ( referrerDoc.exists() ) {
            const data = {
                id: referrerDoc.id,
                ...referrerDoc.data()
            };
            console.log( 'Returning referrer data:', data ); // Debug log
            return data;
        } else {
            console.log( 'Referrer doc does not exist' ); // Debug log
            throw new Error( 'Referrer not found' );
        }
    } catch ( error ) {
        console.error( 'Error fetching referrer:', error );
        throw error;
    }
};

// Get referrer by code
export const getReferrerByCode = async ( referrerCode ) => {
    try {
        const referrersRef = collection( db, 'referrers' );
        const q = query( referrersRef, where( 'referrerCode', '==', referrerCode ) );
        const querySnapshot = await getDocs( q );

        if ( !querySnapshot.empty ) {
            const doc = querySnapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data()
            };
        } else {
            return null;
        }
    } catch ( error ) {
        console.error( 'Error fetching referrer by code:', error );
        throw error;
    }
};

// Get all referrers (for admin)
export const getAllReferrers = async () => {
    try {
        const referrersRef = collection( db, 'referrers' );
        const q = query( referrersRef, orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const referrers = [];
        querySnapshot.forEach( ( doc ) => {
            referrers.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return referrers;
    } catch ( error ) {
        console.error( 'Error fetching all referrers:', error );
        throw error;
    }
};

// Create a new referral
export const createReferral = async ( referralData ) => {
    try {
        const referralsRef = collection( db, 'referrals' );

        const newReferral = {
            ...referralData,
            status: 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc( referralsRef, newReferral );

        // Update referrer stats
        await updateReferrerStats( referralData.referrerId, 'totalReferrals' );

        return {
            id: docRef.id,
            ...newReferral
        };
    } catch ( error ) {
        console.error( 'Error creating referral:', error );
        throw error;
    }
};

// Update referral status
export const updateReferralStatus = async ( referralId, status, additionalData = {} ) => {
    try {
        const referralRef = doc( db, 'referrals', referralId );
        const referralDoc = await getDoc( referralRef );

        if ( !referralDoc.exists() ) {
            throw new Error( 'Referral not found' );
        }

        const referralData = referralDoc.data();

        await updateDoc( referralRef, {
            status,
            ...additionalData,
            updatedAt: serverTimestamp()
        } );

        // If referral is successful, update referrer stats
        if ( status === 'successful' ) {
            await updateReferrerStats( referralData.referrerId, 'successfulReferrals' );

            // Calculate and add reward
            const reward = calculateReferralReward( referralData );
            await addReferrerReward( referralData.referrerId, referralId, reward );
        }

        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating referral status:', error );
        throw error;
    }
};

// Get referrals by referrer ID
export const getReferralsByReferrerId = async ( referrerId ) => {
    try {
        const referralsRef = collection( db, 'referrals' );
        const q = query( referralsRef, where( 'referrerId', '==', referrerId ), orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const referrals = [];
        querySnapshot.forEach( ( doc ) => {
            referrals.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return referrals;
    } catch ( error ) {
        console.error( 'Error fetching referrals:', error );
        throw error;
    }
};

// Get all referrals (for admin)
export const getAllReferrals = async () => {
    try {
        const referralsRef = collection( db, 'referrals' );
        const q = query( referralsRef, orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const referrals = [];
        querySnapshot.forEach( ( doc ) => {
            referrals.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return referrals;
    } catch ( error ) {
        console.error( 'Error fetching all referrals:', error );
        throw error;
    }
};

// Update referrer statistics
const updateReferrerStats = async ( referrerId, statType ) => {
    try {
        const referrerRef = doc( db, 'referrers', referrerId );
        await updateDoc( referrerRef, {
            [statType]: increment( 1 ),
            updatedAt: serverTimestamp()
        } );
    } catch ( error ) {
        console.error( 'Error updating referrer stats:', error );
        throw error;
    }
};

// Calculate referral reward
const calculateReferralReward = ( referralData ) => {
    // Base reward structure - can be customized based on business rules
    const baseReward = 50; // $50 base reward
    const serviceTypeMultiplier = {
        'consulting': 1.5,
        'assessment': 1.2,
        'forensics': 2.0,
        'training': 1.0,
        'compliance': 1.8
    };

    const multiplier = serviceTypeMultiplier[referralData.serviceType] || 1.0;
    return Math.round( baseReward * multiplier );
};

// Add reward to referrer
const addReferrerReward = async ( referrerId, referralId, amount ) => {
    try {
        const rewardsRef = collection( db, 'referrer-rewards' );

        const newReward = {
            referrerId,
            referralId,
            amount,
            status: 'pending',
            createdAt: serverTimestamp()
        };

        await addDoc( rewardsRef, newReward );

        // Update referrer total earnings
        const referrerRef = doc( db, 'referrers', referrerId );
        await updateDoc( referrerRef, {
            totalEarnings: increment( amount ),
            updatedAt: serverTimestamp()
        } );
    } catch ( error ) {
        console.error( 'Error adding referrer reward:', error );
        throw error;
    }
};

// Get referrer rewards
export const getReferrerRewards = async ( referrerId ) => {
    try {
        const rewardsRef = collection( db, 'referrer-rewards' );
        const q = query( rewardsRef, where( 'referrerId', '==', referrerId ), orderBy( 'createdAt', 'desc' ) );
        const querySnapshot = await getDocs( q );

        const rewards = [];
        querySnapshot.forEach( ( doc ) => {
            rewards.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        return rewards;
    } catch ( error ) {
        console.error( 'Error fetching referrer rewards:', error );
        throw error;
    }
};

// Update reward status
export const updateRewardStatus = async ( rewardId, status ) => {
    try {
        const rewardRef = doc( db, 'referrer-rewards', rewardId );
        await updateDoc( rewardRef, {
            status,
            updatedAt: serverTimestamp()
        } );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating reward status:', error );
        throw error;
    }
};

// Get referrer analytics
export const getReferrerAnalytics = async ( referrerId, timeRange = '30d' ) => {
    try {
        const referralsRef = collection( db, 'referrals' );
        const q = query(
            referralsRef,
            where( 'referrerId', '==', referrerId ),
            orderBy( 'createdAt', 'desc' )
        );
        const querySnapshot = await getDocs( q );

        const referrals = [];
        querySnapshot.forEach( ( doc ) => {
            referrals.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        // Calculate analytics
        const totalReferrals = referrals.length;
        const successfulReferrals = referrals.filter( r => r.status === 'successful' ).length;
        const conversionRate = totalReferrals > 0 ? ( successfulReferrals / totalReferrals ) * 100 : 0;

        // Filter by time range
        const now = new Date();
        const timeRangeMs = {
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000,
            '90d': 90 * 24 * 60 * 60 * 1000
        };

        const filteredReferrals = referrals.filter( referral => {
            const referralDate = referral.createdAt?.toDate() || new Date( referral.createdAt );
            return ( now - referralDate ) <= timeRangeMs[timeRange];
        } );

        return {
            totalReferrals,
            successfulReferrals,
            conversionRate: Math.round( conversionRate * 100 ) / 100,
            recentReferrals: filteredReferrals.length,
            referrals: referrals
        };
    } catch ( error ) {
        console.error( 'Error fetching referrer analytics:', error );
        throw error;
    }
};

// Get overall referrer system analytics (for admin)
export const getSystemAnalytics = async () => {
    try {
        const [referrers, referrals, rewards] = await Promise.all( [
            getAllReferrers(),
            getAllReferrals(),
            getDocs( collection( db, 'referrer-rewards' ) )
        ] );

        const totalReferrers = referrers.length;
        const totalReferrals = referrals.length;
        const successfulReferrals = referrals.filter( r => r.status === 'successful' ).length;
        const totalRewards = rewards.docs.reduce( ( sum, doc ) => {
            const data = doc.data();
            return sum + ( data.amount || 0 );
        }, 0 );

        return {
            totalReferrers,
            totalReferrals,
            successfulReferrals,
            conversionRate: totalReferrals > 0 ? ( successfulReferrals / totalReferrals ) * 100 : 0,
            totalRewards,
            averageReward: totalReferrals > 0 ? totalRewards / totalReferrals : 0
        };
    } catch ( error ) {
        console.error( 'Error fetching system analytics:', error );
        throw error;
    }
};

// Delete referrer (admin only)
export const deleteReferrer = async ( referrerId ) => {
    try {
        const referrerRef = doc( db, 'referrers', referrerId );
        await deleteDoc( referrerRef );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error deleting referrer:', error );
        throw error;
    }
};

// Update referrer status
export const updateReferrerStatus = async ( referrerId, status ) => {
    try {
        const referrerRef = doc( db, 'referrers', referrerId );
        await updateDoc( referrerRef, {
            status,
            updatedAt: serverTimestamp()
        } );

        return { success: true };
    } catch ( error ) {
        console.error( 'Error updating referrer status:', error );
        throw error;
    }
};

// Real-time listeners
export const subscribeToReferrer = ( referrerId, callback ) => {
    const referrerRef = doc( db, 'referrers', referrerId );
    return onSnapshot( referrerRef, ( doc ) => {
        if ( doc.exists() ) {
            const data = {
                id: doc.id,
                ...doc.data()
            };
            callback( data );
        } else {
            callback( null );
        }
    }, ( error ) => {
        console.error( 'Error listening to referrer:', error );
        callback( null );
    } );
};

export const subscribeToReferrals = ( referrerId, callback ) => {
    const referralsRef = collection( db, 'referrals' );
    const q = query(
        referralsRef,
        where( 'referrerId', '==', referrerId ),
        orderBy( 'createdAt', 'desc' )
    );

    return onSnapshot( q, ( querySnapshot ) => {
        const referrals = [];
        querySnapshot.forEach( ( doc ) => {
            referrals.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );
        callback( referrals );
    }, ( error ) => {
        console.error( 'Error listening to referrals:', error );
        callback( [] );
    } );
};

export const subscribeToRewards = ( referrerId, callback ) => {
    const rewardsRef = collection( db, 'referrer-rewards' );
    const q = query(
        rewardsRef,
        where( 'referrerId', '==', referrerId ),
        orderBy( 'createdAt', 'desc' )
    );

    return onSnapshot( q, ( querySnapshot ) => {
        const rewards = [];
        querySnapshot.forEach( ( doc ) => {
            rewards.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );
        callback( rewards );
    }, ( error ) => {
        console.error( 'Error listening to rewards:', error );
        callback( [] );
    } );
};

export const subscribeToAnalytics = ( referrerId, timeRange = '30d', callback ) => {
    const referralsRef = collection( db, 'referrals' );
    const q = query(
        referralsRef,
        where( 'referrerId', '==', referrerId ),
        orderBy( 'createdAt', 'desc' )
    );

    return onSnapshot( q, ( querySnapshot ) => {
        const referrals = [];
        querySnapshot.forEach( ( doc ) => {
            referrals.push( {
                id: doc.id,
                ...doc.data()
            } );
        } );

        // Calculate analytics
        const totalReferrals = referrals.length;
        const successfulReferrals = referrals.filter( r => r.status === 'successful' ).length;
        const conversionRate = totalReferrals > 0 ? ( successfulReferrals / totalReferrals ) * 100 : 0;

        // Filter by time range
        const now = new Date();
        const timeRangeMs = {
            '7d': 7 * 24 * 60 * 60 * 1000,
            '30d': 30 * 24 * 60 * 60 * 1000,
            '90d': 90 * 24 * 60 * 60 * 1000
        };

        const filteredReferrals = referrals.filter( referral => {
            const referralDate = referral.createdAt?.toDate() || new Date( referral.createdAt );
            return ( now - referralDate ) <= timeRangeMs[timeRange];
        } );

        const analytics = {
            totalReferrals,
            successfulReferrals,
            conversionRate: Math.round( conversionRate * 100 ) / 100,
            recentReferrals: filteredReferrals.length,
            referrals: referrals
        };

        callback( analytics );
    }, ( error ) => {
        console.error( 'Error listening to analytics:', error );
        callback( {
            totalReferrals: 0,
            successfulReferrals: 0,
            conversionRate: 0,
            recentReferrals: 0,
            referrals: []
        } );
    } );
}; 