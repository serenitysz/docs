import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeBlock from "./CodeBlock";

interface MultiFormatBlockProps {
  json: string;
  yaml: string;
  toml: string;
  yml?: string;
  fileNameBase?: string;
}

const MultiFormatBlock = ({ 
  json, 
  yaml, 
  toml, 
  yml, 
  fileNameBase = "config" 
}: MultiFormatBlockProps) => {
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
          <CodeBlock code={json} language="json" filename={`${fileNameBase}.json`} />
        </TabsContent>
        <TabsContent value="yaml">
          <CodeBlock code={yaml} language="yaml" filename={`${fileNameBase}.yaml`} />
        </TabsContent>
        <TabsContent value="toml">
          <CodeBlock code={toml} language="toml" filename={`${fileNameBase}.toml`} />
        </TabsContent>
        <TabsContent value="yml">
          <CodeBlock code={yml || yaml} language="yaml" filename={`${fileNameBase}.yml`} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MultiFormatBlock;
