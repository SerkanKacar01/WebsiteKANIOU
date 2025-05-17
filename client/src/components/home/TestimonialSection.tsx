import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Testimonial } from "@shared/schema";
import { useLanguage } from "@/context/LanguageContext";

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();
  
  const { data: testimonials = [], isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const goToPrev = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    if (!testimonials || testimonials.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
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
            {t('Wat onze klanten vertellen over ons')}
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            {t('Ervaar waarom klanten vertrouwen op KANIOU Zilvernaald voor hun raamdecoratie. Ontdek hun ervaringen met onze kwaliteit, service en maatwerkoplossingen.')} 
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
          ) : error ? (
            <div className="text-center text-red-500">
              {t('common.error')}
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <div className="testimonial-slider">
              <div className="testimonial-slide bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md mx-2 sm:mx-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    {testimonials[currentIndex].imageUrl ? (
                      <img
                        src={testimonials[currentIndex].imageUrl}
                        alt={testimonials[currentIndex].name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full border-4 border-secondary"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary flex items-center justify-center text-white text-lg sm:text-xl font-bold border-4 border-secondary">
                        {testimonials[currentIndex].name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex justify-center md:justify-start text-secondary mb-3">
                      {renderStars(testimonials[currentIndex].rating)}
                    </div>
                    <p className="font-body text-text-medium text-sm sm:text-base italic mb-4 text-center md:text-left">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div className="text-center md:text-left">
                      <h4 className="font-display text-base sm:text-lg text-primary font-medium">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="font-body text-text-light text-xs sm:text-sm">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">{t('common.notFound')}</div>
          )}

          {testimonials && testimonials.length > 1 && (
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
