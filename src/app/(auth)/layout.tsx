import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import "../globals.css";
import { Metadata } from "next";
import { AuthProvider } from "@/lib/context/AuthContext";

export const metadata: Metadata = {
  title: 'Archidiocèse de Moncton',
  description: "Back office de l'Archidiocèse de Moncton",
  keywords: ['église', 'catholique', 'moncton', 'archidiocèse', 'paroisse', 'spiritualité'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
          <AuthProvider>
            <div className="min-h-screen bg-background">
              {children}
            </div>
            <Toaster />
            <SonnerToaster />
          </AuthProvider>
      </body>
    </html>
  )
}
