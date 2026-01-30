'use client';

import React, { useState, useEffect } from 'react';
import { FollowUpVisit } from '@/services/followup.service';
import { MedicalImageUploader } from '@/components/upload/MedicalImageUploader';
import { ImageCategory } from '@/services/medical-imaging.service';
import { UpdateFollowUpVisitDto } from '@/services/followup.service';

interface FollowUpVisitEditModalProps {
  visit: FollowUpVisit;
  isOpen: boolean;
  onClose: () => void;
  onSave: (visitId: string, data: UpdateFollowUpVisitDto) => Promise<void>;
  patientName?: string;
}

type TabType = 'basic' | 'clinical' | 'msts' | 'imaging';

export function FollowUpVisitEditModal({
  visit,
  isOpen,
  onClose,
  onSave,
  patientName,
}: FollowUpVisitEditModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [formData, setFormData] = useState<UpdateFollowUpVisitDto>({
    actualDate: visit.actualDate || '',
    examinedBy: visit.examinedBy || '',
    chiefComplaint: visit.chiefComplaint || '',
    physicalExamination: visit.physicalExamination || '',
    supportingExamination: visit.supportingExamination || '',
    status: visit.status || 'scheduled',
    clinicalStatus: visit.clinicalStatus || '',
    localRecurrence: visit.localRecurrence || false,
    distantMetastasis: visit.distantMetastasis || false,
    metastasisSites: visit.metastasisSites || '',
    imagingPerformed: visit.imagingPerformed || '',
    imagingFindings: visit.imagingFindings || '',
    labResults: visit.labResults || '',
    karnofskyScore: visit.karnofskyScore || undefined,
    notes: visit.notes || '',
  });

  // MSTS Score state
  const [mstsData, setMstsData] = useState({
    extremityType: 'LOWER' as 'UPPER' | 'LOWER',
    pain: 0,
    function: 0,
    emotionalAcceptance: 0,
    // Upper extremity
    handPositioning: 0,
    manualDexterity: 0,
    liftingAbility: 0,
    // Lower extremity
    supports: 0,
    walkingAbility: 0,
    gait: 0,
  });

  // Reset form when visit changes
  useEffect(() => {
    if (visit) {
      setFormData({
        actualDate: visit.actualDate || '',
        examinedBy: visit.examinedBy || '',
        chiefComplaint: visit.chiefComplaint || '',
        physicalExamination: visit.physicalExamination || '',
        supportingExamination: visit.supportingExamination || '',
        status: visit.status || 'scheduled',
        clinicalStatus: visit.clinicalStatus || '',
        localRecurrence: visit.localRecurrence || false,
        distantMetastasis: visit.distantMetastasis || false,
        metastasisSites: visit.metastasisSites || '',
        imagingPerformed: visit.imagingPerformed || '',
        imagingFindings: visit.imagingFindings || '',
        labResults: visit.labResults || '',
        karnofskyScore: visit.karnofskyScore || undefined,
        notes: visit.notes || '',
      });
      setActiveTab('basic');
      setError('');
    }
  }, [visit]);

  const updateFormField = (field: keyof UpdateFollowUpVisitDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateMSTSTotal = () => {
    const { extremityType, pain, function: func, emotionalAcceptance } = mstsData;
    let total = pain + func + emotionalAcceptance;

    if (extremityType === 'UPPER') {
      total += mstsData.handPositioning + mstsData.manualDexterity + mstsData.liftingAbility;
    } else {
      total += mstsData.supports + mstsData.walkingAbility + mstsData.gait;
    }

    return {
      total,
      percentage: Math.round((total / 30) * 100),
    };
  };

  const handleSave = async () => {
    // Validation
    if (!formData.actualDate) {
      setError('Tanggal Kunjungan wajib diisi');
      setActiveTab('basic');
      return;
    }

    if (!formData.examinedBy) {
      setError('Dokter Pemeriksa wajib diisi');
      setActiveTab('basic');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave(visit.id, formData);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save visit');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  const mstsScore = calculateMSTSTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Visit #{visit.visitNumber} - Edit Follow-up
              </h2>
              <p className="text-purple-100 mt-1">
                {visit.visitType} • Scheduled:{' '}
                {new Date(visit.scheduledDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              {patientName && (
                <p className="text-purple-100 text-sm mt-1">Patient: {patientName}</p>
              )}
            </div>
            <button
              onClick={onClose}
              disabled={saving}
              className="text-white hover:bg-purple-800 rounded-full p-2 transition-colors disabled:opacity-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'basic'
                ? 'border-purple-600 text-purple-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              📋 Basic Info
            </button>
            <button
              onClick={() => setActiveTab('clinical')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'clinical'
                ? 'border-purple-600 text-purple-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              🏥 Clinical Data
            </button>
            <button
              onClick={() => setActiveTab('msts')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'msts'
                ? 'border-purple-600 text-purple-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              📊 MSTS Score
            </button>
            <button
              onClick={() => setActiveTab('imaging')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'imaging'
                ? 'border-purple-600 text-purple-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              📷 Imaging Files
            </button>
          </nav>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <BasicInfoTab formData={formData} updateFormField={updateFormField} />
          )}

          {/* Clinical Data Tab */}
          {activeTab === 'clinical' && (
            <ClinicalDataTab formData={formData} updateFormField={updateFormField} />
          )}

          {/* MSTS Score Tab */}
          {activeTab === 'msts' && (
            <MSTSScoreTab
              mstsData={mstsData}
              setMstsData={setMstsData}
              mstsScore={mstsScore}
            />
          )}

          {/* Imaging Files Tab */}
          {activeTab === 'imaging' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="text-blue-900 font-semibold mb-1">Upload Imaging for this Visit</h4>
                <p className="text-sm text-blue-800">
                  Upload X-Rays, MRI, or other imaging files associated specifically with this follow-up visit.
                </p>
              </div>
              <MedicalImageUploader
                patientId={visit.patientId}
                recordId={visit.id}
                category={ImageCategory.FOLLOW_UP}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {formData.actualDate ? (
                <span className="text-green-600 font-medium">
                  ✓ Visit date recorded
                </span>
              ) : (
                <span className="text-yellow-600">⚠ Visit date not recorded yet</span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving && (
                  <svg
                    className="animate-spin h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                {saving ? 'Saving...' : 'Save Visit'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

interface TabProps {
  formData: UpdateFollowUpVisitDto;
  updateFormField: (field: keyof UpdateFollowUpVisitDto, value: any) => void;
}

function BasicInfoTab({ formData, updateFormField }: TabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="h-5 w-5 text-blue-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-3 text-sm text-blue-700">
            <strong>Required fields per INAMSOS document:</strong> Tanggal Kunjungan, Dokter
            Pemeriksa. Other fields are recommended for complete medical records.
          </p>
        </div>
      </div>

      {/* Tanggal Kunjungan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tanggal Kunjungan <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.actualDate || ''}
          onChange={(e) => updateFormField('actualDate', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Actual date when the patient visited for this follow-up
        </p>
      </div>

      {/* Dokter Pemeriksa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dokter Pemeriksa <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.examinedBy || ''}
          onChange={(e) => updateFormField('examinedBy', e.target.value)}
          placeholder="Nama dokter yang memeriksa..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Keluhan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keluhan (Chief Complaint)
        </label>
        <textarea
          value={formData.chiefComplaint || ''}
          onChange={(e) => updateFormField('chiefComplaint', e.target.value)}
          rows={3}
          placeholder="Keluhan utama pasien saat kunjungan..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Pemeriksaan Fisik */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pemeriksaan Fisik (Physical Examination)
        </label>
        <textarea
          value={formData.physicalExamination || ''}
          onChange={(e) => updateFormField('physicalExamination', e.target.value)}
          rows={4}
          placeholder="Hasil pemeriksaan fisik (inspeksi, palpasi, ROM, kekuatan otot, dll)..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Pemeriksaan Penunjang */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pemeriksaan Penunjang - Ringkasan (Supporting Examination Summary)
        </label>
        <textarea
          value={formData.supportingExamination || ''}
          onChange={(e) => updateFormField('supportingExamination', e.target.value)}
          rows={3}
          placeholder="Ringkasan hasil imaging, lab, dan pemeriksaan penunjang lainnya..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Field ini untuk ringkasan keseluruhan pemeriksaan penunjang sesuai dokumen INAMSOS.
          Detail imaging dan lab dapat dicatat di tab Clinical Data.
        </p>
      </div>

      {/* Visit Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Status Kunjungan
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'scheduled', label: 'Scheduled', color: 'blue' },
            { value: 'completed', label: 'Completed', color: 'green' },
            { value: 'missed', label: 'Missed', color: 'red' },
            { value: 'cancelled', label: 'Cancelled', color: 'gray' },
          ].map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => updateFormField('status', status.value)}
              className={`p-3 rounded-lg border-2 transition-all ${formData.status === status.value
                ? `border-${status.color}-600 bg-${status.color}-50 text-${status.color}-900`
                : 'border-gray-300 bg-white hover:border-purple-400'
                }`}
            >
              <div className="font-semibold text-sm">{status.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Catatan Klinis (Clinical Notes)
        </label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => updateFormField('notes', e.target.value)}
          rows={3}
          placeholder="Catatan tambahan mengenai kunjungan ini..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>
    </div>
  );
}

function ClinicalDataTab({ formData, updateFormField }: TabProps) {
  const METASTASIS_SITES = [
    'Paru (Lung)',
    'Tulang (Bone)',
    'Hati (Liver)',
    'Otak (Brain)',
    'Kelenjar Getah Bening (Lymph Nodes)',
    'Lainnya',
  ];

  const toggleMetastasisSite = (site: string) => {
    const current = formData.metastasisSites?.split(',').filter(Boolean) || [];
    const updated = current.includes(site)
      ? current.filter((s) => s !== site)
      : [...current, site];
    updateFormField('metastasisSites', updated.join(','));
  };

  const isMetastasisSiteSelected = (site: string) => {
    return formData.metastasisSites?.split(',').includes(site) || false;
  };

  return (
    <div className="space-y-6">
      {/* Clinical Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Status Klinis Penyakit
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { value: 'NED', label: 'NED', fullLabel: 'No Evidence of Disease', color: 'green' },
            {
              value: 'AWD',
              label: 'AWD',
              fullLabel: 'Alive With Disease',
              color: 'yellow',
            },
            { value: 'DOD', label: 'DOD', fullLabel: 'Dead of Disease', color: 'red' },
            { value: 'DOC', label: 'DOC', fullLabel: 'Dead of Other Cause', color: 'gray' },
            { value: 'LTFU', label: 'LTFU', fullLabel: 'Lost to Follow-up', color: 'orange' },
          ].map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => updateFormField('clinicalStatus', status.value)}
              className={`p-3 rounded-lg border-2 transition-all ${formData.clinicalStatus === status.value
                ? 'border-purple-600 bg-purple-50 text-purple-900'
                : 'border-gray-300 bg-white hover:border-purple-400'
                }`}
              title={status.fullLabel}
            >
              <div className="font-bold text-xs">{status.label}</div>
              <div className="text-xs text-gray-600 mt-1">{status.fullLabel}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recurrence */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Recurrence Tracking</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.localRecurrence || false}
              onChange={(e) => updateFormField('localRecurrence', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Local Recurrence (Kekambuhan lokal)
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.distantMetastasis || false}
              onChange={(e) => updateFormField('distantMetastasis', e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 h-5 w-5"
            />
            <span className="ml-3 text-sm font-medium text-gray-700">
              Distant Metastasis (Metastasis jauh)
            </span>
          </label>

          {formData.distantMetastasis && (
            <div className="ml-8 mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Metastasis
              </label>
              <div className="grid grid-cols-2 gap-2">
                {METASTASIS_SITES.map((site) => (
                  <label key={site} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isMetastasisSiteSelected(site)}
                      onChange={() => toggleMetastasisSite(site)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{site}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Imaging */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imaging Performed
        </label>
        <input
          type="text"
          value={formData.imagingPerformed || ''}
          onChange={(e) => updateFormField('imagingPerformed', e.target.value)}
          placeholder="e.g., X-ray, CT, MRI, Bone Scan, PET-CT"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imaging Findings
        </label>
        <textarea
          value={formData.imagingFindings || ''}
          onChange={(e) => updateFormField('imagingFindings', e.target.value)}
          rows={4}
          placeholder="Deskripsi temuan imaging..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Lab Results */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Lab Results
        </label>
        <textarea
          value={formData.labResults || ''}
          onChange={(e) => updateFormField('labResults', e.target.value)}
          rows={4}
          placeholder="ALP, LDH, Ca, Phosphate, dll..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      {/* Karnofsky Score */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Karnofsky Performance Score (0-100)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          step="10"
          value={formData.karnofskyScore || ''}
          onChange={(e) =>
            updateFormField('karnofskyScore', e.target.value ? parseInt(e.target.value) : undefined)
          }
          placeholder="0-100"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          100 = Normal, no complaints | 0 = Dead
        </p>
      </div>
    </div>
  );
}

interface MSTSScoreTabProps {
  mstsData: any;
  setMstsData: (data: any) => void;
  mstsScore: { total: number; percentage: number };
}

function MSTSScoreTab({ mstsData, setMstsData, mstsScore }: MSTSScoreTabProps) {
  const updateMSTSField = (field: string, value: any) => {
    setMstsData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="h-5 w-5 text-purple-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <p className="ml-3 text-sm text-purple-700">
            <strong>MSTS Score</strong> (Musculoskeletal Tumor Society Score) evaluates
            functional outcomes. Each domain scores 0-5. Maximum total: 30 points.
          </p>
        </div>
      </div>

      {/* Extremity Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Ekstremitas
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateMSTSField('extremityType', 'UPPER')}
            className={`p-4 rounded-lg border-2 transition-all ${mstsData.extremityType === 'UPPER'
              ? 'border-purple-600 bg-purple-100 text-purple-900'
              : 'border-gray-300 bg-white hover:border-purple-400'
              }`}
          >
            <div className="font-bold">Upper Extremity</div>
            <div className="text-xs text-gray-600 mt-1">Hand, Arm, Shoulder</div>
          </button>
          <button
            type="button"
            onClick={() => updateMSTSField('extremityType', 'LOWER')}
            className={`p-4 rounded-lg border-2 transition-all ${mstsData.extremityType === 'LOWER'
              ? 'border-purple-600 bg-purple-100 text-purple-900'
              : 'border-gray-300 bg-white hover:border-purple-400'
              }`}
          >
            <div className="font-bold">Lower Extremity</div>
            <div className="text-xs text-gray-600 mt-1">Foot, Leg, Hip</div>
          </button>
        </div>
      </div>

      {/* Common Domains */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Common Domains (All Patients)</h3>

        {['pain', 'function', 'emotionalAcceptance'].map((domain) => (
          <div key={domain}>
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {domain.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              value={mstsData[domain]}
              onChange={(e) => updateMSTSField(domain, parseInt(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right,
                  rgb(254 202 202) 0%,
                  rgb(254 240 138) 50%,
                  rgb(187 247 208) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0 (Worst)</span>
              <span className="font-bold text-lg text-purple-700">{mstsData[domain]}</span>
              <span>5 (Best)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upper Extremity Specific */}
      {mstsData.extremityType === 'UPPER' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Upper Extremity Specific</h3>

          {['handPositioning', 'manualDexterity', 'liftingAbility'].map((domain) => (
            <div key={domain}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {domain.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                value={mstsData[domain]}
                onChange={(e) => updateMSTSField(domain, parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0</span>
                <span className="font-bold text-lg text-purple-700">{mstsData[domain]}</span>
                <span>5</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lower Extremity Specific */}
      {mstsData.extremityType === 'LOWER' && (
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Lower Extremity Specific</h3>

          {['supports', 'walkingAbility', 'gait'].map((domain) => (
            <div key={domain}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {domain.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                value={mstsData[domain]}
                onChange={(e) => updateMSTSField(domain, parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>0</span>
                <span className="font-bold text-lg text-purple-700">{mstsData[domain]}</span>
                <span>5</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MSTS Total Score */}
      <div className="mt-6 p-6 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">MSTS Total Score</div>
            <div className="text-5xl font-bold">
              {mstsScore.total} <span className="text-2xl">/ 30</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90 mb-1">Percentage</div>
            <div className="text-4xl font-bold">{mstsScore.percentage}%</div>
            <div className="text-xs mt-1">
              {mstsScore.percentage >= 80
                ? 'Excellent'
                : mstsScore.percentage >= 60
                  ? 'Good'
                  : mstsScore.percentage >= 40
                    ? 'Fair'
                    : 'Poor'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="h-5 w-5 text-yellow-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="ml-3 text-sm text-yellow-700">
            <strong>Note:</strong> MSTS Score is calculated automatically but not yet saved
            to database in current implementation. This will be added in Phase 2 enhancement.
          </p>
        </div>
      </div>
    </div>
  );
}
