import MultiFormatBlock from "./MultiFormatBlock";

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
    <MultiFormatBlock 
      json={jsonConfig}
      yaml={yamlConfig}
      toml={tomlConfig}
      fileNameBase="serenity"
    />
  );
};

export default ConfigExample;