import type { Metadata } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import NavigationButtons from "../components/NavigationButtons";

export const metadata: Metadata = {
  title: "Durga Puja Kolkata | UNESCO Intangible Cultural Heritage",
  description: "Experience the magic, art, and culture of Kolkata's Durga Puja. A smart digital platform to preserve and promote this UNESCO-recognized living heritage.",
};

import FestiveDecorations from "../components/FestiveDecorations";
import VolumeControl from "../components/VolumeControl";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FestiveDecorations />
        <VolumeControl />
        <main>{children}</main>
        <NavigationButtons />
      </body>
    </html>
  );
}
