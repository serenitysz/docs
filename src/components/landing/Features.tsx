import { useEffect, useState } from "react";
import { Zap, Shield, Terminal, Settings } from "lucide-react";

const codeLines = [
  { text: 'package main', delay: 0 },
  { text: '', delay: 100 },
  { text: 'import "github.com/serenitysz/serenity"', delay: 200 },
  { text: '', delay: 300 },
  { text: 'func main() {', delay: 400 },
  { text: '    // Serenity catches this instantly', delay: 500 },
  { text: '    cfg := serenity.NewConfig()', delay: 600 },
  { text: '    cfg.EnableRule("shadow-variable")', delay: 700 },
  { text: '    cfg.EnableRule("unused-param")', delay: 800 },
  { text: '    cfg.EnableRule("error-handling")', delay: 900 },
  { text: '', delay: 1000 },
  { text: '    serenity.Run(cfg) // < 1.2s for 100k LOC', delay: 1100 },
  { text: '}', delay: 1200 },
];

const features = [
  {
    icon: Zap,
    title: "Blazing fast",
    description: "Optimized AST traversal. Analyze 100k lines of code in under 2 seconds.",
  },
  {
    icon: Shield,
    title: "Zero noise",
    description: "Only real issues. No false positives. Every warning matters.",
  },
  {
    icon: Settings,
    title: "Fully configurable",
    description: "Enable, disable, or adjust any rule. Your codebase, your standards.",
  },
  {
    icon: Terminal,
    title: "Auto-fix support",
    description: "Let Serenity fix common issues automatically with --fix flag.",
  },
];

const Features = () => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("features-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    codeLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, line.delay);
    });
  }, [isVisible]);

  const highlightSyntax = (text: string) => {
    return text
      .replace(/(package|import|func|return)/g, '<span class="text-primary">$1</span>')
      .replace(/(".*?")/g, '<span class="text-accent">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-muted-foreground">$1</span>')
      .replace(/(\bserenity\b)/g, '<span class="text-primary font-semibold">$1</span>')
      .replace(/(NewConfig|EnableRule|Run)/g, '<span class="text-foreground">$1</span>')
      .replace(/(cfg)/g, '<span class="text-accent/80">$1</span>');
  };

  return (
    <section id="features-section" className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">
                Our Philosophy
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Built for{" "}
                <span className="gradient-text">Precision</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Our goal is to create the most{" "}
                <span className="text-foreground font-medium">aggressive yet accurate</span>{" "}
                linter that catches real bugs before they reach production.
              </p>
              <p>
                Designed to eliminate noise and deliver{" "}
                <span className="text-foreground font-medium">actionable insights</span>{" "}
                that actually improve your codebase.
              </p>
              <p>
                A linter that feels{" "}
                <span className="text-accent font-semibold">just like Go</span> — fast, 
                opinionated, and reliable.
              </p>
            </div>

            {/* Feature pills */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground">
                    <feature.icon className="w-5 h-5 text-accent" />
                    <span className="font-semibold">{feature.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Animated code block */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
            
            <div className="relative glow-border rounded-xl overflow-hidden bg-card/80 backdrop-blur-xl">
              {/* Header bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-sm text-muted-foreground ml-2 font-mono">main.go</span>
              </div>

              {/* Code content */}
              <div className="p-6 font-mono text-sm md:text-base overflow-x-auto">
                <pre className="space-y-1">
                  {codeLines.map((line, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-300 ${
                        visibleLines.includes(index)
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                    >
                      <span className="text-muted-foreground/50 select-none mr-4">
                        {String(index + 1).padStart(2, ' ')}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightSyntax(line.text) || '&nbsp;',
                        }}
                      />
                    </div>
                  ))}
                </pre>
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
                <span>Go</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Serenity active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
