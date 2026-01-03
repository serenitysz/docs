import { Zap, Puzzle, Terminal } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Performance",
    color: "text-accent",
    items: [
      "Ultra-fast static analysis",
      "Optimized AST traversal",
      "Designed for large codebases",
      "Minimal memory footprint",
    ],
  },
  {
    icon: Puzzle,
    title: "Flexibility",
    color: "text-primary",
    items: [
      "Fully configurable via serenity.json",
      "Enable/disable rules granularly",
      "Adjustable severity levels",
      "Rule groups (recommended, best practices, etc.)",
    ],
  },
  {
    icon: Terminal,
    title: "Developer Experience",
    color: "text-secondary",
    items: [
      "Zero-noise philosophy",
      "Clear, actionable diagnostics",
      "Auto-fix support",
      "Intuitive CLI & fast feedback loops",
    ],
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="gradient-text">Serenity</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built from the ground up for Go developers who demand precision, speed, and clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glow-border rounded-xl p-8 bg-card/30 backdrop-blur hover:bg-card/50 transition-all duration-300 group"
            >
              <div className={`${feature.color} mb-6`}>
                <feature.icon className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground flex items-start gap-2"
                  >
                    <span className={`${feature.color} mt-1.5`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
