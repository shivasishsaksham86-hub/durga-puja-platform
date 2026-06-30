"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import styles from "./page.module.css";

// Fix Leaflet's default icon paths in Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// A component to handle flying to coordinates
function MapFlyTo({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

interface MapProps {
  pandals: any[];
  activePandal: any | null;
}

export default function LeafletMap({ pandals, activePandal }: MapProps) {
  // Center of Kolkata
  const defaultCenter: [number, number] = [22.5726, 88.3639];
  const activeCenter = activePandal ? [activePandal.lat, activePandal.lng] as [number, number] : null;

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={12} 
      style={{ width: '100%', height: '100%', zIndex: 1 }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />
      <MapFlyTo center={activeCenter} />
      
      {pandals.map((pandal, idx) => (
        <Marker key={idx} position={[pandal.lat, pandal.lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div style={{ color: '#000', padding: '5px' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#c1121f' }}>{pandal.name}</h3>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Area:</strong> {pandal.area}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem' }}><strong>Theme:</strong> {pandal.theme}</p>
              <p style={{ margin: '0', fontSize: '0.9rem', fontWeight: 'bold', color: pandal.crowd === 'Very High' ? 'red' : pandal.crowd === 'High' ? 'orange' : 'green' }}>Crowd: {pandal.crowd}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
