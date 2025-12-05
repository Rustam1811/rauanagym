'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getPrograms } from '@/lib/firebase/admin/programs';
import { Program } from '@/types/admin';
import AdminCard from '@/components/admin/AdminCard';
import ProgramsTable from '@/components/admin/ProgramsTable';
import PrimaryButton from '@/components/admin/PrimaryButton';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrograms = async () => {
      const data = await getPrograms();
      setPrograms(data);
      setLoading(false);
    };
    loadPrograms();
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-hj-textMain mb-1">Programs</h1>
          <p className="text-hj-textSoft">Manage workout programs and training plans</p>
        </div>
        <Link href="/admin/programs/new">
          <PrimaryButton icon={Plus}>
            Create Program
          </PrimaryButton>
        </Link>
      </div>

      <AdminCard>
        <ProgramsTable programs={programs} onUpdate={() => {
          const loadPrograms = async () => {
            const data = await getPrograms();
            setPrograms(data);
          };
          loadPrograms();
        }} />
      </AdminCard>
    </div>
  );
}
