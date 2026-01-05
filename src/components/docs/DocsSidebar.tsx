import { NavLink } from "@/components/NavLink";
import { Book, Rocket, Terminal, Settings, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  {
    title: "Introduction",
    href: "/docs#introduction",
    icon: Book,
  },
  {
    title: "Getting Started",
    href: "/docs#getting-started",
    icon: Rocket,
  },
  {
    title: "CLI Reference",
    href: "/docs#cli",
    icon: Terminal,
  },
  {
    title: "Configuration",
    href: "/docs#configuration",
    icon: Settings,
  },
  {
    title: "Rules",
    href: "/docs#rules",
    icon: List,
  },
];

const DocsSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 shrink-0 border-r border-white/5 hidden lg:block backdrop-blur-sm bg-[#08080a]/50">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isHashLink = item.href.includes('#');
            
            // Calculate active state manually
            let isActive = false;
            if (isHashLink) {
              const [path, hash] = item.href.split('#');
              // Check if path matches
              if (location.pathname === path) {
                // Check if hash matches, or if hash is empty and it's the introduction (first item/default)
                if (location.hash === `#${hash}`) {
                  isActive = true;
                } else if (location.hash === "" && hash === "introduction") {
                   isActive = true;
                }
              }
            } else {
              isActive = location.pathname === item.href; 
            }

            const activeClass = "bg-white/5 text-foreground shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]";

            return (
              <NavLink
                key={item.href}
                to={item.href}
                // Disable automatic active styling for hash links to prevent all being active
                activeClassName={isHashLink ? "" : activeClass}
                // Apply manual active styling
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-white hover:bg-white/5 group relative",
                  isActive && isHashLink && activeClass
                )}
              >
                {({ isActive: routeIsActive }) => {
                   // Use our manual isActive for hash links, fallback to router for others
                   const finalIsActive = isHashLink ? isActive : routeIsActive;
                   
                   return (
                    <>
                      {finalIsActive && (
                        <div className="absolute left-0 w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                      )}
                      <item.icon className={cn("h-4 w-4 transition-colors", finalIsActive ? "text-primary" : "group-hover:text-white")} />
                      <span className={cn("transition-colors", finalIsActive ? "gradient-text font-bold" : "")}>
                        {item.title}
                      </span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;