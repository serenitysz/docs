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
    <section id="benchmarks-section" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Benchmark <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Serenity consistently outperforms traditional Go linters with faster execution
            and lower memory footprint.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-16">
          {/* Execution Time Chart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Execution Time</h3>
              <span className="text-sm text-muted-foreground">Lower is better</span>
            </div>
            <div className="space-y-4">
              {benchmarkData.map((item, index) => (
                <div key={item.tool} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${item.isSerenity ? 'gradient-text text-lg' : 'text-foreground'}`}>
                      {item.tool}
                    </span>
                    <span className={`font-mono ${item.isSerenity ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                      {item.executionTime}s
                    </span>
                  </div>
                  <div className="h-10 md:h-12 bg-muted/50 rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full rounded-lg transition-all duration-1000 ease-out relative overflow-hidden ${
                        item.isSerenity
                          ? 'bg-gradient-to-r from-primary via-accent to-primary'
                          : 'bg-muted-foreground/30'
                      }`}
                      style={{
                        width: isVisible ? `${(item.executionTime / maxTime) * 100}%` : '0%',
                        transitionDelay: `${index * 200}ms`,
                      }}
                    >
                      {item.isSerenity && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Memory Usage Chart */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">Memory Usage</h3>
              <span className="text-sm text-muted-foreground">Lower is better</span>
            </div>
            <div className="space-y-4">
              {benchmarkData.map((item, index) => (
                <div key={item.tool} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${item.isSerenity ? 'gradient-text text-lg' : 'text-foreground'}`}>
                      {item.tool}
                    </span>
                    <span className={`font-mono ${item.isSerenity ? 'text-accent font-bold' : 'text-muted-foreground'}`}>
                      {item.memoryUsage}MB
                    </span>
                  </div>
                  <div className="h-10 md:h-12 bg-muted/50 rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full rounded-lg transition-all duration-1000 ease-out relative overflow-hidden ${
                        item.isSerenity
                          ? 'bg-gradient-to-r from-primary via-accent to-primary'
                          : 'bg-muted-foreground/30'
                      }`}
                      style={{
                        width: isVisible ? `${(item.memoryUsage / maxMemory) * 100}%` : '0%',
                        transitionDelay: `${index * 200 + 600}ms`,
                      }}
                    >
                      {item.isSerenity && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer bg-[length:200%_100%]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="glow-border rounded-xl p-6 bg-card/50 backdrop-blur text-center">
              <div className="text-4xl font-bold gradient-text mb-2">4x</div>
              <div className="text-muted-foreground">Faster than golangci-lint</div>
            </div>
            <div className="glow-border rounded-xl p-6 bg-card/50 backdrop-blur text-center">
              <div className="text-4xl font-bold gradient-text mb-2">5x</div>
              <div className="text-muted-foreground">Less memory usage</div>
            </div>
            <div className="glow-border rounded-xl p-6 bg-card/50 backdrop-blur text-center">
              <div className="text-4xl font-bold gradient-text mb-2">0</div>
              <div className="text-muted-foreground">False positives</div>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          * Benchmarks are run on medium-to-large Go codebases (~100k LOC). 
          Results may vary based on project structure and enabled rules.
        </p>
      </div>
    </section>
  );
};

export default Benchmarks;
