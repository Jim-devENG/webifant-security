import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCalendar, FaFilter, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaEye } from "react-icons/fa";
import { getAllLeads, updateLeadStatus, assignLead, deleteLead, getLeadsByStatus } from "../firebase/leadService";

export default function LeadManagement() {
    const [leads, setLeads] = useState( [] );
    const [filteredLeads, setFilteredLeads] = useState( [] );
    const [selectedLead, setSelectedLead] = useState( null );
    const [isLoading, setIsLoading] = useState( true );
    const [statusFilter, setStatusFilter] = useState( "all" );
    const [showLeadModal, setShowLeadModal] = useState( false );
    const [showDeleteModal, setShowDeleteModal] = useState( false );
    const [leadToDelete, setLeadToDelete] = useState( null );

    const statusOptions = [
        { value: "all", label: "All Leads" },
        { value: "new", label: "New" },
        { value: "contacted", label: "Contacted" },
        { value: "qualified", label: "Qualified" },
        { value: "proposal", label: "Proposal Sent" },
        { value: "negotiation", label: "Negotiation" },
        { value: "converted", label: "Converted" },
        { value: "lost", label: "Lost" }
    ];

    useEffect( () => {
        loadLeads();
    }, [] );

    useEffect( () => {
        if ( statusFilter === "all" ) {
            setFilteredLeads( leads );
        } else {
            setFilteredLeads( leads.filter( lead => lead.status === statusFilter ) );
        }
    }, [leads, statusFilter] );

    const loadLeads = async () => {
        try {
            setIsLoading( true );
            const leadsData = await getAllLeads();
            setLeads( leadsData );
        } catch ( error ) {
            console.error( "Error loading leads:", error );
        } finally {
            setIsLoading( false );
        }
    };

    const handleStatusChange = async ( leadId, newStatus ) => {
        try {
            await updateLeadStatus( leadId, newStatus );
            await loadLeads(); // Reload leads
        } catch ( error ) {
            console.error( "Error updating lead status:", error );
        }
    };

    const handleDeleteLead = async () => {
        if ( !leadToDelete ) return;

        try {
            await deleteLead( leadToDelete.id );
            await loadLeads(); // Reload leads
            setShowDeleteModal( false );
            setLeadToDelete( null );
        } catch ( error ) {
            console.error( "Error deleting lead:", error );
        }
    };

    const getStatusColor = ( status ) => {
        const colors = {
            new: "bg-blue-500",
            contacted: "bg-yellow-500",
            qualified: "bg-green-500",
            proposal: "bg-purple-500",
            negotiation: "bg-orange-500",
            converted: "bg-green-600",
            lost: "bg-red-500"
        };
        return colors[status] || "bg-gray-500";
    };

    const formatDate = ( date ) => {
        return new Date( date ).toLocaleDateString();
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-cyan-400">Lead Management</h1>
                        <p className="text-gray-400">Manage your sales pipeline and customer prospects</p>
                    </div>
                    <button className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg hover:bg-cyan-300 transition flex items-center gap-2">
                        <FaPlus /> Add New Lead
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900 rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Total Leads</p>
                                <p className="text-2xl font-bold text-white">{leads.length}</p>
                            </div>
                            <div className="bg-blue-500/20 p-3 rounded-full">
                                <FaUser className="text-blue-400 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gray-900 rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">New Leads</p>
                                <p className="text-2xl font-bold text-white">
                                    {leads.filter( lead => lead.status === "new" ).length}
                                </p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <FaPlus className="text-green-400 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-900 rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Converted</p>
                                <p className="text-2xl font-bold text-white">
                                    {leads.filter( lead => lead.status === "converted" ).length}
                                </p>
                            </div>
                            <div className="bg-green-600/20 p-3 rounded-full">
                                <FaCheck className="text-green-500 text-xl" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-900 rounded-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">Conversion Rate</p>
                                <p className="text-2xl font-bold text-white">
                                    {leads.length > 0
                                        ? Math.round( ( leads.filter( lead => lead.status === "converted" ).length / leads.length ) * 100 )
                                        : 0}%
                                </p>
                            </div>
                            <div className="bg-purple-500/20 p-3 rounded-full">
                                <FaEye className="text-purple-400 text-xl" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="bg-gray-900 rounded-lg p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <FaFilter className="text-cyan-400" />
                        <select
                            value={statusFilter}
                            onChange={( e ) => setStatusFilter( e.target.value )}
                            className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-cyan-400 focus:outline-none"
                        >
                            {statusOptions.map( option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ) )}
                        </select>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Lead</th>
                                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Company</th>
                                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Created</th>
                                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map( ( lead, index ) => (
                                    <motion.tr
                                        key={lead.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="border-b border-gray-800 hover:bg-gray-800/50"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white font-semibold">{lead.name}</p>
                                                <p className="text-gray-400 text-sm">{lead.email}</p>
                                                {lead.phone && (
                                                    <p className="text-gray-400 text-sm">{lead.phone}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white">{lead.company}</p>
                                                {lead.industry && (
                                                    <p className="text-gray-400 text-sm">{lead.industry}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select
                                                value={lead.status}
                                                onChange={( e ) => handleStatusChange( lead.id, e.target.value )}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor( lead.status )} text-white border-0 focus:outline-none`}
                                            >
                                                {statusOptions.slice( 1 ).map( option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ) )}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {formatDate( lead.createdAt )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedLead( lead )}
                                                    className="text-cyan-400 hover:text-cyan-300 p-2"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setLeadToDelete( lead );
                                                        setShowDeleteModal( true );
                                                    }}
                                                    className="text-red-400 hover:text-red-300 p-2"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ) )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {filteredLeads.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-400">No leads found with the selected filter.</p>
                    </div>
                )}
            </div>

            {/* Lead Detail Modal */}
            {showLeadModal && selectedLead && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-cyan-400">Lead Details</h2>
                            <button
                                onClick={() => setShowLeadModal( false )}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-sm">Name</label>
                                <p className="text-white font-semibold">{selectedLead.name}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Email</label>
                                <p className="text-white">{selectedLead.email}</p>
                            </div>
                            {selectedLead.phone && (
                                <div>
                                    <label className="text-gray-400 text-sm">Phone</label>
                                    <p className="text-white">{selectedLead.phone}</p>
                                </div>
                            )}
                            <div>
                                <label className="text-gray-400 text-sm">Company</label>
                                <p className="text-white">{selectedLead.company}</p>
                            </div>
                            {selectedLead.industry && (
                                <div>
                                    <label className="text-gray-400 text-sm">Industry</label>
                                    <p className="text-white">{selectedLead.industry}</p>
                                </div>
                            )}
                            <div>
                                <label className="text-gray-400 text-sm">Status</label>
                                <p className="text-white">{selectedLead.status}</p>
                            </div>
                            <div>
                                <label className="text-gray-400 text-sm">Created</label>
                                <p className="text-white">{formatDate( selectedLead.createdAt )}</p>
                            </div>
                            {selectedLead.notes && (
                                <div>
                                    <label className="text-gray-400 text-sm">Notes</label>
                                    <p className="text-white">{selectedLead.notes}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
                    >
                        <h3 className="text-xl font-bold text-white mb-4">Delete Lead</h3>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete this lead? This action cannot be undone.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={handleDeleteLead}
                                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteModal( false )}
                                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
} 