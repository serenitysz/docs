import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { Button } from "@/components/ui/button";
import { Wand2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface FixableCodeBlockProps {
  badCode: string;
  goodCode: string;
  language?: string;
  filename?: string;
}

const FixableCodeBlock = ({ badCode, goodCode, language = "go", filename }: FixableCodeBlockProps) => {
  const [isFixed, setIsFixed] = useState(false);

  return (
    <div className="relative group my-6">
      <div className="absolute top-3 right-14 z-20">
        <Button
          size="sm"
          variant={isFixed ? "outline" : "default"}
          onClick={() => setIsFixed(!isFixed)}
          className={cn(
            "h-8 text-xs gap-2 transition-all duration-500",
            isFixed 
              ? "bg-green-500/10 text-green-500 border-green-500/50 hover:bg-green-500/20 hover:text-green-400" 
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_-3px_rgba(124,58,237,0.5)]"
          )}
        >
          {isFixed ? (
            <>
              <RotateCcw className="h-3 w-3" />
              Reset
            </>
          ) : (
            <>
              <Wand2 className="h-3 w-3 animate-pulse" />
              Auto-fix
            </>
          )}
        </Button>
      </div>

      <CodeBlock
        code={isFixed ? goodCode : badCode}
        language={language}
        filename={filename}
        className={cn(
          "transition-all duration-500",
          isFixed ? "[&>div]:border-green-500/30 [&>div]:shadow-[0_0_30px_-5px_rgba(34,197,94,0.1)]" : "[&>div]:border-red-500/30"
        )}
      />
    </div>
  );
};

export default FixableCodeBlock;
