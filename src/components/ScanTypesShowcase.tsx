import { Shield, Lock, Code, Database, Globe, Terminal, CheckCircle2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const scanTypes = [
  {
    icon: Shield,
    name: "OWASP Top 10",
    description: "Industry standard vulnerability scanning",
    coverage: "95%"
  },
  {
    icon: Lock,
    name: "Authentication",
    description: "Session & token security testing",
    coverage: "98%"
  },
  {
    icon: Code,
    name: "API Security",
    description: "REST & GraphQL endpoint testing",
    coverage: "92%"
  },
  {
    icon: Database,
    name: "SQL Injection",
    description: "Database security analysis",
    coverage: "99%"
  },
  {
    icon: Globe,
    name: "XSS Protection",
    description: "Cross-site scripting detection",
    coverage: "96%"
  },
  {
    icon: Terminal,
    name: "Command Injection",
    description: "Shell execution vulnerability checks",
    coverage: "94%"
  }
];

export const ScanTypesShowcase = () => {
  const [selectedScan, setSelectedScan] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedScan((prev) => (prev + 1) % scanTypes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Intelligent Scanning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Choose Your <span className="gradient-text">Security Approach</span>
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Our model automatically selects and runs multiple scan types tailored to your application's architecture
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Clean grid layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scanTypes.map((scan, index) => {
              const isSelected = selectedScan === index;
              
              return (
                <Card
                  key={index}
                  className={`relative p-5 border transition-all duration-300 cursor-pointer overflow-hidden
                    ${isSelected 
                      ? 'border-primary/50 bg-primary/5 shadow-lg' 
                      : 'border-border/50 bg-card/50 hover:border-primary/30 hover:shadow-md'
                    }`}
                  onClick={() => setSelectedScan(index)}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-transform duration-300
                      ${isSelected ? 'scale-110' : ''}`}>
                      <scan.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-base font-semibold truncate">{scan.name}</h3>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-snug mb-2">
                        {scan.description}
                      </p>
                      
                      {/* Coverage indicator */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ${isSelected ? 'w-full' : 'w-0'}`}
                          />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">{scan.coverage}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Clean summary stats */}
          <div className="mt-10 flex items-center justify-center gap-8 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">6+</div>
              <div className="text-xs text-muted-foreground">Scan Types</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">Auto</div>
              <div className="text-xs text-muted-foreground">Selection</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">Real-time</div>
              <div className="text-xs text-muted-foreground">Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
