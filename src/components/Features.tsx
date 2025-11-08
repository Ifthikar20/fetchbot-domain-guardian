import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Code, Activity, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Proactive Scanning",
    description: "Fetchbot continuously monitors your app, running security tests automatically with every code change—no manual triggers needed.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Code,
    title: "Commit Tracking",
    description: "Integrates with GitHub to track every commit, mapping vulnerabilities directly to code changes for instant context.",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Activity,
    title: "Change Documentation",
    description: "Automatically documents all code changes and their security impact, creating a complete audit trail for your team.",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Zap,
    title: "Multiple Bot Strategies",
    description: "Different bots simulate real threat actors, each with unique attack patterns to find vulnerabilities others miss.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: CheckCircle,
    title: "Comprehensive Reports",
    description: "Get detailed findings from each bot with exact error locations in your codebase and actionable fix recommendations.",
    gradient: "from-red-500/20 to-rose-500/20"
  },
  {
    icon: Lock,
    title: "Ethical & Secure",
    description: "Your ethical hacker operates within strict guidelines, ensuring all testing is authorized and your data stays protected.",
    gradient: "from-indigo-500/20 to-violet-500/20"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Always-On <span className="gradient-text">Security Expert</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fetchbot works like a dedicated team member, constantly protecting your codebase
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/30 relative overflow-hidden floating-card"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
