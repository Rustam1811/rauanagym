// components/ui/hj/HJTabs.tsx
'use client';

import { useState, type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
}

interface HJTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function HJTabs({ tabs, defaultTab, onChange, className = '' }: HJTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex gap-1 p-1 bg-hj-cardSoft rounded-2xl mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                text-xs font-semibold transition-all duration-200
                ${
                  isActive
                    ? 'bg-white dark:bg-hj-card text-hj-primary shadow-hj'
                    : 'text-hj-textSoft hover:text-hj-textMain'
                }
              `}
            >
              {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">{activeContent}</div>
    </div>
  );
}
