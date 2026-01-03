import { NavLink } from "@/components/NavLink";
import { Book, Rocket, Terminal, Settings, List } from "lucide-react";

const sidebarItems = [
  {
    title: "Introduction",
    href: "/docs",
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
    href: "/docs/configuration",
    icon: Settings,
  },
  {
    title: "Rules",
    href: "/docs/rules",
    icon: List,
  },
];

const DocsSidebar = () => {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar hidden lg:block">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/docs"}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              activeClassName="bg-muted text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DocsSidebar;
