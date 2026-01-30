import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export const GenderPieChart = ({ data }: { data: Record<string, number> }) => {
    const chartData = {
        labels: Object.keys(data).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)', // Blue
                    'rgba(255, 99, 132, 0.6)', // Red
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <Pie data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />;
};

export const StageBarChart = ({ data }: { data: Record<string, number> }) => {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: 'Patients',
                data: Object.values(data),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    return <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
};

export const PathologyBarChart = ({ data }: { data: Record<string, number> }) => {
    // Top 10 Pathologies
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 10);

    const chartData = {
        labels: sorted.map(d => d[0].replace(/_/g, ' ')),
        datasets: [
            {
                label: 'Patients',
                data: sorted.map(d => d[1]),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Bar
            data={chartData}
            options={{
                indexAxis: 'y' as const,
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { beginAtZero: true }
                }
            }}
        />
    );
};
