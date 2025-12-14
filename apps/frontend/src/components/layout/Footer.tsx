import Link from "next/link";
import { Facebook, Github, Instagram, Linkedin, X, Youtube } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: X, href: "#", label: "X" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const footerLinks = {
  platform: [
    { label: "Explore", href: "/#explore" },
    { label: "Departments", href: "/#departments" },
    { label: "Projects", href: "/#projects" },
  ],
  community: [
    // { label: "Academy", href: "/#academy" },
    // { label: "Media", href: "/#media" },
    { label: "Network", href: "/#network" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative bg-black/20 border-t border-white/10 pt-16 pb-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-planetary-contact text-3xl text-white">CogneoVerse</span>
            </Link>
            <p className="text-gray-400 mb-8 max-w-sm">
              A comprehensive platform for innovation, collaboration, and learning. 
              Join us in building the future of technology.
            </p>
            <div className="flex flex-wrap gap-4">
               <Dock className="mx-0 mt-0 bg-white/5 border-white/5" iconSize={40} iconMagnification={60} iconDistance={140}>
                 {socialLinks.map((social) => (
                   <DockIcon key={social.label} size={40} magnification={60} distance={140} className="bg-transparent hover:bg-transparent">
                     <Link
                       href={social.href}
                       className="text-gray-400 hover:text-white transition-colors"
                       aria-label={social.label}
                     >
                       <social.icon className="w-5 h-5" />
                     </Link>
                   </DockIcon>
                 ))}
               </Dock>
             </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-6">Platform</h3>
              <ul className="space-y-4">
                {footerLinks.platform.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Community</h3>
              <ul className="space-y-4">
                {footerLinks.community.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} CogneoVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
