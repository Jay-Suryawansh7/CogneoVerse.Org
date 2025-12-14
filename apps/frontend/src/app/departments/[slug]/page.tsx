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
    <main>
      <Navigation />
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {department.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100">
              {department.description}
            </p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Projects in {department.title}
          </h2>
          
          {department.projects && department.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                      <FolderOpen className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        {project.title}
                      </h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {project.summary}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                No projects in this department yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
