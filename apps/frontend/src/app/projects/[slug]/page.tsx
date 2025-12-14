import { Navigation } from "@/components/layout/Navigation";

export const dynamic = "force-dynamic";

import { fetchAPI } from "@/lib/api";
import { generateMockProjectData } from "@/lib/mock-project-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ExternalLink, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Components
import { StatusBadge } from "@/components/project/status-badge";
import { CTAButtonGroup } from "@/components/project/cta-button-group";
import { TagChips } from "@/components/project/tag-chips";
import { FeatureGrid } from "@/components/project/feature-card";
import { PreviewCarousel } from "@/components/project/preview-carousel";
import { SpecTable } from "@/components/project/spec-table";
import { UseCaseGrid } from "@/components/project/use-case-card";
import { TeamGrid } from "@/components/project/team-grid";
import { Timeline } from "@/components/project/timeline";
import { RelatedProjects } from "@/components/project/related-projects";
import { StickyUtilityBar } from "@/components/project/sticky-utility-bar";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let baseProject: any = null;

  try {
    baseProject = await fetchAPI(`/projects/${slug}/`);
    
    if (!baseProject) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  // Generate extended project data with mock fields
  const project = generateMockProjectData(baseProject);

  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      
      {/* Sticky Utility Bar (appears on scroll) */}
      <StickyUtilityBar
        primaryCTA={project.primaryCTA}
        secondaryCTA={project.secondaryCTA}
        projectTitle={project.title}
      />

      <div className="pt-20">
        {/* 1. Top Navigation + Back/Breadcrumb */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Link
                href="/projects"
                className="flex items-center gap-1 transition-colors hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Projects
              </Link>
              <span>/</span>
              <span className="text-white">{project.title}</span>
            </div>
          </div>
        </div>

        {/* 2. Hero Section (full width) */}
        <div className="relative overflow-hidden border-b border-white/10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black" />
          <div className="absolute inset-0">
            <svg className="h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-500" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="space-y-8">
              {/* Status and metadata */}
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={project.status} size="lg" />
                {project.platformMetadata?.platforms && (
                  <div className="flex flex-wrap gap-2">
                    {project.platformMetadata.platforms.slice(0, 3).map((platform) => (
                      <span
                        key={platform}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Title and tagline */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                {project.tagline && (
                  <p className="max-w-3xl text-xl text-purple-200 sm:text-2xl">
                    {project.tagline}
                  </p>
                )}
                <p className="max-w-3xl text-lg text-gray-300">
                  {project.summary}
                </p>
              </div>

              {/* CTAs */}
              <CTAButtonGroup
                primaryCTA={project.primaryCTA}
                secondaryCTA={project.secondaryCTA}
              />

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <TagChips tags={project.tags} maxVisible={8} />
              )}

              {/* Repository link if available */}
              {project.platformMetadata?.repository && (
                <div>
                  <a
                    href={project.platformMetadata.repository}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main content sections */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {/* 4. About Section (Problem → Solution → Impact) */}
            {project.about && (
              <section id="about">
                <h2 className="mb-8 text-3xl font-bold text-white">About This Project</h2>
                <div className="grid gap-8 lg:grid-cols-3">
                  {project.about.problem && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-red-500" />
                        <h3 className="text-xl font-semibold text-white">The Problem</h3>
                      </div>
                      <p className="leading-relaxed text-gray-400">
                        {project.about.problem}
                      </p>
                    </div>
                  )}
                  {project.about.solution && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-blue-500" />
                        <h3 className="text-xl font-semibold text-white">Our Solution</h3>
                      </div>
                      <p className="leading-relaxed text-gray-400">
                        {project.about.solution}
                      </p>
                    </div>
                  )}
                  {project.about.impact && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1 w-8 rounded-full bg-green-500" />
                        <h3 className="text-xl font-semibold text-white">The Impact</h3>
                      </div>
                      <p className="leading-relaxed text-gray-400">
                        {project.about.impact}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 5. Feature Grid */}
            {project.features && project.features.length > 0 && (
              <section id="features">
                <h2 className="mb-8 text-3xl font-bold text-white">Key Features</h2>
                <FeatureGrid features={project.features} />
              </section>
            )}

            {/* 6. Visual Preview Section */}
            {project.previews && project.previews.length > 0 && (
              <section id="preview">
                <h2 className="mb-8 text-3xl font-bold text-white">Preview</h2>
                <PreviewCarousel previews={project.previews} />
              </section>
            )}

            {/* 7. Technical Specifications */}
            {project.technicalSpecs && project.technicalSpecs.length > 0 && (
              <section id="specs">
                <h2 className="mb-8 text-3xl font-bold text-white">
                  Technical Specifications
                </h2>
                <SpecTable specs={project.technicalSpecs} />
              </section>
            )}

            {/* 8. Use-Case / Audience Section */}
            {project.useCases && project.useCases.length > 0 && (
              <section id="use-cases">
                <h2 className="mb-8 text-3xl font-bold text-white">Who Is This For?</h2>
                <UseCaseGrid useCases={project.useCases} />
              </section>
            )}

            {/* 9. Team & Contributors */}
            {project.team && project.team.length > 0 && (
              <section id="team">
                <h2 className="mb-8 text-3xl font-bold text-white">
                  Team & Contributors
                </h2>
                <TeamGrid team={project.team} />
              </section>
            )}

            {/* 10. Roadmap / Status Timeline */}
            {project.roadmap && project.roadmap.length > 0 && (
              <section id="roadmap">
                <h2 className="mb-8 text-3xl font-bold text-white">Roadmap</h2>
                <Timeline milestones={project.roadmap} />
              </section>
            )}

            {/* 11. Related Projects */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <section id="related">
                <h2 className="mb-8 text-3xl font-bold text-white">Related Projects</h2>
                <RelatedProjects projects={project.relatedProjects} />
              </section>
            )}

            {/* 12. Final Conversion CTA Block */}
            <section id="cta" className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-8 text-center sm:p-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                Join thousands of users already leveraging {project.title} to transform their workflows and achieve better results.
              </p>
              <CTAButtonGroup
                primaryCTA={project.primaryCTA}
                secondaryCTA={project.secondaryCTA}
                orientation="horizontal"
                className="justify-center"
              />

              {/* Additional metadata */}
              {project.platformMetadata?.license && (
                <div className="mt-8 text-sm text-gray-400">
                  Licensed under {project.platformMetadata.license}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
