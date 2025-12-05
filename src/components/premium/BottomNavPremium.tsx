'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Dumbbell, User, Target, Trophy } from 'lucide-react';

export default function BottomNavPremium() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/hero/home' },
    { id: 'workouts', label: 'Workouts', icon: Dumbbell, path: '/hero/workouts' },
    { id: 'programs', label: 'Programs', icon: Target, path: '/hero/programs' },
    { id: 'arena', label: 'Arena', icon: Trophy, path: '/hero/arena' },
    { id: 'profile', label: 'Profile', icon: User, path: '/hero/profile' },
  ];

  const handleNav = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 px-4">
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] opacity-20 blur-2xl rounded-full" />
        
        {/* Navigation container */}
        <div className="relative flex items-center justify-around rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.15)] py-3 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(item.path + '/');
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.path)}
                className="flex-1 flex justify-center group"
              >
                <div
                  className={`relative flex flex-col items-center gap-1.5 rounded-2xl px-4 py-2.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#A78BFA] via-[#F9A8D4] to-[#FDE68A] shadow-lg scale-105'
                      : 'hover:bg-white/10 active:scale-95'
                  }`}
                >
                  {/* Icon Container */}
                  <div className="relative">
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                      }`}
                      strokeWidth={2}
                    />
                    
                    {/* Active Indicator Glow */}
                    {isActive && (
                      <div className="absolute inset-0 bg-white/30 blur-md rounded-full" />
                    )}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Active Dot */}
                  {isActive && (
                    <div className="absolute -top-1 w-1.5 h-1.5 bg-white rounded-full shadow-lg" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
