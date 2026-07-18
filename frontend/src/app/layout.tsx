import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Durga Puja Platform",
  description: "Real-time management for Durga Puja festivals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen flex flex-col`}>
        <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tighter text-primary">
              MahaPuja
            </Link>
            <div className="flex gap-6 items-center text-sm font-medium">
              <Link href="/events" className="text-neutral-300 hover:text-white transition-colors">Events</Link>
              <Link href="/map" className="text-neutral-300 hover:text-white transition-colors">Map</Link>
              <Link href="/donate" className="text-neutral-300 hover:text-white transition-colors">Donate</Link>
              <Link href="/login" className="px-4 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
