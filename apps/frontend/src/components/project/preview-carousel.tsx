"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PreviewMedia } from "@/types/project-types";

interface PreviewCarouselProps {
  previews: PreviewMedia[];
  className?: string;
}

export function PreviewCarousel({ previews, className }: PreviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  if (previews.length === 0) return null;

  const current = previews[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return previews.length - 1;
      if (next >= previews.length) return 0;
      return next;
    });
  };

  // Touch handlers for swipe on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      paginate(1);
    } else if (isRightSwipe) {
      paginate(-1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className={cn("relative w-full", className)}>
      {/* Main carousel */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            {current.type === 'image' && (
              <div className="relative h-full w-full">
                <Image
                  src={current.url}
                  alt={current.alt || current.caption || 'Project preview'}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {current.type === 'video' && (
              <div className="relative h-full w-full">
                <video
                  src={current.url}
                  poster={current.thumbnail}
                  controls
                  className="h-full w-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {current.type === 'demo' && (
              <div className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-4"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-600 transition-all group-hover:scale-110 group-hover:bg-purple-500">
                    <Play className="h-10 w-10 text-white" fill="currentColor" />
                  </div>
                  <span className="text-lg font-medium text-white">
                    Launch Interactive Demo
                  </span>
                </a>
              </div>
            )}

            {/* Caption */}
            {current.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm text-white">{current.caption}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {previews.length > 1 && (
          <>
            <button
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110"
              aria-label="Previous preview"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110"
              aria-label="Next preview"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail navigation */}
      {previews.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {previews.map((preview, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                index === currentIndex
                  ? "border-purple-500 opacity-100"
                  : "border-white/10 opacity-50 hover:opacity-75"
              )}
            >
              {preview.type === 'image' && (
                <Image
                  src={preview.thumbnail || preview.url}
                  alt={`Preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
              {preview.type === 'video' && preview.thumbnail && (
                <div className="relative h-full w-full">
                  <Image
                    src={preview.thumbnail}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-4 w-4 text-white" fill="currentColor" />
                  </div>
                </div>
              )}
              {preview.type === 'demo' && (
                <div className="flex h-full w-full items-center justify-center bg-purple-900/20">
                  <Play className="h-6 w-6 text-purple-400" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress dots for mobile */}
      {previews.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 sm:hidden">
          {previews.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "w-8 bg-purple-500"
                  : "w-2 bg-white/30"
              )}
              aria-label={`Go to preview ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
