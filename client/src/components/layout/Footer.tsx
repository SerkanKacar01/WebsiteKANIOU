import React from 'react';
import { Plus, Minus, ChevronDown } from 'lucide-react';

const Footer: React.FC = () => {
  const [isProductenExpanded, setIsProductenExpanded] = React.useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = React.useState(false);

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#222222] to-[#1a1a1a]">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(200, 168, 91, 0.08) 0%, transparent 50%),
                          radial-gradient(circle at 80% 70%, rgba(200, 168, 91, 0.05) 0%, transparent 50%)`
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        
        {/* Main Footer Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1: Bedrijf */}
          <div>
            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Bedrijf
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C8A85B] to-[#E6C988]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  KANIOU
                </p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#C8A85B] to-[#E6C988]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  zilvernaald
                </p>
              </div>
              <p className="text-sm text-gray-400 italic">
                Premium Gordijnen & Zonweringen
              </p>

              {/* Instagram Icon */}
              <div className="pt-4">
                <a 
                  href="https://www.instagram.com/kaniou_zilvernaald/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8A85B]/20 to-[#C8A85B]/10 border border-[#C8A85B]/30 hover:border-[#C8A85B]/60 hover:bg-[#C8A85B]/20 transition-all duration-300 group"
                  aria-label="Volg ons op Instagram"
                >
                  <svg className="w-5 h-5 text-[#C8A85B] group-hover:text-[#E6C988] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>

              {/* Order Tracking Button */}
              <div className="pt-4">
                <a 
                  href="/bestelling-volgen" 
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-[#C8A85B]/40 hover:border-[#C8A85B] bg-gradient-to-r from-[#C8A85B]/10 to-transparent hover:from-[#C8A85B]/20 transition-all duration-300 group"
                >
                  <svg className="w-5 h-5 text-[#C8A85B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-semibold tracking-widest text-[#F5F5F5] uppercase">
                    Volg uw bestelling
                  </span>
                  <svg className="w-4 h-4 text-[#C8A85B] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Producten - Expandable */}
          <div>
            <button
              onClick={() => setIsProductenExpanded(!isProductenExpanded)}
              className="w-full flex items-center justify-between text-left focus:outline-none group"
            >
              <h3 className="text-xl font-semibold text-[#F5F5F5] tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Producten
              </h3>
              <div className="ml-3 text-[#C8A85B] group-hover:text-[#E6C988] transition-colors">
                {isProductenExpanded ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isProductenExpanded ? "max-h-[600px] opacity-100 mt-6" : "max-h-0 opacity-0"
            }`}>
              <ul className="space-y-3">
                {[
                  { name: "Houten jaloezieën", href: "/producten/houten-jaloezieen" },
                  { name: "Textiel lamellen", href: "/producten/textiel-lamellen" },
                  { name: "Kunststof jaloezieën", href: "/producten/kunststof-jaloezieen" },
                  { name: "Kunststof lamellen", href: "/producten/kunststof-lamellen" },
                  { name: "Plissés", href: "/producten/plisse" },
                  { name: "Duo plissés", href: "/producten/duo-plisse" },
                  { name: "Rolgordijnen", href: "/producten/rolgordijnen" },
                  { name: "Duo rolgordijnen", href: "/producten/duo-rolgordijnen" },
                  { name: "Overgordijnen", href: "/producten/overgordijnen" },
                  { name: "Gordijnrails", href: "/producten/gordijnrails" },
                  { name: "Vitrages", href: "/producten/vitrages" },
                  { name: "Houten shutters", href: "/producten/houten-shutters" },
                  { name: "Vouwgordijnen", href: "/producten/vouwgordijnen" },
                  { name: "Gordijnroedes", href: "/gordijnroedes" },
                  { name: "Squid", href: "/squid" },
                  { name: "Horren", href: "/horren" },
                ].map((product) => (
                  <li key={product.name}>
                    <a 
                      href={product.href}
                      className="text-[#C8A85B] hover:text-[#E6C988] font-medium text-sm transition-colors hover:underline underline-offset-4"
                    >
                      {product.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Klantenservice - Always Visible */}
          <div>
            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Klantenservice
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Meet instructies", href: "/meet-instructies" },
                { name: "Installatie instructies", href: "/installatie-instructies" },
                { name: "Onderhouds instructies", href: "/onderhouds-instructies" },
                { name: "Retour beleid", href: "/retour-beleid" },
                { name: "Garantie voorwaarden", href: "/garantie-voorwaarden" },
                { name: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
                { name: "Bestelstatus volgen", href: "/bestelling-volgen" },
                { name: "Contact opnemen", href: "/contact" },
                { name: "Service & Herstellingen", href: "/service-en-herstellingen" },
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-[#F5F5F5] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85B]/60 group-hover:bg-[#C8A85B] transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Nieuwsbrief */}
          <div>
            <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Nieuwsbrief
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Blijf op de hoogte van nieuwe collecties, aanbiedingen en inspiratie voor uw interieur.
            </p>

            {/* Newsletter Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="flex-1 px-4 py-3 bg-white/5 border border-[#C8A85B]/30 rounded-sm text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A85B] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient-to-r from-[#C8A85B] to-[#B8941F] text-black font-semibold text-xs tracking-wider uppercase rounded-sm hover:from-[#D4AF37] hover:to-[#C8A85B] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#C8A85B]/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Aanmelden
                </button>
              </div>
            </form>

            {/* Contact Dropdown */}
            <div className="relative mt-6">
              <button
                onMouseEnter={() => setIsContactDropdownOpen(true)}
                onMouseLeave={() => setIsContactDropdownOpen(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                Contact
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isContactDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isContactDropdownOpen && (
                <div 
                  onMouseEnter={() => setIsContactDropdownOpen(true)}
                  onMouseLeave={() => setIsContactDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-full bg-white shadow-xl rounded-sm overflow-hidden z-50"
                >
                  {[
                    { name: "Plan een afspraak", href: "/contact" },
                    { name: "Vrijblijvende offerte", href: "/quote" },
                    { name: "Bestelling volgen", href: "/bestelling-volgen" },
                  ].map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-5 py-3 text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors border-l-4 border-transparent hover:border-orange-500"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Footer - Accordion Style */}
        <div className="md:hidden space-y-1 mb-12">
          {/* Mobile Bedrijf */}
          <MobileSection title="Bedrijf" defaultOpen>
            <div className="space-y-3">
              <p className="text-lg font-bold text-[#C8A85B]">KANIOU zilvernaald</p>
              <p className="text-sm text-gray-400 italic">Premium Gordijnen & Zonweringen</p>
              <a 
                href="https://www.instagram.com/kaniou_zilvernaald/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#C8A85B]/20 border border-[#C8A85B]/30"
              >
                <svg className="w-5 h-5 text-[#C8A85B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="/bestelling-volgen" 
                className="flex items-center gap-2 px-4 py-2 mt-2 rounded-full border border-[#C8A85B]/40 text-[#F5F5F5] text-xs font-semibold tracking-wider uppercase"
              >
                <svg className="w-4 h-4 text-[#C8A85B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Volg uw bestelling
              </a>
            </div>
          </MobileSection>

          {/* Mobile Producten */}
          <MobileSection title="Producten">
            <ul className="space-y-2">
              {[
                "Houten jaloezieën", "Textiel lamellen", "Kunststof jaloezieën", "Kunststof lamellen",
                "Plissés", "Duo plissés", "Rolgordijnen", "Duo rolgordijnen", "Overgordijnen",
                "Gordijnrails", "Vitrages", "Houten shutters", "Vouwgordijnen"
              ].map((product) => (
                <li key={product}>
                  <a href={`/producten/${product.toLowerCase().replace(/\s+/g, '-').replace(/ë/g, 'e')}`} className="text-[#C8A85B] text-sm font-medium">
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </MobileSection>

          {/* Mobile Klantenservice */}
          <MobileSection title="Klantenservice">
            <ul className="space-y-2">
              {[
                "Meet instructies", "Installatie instructies", "Onderhouds instructies",
                "Retour beleid", "Garantie voorwaarden", "Veelgestelde vragen",
                "Bestelstatus volgen", "Contact opnemen", "Service & Herstellingen"
              ].map((item) => (
                <li key={item}>
                  <a href={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'en')}`} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C8A85B]/60"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </MobileSection>

          {/* Mobile Nieuwsbrief */}
          <MobileSection title="Nieuwsbrief" defaultOpen>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Blijf op de hoogte van nieuwe collecties en aanbiedingen.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="E-mail"
                  className="flex-1 px-3 py-2 bg-white/5 border border-[#C8A85B]/30 rounded-sm text-white placeholder-gray-500 text-sm"
                />
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-[#C8A85B] to-[#B8941F] text-black font-semibold text-xs rounded-sm">
                  Aanmelden
                </button>
              </form>
            </div>
          </MobileSection>

          {/* Mobile Legal */}
          <MobileSection title="Wettelijke documenten">
            <ul className="space-y-2">
              {[
                { name: "Privacybeleid", href: "/privacybeleid" },
                { name: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
                { name: "Cookiebeleid", href: "/cookiebeleid" },
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "Gebruiksvoorwaarden", href: "/gebruiksvoorwaarden" },
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-400 text-sm">{item.name}</a>
                </li>
              ))}
            </ul>
          </MobileSection>
        </div>

        {/* Bottom Section - Desktop */}
        <div className="hidden md:block border-t border-white/10 pt-8">
          <div className="text-center space-y-4">
            <p className="text-gray-500 text-sm">
              © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
            </p>

            <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm">
              <a href="/privacybeleid" className="text-gray-400 hover:text-[#C8A85B] transition-colors">Privacybeleid</a>
              <span className="text-gray-600">|</span>
              <a href="/algemene-voorwaarden" className="text-gray-400 hover:text-[#C8A85B] transition-colors">Algemene voorwaarden</a>
              <span className="text-gray-600">|</span>
              <a href="/cookiebeleid" className="text-gray-400 hover:text-[#C8A85B] transition-colors">Cookiebeleid</a>
              <span className="text-gray-600">|</span>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && typeof (window as any).showCookieSettings === 'function') {
                    (window as any).showCookieSettings();
                  }
                }}
                className="text-gray-400 hover:text-[#C8A85B] transition-colors cursor-pointer"
              >
                🍪 Cookie Instellingen
              </button>
              <span className="text-gray-600">|</span>
              <a href="/disclaimer" className="text-gray-400 hover:text-[#C8A85B] transition-colors">Disclaimer</a>
              <span className="text-gray-600">|</span>
              <a href="/gebruiksvoorwaarden" className="text-gray-400 hover:text-[#C8A85B] transition-colors">Gebruiksvoorwaarden</a>
            </div>

            <a
              href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#C8A85B] hover:text-[#E6C988] transition-colors"
            >
              <span>⭐</span>
              Bekijk onze Google Reviews
            </a>
          </div>
        </div>

        {/* Bottom Section - Mobile */}
        <div className="md:hidden text-center pt-6 border-t border-white/10">
          <p className="text-gray-500 text-xs mb-4">
            © 2025 KANIOU Zilvernaald – Alle rechten voorbehouden
          </p>
          <a
            href="https://www.google.com/maps/place/KANIOU+bvba+ZILVERNAALD"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#C8A85B]"
          >
            <span>⭐</span>
            Bekijk onze Google Reviews
          </a>
        </div>
      </div>
    </footer>
  );
};

// Mobile Section Component
const MobileSection = ({ 
  title, 
  children, 
  defaultOpen = false 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-2 focus:outline-none"
      >
        <h3 className="text-lg font-semibold text-[#F5F5F5]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {title}
        </h3>
        {isOpen ? (
          <Minus className="w-5 h-5 text-[#C8A85B]" />
        ) : (
          <Plus className="w-5 h-5 text-[#C8A85B]" />
        )}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-[500px] opacity-100 pb-4 px-2" : "max-h-0 opacity-0"
      }`}>
        {children}
      </div>
    </div>
  );
};

export default Footer;
