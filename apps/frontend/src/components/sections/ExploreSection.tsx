import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "../ui/scroll-animation";

const items = [
  {
    title: "Departments",
    href: "#departments",
    description: "Explore our organizational structure and teams",
    longDescription: "Dive deep into our various departments including Engineering, HR, Marketing, and Operations. See how our teams collaborate to build the future of Cogneoverse.",
    bg: "from-blue-900/50 to-blue-800/50",
    titleColor: "text-blue-100",
    textColor: "text-blue-200",
    ctaText: "Visit Departments",
  },
  {
    title: "Projects",
    href: "#projects",
    description: "View our active and completed initiatives",
    longDescription: "Discover the cutting-edge projects driving innovation. From AI research to community platforms, explore the initiatives that define our mission.",
    bg: "from-purple-900/50 to-purple-800/50",
    titleColor: "text-purple-100",
    textColor: "text-purple-200",
    ctaText: "View Projects",
  },
  /* {
    title: "Academy",
    href: "#academy",
    description: "Access training and learning resources",
    longDescription: "Empower yourself with our comprehensive learning materials. Access courses, workshops, and tutorials designed to enhance your skills.",
    bg: "from-green-900/50 to-green-800/50",
    titleColor: "text-green-100",
    textColor: "text-green-200",
    ctaText: "Go to Academy",
  },
  {
    title: "Media",
    href: "#media",
    description: "Browse our media library and publications",
    longDescription: "Stay updated with our latest news, press releases, and multimedia content. Explore our gallery and read our featured publications.",
    bg: "from-orange-900/50 to-orange-800/50",
    titleColor: "text-orange-100",
    textColor: "text-orange-200",
    ctaText: "Browse Media",
  }, */
  {
    title: "Network",
    href: "#network",
    description: "Connect with our community and partners",
    longDescription: "Join our vibrant community. Connect with partners, alumni, and fellow innovators to grow your professional network.",
    bg: "from-cyan-900/50 to-cyan-800/50",
    titleColor: "text-cyan-100",
    textColor: "text-cyan-200",
    ctaText: "Join Network",
  },
];

export function ExploreSection() {
  return (
    <section id="explore" className="pt-[25vh] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollAnimation direction="up" delay={0.2}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Explore Cogneoverse
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover all the resources, departments, projects, and content available
          </p>
        </div>
      </ScrollAnimation>

      <div className="space-y-24">
        {items.map((item, index) => (
          <ScrollAnimation 
            key={item.title} 
            direction={index % 2 === 0 ? "left" : "right"}
            delay={0.1}
          >
            <div 
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 w-full">
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${item.bg} p-8 flex items-center justify-center shadow-lg`}>
                  <h3 className={`text-4xl font-bold ${item.titleColor}`}>{item.title}</h3>
                </div>
              </div>
              
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-white">{item.title}</h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {item.longDescription}
                </p>
                <Link 
                  href={item.href}
                  className="inline-flex items-center gap-2 text-lg font-medium text-white hover:text-blue-400 transition-colors group"
                >
                  {item.ctaText}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </section>
  );
}
