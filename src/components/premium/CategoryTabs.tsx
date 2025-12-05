'use client';

import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface CategoryTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export default function CategoryTabs({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: CategoryTabsProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              className={`
                relative px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap
                transition-smooth
                ${
                  isActive
                    ? 'text-white bg-gradient-accent shadow-button'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              <span className="flex items-center gap-2">
                {tab.icon && <span className="text-lg">{tab.icon}</span>}
                {tab.label}
              </span>

              {/* Animated underline for non-active tabs */}
              {!isActive && isHovered && (
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent-blue rounded-full animate-scale-in" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
