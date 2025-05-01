import { Sidebar } from "@/components/ui/sidebar";
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import HeaderSection from "@/components/sections/HeaderSection/HeaderSection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Archidiocèse de Moncton',
  description: "Back office de l'Archidiocèse de Moncton",
  keywords: ['église', 'catholique', 'moncton', 'archidiocèse', 'paroisse', 'spiritualité'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}>
        <div className="min-h-screen bg-background">
          <div className="flex flex-row">
            <Sidebar />
            <main className="flex-1 transition-all duration-300 bg-[#f0f0f4]">
              <HeaderSection />
              <div className="h-[calc(100%-64px)] min-w-full overflow-y-scroll">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}