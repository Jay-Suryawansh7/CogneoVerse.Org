import type { ProjectData, Feature, TechSpec, TeamMember, RoadmapMilestone, UseCase, RelatedProject, PreviewMedia } from "@/types/project-types";

/**
 * Mock Data Generator for Project Page
 * Use this to extend existing API data with new fields until backend is updated
 */

export function generateMockProjectData(baseProject: any): ProjectData {
  return {
    // Map existing API fields
    id: baseProject.id,
    title: baseProject.title,
    slug: baseProject.slug,
    summary: baseProject.summary,
    status: baseProject.status,
    tags: baseProject.tags || [],
    
    // Add new fields with mock data
    tagline: `Revolutionary ${baseProject.title} - Transforming the Future`,
    
    primaryCTA: {
      label: "View Live Demo",
      href: `https://demo.cogneverse.com/${baseProject.slug}`,
      variant: "primary",
      external: true,
      prefetch: false,
    },
    
    secondaryCTA: {
      label: "Documentation",
      href: `/docs/${baseProject.slug}`,
      variant: "secondary",
      prefetch: true,
    },
    
    about: {
      problem: "Traditional approaches to this domain lack scalability, modern architecture, and user-centric design. Teams struggle with fragmented tools and outdated workflows.",
      solution: `${baseProject.title} addresses these challenges through an integrated platform that combines cutting-edge technology with intuitive design. Our solution streamlines workflows, enhances collaboration, and drives measurable results.`,
      impact: "Organizations using this solution report 40% faster development cycles, 60% reduction in operational overhead, and 85% improvement in team satisfaction scores.",
    },
    
    features: generateMockFeatures(),
    
    previews: generateMockPreviews(baseProject.slug),
    
    technicalSpecs: generateMockTechSpecs(),
    
    useCases: generateMockUseCases(),
    
    team: generateMockTeam(),
    
    roadmap: generateMockRoadmap(),
    
    relatedProjects: generateMockRelatedProjects(baseProject.id),
    
    platformMetadata: {
      platforms: ["Web", "iOS", "Android", "Desktop"],
      compatibility: ["Chrome 90+", "Safari 14+", "Firefox 88+", "Edge 90+"],
      license: "MIT",
      repository: `https://github.com/cogneverse/${baseProject.slug}`,
    },
    
    // Keep legacy fields for backward compatibility
    blocks: baseProject.blocks,
    images: baseProject.images,
    related_departments: baseProject.related_departments,
  };
}

function generateMockFeatures(): Feature[] {
  return [
    {
      icon: "Zap",
      title: "Lightning Fast Performance",
      description: "Optimized architecture ensures sub-100ms response times even under heavy load.",
      valueProposition: "3x faster than industry standards",
    },
    {
      icon: "Shield",
      title: "Enterprise-Grade Security",
      description: "End-to-end encryption, SOC 2 compliance, and advanced threat detection.",
      valueProposition: "Bank-level security for your data",
    },
    {
      icon: "Users",
      title: "Seamless Collaboration",
      description: "Real-time collaboration tools with conflict resolution and version control.",
      valueProposition: "Teams work 40% more efficiently",
    },
    {
      icon: "Sparkles",
      title: "AI-Powered Insights",
      description: "Machine learning algorithms provide actionable insights and predictive analytics.",
      valueProposition: "Make data-driven decisions faster",
    },
    {
      icon: "Smartphone",
      title: "Cross-Platform Support",
      description: "Native apps for iOS, Android, and desktop with complete feature parity.",
      valueProposition: "Work anywhere, on any device",
    },
    {
      icon: "Puzzle",
      title: "Extensive Integrations",
      description: "Connect with 100+ popular tools through our robust API and webhooks.",
      valueProposition: "Fits seamlessly into your workflow",
    },
  ];
}

function generateMockPreviews(slug: string): PreviewMedia[] {
  return [
    {
      type: "image",
      url: `/coming-soon.svg`,
      caption: "Main dashboard interface with analytics",
      alt: "Dashboard preview",
    },
    {
      type: "image",
      url: `/coming-soon.svg`,
      caption: "Collaborative workspace view",
      alt: "Workspace preview",
    },
    {
      type: "demo",
      url: `https://demo.cogneverse.com/${slug}`,
      caption: "Try the interactive demo",
    },
  ];
}

function generateMockTechSpecs(): TechSpec[] {
  return [
    {
      category: "Platform & Architecture",
      specs: [
        { label: "Primary Stack", value: "Next.js 15, React 19" },
        { label: "Backend", value: "Django 5.0, PostgreSQL", tooltip: "REST API with GraphQL support" },
        { label: "Deployment", value: "Kubernetes on AWS" },
        { label: "CI/CD", value: "GitHub Actions" },
      ],
    },
    {
      category: "Performance",
      specs: [
        { label: "Response Time", value: "< 100ms", tooltip: "P95 latency for API calls" },
        { label: "Uptime", value: "99.99% SLA" },
        { label: "Throughput", value: "10K req/sec" },
        { label: "CDN", value: "CloudFlare Global" },
      ],
    },
    {
      category: "Security & Compliance",
      specs: [
        { label: "Encryption", value: "AES-256", tooltip: "Data encrypted at rest and in transit" },
        { label: "Authentication", value: "OAuth 2.0, SSO" },
        { label: "Compliance", value: "SOC 2, GDPR, HIPAA" },
        { label: "Audit Logs", value: "Full trail retention" },
      ],
    },
  ];
}

function generateMockUseCases(): UseCase[] {
  return [
    {
      id: 1,
      title: "Enterprise Teams",
      description: "Large organizations leverage our platform for cross-functional collaboration and enterprise-wide deployment.",
      icon: "Building2",
      audience: "500+ employee companies",
    },
    {
      id: 2,
      title: "Startups & Scale-ups",
      description: "Fast-growing companies use our tools to move quickly while maintaining high quality standards.",
      icon: "Rocket",
      audience: "10-100 employee teams",
    },
    {
      id: 3,
      title: "Independent Developers",
      description: "Solo developers and freelancers benefit from professional-grade tools without enterprise complexity.",
      icon: "Code2",
      audience: "Individual contributors",
    },
    {
      id: 4,
      title: "Educational Institutions",
      description: "Universities and bootcamps train the next generation with industry-standard tools and workflows.",
      icon: "GraduationCap",
      audience: "Students and educators",
    },
  ];
}

function generateMockTeam(): TeamMember[] {
  return [
    {
      id: 1,
      name: "Alex Chen",
      role: "Lead Engineer",
      department: "Engineering",
      bio: "Full-stack architect with 10+ years experience",
    },
    {
      id: 2,
      name: "Sarah Martinez",
      role: "Product Designer",
      department: "Design",
      bio: "UX specialist focused on accessibility",
    },
    {
      id: 3,
      name: "Michael Park",
      role: "DevOps Lead",
      department: "Infrastructure",
      bio: "Kubernetes and cloud infrastructure expert",
    },
    {
      id: 4,
      name: "Emily Johnson",
      role: "PM",
      department: "Product",
      bio: "Product strategy and roadmap planning",
    },
  ];
}

function generateMockRoadmap(): RoadmapMilestone[] {
  return [
    {
      id: 1,
      title: "Beta Launch",
      status: "completed",
      date: "Q1 2024",
      description: "Initial beta release with core features",
    },
    {
      id: 2,
      title: "Platform Integrations",
      status: "completed",
      date: "Q2 2024",
      description: "Added support for 50+ third-party integrations",
    },
    {
      id: 3,
      title: "Mobile Apps",
      status: "in-progress",
      date: "Q4 2024",
      description: "Native iOS and Android applications",
    },
    {
      id: 4,
      title: "Enterprise Features",
      status: "planned",
      date: "Q1 2025",
      description: "Advanced security, SSO, and admin controls",
    },
    {
      id: 5,
      title: "AI Assistant",
      status: "planned",
      date: "Q2 2025",
      description: "Intelligent automation and recommendations",
    },
  ];
}

function generateMockRelatedProjects(currentId: number): RelatedProject[] {
  const allProjects = [
    {
      id: 101,
      title: "DataSync Platform",
      slug: "datasync-platform",
      summary: "Real-time data synchronization across distributed systems",
      status: "active",
      thumbnail: "/coming-soon.svg",
    },
    {
      id: 102,
      title: "Cloud Analytics Suite",
      slug: "cloud-analytics",
      summary: "Comprehensive analytics and business intelligence platform",
      status: "building",
      thumbnail: "/coming-soon.svg",
    },
    {
      id: 103,
      title: "Secure Vault",
      slug: "secure-vault",
      summary: "Enterprise-grade secrets and credentials management",
      status: "live",
      thumbnail: "/coming-soon.svg",
    },
  ];
  
  return allProjects.filter(p => p.id !== currentId).slice(0, 3);
}
