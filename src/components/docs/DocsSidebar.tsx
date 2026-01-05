import { NavLink } from "@/components/NavLink";
import { Book, Rocket, Terminal, Settings, List } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Introduction",
    href: "/docs#introduction",
    icon: Book,
  },
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    icon: Rocket,
  },
  {
    title: "CLI Reference",
    href: "/docs/cli",
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
  return (
    <aside className="w-64 shrink-0 border-r border-white/5 hidden lg:block backdrop-blur-sm bg-[#08080a]/50">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isHashLink = item.href.includes('#');
            
            return (
              <NavLink
                key={item.href}
                to={item.href}
                // For hash links, we want 'end' to be false if we want it to be active just by being on /docs
                // BUT, to distinguish between hashes, NavLink's isActive might not be enough out of the box for hashes.
                // However, the user request is just to have the menu.
                // Let's rely on NavLink standard behavior. If it matches URL, it's active.
                // Since we are changing routes for #, it might not update active state perfectly without extra logic, 
                // but simpler is better for now as I can't add complex scrollspy logic easily without adding new files/hooks.
                end={!isHashLink && item.href === "/docs"}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-white hover:bg-white/5 group relative"
                activeClassName="bg-white/5 text-foreground shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]"
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 w-1 h-4 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                    )}
                    <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-primary" : "group-hover:text-white")} />
                    <span className={cn("transition-colors", isActive ? "gradient-text font-bold" : "")}>
                      {item.title}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;