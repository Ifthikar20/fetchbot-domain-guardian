import { Card } from "@/components/ui/card";
import { LogIn, FileText, Shield, BarChart } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    number: "01",
    title: "Login as Organization",
    description: "Create your organization account and access the Fetchbot dashboard."
  },
  {
    icon: FileText,
    number: "02",
    title: "Add TXT Record",
    description: "Verify domain ownership by adding a simple TXT record to your DNS settings."
  },
  {
    icon: Shield,
    number: "03",
    title: "Automated Testing Begins",
    description: "Fetchbot starts continuous security testing of your UI and APIs automatically."
  },
  {
    icon: BarChart,
    number: "04",
    title: "Review & Fix",
    description: "Get detailed vulnerability reports with actionable remediation steps."
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-24 relative bg-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started with automated security testing in four simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-primary/10 relative group hover:border-primary/30 transition-all"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg glow-cyan">
                {step.number}
              </div>
              <step.icon className="w-10 h-10 text-primary mb-4 mt-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
