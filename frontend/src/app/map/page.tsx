"use client";
import dynamic from 'next/dynamic';
import { MapPin, Coffee, Crosshair } from 'lucide-react';

const Map = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function MapPage() {
  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Interactive Map</h1>
          <p className="text-neutral-400">Navigate the pandal grounds with ease. Find amenities, exits, and events.</p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex-1">
          <h3 className="text-xl font-bold mb-6">Directory</h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 p-3 hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-primary/30">
              <div className="p-2 bg-primary/20 text-primary rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Main Pandal (Gate 1)</p>
                <p className="text-xs text-neutral-400">Current Capacity: 75%</p>
              </div>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-neutral-700">
              <div className="p-2 bg-orange-950 text-orange-500 rounded-lg">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Food Court</p>
                <p className="text-xs text-neutral-400">Open until 2:00 AM</p>
              </div>
            </li>
            <li className="flex items-center gap-4 p-3 hover:bg-neutral-800 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-red-900/50">
              <div className="p-2 bg-red-950 text-red-500 rounded-lg">
                <Crosshair className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-red-400">Medical Camp</p>
                <p className="text-xs text-neutral-400">24/7 Assistance available</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="w-full md:w-2/3 h-[60vh] md:h-[80vh]">
        <Map />
      </div>
    </div>
  );
}
