import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: "Hero's Journey - Fitness App",
  description: 'Твой путь к легендарной форме',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Hero's Journey",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#7C3AED',
};

export default function HeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
