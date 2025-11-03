import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Code, Activity, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Continuous Security Testing",
    description: "24/7 automated testing of your application's UI and API endpoints to discover vulnerabilities before they become threats."
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Verify domain ownership with a simple TXT record. Start testing in minutes, not hours."
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description: "Organization-level authentication with DNS verification ensures only authorized testing of your applications."
  },
  {
    icon: Code,
    title: "API & UI Testing",
    description: "Comprehensive testing coverage including REST APIs, GraphQL endpoints, and full UI interaction flows."
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Get instant notifications when vulnerabilities are detected with detailed reports and remediation steps."
  },
  {
    icon: CheckCircle,
    title: "Ethical & Compliant",
    description: "All testing follows ethical hacking guidelines and compliance standards. Your data stays secure."
  }
];

export const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-gradient">Fetchbot</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security testing made accessible for every team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-card border-primary/10 hover:border-primary/30 transition-all duration-300 hover:glow-cyan group"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
