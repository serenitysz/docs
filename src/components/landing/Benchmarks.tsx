import { useEffect, useState } from "react";

interface BenchmarkItem {
  tool: string;
  executionTime: number;
  memoryUsage: number;
  isSerenity?: boolean;
}

const benchmarkData: BenchmarkItem[] = [
  {
    tool: "golangci-lint",
    executionTime: 4.8,
    memoryUsage: 256,
    isSerenity: false,
  },
  {
    tool: "Serenity",
    executionTime: 1.2,
    memoryUsage: 48,
    isSerenity: true,
  },
  {
    tool: "staticcheck",
    executionTime: 3.1,
    memoryUsage: 128,
    isSerenity: false,
  },
];

const maxTime = 5;
const maxMemory = 300;

const Benchmarks = () => {
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

    const element = document.getElementById("benchmarks-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="benchmarks-section" className="py-32 bg-[#08080a] relative overflow-hidden">
      {/* Background glow effects (Optimized) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,hsl(var(--primary)/0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,hsl(var(--accent)/0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-24">
          
          {/* Execution Time Chart */}
          <div className="space-y-10">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-6">
              <h3 className="text-3xl font-bold text-foreground">Execution Time</h3>
              <span className="text-base text-muted-foreground uppercase tracking-widest">Lower is better</span>
            </div>
            
            <div className="space-y-8">
              {benchmarkData.map((item, index) => (
                <div key={item.tool} className="group relative">
                  <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_120px] md:items-center gap-4 md:gap-10">
                    {/* Label */}
                    <div className={`text-xl font-semibold transition-colors ${item.isSerenity ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {item.tool}
                    </div>

                    {/* Bar Track */}
                    <div className="h-4 md:h-5 w-full bg-white/5 rounded-full overflow-hidden">
                      {/* Bar Fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative will-change-[width] ${
                          item.isSerenity
                            ? 'bg-gradient-to-r from-primary to-accent shadow-[0_0_25px_rgba(var(--primary),0.4)]'
                            : 'bg-muted-foreground/30'
                        }`}
                        style={{
                          width: isVisible ? `${(item.executionTime / maxTime) * 100}%` : '0%',
                          transitionDelay: `${index * 150}ms`,
                        }}
                      >
                         {item.isSerenity && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer bg-[length:200%_100%]" />
                        )}
                      </div>
                    </div>

                    {/* Value */}
                    <div className={`text-right font-mono text-xl ${item.isSerenity ? 'text-accent font-black' : 'text-muted-foreground'}`}>
                      {item.executionTime}s
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Usage Chart */}
          <div className="space-y-10">
            <div className="flex items-baseline justify-between border-b border-white/5 pb-6">
              <h3 className="text-3xl font-bold text-foreground">Memory Usage</h3>
              <span className="text-base text-muted-foreground uppercase tracking-widest">Lower is better</span>
            </div>
            
            <div className="space-y-8">
              {benchmarkData.map((item, index) => (
                <div key={item.tool} className="group relative">
                  <div className="flex flex-col md:grid md:grid-cols-[180px_1fr_120px] md:items-center gap-4 md:gap-10">
                    {/* Label */}
                    <div className={`text-xl font-semibold transition-colors ${item.isSerenity ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {item.tool}
                    </div>

                    {/* Bar Track */}
                    <div className="h-4 md:h-5 w-full bg-white/5 rounded-full overflow-hidden">
                      {/* Bar Fill */}
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                          item.isSerenity
                            ? 'bg-gradient-to-r from-primary to-accent shadow-[0_0_25px_rgba(var(--primary),0.4)]'
                            : 'bg-muted-foreground/30'
                        }`}
                        style={{
                          width: isVisible ? `${(item.memoryUsage / maxMemory) * 100}%` : '0%',
                          transitionDelay: `${index * 150 + 600}ms`,
                        }}
                      >
                        {item.isSerenity && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer bg-[length:200%_100%]" />
                        )}
                      </div>
                    </div>

                    {/* Value */}
                    <div className={`text-right font-mono text-xl ${item.isSerenity ? 'text-accent font-black' : 'text-muted-foreground'}`}>
                      {item.memoryUsage}MB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              { value: "4x", label: "Faster execution" },
              { value: "5x", label: "Less memory" },
              { value: "0", label: "False positives" },
            ].map((stat, i) => (
              <div key={i} className="rounded-3xl p-10 bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300 text-center group">
                <div className="text-6xl font-black gradient-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xl text-muted-foreground font-semibold uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-base text-muted-foreground/40 mt-24 max-w-2xl mx-auto italic">
          * Benchmarks run on ~100k LOC codebases. Results may vary based on project structure.
        </p>
      </div>
    </section>
  );
};

export default Benchmarks;
