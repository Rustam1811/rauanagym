'use client';

import { Bell, Search, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminTopbar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('admin-phone');
    localStorage.removeItem('user-phone');
    router.push('/hero/phone-login');
  };

  return (
    <header className="h-16 lg:h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 ml-0 lg:ml-0 shadow-sm">
      {/* Search - hidden on mobile, shown on tablet+ */}
      <div className="flex-1 max-w-xl hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hj-textSoft" />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-10 pr-4 py-2 
              bg-hj-cardSoft border border-gray-200 rounded-2xl
              text-hj-textMain placeholder:text-hj-textSoft text-sm
              focus:outline-none focus:ring-2 focus:ring-hj-primary/30 focus:border-hj-primary
              transition-all duration-200
            "
          />
        </div>
      </div>

      {/* Mobile: Just show icons on the right */}
      <div className="flex-1 md:hidden" />

      {/* Right Side */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Mobile Search Button */}
        <button className="md:hidden p-2 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all duration-200">
          <Search className="w-5 h-5 text-hj-textSoft" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all duration-200 group">
          <Bell className="w-5 h-5 text-hj-textSoft group-hover:text-hj-textMain transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-hj-primary to-hj-primarySoft rounded-full text-[10px] font-bold text-white flex items-center justify-center shadow-hj">
            3
          </span>
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 border border-gray-200 transition-all duration-200 group">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-hj">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-semibold text-hj-textMain">Admin</p>
            <p className="text-xs text-hj-textSoft">+7777777777</p>
          </div>
        </button>

        {/* Logout */}
        <button 
          onClick={handleLogout}
          className="p-2 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 transition-all duration-200 group"
          title="Logout"
        >
          <LogOut className="w-5 h-5 text-red-500 group-hover:text-red-600 transition-colors" />
        </button>
      </div>
    </header>
  );
}
