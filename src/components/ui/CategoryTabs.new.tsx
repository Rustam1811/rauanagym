interface Tab {
  id: string;
  label: string;
}

interface CategoryTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function CategoryTabs({ tabs, activeTab, onChange }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === tab.id
              ? 'bg-[#3A7AFE] text-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
              : 'bg-white text-[#6B7280] hover:bg-[#E8F1FF] border border-[#E6E8EB]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
