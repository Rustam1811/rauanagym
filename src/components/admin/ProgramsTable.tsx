'use client';

import { useState } from 'react';
import { Edit, Eye, EyeOff, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { Program } from '@/types/admin';
import { updateProgram } from '@/lib/firebase/admin/programs';
import EmptyState from './EmptyState';

interface ProgramsTableProps {
  programs: Program[];
  onUpdate: () => void;
}

export default function ProgramsTable({ programs, onUpdate }: ProgramsTableProps) {
  const [updating, setUpdating] = useState<string | null>(null);

  const togglePublish = async (program: Program) => {
    setUpdating(program.id);
    await updateProgram(program.id, { isPublished: !program.isPublished });
    onUpdate();
    setUpdating(null);
  };

  if (programs.length === 0) {
    return (
      <EmptyState
        icon={Dumbbell}
        title="No programs yet"
        description="Create your first workout program to get started"
        actionLabel="Create Program"
        actionHref="/admin/programs/new"
      />
    );
  }

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Title</th>
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden md:table-cell">Level</th>
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden lg:table-cell">Weeks</th>
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden xl:table-cell">Workouts</th>
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Status</th>
            <th className="text-left text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap hidden lg:table-cell">Updated</th>
            <th className="text-right text-hj-textSoft text-xs lg:text-sm font-semibold py-3 px-3 lg:px-4 whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((program) => (
            <tr key={program.id} className="border-b border-gray-100 hover:bg-hj-cardSoft transition-colors">
              <td className="py-3 lg:py-4 px-3 lg:px-4">
                <div>
                  <p className="text-hj-textMain font-semibold text-sm lg:text-base">{program.title}</p>
                  <p className="text-hj-textSoft text-xs">{program.slug}</p>
                </div>
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-sm hidden md:table-cell capitalize">{program.level}</td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-sm hidden lg:table-cell">{program.weeks}</td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-hj-textSoft text-sm hidden xl:table-cell">
                {program.workoutIds.length} workouts
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4">
                <button
                  onClick={() => togglePublish(program)}
                  disabled={updating === program.id}
                  className={`inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    program.isPublished
                      ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200'
                      : 'bg-gray-100 text-hj-textSoft border border-gray-200 hover:bg-gray-200'
                  } ${updating === program.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {program.isPublished ? (
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
                {new Date(program.updatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 lg:py-4 px-3 lg:px-4 text-right">
                <Link
                  href={`/admin/programs/${program.id}`}
                  className="inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-1 lg:py-1.5 rounded-lg bg-hj-cardSoft text-hj-textMain border border-gray-200 hover:bg-gray-200 transition-all text-xs lg:text-sm font-medium"
                >
                  <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
