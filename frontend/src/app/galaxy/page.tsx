import { Navigation } from "@/components/layout/Navigation";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { DepartmentsSection } from "@/components/sections/DepartmentsSection";
import { AcademySection } from "@/components/sections/AcademySection";
import { MediaSection } from "@/components/sections/MediaSection";
import { DepartmentLeadsSection } from "@/components/sections/DepartmentLeadsSection";
import { NetworkSection } from "@/components/sections/NetworkSection";
import { Footer } from "@/components/layout/Footer";

import { BackgroundBeams } from "@/components/ui/background-beams";

export default function GalaxyPage() {
  return (
    <main className="bg-background min-h-screen relative w-full">
      <BackgroundBeams className="fixed inset-0 z-0 pointer-events-none" />
      <div className="relative z-10">
        <Navigation />
        <ExploreSection />
        <ProjectsSection />
        <DepartmentsSection />
        {/* <AcademySection />
        <MediaSection /> */}
        <NetworkSection />
        <DepartmentLeadsSection />
        <Footer />
      </div>
    </main>
  );
}
