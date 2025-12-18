"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import type { CTA } from "@/types/project-types";
import { cn } from "@/lib/utils";

interface CTAButtonGroupProps {
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function CTAButtonGroup({
  primaryCTA,
  secondaryCTA,
  orientation = 'horizontal',
  className,
}: CTAButtonGroupProps) {
  const [loadingState, setLoadingState] = useState<Record<string, boolean>>({});

  const handleClick = (label: string) => {
    setLoadingState((prev) => ({ ...prev, [label]: true }));
    // Reset after animation
    setTimeout(() => {
      setLoadingState((prev) => ({ ...prev, [label]: false }));
    }, 1000);
  };

  const renderCTA = (cta: CTA, variant: 'default' | 'secondary' | 'outline') => {
    const isLoading = loadingState[cta.label];
    const ButtonComponent = motion.div;

    const buttonContent = (
      <Button
        variant={variant}
        size="lg"
        className={cn(
          "group relative overflow-hidden transition-all duration-200",
          variant === 'default' && "bg-purple-600 hover:bg-purple-700",
          variant === 'secondary' && "bg-blue-600 hover:bg-blue-700",
        )}
        onClick={() => handleClick(cta.label)}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            {cta.label}
            {cta.external && (
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            )}
          </>
        )}
      </Button>
    );

    if (cta.external) {
      return (
        <ButtonComponent
          key={cta.label}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
        >
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            {buttonContent}
          </a>
        </ButtonComponent>
      );
    }

    return (
      <ButtonComponent
        key={cta.label}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        onHoverStart={() => {
          // Prefetch on hover if enabled
          if (cta.prefetch && typeof window !== 'undefined') {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = cta.href;
            document.head.appendChild(link);
          }
        }}
      >
        <Link href={cta.href}>
          {buttonContent}
        </Link>
      </ButtonComponent>
    );
  };

  if (!primaryCTA && !secondaryCTA) return null;

  return (
    <div
      className={cn(
        "flex gap-3",
        orientation === 'vertical' ? 'flex-col' : 'flex-col sm:flex-row',
        className
      )}
    >
      {primaryCTA && renderCTA(primaryCTA, 'default')}
      {secondaryCTA && renderCTA(secondaryCTA, 'outline')}
    </div>
  );
}
