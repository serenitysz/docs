import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import "@/lib/prism-setup";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-toml";
import "prismjs/components/prism-go";
import "prismjs/components/prism-json";
import { Button } from "@/components/ui/button";
import { rosePineTheme } from "@/lib/prism-theme";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  className?: string;
  autoHeight?: boolean;
}

const CodeBlock = ({ code, language = "bash", filename, className, autoHeight = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Glow effect background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className={cn(
        "relative rounded-2xl overflow-hidden border border-white/10 bg-[#191724]/60 backdrop-blur-md shadow-xl flex flex-col",
        autoHeight ? "h-auto" : "h-full"
      )}>
        {/* Liquid glass gloss overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/5 via-transparent to-transparent z-10" />
        
        {filename && (
          <div className="px-4 py-3 border-b border-white/5 bg-white/5 flex items-center justify-between relative z-20 shrink-0">
            <span className="text-sm text-muted-foreground font-mono">{filename}</span>
          </div>
        )}

        <div className={cn("relative z-0 flex-1", autoHeight ? "overflow-visible" : "overflow-hidden")}>
          <Highlight theme={rosePineTheme} code={code} language={language}>
            {({ className: highlightClass, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`p-6 text-sm md:text-base font-mono scrollbar-none ${highlightClass}`}
                style={{ ...style, margin: 0, backgroundColor: 'transparent' }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 text-muted-foreground hover:text-white hover:bg-white/10 transition-all z-20"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CodeBlock;
