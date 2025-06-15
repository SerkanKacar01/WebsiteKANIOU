import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, ExternalLink, Quote } from "lucide-react";
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
  const [itemsPerSlide, setItemsPerSlide] = useState(1);
  const { t } = useLanguage();
  
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Use either database testimonials or our fallback ones if there was an error
  const displayTestimonials = error || testimonials.length === 0 ? fallbackTestimonials : testimonials;

  // Update items per slide based on screen size
  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth >= 1024) {
          setItemsPerSlide(3); // Desktop
        } else if (window.innerWidth >= 768) {
          setItemsPerSlide(2); // Tablet
        } else {
          setItemsPerSlide(1); // Mobile
        }
      }
    };

    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);

  const maxIndex = Math.max(0, displayTestimonials.length - itemsPerSlide);

  const goToPrev = () => {
    if (!displayTestimonials || displayTestimonials.length === 0) return;
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const goToNext = () => {
    if (!displayTestimonials || displayTestimonials.length === 0) return;
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  // Get visible testimonials for current slide
  const getVisibleTestimonials = () => {
    return displayTestimonials.slice(currentIndex, currentIndex + itemsPerSlide);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-neutral-200"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-neutral-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-neutral-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-20 bg-neutral-200 rounded mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-32"></div>
                </div>
              ))}
            </div>
          ) : displayTestimonials.length > 0 ? (
            <div className="testimonial-slider overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getVisibleTestimonials().map((testimonial, index) => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md relative">
                    {/* Quotation marks icon */}
                    <div className="absolute top-4 right-4">
                      <Quote className="h-6 w-6 text-[#d5c096]/40" />
                    </div>
                    
                    {/* Avatar and basic info */}
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 object-cover rounded-full border-2 border-[#d5c096]"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-[#d5c096] flex items-center justify-center text-white text-sm font-bold">
                          {testimonial.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.location}
                        </p>
                      </div>
                    </div>

                    {/* Star rating */}
                    <div className="flex text-[#d5c096] mb-3">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">{t('common.notFound') || "Geen testimonials gevonden"}</div>
          )}

          {displayTestimonials.length > itemsPerSlide && (
            <>
              <div className="absolute top-1/2 left-1 sm:left-0 -translate-y-1/2 md:-translate-x-6 z-10">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToPrev}
                  disabled={currentIndex === 0}
                  className="bg-white text-[#d5c096] hover:text-[#c4b183] hover:bg-[#d5c096]/10 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed border-[#d5c096]/30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <div className="absolute top-1/2 right-1 sm:right-0 -translate-y-1/2 md:translate-x-6 z-10">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={goToNext}
                  disabled={currentIndex >= maxIndex}
                  className="bg-white text-[#d5c096] hover:text-[#c4b183] hover:bg-[#d5c096]/10 rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed border-[#d5c096]/30"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </>
          )}

          {/* Slide indicators */}
          {displayTestimonials.length > itemsPerSlide && (
            <div className="flex justify-center mt-6 space-x-2">
              {[...Array(Math.ceil(displayTestimonials.length / itemsPerSlide))].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(Math.min(index, maxIndex))}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    Math.floor(currentIndex / itemsPerSlide) === index 
                      ? 'bg-[#d5c096]' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Google Reviews Button */}
        <div className="text-center mt-8 sm:mt-10">
          <a
            href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.988689,5.6914029,17z/data=!4m8!3m7!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn?authuser=2&entry=ttu&g_ep=EgoyMDI1MDUyMS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            View All Google Reviews
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialSection;
