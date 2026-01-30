'use client';

import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation'; // Correct import for App Router
import FilterPanel from '@/components/national-dashboard/FilterPanel';
import ExportMenu from '@/components/national-dashboard/ExportMenu';
import { GenderPieChart, StageBarChart, PathologyBarChart } from '@/components/national-dashboard/Charts';
import nationalDashboardService, { AggregateFilters, AggregatedResult, NationalStatistics } from '@/services/national-dashboard.service';
import { Users, Building, Activity, Map as MapIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const DistributionMap = dynamic(() => import('@/components/national-dashboard/DistributionMap'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function AnalyticsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<NationalStatistics | null>(null);
  const [aggregated, setAggregated] = useState<AggregatedResult | null>(null);
  const [filters, setFilters] = useState<AggregateFilters>({});

  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auth Protection
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Initial Data Load
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        const [statsData, aggregatedData] = await Promise.all([
          nationalDashboardService.getStatistics(),
          nationalDashboardService.searchAggregated({}) // Initial search with no filters
        ]);
        setStats(statsData);
        setAggregated(aggregatedData);
      } catch (err) {
        console.error('Data load error:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      initData();
    }
  }, [user]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await nationalDashboardService.searchAggregated(filters);
      setAggregated(data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to filter data.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      await nationalDashboardService.downloadExport(filters);
    } catch (err) {
      console.error('Export error:', err);
      alert('Failed to export data');
    } finally {
      setExporting(false);
    }
  };

  if (authLoading || (loading && !stats)) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">National Dashboard</h1>
            <p className="text-gray-500 mt-1">Comprehensive analysis of musculoskeletal tumor cases across Indonesia.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ExportMenu onExport={handleExport} loading={exporting} />
          </div>
        </div>

        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6 border border-red-200">
            {error}
          </div>
        )}

        {/* KPI Cards - Always use Aggregated stats if available to reflect filters, or Global stats as baseline?
            User likely wants to see filtered numbers. "Total Patients" should be "Matching Patients".
         */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Total Matching Patients"
            value={aggregated?.totalMatches || 0}
            icon={<Users className="h-6 w-6 text-blue-600" />}
            subtext="Based on current filters"
          />
          {/* These below might remain global or need different api support for filtered count.
                Currently searchAggregated returns only counts for patients.
                Let's use Global Stats for Centers and Provinces for now as context.
            */}
          <KpiCard
            title="Total Active Centers"
            value={stats?.totalCenters || 0}
            icon={<Building className="h-6 w-6 text-green-600" />}
            subtext="Nationwide"
          />
          <KpiCard
            title="Provinces Covered"
            value={Object.keys(stats?.byProvince || {}).length}
            icon={<MapIcon className="h-6 w-6 text-purple-600" />}
            subtext="Nationwide"
          />
          <KpiCard
            title="Last Updated"
            value={new Date().toLocaleDateString()}
            icon={<Activity className="h-6 w-6 text-orange-600" />}
            subtext="Daily aggregate"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Geographic Distribution</h2>
            {/* 
                    Note: DistributionMap currently takes simple Key-Value.
                    We need to pass data matching the GeoJSON property names (usually Title Case province names).
                    Our backend returns whatever is in DB. Assuming consistent naming.
                 */}
            <DistributionMap data={aggregated?.breakdown.byProvince || {}} />
            {/* Using stats.byProvince for map because searchAggregated doesn't return province breakdown yet in backend logic.
                     Step 737: backend searchUpdatedData returns byGender, byPathology, byStage.
                     I should update backend to return byProvince as well if map should filter.
                     For now, using global map distribution is acceptable for V1 or I can quickly update backend.
                     Decision: Stick to global map for now to avoid scope creep, or update backend if easy.
                     Actually, user wants "Distribution map" which implies seeing distribution of filtered data.
                     But let's stick to global for now as "Context".
                 */}
          </div>

          {/* Geographic Breakdown Tables */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Top Provinces</h3>
              <div className="overflow-auto max-h-64">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Province</th>
                      <th className="px-4 py-2 text-right">Patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(aggregated?.breakdown.byProvince || {})
                      .sort(([, a], [, b]) => b - a)
                      .map(([province, count]) => (
                        <tr key={province} className="border-t">
                          <td className="px-4 py-2">{province}</td>
                          <td className="px-4 py-2 text-right font-medium">{count}</td>
                        </tr>
                      ))}
                    {Object.keys(aggregated?.breakdown.byProvince || {}).length === 0 && (
                      <tr><td colSpan={2} className="px-4 py-4 text-center text-gray-400">No data</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-4">Top Cities/Regencies</h3>
              <div className="overflow-auto max-h-64">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">City/Regency</th>
                      <th className="px-4 py-2 text-right">Patients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(aggregated?.breakdown.byRegency || {})
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 10)
                      .map(([regency, count]) => (
                        <tr key={regency} className="border-t">
                          <td className="px-4 py-2">{regency === 'undefined' || regency === 'null' ? 'Unknown' : regency}</td>
                          <td className="px-4 py-2 text-right font-medium">{count}</td>
                        </tr>
                      ))}
                    {Object.keys(aggregated?.breakdown.byRegency || {}).length === 0 && (
                      <tr><td colSpan={2} className="px-4 py-4 text-center text-gray-400">No data</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Demographics Charts */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Gender Distribution</h2>
              <GenderPieChart data={aggregated?.breakdown.byGender || {}} />
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Cancer Stage</h2>
              <StageBarChart data={aggregated?.breakdown.byStage || {}} />
            </div>
          </div>
        </div>

        {/* Pathology Chart */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Pathology Types</h2>
          <div className="h-96">
            <PathologyBarChart data={aggregated?.breakdown.byPathology || {}} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

const KpiCard = ({ title, value, icon, subtext }: { title: string, value: string | number, icon: React.ReactNode, subtext?: string }) => (
  <div className="bg-white p-6 rounded-lg shadow border border-gray-200 flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
      </div>
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
    </div>
    {subtext && <p className="text-xs text-gray-400 mt-2">{subtext}</p>}
  </div>
);
