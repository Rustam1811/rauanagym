'use client';

import { useState, useEffect } from 'react';
import { Users, Crown, Shield } from 'lucide-react';
import { getUsers } from '@/lib/firebase/admin/users';
import { AdminUser } from '@/types/admin';
import AdminCard from '@/components/admin/AdminCard';

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    };
    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-hj-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-hj-textMain mb-1">Users</h1>
        <p className="text-hj-textSoft">Manage all platform users</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-hj-textMain">{users.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Admins</p>
              <p className="text-2xl font-bold text-red-600">
                {users.filter(u => u.role === 'admin').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
              <Crown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Total XP</p>
              <p className="text-2xl font-bold text-yellow-600">
                {users.reduce((sum, u) => sum + u.xp, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <Shield className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard title="All Users">
        <div className="space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 transition-colors border border-gray-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center text-white font-bold shadow-hj">
                  {user.displayName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-hj-textMain font-semibold">{user.displayName}</p>
                    {user.role === 'admin' && (
                      <span className="px-2 py-0.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        ADMIN
                      </span>
                    )}
                  </div>
                  <p className="text-hj-textSoft text-sm">{user.email || 'No email'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-hj-textSoft text-xs font-medium">XP</p>
                  <p className="text-yellow-600 font-bold">{user.xp}</p>
                </div>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <p className="text-center text-hj-textSoft py-8">No users yet</p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
