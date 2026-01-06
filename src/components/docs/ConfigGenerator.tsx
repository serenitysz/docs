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
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Format = "json" | "yaml" | "yml" | "toml";
type Strictness = "lenient" | "standard" | "strict";
type ProjectType = "standard" | "library" | "api";

const ConfigGenerator = () => {
  const [format, setFormat] = useState<Format>("json");
  const [strictness, setStrictness] = useState<Strictness>("standard");
  const [projectType, setProjectType] = useState<ProjectType>("standard");
  const [autoFix, setAutoFix] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

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
    redundantImportAlias: true,
    simplifyBooleanReturn: true,
    getMustReturnValue: true,
    preferEarlyReturn: true,
    redundantErrorCheck: true,
    boolLiteralExpressions: true,
    ambiguousReturns: true,
    bannedChars: true,
    preferIncDec: true,
    maxLineLength: true,
    packageComments: true,
    commentSpacing: true,
    fileHeader: false,
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
          imports: {},
          bestPractices: {},
          correctness: {},
          complexity: {},
          naming: {},
          style: {},
        },
      },
    };

    if (rules.noErrorShadowing) config.linter.rules.errors.noErrorShadowing = { severity: "error" };
    if (rules.errorStringFormat) config.linter.rules.errors.errorStringFormat = { severity: "warn" };
    if (rules.errorNotWrapped) config.linter.rules.errors.errorNotWrapped = { severity: "error" };
    
    if (rules.redundantImportAlias) config.linter.rules.imports.redundantImportAlias = { severity: "info" };

    if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers = { severity: "warn" };
    if (rules.maxParams) config.linter.rules.bestPractices.maxParams = { max: 5 };
    if (rules.useContextInFirstParam) config.linter.rules.bestPractices.useContextInFirstParam = { severity: "error" };
    if (rules.noDeferInLoop) config.linter.rules.bestPractices.noDeferInLoop = { severity: "error" };
    if (rules.useSliceCapacity) config.linter.rules.bestPractices.useSliceCapacity = { severity: "warn" };
    if (rules.alwaysPreferConst) config.linter.rules.bestPractices.alwaysPreferConst = { severity: "warn" };
    if (rules.simplifyBooleanReturn) config.linter.rules.bestPractices.simplifyBooleanReturn = { severity: "info" };
    if (rules.getMustReturnValue) config.linter.rules.bestPractices.getMustReturnValue = { severity: "warn" };
    if (rules.preferEarlyReturn) config.linter.rules.bestPractices.preferEarlyReturn = { severity: "info" };
    if (rules.redundantErrorCheck) config.linter.rules.bestPractices.redundantErrorCheck = { severity: "warn" };

    if (rules.boolLiteralExpressions) config.linter.rules.correctness.boolLiteralExpressions = { severity: "info" };
    if (rules.ambiguousReturns) config.linter.rules.correctness.ambiguousReturns = { severity: "warn" };

    if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines = { severity: "warn", max: 60 };
    if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity = { severity: "warn", max: 10 };

    if (rules.receiverNames) config.linter.rules.naming.receiverNames = { severity: "info", maxSize: 3 };
    if (rules.bannedChars) config.linter.rules.naming.bannedChars = { severity: "error", chars: ["\u200b"] };

    if (rules.preferIncDec) config.linter.rules.style.preferIncDec = { severity: "info" };
    if (rules.maxLineLength) config.linter.rules.style.maxLineLength = { severity: "warn", max: 120 };
    if (rules.packageComments) config.linter.rules.style.packageComments = { severity: "info", requireTopOfFile: true };
    if (rules.commentSpacing) config.linter.rules.style.commentSpacing = { severity: "info" };
    if (rules.fileHeader) config.linter.rules.style.fileHeader = { severity: "error", header: "Copyright 2024" };

    // Apply strictness adjustments
    if (strictness === "strict") {
      if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines.max = 30;
      if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity.max = 5;
      if (rules.receiverNames) config.linter.rules.naming.receiverNames.severity = "warn";
      if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers.severity = "error";
      if (rules.maxLineLength) config.linter.rules.style.maxLineLength.max = 100;
    } else if (strictness === "lenient") {
      if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines.max = 100;
      if (rules.cyclomaticComplexity) config.linter.rules.complexity.cyclomaticComplexity.max = 20;
      if (rules.receiverNames) config.linter.rules.naming.receiverNames.severity = "info";
      if (rules.noMagicNumbers) config.linter.rules.bestPractices.noMagicNumbers.severity = "info";
      if (rules.maxLineLength) config.linter.rules.style.maxLineLength.max = 140;
    }

    // Apply Project Type adjustments
    if (projectType === "library") {
      config.linter.rules.naming.exportedIdentifiers = {
        severity: "error",
        pattern: "^[A-Z][a-zA-Z0-9]*$",
      };
    } else if (projectType === "api") {
      if (strictness !== "strict") {
         if (rules.maxFuncLines) config.linter.rules.complexity.maxFuncLines.max = 80;
         if (rules.maxLineLength) config.linter.rules.style.maxLineLength.max = 120;
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
    } else if (fmt === "yaml" || fmt === "yml") {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-2">
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
                  {(["json", "yaml", "yml", "toml"] as Format[]).map((fmt) => (
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
          <div className={cn("relative group transition-all duration-500", isExpanded ? "h-auto" : "h-[600px]")}>
            <CodeBlock 
              code={generatedConfig} 
              language={format} 
              filename={`serenity.${format}`} 
              className={cn("transition-all duration-500", isExpanded ? "h-auto" : "h-full")}
              autoHeight={isExpanded}
            />
            
            {!isExpanded && (
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#191724] via-[#191724]/80 to-transparent z-10 pointer-events-none rounded-b-2xl" />
            )}

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 shadow-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white transition-all hover:scale-105 active:scale-95"
            >
              <ChevronsUpDown className="mr-2 h-3 w-3" />
              {isExpanded ? "Collapse" : "See more"}
            </Button>
          </div>
        </div>
      </div>
    );};

export default ConfigGenerator;