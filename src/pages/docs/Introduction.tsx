import CodeBlock from "@/components/docs/CodeBlock";

const Introduction = () => {
  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="text-4xl font-bold mb-4 gradient-text">Introduction</h1>
      
      <p className="text-lg text-muted-foreground leading-relaxed mb-8">
        Serenity is a next-generation static analysis tool for Go that prioritizes 
        precision, speed, and developer experience above all else.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Usage</h2>
      
      <p className="text-muted-foreground mb-4">
        To run Serenity on your project, use the <code className="text-accent bg-muted px-1.5 py-0.5 rounded">check</code> command. 
        The default path is the current directory (<code className="text-accent bg-muted px-1.5 py-0.5 rounded">.</code>).
      </p>

      <CodeBlock code="serenity check ." language="bash" />

      <p className="text-muted-foreground mb-4">
        You can also specify a specific path:
      </p>

      <CodeBlock code="serenity check ./cmd/..." language="bash" />
    </article>
  );
};

export default Introduction;