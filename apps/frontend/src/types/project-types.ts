/**
 * Extended Project Data Types for High-Conversion Project Page
 * All types support fully dynamic data - no hardcoded content
 */

export interface Feature {
  icon: string; // Lucide icon name
  title: string;
  description: string;
  valueProposition?: string; // One-line value statement
}

export interface TechSpec {
  category: string; // e.g., "Platform", "Architecture", "Performance"
  specs: {
    label: string;
    value: string;
    tooltip?: string;
  }[];
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  avatar?: string;
  bio?: string;
}

export interface RoadmapMilestone {
  id: number;
  title: string;
  status: 'planned' | 'in-progress' | 'released' | 'completed';
  date?: string;
  description?: string;
}

export interface UseCase {
  id: number;
  title: string;
  description: string;
  icon?: string; // Lucide icon name
  audience?: string; // Target user type
}

export interface RelatedProject {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnail?: string;
  status: string;
}

export interface CTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  external?: boolean;
  prefetch?: boolean;
}

export interface PreviewMedia {
  type: 'image' | 'video' | 'demo';
  url: string;
  thumbnail?: string;
  caption?: string;
  alt?: string;
}

export interface PlatformMetadata {
  platforms?: string[]; // e.g., ["Web", "iOS", "Android"]
  compatibility?: string[];
  license?: string;
  repository?: string;
}

// Main extended project data interface
export interface ProjectData {
  // Core fields (from existing API)
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: 'planned' | 'building' | 'active' | 'live' | 'completed';
  tags: string[];
  
  // Extended fields for new design
  tagline?: string; // Short hero tagline
  
  // CTAs
  primaryCTA?: CTA;
  secondaryCTA?: CTA;
  
  // About section (Problem → Solution → Impact)
  about?: {
    problem?: string;
    solution?: string;
    impact?: string;
  };
  
  // Features
  features?: Feature[];
  
  // Visual previews
  previews?: PreviewMedia[];
  
  // Technical specifications
  technicalSpecs?: TechSpec[];
  
  // Use cases / target audiences
  useCases?: UseCase[];
  
  // Team & contributors
  team?: TeamMember[];
  
  // Roadmap
  roadmap?: RoadmapMilestone[];
  
  // Related projects
  relatedProjects?: RelatedProject[];
  
  // Platform metadata
  platformMetadata?: PlatformMetadata;
  
  // Legacy fields (keep for backward compatibility)
  blocks?: any[];
  images?: string[];
  related_departments?: any[];
}

// Helper type for status badge colors
export type StatusColor = {
  bg: string;
  text: string;
  border: string;
};

// Status color mapping
export const STATUS_COLORS: Record<ProjectData['status'], StatusColor> = {
  planned: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/20',
  },
  building: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
  },
  active: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
  },
  live: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/20',
  },
  completed: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
  },
};
