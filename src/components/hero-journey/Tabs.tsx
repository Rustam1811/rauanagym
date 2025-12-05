'use client';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div className={`flex bg-bgLight rounded-2xl p-1.5 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex-1 py-2.5 px-4 rounded-xl text-body-sm font-semibold tracking-tight transition-all duration-300
            ${activeTab === tab.id 
              ? 'bg-white text-primary shadow-soft scale-[1.02]' 
              : 'text-textSecondary hover:text-textPrimary hover:bg-white/40'
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
