"use client";

import { useState, useEffect } from "react";
import { QrCode, AlertTriangle, Users } from "lucide-react";
import api from "@/lib/api";
import { io } from "socket.io-client";

export default function VolunteerDashboard() {
  const [qrHash, setQrHash] = useState("");
  const [scanResult, setScanResult] = useState<any>(null);
  const [crowd, setCrowd] = useState(0);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
    
    socket.on('crowd_update', (data) => {
      setCrowd(data.currentCrowd);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app this would be populated by a camera scanner
      const res = await api.post("/passes/validate", { qrCodeHash: qrHash });
      setScanResult({ success: true, message: res.data.message, data: res.data.booking });
    } catch (err: any) {
      setScanResult({ success: false, message: err.response?.data?.error || "Invalid Pass" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Volunteer Operations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scanner Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <QrCode className="text-primary" /> Scan Ticket
            </h2>
            <form onSubmit={handleScan} className="flex gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Enter QR Hash (Mock Scanner)" 
                value={qrHash}
                onChange={(e) => setQrHash(e.target.value)}
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl focus:outline-none focus:border-primary text-white"
                required
              />
              <button type="submit" className="px-6 py-3 bg-primary hover:bg-rose-700 rounded-xl font-bold transition-all shadow-[0_0_20px_-5px_rgba(225,29,72,0.6)]">
                Verify
              </button>
            </form>
            
            {scanResult && (
              <div className={`p-4 rounded-xl ${scanResult.success ? 'bg-green-950/50 border border-green-900/50 text-green-400' : 'bg-red-950/50 border border-red-900/50 text-red-400'}`}>
                <h4 className="font-bold mb-1">{scanResult.success ? '✅ Access Granted' : '❌ Access Denied'}</h4>
                <p className="text-sm">{scanResult.message}</p>
                {scanResult.data && (
                  <div className="mt-2 text-sm text-neutral-300">
                    <p>Name: {scanResult.data.userName}</p>
                    <p>Gate: {scanResult.data.gateNumber}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Crowd Control Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Users className="text-blue-500" /> Crowd Monitor
            </h2>
            <div className="text-center mb-8">
              <div className="text-6xl font-black text-white mb-2">{crowd}</div>
              <p className="text-neutral-400">Current Visitors at Pandal</p>
            </div>
            
            <div className="flex gap-4">
              <button className="flex-1 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-xl font-bold text-xl transition-all">
                -1 Exit
              </button>
              <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-xl transition-all shadow-[0_0_20px_-5px_rgba(37,99,235,0.6)]">
                +1 Entry
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Report */}
        <div className="bg-red-950/20 border border-red-900/30 rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-500">
            <AlertTriangle /> Report Emergency
          </h2>
          <p className="text-neutral-400 mb-6">Instantly alert committee members and local authorities.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Medical', 'Lost Child', 'Fire', 'Security'].map(type => (
              <button key={type} className="py-3 px-4 bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 rounded-xl text-sm font-semibold transition-colors">
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
