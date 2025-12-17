import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  Clock,
  Home as HomeIcon,
  Ruler,
  Wrench,
  Search,
} from "lucide-react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
import interiorImageSrc from "@assets/Overgordijnen.jpeg";
import gallery1Src from "@assets/IMG_9192.jpeg";
import gallery2Src from "@assets/IMG_9204.jpeg";
import gallery3Src from "@assets/IMG_9217.jpeg";
import gallery4Src from "@assets/IMG_9219.jpeg";
import gallery5Src from "@assets/IMG_9220.jpeg";
import gallery6Src from "@assets/IMG_9221.jpeg";
import duoRolgordijnenSrc from "@assets/DUOROLGORDIJNEN_1765327273263.png";
import houtenShuttersSrc from "@assets/HOUTEN_SHUTTERS_1765327379155.png";
import textielLamellenSrc from "@assets/TEXTIEL_LAMELLEN_1765327446795.png";
import showroomImageSrc from "@assets/Scherm­afbeelding_2025-12-10_om_02.26.40_1765330020631.png";
import PromotionalBanner from "@/components/PromotionalBanner";
import ShopShowcase from "@/components/ShopShowcase";
import {
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
} from "@/assets/fallback";

const interiorImage = interiorImageSrc;
const gallery1 = gallery1Src;
const gallery2 = gallery2Src;
const gallery3 = gallery3Src;
const gallery4 = gallery4Src;
const gallery5 = gallery5Src;
const gallery6 = gallery6Src;

const collageImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery1,
  gallery2,
  gallery3,
];

// ========== ANIMATION HOOKS & COMPONENTS ==========

const useCountUp = (
  end: number,
  duration: number = 2000,
  startOnVisible: boolean = true,
) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible && startOnVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration, startOnVisible]);

  return { count, ref };
};

const TiltCard = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  );
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-300 ease-out ${className}`}
      style={{ transform, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none rounded-inherit transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
    </div>
  );
};

const MagneticButton = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: x * 0.3, y: y * 0.3 });
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={buttonRef}
      className={className}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-100/20 to-transparent rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-gray-200/30 to-transparent rounded-full blur-2xl animate-float-medium" />
      <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-gradient-to-br from-amber-50/40 to-transparent rounded-full blur-xl animate-float-fast" />
      <div
        className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-br from-gray-100/20 to-transparent rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "-3s" }}
      />
    </div>
  );
};

const TextReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-hidden">
      <div
        className={`transition-all duration-1000 ease-out ${className} ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </div>
  );
};

const AnimatedStatCard = ({
  value,
  suffix = "",
  label,
  delay = 0,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay?: number;
}) => {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div
      ref={ref}
      className="group text-center p-8 bg-gray-50 hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="text-5xl md:text-6xl font-light text-black mb-4 group-hover:scale-110 transition-transform duration-500"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {count}
        {suffix}
      </div>
      <div className="text-xs tracking-widest uppercase text-gray-600">
        {label}
      </div>
    </div>
  );
};

const StaticStatCard = ({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) => {
  return (
    <div
      className="group text-center p-8 bg-gray-50 hover:bg-white transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="text-5xl md:text-6xl font-light text-black mb-4 group-hover:scale-110 transition-transform duration-500"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {value}
      </div>
      <div className="text-xs tracking-widest uppercase text-gray-600">
        {label}
      </div>
    </div>
  );
};

// ========== HORIZONTAL PRODUCT CAROUSEL ==========
const ProductCarousel = ({
  setLocation,
}: {
  setLocation: (path: string) => void;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products = [
    {
      name: "Kunststof Lamellen",
      image: gallery1,
      path: "/producten/kunststof-lamellen",
    },
    {
      name: "Textiel Lamellen",
      image: gallery2,
      path: "/producten/textiel-lamellen",
    },
    { name: "Rolgordijnen", image: gallery3, path: "/producten/rolgordijnen" },
    {
      name: "Duo Rolgordijnen",
      image: gallery4,
      path: "/producten/duo-rolgordijnen",
    },
    { name: "Plissés", image: gallery5, path: "/producten/plisse" },
    {
      name: "Houten Jaloezieën",
      image: gallery6,
      path: "/producten/houten-jaloezieen",
    },
    {
      name: "Aluminium Jaloezieën",
      image: gallery1,
      path: "/producten/kunststof-jaloezieen",
    },
    {
      name: "Overgordijnen",
      image: interiorImage,
      path: "/producten/overgordijnen",
    },
    {
      name: "Vouwgordijnen",
      image: gallery2,
      path: "/producten/vouwgordijnen",
    },
    {
      name: "Houten Shutters",
      image: gallery3,
      path: "/producten/houten-shutters",
    },
  ];

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll);
      return () => scrollElement.removeEventListener("scroll", checkScroll);
    }
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 360;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          data-testid="carousel-left"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
          data-testid="carousel-right"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <TiltCard
            key={product.name}
            className="flex-shrink-0 w-[320px] cursor-pointer"
            onClick={() => setLocation(product.path)}
          >
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="p-6 bg-white">
                <h3
                  className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {product.name}
                </h3>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

// ========== 3-STEP SERVICE SECTION ==========
const ServiceSteps = () => {
  const steps = [
    {
      number: "1",
      icon: HomeIcon,
      title: "Bezoek onze showroom",
      description:
        "Kom langs voor gratis persoonlijk advies en bekijk onze uitgebreide collectie",
    },
    {
      number: "2",
      icon: Ruler,
      title: "Kies uw perfecte stijl",
      description:
        "Selecteer het product, de kleur en bediening die uw interieur compleet maken",
    },
    {
      number: "3",
      icon: Wrench,
      title: "Wij doen de rest",
      description:
        "Onze specialisten komen opmeten en installeren uw raamdecoratie vakkundig",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-light text-black mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Hoe onze service werkt
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-8">
                <div
                  className="w-20 h-20 mx-auto bg-black text-white rounded-full flex items-center justify-center text-3xl font-light group-hover:scale-110 transition-transform duration-500"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-px bg-gradient-to-r from-gray-300 to-transparent" />
                )}
              </div>
              <step.icon className="w-8 h-8 mx-auto mb-4 text-gray-600" />
              <h3
                className="text-xl font-medium text-black mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========== REALISATIES GALLERY (NO TITLES) ==========
const InspirationGallery = ({
  setLocation,
}: {
  setLocation: (path: string) => void;
}) => {
  const realisatieImages = [
    galleryImage1,
    galleryImage2,
    galleryImage3,
    galleryImage4,
    galleryImage5,
    galleryImage6,
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-16">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Realisaties
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-4" />
          <p className="text-gray-600 text-sm md:text-base">
            Een selectie uit ons portfolio
          </p>
        </div>

        {/* Mobile: 2 columns with square images */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
          {realisatieImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden cursor-pointer aspect-square rounded-2xl shadow-md"
              onClick={() => setLocation("/gallerij")}
              data-testid={`realisatie-${index + 1}`}
            >
              <img
                src={image}
                alt={`Realisatie ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <button
            onClick={() => setLocation("/gallerij")}
            className="inline-flex items-center px-8 py-4 bg-[#1a1a2e] text-white hover:bg-[#16162a] transition-all duration-300"
            data-testid="button-bekijk-gallerij"
          >
            <span className="tracking-widest uppercase text-sm mr-3">
              Bekijk alle realisaties
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

// ========== SPLIT LAYOUT SECTION ==========
const SplitSection = ({
  image,
  title,
  subtitle,
  description,
  buttonText,
  buttonPath,
  imageLeft = true,
  setLocation,
}: {
  image: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText: string;
  buttonPath: string;
  imageLeft?: boolean;
  setLocation: (path: string) => void;
}) => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div
          className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${!imageLeft ? "lg:grid-flow-col-dense" : ""}`}
        >
          <div
            className={`relative overflow-hidden rounded-lg aspect-square ${!imageLeft ? "lg:col-start-2" : ""}`}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className={!imageLeft ? "lg:col-start-1" : ""}>
            {subtitle && (
              <span className="text-xs tracking-widest uppercase text-gray-500 mb-4 block">
                {subtitle}
              </span>
            )}
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-8 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {title}
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-black/20 to-transparent mb-8" />
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
              {description}
            </p>
            <button
              onClick={() => setLocation(buttonPath)}
              className="group inline-flex items-center px-8 py-4 bg-black text-white hover:bg-gray-900 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              data-testid={`button-${buttonPath.replace(/\//g, "-")}`}
            >
              <span className="text-xs tracking-widest uppercase mr-3">
                {buttonText}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== IN DE KIJKER / SPOTLIGHT SECTION ==========
const SpotlightSection = ({
  setLocation,
}: {
  setLocation: (path: string) => void;
}) => {
  const spotlights = [
    {
      label: "Nieuw",
      title: "Duo Rolgordijnen",
      description:
        "Combineer privacy met lichtinval - de perfecte balans voor elk moment van de dag",
      image: duoRolgordijnenSrc,
      path: "/producten/duo-rolgordijnen",
    },
    {
      label: "Populair",
      title: "Houten Shutters",
      description: "Tijdloze elegantie met perfecte lichtcontrole en isolatie",
      image: houtenShuttersSrc,
      path: "/producten/houten-shutters",
    },
    {
      label: "Duurzaam",
      title: "Textiel Lamellen",
      description:
        "Zachte materialen voor een warme uitstraling en optimale lichtfiltering",
      image: textielLamellenSrc,
      path: "/producten/textiel-lamellen",
    },
  ];

  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-16">
        <div className="text-center mb-8 md:mb-16">
          <h2
            className="text-3xl md:text-5xl font-light text-black mb-3 md:mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            In de kijker
          </h2>
          <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto" />
        </div>

        {/* Mobile: Horizontal scroll carousel */}
        <div className="md:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {spotlights.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] snap-center cursor-pointer"
                onClick={() => setLocation(item.path)}
              >
                <div className="group bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-black text-white text-[10px] tracking-widest uppercase">
                      {item.label}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-lg font-light text-black mb-2"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center text-black text-[10px] tracking-widest uppercase">
                      Ontdekken
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {spotlights.map((_, index) => (
              <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {spotlights.map((item, index) => (
            <TiltCard
              key={index}
              className="cursor-pointer"
              onClick={() => setLocation(item.path)}
            >
              <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-widest uppercase">
                    {item.label}
                  </span>
                </div>
                <div className="p-6">
                  <h3
                    className="text-2xl font-light text-black mb-3 group-hover:text-gray-700 transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="inline-flex items-center text-black text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500">
                    Ontdekken
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// ========== SHOWROOM FINDER SECTION ==========
const ShowroomSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-4xl md:text-5xl font-light text-black mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Bezoek onze showroom voor advies op maat
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-black/20 to-transparent mb-8" />
            <p className="text-lg text-gray-700 font-light leading-relaxed mb-8">
              Onze experts helpen je graag bij het vinden van de perfecte
              raamdecoratie voor jouw woning. Kom langs in onze showroom voor
              persoonlijk advies en bekijk onze uitgebreide collectie.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    KANIOU Zilvernaald || Gordijnen & Zonweringen
                  </p>
                  <p className="text-gray-600">
                    Pauwengraaf 66 - 3630 Maasmechelen te België
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <a
                  href="tel:+32470592914"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  +32 467 85 64 05
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <a
                  href="mailto:info@kaniou.be"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  info@kaniou.be
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-gray-600 mt-1 flex-shrink-0" />
                <div className="text-gray-600">
                  <p>Ma-Vr: 10:00 - 18:00</p>
                  <p>Za: 10:00 - 18:00</p>
                  <p>Zo: Gesloten</p>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-black text-white hover:bg-gray-900 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              data-testid="button-showroom-map"
            >
              <span className="text-xs tracking-widest uppercase mr-3">
                Bekijk op kaart
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="relative rounded-lg overflow-hidden aspect-square bg-gray-100">
            <img
              src={showroomImageSrc}
              alt="KANIOU Showroom"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== BROCHURE REQUEST FORM ==========
const BrochureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newsletter: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <img
              src={gallery6}
              alt="KANIOU Brochure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          <div>
            <h2
              className="text-4xl md:text-5xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Vraag onze brochure aan en laat je inspireren!
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-white/30 to-transparent mb-8" />

            {submitted ? (
              <div className="bg-white/10 rounded-lg p-8 text-center">
                <div
                  className="text-2xl mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Bedankt!
                </div>
                <p className="text-white/80">
                  Je ontvangt de brochure zo snel mogelijk in je mailbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm tracking-widest uppercase mb-2 text-white/80">
                    Naam
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                    placeholder="Uw naam"
                    required
                    data-testid="input-brochure-name"
                  />
                </div>
                <div>
                  <label className="block text-sm tracking-widest uppercase mb-2 text-white/80">
                    E-mailadres
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                    placeholder="uw@email.com"
                    required
                    data-testid="input-brochure-email"
                  />
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      setFormData({ ...formData, newsletter: e.target.checked })
                    }
                    className="mt-1"
                    data-testid="checkbox-brochure-newsletter"
                  />
                  <label
                    htmlFor="newsletter"
                    className="text-sm text-white/70 leading-relaxed"
                  >
                    Ja, ik wil de nieuwsbrief ontvangen met informatie over
                    promoties, trends en nieuwe collecties.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black hover:bg-gray-100 transition-all duration-500 text-xs tracking-widest uppercase font-medium"
                  data-testid="button-brochure-submit"
                >
                  Verstuur
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ========== LUXURY NAVIGATION ==========
const LuxuryNavigation = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isCollectieDropdownOpen, setIsCollectieDropdownOpen] =
    React.useState(false);
  const [isHorrenDropdownOpen, setIsHorrenDropdownOpen] = React.useState(false);
  const [isGordijnenDropdownOpen, setIsGordijnenDropdownOpen] =
    React.useState(false);
  const [isOphangsystemenDropdownOpen, setIsOphangsystemenDropdownOpen] =
    React.useState(false);
  const [isScreensDropdownOpen, setIsScreensDropdownOpen] =
    React.useState(false);
  const [, setLocation] = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const productLinks = [
    { name: "Kunststof lamellen", path: "/producten/kunststof-lamellen" },
    { name: "Textiel lamellen", path: "/producten/textiel-lamellen" },
    { name: "Rolgordijnen", path: "/producten/rolgordijnen" },
    { name: "Duo Rolgordijnen", path: "/producten/duo-rolgordijnen" },
    { name: "Plissés", path: "/producten/plisse" },
    { name: "Duo Plissés", path: "/producten/duo-plisses" },
    { name: "Houten Jaloezieën", path: "/producten/houten-jaloezieen" },
    { name: "Aluminium Jaloezieën", path: "/producten/kunststof-jaloezieen" },
    { name: "Dakraam Zonweringen", path: "/producten/dakraam-zonweringen" },
  ];

  const horrenLinks = [
    { name: "Schuif deur horren", path: "/producten/horren" },
    { name: "Draai hordeuren", path: "/producten/horren" },
    { name: "Opzet horren", path: "/producten/opzethorren" },
    { name: "Inzet horren", path: "/producten/inzethorren" },
    { name: "Plisse hordeuren", path: "/producten/plisse-hordeuren" },
  ];

  const gordijnenLinks = [
    { name: "Inbetweens", path: "/producten/vitrages" },
    { name: "Overgordijnen", path: "/producten/overgordijnen" },
    { name: "Vitrages", path: "/producten/vitrages" },
  ];

  const ophangsystemenLinks = [
    { name: "Gordijn rails", path: "/producten/gordijnrails" },
    { name: "Gordijn roedes", path: "/producten/gordijnroedes" },
  ];

  const screensLinks = [
    { name: "Inside", path: "/producten/screens-inside" },
    { name: "Outside", path: "/producten/screens-outside" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 shadow-sm">
      <div className="max-w-full mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <button
            onClick={() => setLocation("/")}
            className="transition-all duration-500 hover:opacity-70 hover:scale-105"
            data-testid="nav-logo"
          >
            <img
              src={kaniouLogo}
              alt="KANIOU"
              className="h-10 lg:h-12 w-auto"
            />
          </button>

          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button
                onMouseEnter={() => setIsCollectieDropdownOpen(true)}
                onMouseLeave={() => setIsCollectieDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-collectie"
              >
                Collectie
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
              {isCollectieDropdownOpen && (
                <div
                  onMouseEnter={() => setIsCollectieDropdownOpen(true)}
                  onMouseLeave={() => setIsCollectieDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {productLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsCollectieDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-product-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsHorrenDropdownOpen(true)}
                onMouseLeave={() => setIsHorrenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-horren"
              >
                Horren
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
              {isHorrenDropdownOpen && (
                <div
                  onMouseEnter={() => setIsHorrenDropdownOpen(true)}
                  onMouseLeave={() => setIsHorrenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {horrenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsHorrenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-horren-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsGordijnenDropdownOpen(true)}
                onMouseLeave={() => setIsGordijnenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-gordijnen"
              >
                Gordijnen
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
              {isGordijnenDropdownOpen && (
                <div
                  onMouseEnter={() => setIsGordijnenDropdownOpen(true)}
                  onMouseLeave={() => setIsGordijnenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {gordijnenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsGordijnenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-gordijnen-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsOphangsystemenDropdownOpen(true)}
                onMouseLeave={() => setIsOphangsystemenDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-ophangsystemen"
              >
                Ophangsystemen
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
              {isOphangsystemenDropdownOpen && (
                <div
                  onMouseEnter={() => setIsOphangsystemenDropdownOpen(true)}
                  onMouseLeave={() => setIsOphangsystemenDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {ophangsystemenLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsOphangsystemenDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-ophangsystemen-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative group">
              <button
                onMouseEnter={() => setIsScreensDropdownOpen(true)}
                onMouseLeave={() => setIsScreensDropdownOpen(false)}
                className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative flex items-center gap-2"
                data-testid="nav-link-screens"
              >
                Screens
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
              </button>
              {isScreensDropdownOpen && (
                <div
                  onMouseEnter={() => setIsScreensDropdownOpen(true)}
                  onMouseLeave={() => setIsScreensDropdownOpen(false)}
                  className="absolute top-full left-0 mt-0 pt-2 w-64 bg-white shadow-xl rounded-sm border border-gray-300 py-4 z-50"
                >
                  {screensLinks.map((product) => (
                    <button
                      key={product.name}
                      onClick={() => {
                        setLocation(product.path);
                        setIsScreensDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm tracking-wide text-gray-700 hover:text-black hover:bg-gray-50 transition-all duration-300"
                      data-testid={`nav-screens-${product.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setLocation("/producten/vouwgordijnen")}
              className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative group"
              data-testid="nav-link-vouwgordijnen"
            >
              Vouwgordijnen
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
            </button>

            <button
              onClick={() => setLocation("/producten/houten-shutters")}
              className="text-sm tracking-widest uppercase text-gray-700 hover:text-black transition-all duration-500 relative group"
              data-testid="nav-link-houten-shutters"
            >
              Houten Shutters
              <span className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></span>
            </button>
          </div>

          <div className="hidden lg:block">
            <button
              onClick={() => setLocation("/quote")}
              className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase transition-all duration-500 hover:bg-gray-900 hover:shadow-2xl hover:-translate-y-0.5 relative overflow-hidden group"
              data-testid="nav-cta-quote"
            >
              <span className="relative z-10">Offerte aanvragen</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            data-testid="mobile-menu-toggle"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block h-0.5 bg-gray-900 transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-6 animate-[fadeInUp_0.3s_ease-out]">
            <div className="space-y-4">
              <button
                onClick={() => {
                  setLocation("/producten/overgordijnen");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Collectie
              </button>
              <button
                onClick={() => {
                  setLocation("/producten/horren");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Horren
              </button>
              <button
                onClick={() => {
                  setLocation("/producten/overgordijnen");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:text-black hover:bg-gray-50"
              >
                Gordijnen
              </button>
              <button
                onClick={() => {
                  setLocation("/quote");
                  setIsMobileMenuOpen(false);
                }}
                className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase text-center mx-4"
                data-testid="mobile-cta-quote"
              >
                Offerte aanvragen
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// ========== COLLAGE HERO ==========
const CollageHero = ({
  images,
  setLocation,
}: {
  images: string[];
  setLocation: (path: string) => void;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full gap-1">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden cursor-pointer group"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={img}
                alt={`Interior showcase ${idx + 1}`}
                className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                  hoveredIndex === idx ? "scale-110" : "scale-100"
                }`}
                style={{
                  filter:
                    hoveredIndex !== null && hoveredIndex !== idx
                      ? "brightness(0.6)"
                      : "brightness(1)",
                  transition: "all 700ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  transform:
                    hoveredIndex === idx
                      ? "translate(0, 0)"
                      : "translate(-100%, -100%)",
                  transition:
                    "transform 700ms ease-out, opacity 700ms ease-out",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 animate-[fadeInUp_1.2s_ease-out]">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tighter leading-[0.9] transition-all duration-700 hover:scale-105"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "-0.04em",
            textShadow: "0 8px 32px rgba(0,0,0,0.5)",
          }}
        >
          KANIOU raamdecoratie
          <br />
          <span className="italic bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text">
            op maat, voor elke stijl
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-12 font-light tracking-wide max-w-xl mx-auto animate-[fadeInUp_1.4s_ease-out]">
          Premium raamdecoratie op maat sinds meer dan 30 jaar
        </p>

        <MagneticButton
          onClick={() => setLocation("/offerte-aanvragen")}
          className="group inline-flex items-center px-12 py-4 bg-white/10 backdrop-blur-sm border border-white/40 text-white hover:bg-white hover:text-black transition-all duration-700 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 animate-[fadeInUp_1.6s_ease-out] relative overflow-hidden animate-glow-pulse"
          data-testid="button-request-quote"
        >
          <span className="relative z-10 text-xs tracking-widest uppercase mr-3">
            Vrijblijvend offerte aanvragen
          </span>
          <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
        </MagneticButton>
      </div>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 hidden md:block">
        <ChevronDown className="w-6 h-6 text-white/60 animate-bounce drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
      </div>
    </div>
  );
};

// ========== SCROLL REVEAL HOOK ==========
const useScrollReveal = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible] as const;
};

// ========== MAIN HOME COMPONENT ==========
const Home = () => {
  const [, setLocation] = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [brandRef, brandVisible] = useScrollReveal(0.2);
  const [craftsmanshipRef, craftsmanshipVisible] = useScrollReveal(0.2);
  const [galleryRef, galleryVisible] = useScrollReveal(0.1);

  return (
    <>
      <Helmet>
        <title>
          KANIOU – Premium Raamdecoratie & Maatwerk | 30+ jaar expertise
        </title>
        <meta
          name="description"
          content="Ontdek de ultieme luxe in raamdecoratie. KANIOU biedt op maat gemaakte gordijnen, jaloezieën en zonwering met meer dan 30 jaar vakmanschap in België."
        />
        <meta property="og:title" content="KANIOU – Premium Raamdecoratie" />
        <meta
          property="og:description"
          content="Luxe raamdecoratie op maat | 30+ jaar expertise"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <LuxuryNavigation />

      <div className="bg-white">
        {/* HERO SECTION */}
        <CollageHero images={collageImages} setLocation={setLocation} />

        {/* PRODUCT CAROUSEL SECTION */}
        <section className="py-24 bg-white">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-light text-black mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Onze collectie raamdecoratie
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-4" />
              <p className="text-gray-600">
                Premium producten voor elk raam en elke stijl
              </p>
            </div>
            <ProductCarousel setLocation={setLocation} />
          </div>
        </section>

        {/* 3-STEP SERVICE SECTION */}
        <ServiceSteps />

        {/* INSPIRATION GALLERY */}
        <InspirationGallery setLocation={setLocation} />

        {/* SPLIT SECTION - ABOUT */}
        <SplitSection
          image={interiorImage}
          subtitle="Productoverzicht"
          title="Welke raamdecoratie bieden wij aan?"
          description="KANIOU is er trots op alle wensen voor raamdecoratie te kunnen realiseren voor elke kamer en stijl. Onze producten zijn van hoge kwaliteit en helemaal afgestemd op jouw ramen en praktische behoeften. Ook op stijl hoef je niet in te boeten, want onze collectie raambekleding biedt tal van mogelijkheden in design, kleuren en stoffen."
          buttonText="Bekijk al onze producten"
          buttonPath="/producten/overgordijnen"
          imageLeft={true}
          setLocation={setLocation}
        />

        {/* SPOTLIGHT SECTION */}
        {/* Promotional Banner */}
        <PromotionalBanner />

        {/* ONLINE SHOP SHOWCASE */}
        <ShopShowcase setLocation={setLocation} />

        <SpotlightSection setLocation={setLocation} />

        {/* CRAFTSMANSHIP / STATS SECTION */}
        <section ref={craftsmanshipRef} className="py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div
                className={`transition-all duration-1200 ${
                  craftsmanshipVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-12"
                }`}
              >
                <h2
                  className="text-5xl md:text-6xl lg:text-7xl font-light text-black mb-12 leading-tight hover:scale-105 transition-transform duration-700"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    letterSpacing: "-0.02em",
                  }}
                >
                  30+ jaar
                  <br />
                  <span className="italic bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    expertise
                  </span>
                </h2>
                <div className="w-16 h-px bg-gradient-to-r from-black/20 to-transparent mb-12"></div>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-8">
                  Sinds onze oprichting hebben we meer dan 3500 projecten
                  gerealiseerd, elk met dezelfde toewijding aan kwaliteit en
                  vakmanschap.
                </p>
                <p className="text-lg md:text-xl text-gray-700 font-light leading-relaxed mb-12">
                  Van klassieke elegantie tot modern minimalisme – wij brengen
                  uw visie tot leven met precisie en zorg.
                </p>
                <button
                  onClick={() => setLocation("/over-ons")}
                  className="group inline-flex items-center text-black text-xs tracking-widest uppercase hover:translate-x-2 transition-all duration-500 hover:text-gray-700"
                  data-testid="button-about"
                >
                  Ons verhaal
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              <div
                className={`grid grid-cols-2 gap-8 transition-all duration-1200 delay-300 ${
                  craftsmanshipVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-12"
                }`}
              >
                <AnimatedStatCard
                  value={30}
                  suffix="+"
                  label="Jaren ervaring"
                  delay={0}
                />
                <AnimatedStatCard
                  value={3500}
                  suffix="+"
                  label="Projecten"
                  delay={100}
                />
                <AnimatedStatCard
                  value={100}
                  suffix="%"
                  label="Maatwerk"
                  delay={200}
                />
                <StaticStatCard
                  value="5★"
                  label="Klantbeoordeling"
                  delay={300}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SHOWROOM SECTION */}
        <ShowroomSection />

        {/* GALLERY PREVIEW */}
        <section ref={galleryRef} className="py-32 bg-gray-50">
          <div className="max-w-[1800px] mx-auto px-6 lg:px-16">
            <div
              className={`text-center mb-20 transition-all duration-1000 ${
                galleryVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2
                className="text-5xl md:text-6xl font-light text-black mb-6"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Realisaties
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-6"></div>
              <p className="text-gray-600 tracking-wide">
                Een selectie uit ons portfolio
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {[gallery1, gallery2, gallery3, gallery4, gallery5, gallery6].map(
                (img, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden group cursor-pointer aspect-[4/5] transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 ${
                      galleryVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-12"
                    }`}
                    style={{
                      transitionDelay: galleryVisible ? `${i * 100}ms` : "0ms",
                    }}
                    onClick={() => setLocation("/gallerij")}
                    data-testid={`gallery-item-${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`Project ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  </div>
                ),
              )}
            </div>

            <div
              className={`text-center mt-20 transition-all duration-1000 delay-600 ${
                galleryVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <button
                onClick={() => setLocation("/gallerij")}
                className="group inline-flex items-center px-12 py-4 border border-black text-black hover:bg-black hover:text-white transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                data-testid="button-view-gallery"
              >
                <span className="relative z-10 text-xs tracking-widest uppercase mr-3">
                  Bekijk alle projecten
                </span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>

        {/* GOOGLE REVIEWS SECTION */}
        <section className="py-16 md:py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-16">
            <div className="text-center mb-8 md:mb-16">
              <h2
                className="text-3xl md:text-6xl font-light text-black mb-4 md:mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Wat onze klanten zeggen
              </h2>
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent mx-auto mb-4 md:mb-8"></div>

              <a
                href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-300 text-xs md:text-sm group"
                data-testid="link-google-reviews"
              >
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E"
                  alt="Google"
                  className="w-4 h-4 md:w-5 md:h-5"
                />
                <span className="font-medium">
                  Bekijk alle reviews op Google
                </span>
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile: Horizontal scroll carousel */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  {
                    name: "Cardeynaels",
                    rating: 5,
                    text: "Zeer tevreden van de service van Kaniou! Komen de afspraken na, producten zijn dik in orde.",
                  },
                  {
                    name: "Buelles",
                    rating: 5,
                    text: "Zonder afspraak binnen gewandeld en toen direct netjes geholpen. Steeds netjes contact geweest.",
                  },
                  {
                    name: "Anedda",
                    rating: 5,
                    text: "Zeer professionele hulp ontvangen bij het installeren van mijn jaloezieën. Medewerker was vriendelijk.",
                  },
                  {
                    name: "Patrick",
                    rating: 5,
                    text: "Ontzettend tevreden met mijn houten jaloezieën! Levering op tijd en installatie professioneel.",
                  },
                ].map((review, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[260px] snap-center bg-gray-50 p-5 rounded-lg"
                    data-testid={`google-review-mobile-${index + 1}`}
                  >
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-xs leading-relaxed mb-4">
                      "{review.text}"
                    </p>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="font-medium text-gray-900 text-xs">
                        {review.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Scroll indicator */}
              <div className="flex justify-center gap-2 mt-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
                ))}
              </div>
            </div>

            {/* Desktop: Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Cardeynaels",
                  rating: 5,
                  text: "Zeer tevreden van de service van Kaniou! Komen de afspraken na, producten zijn dik in orde. De communicatie verloopt vlot en correct. Ook op de plaatsing is niets aan te merken. Zeer prettige samenwerking en zeker een aanrader.",
                },
                {
                  name: "Buelles",
                  rating: 5,
                  text: "Zonder afspraak binnen gewandeld en toen direct netjes geholpen. Thuisbezoek gehad voor opnemen maten en om te zien of stoffen ook daadwerkelijk passen bij de ruimtes. Steeds netjes contact geweest.",
                },
                {
                  name: "Anedda",
                  rating: 5,
                  text: "Ik heb zeer professionele hulp ontvangen van dit bedrijf bij het installeren van mijn jaloezieën en het ophangen van mijn gordijnen. De medewerker was vriendelijk, kwam alle afspraken keurig na.",
                },
                {
                  name: "Patrick",
                  rating: 5,
                  text: "Ik ben ontzettend tevreden met mijn houten jaloezieën van KANIOU! Vanaf het eerst contact tot aan de levering was alles helder, de levering op tijd en de installatie werd professioneel uitgevoerd.",
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-8 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group"
                  data-testid={`google-review-${index + 1}`}
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 min-h-[120px]">
                    "{review.text}"
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium text-gray-900 text-sm">
                      {review.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-16 text-center">
              <div className="inline-flex items-center gap-2 md:gap-3 bg-gray-50 px-5 md:px-8 py-3 md:py-4 rounded-full">
                <div className="flex gap-0.5 md:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-6 md:h-6 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p
                    className="text-xl md:text-2xl font-light text-black"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    5.0
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-600">
                    Gemiddelde beoordeling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BROCHURE FORM */}
        <BrochureForm />

        {/* CTA SECTION */}
        <section className="py-32 md:py-48 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 opacity-50"></div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-br from-white/3 to-transparent rounded-full blur-2xl animate-float-medium" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <TextReveal>
              <h2
                className="text-5xl md:text-7xl font-light mb-12 leading-tight hover:scale-105 transition-transform duration-700"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "-0.02em",
                  textShadow: "0 0 40px rgba(255,255,255,0.1)",
                }}
              >
                Klaar om te beginnen?
              </h2>
            </TextReveal>
            <TextReveal delay={200}>
              <p className="text-lg md:text-xl text-white/70 font-light mb-16 max-w-2xl mx-auto">
                Vraag een vrijblijvende offerte aan en ontdek wat wij voor u
                kunnen betekenen.
              </p>
            </TextReveal>
            <MagneticButton
              onClick={() => setLocation("/quote")}
              className="group inline-flex items-center px-12 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 relative overflow-hidden animate-glow-pulse"
            >
              <span className="relative z-10 text-xs tracking-widest uppercase mr-3">
                Offerte aanvragen
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </MagneticButton>
          </div>
        </section>
      </div>
    </>
  );
};

const styles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float-slow {
    0%, 100% {
      transform: translateY(0px) translateX(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(2deg);
    }
    50% {
      transform: translateY(-10px) translateX(-5px) rotate(-1deg);
    }
    75% {
      transform: translateY(-25px) translateX(5px) rotate(1deg);
    }
  }
  
  @keyframes float-medium {
    0%, 100% {
      transform: translateY(0px) translateX(0px);
    }
    33% {
      transform: translateY(-15px) translateX(-10px);
    }
    66% {
      transform: translateY(-8px) translateX(8px);
    }
  }
  
  @keyframes float-fast {
    0%, 100% {
      transform: translateY(0px) scale(1);
    }
    50% {
      transform: translateY(-12px) scale(1.05);
    }
  }
  
  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 20px rgba(196, 163, 108, 0.3), 0 0 40px rgba(196, 163, 108, 0.1);
    }
    50% {
      box-shadow: 0 0 30px rgba(196, 163, 108, 0.5), 0 0 60px rgba(196, 163, 108, 0.2);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }
  
  .animate-float-medium {
    animation: float-medium 6s ease-in-out infinite;
  }
  
  .animate-float-fast {
    animation: float-fast 4s ease-in-out infinite;
  }
  
  .animate-glow-pulse {
    animation: glow-pulse 2s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;

if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("luxury-animations");
  if (!existingStyle) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "luxury-animations";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

export default Home;
