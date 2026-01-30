'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Patient } from '@/types/patient';
import { usePatient } from '@/contexts/PatientContext';
import { ClinicalPhotosTab } from './tabs/ClinicalPhotosTab';
import { RadiologyImagesTab } from './tabs/RadiologyImagesTab';
import { PathologyReportsTab } from './tabs/PathologyReportsTab';

interface PatientDetailProps {
  patient: Patient;
  onEdit?: (patient: Patient) => void;
  className?: string;
}

export default function PatientDetail({ patient, onEdit, className = '' }: PatientDetailProps) {
  const router = useRouter();
  const { updatePatient } = usePatient();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeceasedModal, setShowDeceasedModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'photos' | 'radiology' | 'pathology'>('info');
  const [deceasedData, setDeceasedData] = useState({
    dateOfDeath: '',
    causeOfDeath: ''
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return '-';
    const birth = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const formatGender = (gender: string) => {
    return gender === 'male' ? 'Laki-laki' : 'Perempuan';
  };

  const formatTreatmentStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'new': 'Baru',
      'ongoing': 'Sedang Berjalan',
      'completed': 'Selesai',
      'palliative': 'Paliatif',
      'lost_to_followup': 'Hilang Follow-up',
      'deceased': 'Meninggal'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      'new': 'bg-blue-100 text-blue-800',
      'ongoing': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-green-100 text-green-800',
      'palliative': 'bg-purple-100 text-purple-800',
      'lost_to_followup': 'bg-orange-100 text-orange-800',
      'deceased': 'bg-red-100 text-red-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const formatBloodType = (bloodType?: string, rhFactor?: string) => {
    if (!bloodType) return '-';
    return `${bloodType}${rhFactor ? (rhFactor === 'positive' ? '+' : '-') : ''}`;
  };

  const handleMarkAsDeceased = async () => {
    try {
      await updatePatient(patient.id, {
        isDeceased: true,
        dateOfDeath: deceasedData.dateOfDeath,
        causeOfDeath: deceasedData.causeOfDeath
      });
      setShowDeceasedModal(false);
      setDeceasedData({ dateOfDeath: '', causeOfDeath: '' });
    } catch (error) {
      console.error('Failed to mark patient as deceased:', error);
    }
  };



  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold font-mono text-blue-600">{patient.anonymousId}</h2>
              <div className="space-y-1">
                <p className="text-sm text-gray-600 font-mono">INAMSOS: <strong className="text-gray-900">{patient.inamsosRecordNumber}</strong></p>
                {patient.hospitalRecordNumber && (
                  <p className="text-sm text-gray-500 font-mono">RM RS: {patient.hospitalRecordNumber}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(patient.treatmentStatus)}`}>
              {formatTreatmentStatus(patient.treatmentStatus)}
            </span>
            {patient.isDeceased && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                Meninggal
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => {
              onEdit?.(patient);
              setIsEditing(true);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Edit Data
          </button>
          {!patient.isDeceased && (
            <button
              onClick={() => setShowDeceasedModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Tandai Meninggal
            </button>
          )}

        </div>
      </div>

      {/* Quick Actions - Clinical Assessment */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Clinical Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Follow-up Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">Follow-up Protocol</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Track patient progress with 14-visit longitudinal protocol (5 years)
                </p>
                <button
                  onClick={() => router.push(`/patients/view/follow-up?id=${patient.id}`)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View Follow-up Schedule
                </button>
              </div>
            </div>
          </div>

          {/* MSTS Score Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-gray-900 mb-1">MSTS Score</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Musculoskeletal Tumor Society functional assessment (0-30 points)
                </p>
                <button
                  onClick={() => router.push(`/patients/view/msts?id=${patient.id}`)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Calculate MSTS Score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Dasar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
              <p className="text-gray-900">
                {formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} tahun)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jenis Kelamin</label>
              <p className="text-gray-900">{formatGender(patient.gender)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Golongan Darah</label>
              <p className="text-gray-900">{formatBloodType(patient.bloodType, patient.rhFactor)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">NIK</label>
              <p className="text-gray-900">{patient.identityNumber || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telepon</label>
              <p className="text-gray-900">{patient.phone || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{patient.email || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pekerjaan</label>
              <p className="text-gray-900">{patient.occupation || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pendidikan</label>
              <p className="text-gray-900">{patient.educationLevel || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status Pernikahan</label>
              <p className="text-gray-900">
                {patient.maritalStatus === 'single' ? 'Lajang' :
                  patient.maritalStatus === 'married' ? 'Menikah' :
                    patient.maritalStatus === 'divorced' ? 'Cerai' :
                      patient.maritalStatus === 'widowed' ? 'Duda/Janda' : '-'}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alamat</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-900">
              {patient.address.street && <>{patient.address.street}, <br /></>}
              {patient.address.village && <>Desa {patient.address.village}, <br /></>}
              {patient.address.district && <>Kec. {patient.address.district}, <br /></>}
              {patient.address.city && <>Kota {patient.address.city}, <br /></>}
              {patient.address.province && <>Provinsi {patient.address.province} <br /></>}
              {patient.address.postalCode && <>{patient.address.postalCode}<br /></>}
              {patient.address.country && <>{patient.address.country}</>}
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Kontak Darurat</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama</label>
                <p className="text-gray-900">{patient.emergencyContact.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hubungan</label>
                <p className="text-gray-900">
                  {patient.emergencyContact.relationship === 'spouse' ? 'Suami/Istri' :
                    patient.emergencyContact.relationship === 'parent' ? 'Orang Tua' :
                      patient.emergencyContact.relationship === 'child' ? 'Anak' :
                        patient.emergencyContact.relationship === 'sibling' ? 'Saudara Kandung' :
                          patient.emergencyContact.relationship === 'friend' ? 'Teman' :
                            patient.emergencyContact.relationship === 'other' ? 'Lainnya' : '-'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telepon</label>
                <p className="text-gray-900">{patient.emergencyContact.phone}</p>
              </div>
              {patient.emergencyContact.address && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alamat</label>
                  <p className="text-gray-900">{patient.emergencyContact.address}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cancer Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kanker</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lokasi Primer</label>
              <p className="text-gray-900">{patient.primaryCancerDiagnosis?.primarySite || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Laterality</label>
              <p className="text-gray-900">
                {patient.primaryCancerDiagnosis?.laterality === 'left' ? 'Kiri' :
                  patient.primaryCancerDiagnosis?.laterality === 'right' ? 'Kanan' :
                    patient.primaryCancerDiagnosis?.laterality === 'bilateral' ? 'Bilateral' :
                      patient.primaryCancerDiagnosis?.laterality === 'midline' ? 'Midline' :
                        patient.primaryCancerDiagnosis?.laterality === 'unknown' ? 'Tidak Diketahui' : '-'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Morfologi</label>
              <p className="text-gray-900">{patient.primaryCancerDiagnosis?.morphology || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Perilaku</label>
              <p className="text-gray-900">
                {patient.primaryCancerDiagnosis?.behavior === 'benign' ? 'Jinak' :
                  patient.primaryCancerDiagnosis?.behavior === 'borderline' ? 'Batas' :
                    patient.primaryCancerDiagnosis?.behavior === 'invasive' ? 'Invasif' :
                      patient.primaryCancerDiagnosis?.behavior === 'in_situ' ? 'In Situ' : '-'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stadium Kanker</label>
              <p className="text-gray-900">{patient.cancerStage || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grading</label>
              <p className="text-gray-900">{patient.cancerGrade || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Histologi</label>
              <p className="text-gray-900">{patient.histology || '-'}</p>
            </div>
          </div>

          {/* TNM Classification */}
          {patient.tnmClassification && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Klasifikasi TNM</label>
              <div className="bg-gray-50 p-3 rounded-lg inline-flex space-x-4">
                <span className="font-mono">T{patient.tnmClassification.t}</span>
                <span className="font-mono">N{patient.tnmClassification.n}</span>
                <span className="font-mono">M{patient.tnmClassification.m}</span>
              </div>
            </div>
          )}

          {/* Molecular Markers */}
          {patient.molecularMarkers && patient.molecularMarkers.length > 0 && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Marker Molekuler</label>
              <div className="space-y-2">
                {patient.molecularMarkers.map((marker, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{marker.name}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${marker.result === 'positive' ? 'bg-green-100 text-green-800' :
                        marker.result === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {marker.result === 'positive' ? 'Positif' :
                          marker.result === 'negative' ? 'Negatif' : 'Tidak Diketahui'}
                      </span>
                    </div>
                    {marker.testDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Tes: {formatDate(marker.testDate)}
                      </p>
                    )}
                    {marker.methodology && (
                      <p className="text-xs text-gray-500">
                        Metode: {marker.methodology}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Treatment Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pengobatan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Diagnosis</label>
              <p className="text-gray-900">{formatDate(patient.dateOfDiagnosis)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kunjungan Pertama</label>
              <p className="text-gray-900">{formatDate(patient.dateOfFirstVisit)}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pusat Pengobatan</label>
              <p className="text-gray-900">{patient.treatmentCenter}</p>
            </div>
            {patient.treatmentCenterName && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Nama Pusat</label>
                <p className="text-gray-900">{patient.treatmentCenterName}</p>
              </div>
            )}
            {patient.lastVisitDate && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Kunjungan Terakhir</label>
                <p className="text-gray-900">{formatDate(patient.lastVisitDate)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Deceased Information */}
        {patient.isDeceased && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Informasi Kematian</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-red-700">Tanggal Meninggal</label>
                <p className="text-red-900">{formatDate(patient.dateOfDeath || '')}</p>
              </div>
              {patient.causeOfDeath && (
                <div>
                  <label className="block text-sm font-medium text-red-700">Sebab Kematian</label>
                  <p className="text-red-900">{patient.causeOfDeath}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* System Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Dibuat Oleh</label>
              <p className="text-gray-900">{patient.createdBy}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tanggal Dibuat</label>
              <p className="text-gray-900">{formatDate(patient.createdAt)}</p>
            </div>
            {patient.updatedBy && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Diperbarui Oleh</label>
                <p className="text-gray-900">{patient.updatedBy}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Terakhir Diperbarui</label>
              <p className="text-gray-900">{formatDate(patient.updatedAt)}</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-t border-gray-200 pt-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('info')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Patient Info
              </button>
              <button
                onClick={() => setActiveTab('photos')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'photos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                📸 Clinical Photos
              </button>
              <button
                onClick={() => setActiveTab('radiology')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'radiology'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                🏥 Radiology
              </button>
              <button
                onClick={() => setActiveTab('pathology')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pathology'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                🔬 Pathology
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'info' && (
              <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                <p>ℹ️ All patient information is displayed above. Use the tabs to view clinical photos, radiology images, and pathology reports. Use the Clinical Assessment section above to access follow-up schedule and MSTS functional assessment.</p>
              </div>
            )}
            {activeTab === 'photos' && <ClinicalPhotosTab patientId={patient.id} patientName={patient.name || patient.anonymousId} />}
            {activeTab === 'radiology' && <RadiologyImagesTab patientId={patient.id} patientName={patient.name || patient.anonymousId} />}
            {activeTab === 'pathology' && <PathologyReportsTab patientId={patient.id} patientName={patient.name || patient.anonymousId} />}
          </div>
        </div>
      </div>

      {/* Deceased Modal */}
      {showDeceasedModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tandai Pasien Meninggal</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal Meninggal *
                </label>
                <input
                  type="date"
                  value={deceasedData.dateOfDeath}
                  onChange={(e) => setDeceasedData(prev => ({ ...prev, dateOfDeath: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sebab Kematian
                </label>
                <textarea
                  value={deceasedData.causeOfDeath}
                  onChange={(e) => setDeceasedData(prev => ({ ...prev, causeOfDeath: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sebab kematian (opsional)"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => {
                  setShowDeceasedModal(false);
                  setDeceasedData({ dateOfDeath: '', causeOfDeath: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                onClick={handleMarkAsDeceased}
                disabled={!deceasedData.dateOfDeath}
                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}