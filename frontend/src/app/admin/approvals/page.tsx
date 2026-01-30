'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import researchApprovalsService, { ResearchRequest } from '@/services/research-approvals.service';
import { CheckCircle, XCircle, FileText, Calendar, User, Search } from 'lucide-react';

export default function ResearchApprovalsPage() {
    const { user, isAuthenticated, isLoading } = useAuth();
    const [requests, setRequests] = useState<ResearchRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Selection
    const [selectedRequest, setSelectedRequest] = useState<ResearchRequest | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    // Processing state
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        if (isAuthenticated) {
            fetchPendingRequests();
        }
    }, [isAuthenticated, isLoading]);

    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            const data = await researchApprovalsService.getPendingRequests();
            setRequests(data);
        } catch (err) {
            console.error('Failed to fetch pending requests:', err);
            setError('Gagal memuat daftar permintaan penelitian.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (request: ResearchRequest) => {
        if (!confirm(`Setujui permintaan penelitian "${request.title}"? Peneliti akan mendapatkan akses ke statistik yang diminta.`)) {
            return;
        }

        try {
            setProcessingId(request.id);
            await researchApprovalsService.approveRequest(request.id);
            alert('Permintaan berhasil disetujui.');
            setIsDetailsOpen(false);
            fetchPendingRequests();
        } catch (err: any) {
            console.error('Failed to approve request:', err);
            alert(err.response?.data?.message || 'Gagal menyetujui permintaan.');
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async () => {
        if (!selectedRequest || !rejectionReason.trim()) return;

        try {
            setProcessingId(selectedRequest.id);
            await researchApprovalsService.rejectRequest(selectedRequest.id, rejectionReason);
            alert('Permintaan berhasil ditolak.');
            setIsRejectOpen(false);
            setIsDetailsOpen(false);
            setRejectionReason('');
            fetchPendingRequests();
        } catch (err: any) {
            console.error('Failed to reject request:', err);
            alert(err.response?.data?.message || 'Gagal menolak permintaan.');
        } finally {
            setProcessingId(null);
        }
    };

    const openRejectModal = (request: ResearchRequest) => {
        setSelectedRequest(request);
        setIsRejectOpen(true);
    };

    const openDetails = (request: ResearchRequest) => {
        setSelectedRequest(request);
        setIsDetailsOpen(true);
    };

    if (isLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Persetujuan Penelitian</h1>
                <p className="text-gray-600 mt-1">Review dan kelola permintaan data penelitian dari pengguna.</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-lg shadow border overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Tidak ada permintaan menunggu</h3>
                        <p>Semua permintaan penelitian telah diproses.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Penelitian</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peneliti</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Submit</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Pasien</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{req.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{req.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 text-gray-400 mr-2" />
                                                <div className="text-sm text-gray-900">{req.requesterName}</div>
                                            </div>
                                            <div className="text-xs text-gray-500 ml-6">{req.requesterEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                {new Date(req.submittedAt).toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{req.patientCount ? req.patientCount.toLocaleString() : '-'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => openDetails(req)}
                                                className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
                                            >
                                                Detail
                                            </button>
                                            <button
                                                onClick={() => handleApprove(req)}
                                                disabled={processingId === req.id}
                                                className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-white flex items-center inline-flex"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Setuju
                                            </button>
                                            <button
                                                onClick={() => openRejectModal(req)}
                                                disabled={processingId === req.id}
                                                className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-white flex items-center inline-flex"
                                            >
                                                <XCircle className="h-4 w-4 mr-1" />
                                                Tolak
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {isDetailsOpen && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
                        <div className="p-6 border-b">
                            <h3 className="text-xl font-bold text-gray-900">Detail Permintaan Penelitian</h3>
                            <p className="text-sm text-gray-500">ID: {selectedRequest.id}</p>
                        </div>

                        <div className="p-6 space-y-6 overflow-y-auto flex-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">Judul</h4>
                                    <p className="text-gray-900">{selectedRequest.title}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-500">IRB / No. Ethics</h4>
                                    <p className="text-gray-900">{selectedRequest.irbNumber || '-'}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-500">Deskripsi</h4>
                                <p className="text-gray-900 text-sm whitespace-pre-wrap">{selectedRequest.description}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Filter Data Yang Diminta</h4>
                                <pre className="text-xs text-gray-600 overflow-x-auto">
                                    {JSON.stringify(selectedRequest.filters, null, 2)}
                                </pre>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-500">Justifikasi Ilmiah</h4>
                                <p className="text-gray-900 text-sm">{selectedRequest.justification || 'Tidak ada justifikasi disertakan.'}</p>
                            </div>

                            <div className="border-t pt-4 flex justify-between items-center">
                                <div className="text-sm text-gray-500">
                                    Diajukan oleh: <span className="font-semibold text-gray-900">{selectedRequest.requesterName}</span> ({selectedRequest.requesterEmail})
                                </div>
                                <div className="text-sm text-gray-500">
                                    Tanggal: {new Date(selectedRequest.submittedAt).toLocaleDateString('id-ID', { dateStyle: 'full' })}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t flex justify-end space-x-2 bg-gray-50">
                            <button
                                onClick={() => setIsDetailsOpen(false)}
                                className="px-4 py-2 border bg-white rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Tutup
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedRequest) {
                                        openRejectModal(selectedRequest);
                                    }
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Tolak
                            </button>
                            <button
                                onClick={() => {
                                    if (selectedRequest) {
                                        handleApprove(selectedRequest);
                                    }
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                            >
                                Setujui Permintaan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reject Modal */}
            {isRejectOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-lg">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-bold text-gray-900">Tolak Permintaan</h3>
                            <p className="text-sm text-gray-500">
                                Mohon berikan alasan penolakan untuk peneliti.
                            </p>
                        </div>
                        <div className="p-6">
                            <textarea
                                placeholder="Alasan penolakan..."
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>
                        <div className="p-6 border-t flex justify-end space-x-2 bg-gray-50">
                            <button
                                onClick={() => setIsRejectOpen(false)}
                                className="px-4 py-2 border bg-white rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleReject}
                                disabled={!rejectionReason.trim()}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                            >
                                Konfirmasi Penolakan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
