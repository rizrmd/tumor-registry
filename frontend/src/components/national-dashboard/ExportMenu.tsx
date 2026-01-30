import React from 'react';
import { Download } from 'lucide-react';

interface ExportMenuProps {
    onExport: () => void;
    loading?: boolean;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ onExport, loading }) => {
    return (
        <button
            onClick={onExport}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <Download className="mr-2 h-4 w-4 text-gray-500" />
            {loading ? 'Exporting...' : 'Export Data (CSV)'}
        </button>
    );
};

export default ExportMenu;
