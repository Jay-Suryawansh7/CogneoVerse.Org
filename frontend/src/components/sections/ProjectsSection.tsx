import { fetchAPI } from "@/lib/api";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ScrollAnimation } from "../ui/scroll-animation";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  tags: string[];
}

export async function ProjectsSection() {
  let projects: Project[] = [];

  try {
    const data = await fetchAPI("/projects/");
    projects = data.results || data;
  } catch (error) {
    console.error("Failed to load projects", error);
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollAnimation direction="up" delay={0.2}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the innovative projects we&apos;re working on
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation direction="up" delay={0.3}>
        <ProjectsGrid projects={projects} />
      </ScrollAnimation>

      {projects.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          No projects available at the moment.
        </div>
      )}
    </section>
  );
}
