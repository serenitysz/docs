import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Benchmarks from "@/components/landing/Benchmarks";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Benchmarks />
      <Footer />
    </div>
  );
};

export default Index;
