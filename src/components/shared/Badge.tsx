import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-os-accent/25 bg-os-accentSoft px-2.5 py-0.5 font-mono text-xs text-os-accent ${className}`}
    >
      {children}
    </span>
  );
}
