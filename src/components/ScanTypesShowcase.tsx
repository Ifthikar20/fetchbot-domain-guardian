import { Shield, Lock, Code, Database, Globe, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const scanTypes = [
  {
    icon: Shield,
    name: "OWASP Top 10",
    description: "Industry standard vulnerability scanning",
    color: "from-blue-500 to-cyan-500",
    delay: 0
  },
  {
    icon: Lock,
    name: "Authentication",
    description: "Session & token security testing",
    color: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    icon: Code,
    name: "API Security",
    description: "REST & GraphQL endpoint testing",
    color: "from-green-500 to-emerald-500",
    delay: 0.4
  },
  {
    icon: Database,
    name: "SQL Injection",
    description: "Database security analysis",
    color: "from-orange-500 to-red-500",
    delay: 0.6
  },
  {
    icon: Globe,
    name: "XSS Protection",
    description: "Cross-site scripting detection",
    color: "from-indigo-500 to-violet-500",
    delay: 0.8
  },
  {
    icon: Terminal,
    name: "Command Injection",
    description: "Shell execution vulnerability checks",
    color: "from-rose-500 to-pink-500",
    delay: 1.0
  }
];

export const ScanTypesShowcase = () => {
  const [activeScans, setActiveScans] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveScans(prev => {
        if (prev.length >= scanTypes.length) {
          return [0];
        }
        return [...prev, prev.length];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium">Intelligent Scanning</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="gradient-text">Security Approach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our model automatically selects and runs multiple scan types tailored to your application's architecture
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Animated scan type grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scanTypes.map((scan, index) => {
              const isActive = activeScans.includes(index);
              const isCompleted = activeScans.includes(index) && activeScans.length > index + 1;
              
              return (
                <Card
                  key={index}
                  className={`relative p-6 border-border/50 transition-all duration-500 overflow-hidden group
                    ${isActive ? 'border-primary/50 scale-105' : 'hover:border-primary/30'}
                    ${isCompleted ? 'bg-primary/5' : 'bg-card/50'}`}
                  style={{
                    animationDelay: `${scan.delay}s`
                  }}
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${scan.color} opacity-0 transition-opacity duration-500 ${isActive ? 'opacity-20' : 'group-hover:opacity-10'}`} />
                  
                  {/* Scanning animation line */}
                  {isActive && !isCompleted && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                  )}
                  
                  {/* Completion indicator */}
                  {isCompleted && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${scan.color} flex items-center justify-center mb-4 transition-transform duration-500 ${isActive ? 'scale-110 rotate-6' : ''}`}>
                      <scan.icon className="w-7 h-7 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      {scan.name}
                      {isActive && !isCompleted && (
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0s' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {scan.description}
                    </p>
                    
                    {/* Progress bar for active scans */}
                    {isActive && !isCompleted && (
                      <div className="mt-4 space-y-2">
                        <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-accent animate-pulse w-full" 
                               style={{ 
                                 animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                               }} 
                          />
                        </div>
                        <p className="text-xs text-primary font-medium">Scanning...</p>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Summary stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-4 glass-effect rounded-xl border border-border/50">
              <div className="text-3xl font-bold gradient-text mb-1">6+</div>
              <div className="text-sm text-muted-foreground">Scan Types</div>
            </div>
            <div className="text-center p-4 glass-effect rounded-xl border border-border/50">
              <div className="text-3xl font-bold gradient-text mb-1">Auto</div>
              <div className="text-sm text-muted-foreground">Selection</div>
            </div>
            <div className="text-center p-4 glass-effect rounded-xl border border-border/50">
              <div className="text-3xl font-bold gradient-text mb-1">Real-time</div>
              <div className="text-sm text-muted-foreground">Results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
