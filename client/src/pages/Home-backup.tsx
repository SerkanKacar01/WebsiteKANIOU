import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  Shield,
  Truck,
  Users,
  Award,
  Clock,
  ArrowRight,
  Eye,
  Quote,
  Star,
  Menu,
  X,
  Plus,
  Minus,
} from "lucide-react";
import React from "react";
import kaniouLogo from "@assets/KAN.LOGO kopie_1756921377138.png";
// Product and gallery images
import interiorImageSrc from "@assets/Overgordijnen.jpeg";
import duoPlisseImageSrc from "@assets/Duoplisse.jpeg";
import duoRolgordijnenImageSrc from "@assets/Duorolgordijnen.jpeg";
import overgordijnenImageSrc from "@assets/Overgordijnen.jpeg";
import plisseImageSrc from "@assets/Plisse.jpeg";
import rolgordijnenImageSrc from "@assets/Rolgordijnen.jpeg";
import opzethorrenImageSrc from "@assets/Opzethorren.jpeg";
// Gallery images for real installations
import gallery1Src from "@assets/IMG_9192.jpeg";
import gallery2Src from "@assets/IMG_9204.jpeg";
import gallery3Src from "@assets/IMG_9217.jpeg";
import gallery4Src from "@assets/IMG_9219.jpeg";
import gallery5Src from "@assets/IMG_9220.jpeg";
import gallery6Src from "@assets/IMG_9221.jpeg";

const interiorImage = interiorImageSrc;
const duoPlisseImage = duoPlisseImageSrc;
const duoRolgordijnenImage = duoRolgordijnenImageSrc;
const overgordijnenImage = overgordijnenImageSrc;
const plisseImage = plisseImageSrc;
const rolgordijnenImage = rolgordijnenImageSrc;
const opzethorrenImage = opzethorrenImageSrc;
const gallery1 = gallery1Src;
const gallery2 = gallery2Src;
const gallery3 = gallery3Src;
const gallery4 = gallery4Src;
const gallery5 = gallery5Src;
const gallery6 = gallery6Src;

const Home = () => {
  const [, setLocation] = useLocation();

  const handleExploreProducts = () => {
    setLocation("/producten/overgordijnen");
  };

  const handleRequestQuote = () => {
    setLocation("/quote");
  };

  return (
    <>
      <Helmet>
        <title>
          KANIOU ZILVERNAALD – Premium Raamdecoratie & Maatwerk Gordijnen | Meer
          dan 30 jaar ervaring
        </title>
        <meta
          name="description"
          content="KANIOU offers premium custom curtains, blinds, and window treatments in Belgium. 30+ years of expertise in tailor-made solutions for your home and business."
        />
        <meta
          property="og:title"
          content="KANIOU - Premium Window Treatments & Custom Curtains"
        />
        <meta
          property="og:description"
          content="Transform your space with our premium custom window treatments. Professional installation and 30+ years of expertise in Belgium."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="content-offset">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={interiorImage}
              alt="Modern interior with elegant window treatments"
              className="w-full h-full object-cover"
            />
            {/* Elegant transparent overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30"></div>
            {/* Additional mobile overlay for better text readability */}
            <div className="absolute inset-0 md:hidden bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 md:px-6 py-16 md:pt-16 pt-24">
            {/* Ultra-Luxury Title */}
            <h1 className="font-luxury-display text-hero text-white mb-8 leading-[0.9] tracking-tight text-shadow-luxury drop-shadow-2xl">
              <span className="block text-4xl md:text-hero">
                Exquise raamdecoratie
              </span>
              <span className="block gradient-text-luxury mt-2 md:mt-4 text-glow text-3xl md:text-hero">
                Artistry
              </span>
            </h1>

            {/* Luxury Subtitle */}
            <p className="text-lg md:text-subtitle text-white/90 mb-12 md:mb-16 max-w-5xl mx-auto leading-relaxed font-light drop-shadow-xl font-luxury-display">
              <span className="block text-xl md:text-3xl font-medium tracking-wide">
                Waar vakmanschap en verfijning samenkomen.
              </span>
              <span className="block mt-4 text-white/75 text-base md:text-xl font-light tracking-wide">
                Breng stijl, comfort en maatwerk samen in uw interieur met
                exclusieve raamdecoratie. Ontdek de perfecte oplossing voor elke
                ruimte – vandaag nog.
              </span>
            </p>

            {/* Elegant CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-center">
              <button
                onClick={handleExploreProducts}
                className="btn-primary-luxury w-full md:w-auto"
              >
                <span>Ontdek onze collecties</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={handleRequestQuote}
                className="btn-secondary-luxury w-full md:w-auto"
              >
                <Quote className="mr-2 h-5 w-5" />
                Gratis offerte
              </button>
            </div>
          </div>
        </div>

        {/* Rest of the content would go here... */}
        {/* For now, just close the sections properly */}
      </div>
    </>
  );
};

export default Home;