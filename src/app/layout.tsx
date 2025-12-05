import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuardProvider } from "@/components/auth/AuthGuardProvider";
import { BottomNav } from "@/components/BottomNav";
import { FirestoreWarning } from "@/components/FirestoreWarning";
import { PWAInstaller } from "@/components/PWAInstaller";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ToastProvider } from "@/contexts/ToastContext";
import { QueryProvider } from "@/contexts/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hero's Journey - Fitness App",
  description: "Transform your fitness with personalized workout programs, gamification, and expert coaching",
  manifest: '/manifest.json',
  themeColor: '#7C3AED',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Hero's Journey",
  },
  icons: {
    icon: '/icon-192.svg',
    apple: '/icon-512.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7C3AED" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-512.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <ErrorBoundary>
          <QueryProvider>
            <ToastProvider>
              <PWAInstaller />
              <FirestoreWarning />
              <AuthProvider>
                <AuthGuardProvider>
                  {children}
                  <BottomNav />
                </AuthGuardProvider>
              </AuthProvider>
            </ToastProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
