import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";
import { addToWaitlist } from "@/lib/waitlist";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await addToWaitlist(email);
      
      if (!response.success) {
        toast.error(response.message);
        setLoading(false);
        return;
      }

      toast.success(response.message);
      setEmail("");
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-[#08080a]">
      {/* Background patterns & effects */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        
        {/* Charming glow orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 px-4 py-20 flex flex-col items-center text-center">
        {/* New bold headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.05] opacity-0 animate-fade-up">
          <span className="text-white">The </span>
          <span className="gradient-text">aggressive</span>
          <span className="text-white"> Go linter</span>
          <br />
          <span className="text-white/90">you've been waiting for.</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-10 max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Stop compromising on code quality. Experience <span className="text-foreground">zero-noise</span>, <span className="text-foreground">lightning-fast</span>, and <span className="text-foreground">actually actionable</span> insights.
        </p>

        {/* Waitlist Form */}
        <div className="w-full flex flex-col items-center opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-lg">
            <div className="relative flex-1 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500" />
              <Input
                type="email"
                placeholder="Enter your email for early access"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative h-14 bg-black/40 border-white/10 text-lg text-foreground placeholder:text-muted-foreground/50 rounded-xl focus-visible:ring-primary/50"
              />
            </div>
            <Button 
              disabled={loading} 
              type="submit" 
              size="lg" 
              className="h-14 bg-white text-black hover:bg-white/90 font-bold px-8 rounded-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              {loading ? "Joining..." : "Join Waitlist"}
              {!loading && <Sparkles className="ml-2 h-5 w-5" />}
            </Button>
          </form>
          
          <p className="mt-6 text-sm text-muted-foreground/60 flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Fully customizable
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="font-mono text-accent/80">JSON, YAML, YML, TOML</span>
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#08080a] to-transparent z-10" />
    </section>
  );
};

export default Hero;
