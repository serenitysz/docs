import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />
      </div>

      <div className="container relative z-10 px-4 py-20 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <img
            src={serenityLogo}
            alt="Serenity Logo - Go Gopher with glowing brain"
            className="w-32 h-32 md:w-40 md:h-40 glow-purple rounded-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="gradient-text">Serenity</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-6 max-w-2xl">
          An aggressive, no-noise, and ultra-fast Go linter.
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground/80 max-w-xl mb-10">
          Serenity focuses on detecting real issues, enforcing strict best practices, 
          and delivering unmatched performance for modern Go codebases.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 glow-purple"
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
            className="border-border hover:bg-muted font-semibold px-8"
          >
            <Link to="/docs/rules">
              <BookOpen className="mr-2 h-5 w-5" />
              View Rules
            </Link>
          </Button>
        </div>

        {/* Quick install */}
        <div className="mt-16 w-full max-w-xl">
          <div className="glow-border rounded-lg p-4 bg-card/50 backdrop-blur">
            <code className="text-sm md:text-base text-muted-foreground">
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">go install github.com/serenitysz/serenity@latest</span>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
