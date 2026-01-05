import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";

const jsonConfig = `{
  "$schema": "https://raw.githubusercontent.com/serenitysz/serenity/main/schema.json",
  "linter": {
    "use": true,
    "rules": {
      "recommended": true,
      "errors": {
        "noErrorShadowing": { "severity": "error" },
        "errorStringFormat": { "severity": "warn" },
        "errorNotWrapped": { "severity": "error" }
      },
      "bestPractices": {
        "noMagicNumbers": { "severity": "warn" },
        "maxParams": { "max": 5 },
        "useContextInFirstParam": { "severity": "error" }
      },
      "complexity": {
        "maxFuncLines": { "severity": "warn", "max": 60 },
        "cyclomaticComplexity": { "severity": "warn", "max": 10 }
      },
      "naming": {
        "receiverNames": { "severity": "info", "maxSize": 3 }
      }
    }
  }
}`;

const yamlConfig = `$schema: "https://raw.githubusercontent.com/serenitysz/serenity/main/schema.json"
linter:
  use: true
  rules:
    recommended: true
    errors:
      noErrorShadowing:
        severity: "error"
      errorStringFormat:
        severity: "warn"
      errorNotWrapped:
        severity: "error"
    bestPractices:
      noMagicNumbers:
        severity: "warn"
      maxParams:
        max: 5
      useContextInFirstParam:
        severity: "error"
    complexity:
      maxFuncLines:
        severity: "warn"
        max: 60
      cyclomaticComplexity:
        severity: "warn"
        max: 10
    naming:
      receiverNames:
        severity: "info"
        maxSize: 3`;

const tomlConfig = `"$schema" = "https://raw.githubusercontent.com/serenitysz/serenity/main/schema.json"

[linter]
  use = true

  [linter.rules]
    recommended = true

    [linter.rules.errors]
      [linter.rules.errors.noErrorShadowing]
        severity = "error"
      [linter.rules.errors.errorStringFormat]
        severity = "warn"
      [linter.rules.errors.errorNotWrapped]
        severity = "error"

    [linter.rules.bestPractices]
      [linter.rules.bestPractices.noMagicNumbers]
        severity = "warn"
      [linter.rules.bestPractices.maxParams]
        max = 5
      [linter.rules.bestPractices.useContextInFirstParam]
        severity = "error"

    [linter.rules.complexity]
      [linter.rules.complexity.maxFuncLines]
        severity = "warn"
        max = 60
      [linter.rules.complexity.cyclomaticComplexity]
        severity = "warn"
        max = 10

    [linter.rules.naming]
      [linter.rules.naming.receiverNames]
        severity = "info"
        maxSize = 3`;

const ConfigExample = () => {
  return (
    <div className="my-8">
      <Tabs defaultValue="json" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-[400px]">
          <TabsTrigger value="json">JSON</TabsTrigger>
          <TabsTrigger value="yaml">YAML</TabsTrigger>
          <TabsTrigger value="toml">TOML</TabsTrigger>
          <TabsTrigger value="yml">YML</TabsTrigger>
        </TabsList>
        <TabsContent value="json">
          <CodeBlock code={jsonConfig} language="json" filename="serenity.json" />
        </TabsContent>
        <TabsContent value="yaml">
          <CodeBlock code={yamlConfig} language="yaml" filename="serenity.yaml" />
        </TabsContent>
        <TabsContent value="toml">
          <CodeBlock code={tomlConfig} language="toml" filename="serenity.toml" />
        </TabsContent>
        <TabsContent value="yml">
          <CodeBlock code={yamlConfig} language="yaml" filename="serenity.yml" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfigExample;
