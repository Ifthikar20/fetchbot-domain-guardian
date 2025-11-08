import { Card, CardContent } from "@/components/ui/card";
import { Github, FileText, Shield, Zap, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: Github,
    number: "01",
    title: "Onboard Your App",
    description: "Connect your application and integrate with GitHub. Quick setup gets you scanning in minutes.",
    details: [
      "Connect via API or URL",
      "GitHub integration",
      "Automated configuration"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    number: "02",
    title: "Select Scan Types",
    description: "Choose from multiple security testing approaches tailored to your needs.",
    details: [
      "OWASP Top 10 scanning",
      "API security testing",
      "Authentication checks"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Zap,
    number: "03",
    title: "Fetchbot Mimics Threats",
    description: "Different bots simulate real threat actors, each scanning your app with unique attack patterns.",
    details: [
      "Multiple bot strategies",
      "Real-world attack simulation",
      "Continuous 24/7 testing"
    ],
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Get Comprehensive Reports",
    description: "GitHub integration pinpoints exact error locations. Each bot delivers detailed findings.",
    details: [
      "Code-level vulnerability mapping",
      "Multi-bot report aggregation",
      "Actionable fix recommendations"
    ],
    color: "from-violet-500 to-purple-500"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20 mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Simple Setup</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Go from Zero to <span className="gradient-text">Secure</span> in 10 Minutes
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Simple setup. Powerful protection. Get enterprise-grade security running fast.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-[44px] top-24 w-0.5 h-16 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
              
              <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 rounded-2xl bg-card/30 backdrop-blur-sm floating-card">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-12 gap-0">
                    {/* Left side - Number and Icon */}
                    <div className="lg:col-span-2 p-4 flex flex-col items-start justify-center border-b lg:border-b-0 lg:border-r border-border/50 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5`} />
                      <div className="relative z-10 w-full">
                        <div className={`text-3xl font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent mb-2`}>
                          {step.number}
                        </div>
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} opacity-10 flex items-center justify-center group-hover:opacity-20 transition-all duration-300 group-hover:scale-110`}>
                          <step.icon className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="lg:col-span-10 p-4">
                      <h3 className="text-lg font-bold mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="grid sm:grid-cols-3 gap-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/20 transition-colors">
                            <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="text-xs text-foreground/90">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button size="lg" className="group">
            Start Your Free Trial
            <Zap className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};
