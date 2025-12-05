'use client';

import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

export default function Toast({ message, type = 'info' }: ToastProps) {
  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    info: 'from-blue-500 to-cyan-600',
  };

  const Icon = icons[type];

  return (
    <div className={`
      flex items-center gap-3 px-6 py-4 rounded-xl
      bg-gradient-to-r ${colors[type]}
      text-white font-medium shadow-lg
      animate-in slide-in-from-right duration-300
    `}>
      <Icon className="w-5 h-5" />
      <span>{message}</span>
    </div>
  );
}
