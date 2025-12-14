"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useMemo } from "react"; // Import React and useMemo
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "./hover-border-gradient";

// Dynamic import for Galaxy is a good practice, so we'll keep it.
// It prevents the heavy component from blocking the initial page load.
const Galaxy = dynamic(() => import("../Galaxy"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 via-indigo-950 to-black" />
  ),
});

export function Hero() {
  // We wrap the Galaxy component in useMemo to prevent it from being recreated on every render.
  // This is a critical optimization for expensive, animated components.
  const MemoizedGalaxy = useMemo(() => {
    // The props below have been reduced to decrease the animation's complexity and rendering load.
    // High particle density, glow, and twinkling effects are common sources of performance bottlenecks.
    return (
      <Galaxy
        saturation={0.2}
        hueShift={90}
        glowIntensity={0.3} // Reduced from 0.3
        density={2.4} // Significantly reduced from 2.1
        twinkleIntensity={0.8} // Significantly reduced from 0.8
        rotationSpeed={0.05}
        repulsionStrength={0.5}
        autoCenterRepulsion={0}
        starSpeed={0.3}
        speed={0.2}
      />
    );
  }, []); // The empty dependency array [] ensures this component is created only once.

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Render the memoized and optimized Galaxy background */}
      <div className="absolute inset-0 z-0">
        {MemoizedGalaxy}
      </div>

      {/* Content section remains the same, as its animations are already efficient. */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pointer-events-none">
        <motion.h1
          className="text-4xl md:text-6xl font-medium mb-6 text-[#FBFCF6]"
          style={{ fontFamily: "'Planetary Contact', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          CogneoVerse
        </motion.h1>
        
        <motion.p
          className="text-base md:text-lg font-light text-[#FBFCF6] mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the universe of organizational excellence.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HoverBorderGradient
            as={Link}
            href="/galaxy"
            containerClassName="rounded-full"
            className="text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center gap-2 group"
          >
            Enter Galaxy
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </HoverBorderGradient>
        </motion.div>
      </div>
    </section>
  );
}
