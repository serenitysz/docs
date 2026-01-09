import { useEffect, useState } from "react";
import { Zap, Shield, Terminal, Settings } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { rosePineTheme } from "@/lib/prism-theme";

const codeLines = [
  'package main',
  '',
  'import (',
  '    "context"',
  '    "fmt"',
  '    "time"',
  ')',
  '',
  'func WorkerPool(ctx context.Context, workers int) {',
  '    jobs := make(chan int, 100)',
  '    results := make(chan int, 100)',
  '',
  '    for w := 1; w <= workers; w++ {',
  '        go func(id int) {',
  '            for j := range jobs {',
  '                select {',
  '                case <-ctx.Done():',
  '                    return',
  '                default:',
  '                    time.Sleep(10 * time.Millisecond)',
  '                    results <- j * 2',
  '                }',
  '            }',
  '        }(w)',
  '    }',
  '',
  '    for j := 1; j <= 50; j++ {',
  '        jobs <- j',
  '    }',
  '    close(jobs)',
  '',
  '    for a := 1; a <= 50; a++ {',
  '        fmt.Printf("Result: %d\\n", <-results)',
  '    }',
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

  const codeString = codeLines.join('\n');
  return (
    <section id="features-section" className="py-24 bg-[#08080a] relative overflow-hidden">
      {/* Smooth transition from hero */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#08080a] to-transparent z-10" />
      
      <div className="container px-4 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-stretch max-w-7xl mx-auto">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-base font-medium text-primary w-fit">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-3 animate-pulse"></span>
                Why Serenity?
              </div>

              <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Zero compromise on <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  code quality.
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl">
                Stop wasting time on false positives. Serenity is engineered to be the strict,
                opinionated, and lightning-fast linter your Go codebase deserves.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-5 group hover:bg-white/[0.02] p-5 rounded-2xl transition-all duration-300 border border-transparent hover:border-white/5 -ml-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

                    {/* Right side - Animated code block */}

                    <div className="relative h-full">

                      {/* Glow effect background (Optimized) */}
                      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),transparent_70%)] animate-pulse-glow" />

                      <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 bg-[#191724]/40 backdrop-blur-2xl flex flex-col shadow-2xl">

                        {/* Liquid glass gloss overlay */}

                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent z-10" />

                        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.05),transparent)] z-10" />

                        

                        {/* Code content */}

                        <div className="p-8 font-mono text-sm md:text-base overflow-x-auto relative z-0 flex-1 scrollbar-none">

                          <Highlight theme={rosePineTheme} code={codeString} language="go">

                            {({ className, style, tokens, getLineProps, getTokenProps }) => (

                              <pre className={`${className} h-full`} style={{...style, backgroundColor: 'transparent'}}>

                                {tokens.map((line, i) => (

                                  <div

                                    key={i}

                                    {...getLineProps({ line })}

                                    className={`transition-all duration-150 will-change-transform ${

                                      isVisible

                                        ? 'opacity-100 translate-x-0'

                                        : 'opacity-0 -translate-x-4'

                                    }`}
                                    style={{ transitionDelay: `${i * 40}ms` }}

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
