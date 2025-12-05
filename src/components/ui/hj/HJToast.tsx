// components/ui/hj/HJToast.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface HJToastProps extends Toast {
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const variantClasses = {
  success: 'border-green-500/50 bg-green-50/90 dark:bg-green-900/30',
  error: 'border-red-500/50 bg-red-50/90 dark:bg-red-900/30',
  warning: 'border-yellow-500/50 bg-yellow-50/90 dark:bg-yellow-900/30',
  info: 'border-blue-500/50 bg-blue-50/90 dark:bg-blue-900/30',
};

const iconColors = {
  success: 'text-green-600 dark:text-green-400',
  error: 'text-red-600 dark:text-red-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
};

export function HJToast({ id, message, variant, duration = 5000, onClose }: HJToastProps) {
  const Icon = icons[variant];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        flex items-center gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-hj
        ${variantClasses[variant]}
        animate-slide-up
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColors[variant]}`} />
      <p className="flex-1 text-sm font-medium text-hj-textMain">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <X className="w-4 h-4 text-hj-textSoft" />
      </button>
    </div>
  );
}

// Toast Container
interface HJToastContainerProps {
  toasts: Toast[];
  onClose: (id: string) => void;
}

export function HJToastContainer({ toasts, onClose }: HJToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-[200] flex flex-col gap-2 max-w-md">
      {toasts.map((toast) => (
        <HJToast key={toast.id} {...toast} onClose={onClose} />
      ))}
    </div>
  );
}

// Hook for toast management
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, variant: ToastVariant = 'info', duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, variant, duration }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    addToast,
    removeToast,
    success: (message: string, duration?: number) => addToast(message, 'success', duration),
    error: (message: string, duration?: number) => addToast(message, 'error', duration),
    warning: (message: string, duration?: number) => addToast(message, 'warning', duration),
    info: (message: string, duration?: number) => addToast(message, 'info', duration),
  };
}
