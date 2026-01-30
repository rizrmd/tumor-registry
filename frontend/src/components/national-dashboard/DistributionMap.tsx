'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
import L from 'leaflet';
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface DistributionMapProps {
    data: Record<string, number>; // province -> count
}

const DistributionMap: React.FC<DistributionMapProps> = ({ data }) => {
    const [geoJsonData, setGeoJsonData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch Indonesia GeoJSON
        fetch('https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia-province-simple.json')
            .then(res => {
                if (!res.ok) throw new Error('Failed to load map data');
                return res.json();
            })
            .then(data => {
                setGeoJsonData(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Map loading error:', err);
                // Fallback or retry logic could go here
                setLoading(false);
            });
    }, []);

    const getColor = (d: number) => {
        return d > 50 ? '#800026' :
            d > 20 ? '#BD0026' :
                d > 10 ? '#E31A1C' :
                    d > 5 ? '#FC4E2A' :
                        d > 2 ? '#FD8D3C' :
                            d > 0 ? '#FEB24C' :
                                '#FFEDA0';
    };

    const style = (feature: any) => {
        const provinceName = feature.properties.Propinsi; // Adjust property name based on GeoJSON
        const count = data[provinceName] || 0;

        return {
            fillColor: getColor(count),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7
        };
    };

    const onEachFeature = (feature: any, layer: any) => {
        const provinceName = feature.properties.Propinsi;
        const count = data[provinceName] || 0;
        layer.bindTooltip(`<strong>${provinceName}</strong><br/>${count} Patients`, {
            permanent: false,
            direction: 'top'
        });

        layer.on({
            mouseover: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.9
                });
                layer.bringToFront();
            },
            mouseout: (e: any) => {
                // Reset style
                // Note: In real implementation, need ref to reset correctly or use state
                const layer = e.target;
                layer.setStyle({
                    weight: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                });
            }
        });
    };

    if (loading) {
        return <div className="h-96 flex items-center justify-center bg-gray-100 rounded-lg">Loading Map...</div>;
    }

    if (!geoJsonData) {
        return (
            <div className="h-96 flex flex-col items-center justify-center bg-gray-100 rounded-lg text-gray-500">
                <p>Map data unavailable.</p>
                <p className="text-sm">Could not load GeoJSON.</p>
            </div>
        );
    }

    return (
        <div className="h-96 w-full bg-white rounded-lg shadow border overflow-hidden relative z-0">
            {/* z-0 important for leaflet */}
            <MapContainer
                center={[-2.5, 118]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <GeoJSON
                    data={geoJsonData}
                    style={style}
                    onEachFeature={onEachFeature}
                />
            </MapContainer>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white p-2 text-xs rounded shadow z-[400] opacity-90">
                <div className="font-bold mb-1">Patient Count</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 block" style={{ background: '#800026' }}></span> &gt; 50</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 block" style={{ background: '#BD0026' }}></span> 20 - 50</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 block" style={{ background: '#E31A1C' }}></span> 10 - 20</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 block" style={{ background: '#FC4E2A' }}></span> 5 - 10</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 block" style={{ background: '#FFEDA0' }}></span> 0 - 5</div>
            </div>
        </div>
    );
};

export default DistributionMap;
