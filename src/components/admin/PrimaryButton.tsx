import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

export default function PrimaryButton({ 
  children, 
  onClick, 
  icon: Icon, 
  disabled = false,
  type = 'button'
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="
        inline-flex items-center justify-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3
        bg-gradient-to-r from-hj-primary to-hj-primarySoft
        text-white font-semibold text-sm lg:text-base
        rounded-full shadow-hj
        hover:shadow-hj-strong hover:scale-105
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        transition-all duration-200
      "
    >
      {Icon && <Icon className="w-4 h-4 lg:w-5 lg:h-5" />}
      {children}
    </button>
  );
}
