import React from 'react';
import { Plus, Minus } from 'lucide-react';

const Footer: React.FC = () => {
  const [expandedSections, setExpandedSections] = React.useState({
    bedrijf: false,
    producten: false,
    klantenservice: false,
    nieuwsbrief: true,
    legal: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  return (
    <footer className="ultra-luxury-footer">
      <div className="ultra-luxury-footer-bg"></div>
      <div className="ultra-luxury-footer-texture"></div>
      <div className="ultra-luxury-footer-container">

        {/* Main Footer Content */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Column 1: Bedrijf */}
          <div className="ultra-luxury-footer-column">
            <h3 className="ultra-luxury-footer-heading">Bedrijf</h3>
            <div className="ultra-luxury-footer-content">
              <div className="ultra-luxury-brand-container">
                <p className="ultra-luxury-brand-name">
                  KANIOU zilvernaald
                </p>
                <p className="ultra-luxury-brand-tagline">
                  Premium Gordijnen & Zonweringen
                </p>
              </div>

              {/* Ultra-Luxury Social Media */}
              <div className="ultra-luxury-social-container">
                <a href="#" className="ultra-luxury-social-icon">
                  <div className="ultra-luxury-social-bg"></div>
                  <svg
                    className="ultra-luxury-social-svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Producten */}
          <div className="ultra-luxury-footer-column">
            <h3 className="ultra-luxury-footer-heading">Producten</h3>
            <div className="ultra-luxury-footer-content">
              <ul className="ultra-luxury-footer-links">
                <li>
                  <a
                    href="/producten/houten-jaloezieen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Houten jaloezieën"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Houten jaloezieën
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/textiel-lamellen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Textiel lamellen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Textiel lamellen
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/kunststof-jaloezieen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Kunststof jaloezieën"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Kunststof jaloezieën
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/kunststof-lamellen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Kunststof lamellen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Kunststof lamellen
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/plisse"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Plissés"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Plissés
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/duo-plisse"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Duo plissés"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Duo plissés
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/rolgordijnen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Rolgordijnen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Rolgordijnen
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/duo-rolgordijnen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Duo rolgordijnen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Duo rolgordijnen
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/overgordijnen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Overgordijnen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Overgordijnen
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/gordijnrails"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Gordijnrails"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Gordijnrails
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/vitrages"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Vitrages"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Vitrages
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/houten-shutters"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Houten shutters"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Houten shutters
                  </a>
                </li>
                <li>
                  <a
                    href="/producten/vonwgordijnen"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Vonwgordijnen"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Vonwgordijnen
                  </a>
                </li>
                <li>
                  <a
                    href="/gordijnroedes"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Gordijnroedes"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Gordijnroedes
                  </a>
                </li>
                <li>
                  <a
                    href="/squid"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Squid"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Squid
                  </a>
                </li>
                <li>
                  <a
                    href="/horren"
                    className="ultra-luxury-footer-link ultra-luxury-footer-link-available"
                    aria-label="Go to product page for Horren"
                  >
                    <span className="ultra-luxury-product-icon">🛒</span>
                    Horren
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Klantenservice */}
          <div className="ultra-luxury-footer-column">
            <h3 className="ultra-luxury-footer-heading">Klantenservice</h3>
            <div className="ultra-luxury-footer-content">
              <ul className="ultra-luxury-footer-links">
                <li>
                  <a
                    href="/meet-instructies"
                    className="ultra-luxury-footer-link"
                  >
                    Meet instructies
                  </a>
                </li>
                <li>
                  <a
                    href="/installatie-instructies"
                    className="ultra-luxury-footer-link"
                  >
                    Installatie instructies
                  </a>
                </li>
                <li>
                  <a
                    href="/onderhouds-instructies"
                    className="ultra-luxury-footer-link"
                  >
                    Onderhouds instructies
                  </a>
                </li>
                <li>
                  <a
                    href="/retour-beleid"
                    className="ultra-luxury-footer-link"
                  >
                    Retour beleid
                  </a>
                </li>
                <li>
                  <a
                    href="/garantie-voorwaarden"
                    className="ultra-luxury-footer-link"
                  >
                    Garantie voorwaarden
                  </a>
                </li>
                <li>
                  <a
                    href="/veelgestelde-vragen"
                    className="ultra-luxury-footer-link"
                  >
                    Veelgestelde vragen
                  </a>
                </li>
                <li>
                  <a
                    href="/bestelling-volgen"
                    className="ultra-luxury-footer-link"
                  >
                    Bestelstatus volgen
                  </a>
                </li>
                <li>
                  <a href="/contact" className="ultra-luxury-footer-link">
                    Contact opnemen
                  </a>
                </li>
                <li>
                  <a
                    href="/service-en-herstellingen"
                    className="ultra-luxury-footer-link"
                  >
                    Service & Herstellingen
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Nieuwsbrief */}
          <div className="ultra-luxury-footer-column">
            <h3 className="ultra-luxury-footer-heading">Nieuwsbrief</h3>
            <div className="ultra-luxury-footer-content">
              <p className="ultra-luxury-newsletter-description">
                Blijf op de hoogte van nieuwe collecties, aanbiedingen en
                inspiratie voor uw interieur.
              </p>

              {/* Ultra-Luxury Newsletter Signup */}
              <form className="ultra-luxury-newsletter-form">
                <div className="ultra-luxury-newsletter-container">
                  <div className="ultra-luxury-input-wrapper">
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="ultra-luxury-newsletter-input"
                      required
                    />
                    <div className="ultra-luxury-input-glow"></div>
                  </div>
                  <button
                    type="submit"
                    className="ultra-luxury-newsletter-button"
                  >
                    <div className="ultra-luxury-button-bg"></div>
                    <div className="ultra-luxury-button-content">
                      <svg
                        className="ultra-luxury-button-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="ultra-luxury-button-text">
                        Aanmelden
                      </span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Footer */}
        <div className="md:hidden space-y-1 mb-12">
          {/* Bedrijf Section */}
          <div className="border-b border-gold-200/30">
            <button
              onClick={() => toggleSection("bedrijf")}
              className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
            >
              <h3 className="footer-heading text-lg font-semibold text-gray-900">
                Bedrijf
              </h3>
              <div className="ml-2 transition-transform duration-300">
                {expandedSections.bedrijf ? (
                  <Minus className="w-5 h-5 text-gold-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gold-600" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections.bedrijf
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-2 pb-4">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  KANIOU zilvernaald
                </p>
                <p className="text-gray-700 mb-4">
                  Premium Gordijnen & Zonweringen
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4">
                  <a href="#" className="footer-social-icon">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Producten Section */}
          <div className="border-b border-gold-200/30">
            <button
              onClick={() => toggleSection("producten")}
              className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
            >
              <h3 className="footer-heading text-lg font-semibold text-gray-900">
                Producten
              </h3>
              <div className="ml-2 transition-transform duration-300">
                {expandedSections.producten ? (
                  <Minus className="w-5 h-5 text-gold-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gold-600" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections.producten
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-2 pb-4">
                <ul className="space-y-3">
                  <li>
                    <a
                      href="/producten/houten-jaloezieen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Houten jaloezieën"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Houten jaloezieën
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/textiel-lamellen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Textiel lamellen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Textiel lamellen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/kunststof-jaloezieen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Kunststof jaloezieën"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Kunststof jaloezieën
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/kunststof-lamellen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Kunststof lamellen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Kunststof lamellen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/plisse"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Plissés"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Plissés
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/duo-plisse"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Duo plissés"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Duo plissés
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/rolgordijnen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Rolgordijnen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Rolgordijnen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/duo-rolgordijnen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Duo rolgordijnen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Duo rolgordijnen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/overgordijnen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Overgordijnen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Overgordijnen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/gordijnrails"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Gordijnrails"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Gordijnrails
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/vitrages"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Vitrages"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Vitrages
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/houten-shutters"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Houten shutters"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Houten shutters
                    </a>
                  </li>
                  <li>
                    <a
                      href="/producten/vonwgordijnen"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Vonwgordijnen"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Vonwgordijnen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/gordijnroedes"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Gordijnroedes"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Gordijnroedes
                    </a>
                  </li>
                  <li>
                    <a
                      href="/squid"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Squid"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Squid
                    </a>
                  </li>
                  <li>
                    <a
                      href="/horren"
                      className="footer-link footer-link-available"
                      aria-label="Go to product page for Horren"
                    >
                      <span className="footer-product-icon">🛒</span>
                      Horren
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Klantenservice Section */}
          <div className="border-b border-gold-200/30">
            <button
              onClick={() => toggleSection("klantenservice")}
              className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
            >
              <h3 className="footer-heading text-lg font-semibold text-gray-900">
                Klantenservice
              </h3>
              <div className="ml-2 transition-transform duration-300">
                {expandedSections.klantenservice ? (
                  <Minus className="w-5 h-5 text-gold-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gold-600" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections.klantenservice
                  ? "max-h-[600px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-2 pb-4">
                <ul className="space-y-3">
                  <li>
                    <a href="/meet-instructies" className="footer-link">
                      Meet instructies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/installatie-instructies"
                      className="footer-link"
                    >
                      Installatie instructies
                    </a>
                  </li>
                  <li>
                    <a
                      href="/onderhouds-instructies"
                      className="footer-link"
                    >
                      Onderhouds instructies
                    </a>
                  </li>
                  <li>
                    <a href="/retour-beleid" className="footer-link">
                      Retour beleid
                    </a>
                  </li>
                  <li>
                    <a href="/garantie-voorwaarden" className="footer-link">
                      Garantie voorwaarden
                    </a>
                  </li>
                  <li>
                    <a href="/veelgestelde-vragen" className="footer-link">
                      Veelgestelde vragen
                    </a>
                  </li>
                  <li>
                    <a href="/bestelling-volgen" className="footer-link">
                      Bestelstatus volgen
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="footer-link">
                      Contact opnemen
                    </a>
                  </li>
                  <li>
                    <a
                      href="/service-en-herstellingen"
                      className="footer-link"
                    >
                      Service & Herstellingen
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nieuwsbrief Section */}
          <div className="border-b border-gold-200/30">
            <button
              onClick={() => toggleSection("nieuwsbrief")}
              className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
            >
              <h3 className="footer-heading text-lg font-semibold text-gray-900">
                Nieuwsbrief
              </h3>
              <div className="ml-2 transition-transform duration-300">
                {expandedSections.nieuwsbrief ? (
                  <Minus className="w-5 h-5 text-gold-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gold-600" />
                )}
              </div>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedSections.nieuwsbrief
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-2 pb-4">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Blijf op de hoogte van nieuwe collecties, aanbiedingen en
                  inspiratie voor uw interieur.
                </p>

                {/* Newsletter Signup */}
                <form className="newsletter-form">
                  <div className="newsletter-input-group">
                    <input
                      type="email"
                      placeholder="E-mail"
                      className="newsletter-input"
                      required
                    />
                    <button type="submit" className="newsletter-button">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                        />
                      </svg>
                      Aanmelden
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Legal Section - Collapsible */}
        <div className="md:hidden border-b border-gold-200/30">
          <button
            onClick={() => toggleSection("legal")}
            className="w-full flex justify-between items-center py-4 px-2 text-left focus:outline-none focus:ring-2 focus:ring-gold-500/20 rounded"
          >
            <h3 className="footer-heading text-lg font-semibold text-gray-900">
              Wettelijke documenten
            </h3>
            <div className="ml-2 transition-transform duration-300">
              {expandedSections.legal ? (
                <Minus className="w-5 h-5 text-gold-600" />
              ) : (
                <Plus className="w-5 h-5 text-gold-600" />
              )}
            </div>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              expandedSections.legal
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-2 pb-4">
              <ul className="space-y-3 mb-4">
                <li>
                  <a href="/privacybeleid" className="footer-legal-link">
                    Privacybeleid
                  </a>
                </li>
                <li>
                  <a
                    href="/algemene-voorwaarden"
                    className="footer-legal-link"
                  >
                    Algemene voorwaarden
                  </a>
                </li>
                <li>
                  <a href="/cookiebeleid" className="footer-legal-link">
                    Cookiebeleid
                  </a>
                </li>
                <li>
                  <a href="/disclaimer" className="footer-legal-link">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a
                    href="/gebruiksvoorwaarden"
                    className="footer-legal-link"
                  >
                    Gebruiksvoorwaarden
                  </a>
                </li>
              </ul>

              {/* Google Reviews Link */}
              <div className="text-center">
                <a
                  href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors duration-300 hover:underline"
                >
                  <span className="mr-1">⭐</span>
                  Bekijk onze Google Reviews
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Legal Section - Always visible */}
        <div className="hidden md:block footer-legal">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-4">
              © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
            </p>

            {/* Enhanced Legal Links */}
            <div className="flex flex-wrap justify-center lg:justify-between items-center gap-x-4 gap-y-2 text-sm mb-4 lg:max-w-none lg:w-full">
              <a href="/privacybeleid" className="footer-legal-link">
                Privacybeleid
              </a>
              <span className="text-gray-400">|</span>
              <a href="/algemene-voorwaarden" className="footer-legal-link">
                Algemene voorwaarden
              </a>
              <span className="text-gray-400">|</span>
              <a href="/cookiebeleid" className="footer-legal-link">
                Cookiebeleid
              </a>
              <span className="text-gray-400">|</span>
              <a href="/disclaimer" className="footer-legal-link">
                Disclaimer
              </a>
              <span className="text-gray-400">|</span>
              <a href="/gebruiksvoorwaarden" className="footer-legal-link">
                Gebruiksvoorwaarden
              </a>
            </div>

            {/* Google Reviews Link */}
            <div className="text-center">
              <a
                href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD/@50.9886857,5.6914029,17z/data=!4m16!1m9!3m8!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!2sKANIOU+bvba+ZILVERNAALD!8m2!3d50.9886857!4d5.6939832!9m1!1b1!16s%2Fg%2F11snz4psjn!3m5!1s0x47c0c5d2ad242f0f:0x1d9efc14cec41751!8m2!3d50.9886857!4d5.6939832!16s%2Fg%2F11snz4psjn?authuser=4&entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors duration-300 hover:underline"
              >
                <span className="mr-1">⭐</span>
                Bekijk onze Google Reviews
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Copyright - Always visible */}
        <div className="md:hidden text-center mt-6">
          <p className="text-gray-600 text-sm">
            © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;