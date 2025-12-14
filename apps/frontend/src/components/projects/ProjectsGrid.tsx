"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { FolderOpen, X } from "lucide-react";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  tags: string[];
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [active, setActive] = useState<Project | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300";
      case "completed":
        return "bg-blue-500/20 text-blue-300";
      case "planned":
        return "bg-yellow-500/20 text-yellow-300";
      default:
        return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-fit max-h-[90%] flex flex-col bg-gray-900 border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative p-6">
                 <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
                  onClick={() => setActive(null)}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>

                <div className="flex flex-col gap-4">
                    <div className="flex items-start justify-between pr-12">
                        <div className="p-3 bg-purple-500/20 rounded-lg">
                            <FolderOpen className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(active.status)}`}>
                            {active.status}
                        </span>
                    </div>
                    
                    <div>
                        <motion.h3
                        layoutId={`title-${active.title}-${id}`}
                        className="text-2xl font-bold text-white mb-2"
                        >
                        {active.title}
                        </motion.h3>
                        <motion.p
                        layoutId={`description-${active.summary}-${id}`}
                        className="text-gray-300"
                        >
                        {active.summary}
                        </motion.p>
                    </div>

                    {active.tags && active.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                        {active.tags.map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                            {tag}
                            </span>
                        ))}
                        </div>
                    )}

                    <div className="pt-4">
                        <Link
                            href={`/projects/${active.slug}`}
                            className="inline-block w-full text-center px-4 py-3 text-sm rounded-xl font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                        >
                            View Project Details
                        </Link>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {projects.map((project) => (
          <motion.li
            layoutId={`card-${project.title}-${id}`}
            key={project.id}
            onClick={() => setActive(project)}
            className="relative h-full rounded-2xl md:rounded-3xl list-none cursor-pointer group"
          >
             <div className="relative h-full rounded-2xl border border-white/10 p-1 md:rounded-3xl bg-white/5">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 bg-black/20 backdrop-blur-sm">
                    <div className="flex flex-row items-start gap-4">
                        <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                            <FolderOpen className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                            <motion.h3
                                layoutId={`title-${project.title}-${id}`}
                                className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors mb-2"
                            >
                                {project.title}
                            </motion.h3>
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                    </div>
                    
                    <motion.p
                        layoutId={`description-${project.summary}-${id}`}
                        className="text-gray-300 line-clamp-3"
                    >
                        {project.summary}
                    </motion.p>
                    
                     {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                            {tag}
                            </span>
                        ))}
                        </div>
                    )}
                </div>
             </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}
