import { Zap, Brain, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-32 bg-[#08080a] relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic uppercase">
            Elite Engineering
          </h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Zero overhead. Infinite scalability. Serenity is the final piece of your high-performance Go stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: "Maximum Concurrency",
              desc: "Full CPU utilization for instant AST generation and parallel processing.",
              color: "text-primary",
              glow: "group-hover:shadow-[0_0_50px_-12px_hsl(var(--primary)/0.5)]",
            },
            {
              icon: Brain,
              title: "Zero-Alloc Engine",
              desc: "Deep static analysis rules optimized to run with minimal memory footprint.",
              color: "text-accent",
              glow: "group-hover:shadow-[0_0_50px_-12px_hsl(var(--accent)/0.5)]",
            },
            {
              icon: ShieldCheck,
              title: "Smart Auto-Fix",
              desc: "Detect and resolve complex technical debt automatically with a single flag.",
              color: "text-primary",
              glow: "group-hover:shadow-[0_0_50px_-12px_hsl(var(--primary)/0.5)]",
            }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className={`h-full p-10 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 ${item.glow}`}>
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 text-white/50 text-xs font-black tracking-[0.2em] uppercase relative overflow-hidden group hover:text-white/80 transition-colors cursor-default">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Optimized for large-scale Go codebases
          </div>
        </div>
      </div>

      {/* Visual Connector to Next Section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
        {/* Mist/Fade effect to blend the connector */}
        <div className="w-[100vw] h-32 bg-gradient-to-t from-[#08080a] to-transparent absolute bottom-0 pointer-events-none" />
        
        {/* The Beam Container */}
        <div className="w-[1px] h-40 bg-white/10 relative z-10 overflow-hidden mask-image-linear-to-b">
          {/* The Moving Light Beam */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-primary to-transparent animate-beam" />
        </div>
        
        {/* The Connection Point (Glowing Orb) */}
        <div className="w-4 h-4 rounded-full bg-background border border-primary relative z-20 -mt-1 shadow-[0_0_20px_2px_hsl(var(--primary))] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
