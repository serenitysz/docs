import { Outlet } from "react-router-dom";
import DocsSidebar from "./DocsSidebar";
import Navbar from "@/components/layout/Navbar";

const DocsLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsLayout;
