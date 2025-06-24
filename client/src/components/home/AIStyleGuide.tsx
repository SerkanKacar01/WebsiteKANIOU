import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Link } from "wouter";
import { 
  Brain, 
  Home, 
  Palette, 
  TrendingUp, 
  ArrowRight, 
  Sparkles,
  Eye,
  Lightbulb
} from "lucide-react";

const AIStyleGuide = () => {
  const [activeStyle, setActiveStyle] = useState<string | null>(null);

  const styleGuides = [
    {
      id: "modern",
      title: "Modern Minimalistisch",
      description: "Strakke lijnen, neutrale tinten en functioneel design",
      features: ["Rolgordijnen", "Kunststof lamellen", "Monochrome kleuren"],
      color: "from-gray-600 to-slate-700",
      bgGradient: "from-gray-50 to-slate-50",
      icon: Eye
    },
    {
      id: "classic",
      title: "Klassiek Elegant",
      description: "Tijdloze elegantie met warme materialen en texturen",
      features: ["Overgordijnen", "Houten jaloezieën", "Warme aardtinten"],
      color: "from-[#d5c096] to-[#c4b183]",
      bgGradient: "from-amber-50 to-yellow-50",
      icon: Home
    },
    {
      id: "contemporary",
      title: "Contemporary Chic",
      description: "Moderne trends gecombineerd met persoonlijke stijl",
      features: ["Duo rolgordijnen", "Textiel lamellen", "Contrasterende kleuren"],
      color: "from-primary to-primary/80",
      bgGradient: "from-secondary/20 to-secondary/30",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-white via-gray-50/50 to-secondary/20">
      <Container className="px-4">
        <div className="text-center mb-8 md:mb-10">
          <Badge className="mb-3 md:mb-4 text-[12px] md:text-sm px-3 md:px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white">
            <Brain className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            AI Stijlgids
          </Badge>
          <h2 className="font-display text-[20px] md:text-2xl lg:text-3xl text-primary font-semibold mb-4">
            Ontdek Uw Interieurstijl
          </h2>
          <p className="font-body text-gray-600 max-w-[90%] md:max-w-2xl mx-auto text-[14px] md:text-base">
            Laat onze AI uw perfecte stijl bepalen en ontvang gepersonaliseerde productaanbevelingen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {styleGuides.map((style) => {
            const IconComponent = style.icon;
            const isActive = activeStyle === style.id;
            
            return (
              <Card 
                key={style.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 
                  ${isActive ? 'border-primary shadow-lg scale-105' : 'border-transparent hover:border-primary/20'}
                  bg-gradient-to-br ${style.bgGradient}`}
                onMouseEnter={() => setActiveStyle(style.id)}
                onMouseLeave={() => setActiveStyle(null)}
              >
                <CardHeader className="text-center p-3 md:p-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-r ${style.color} flex items-center justify-center transition-transform ${isActive ? 'scale-110' : ''}`}>
                    <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <CardTitle className="text-[16px] md:text-lg font-semibold text-gray-800">
                    {style.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-3 md:p-6 pt-0">
                  <p className="text-[12px] md:text-sm text-gray-600 mb-3 md:mb-4 leading-relaxed">
                    {style.description}
                  </p>
                  <div className="space-y-2 mb-3 md:mb-4">
                    {style.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <span className="text-[10px] md:text-xs bg-white/70 px-2 py-1 rounded-full text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  {isActive && (
                    <div className="flex items-center justify-center text-primary text-[12px] md:text-sm font-medium">
                      <Lightbulb className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Klik voor stijltest
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/color-matcher">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white px-6 md:px-8 py-3 rounded-lg text-[14px] md:text-base font-medium transition-all duration-300 hover:shadow-lg min-h-[44px] w-full sm:w-auto">
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Start AI Stijlanalyse
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AIStyleGuide;