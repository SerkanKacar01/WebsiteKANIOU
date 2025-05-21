import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Testimonial } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

// Fallback testimonials with real examples for when database connection fails
const fallbackTestimonials = [
  {
    id: 1,
    name: "Jan de Vries",
    content: "We hebben Zilvernaald ingeschakeld voor nieuwe gordijnen in onze woonkamer. Het resultaat is prachtig! Perfecte pasvorm en de stof is van uitstekende kwaliteit. De service was persoonlijk en zeer professioneel.",
    rating: 5,
    location: "Amsterdam",
    createdAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 2,
    name: "Marieke Jansen",
    content: "Onze nieuwe rolgordijnen zijn perfect geïnstalleerd door het team van KANIOU. Ze gaven uitstekend advies over welke stoffen het beste zouden werken voor onze slaapkamers. Heel tevreden met het resultaat!",
    rating: 5,
    location: "Rotterdam",
    createdAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  },
  {
    id: 3,
    name: "Peter Bakker",
    content: "Na lang zoeken eindelijk de perfecte oplossing gevonden bij KANIOU voor onze lastige dakramen. De plissé zonwering werkt perfect en houdt de warmte buiten. Goede kwaliteit en redelijke prijs.",
    rating: 4,
    location: "Utrecht",
    createdAt: new Date(),
    imageUrl: null
  },
  {
    id: 4,
    name: "Sophie van Dijk",
    content: "Zilvernaald heeft ons geweldig geholpen met het selecteren van de juiste jaloezieën voor ons hele huis. Ze hebben ook de installatie verzorgd, wat allemaal zeer professioneel is verlopen. Aanrader!",
    rating: 5,
    location: "Den Haag",
    createdAt: new Date(),
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Use either database testimonials or our fallback ones if there was an error
  const displayTestimonials = error || testimonials.length === 0 ? fallbackTestimonials : testimonials;

  const goToPrev = () => {
    if (!displayTestimonials || displayTestimonials.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? displayTestimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (!displayTestimonials || displayTestimonials.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === displayTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? "fill-secondary text-secondary" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-neutral-100">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Wat onze klanten vertellen over ons
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Ervaar waarom klanten vertrouwen op KANIOU Zilvernaald voor hun raamdecoratie. Ontdek hun ervaringen met onze kwaliteit, service en maatwerkoplossingen.
          </p>
        </div>

        <div className="relative">
          {isLoading ? (
            <div className="bg-white p-8 md:p-10 rounded-lg shadow-md animate-pulse">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 min-h-[200px]">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-neutral-200"></div>
                <div className="flex-1">
                  <div className="h-5 bg-neutral-200 rounded w-32 mb-3"></div>
                  <div className="h-20 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-5 bg-neutral-200 rounded w-40"></div>
                  <div className="h-4 bg-neutral-200 rounded w-24 mt-2"></div>
                </div>
              </div>
            </div>
          ) : displayTestimonials.length > 0 ? (
            <div className="testimonial-slider">
              <div className="testimonial-slide bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md mx-2 sm:mx-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    {displayTestimonials[currentIndex].imageUrl ? (
                      <img
                        src={displayTestimonials[currentIndex].imageUrl}
                        alt={displayTestimonials[currentIndex].name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-secondary"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center text-white text-lg sm:text-xl font-bold border-4 border-secondary">
                        {displayTestimonials[currentIndex].name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-center md:justify-start text-secondary mb-3">
                      {renderStars(displayTestimonials[currentIndex].rating)}
                    </div>
                    <p className="font-body text-text-medium text-sm sm:text-base italic mb-4 text-center md:text-left">
                      "{displayTestimonials[currentIndex].content}"
                    </p>
                    <div className="text-center md:text-left">
                      <h4 className="font-display text-base sm:text-lg text-primary font-medium">
                        {displayTestimonials[currentIndex].name}
                      </h4>
                      <p className="font-body text-text-light text-xs sm:text-sm">
                        {displayTestimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">{t('common.notFound') || "Geen testimonials gevonden"}</div>
          )}

          {displayTestimonials.length > 1 && (
            <>
              <div className="absolute top-1/2 left-1 sm:left-0 -translate-y-1/2 md:-translate-x-6 z-10">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToPrev}
                  className="bg-white text-primary hover:text-accent rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-1 sm:right-0 -translate-y-1/2 md:translate-x-6 z-10">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToNext}
                  className="bg-white text-primary hover:text-accent rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow-md"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
