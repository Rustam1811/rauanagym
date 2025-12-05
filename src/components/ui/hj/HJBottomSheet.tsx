// components/ui/hj/HJBottomSheet.tsx
'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface HJBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
}

export function HJBottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: HJBottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="relative w-full bg-white dark:bg-hj-card rounded-t-3xl shadow-hj-strong animate-slide-up max-h-[90vh] overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 bg-hj-textSoft/30 rounded-full" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 pb-4 border-b border-hj-textSoft/10">
            <h2 className="text-lg font-semibold text-hj-textMain">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-hj-cardSoft transition-colors"
            >
              <X className="w-5 h-5 text-hj-textSoft" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-5 py-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
