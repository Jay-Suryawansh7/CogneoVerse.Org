"use client";

import Link from "next/link";
import { Menu, X, LayoutDashboard, Compass, Building2, Folder, Share2, GraduationCap, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

  // Dynamic links logic handled in the render
  const navLinks = [
    { href: "#explore", label: "Explore", icon: Compass },
    { href: "#departments", label: "Departments", icon: Building2 },
    { href: "#projects", label: "Projects", icon: Folder },
    { href: "#network", label: "Network", icon: Share2 },
  ];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(navLinks[0].label);

  const isGalaxyPage = pathname === "/galaxy";
  const isAdmin = user?.publicMetadata?.role === "admin";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const id = link.href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the top of the section is near the top of the viewport
          // or if the section covers a significant portion of the viewport
          return { 
            id: link.label, 
            offset: Math.abs(rect.top),
            visible: rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2
          };
        }
        return null;
      }).filter(Boolean);

      // 1. Prioritize section that is currently crossing the center of the screen
      const visibleSection = sections.find(s => s?.visible);
      
      if (visibleSection) {
        setActiveTab(visibleSection.id);
        return;
      }

      // 2. Fallback to the one closest to the top if none are "centered"
      // (e.g. at the very top or bottom of page)
      if (sections.length > 0) {
        const sorted = sections.sort((a, b) => (a?.offset || 0) - (b?.offset || 0));
        if (sorted[0]) {
             setActiveTab(sorted[0].id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={cn(
        "fixed z-50 left-1/2 -translate-x-1/2 flex items-center justify-center",
        // Base styles that don't change or are overridden by motion
      )}
      initial={false}
      animate={
        isGalaxyPage && !isScrolled
          ? {
              top: 0,
              width: "100%",
              maxWidth: "100%",
              borderRadius: "0px",
              backgroundColor: "rgba(255, 255, 255, 0)",
              borderColor: "rgba(255, 255, 255, 0)",
              backdropFilter: "blur(0px)",
            }
          : {
              top: "1.5rem",
              width: "90%",
              maxWidth: "64rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(24px)",
            }
      }
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <div
        className={cn(
          "w-full px-6 transition-[padding] duration-300",
          isGalaxyPage && !isScrolled ? "py-[18px]" : "py-[15px]",
        )}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <Link
            href="/"
            className="text-lg font-bold text-white flex items-center gap-2"
          >
            <span className="font-planetary-contact text-2xl">CogneoVerse</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.label;

              return (
                <Link
                  key={link.label}
                  href={isGalaxyPage ? link.href : `/galaxy${link.href}`}
                  onClick={() => setActiveTab(link.label)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                    "text-gray-300 hover:text-white",
                    isActive && "bg-white/10 text-white"
                  )}
                >
                  <span className="hidden lg:inline">{link.label}</span>
                  <span className="lg:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                        <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link
                    href="http://localhost:3000"
                    className="flex items-center gap-2 text-xs bg-white/10 text-white px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors"
                  >
                    <LayoutDashboard className="w-3 h-3" />
                    Dashboard
                  </Link>
                )}
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="text-[17px] text-gray-300 hover:text-white font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="text-[17px] bg-white text-black px-4 py-1.5 rounded-full hover:bg-gray-200 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden shadow-xl w-[90%] mx-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={isGalaxyPage ? link.href : `/galaxy${link.href}`}
                className="block px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-white/10 my-2 pt-2">
            {isSignedIn ? (
              <div className="flex flex-col gap-2">
                {isAdmin && (
                  <Link
                    href="http://localhost:3000"
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                )}
                <div className="px-4 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/sign-in"
                  className="block px-4 py-2 text-gray-300 hover:bg-white/10 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block px-4 py-2 bg-white text-black rounded-lg text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  );
}
