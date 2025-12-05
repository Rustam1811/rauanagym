'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Trophy } from 'lucide-react';
import { getClans } from '@/lib/firebase/admin/clans';
import { Clan } from '@/types/admin';
import AdminCard from '@/components/admin/AdminCard';

export default function ArenaPage() {
  const [clans, setClans] = useState<Clan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClans = async () => {
      const data = await getClans();
      setClans(data);
      setLoading(false);
    };
    loadClans();
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
        <h1 className="text-2xl font-bold text-hj-textMain mb-1">Arena & Clans</h1>
        <p className="text-hj-textSoft">Manage clans and arena battles</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Total Clans</p>
              <p className="text-2xl font-bold text-hj-textMain">{clans.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
              <Shield className="w-6 h-6 text-hj-primary" />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Total Members</p>
              <p className="text-2xl font-bold text-hj-textMain">
                {clans.reduce((sum, c) => sum + c.membersCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-hj-textSoft text-sm mb-1 font-medium">Active Clans</p>
              <p className="text-2xl font-bold text-hj-textMain">{clans.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard title="All Clans">
        <div className="space-y-3">
          {clans.map((clan) => (
            <div
              key={clan.id}
              className="flex items-center justify-between p-4 rounded-2xl bg-hj-cardSoft hover:bg-gray-200 transition-colors border border-gray-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hj-primary to-hj-primarySoft flex items-center justify-center shadow-hj">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-hj-textMain font-semibold">{clan.name}</p>
                  <p className="text-hj-textSoft text-sm">{clan.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-hj-textSoft text-xs font-medium">Members</p>
                  <p className="text-hj-textMain font-bold">{clan.membersCount}</p>
                </div>
              </div>
            </div>
          ))}
          {clans.length === 0 && (
            <p className="text-center text-hj-textSoft py-8">No clans yet</p>
          )}
        </div>
      </AdminCard>
    </div>
  );
}
