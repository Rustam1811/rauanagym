interface AdminCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function AdminCard({ children, title, className = '' }: AdminCardProps) {
  return (
    <div className={`rounded-3xl bg-white/90 backdrop-blur-xl border border-white/40 overflow-hidden shadow-hj ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 bg-hj-cardSoft/50">
          <h3 className="text-lg lg:text-xl font-bold text-hj-textMain">{title}</h3>
        </div>
      )}
      <div className={title ? 'p-4 lg:p-6' : 'p-4 lg:p-6'}>
        {children}
      </div>
    </div>
  );
}
