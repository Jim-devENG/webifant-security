import React, { useState, useEffect } from 'react';
import { FaDollarSign, FaCreditCard, FaHistory, FaDownload, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { paymentService, calculateCommission, MINIMUM_PAYOUT_AMOUNT } from '../firebase/paymentService';

const PaymentDashboard = ( { referrerId } ) => {
    const [payments, setPayments] = useState( [] );
    const [payouts, setPayouts] = useState( [] );
    const [stats, setStats] = useState( {
        totalEarned: 0,
        totalPaid: 0,
        pendingAmount: 0,
        paymentCount: 0,
        lastPayment: null
    } );
    const [isLoading, setIsLoading] = useState( true );
    const [payoutAmount, setPayoutAmount] = useState( '' );
    const [isRequestingPayout, setIsRequestingPayout] = useState( false );

    useEffect( () => {
        if ( referrerId ) {
            loadPaymentData();
        }
    }, [referrerId] );

    const loadPaymentData = async () => {
        try {
            setIsLoading( true );

            // Load payments, payouts, and stats in parallel
            const [paymentsData, payoutsData, statsData] = await Promise.all( [
                paymentService.getReferrerPayments( referrerId ),
                paymentService.getPayoutHistory( referrerId ),
                paymentService.getPaymentStats( referrerId )
            ] );

            setPayments( paymentsData );
            setPayouts( payoutsData );
            setStats( statsData );
        } catch ( error ) {
            console.error( 'Error loading payment data:', error );
        } finally {
            setIsLoading( false );
        }
    };

    const handlePayoutRequest = async () => {
        if ( !payoutAmount || parseFloat( payoutAmount ) < MINIMUM_PAYOUT_AMOUNT ) {
            alert( `Minimum payout amount is $${MINIMUM_PAYOUT_AMOUNT}` );
            return;
        }

        if ( parseFloat( payoutAmount ) > stats.pendingAmount ) {
            alert( 'Payout amount cannot exceed pending amount' );
            return;
        }

        try {
            setIsRequestingPayout( true );
            await paymentService.requestPayout( referrerId, parseFloat( payoutAmount ) );
            setPayoutAmount( '' );
            await loadPaymentData(); // Refresh data
            alert( 'Payout request submitted successfully!' );
        } catch ( error ) {
            console.error( 'Error requesting payout:', error );
            alert( 'Failed to request payout. Please try again.' );
        } finally {
            setIsRequestingPayout( false );
        }
    };

    const formatCurrency = ( amount ) => {
        return new Intl.NumberFormat( 'en-US', {
            style: 'currency',
            currency: 'USD'
        } ).format( amount );
    };

    const formatDate = ( timestamp ) => {
        if ( !timestamp ) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date( timestamp );
        return date.toLocaleDateString();
    };

    const getStatusIcon = ( status ) => {
        switch ( status ) {
            case 'paid':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaClock className="text-yellow-500" />;
            case 'failed':
                return <FaExclamationTriangle className="text-red-500" />;
            default:
                return <FaClock className="text-gray-500" />;
        }
    };

    if ( isLoading ) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Payment Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center">
                        <FaDollarSign className="text-green-500 text-2xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Total Earned</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency( stats.totalEarned )}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center">
                        <FaCreditCard className="text-blue-500 text-2xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Total Paid</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency( stats.totalPaid )}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center">
                        <FaClock className="text-yellow-500 text-2xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-2xl font-bold text-gray-900">{formatCurrency( stats.pendingAmount )}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <div className="flex items-center">
                        <FaHistory className="text-purple-500 text-2xl mr-3" />
                        <div>
                            <p className="text-sm text-gray-600">Payments</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.paymentCount}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payout Request */}
            {stats.pendingAmount >= MINIMUM_PAYOUT_AMOUNT && (
                <div className="bg-white rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Payout</h3>
                    <div className="flex items-end space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Amount (Min: ${MINIMUM_PAYOUT_AMOUNT})
                            </label>
                            <input
                                type="number"
                                value={payoutAmount}
                                onChange={( e ) => setPayoutAmount( e.target.value )}
                                placeholder={`Enter amount (max: ${formatCurrency( stats.pendingAmount )})`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                min={MINIMUM_PAYOUT_AMOUNT}
                                max={stats.pendingAmount}
                                step="0.01"
                            />
                        </div>
                        <button
                            onClick={handlePayoutRequest}
                            disabled={isRequestingPayout || !payoutAmount}
                            className="bg-cyan-400 text-white px-6 py-2 rounded-md hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isRequestingPayout ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaDownload className="mr-2" />
                                    Request Payout
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Recent Payments */}
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.slice( 0, 10 ).map( ( payment ) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate( payment.createdAt )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {formatCurrency( payment.amount )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {payment.serviceType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {getStatusIcon( payment.status )}
                                            <span className="ml-2 text-sm text-gray-900 capitalize">
                                                {payment.status}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ) )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payout History */}
            {payouts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Payout History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Requested
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Estimated Delivery
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {payouts.map( ( payout ) => (
                                    <tr key={payout.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatDate( payout.requestedAt )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {formatCurrency( payout.amount )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                                            {payout.paymentMethod.replace( '_', ' ' )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {getStatusIcon( payout.status )}
                                                <span className="ml-2 text-sm text-gray-900 capitalize">
                                                    {payout.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate( payout.estimatedDelivery )}
                                        </td>
                                    </tr>
                                ) )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentDashboard; 