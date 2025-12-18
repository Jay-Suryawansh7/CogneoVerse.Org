"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { Feature } from "@/types/project-types";

interface FeatureCardProps {
  feature: Feature;
  index?: number;
  className?: string;
}

export function FeatureCard({ feature, index = 0, className }: FeatureCardProps) {
  // Dynamically get icon from lucide-react
  const IconComponent = (Icons as any)[feature.icon] || Icons.Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={className}
    >
      <Card className="group relative h-full overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
        
        <div className="relative flex flex-col gap-4">
          {/* Icon */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 transition-all duration-300 group-hover:bg-purple-500/20 group-hover:scale-110">
            <IconComponent className="h-6 w-6" />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
              {feature.title}
            </h3>
            
            {feature.valueProposition && (
              <p className="text-sm font-medium text-purple-300/80">
                {feature.valueProposition}
              </p>
            )}
            
            <p className="text-sm leading-relaxed text-gray-400">
              {feature.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Grid container for features
interface FeatureGridProps {
  features: Feature[];
  className?: string;
}

export function FeatureGrid({ features, className }: FeatureGridProps) {
  if (features.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
}
