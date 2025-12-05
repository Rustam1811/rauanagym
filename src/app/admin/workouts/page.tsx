import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getWorkouts } from '@/lib/firebase/admin/workouts';
import AdminCard from '@/components/admin/AdminCard';
import GradientButton from '@/components/admin/GradientButton';
import WorkoutsTable from '@/components/admin/WorkoutsTable';

export default async function WorkoutsPage() {
  const workouts = await getWorkouts();

  return (
    <div className="space-y-4 lg:space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-hj-textMain mb-1 lg:mb-2">Workouts</h1>
          <p className="text-sm lg:text-base text-hj-textSoft">Manage workout library</p>
        </div>
        <Link href="/admin/workouts/new">
          <GradientButton className="w-full lg:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Create Workout
          </GradientButton>
        </Link>
      </div>

      {/* Workouts Table */}
      <AdminCard className="overflow-x-auto">
        <WorkoutsTable workouts={workouts} />
      </AdminCard>
    </div>
  );
}
