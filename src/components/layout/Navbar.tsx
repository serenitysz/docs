import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Menu, X, Twitter } from "lucide-react";
import { useState } from "react";
import serenityLogo from "@/assets/serenity-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={serenityLogo} alt="Serenity" className="w-10 h-10 rounded object-contain" />
            <span className="font-bold text-xl">Serenity</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/docs#getting-started"
              className={`text-sm font-medium transition-colors ${
                isDocsPage ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Docs
            </Link>
            <Link
              to="/docs#rules"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Rules
            </Link>
            <a
              href="https://github.com/serenitysz/serenity"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/serenitylint"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 border-0 text-white font-semibold">
              <Link to="/docs#getting-started">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <Link
                to="/docs#getting-started"
                className="text-sm font-medium text-muted-foreground hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Docs
              </Link>
              <Link
                to="/docs#rules"
                className="text-sm font-medium text-muted-foreground hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Rules
              </Link>
              <a
                href="https://github.com/serenitysz/serenity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-white flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://twitter.com/serenitylint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-muted-foreground hover:text-white flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </a>
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 w-fit text-white font-semibold">
                <Link to="/docs#getting-started" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;