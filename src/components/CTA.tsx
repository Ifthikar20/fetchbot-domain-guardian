import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating orbs */}
      <div className="absolute top-10 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Glass card effect */}
          <div className="glass-effect rounded-3xl p-12 relative overflow-hidden">
            {/* Accent gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            
            <div className="relative space-y-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Start Your Free Trial</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold">
                Ready to <span className="gradient-text">Secure</span> Your Digital Assets?
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join hundreds of companies protecting their applications with automated security testing. 
                Start your free trial today—no credit card required.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button size="lg" className="group relative overflow-hidden" asChild>
                  <Link to="/dashboard">
                    <span className="relative z-10 flex items-center">
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass-effect border-primary/20 hover:border-primary/40">
                  Schedule Demo
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  14-day free trial
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Cancel anytime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
