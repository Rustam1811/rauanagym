'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Dumbbell, 
  ListTree, 
  Shield, 
  Users, 
  Settings,
  Zap,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Dumbbell, label: 'Workouts', href: '/admin/workouts' },
  { icon: ListTree, label: 'Programs', href: '/admin/programs' },
  { icon: Shield, label: 'Arena', href: '/admin/arena' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-2xl bg-white shadow-hj border border-gray-200 text-hj-textMain"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200 
        flex flex-col shadow-hj
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200 mt-16 lg:mt-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-hj">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-hj-textMain">Admin Panel</h1>
            <p className="text-xs text-hj-textSoft">Fitness Platform</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white shadow-hj' 
                    : 'text-hj-textSoft hover:text-hj-textMain hover:bg-hj-cardSoft'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? '' : 'group-hover:scale-110'}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-white shadow-hj-inner" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-green-700">System Online</p>
                <p className="text-xs text-green-600/70">All services running</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
