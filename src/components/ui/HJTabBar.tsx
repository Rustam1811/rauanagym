'use client';

// components/ui/hj-tab-bar.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Dumbbell, User } from 'lucide-react';

const items = [
  { href: '/hero/home', label: 'HOME', icon: Home },
  { href: '/hero/arena', label: 'WORKOUTS', icon: Dumbbell },
  { href: '/hero/profile', label: 'PROFILE', icon: User },
];

export function HJTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-transparent pb-4">
      <div className="flex h-16 w-full max-w-md items-center justify-between rounded-3xl bg-white/80 px-6 shadow-hj backdrop-blur-2xl mx-4">
        {items.map((item) => {
          const active = pathname?.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <div
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold transition-all duration-200 ${
                  active
                    ? 'bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white shadow-hj-inner'
                    : 'text-hj-textSoft'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
