import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Benchmarks from "@/components/landing/Benchmarks";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import Integrations from "@/components/landing/Integrations";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Benchmarks />
      <HowItWorks />
      <FAQ />
      <Integrations />
      <Footer />
    </div>
  );
};

export default Index;
