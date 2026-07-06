"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function BookPass() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setLoading(true);
    try {
      // Hardcoded eventId for demo purposes
      await api.post("/passes/book", {
        eventId: "mock-event-id",
        date: "2026-10-18T18:00:00Z",
        gateNumber: 3
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      // Even if backend fails (e.g., event not seeded), we can push to dashboard for demo
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-xl w-full">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-primary to-rose-600" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold tracking-widest uppercase">VIP Access</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">Maha Ashtami Aarti</h1>
          <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
            Experience the divine Aarti from the exclusive VIP enclosure. Avoid the crowds and enjoy a spiritual evening.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-800/50">
              <Calendar className="w-6 h-6 text-orange-400" />
              <div>
                <p className="font-bold">October 18, 2026</p>
                <p className="text-sm text-neutral-400">6:00 PM - 8:00 PM</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleBook}
            disabled={loading}
            className="w-full py-5 bg-primary hover:bg-rose-700 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(225,29,72,0.6)] hover:scale-[1.02]"
          >
            {loading ? "Processing..." : "Claim Free VIP Pass"} <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
