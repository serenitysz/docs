import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DocsLayout from "./components/docs/DocsLayout";
import Introduction from "./pages/docs/Introduction";
import GettingStarted from "./pages/docs/GettingStarted";
import CLIReference from "./pages/docs/CLIReference";
import Configuration from "./pages/docs/Configuration";
import Rules from "./pages/docs/Rules";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<Introduction />} />
            <Route path="getting-started" element={<GettingStarted />} />
            <Route path="cli" element={<CLIReference />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="rules" element={<Rules />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
