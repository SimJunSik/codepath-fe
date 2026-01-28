// CodePath Frontend - Card Component
// 디자인 시스템 기준

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'bg-bg-elevated rounded-xl transition-all duration-200';

  const variantStyles = {
    default: 'border border-border',
    bordered: 'border-2 border-border',
    elevated: 'shadow-lg shadow-black/20',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable
    ? 'cursor-pointer hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1 active:scale-98'
    : '';

  return (
    <div
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
