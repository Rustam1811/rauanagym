'use client';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
}

export default function GradientButton({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}: GradientButtonProps) {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        px-6 py-3 rounded-xl
        bg-gradient-to-r from-blue-500 to-purple-600
        text-white font-medium
        shadow-lg shadow-blue-500/20
        hover:shadow-xl hover:shadow-blue-500/30
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}
