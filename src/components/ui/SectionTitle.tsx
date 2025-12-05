interface SectionTitleProps {
  children: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function SectionTitle({ children, action }: SectionTitleProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-[#1C1F23] tracking-tight">{children}</h2>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium text-[#3A7AFE] hover:text-[#2D5FCC] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
