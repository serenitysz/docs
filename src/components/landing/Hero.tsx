import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmail("");
      toast.success("You've been added to the waitlist!");
    }, 1000);
  };

  return (
    <section className="relative min-h-screen pt-20 gradient-hero flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Rotating ring behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[400px] h-[400px] md:w-[600px] md:h-[600px]">
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-rotate-slow" />
        <div className="absolute inset-8 rounded-full border border-accent/20 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="absolute inset-16 rounded-full border border-primary/10 animate-rotate-slow" style={{ animationDuration: '25s' }} />
      </div>

      <div className="container relative z-10 px-4 py-20 flex flex-col items-center text-center">
        {/* Logo with glow effect */}
        <div className="relative mb-10">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-accent/40 rounded-full blur-3xl scale-150 animate-glow-pulse" />
          
          {/* Logo */}
          <div className="relative">
            <img
              src={serenityLogo}
              alt="Serenity Logo - Go Gopher with glowing brain"
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-2xl"
            />
            {/* Sparkle effects */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-accent animate-pulse" />
            <Sparkles className="absolute -bottom-1 -left-3 w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Title with shimmer effect */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <span className="relative inline-block">
            <span className="gradient-text">Serenity</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-shimmer bg-clip-text" />
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium mb-6 max-w-3xl opacity-0 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          An <span className="text-accent font-semibold">aggressive</span>, <span className="text-primary font-semibold">no-noise</span>, and <span className="text-foreground font-semibold">ultra-fast</span> Go linter.
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mb-12 opacity-0 animate-fade-up" style={{ animationDelay: '0.6s' }}>
          Serenity focuses on detecting real issues, enforcing strict best practices, 
          and delivering unmatched performance for modern Go codebases.
        </p>

        {/* Waitlist Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
            <Input
              type="email"
              placeholder="dev@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="relative h-12 bg-[#0d0b16] border-white/10 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/50 focus-visible:border-primary/50"
            />
          </div>
          <Button 
            disabled={loading} 
            type="submit" 
            size="lg" 
            className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/20 transition-all hover:scale-105"
          >
            {loading ? "Joining..." : "Join Waitlist"}
            {!loading && <Sparkles className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        {/* Config formats note */}
        <div className="mt-8 opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
          <p className="text-sm text-muted-foreground/60">
            Fully configurable via <span className="text-accent/80 font-mono">JSON</span>, <span className="text-accent/80 font-mono">YAML</span>, or <span className="text-accent/80 font-mono">TOML</span>.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
