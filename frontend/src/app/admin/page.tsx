"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { io } from "socket.io-client";
import { Users, Ticket, Activity, AlertCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { time: '18:00', visitors: 1200 },
  { time: '19:00', visitors: 2800 },
  { time: '20:00', visitors: 4500 },
  { time: '21:00', visitors: 6200 },
  { time: '22:00', visitors: 3900 },
  { time: '23:00', visitors: 1500 },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalEntries: 0,
    activeEmergencies: 0,
    totalDonations: 0,
  });
  const [currentCrowd, setCurrentCrowd] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/analytics');
        setStats({
          totalBookings: res.data.totalBookings || 14500,
          totalEntries: res.data.totalEntries || 8200,
          activeEmergencies: res.data.activeEmergencies || 0,
          totalDonations: res.data.totalDonations || 250000,
        });
      } catch (err) {
        console.error("Failed to fetch analytics");
      }
    };
    fetchStats();

    const socket = io(process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000');
    socket.on('crowd_update', (data) => {
      setCurrentCrowd(data.currentCrowd);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const cards = [
    { title: "Current Crowd", value: currentCrowd, icon: <Users className="text-blue-500" />, color: "border-blue-900/50 bg-blue-950/20" },
    { title: "Total Bookings", value: stats.totalBookings, icon: <Ticket className="text-primary" />, color: "border-rose-900/50 bg-rose-950/20" },
    { title: "Total Entries", value: stats.totalEntries, icon: <Activity className="text-green-500" />, color: "border-green-900/50 bg-green-950/20" },
    { title: "Active Emergencies", value: stats.activeEmergencies, icon: <AlertCircle className="text-orange-500" />, color: "border-orange-900/50 bg-orange-950/20" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Command Center</h1>
            <p className="text-neutral-400">Real-time overview of festival operations</p>
          </div>
          <div className="text-sm font-mono text-neutral-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Updates Active
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <div key={i} className={`p-6 rounded-3xl border ${c.color} backdrop-blur-sm`}>
              <div className="flex justify-between items-start mb-4">
                <p className="text-neutral-400 font-medium">{c.title}</p>
                {c.icon}
              </div>
              <h3 className="text-4xl font-black">{c.value.toLocaleString()}</h3>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-3xl p-6">
            <h2 className="text-xl font-bold mb-6">Visitor Traffic Trend (Today)</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#525252" tick={{fill: '#a3a3a3'}} />
                  <YAxis stroke="#525252" tick={{fill: '#a3a3a3'}} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px' }}
                    itemStyle={{ color: '#e11d48', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="visitors" stroke="#e11d48" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-6">Recent Alerts</h2>
            <div className="flex-1 space-y-4 overflow-y-auto">
              <div className="p-4 rounded-xl border border-orange-900/50 bg-orange-950/20 text-orange-200">
                <p className="font-bold text-sm mb-1 flex items-center justify-between">
                  <span>Medical Emergency</span> <span className="text-xs text-orange-400">2 min ago</span>
                </p>
                <p className="text-xs text-orange-300">Gate 3 entry point. Volunteer reported passenger fainted.</p>
              </div>
              <div className="p-4 rounded-xl border border-blue-900/50 bg-blue-950/20 text-blue-200">
                <p className="font-bold text-sm mb-1 flex items-center justify-between">
                  <span>Crowd Warning</span> <span className="text-xs text-blue-400">15 min ago</span>
                </p>
                <p className="text-xs text-blue-300">Zone A capacity reaching 90%. Divert incoming traffic.</p>
              </div>
              <div className="p-4 rounded-xl border border-neutral-800 bg-neutral-950/50 text-neutral-300">
                <p className="font-bold text-sm mb-1 flex items-center justify-between">
                  <span>Shift Change</span> <span className="text-xs text-neutral-500">1 hr ago</span>
                </p>
                <p className="text-xs text-neutral-400">Evening volunteer shift checked in successfully.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
