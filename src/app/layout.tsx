import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthGuardProvider } from "@/components/auth/AuthGuardProvider";
import { BottomNav } from "@/components/BottomNav";
import { FirestoreWarning } from "@/components/FirestoreWarning";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitCoach - Your Personal Fitness Journey",
  description: "Transform your fitness with personalized workout programs, gamification, and expert coaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <FirestoreWarning />
        <AuthProvider>
          <AuthGuardProvider>
            {children}
            <BottomNav />
          </AuthGuardProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
