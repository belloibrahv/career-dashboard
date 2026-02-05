import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  gradient?: 'primary' | 'secondary' | 'accent';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
}

export default function StatCard({
  label,
  value,
  icon,
  gradient = 'primary',
  trend,
  onClick,
}: StatCardProps) {
  const gradientClasses = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    accent: 'gradient-accent',
  };

  return (
    <div
      className="card-premium p-6 flex flex-col hover-lift cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="stat-label">{label}</div>
        <div className={`p-2 rounded-lg ${gradientClasses[gradient]}`}>
          <div style={{ color: '#ffffff' }}>
            {icon}
          </div>
        </div>
      </div>
      <div className="stat-value mb-2 stat-counter">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-xs" style={{ color: trend.direction === 'up' ? '#7a8b6f' : '#c97a5c' }}>
          <span>{trend.direction === 'up' ? '↑' : '↓'}</span>
          <span>{trend.value}%</span>
        </div>
      )}
    </div>
  );
}
