import { HeaderSection } from "@/components/sections/HeaderSection";
import { Sidebar } from "@/components/ui/sidebar";
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            {/* <NavigationSidebarSection /> */}
            <main className="flex-1 transition-all duration-300">
              <HeaderSection />
              {children}
            </main>
          </div>
        </div>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
