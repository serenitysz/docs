import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Rotating ring behind logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-64 h-64 md:w-80 md:h-80">
        <div className="absolute inset-0 rounded-full border border-primary/30 animate-rotate-slow" />
        <div className="absolute inset-4 rounded-full border border-accent/20 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        <div className="absolute inset-8 rounded-full border border-primary/10 animate-rotate-slow" style={{ animationDuration: '25s' }} />
      </div>

      <div className="container relative z-10 px-4 py-20 flex flex-col items-center text-center">
        {/* Logo with glow effect */}
        <div className="relative mb-10 animate-float">
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-accent/40 rounded-full blur-3xl scale-150 animate-glow-pulse" />
          
          {/* Logo */}
          <div className="relative">
            <img
              src={serenityLogo}
              alt="Serenity Logo - Go Gopher with glowing brain"
              className="w-40 h-40 md:w-52 md:h-52 object-contain drop-shadow-2xl"
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

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up" style={{ animationDelay: '0.8s' }}>
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            <Link to="/docs/getting-started">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-border hover:bg-muted font-semibold px-10 py-6 text-lg transition-all hover:scale-105 hover:border-primary/50"
          >
            <Link to="/docs/rules">
              <BookOpen className="mr-2 h-5 w-5" />
              View Rules
            </Link>
          </Button>
        </div>

        {/* Quick install */}
        <div className="mt-20 w-full max-w-2xl opacity-0 animate-fade-up" style={{ animationDelay: '1s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative glow-border rounded-xl p-5 bg-card/80 backdrop-blur-xl">
              <code className="text-sm md:text-base lg:text-lg text-muted-foreground font-mono">
                <span className="text-accent">$</span>{" "}
                <span className="text-foreground">go install github.com/serenitysz/serenity@latest</span>
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
