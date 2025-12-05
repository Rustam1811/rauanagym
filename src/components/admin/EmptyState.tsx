'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel,
  actionHref 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-4">
      <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-hj-cardSoft border border-gray-200 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 lg:w-10 lg:h-10 text-hj-textSoft" />
      </div>
      
      <h3 className="text-xl lg:text-2xl font-bold text-hj-textMain mb-2 text-center">{title}</h3>
      <p className="text-sm lg:text-base text-hj-textSoft text-center max-w-md mb-8">{description}</p>
      
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
