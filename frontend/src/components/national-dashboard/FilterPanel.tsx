import React from 'react';
import { Filter } from 'lucide-react';

interface FilterPanelProps {
    filters: any;
    onChange: (filters: any) => void;
    onSearch: () => void;
    loading?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange, onSearch, loading }) => {
    const handleChange = (key: string, value: any) => {
        // If value is empty string, remove key
        const newFilters = { ...filters };
        if (value === '' || value === undefined) {
            delete newFilters[key];
        } else {
            newFilters[key] = value;
        }
        onChange(newFilters);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow border border-gray-200 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <h3 className="font-semibold text-gray-700">Filter Data Analytics</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                    <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={filters.province || ''}
                        onChange={(e) => handleChange('province', e.target.value)}
                    >
                        <option value="">All Provinces</option>
                        <option value="Jawa Timur">Jawa Timur</option>
                        <option value="DKI Jakarta">DKI Jakarta</option>
                        <option value="Jawa Barat">Jawa Barat</option>
                        <option value="Jawa Tengah">Jawa Tengah</option>
                        <option value="DI Yogyakarta">DI Yogyakarta</option>
                        <option value="Bali">Bali</option>
                        <option value="Sulawesi Selatan">Sulawesi Selatan</option>
                        <option value="Sumatera Utara">Sumatera Utara</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City/Regency</label>
                    <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={filters.regency || ''}
                        onChange={(e) => handleChange('regency', e.target.value)}
                        placeholder="e.g. Surabaya"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cancer Stage</label>
                    <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={filters.cancerStage || ''}
                        onChange={(e) => handleChange('cancerStage', e.target.value)}
                    >
                        <option value="">All Stages</option>
                        <option value="I">Stage I</option>
                        <option value="II">Stage II</option>
                        <option value="III">Stage III</option>
                        <option value="IV">Stage IV</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={filters.gender || ''}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <option value="">All Genders</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
                            value={filters.startDate || ''}
                            onChange={(e) => handleChange('startDate', e.target.value)}
                            placeholder="Start"
                        />
                        <input
                            type="date"
                            className="w-full rounded-md border-gray-300 shadow-sm p-2 border text-xs"
                            value={filters.endDate || ''}
                            onChange={(e) => handleChange('endDate', e.target.value)}
                            placeholder="End"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={onSearch}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-medium text-sm flex items-center"
                >
                    {loading ? 'Applying Filters...' : 'Apply Filters'}
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
