interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
}

export default function SectionTitle({ children, className = '', subtitle }: SectionTitleProps) {
  return (
    <div className={`mb-4 ${className}`}>
      <h2 className="text-title-lg font-bold text-textPrimary tracking-tight">{children}</h2>
      {subtitle && <p className="text-body-sm text-textSecondary mt-1">{subtitle}</p>}
    </div>
  );
}
