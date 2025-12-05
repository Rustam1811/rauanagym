'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, User } from 'lucide-react';

const tabs = [
  { id: 'home', label: 'Главная', icon: Home, href: '/hero/home' },
  { id: 'arena', label: 'Арена', icon: Trophy, href: '/hero/arena' },
  { id: 'profile', label: 'Профиль', icon: User, href: '/hero/profile' },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 h-20 bg-white/80 dark:bg-black/40 backdrop-blur-2xl border-t border-white/30 flex items-center justify-around z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className="flex flex-col items-center justify-center flex-1 h-full transition-all duration-200"
          >
            {isActive ? (
              <div className="flex flex-col items-center gap-1.5 px-6 py-2.5 bg-[#7C3AED] rounded-full shadow-strong">
                <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                <span className="text-xs font-bold text-white tracking-tight">{tab.label}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <Icon className="w-6 h-6 text-gray-400" strokeWidth={2} />
                <span className="text-xs text-gray-500">{tab.label}</span>
              </div>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
