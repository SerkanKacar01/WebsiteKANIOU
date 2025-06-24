import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Container from "@/components/ui/container";
import { Link } from "wouter";
import { 
  Sparkles, 
  Calculator, 
  Palette, 
  MessageCircle, 
  Calendar, 
  Camera,
  ArrowRight 
} from "lucide-react";

const SmartWelcomeButtons = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const smartActions = [
    {
      id: "quick-quote",
      title: "Snelle Offerte",
      description: "Direct een prijsindicatie ontvangen",
      icon: Calculator,
      href: "/smart-quote",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10"
    },
    {
      id: "color-match",
      title: "Kleur Matcher",
      description: "Upload foto voor kleuradvies",
      icon: Palette,
      href: "/color-matcher",
      color: "from-primary to-primary/80",
      bgColor: "bg-primary/10"
    },
    {
      id: "ai-assistant",
      title: "AI Assistent",
      description: "Stel direct uw vragen",
      icon: MessageCircle,
      href: "#",
      color: "from-accent to-orange-500",
      bgColor: "bg-accent/10",
      action: "openChat"
    },

  ];

  const handleChatOpen = () => {
    // This will trigger the chatbot to open
    const chatEvent = new CustomEvent('openChatbot');
    window.dispatchEvent(chatEvent);
  };

  return (
    <section className="py-6 md:py-8 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
      <Container className="px-4">
        <div className="text-center mb-6">
          <Badge className="mb-3 text-[12px] md:text-sm px-3 md:px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-white">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Slimme Hulptools
          </Badge>
          <h3 className="font-display text-[18px] md:text-xl lg:text-2xl text-primary font-semibold mb-2">
            Waar kunnen we u mee helpen?
          </h3>
          <p className="text-gray-600 text-[14px] md:text-sm max-w-[90%] mx-auto">
            Kies de snelste weg naar uw perfecte raambekleding
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
          {smartActions.map((action) => {
            const IconComponent = action.icon;
            const isHovered = hoveredButton === action.id;
            
            if (action.action === "openChat") {
              return (
                <Card 
                  key={action.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-accent/30 ${action.bgColor}`}
                  onMouseEnter={() => setHoveredButton(action.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={handleChatOpen}
                >
                  <CardContent className="p-3 md:p-4 text-center min-h-[120px] flex flex-col justify-center">
                    <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center transition-transform ${isHovered ? 'scale-110' : ''}`}>
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <h4 className="font-display text-[12px] sm:text-sm md:text-base font-semibold text-gray-800 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-tight">
                      {action.description}
                    </p>
                    {isHovered && (
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-accent mx-auto mt-1 md:mt-2 animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              );
            }

            return (
              <Link key={action.id} href={action.href}>
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/30 ${action.bgColor}`}
                  onMouseEnter={() => setHoveredButton(action.id)}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <CardContent className="p-3 md:p-4 text-center min-h-[120px] flex flex-col justify-center">
                    <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 md:mb-3 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center transition-transform ${isHovered ? 'scale-110' : ''}`}>
                      <IconComponent className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <h4 className="font-display text-[12px] sm:text-sm md:text-base font-semibold text-gray-800 mb-1">
                      {action.title}
                    </h4>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-600 leading-tight">
                      {action.description}
                    </p>
                    {isHovered && (
                      <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-primary mx-auto mt-1 md:mt-2 animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default SmartWelcomeButtons;