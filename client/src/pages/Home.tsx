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

        {/* Product Showcase Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Onze Premium Collectie
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Ontdek onze exclusieve range van raamdecoratie, elk met zijn eigen unieke karakter en functionaliteit
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Rolgordijnen */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100">
                  <img src={rolgordijnenImage} alt="Rolgordijnen" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Rolgordijnen</h3>
                  <p className="text-gray-600 mb-4">Strak design met uitstekende functionaliteit</p>
                  <button 
                    onClick={() => setLocation("/producten/rolgordijnen")}
                    className="text-accent font-medium hover:underline"
                  >
                    Bekijk collectie →
                  </button>
                </div>
              </div>

              {/* Plissé */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-50 to-green-100">
                  <img src={plisseImage} alt="Plissé" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Plissé</h3>
                  <p className="text-gray-600 mb-4">Elegant gevouwen design voor moderne interieurs</p>
                  <button 
                    onClick={() => setLocation("/producten/plisse")}
                    className="text-accent font-medium hover:underline"
                  >
                    Bekijk collectie →
                  </button>
                </div>
              </div>

              {/* Overgordijnen */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-50 to-purple-100">
                  <img src={overgordijnenImage} alt="Overgordijnen" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2">Overgordijnen</h3>
                  <p className="text-gray-600 mb-4">Luxueuze stoffen voor sfeervolle interieurs</p>
                  <button 
                    onClick={() => setLocation("/producten/overgordijnen")}
                    className="text-accent font-medium hover:underline"
                  >
                    Bekijk collectie →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Waarom kiezen voor KANIOU?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">30+ Jaar Ervaring</h3>
                <p className="text-gray-600">Ruime ervaring in maatwerk raamdecoratie</p>
              </div>

              <div className="text-center">
                <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Kwaliteitsgarantie</h3>
                <p className="text-gray-600">Uitsluitend premium materialen</p>
              </div>

              <div className="text-center">
                <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Persoonlijke Service</h3>
                <p className="text-gray-600">Van advies tot installatie</p>
              </div>

              <div className="text-center">
                <div className="bg-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Snelle Levering</h3>
                <p className="text-gray-600">Professionale installatie inbegrepen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Preview Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Onze Realisaties
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Bekijk enkele voorbeelden van onze prachtige installaties bij tevreden klanten
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery1} alt="Gallerij voorbeeld 1" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery2} alt="Gallerij voorbeeld 2" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery3} alt="Gallerij voorbeeld 3" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery4} alt="Gallerij voorbeeld 4" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery5} alt="Gallerij voorbeeld 5" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <img src={gallery6} alt="Gallerij voorbeeld 6" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            </div>

            <div className="text-center mt-8">
              <button 
                onClick={() => setLocation("/gallerij")}
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Bekijk alle realisaties
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Klaar voor uw droominterieur?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Laat ons samen uw wensen omzetten in een prachtig en functioneel interieur
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleRequestQuote}
                className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors"
              >
                Gratis offerte aanvragen
              </button>
              <button 
                onClick={() => setLocation("/contact")}
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Neem contact op
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;