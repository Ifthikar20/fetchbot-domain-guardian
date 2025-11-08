import { Shield, Award, Users, Clock } from "lucide-react";

const stats = [
  {
    icon: Shield,
    value: "10M+",
    label: "Vulnerabilities Detected",
    description: "Across all customer applications"
  },
  {
    icon: Users,
    value: "500+",
    label: "Enterprise Clients",
    description: "Trust our security platform"
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Continuous Monitoring",
    description: "Real-time threat detection"
  },
  {
    icon: Award,
    value: "99.9%",
    label: "Detection Accuracy",
    description: "Industry-leading precision"
  }
];

export const TrustIndicators = () => {
  return (
    <section className="py-16 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="container px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
