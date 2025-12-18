import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { fetchAPI } from "@/lib/api";

interface Department {
  id: number;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  image?: string;
}

const LEAD_MAPPING: Record<string, string> = {
  "Circuits": "Jay",
  "Design": "Moksh",
  "Forge": "Kushagra",
  "Mind": "Shreyash",
  "Marketing": "Rajkumar",
  "Cyber": "Not Assigned",
  "Robotics": "Not Assigned",
  "Motion": "Not Assigned",
  "Aegis": "Not Assigned",
  "Link": "Not Assigned"
};

export async function DepartmentLeadsSection() {
  let departments: Department[] = [];
  
  try {
    const data = await fetchAPI("/departments/");
    departments = (data.results || data).filter((d: Department) => d.published);
  } catch (error) {
    console.error("Failed to load departments for leads", error);
  }
  
  const leads = departments.map((dept) => {
    // Robust matching: Check if any key from LEAD_MAPPING is contained in the department title
    const normalizedTitle = dept.title.toLowerCase();
    let leadName = "Not Assigned";
    
    // Find the first matching key
    const matchKey = Object.keys(LEAD_MAPPING).find(key => 
      normalizedTitle.includes(key.toLowerCase())
    );

    if (matchKey) {
      leadName = LEAD_MAPPING[matchKey];
    }
    
    // Use department image if available, else a geometric placeholder
    const src = dept.image || `https://placehold.co/500x500/1e1e1e/FFF?text=${dept.title.charAt(0)}`;

    return {
      quote: `Driving innovation and excellence in the ${dept.title} department.`,
      name: leadName,
      designation: `${dept.title} Lead`,
      src: src, 
    };
  });
  
  // If fetch failed or yielded no results, we might want to show something?
  // But for now let's assume it works or renders empty.
  
  // Re-map with the nice placeholders to ensure it looks good as requested
  const placeholders = [
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=3387&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=3387&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3387&auto=format&fit=crop"
  ];

  const finalTestimonials = leads.map((lead, index) => ({
      ...lead,
      src: placeholders[index % placeholders.length] // Cycle through placeholders
  }));

  // If no departments loaded, don't crash, just show nothing or manual list?
  // User asked to "fetch it", so if fetch fails, it will be empty.
  
  if (finalTestimonials.length === 0) {
      return null;
  }

  return (
    <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-0 md:mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Department Leads</h2>
            <p className="text-gray-400">Meet the visionaries guiding our departments.</p>
        </div>
        <AnimatedTestimonials testimonials={finalTestimonials} autoplay={true} />
    </section>
  );
}
