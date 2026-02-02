'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <AuthenticatedHome />
    </ProtectedRoute>
  );
}

function AuthenticatedHome() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">INAMSOS</h1>
              <span className="ml-2 text-sm text-gray-500">
                Indonesia National Musculoskeletal Tumor Registry
              </span>
            </div>
            <nav className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || user?.email}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/patients/new"
                className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                Register New Patient
              </Link>
              <Link
                href="/patients"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                View Patients
              </Link>
              <Link
                href="/dashboard"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>

          {/* Analytics */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h2>
            <div className="space-y-3">
              <Link
                href="/analytics"
                className="block w-full text-center bg-info-600 text-white px-4 py-2 rounded-md hover:bg-info-700 transition-colors"
              >
                View Analytics
              </Link>
              <Link
                href="/analytics/distribution"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancer Distribution
              </Link>
              <Link
                href="/analytics/trends"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Trends Analysis
              </Link>
            </div>
          </div>

          {/* Research */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Research</h2>
            <div className="space-y-3">
              <Link
                href="/research"
                className="block w-full text-center bg-success-600 text-white px-4 py-2 rounded-md hover:bg-success-700 transition-colors"
              >
                Research Portal
              </Link>
              <Link
                href="/research/requests"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Data Requests
              </Link>
              <Link
                href="/_reports"
                className="block w-full text-center bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reports
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600">10</div>
              <div className="mt-2 text-sm text-gray-600">Comprehensive Data Sections</div>
              <div className="mt-1 text-xs text-gray-500">Identity → Treatment → 14-visit Follow-up</div>
            </div>
            <div className="text-center p-4 bg-success-50 rounded-lg">
              <div className="text-4xl font-bold text-success-600">85%+</div>
              <div className="mt-2 text-sm text-gray-600">Target Limb Salvage Rate</div>
              <div className="mt-1 text-xs text-gray-500">WHO benchmark untuk advanced centers</div>
            </div>
            <div className="text-center p-4 bg-warning-50 rounded-lg">
              <div className="text-4xl font-bold text-warning-600">10 Years</div>
              <div className="mt-2 text-sm text-gray-600">Long-term Follow-up Protocol</div>
              <div className="mt-1 text-xs text-gray-500">14 scheduled visits dengan MSTS tracking</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © 2025 INAMSOS. Indonesia National Musculoskeletal Tumor Registry.
            </p>
            <div className="mt-2">
              <span className="text-xs text-gray-400">
                Supported by: Indonesian Orthopedic Association (PABOI) | Indonesian Society of Surgical Oncology (PERABOI)
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
