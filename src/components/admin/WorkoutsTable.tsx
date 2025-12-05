'use client';

import Link from 'next/link';
import { Edit, Eye, EyeOff, Dumbbell } from 'lucide-react';
import { Workout } from '@/types/admin';
import { updateWorkout } from '@/lib/firebase/admin/workouts';
import { useState } from 'react';
import EmptyState from './EmptyState';

interface WorkoutsTableProps {
  workouts: Workout[];
}

export default function WorkoutsTable({ workouts: initialWorkouts }: WorkoutsTableProps) {
  const [workouts, setWorkouts] = useState(initialWorkouts);

  const togglePublish = async (workout: Workout) => {
    try {
      const updated = await updateWorkout(workout.id, {
        isPublished: !workout.isPublished
      });
      
      setWorkouts(prev => 
        prev.map(w => w.id === workout.id ? updated : w)
      );
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
    }
  };

  if (workouts.length === 0) {
    return (
      <EmptyState
        icon={Dumbbell}
        title="Нет тренировок"
        description="Создайте первую тренировку для вашей фитнес-платформы"
        actionLabel="Создать тренировку"
        actionHref="/admin/workouts/new"
      />
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 lg:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Title</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden md:table-cell">Category</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden lg:table-cell">Difficulty</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden xl:table-cell">Duration</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden xl:table-cell">XP</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Status</th>
              <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden lg:table-cell">Updated</th>
              <th className="text-right text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id} className="border-b border-gray-100 hover:bg-hj-cardSoft transition-colors">
              <td className="py-3 lg:py-4 px-3 lg:px-4">
                <div>
                  <p className="text-hj-textMain font-semibold text-sm lg:text-base">{workout.title}</p>
                  <p className="text-hj-textSoft text-xs">{workout.slug}</p>
                </div>
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 hidden md:table-cell">
                <span className="inline-flex items-center px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {workout.category}
                </span>
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 hidden lg:table-cell">
                <span className={`inline-flex items-center px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-lg text-xs font-medium ${
                  workout.difficulty === 'beginner' 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                    : workout.difficulty === 'intermediate'
                    ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {workout.difficulty}
                </span>
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-sm hidden xl:table-cell">{workout.durationMinutes} min</td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-sm hidden xl:table-cell">{workout.xp}</td>
              <td className="py-3 lg:py-4 px-3 lg:px-4">
                <button
                  onClick={() => togglePublish(workout)}
                  className={`inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    workout.isPublished
                      ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                      : 'bg-gray-100 text-hj-textSoft border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {workout.isPublished ? (
                    <>
                      <Eye className="w-3 h-3" />
                      <span className="hidden lg:inline">Published</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3 h-3" />
                      <span className="hidden lg:inline">Draft</span>
                    </>
                  )}
                </button>
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-xs lg:text-sm hidden lg:table-cell">
                {new Date(workout.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-right">
                <Link
                  href={`/admin/workouts/${workout.id}`}
                  className="inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 text-xs font-medium transition-all"
                >
                  <Edit className="w-3 h-3" />
                  <span className="hidden lg:inline">Edit</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
