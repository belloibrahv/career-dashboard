import React from 'react';

interface FilterTab {
  id: string;
  label: string;
  count?: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  active: string;
  onChange: (id: string) => void;
}

export default function FilterTabs({
  tabs,
  active,
  onChange,
}: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap animate-slideUp" style={{ animationDelay: '0.2s' }}>
      {tabs.map((tab, idx) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="px-4 py-2 rounded-lg font-medium transition-all hover-lift tag"
          style={{
            animationDelay: `${0.3 + idx * 0.05}s`,
            backgroundColor: active === tab.id ? '#c97a5c' : '#f5f1ed',
            color: active === tab.id ? '#ffffff' : '#2a2520',
          }}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1 text-xs opacity-75">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
