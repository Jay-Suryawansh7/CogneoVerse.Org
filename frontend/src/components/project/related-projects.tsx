"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RelatedProject } from "@/types/project-types";

interface RelatedProjectsProps {
  projects: RelatedProject[];
  className?: string;
}

export function RelatedProjects({ projects, className }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ y: -4 }}
        >
          <Link href={`/projects/${project.slug}`}>
            <Card className="group h-full overflow-hidden border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10">
              {/* Thumbnail */}
              {project.thumbnail && (
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status badge overlay */}
                  <div className="absolute right-3 top-3">
                    <StatusBadge status={project.status as any} size="sm" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-purple-300">
                    {project.title}
                  </h3>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-purple-400" />
                </div>

                {!project.thumbnail && (
                  <div className="mb-3">
                    <StatusBadge status={project.status as any} size="sm" />
                  </div>
                )}

                <p className="line-clamp-2 text-sm text-gray-400">
                  {project.summary}
                </p>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
