import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      {/* Floating abstract shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect border border-primary/20 animate-fade-in">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Enterprise Security Testing Platform</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-fade-in leading-tight" style={{ animationDelay: '0.1s' }}>
            Proactive Cyber Defense
            <br />
            <span className="gradient-text">For Modern Enterprises</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Continuous automated penetration testing that identifies and neutralizes vulnerabilities before they become breaches. Trusted by Fortune 500 companies.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button size="lg" variant="outline" className="glass-effect border-primary/20 hover:border-primary/40">
              Watch Demo
            </Button>
          </div>
          
          {/* Artistic dashboard preview */}
          <div className="relative mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="relative rounded-2xl overflow-hidden glass-effect p-1">
              <div className="bg-card rounded-xl p-8">
                {/* Abstract dashboard representation */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-24 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="h-24 rounded-lg bg-gradient-to-br from-purple-500/20 to-primary/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="h-3 rounded bg-muted/50 w-3/4" />
                    <div className="h-3 rounded bg-muted/30 w-full" />
                    <div className="h-3 rounded bg-muted/30 w-5/6" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 rounded bg-muted/50 w-2/3" />
                    <div className="h-3 rounded bg-muted/30 w-full" />
                    <div className="h-3 rounded bg-muted/30 w-4/5" />
                  </div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-purple-500 opacity-20 blur-2xl -z-10" />
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">10M+</div>
              <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">500+</div>
              <div className="text-sm text-muted-foreground">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold gradient-text">99.9%</div>
              <div className="text-sm text-muted-foreground">Detection Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
