'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminGuard from '@/components/admin/AdminGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        {/* Background Effects - Hero Journey Style */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-200/40 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-100/40 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="relative flex min-h-screen">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
            {/* Topbar */}
            <AdminTopbar />

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 lg:p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
