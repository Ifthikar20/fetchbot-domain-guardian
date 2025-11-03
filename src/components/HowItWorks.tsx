import { Card } from "@/components/ui/card";
import { LogIn, FileText, Shield, BarChart } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    number: "01",
    title: "Login as Organization",
    description: "Create your organization account and access the Fetchbot dashboard.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FileText,
    number: "02",
    title: "Add TXT Record",
    description: "Verify domain ownership by adding a simple TXT record to your DNS settings.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    number: "03",
    title: "Automated Testing Begins",
    description: "Fetchbot starts continuous security testing of your UI and APIs automatically.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: BarChart,
    number: "04",
    title: "Review & Fix",
    description: "Get detailed vulnerability reports with actionable remediation steps.",
    color: "from-orange-500 to-red-500"
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with automated security testing in four simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <Card className="p-6 bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all relative group h-full">
                {/* Number badge */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center font-bold text-lg text-white shadow-lg`}>
                  {step.number}
                </div>
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} opacity-20 flex items-center justify-center mb-4 group-hover:opacity-30 transition-opacity`}>
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
