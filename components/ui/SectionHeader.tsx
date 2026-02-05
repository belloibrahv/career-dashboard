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
    <div className="page-header">
      <div className="page-header-main">
        <div className="page-icon">
          {icon}
        </div>
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
}
