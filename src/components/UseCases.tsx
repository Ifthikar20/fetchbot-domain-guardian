import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Building2, ShoppingCart, Heart, Landmark, Plane, Factory } from "lucide-react";

const useCases = [
  {
    icon: Building2,
    industry: "Financial Services",
    title: "Secure Banking Infrastructure",
    description: "Continuous penetration testing for banks and fintech companies. Identify vulnerabilities in payment systems, API endpoints, and customer portals before attackers do.",
    stats: "99.9% uptime protection",
    gradient: "from-blue-500/10 to-cyan-500/10"
  },
  {
    icon: ShoppingCart,
    industry: "E-commerce",
    title: "Protect Customer Data",
    description: "Automated security testing for online stores and marketplaces. Secure payment gateways, customer databases, and transaction processing systems.",
    stats: "40% faster threat detection",
    gradient: "from-purple-500/10 to-pink-500/10"
  },
  {
    icon: Heart,
    industry: "Healthcare",
    title: "HIPAA Compliance Testing",
    description: "Ensure patient data security with continuous vulnerability assessments. Test electronic health records, telemedicine platforms, and medical device integrations.",
    stats: "100% compliance coverage",
    gradient: "from-green-500/10 to-emerald-500/10"
  },
  {
    icon: Landmark,
    industry: "Government",
    title: "Critical Infrastructure Protection",
    description: "Enterprise-grade security testing for public sector organizations. Identify and remediate vulnerabilities in citizen-facing portals and internal systems.",
    stats: "Zero-trust verification",
    gradient: "from-red-500/10 to-orange-500/10"
  },
  {
    icon: Plane,
    industry: "Travel & Hospitality",
    title: "Secure Booking Systems",
    description: "Protect customer booking data and payment information. Test reservation systems, loyalty programs, and mobile applications for vulnerabilities.",
    stats: "50+ integrations tested",
    gradient: "from-indigo-500/10 to-violet-500/10"
  },
  {
    icon: Factory,
    industry: "Manufacturing",
    title: "IoT & Supply Chain Security",
    description: "Test industrial control systems, supply chain management platforms, and IoT device networks. Ensure operational technology security.",
    stats: "Real-time threat monitoring",
    gradient: "from-yellow-500/10 to-amber-500/10"
  }
];

export const UseCases = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From startups to Fortune 500 companies, organizations trust Fetchbot to secure their digital assets
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {useCases.map((useCase, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="group h-full bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <CardContent className="p-6 relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <useCase.icon className="w-7 h-7 text-primary" />
                    </div>
                    
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-primary/80 uppercase tracking-wider">
                        {useCase.industry}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                    
                    <div className="pt-4 border-t border-border/50">
                      <span className="text-sm font-medium text-primary">
                        {useCase.stats}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};
