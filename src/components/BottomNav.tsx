'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, User, Target, Trophy } from 'lucide-react';

const navItems = [
  { href: '/hero/home', label: 'Home', icon: Home },
  { href: '/hero/workouts', label: 'Workouts', icon: Dumbbell },
  { href: '/hero/programs', label: 'Programs', icon: Target },
  { href: '/hero/arena', label: 'Arena', icon: Trophy },
  { href: '/hero/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4">
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] opacity-20 blur-2xl rounded-full" />
        
        {/* Navigation container */}
        <div className="relative flex items-center justify-around rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] py-3 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex-1 flex justify-center"
              >
                <div
                  className={`flex flex-col items-center gap-1.5 rounded-2xl px-4 py-2.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] shadow-lg scale-105'
                      : 'hover:bg-white/10 active:scale-95'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? 'text-white' : 'text-gray-600'
                    }`}
                    strokeWidth={2}
                  />
                  <span 
                    className={`text-[9px] font-semibold uppercase tracking-wider transition-colors ${
                      isActive ? 'text-white' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

