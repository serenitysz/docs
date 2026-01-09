import { Zap, Brain, ShieldCheck } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="pt-32 pb-0 bg-[#08080a] relative overflow-hidden">
      {/* Background Blurs sutis */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent italic uppercase">
            Elite Engineering
          </h2>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            Zero overhead. Infinite scalability. Serenity is the final piece of your high-performance Go stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: Zap,
              title: "Maximum Concurrency",
              desc: "Full CPU utilization for instant AST generation and parallel processing.",
              color: "text-primary",
            },
            {
              icon: Brain,
              title: "Zero-Alloc Engine",
              desc: "Deep static analysis rules optimized to run with minimal memory footprint.",
              color: "text-accent",
            },
            {
              icon: ShieldCheck,
              title: "Smart Auto-Fix",
              desc: "Detect and resolve complex technical debt automatically with a single flag.",
              color: "text-primary",
            }
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div className="h-full p-10 rounded-3xl bg-white/[0.01] border border-white/5 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.03] hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8">
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
