const Introduction = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Introduction</h1>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Serenity is a next-generation static analysis tool for Go that prioritizes 
        precision, speed, and developer experience above all else.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Philosophy</h2>
      
      <div className="space-y-6 text-muted-foreground">
        <div className="glow-border rounded-lg p-6 bg-card/30">
          <h3 className="text-lg font-semibold text-foreground mb-2">Aggressive but Fair</h3>
          <p>
            Serenity doesn't shy away from flagging issues that other linters might ignore. 
            However, every rule is designed to catch genuine problems—not stylistic 
            preferences or edge cases that rarely matter in practice.
          </p>
        </div>

        <div className="glow-border rounded-lg p-6 bg-card/30">
          <h3 className="text-lg font-semibold text-foreground mb-2">Strict but Configurable</h3>
          <p>
            Out of the box, Serenity enforces strict best practices. But we understand 
            that every team has different needs. Every rule can be configured, 
            adjusted, or disabled entirely via the configuration file.
          </p>
        </div>

        <div className="glow-border rounded-lg p-6 bg-card/30">
          <h3 className="text-lg font-semibold text-foreground mb-2">Designed for Professional Teams</h3>
          <p>
            Serenity is built for teams that take code quality seriously. It integrates 
            seamlessly into CI/CD pipelines, provides actionable diagnostics, and 
            supports auto-fixing for many common issues.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Key Features</h2>
      
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="text-accent">•</span>
          <span><strong className="text-foreground">Ultra-fast execution</strong> — optimized AST traversal and parallel processing</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent">•</span>
          <span><strong className="text-foreground">Zero-noise output</strong> — only actionable issues, no false positives</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent">•</span>
          <span><strong className="text-foreground">Auto-fix support</strong> — automatically resolve common issues</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent">•</span>
          <span><strong className="text-foreground">Granular configuration</strong> — enable, disable, or customize any rule</span>
        </li>
        <li className="flex items-start gap-3">
          <span className="text-accent">•</span>
          <span><strong className="text-foreground">CI/CD ready</strong> — designed for integration into automated workflows</span>
        </li>
      </ul>
    </article>
  );
};

export default Introduction;
