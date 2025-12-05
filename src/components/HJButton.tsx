// components/ui/hj-button.tsx
'use client';

interface HJButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function HJButton({
  label,
  onClick,
  variant = 'primary',
  className = '',
}: HJButtonProps) {
  const base =
    'w-full py-4 rounded-full text-center text-sm font-semibold transition-all duration-200 active:scale-95';
  const styles =
    variant === 'primary'
      ? 'bg-gradient-to-r from-hj-primary to-hj-primarySoft text-white shadow-hj-strong hover:shadow-[0_15px_40px_rgba(124,58,237,0.4)]'
      : 'bg-white/10 text-hj-textMain border border-white/40 backdrop-blur-xl shadow-hj hover:shadow-hj-strong hover:bg-white/15';

  return (
    <button
      type="button"
      className={`${base} ${styles} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
