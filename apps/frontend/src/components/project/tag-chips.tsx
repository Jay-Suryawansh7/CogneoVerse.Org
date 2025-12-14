"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TagChipsProps {
  tags: string[];
  variant?: 'default' | 'compact';
  clickable?: boolean;
  maxVisible?: number;
  className?: string;
}

export function TagChips({
  tags,
  variant = 'default',
  clickable = true,
  maxVisible,
  className,
}: TagChipsProps) {
  const visibleTags = maxVisible ? tags.slice(0, maxVisible) : tags;
  const remainingCount = tags.length - visibleTags.length;

  const chipClasses = cn(
    "inline-flex items-center rounded-full font-medium transition-all duration-200",
    variant === 'compact' 
      ? "px-2.5 py-1 text-xs"
      : "px-3 py-1.5 text-sm",
    clickable
      ? "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white cursor-pointer"
      : "bg-white/5 text-gray-300 border border-white/10"
  );

  const renderTag = (tag: string, index: number) => {
    const chipContent = (
      <motion.span
        key={tag}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05, duration: 0.2 }}
        whileHover={clickable ? { scale: 1.05 } : undefined}
        whileTap={clickable ? { scale: 0.95 } : undefined}
        className={chipClasses}
      >
        {tag}
      </motion.span>
    );

    if (clickable) {
      // Route to filtered projects page with tag as query param
      return (
        <Link
          key={tag}
          href={`/projects?tag=${encodeURIComponent(tag)}`}
          className="inline-block"
        >
          {chipContent}
        </Link>
      );
    }

    return chipContent;
  };

  if (tags.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {visibleTags.map((tag, index) => renderTag(tag, index))}
      {remainingCount > 0 && (
        <span
          className={cn(
            chipClasses,
            "bg-white/10 cursor-default"
          )}
        >
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}
