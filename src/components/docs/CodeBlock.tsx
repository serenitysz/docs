import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock = ({ code, language = "bash", filename }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {filename && (
        <div className="px-4 py-2 bg-muted border border-b-0 border-border rounded-t-lg text-sm text-muted-foreground font-mono">
          {filename}
        </div>
      )}
      <div
        className={`relative bg-muted border border-border overflow-hidden ${
          filename ? "rounded-b-lg" : "rounded-lg"
        }`}
      >
        <pre className="p-4 overflow-x-auto">
          <code className={`text-sm font-mono language-${language}`}>{code}</code>
        </pre>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CodeBlock;
