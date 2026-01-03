import { Badge } from "@/components/ui/badge";

const rules = [
  {
    name: "error-check",
    description: "Ensure all errors are properly checked and handled",
    severity: "error",
    group: "recommended",
    autofix: false,
  },
  {
    name: "unused-param",
    description: "Detect unused function parameters",
    severity: "warn",
    group: "recommended",
    autofix: true,
  },
  {
    name: "shadow-var",
    description: "Detect variable shadowing in nested scopes",
    severity: "warn",
    group: "best-practices",
    autofix: false,
  },
  {
    name: "nil-check",
    description: "Ensure nil checks before pointer dereference",
    severity: "error",
    group: "recommended",
    autofix: false,
  },
  {
    name: "context-first",
    description: "Context should be the first parameter in functions",
    severity: "warn",
    group: "best-practices",
    autofix: true,
  },
  {
    name: "error-strings",
    description: "Error strings should not be capitalized or end with punctuation",
    severity: "info",
    group: "best-practices",
    autofix: true,
  },
  {
    name: "receiver-naming",
    description: "Receiver names should be consistent and short",
    severity: "info",
    group: "best-practices",
    autofix: true,
  },
  {
    name: "defer-loop",
    description: "Detect defer statements inside loops",
    severity: "error",
    group: "performance",
    autofix: false,
  },
  {
    name: "mutex-lock",
    description: "Ensure mutex locks are properly unlocked",
    severity: "error",
    group: "recommended",
    autofix: false,
  },
  {
    name: "sql-injection",
    description: "Detect potential SQL injection vulnerabilities",
    severity: "error",
    group: "security",
    autofix: false,
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "error":
      return "bg-destructive/20 text-destructive border-destructive/30";
    case "warn":
      return "bg-primary/20 text-primary border-primary/30";
    case "info":
      return "bg-secondary/20 text-secondary border-secondary/30";
    default:
      return "";
  }
};

const getGroupColor = (group: string) => {
  switch (group) {
    case "recommended":
      return "bg-accent/20 text-accent border-accent/30";
    case "best-practices":
      return "bg-primary/20 text-primary border-primary/30";
    case "performance":
      return "bg-secondary/20 text-secondary border-secondary/30";
    case "security":
      return "bg-destructive/20 text-destructive border-destructive/30";
    default:
      return "";
  }
};

const Rules = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Rules</h1>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Comprehensive list of all Serenity rules. Each rule can be configured 
        individually via the configuration file.
      </p>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.name}
            className="glow-border rounded-lg p-5 bg-card/30 hover:bg-card/50 transition-colors"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <code className="text-lg font-mono text-foreground">{rule.name}</code>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getSeverityColor(rule.severity)}>
                  {rule.severity}
                </Badge>
                <Badge variant="outline" className={getGroupColor(rule.group)}>
                  {rule.group}
                </Badge>
                {rule.autofix && (
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                    autofix
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-muted-foreground mb-0">{rule.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 glow-border rounded-lg bg-card/30">
        <h3 className="text-lg font-semibold text-foreground mb-2">Legend</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <strong className="text-foreground">Severity:</strong>
            <ul className="mt-2 space-y-1">
              <li><span className="text-destructive">error</span> — causes non-zero exit</li>
              <li><span className="text-primary">warn</span> — informational warning</li>
              <li><span className="text-secondary">info</span> — suggestion only</li>
            </ul>
          </div>
          <div>
            <strong className="text-foreground">Groups:</strong>
            <ul className="mt-2 space-y-1">
              <li><span className="text-accent">recommended</span> — essential rules</li>
              <li><span className="text-primary">best-practices</span> — idiomatic Go</li>
              <li><span className="text-secondary">performance</span> — optimization</li>
              <li><span className="text-destructive">security</span> — vulnerability detection</li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Rules;
