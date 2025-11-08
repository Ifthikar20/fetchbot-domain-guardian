import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustIndicators } from "@/components/TrustIndicators";
import { Features } from "@/components/Features";
import { UseCases } from "@/components/UseCases";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <TrustIndicators />
      <Features />
      <UseCases />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
