import Link from "next/link";
import { Sparkles, Calendar, MapPin, QrCode, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-neutral-950/80 to-neutral-950 z-0" />
        
        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-6 ring-1 ring-primary/30">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Sarbojanin Durgotsav 2026</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-primary to-rose-600">
            Divine Grandeur,
            <br /> Digitally Managed.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
            Experience the ultimate Durga Puja festival with real-time crowd updates, 
            instant digital VIP passes, and interactive pandal navigation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link href="/passes" className="px-8 py-4 rounded-full bg-primary hover:bg-rose-700 text-white font-bold transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(225,29,72,0.8)]">
              Book VIP Pass
            </Link>
            <Link href="/map" className="px-8 py-4 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold border border-neutral-700 transition-all">
              Explore Pandal Map
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <QrCode className="w-8 h-8 text-primary" />,
            title: "Digital Ticketing",
            desc: "Skip the lines with our instant QR code based VIP entry passes."
          },
          {
            icon: <ShieldAlert className="w-8 h-8 text-orange-500" />,
            title: "Real-time Safety",
            desc: "Live crowd capacity monitoring and instant emergency reporting."
          },
          {
            icon: <Calendar className="w-8 h-8 text-yellow-500" />,
            title: "Event Schedules",
            desc: "Never miss an Aarti or cultural program with live updates."
          }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-3xl bg-neutral-900 border border-neutral-800 hover:border-primary/50 transition-colors group">
            <div className="mb-4 p-3 rounded-2xl bg-neutral-800/50 inline-block group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
