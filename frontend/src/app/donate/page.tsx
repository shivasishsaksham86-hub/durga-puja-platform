"use client";

import { useState } from "react";
import { Heart, CreditCard, Sparkles } from "lucide-react";

export default function DonatePage() {
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate Razorpay/Payment Gateway popup
    setTimeout(() => {
      setLoading(false);
      alert(`Successfully donated ₹${amount}. Thank you for your contribution!`);
      setAmount("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-950/50 text-rose-500 mb-6 border border-rose-900/50">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Support Our Festival</h1>
          <p className="text-neutral-400 text-lg">Your generous contributions help us organize cultural events, community feasts, and maintain safety.</p>
        </div>

        <form onSubmit={handleDonate} className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 shadow-2xl">
          <h3 className="text-xl font-bold mb-6">Select Amount</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[101, 501, 1001, 5001].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`py-4 rounded-2xl font-bold border-2 transition-all ${amount === amt ? 'border-primary bg-primary/10 text-primary' : 'border-neutral-800 bg-neutral-800/50 text-neutral-300 hover:border-neutral-700'}`}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-neutral-400 mb-2">Or enter custom amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xl font-bold">₹</span>
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || "")}
                className="w-full pl-10 pr-4 py-4 bg-neutral-800 border-2 border-neutral-700 focus:border-primary rounded-2xl text-xl font-bold transition-colors focus:outline-none"
                placeholder="0"
                min="1"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={!amount || loading}
            className="w-full py-5 bg-primary hover:bg-rose-700 disabled:opacity-50 disabled:hover:bg-primary rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_-5px_rgba(225,29,72,0.6)]"
          >
            {loading ? (
              "Processing Payment..."
            ) : (
              <>Donate {amount ? `₹${amount}` : ''} Securely <CreditCard className="w-6 h-6" /></>
            )}
          </button>
          
          <p className="text-center text-xs text-neutral-500 mt-6 flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3" /> Payments are secured by SSL encryption
          </p>
        </form>
      </div>
    </div>
  );
}
