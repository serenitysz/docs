import { useState, useEffect } from "react";
import { Book, Rocket, Terminal, Settings, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    title: "Introduction",
    id: "introduction",
    icon: Book,
  },
  {
    title: "Getting Started",
    id: "getting-started",
    icon: Rocket,
  },
  {
    title: "CLI Reference",
    id: "cli",
    icon: Terminal,
  },
  {
    title: "Configuration",
    id: "configuration",
    icon: Settings,
  },
  {
    title: "Rules",
    id: "rules",
    icon: List,
  },
];

const DocsSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("introduction");

  // Handle Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Trigger when the element is near the top of the viewport
        // -20% from top, -35% from bottom creates a "sweet spot"
        rootMargin: "-20% 0px -35% 0px",
        threshold: 0,
      }
    );

    const sections = sidebarItems.map((item) => document.getElementById(item.id));
    
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle hash change on initial load or browser navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      if (sidebarItems.some(item => item.id === id)) {
        setActiveSection(id);
        // Scroll to element if not already there (helper for initial load)
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [location.hash]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    navigate(`/docs#${id}`, { replace: true });
    
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header if needed, but scroll-mt-20 class on section usually handles it
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 hidden lg:block backdrop-blur-sm bg-[#08080a]/50">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative cursor-pointer",
                  isActive 
                    ? "bg-white/5 text-foreground shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]" 
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                )}
                <item.icon 
                  className={cn(
                    "h-4 w-4 transition-colors", 
                    isActive ? "text-primary" : "group-hover:text-white"
                  )} 
                />
                <span className={cn("transition-colors", isActive ? "gradient-text font-bold" : "")}>
                  {item.title}
                </span>
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;
