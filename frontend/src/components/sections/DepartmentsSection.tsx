import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Building2 } from "lucide-react";

interface Department {
  id: number;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  image?: string;
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  drafts: number;
  team_size: number;
}

const COLORS = [
  "#3B82F6", // Blue
  "#8B5CF6", // Violet
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#06B6D4", // Cyan
];

export async function DepartmentsSection() {
  let departments: Department[] = [];
  
  try {
    const data = await fetchAPI("/departments/");
    departments = (data.results || data).filter((d: Department) => d.published);
  } catch (error) {
    console.error("Failed to load departments", error);
  }

  const cards = departments.map((dept, index) => {
    // Content for the expanded card
    const CardContent = () => (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            {dept.title}
          </span>{" "}
          {dept.description || "No description available."}
        </p>
        <div className="mt-8 flex justify-center">
            <Link
              href={`/departments/${dept.slug}`}
              className="px-6 py-2 bg-black text-white rounded-full font-bold transform hover:-translate-y-1 transition duration-400"
            >
              View Details
            </Link>
        </div>
      </div>
    );

    const borderColor = COLORS[index % COLORS.length];

    return (
      <Card
        key={dept.id}
        card={{
          title: dept.title,
          category: "Department",
          content: <CardContent />,
          icon: <Building2 className="w-8 h-8 text-blue-400" />,
          borderColor: borderColor,
          stats: {
            totalProjects: dept.total_projects || 0,
            activeProjects: dept.active_projects || 0,
            completedProjects: dept.completed_projects || 0,
            drafts: dept.drafts || 0,
            teamSize: dept.team_size || 0,
          },
        }}
        index={index}
      />
    );
  });

  return (
    <section id="departments" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
          Our Departments
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Explore the various departments that make up our organization
        </p>
      </div>

      {departments.length === 0 ? (
        <div className="text-center text-gray-400 py-12">
          No departments available at the moment.
        </div>
      ) : (
        <div className="w-full h-[600px]">
          <Carousel items={cards} />
        </div>
      )}
    </section>
  );
}
