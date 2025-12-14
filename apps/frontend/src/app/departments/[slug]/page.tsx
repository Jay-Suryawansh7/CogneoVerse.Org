import { Navigation } from "@/components/layout/Navigation";

export const dynamic = "force-dynamic";

import { fetchAPI } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  status: string;
  tags: string[];
}

interface Department {
  id: number;
  title: string;
  slug: string;
  description: string;
  hero_image?: string;
  published: boolean;
  projects: Project[];
}

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let department: Department | null = null;

  try {
    department = await fetchAPI(`/departments/${slug}/`);
    
    if (!department || !department.published) {
      notFound();
    }
  } catch (error) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "completed": return "bg-blue-100 text-blue-700";
      case "planned": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black z-0 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            {department.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            {department.description}
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-4">
          <h2 className="text-2xl font-light text-white">
            Projects <span className="text-gray-500">/</span> {department.title}
          </h2>
          <div className="ml-auto text-sm text-gray-500">
            {department.projects?.length || 0} Projects found
          </div>
        </div>
        
        {department.projects && department.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department.projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative bg-[#111111] hover:bg-[#161616] rounded-2xl p-6 border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors text-gray-400">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                    project.status === 'active' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                    project.status === 'completed' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' :
                    'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-white/5 text-gray-400 text-[10px] uppercase tracking-wider rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-gray-500 text-[10px] uppercase tracking-wider">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5 border-dashed">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No projects in this department yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
