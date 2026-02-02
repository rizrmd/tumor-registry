'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useSync } from '@/contexts/SyncContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { statistics, isSyncing, triggerFullSync } = useSync();

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">Kelola pengaturan akun dan preferensi Anda</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informasi Profil</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <input
                type="text"
                defaultValue={user?.role}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50"
                disabled
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
              Simpan Perubahan
            </button>
          </div>
        </div>

        {/* Sync Management */}
        {statistics && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sinkronisasi Data</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Kelola sinkronisasi data offline dengan server pusat
                </p>
              </div>
              <Link
                href="/sync/conflicts"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Lihat Detail →
              </Link>
            </div>

            {/* Sync Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <p className="text-xs text-emerald-600 font-medium uppercase">Tersinkron</p>
                <p className="text-2xl font-bold text-emerald-700">{statistics.synced}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-xs text-yellow-600 font-medium uppercase">Menunggu</p>
                <p className="text-2xl font-bold text-yellow-700">{statistics.pending}</p>
              </div>
              <div className={`p-4 rounded-lg ${statistics.conflict > 0 ? 'bg-orange-100' : 'bg-orange-50'}`}>
                <p className="text-xs text-orange-600 font-medium uppercase">Konflik</p>
                <p className="text-2xl font-bold text-orange-700">{statistics.conflict}</p>
              </div>
              <div className={`p-4 rounded-lg ${statistics.failed > 0 ? 'bg-red-100' : 'bg-red-50'}`}>
                <p className="text-xs text-red-600 font-medium uppercase">Gagal</p>
                <p className="text-2xl font-bold text-red-700">{statistics.failed}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={triggerFullSync}
                disabled={isSyncing}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSyncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menyinkronkan...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Sinkronkan Sekarang</span>
                  </>
                )}
              </button>

              {(statistics.conflict > 0 || statistics.failed > 0) && (
                <Link
                  href="/sync/conflicts"
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>Selesaikan Masalah ({statistics.conflict + statistics.failed})</span>
                </Link>
              )}
            </div>

            {/* Warning Message */}
            {(statistics.conflict > 0 || statistics.failed > 0) && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-orange-900">
                      Perhatian Diperlukan
                    </p>
                    <p className="text-sm text-orange-700 mt-1">
                      Terdapat {statistics.conflict} konflik dan {statistics.failed} item gagal sinkron. 
                      Silakan selesaikan untuk memastikan data Anda tersinkron dengan baik.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Keamanan</h2>
          <button className="text-emerald-600 hover:text-emerald-700">
            Ubah Password
          </button>
        </div>
      </div>
    </Layout>
  );
}
