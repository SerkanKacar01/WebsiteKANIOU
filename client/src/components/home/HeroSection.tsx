import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

// Import hero images
import image1 from "@assets/IMG_9293.jpg";
import image2 from "@assets/IMG_9294.jpg";
import image3 from "@assets/IMG_9295.jpg";
import image4 from "@assets/IMG_9296.jpg";
import image5 from "@assets/IMG_9297.jpg";

interface HeroSlide {
  id: number;
  image: string;
  heading: string;
  subtext: string;
  ctaText: string;
  alt: string;
}

const HeroSection = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const heroSlides: HeroSlide[] = [
    {
      id: 1,
      image: image1,
      heading: "Elegantie voor Elke Kamer",
      subtext: "Stijlvolle raambekleding op maat - betaalbaar en van premium kwaliteit",
      ctaText: "Direct offerte aanvragen",
      alt: "Elegante gordijnen in luxe woonkamer"
    },
    {
      id: 2,
      image: image2,
      heading: "Houten Jaloezieën",
      subtext: "Natuurlijke warmte en perfecte lichtcontrole voor uw interieur",
      ctaText: "Direct offerte aanvragen",
      alt: "Houten jaloezieën in moderne ruimte"
    },
    {
      id: 3,
      image: image3,
      heading: "Gratis Opmeetservice",
      subtext: "Professionele opmeting aan huis - perfect passend gegarandeerd",
      ctaText: "Direct offerte aanvragen",
      alt: "Professionele opmeetservice"
    },
    {
      id: 4,
      image: image4,
      heading: "Snelle Levering",
      subtext: "Van bestelling tot montage - wij zorgen voor een zorgeloze ervaring",
      ctaText: "Direct offerte aanvragen",
      alt: "Snelle professionele levering"
    },
    {
      id: 5,
      image: image5,
      heading: "Nieuwe 2025 Collectie",
      subtext: "Ontdek de laatste trends in raambekleding - modern en tijdloos",
      ctaText: "Direct offerte aanvragen",
      alt: "Nieuwe collectie raambekleding 2025"
    }
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {heroSlides.map((slide) => (
            <div key={slide.id} className="embla__slide flex-shrink-0 w-full relative min-h-[90vh]">
              {/* Hero Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                <picture>
                  <source srcSet={slide.image} type="image/jpeg" />
                  <img 
                    src={slide.image} 
                    alt={slide.alt}
                    className="w-full h-full object-cover"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />
                </picture>
              </div>
              
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

              {/* Content */}
              <Container className="relative z-10 h-full flex flex-col justify-center py-8 px-4">
                <div className="max-w-[90%] sm:max-w-2xl mx-auto sm:mx-0 text-center sm:text-left">
                  <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-4 sm:mb-6">
                    {slide.heading}
                  </h1>
                  <p className="font-body text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-12 opacity-95 max-w-3xl">
                    {slide.subtext}
                  </p>
                  
                  {/* CTA Button */}
                  <div className="flex justify-center sm:justify-start">
                    <Button
                      onClick={scrollToQuote}
                      size="lg"
                      className="bg-[#E67E22] hover:bg-[#d35400] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 min-h-[56px] w-full sm:w-auto max-w-sm"
                    >
                      {slide.ctaText}
                    </Button>
                  </div>
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === selectedIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
