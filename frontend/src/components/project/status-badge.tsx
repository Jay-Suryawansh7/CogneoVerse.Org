"use client";

import { Badge } from "@/components/ui/badge";
import { STATUS_COLORS, type ProjectData } from "@/types/project-types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ProjectData['status'];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const colors = STATUS_COLORS[status];
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full font-medium border capitalize transition-colors",
        colors.bg,
        colors.text,
        colors.border,
        sizeClasses[size],
        className
      )}
    >
      {status}
    </Badge>
  );
}
