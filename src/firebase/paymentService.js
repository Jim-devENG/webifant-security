import { db } from './config';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

// Payment service for handling referrer rewards and payouts
export const paymentService = {
    // Create a new payment record
    async createPayment( paymentData ) {
        try {
            const payment = {
                ...paymentData,
                createdAt: serverTimestamp(),
                status: 'pending',
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc( collection( db, 'payments' ), payment );
            return { id: docRef.id, ...payment };
        } catch ( error ) {
            console.error( 'Error creating payment:', error );
            throw new Error( 'Failed to create payment record' );
        }
    },

    // Get all payments for a referrer
    async getReferrerPayments( referrerId ) {
        try {
            const q = query(
                collection( db, 'payments' ),
                where( 'referrerId', '==', referrerId ),
                orderBy( 'createdAt', 'desc' )
            );

            const snapshot = await getDocs( q );
            return snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );
        } catch ( error ) {
            console.error( 'Error fetching referrer payments:', error );
            throw new Error( 'Failed to fetch payments' );
        }
    },

    // Update payment status
    async updatePaymentStatus( paymentId, status, transactionId = null ) {
        try {
            const paymentRef = doc( db, 'payments', paymentId );
            await updateDoc( paymentRef, {
                status,
                transactionId,
                updatedAt: serverTimestamp()
            } );

            return { success: true };
        } catch ( error ) {
            console.error( 'Error updating payment status:', error );
            throw new Error( 'Failed to update payment status' );
        }
    },

    // Get payment statistics
    async getPaymentStats( referrerId ) {
        try {
            const payments = await this.getReferrerPayments( referrerId );

            const stats = {
                totalEarned: 0,
                totalPaid: 0,
                pendingAmount: 0,
                paymentCount: payments.length,
                lastPayment: null
            };

            payments.forEach( payment => {
                stats.totalEarned += payment.amount || 0;

                if ( payment.status === 'paid' ) {
                    stats.totalPaid += payment.amount || 0;
                } else if ( payment.status === 'pending' ) {
                    stats.pendingAmount += payment.amount || 0;
                }

                if ( payment.status === 'paid' && ( !stats.lastPayment || payment.updatedAt > stats.lastPayment.updatedAt ) ) {
                    stats.lastPayment = payment;
                }
            } );

            return stats;
        } catch ( error ) {
            console.error( 'Error calculating payment stats:', error );
            throw new Error( 'Failed to calculate payment statistics' );
        }
    },

    // Request payout (this would integrate with Stripe/PayPal)
    async requestPayout( referrerId, amount ) {
        try {
            // This is where you'd integrate with Stripe or PayPal
            // For now, we'll just create a payout record
            const payout = {
                referrerId,
                amount,
                status: 'pending',
                paymentMethod: 'stripe', // or 'paypal', 'bank_transfer'
                requestedAt: serverTimestamp(),
                estimatedDelivery: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ), // 3 days
                notes: 'Payout requested via Stripe'
            };

            const docRef = await addDoc( collection( db, 'payouts' ), payout );
            return { id: docRef.id, ...payout };
        } catch ( error ) {
            console.error( 'Error requesting payout:', error );
            throw new Error( 'Failed to request payout' );
        }
    },

    // Get payout history
    async getPayoutHistory( referrerId ) {
        try {
            const q = query(
                collection( db, 'payouts' ),
                where( 'referrerId', '==', referrerId ),
                orderBy( 'requestedAt', 'desc' )
            );

            const snapshot = await getDocs( q );
            return snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );
        } catch ( error ) {
            console.error( 'Error fetching payout history:', error );
            throw new Error( 'Failed to fetch payout history' );
        }
    }
};

// Commission rates for different services
export const commissionRates = {
    consulting: 0.15, // 15% commission
    assessment: 0.12, // 12% commission
    forensics: 0.10,  // 10% commission
    training: 0.08,   // 8% commission
    compliance: 0.12, // 12% commission
    default: 0.10     // 10% default commission
};

// Calculate commission for a service
export const calculateCommission = ( serviceAmount, serviceType ) => {
    const rate = commissionRates[serviceType] || commissionRates.default;
    return serviceAmount * rate;
};

// Minimum payout threshold
export const MINIMUM_PAYOUT_AMOUNT = 50; // $50 minimum payout 