// contexts/HJToastProvider.tsx
'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useToast, HJToastContainer } from '@/components/ui/hj';

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function HJToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <HJToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  );
}

export function useHJToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useHJToast must be used within HJToastProvider');
  }
  return context;
}
