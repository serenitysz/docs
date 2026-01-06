import { useState, useEffect } from "react";
import CodeBlock from "./CodeBlock";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Format = "json" | "yaml" | "toml";
type Strictness = "lenient" | "standard" | "strict";
type ProjectType = "standard" | "library" | "api";

const ConfigGenerator = () => {
  const [format, setFormat] = useState<Format>("json");
  const [strictness, setStrictness] = useState<Strictness>("standard");
  const [projectType, setProjectType] = useState<ProjectType>("standard");
  const [autoFix, setAutoFix] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState("");

  const [rules, setRules] = useState({
    noErrorShadowing: true,
    errorStringFormat: true,
    errorNotWrapped: true,
    noMagicNumbers: true,
    maxParams: true,
    useContextInFirstParam: true,
    noDeferInLoop: true,
    useSliceCapacity: true,
    alwaysPreferConst: true,
    maxFuncLines: true,
    cyclomaticComplexity: true,
    receiverNames: true,
  });

  useEffect(() => {
    const config = generateConfig();
    setGeneratedConfig(config);
  }, [format, strictness, projectType, autoFix, rules]);

  const generateConfig = () => {
    const config: any = {
      $schema: "https://raw.githubusercontent.com/serenitysz/serenity/main/schema.json",
      linter: {
        use: true,
        rules: {
          recommended: true,
          errors: {},
          bestPractices: {},
          complexity: {},
          naming: {},
        },
      },
    };

    if (rules.noErrorShadowing) config.linter.rules.errors.noErrorShadowing = { severity: "error" };
    if (rules.errorStringFormat) config.linter.rules.errors.errorStringFormat = { severity: "warn" };
    if (rules.errorNotWrapped) config.linter.rules.errors.errorNotWrapped = { severity: "error" };
    
    if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers = { severity: "warn" };
    if (rules.maxParams) config.linter.rules.bestPractices.maxParams = { max: 5 };
    if (rules.useContextInFirstParam) config.linter.rules.bestPractices.useContextInFirstParam = { severity: "error" };
    if (rules.noDeferInLoop) config.linter.rules.bestPractices.noDeferInLoop = { severity: "error" };
    if (rules.useSliceCapacity) config.linter.rules.bestPractices.useSliceCapacity = { severity: "warn" };
    if (rules.alwaysPreferConst) config.linter.rules.bestPractices.alwaysPreferConst = { severity: "warn" };

    if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines = { severity: "warn", max: 60 };
    if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity = { severity: "warn", max: 10 };

    if (rules.receiverNames) config.linter.rules.naming.receiverNames = { severity: "info", maxSize: 3 };

    // Apply strictness adjustments
    if (strictness === "strict") {
      if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines.max = 30;
      if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity.max = 5;
      if (rules.receiverNames) config.linter.rules.naming.receiverNames.severity = "warn";
      if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers.severity = "error";
    } else if (strictness === "lenient") {
      if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines.max = 100;
      if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity.max = 20;
      if (rules.receiverNames) config.linter.rules.naming.receiverNames.severity = "info";
      if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers.severity = "info";
    }

    // Apply Project Type adjustments
    if (projectType === "library") {
      config.linter.rules.naming.exportedIdentifiers = {
        severity: "error",
        pattern: "^[A-Z][a-zA-Z0-9]*$",
      };
    } else if (projectType === "api") {
      if (strictness !== "strict" && rules.maxFuncLines) {
         config.linter.rules.complexity.maxFuncLines.max = 80;
      }
    }

    // Apply AutoFix
    if (autoFix) {
      config.linter.assistance = {
        use: true,
        autofix: true,
      };
    }

    return formatConfig(config, format);
  };

  const formatConfig = (config: any, fmt: Format): string => {
    if (fmt === "json") {
      return JSON.stringify(config, null, 2);
    } else if (fmt === "yaml") {
      return toYaml(config);
    } else {
      return toToml(config);
    }
  };

  const toYaml = (obj: any, indent = ""): string => {
    let output = "";
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        if (Object.keys(value).length === 0) continue; 
        output += `${indent}${key}:\n${toYaml(value, indent + "  ")}`;
      } else {
         const valStr = typeof value === "string" ? `"${value}"` : value;
         output += `${indent}${key}: ${valStr}\n`;
      }
    }
    return output;
  };

  const toToml = (obj: any): string => {
    let output = `"$schema" = "${obj.$schema}"\n\n`;
    
    const serializeSection = (prefix: string, section: any) => {
      let out = "";
      for(const key in section) {
        if(typeof section[key] !== 'object') {
           const val = typeof section[key] === "string" ? `"${section[key]}"` : section[key];
           out += `${key} = ${val}\n`;
        }
      }
      for(const key in section) {
        if(typeof section[key] === 'object' && section[key] !== null) {
           if (Object.keys(section[key]).length === 0) continue;
           out += `\n[${prefix}${key}]\n`;
           out += serializeSection(`${prefix}${key}.`, section[key]);
        }
      }
      return out;
    }

    return output + serializeSection("", obj.linter ? {linter: obj.linter} : obj);
  };

  const toggleRule = (rule: keyof typeof rules) => {
    setRules(prev => ({ ...prev, [rule]: !prev[rule] }));
  };

    return (
      <div className="space-y-8 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Controls */}
          <div className="flex flex-col space-y-6 bg-card/20 p-6 rounded-xl border border-white/5 backdrop-blur-sm h-full">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold gradient-text">Configuration Generator</h3>
              <p className="text-sm text-muted-foreground">
                Customize your Serenity experience and generate a configuration file.
              </p>
            </div>
  
            <div className="space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select value={projectType} onValueChange={(v: ProjectType) => setProjectType(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Application</SelectItem>
                      <SelectItem value="library">Library / Package</SelectItem>
                      <SelectItem value="api">API Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
  
                <div className="space-y-2">
                  <Label>Strictness Level</Label>
                  <Select value={strictness} onValueChange={(v: Strictness) => setStrictness(v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strictness" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lenient">Lenient (Critical only)</SelectItem>
                      <SelectItem value="standard">Standard (Recommended)</SelectItem>
                      <SelectItem value="strict">Strict (High Quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
  
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="space-y-0.5">
                  <Label>Enable Auto-fix</Label>
                  <div className="text-xs text-muted-foreground">Allow Serenity to modify files</div>
                </div>
                <Switch checked={autoFix} onCheckedChange={setAutoFix} />
              </div>
              
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground">Active Rules</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {Object.keys(rules).map((rule) => (
                    <div key={rule} className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/5 transition-colors">
                      <Checkbox 
                        id={rule} 
                        checked={rules[rule as keyof typeof rules]} 
                        onCheckedChange={() => toggleRule(rule as keyof typeof rules)}
                      />
                      <label 
                        htmlFor={rule} 
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-muted-foreground"
                      >
                        {rule}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
  
              <div className="space-y-2 pt-2 border-t border-white/5">
                <Label>Output Format</Label>
                <div className="flex p-1 bg-muted/50 rounded-lg">
                  {(["json", "yaml", "toml"] as Format[]).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${format === fmt 
                        ? "bg-primary/20 text-primary shadow-sm" 
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
  
          {/* Output */}
          <div className="h-full">
            <CodeBlock 
              code={generatedConfig} 
              language={format} 
              filename={`serenity.${format}`} 
              className="h-full"
            />
          </div>
        </div>
      </div>
    );};

export default ConfigGenerator;