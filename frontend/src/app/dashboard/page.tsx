"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import api from "@/lib/api";
import { QrCode, Calendar, MapPin, Loader2 } from "lucide-react";

export default function VisitorDashboard() {
  const router = useRouter();
  const [passes, setPasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch the user's passes from the backend here
    // For now we mock it to demonstrate the UI
    setTimeout(() => {
      setPasses([
        { id: '1', eventTitle: 'Maha Ashtami Aarti', date: '2026-10-18T18:00:00Z', gateNumber: 3, qrCodeHash: 'mock-qr-hash-12345', status: 'VALID' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>
        
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <QrCode className="text-primary" /> My VIP Passes
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passes.map((pass) => (
            <div key={pass.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-orange-500" />
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold mb-2">{pass.eventTitle}</h3>
                  <p className="text-neutral-400 flex items-center gap-2 text-sm mb-1">
                    <Calendar className="w-4 h-4" /> {new Date(pass.date).toLocaleString()}
                  </p>
                  <p className="text-neutral-400 flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" /> Gate {pass.gateNumber}
                  </p>
                </div>
                <div className="bg-white p-2 rounded-xl">
                  <QRCodeSVG value={pass.qrCodeHash} size={80} />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-neutral-800">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${pass.status === 'VALID' ? 'bg-green-950/50 text-green-400 border border-green-900/50' : 'bg-neutral-800 text-neutral-400'}`}>
                  {pass.status}
                </span>
                <span className="text-xs text-neutral-500 font-mono">ID: {pass.id}</span>
              </div>
            </div>
          ))}
          {passes.length === 0 && (
            <p className="text-neutral-500">You don't have any passes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
