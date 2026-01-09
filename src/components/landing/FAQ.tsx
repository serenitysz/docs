import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How is Serenity different from other Go linters?",
    answer:
      "Unlike many common linters that act as aggregators for multiple independent tools, Serenity is built from the ground up with a single, high-performance engine. It traverses the AST once to run all rules simultaneously, eliminating redundant work and overhead. This approach results in 4x-10x faster execution and significantly lower memory usage on large-scale codebases.",
  },
  {
    question: "Is it compatible with my existing workflow?",
    answer:
      "Yes. Serenity outputs standard formats (text, JSON, SARIF) and integrates seamlessly with GitHub Actions, GitLab CI, and VS Code. We also offer a migration command to import your existing linter configurations.",
  },
  {
    question: "Does it support auto-fixing?",
    answer:
      "Absolutely. Serenity has a first-class --write flag that safely fixes common issues like formatting, import ordering, and simple refactors without breaking your logic.",
  },
  {
    question: "Can I write custom rules?",
    answer:
      "Not yet, but it's on our roadmap. We are building a plugin system based on WASM that will allow you to write custom rules in Go or any language that compiles to WebAssembly.",
  },
  {
    question: "Is it ready for production?",
    answer:
      "Serenity is currently in closed beta. We are stress-testing it on large monorepos to ensure stability. Join the waitlist to get early access.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-[#08080a]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about the next generation of Go linting.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/10 bg-white/[0.02] rounded-xl px-6 data-[state=open]:bg-white/[0.04] transition-all duration-200"
              >
                <AccordionTrigger className="text-lg font-medium text-left hover:no-underline py-6 [&[data-state=open]]:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
