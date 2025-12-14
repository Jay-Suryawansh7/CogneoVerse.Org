"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RoadmapMilestone } from "@/types/project-types";

interface TimelineProps {
  milestones: RoadmapMilestone[];
  className?: string;
}

export function Timeline({ milestones, className }: TimelineProps) {
  if (milestones.length === 0) return null;

  const getStatusIcon = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'released':
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />;
      case 'planned':
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: RoadmapMilestone['status']) => {
    switch (status) {
      case 'released':
      case 'completed':
        return 'border-green-500/30 bg-green-500/5';
      case 'in-progress':
        return 'border-blue-500/30 bg-blue-500/5';
      case 'planned':
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  return (
    <div className={cn("space-y-0", className)}>
      {milestones.map((milestone, index) => (
        <motion.div
          key={milestone.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="relative flex gap-6 pb-8 last:pb-0"
        >
          {/* Timeline line */}
          {index !== milestones.length - 1 && (
            <div className="absolute left-[10px] top-8 h-full w-0.5 bg-gradient-to-b from-white/20 to-transparent" />
          )}

          {/* Status icon */}
          <div className="relative z-10 flex h-5 w-5 flex-shrink-0 items-center justify-center">
            {getStatusIcon(milestone.status)}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div
              className={cn(
                "rounded-lg border p-4 transition-all duration-200 hover:border-white/20",
                getStatusColor(milestone.status)
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="text-base font-semibold text-white">
                    {milestone.title}
                  </h4>
                  {milestone.date && (
                    <p className="mt-1 text-xs text-gray-400">
                      {milestone.date}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                    milestone.status === 'released' || milestone.status === 'completed'
                      ? 'bg-green-500/20 text-green-300'
                      : milestone.status === 'in-progress'
                      ? 'bg-blue-500/20 text-blue-300'
                      : 'bg-gray-500/20 text-gray-300'
                  )}
                >
                  {milestone.status.replace('-', ' ')}
                </span>
              </div>
              {milestone.description && (
                <p className="mt-2 text-sm text-gray-300">
                  {milestone.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
