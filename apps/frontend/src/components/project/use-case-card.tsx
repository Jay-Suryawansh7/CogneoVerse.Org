"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseCase } from "@/types/project-types";

interface UseCaseCardProps {
  useCase: UseCase;
  index?: number;
  className?: string;
}

export function UseCaseCard({ useCase, index = 0, className }: UseCaseCardProps) {
  const IconComponent = useCase.icon
    ? (Icons as any)[useCase.icon] || Icons.Target
    : Icons.Target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className={className}
    >
      <Card className="group h-full border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-5 transition-all duration-200 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/5">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition-all group-hover:bg-blue-500/20">
            <IconComponent className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h4 className="mb-1 text-base font-semibold text-white">
              {useCase.title}
            </h4>
            {useCase.audience && (
              <p className="mb-2 text-xs font-medium text-blue-300/70">
                Target: {useCase.audience}
              </p>
            )}
            <p className="text-sm leading-relaxed text-gray-400">
              {useCase.description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface UseCaseGridProps {
  useCases: UseCase[];
  className?: string;
}

export function UseCaseGrid({ useCases, className }: UseCaseGridProps) {
  if (useCases.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        className
      )}
    >
      {useCases.map((useCase, index) => (
        <UseCaseCard key={useCase.id} useCase={useCase} index={index} />
      ))}
    </div>
  );
}
