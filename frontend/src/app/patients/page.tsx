'use client';

import { useRouter } from 'next/navigation';
import { usePatient, PatientProvider } from '@/contexts/PatientContext';
import { Layout } from '@/components/layout/Layout';
import { Patient } from '@/types/patient';
import PatientSearch from '@/components/patients/PatientSearch';
import PatientList from '@/components/patients/PatientList';


function PatientManagementContent() {
  const router = useRouter();
  const {
    patients,
    isLoading,
    fetchPatients
  } = usePatient();

  const handlePatientsFound = (foundPatients: Patient[]) => {
    // Patients are already managed by the context
  };

  const handleSelectPatient = (patient: Patient) => {
    router.push(`/patients/view?id=${patient.id}`);
  };

  const handleNewPatient = () => {
    router.push('/patients/new');
  };

  return (
    <Layout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Pasien</h1>
            <p className="text-gray-600">INAMSOS - Sistem Informasi Kanker Nasional</p>
          </div>
          <button
            onClick={handleNewPatient}
            className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Input Pasien Baru
          </button>
        </div>
      </div>

      {/* Main Content - List View Only */}
      <div className="space-y-6">
        <PatientSearch onPatientsFound={handlePatientsFound} />
        <PatientList
          patients={patients}
          onSelectPatient={handleSelectPatient}
          isLoading={isLoading}
        />
      </div>
    </Layout>
  );
}

export default function PatientsPage() {
  return (
    <PatientProvider>
      <PatientManagementContent />
    </PatientProvider>
  );
}