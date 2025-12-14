"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/types/project-types";

interface TeamGridProps {
  team: TeamMember[];
  className?: string;
}

export function TeamGrid({ team, className }: TeamGridProps) {
  if (team.length === 0) return null;

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",
        className
      )}
    >
      {team.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05, duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Card className="group overflow-hidden border-white/10 bg-white/5 p-4 text-center transition-all duration-200 hover:border-white/20 hover:bg-white/10">
            {/* Avatar */}
            <div className="relative mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xl font-bold text-white">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <h4 className="mb-1 text-sm font-semibold text-white">
              {member.name}
            </h4>
            <p className="mb-1 text-xs text-purple-300/80">
              {member.role}
            </p>
            <p className="text-xs text-gray-400">
              {member.department}
            </p>

            {/* Bio on hover (if available) */}
            {member.bio && (
              <div className="mt-2 max-h-0 overflow-hidden text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:max-h-20 group-hover:opacity-100">
                {member.bio}
              </div>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
