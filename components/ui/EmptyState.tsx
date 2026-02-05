import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="card-premium p-16 text-center animate-slideUp">
      <p className="text-6xl mb-4">{icon}</p>
      <h3 className="text-xl font-bold mb-2" style={{ color: '#2a2520' }}>
        {title}
      </h3>
      <p style={{ color: '#9b8f85' }} className="mb-6">
        {description}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary hover-lift"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
