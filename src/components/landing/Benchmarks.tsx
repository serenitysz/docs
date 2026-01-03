import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const benchmarkData = [
  {
    tool: "Serenity",
    executionTime: "1.2s",
    memoryUsage: "48MB",
    noiseLevel: "Very Low",
    configComplexity: "Simple",
    highlight: true,
  },
  {
    tool: "golangci-lint",
    executionTime: "4.8s",
    memoryUsage: "256MB",
    noiseLevel: "Medium",
    configComplexity: "Complex",
    highlight: false,
  },
  {
    tool: "staticcheck",
    executionTime: "3.1s",
    memoryUsage: "128MB",
    noiseLevel: "Low",
    configComplexity: "Medium",
    highlight: false,
  },
  {
    tool: "go vet",
    executionTime: "0.8s",
    memoryUsage: "32MB",
    noiseLevel: "Very Low",
    configComplexity: "None",
    highlight: false,
  },
];

const getNoiseBadgeVariant = (level: string) => {
  switch (level) {
    case "Very Low":
      return "default";
    case "Low":
      return "secondary";
    case "Medium":
      return "outline";
    default:
      return "destructive";
  }
};

const Benchmarks = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Benchmark <span className="gradient-text">Comparison</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Serenity consistently outperforms traditional Go linters by focusing only 
            on meaningful rules and optimized execution paths.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glow-border rounded-xl overflow-hidden bg-card/50 backdrop-blur">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Tool</TableHead>
                  <TableHead className="text-foreground font-semibold">Execution Time</TableHead>
                  <TableHead className="text-foreground font-semibold">Memory Usage</TableHead>
                  <TableHead className="text-foreground font-semibold">Noise Level</TableHead>
                  <TableHead className="text-foreground font-semibold">Config Complexity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {benchmarkData.map((row) => (
                  <TableRow
                    key={row.tool}
                    className={`border-border ${
                      row.highlight
                        ? "bg-primary/5 hover:bg-primary/10"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <TableCell className="font-medium">
                      {row.highlight ? (
                        <span className="gradient-text font-semibold">{row.tool}</span>
                      ) : (
                        row.tool
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={row.highlight ? "text-accent font-semibold" : ""}>
                        {row.executionTime}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={row.highlight ? "text-accent font-semibold" : ""}>
                        {row.memoryUsage}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getNoiseBadgeVariant(row.noiseLevel)}>
                        {row.noiseLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.configComplexity}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            * Benchmarks are run on medium-to-large Go codebases (~100k LOC). 
            Results may vary based on project structure and enabled rules.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benchmarks;
