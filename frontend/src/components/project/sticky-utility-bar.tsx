"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CTA } from "@/types/project-types";
import Link from "next/link";
import { toast } from "sonner";

interface StickyUtilityBarProps {
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  projectTitle: string;
  className?: string;
}

export function StickyUtilityBar({
  primaryCTA,
  secondaryCTA,
  projectTitle,
  className,
}: StickyUtilityBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: projectTitle,
          url: window.location.href,
        });
      } catch {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch {
        toast.error('Failed to copy link');
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Desktop: Top sticky bar */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed top-0 left-0 right-0 z-50 hidden border-b border-white/10 bg-black/80 backdrop-blur-lg md:block",
              className
            )}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <h2 className="truncate text-sm font-semibold text-white">
                {projectTitle}
              </h2>
              <div className="flex items-center gap-3">
                {primaryCTA && (
                  <Link href={primaryCTA.href}>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      {primaryCTA.label}
                    </Button>
                  </Link>
                )}
                {secondaryCTA && (
                  <Link href={secondaryCTA.href}>
                    <Button size="sm" variant="outline">
                      {secondaryCTA.label}
                    </Button>
                  </Link>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleShare}
                  className="text-gray-400 hover:text-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Mobile: Bottom fixed bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/90 backdrop-blur-lg p-4 md:hidden",
              className
            )}
          >
            <div className="flex items-center gap-2">
              {primaryCTA && (
                <Link href={primaryCTA.href} className="flex-1">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    {primaryCTA.label}
                  </Button>
                </Link>
              )}
              {secondaryCTA && (
                <Link href={secondaryCTA.href} className="flex-1">
                  <Button variant="outline" className="w-full">
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={handleShare}
                className="flex-shrink-0 text-gray-400 hover:text-white"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
