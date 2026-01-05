import CodeBlock from "@/components/docs/CodeBlock";

const Configuration = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Customize Serenity's behavior with a simple JSON configuration file.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Configuration File</h2>

      <p className="text-muted-foreground mb-4">
        Serenity looks for <code className="text-accent bg-muted px-1.5 py-0.5 rounded">serenity.json</code> in
        your project root. You can also specify a custom path using the <code className="text-accent bg-muted px-1.5 py-0.5 rounded">--config</code> flag.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Full Example</h2>

      <CodeBlock
        code={`{
  "rules": {
    "error-check": "error",
    "unused-param": "warn",
    "shadow-var": "warn",
    "nil-check": "error",
    "context-first": "error",
    "error-strings": "warn",
    "receiver-naming": "info"
  },
  "ruleGroups": {
    "recommended": true,
    "best-practices": true,
    "performance": false
  },
  "exclude": [
    "vendor/**",
    "**/*_test.go",
    "**/testdata/**"
  ],
  "severity": "warn",
  "format": "text",
  "fix": false,
  "parallel": 4
}`}
        language="json"
        filename="serenity.json"
      />

      <h2 className="text-2xl font-semibold mt-12 mb-4">Options Reference</h2>

      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">rules</h3>
          <p className="text-muted-foreground mb-4">
            Configure individual rules. Each rule can be set to:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <code className="text-accent bg-muted px-1.5 py-0.5 rounded">"error"</code>
              <span>Report as error (exit code 1)</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded">"warn"</code>
              <span>Report as warning (exit code 0)</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-secondary bg-muted px-1.5 py-0.5 rounded">"info"</code>
              <span>Report as informational</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-muted-foreground bg-muted px-1.5 py-0.5 rounded">"off"</code>
              <span>Disable the rule</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">ruleGroups</h3>
          <p className="text-muted-foreground mb-4">
            Enable or disable entire groups of rules:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-3">
              <code className="text-accent bg-muted px-1.5 py-0.5 rounded">recommended</code>
              <span>Essential rules for any Go project</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-accent bg-muted px-1.5 py-0.5 rounded">best-practices</code>
              <span>Idiomatic Go patterns</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-accent bg-muted px-1.5 py-0.5 rounded">performance</code>
              <span>Performance-focused rules</span>
            </li>
            <li className="flex items-start gap-3">
              <code className="text-accent bg-muted px-1.5 py-0.5 rounded">security</code>
              <span>Security-focused rules</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">exclude</h3>
          <p className="text-muted-foreground">
            Array of glob patterns for files and directories to exclude from analysis.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">severity</h3>
          <p className="text-muted-foreground">
            Minimum severity level to report. Issues below this level are ignored.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">format</h3>
          <p className="text-muted-foreground">
            Output format: <code className="text-accent bg-muted px-1 rounded">text</code>,
            <code className="text-accent bg-muted px-1 rounded ml-1">json</code>,
            <code className="text-accent bg-muted px-1 rounded ml-1">sarif</code>, or
            <code className="text-accent bg-muted px-1 rounded ml-1">github</code>.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">fix</h3>
          <p className="text-muted-foreground">
            Whether to automatically apply fixes. Default: <code className="text-accent bg-muted px-1 rounded">false</code>.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-foreground">parallel</h3>
          <p className="text-muted-foreground">
            Number of parallel workers for analysis. Default: number of CPU cores.
          </p>
        </div>
      </div>
    </article>
  );
};

export default Configuration;
