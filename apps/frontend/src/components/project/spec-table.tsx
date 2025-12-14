"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TechSpec } from "@/types/project-types";

interface SpecTableProps {
  specs: TechSpec[];
  className?: string;
}

export function SpecTable({ specs, className }: SpecTableProps) {
  if (specs.length === 0) return null;

  return (
    <TooltipProvider>
      <Accordion
        type="multiple"
        defaultValue={specs.map((_, i) => `spec-${i}`)}
        className={cn("w-full space-y-4", className)}
      >
        {specs.map((specGroup, index) => (
          <AccordionItem
            key={specGroup.category}
            value={`spec-${index}`}
            className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:bg-white/5 hover:no-underline">
              <span className="text-lg font-semibold text-white">
                {specGroup.category}
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="space-y-3">
                {specGroup.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-start justify-between gap-4 rounded-lg border border-white/5 bg-black/20 p-3 transition-colors hover:bg-black/30"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">
                        {spec.label}
                      </span>
                      {spec.tooltip && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="text-gray-500 hover:text-gray-400">
                              <Info className="h-4 w-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">{spec.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TooltipProvider>
  );
}
