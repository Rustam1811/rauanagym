interface MainCardProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'glass' | 'gradient';
  padding?: 'compact' | 'default' | 'lg';
  className?: string;
}

export default function MainCard({
  children,
  variant = 'light',
  padding = 'default',
  className = '',
}: MainCardProps) {
  const variantStyles = {
    light: 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.08)]',
    dark: 'bg-[#111827] shadow-[0_16px_40px_rgba(0,0,0,0.35)]',
    glass: 'bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.18)]',
    gradient: 'bg-gradient-to-br from-[#7C3AED] to-[#9F6AEE] shadow-[0_16px_40px_rgba(0,0,0,0.35)]',
  };

  const paddingStyles = {
    compact: 'p-3',
    default: 'p-5',
    lg: 'p-6',
  };

  return (
    <div
      className={`
        rounded-[28px]
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}
