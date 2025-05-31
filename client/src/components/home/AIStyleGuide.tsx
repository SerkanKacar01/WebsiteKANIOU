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
      color: "from-primary to-blue-600",
      bgGradient: "from-blue-50 to-indigo-50",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30">
      <Container>
        <div className="text-center mb-10">
          <Badge className="mb-4 text-sm px-4 py-2 bg-gradient-to-r from-primary to-blue-600 text-white">
            <Brain className="h-4 w-4 mr-2" />
            AI Stijlgids
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl text-primary font-semibold mb-4">
            Ontdek Uw Interieurstijl
          </h2>
          <p className="font-body text-gray-600 max-w-2xl mx-auto text-base">
            Laat onze AI uw perfecte stijl bepalen en ontvang gepersonaliseerde productaanbevelingen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${style.color} flex items-center justify-center transition-transform ${isActive ? 'scale-110' : ''}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {style.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {style.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {style.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-center">
                        <span className="text-xs bg-white/70 px-2 py-1 rounded-full text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  {isActive && (
                    <div className="flex items-center justify-center text-primary text-sm font-medium">
                      <Lightbulb className="h-4 w-4 mr-1" />
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
            <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 hover:shadow-lg">
              <Sparkles className="h-5 w-5 mr-2" />
              Start AI Stijlanalyse
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default AIStyleGuide;