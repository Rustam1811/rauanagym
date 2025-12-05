interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function PrimaryButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}: PrimaryButtonProps) {
  const baseStyles = 'rounded-full font-bold tracking-tight active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-[#7C3AED] text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] hover:bg-[#9F6AEE]',
    secondary: 'bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
    ghost: 'bg-transparent text-[#7C3AED] hover:bg-[#7C3AED]/10',
  };

  const sizeStyles = {
    sm: 'py-2.5 px-5 text-sm',
    md: 'py-3.5 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
