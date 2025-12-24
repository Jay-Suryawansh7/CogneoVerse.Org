import { Navigation } from "@/components/layout/Navigation";

export const dynamic = "force-dynamic";

import { fetchAPI } from "@/lib/api";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  tags: string[];
}

export default async function ProjectsPage() {
  let projects: Project[] = [];

  try {
    const data = await fetchAPI("/projects/");
    projects = data.results || data;
  } catch (error) {
    console.error("Failed to load projects", error);
  }

  return (
    <main>
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Discover the innovative projects we&apos;re working on
          </p>
        </div>

        <ProjectsGrid projects={projects} />

        {projects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No projects available at the moment.
          </div>
        )}
      </div>
    </main>
  );
}
