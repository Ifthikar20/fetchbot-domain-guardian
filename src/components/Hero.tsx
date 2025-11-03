import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";
import heroCyber from "@/assets/hero-cyber.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-primary/20 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Automated Security Testing</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Your{" "}
            <span className="text-gradient">24/7 Ethical Hacker</span>
            {" "}Testing Your Apps
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Fetchbot continuously tests your UI and APIs like a real ethical hacker. 
            Verify ownership with DNS TXT records and let us find vulnerabilities before attackers do.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-secondary">
              Learn More
            </Button>
          </div>
          
          {/* Hero Image */}
          <div className="relative mt-16 rounded-2xl overflow-hidden border border-primary/20 glow-cyan">
            <img 
              src={heroCyber} 
              alt="Fetchbot security dashboard showing automated testing interface"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};
