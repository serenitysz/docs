import { Outlet } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";
import Navbar from "@/components/layout/Navbar";

const DocsLayout = () => {
  return (
    <div className="min-h-screen bg-[#08080a] relative">
      {/* Background gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent opacity-50" />
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <Navbar />
      <div className="flex pt-16 relative z-10">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
