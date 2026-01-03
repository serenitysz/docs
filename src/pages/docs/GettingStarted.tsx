import CodeBlock from "@/components/docs/CodeBlock";

const GettingStarted = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Getting Started</h1>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Get up and running with Serenity in just a few minutes.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Installation</h2>
      
      <p className="text-muted-foreground mb-4">
        Install Serenity using Go's built-in package manager:
      </p>

      <CodeBlock 
        code="go install github.com/serenitysz/serenity@latest" 
        language="bash" 
      />

      <p className="text-muted-foreground mb-4">
        Alternatively, you can download pre-built binaries from the{" "}
        <a href="https://github.com/serenitysz/serenity/releases" className="text-primary hover:underline">
          releases page
        </a>.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Basic Usage</h2>

      <p className="text-muted-foreground mb-4">
        Run Serenity on your current directory:
      </p>

      <CodeBlock code="serenity ." language="bash" />

      <p className="text-muted-foreground mb-4">
        Or specify a package or file:
      </p>

      <CodeBlock code="serenity ./pkg/..." language="bash" />

      <h2 className="text-2xl font-semibold mt-12 mb-4">Quick Configuration</h2>

      <p className="text-muted-foreground mb-4">
        Create a <code className="text-accent bg-muted px-1.5 py-0.5 rounded">serenity.json</code> file 
        in your project root to customize Serenity's behavior:
      </p>

      <CodeBlock 
        code={`{
  "rules": {
    "error-check": "error",
    "unused-param": "warn",
    "shadow-var": "off"
  },
  "exclude": [
    "vendor/**",
    "**/*_test.go"
  ]
}`}
        language="json"
        filename="serenity.json"
      />

      <h2 className="text-2xl font-semibold mt-12 mb-4">Auto-fix</h2>

      <p className="text-muted-foreground mb-4">
        Many issues can be automatically fixed using the <code className="text-accent bg-muted px-1.5 py-0.5 rounded">--fix</code> flag:
      </p>

      <CodeBlock code="serenity --fix ." language="bash" />

      <h2 className="text-2xl font-semibold mt-12 mb-4">CI/CD Integration</h2>

      <p className="text-muted-foreground mb-4">
        Add Serenity to your GitHub Actions workflow:
      </p>

      <CodeBlock 
        code={`name: Lint
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Install Serenity
        run: go install github.com/serenitysz/serenity@latest
      - name: Run Serenity
        run: serenity ./...`}
        language="yaml"
        filename=".github/workflows/lint.yml"
      />

      <div className="mt-12 p-6 glow-border rounded-lg bg-card/30">
        <p className="text-muted-foreground">
          <strong className="text-foreground">Next steps:</strong> Learn more about the{" "}
          <a href="/docs/cli" className="text-primary hover:underline">CLI commands</a>{" "}
          or dive into{" "}
          <a href="/docs/configuration" className="text-primary hover:underline">configuration options</a>.
        </p>
      </div>
    </article>
  );
};

export default GettingStarted;
