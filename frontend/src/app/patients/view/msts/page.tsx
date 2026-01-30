'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { MstsScoreCalculator } from '@/components/musculoskeletal/MstsScoreCalculator';
import patientApi from '@/services/patientApi';

function PatientMstsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const patientId = searchParams.get('id');

    const [patient, setPatient] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (patientId) {
            loadPatient();
        } else {
            router.push('/patients');
        }
    }, [patientId]);

    const loadPatient = async () => {
        if (!patientId) return;
        try {
            setLoading(true);
            const data = await patientApi.getById(patientId);
            setPatient(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load patient');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveScore = (scoreId: string) => {
        console.log('MSTS score saved with ID:', scoreId);
        alert(`MSTS score saved successfully!\n\nScore ID: ${scoreId}\n\nYou can view the score history in the follow-up tracking.`);
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

    if ((error || !patient) && patientId) {
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

    if (!patient || !patientId) return null;

    return (
        <div className="py-8 px-4">
            {/* Header with back button */}
            <div className="max-w-7xl mx-auto mb-6">
                <button
                    onClick={() => router.push('/patients')}
                    className="flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Patient List
                </button>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
                            <p className="text-gray-600">MR: {patient.inamsosRecordNumber} ({patient.hospitalRecordNumber})</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {patient.pathologyType?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())} •
                                Stage: {patient.ennekingStage || 'N/A'}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                MSTS Assessment
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* MSTS Score Calculator Component */}
            <div className="max-w-7xl mx-auto">
                <MstsScoreCalculator
                    patientId={patientId}
                    patientName={patient.name}
                    autoSave={false}
                    onSave={handleSaveScore}
                />
            </div>
        </div>
    );
}

export default function PatientMstsPage() {
    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <PatientMstsContent />
            </Suspense>
        </Layout>
    );
}
