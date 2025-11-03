import { Card } from "@/components/ui/card";
import { Shield, Zap, Lock, Code, Activity, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Continuous Security Testing",
    description: "24/7 automated testing of your application's UI and API endpoints to discover vulnerabilities before they become threats.",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Verify domain ownership with a simple TXT record. Start testing in minutes, not hours.",
    gradient: "from-yellow-500/20 to-orange-500/20"
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description: "Organization-level authentication with DNS verification ensures only authorized testing of your applications.",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Code,
    title: "API & UI Testing",
    description: "Comprehensive testing coverage including REST APIs, GraphQL endpoints, and full UI interaction flows.",
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Get instant notifications when vulnerabilities are detected with detailed reports and remediation steps.",
    gradient: "from-red-500/20 to-rose-500/20"
  },
  {
    icon: CheckCircle,
    title: "Ethical & Compliant",
    description: "All testing follows ethical hacking guidelines and compliance standards. Your data stays secure.",
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
            Why Choose <span className="gradient-text">Fetchbot</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade security testing made accessible for every team
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group p-6 bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden hover-scale"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary" />
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
