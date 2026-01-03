import CodeBlock from "@/components/docs/CodeBlock";

const CLIReference = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 gradient-text">CLI Reference</h1>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Complete reference for all Serenity command-line options.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Synopsis</h2>

      <CodeBlock code="serenity [flags] [packages...]" language="bash" />

      <h2 className="text-2xl font-semibold mt-12 mb-4">Flags</h2>

      <div className="space-y-6">
        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--config, -c &lt;path&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Path to the configuration file. Default: <code className="text-foreground bg-muted px-1 rounded">serenity.json</code>
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--fix</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Automatically fix issues where possible.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--format, -f &lt;format&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Output format. Options: <code className="text-foreground bg-muted px-1 rounded">text</code>, 
            <code className="text-foreground bg-muted px-1 rounded ml-1">json</code>, 
            <code className="text-foreground bg-muted px-1 rounded ml-1">sarif</code>, 
            <code className="text-foreground bg-muted px-1 rounded ml-1">github</code>
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--severity &lt;level&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Minimum severity to report. Options: <code className="text-foreground bg-muted px-1 rounded">error</code>, 
            <code className="text-foreground bg-muted px-1 rounded ml-1">warn</code>, 
            <code className="text-foreground bg-muted px-1 rounded ml-1">info</code>
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--enable &lt;rules&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Comma-separated list of rules to enable.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--disable &lt;rules&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Comma-separated list of rules to disable.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--exclude &lt;patterns&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Glob patterns for files to exclude.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--parallel, -j &lt;n&gt;</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Number of parallel workers. Default: number of CPU cores.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--verbose, -v</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Enable verbose output.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--version</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Print version information and exit.
          </p>
        </div>

        <div className="glow-border rounded-lg p-4 bg-card/30">
          <code className="text-accent font-mono">--help, -h</code>
          <p className="text-muted-foreground mt-2 mb-0">
            Show help message.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Examples</h2>

      <p className="text-muted-foreground mb-4">Lint all packages with auto-fix:</p>
      <CodeBlock code="serenity --fix ./..." language="bash" />

      <p className="text-muted-foreground mb-4">Output in JSON format for CI:</p>
      <CodeBlock code="serenity --format json ./..." language="bash" />

      <p className="text-muted-foreground mb-4">Only show errors, ignore warnings:</p>
      <CodeBlock code="serenity --severity error ./..." language="bash" />

      <p className="text-muted-foreground mb-4">Use custom config and exclude tests:</p>
      <CodeBlock code='serenity -c .serenity.json --exclude "**/*_test.go" ./...' language="bash" />
    </article>
  );
};

export default CLIReference;
