import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";
import serenityLogo from "@/assets/serenity-logo.png";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <img src={serenityLogo} alt="Serenity" className="w-8 h-8 rounded object-contain" />
            <span className="font-semibold text-lg">Serenity</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Documentation
            </Link>
            <Link to="/docs#getting-started" className="hover:text-foreground transition-colors">
              Getting Started
            </Link>
            <Link to="/docs#rules" className="hover:text-foreground transition-colors">
              Rules
            </Link>
          </nav>

          <div className="flex items-center gap-4">
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
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Serenity. Open source under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
