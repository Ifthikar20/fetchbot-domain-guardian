import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { ScanTypesShowcase } from "@/components/ScanTypesShowcase";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <ScanTypesShowcase />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
