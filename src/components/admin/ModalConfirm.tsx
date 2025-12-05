'use client';

interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ModalConfirm({ isOpen, onClose, onConfirm, title, message }: ModalConfirmProps) {
  if (!isOpen) return null;

  return (
    <div>
      {/* Modal UI */}
    </div>
  );
}
