'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePatient, PatientProvider } from '@/contexts/PatientContext';
import { Layout } from '@/components/layout/Layout';
import PatientDetail from '@/components/patients/PatientDetail';
import { Patient } from '@/types/patient';
import patientApi from '@/services/patientApi';

function PatientDetailContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get('id');
    const { setCurrentPatient } = usePatient();
    const [patient, setPatient] = useState<Patient | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (patientId) {
            loadPatient();
        } else {
            // If no ID, redirect back to list
            router.push('/patients');
        }
    }, [patientId]);

    const loadPatient = async () => {
        if (!patientId) return;
        try {
            setLoading(true);
            const data = await patientApi.getById(patientId);
            setPatient(data);
            setCurrentPatient(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load patient');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading patient data...</p>
                </div>
            </div>
        );
    }

    if (patientId && (error || !patient)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Not Found</h2>
                    <p className="text-gray-600 mb-6">{error || 'Unable to load patient data'}</p>
                    <button
                        onClick={() => router.push('/patients')}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                    >
                        Back to Patients
                    </button>
                </div>
            </div>
        );
    }

    if (!patient) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* Header with back button */}
            <div className="max-w-7xl mx-auto mb-6">
                <button
                    onClick={() => router.push('/patients')}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Daftar Pasien
                </button>
            </div>

            {/* Patient Detail Component */}
            <div className="max-w-7xl mx-auto">
                <PatientDetail
                    patient={patient}
                    onEdit={(p) => console.log('Edit patient:', p)}
                />
            </div>
        </div>
    );
}

export default function PatientDetailPage() {
    return (
        <Layout>
            <PatientProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <PatientDetailContent />
                </Suspense>
            </PatientProvider>
        </Layout>
    );
}
