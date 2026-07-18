"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet icon issue in Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const center: [number, number] = [22.5726, 88.3639]; // Example: Kolkata coordinates

export default function MapComponent() {
  return (
    <div className="h-full w-full rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(225,29,72,0.3)] border border-neutral-800 relative z-0">
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark theme map tiles
        />
        
        {/* Main Pandal */}
        <Marker position={center} icon={icon}>
          <Popup>
            <div className="text-neutral-900 font-bold">MahaPuja Main Pandal</div>
            <div className="text-sm text-neutral-600">Gate 1 & VIP Entry</div>
          </Popup>
        </Marker>
        <Circle center={center} radius={300} pathOptions={{ color: '#e11d48', fillColor: '#e11d48', fillOpacity: 0.2 }} />

        {/* Food Court */}
        <Marker position={[22.575, 88.36]} icon={icon}>
          <Popup>
            <div className="text-neutral-900 font-bold">Food Stalls</div>
          </Popup>
        </Marker>

        {/* Medical Camp */}
        <Marker position={[22.57, 88.368]} icon={icon}>
          <Popup>
            <div className="text-red-600 font-bold">Medical Emergency Camp</div>
          </Popup>
        </Marker>

      </MapContainer>
    </div>
  );
}
