import React from 'react';

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function SectionHeader({
  icon,
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="border-b pb-6 animate-slideUp" style={{ borderColor: '#ede8e3' }}>
      <div className="flex items-center justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl gradient-primary">
            <div style={{ color: '#ffffff' }}>
              {icon}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold" style={{ color: '#2a2520' }}>
              {title}
            </h1>
            {subtitle && (
              <p className="text-base mt-1" style={{ color: '#9b8f85' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="btn-primary hover-lift whitespace-nowrap"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
