import { useEffect, useState } from "react";
import { Zap, Shield, Terminal, Settings } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { rosePineTheme } from "@/lib/prism-theme";

const codeLines = [
  'package main',
  '',
  'import "fmt"',
  '',
  'func main() {',
  '    messages := make(chan string)',
  '',
  '    go func() {',
  '        messages <- "ping"',
  '    }()',
  '',
  '    msg := <-messages',
  '    fmt.Println(msg)',
  '}',
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

    // Reset visible lines when component becomes visible
    setVisibleLines([]);

    const timeouts: NodeJS.Timeout[] = [];
    codeLines.forEach((_, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
      }, index * 100); // Stagger the appearance
      timeouts.push(timeout);
    });
    
    return () => timeouts.forEach(clearTimeout);
  }, [isVisible]);

  const codeString = codeLines.join('\n');

  return (
    <section id="features-section" className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch max-w-7xl mx-auto">
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
          <div className="relative h-full">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-2xl blur-2xl opacity-50" />
            
            <div className="relative glow-border rounded-xl overflow-hidden bg-[#191724] backdrop-blur-xl h-full flex flex-col">
              {/* Code content */}
              <div className="p-10 font-mono text-xl md:text-2xl overflow-x-auto bg-[#191724] flex-1">
                <Highlight theme={rosePineTheme} code={codeString} language="go">
                  {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={`${className} h-full`} style={{...style, backgroundColor: 'transparent'}}>
                      {tokens.map((line, i) => (
                        <div
                          key={i}
                          {...getLineProps({ line })}
                          className={`transition-all duration-300 ${
                            visibleLines.includes(i)
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-4'
                          }`}
                        >
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
