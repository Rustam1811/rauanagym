// components/ui/hj/HJModal.tsx
'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { HJCard } from '../../HJCard';
import { HJButton } from '../../HJButton';

interface HJModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function HJModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}: HJModalProps) {
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full ${sizeClasses[size]} mx-4 mb-4 sm:mb-0 animate-slide-up`}
      >
        <HJCard className="relative">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-hj-textSoft/10">
              <h2 className="text-lg font-semibold text-hj-textMain">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-hj-cardSoft transition-colors"
              >
                <X className="w-5 h-5 text-hj-textSoft" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="max-h-[60vh] overflow-y-auto">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="mt-4 pt-4 border-t border-hj-textSoft/10">
              {footer}
            </div>
          )}
        </HJCard>
      </div>
    </div>
  );
}

// Preset modal variations
interface HJConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export function HJConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
}: HJConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <HJModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <div className="flex gap-2">
          <HJButton label={cancelLabel} variant="secondary" onClick={onClose} />
          <HJButton label={confirmLabel} onClick={handleConfirm} />
        </div>
      }
    >
      <p className="text-sm text-hj-textSoft">{message}</p>
    </HJModal>
  );
}
