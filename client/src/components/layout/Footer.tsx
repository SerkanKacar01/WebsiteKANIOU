import React from 'react';
import { Plus, Minus, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Enterprise gold top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C8A85B] to-transparent" />

      <div className="relative bg-gradient-to-b from-[#1a1a1a] via-[#222222] to-[#1a1a1a]">
        {/* Subtle radial glow overlays */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(200, 168, 91, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, rgba(200, 168, 91, 0.05) 0%, transparent 50%)`
        }} />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-8 lg:px-20 xl:px-32 py-16 lg:py-20">

          {/* ── Desktop Grid ── */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 xl:gap-24 mb-16">

            {/* Column 1: Bedrijf + Contact */}
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
                <p className="text-sm text-gray-400 italic">Premium Gordijnen & Zonweringen</p>

                {/* Contact details */}
                <ul className="space-y-3 pt-2">
                  <li>
                    <a
                      href="https://maps.google.com/?q=Pauwengraaf+66+3630+Maasmechelen"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2.5 text-sm text-gray-400 hover:text-[#C8A85B] transition-colors group"
                    >
                      <MapPin className="w-4 h-4 text-[#C8A85B]/70 group-hover:text-[#C8A85B] mt-0.5 flex-shrink-0" />
                      <span>Pauwengraaf 66<br />3630 Maasmechelen, België</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+32471526687" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#C8A85B] transition-colors group">
                      <Phone className="w-4 h-4 text-[#C8A85B]/70 group-hover:text-[#C8A85B] flex-shrink-0" />
                      +32 471 52 66 87
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@kaniou.be" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#C8A85B] transition-colors group">
                      <Mail className="w-4 h-4 text-[#C8A85B]/70 group-hover:text-[#C8A85B] flex-shrink-0" />
                      info@kaniou.be
                    </a>
                  </li>
                </ul>

                {/* Opening hours */}
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#C8A85B]/70" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#C8A85B]/80">Openingstijden</span>
                  </div>
                  <ul className="space-y-1 pl-6">
                    {[
                      { days: "Ma – Vr", hours: "10:00 – 18:00" },
                      { days: "Zaterdag", hours: "10:00 – 17:00" },
                      { days: "Zondag", hours: "Gesloten" },
                    ].map((row) => (
                      <li key={row.days} className="flex justify-between text-xs text-gray-400 gap-4">
                        <span>{row.days}</span>
                        <span className={row.hours === "Gesloten" ? "text-gray-600" : "text-gray-300"}>{row.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instagram */}
                <div className="pt-2">
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
              </div>
            </div>

            {/* Column 2: Producten */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-semibold text-[#F5F5F5] tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Producten
                </h3>
                <Plus className="w-4 h-4 text-[#C8A85B]" />
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
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
                  <a
                    key={product.name}
                    href={product.href}
                    className="text-[#C8A85B] hover:text-[#E6C988] font-medium text-sm transition-colors hover:underline underline-offset-4 py-1"
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 3: Klantenservice */}
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
                  { name: "Contact opnemen", href: "/contact" },
                  { name: "Service & Herstellingen", href: "/service-en-herstellingen" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#F5F5F5] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A85B]/60 group-hover:bg-[#C8A85B] transition-colors flex-shrink-0" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Nieuwsbrief + Trust */}
            <div>
              <h3 className="text-xl font-semibold text-[#F5F5F5] mb-6 tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Nieuwsbrief
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                Blijf op de hoogte van nieuwe collecties, aanbiedingen en inspiratie voor uw interieur.
              </p>
              <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
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

              {/* Trust badges */}
              <div className="border-t border-white/10 pt-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A85B]/70 mb-3">Kwaliteitsgaranties</p>
                {[
                  { icon: "🛡️", label: "Belgische vakmanschap" },
                  { icon: "📐", label: "Gratis opmeting aan huis" },
                  { icon: "🔧", label: "Professionele montage" },
                  { icon: "✅", label: "10 jaar garantie op maatwerk" },
                ].map((badge) => (
                  <div key={badge.label} className="flex items-center gap-2.5">
                    <span className="text-sm">{badge.icon}</span>
                    <span className="text-xs text-gray-400">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Mobile Accordion ── */}
          <div className="md:hidden space-y-1 mb-12">
            <MobileSection title="Bedrijf" defaultOpen>
              <div className="space-y-3">
                <p className="text-lg font-bold text-[#C8A85B]">KANIOU zilvernaald</p>
                <p className="text-sm text-gray-400 italic">Premium Gordijnen & Zonweringen</p>
                <ul className="space-y-2 pt-1">
                  <li className="flex items-start gap-2 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 text-[#C8A85B]/70 mt-0.5 flex-shrink-0" />
                    <span>Pauwengraaf 66, 3630 Maasmechelen</span>
                  </li>
                  <li>
                    <a href="tel:+32471526687" className="flex items-center gap-2 text-sm text-gray-400">
                      <Phone className="w-4 h-4 text-[#C8A85B]/70 flex-shrink-0" />
                      +32 471 52 66 87
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@kaniou.be" className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="w-4 h-4 text-[#C8A85B]/70 flex-shrink-0" />
                      info@kaniou.be
                    </a>
                  </li>
                </ul>
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#C8A85B]/70 mb-2">Openingstijden</p>
                  {[
                    { days: "Ma – Vr", hours: "10:00 – 18:00" },
                    { days: "Zaterdag", hours: "10:00 – 17:00" },
                    { days: "Zondag", hours: "Gesloten" },
                  ].map((row) => (
                    <div key={row.days} className="flex justify-between text-xs text-gray-400 py-0.5">
                      <span>{row.days}</span>
                      <span className={row.hours === "Gesloten" ? "text-gray-600" : "text-gray-300"}>{row.hours}</span>
                    </div>
                  ))}
                </div>
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
              </div>
            </MobileSection>

            <MobileSection title="Producten">
              <ul className="space-y-2">
                {[
                  "Houten jaloezieën", "Textiel lamellen", "Kunststof jaloezieën", "Kunststof lamellen",
                  "Plissés", "Duo plissés", "Rolgordijnen", "Duo rolgordijnen", "Overgordijnen",
                  "Gordijnrails", "Vitrages", "Houten shutters", "Vouwgordijnen"
                ].map((product) => (
                  <li key={product}>
                    <a href={`/producten/${product.toLowerCase().replace(/\s+/g, '-').replace(/ë/g, 'e').replace(/é/g, 'e')}`} className="text-[#C8A85B] text-sm font-medium">
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </MobileSection>

            <MobileSection title="Klantenservice">
              <ul className="space-y-2">
                {[
                  { name: "Meet instructies", href: "/meet-instructies" },
                  { name: "Installatie instructies", href: "/installatie-instructies" },
                  { name: "Onderhouds instructies", href: "/onderhouds-instructies" },
                  { name: "Retour beleid", href: "/retour-beleid" },
                  { name: "Garantie voorwaarden", href: "/garantie-voorwaarden" },
                  { name: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
                  { name: "Contact opnemen", href: "/contact" },
                  { name: "Service & Herstellingen", href: "/service-en-herstellingen" },
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C8A85B]/60 flex-shrink-0" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </MobileSection>

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

          {/* ── Trust strip (desktop) ── */}
          <div className="hidden md:flex justify-center gap-10 mb-10 flex-wrap">
            {[
              { icon: "🛡️", label: "Belgische vakmanschap" },
              { icon: "📐", label: "Gratis opmeting aan huis" },
              { icon: "🔧", label: "Professionele montage" },
              { icon: "✅", label: "10 jaar garantie op maatwerk" },
              { icon: "⭐", label: "Uitstekende Google beoordelingen" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2">
                <span className="text-base">{badge.icon}</span>
                <span className="text-xs text-gray-500 tracking-wide">{badge.label}</span>
              </div>
            ))}
          </div>

          {/* ── Bottom bar ── */}
          <div className="border-t border-white/10 pt-8">
            <div className="text-center space-y-4">
              <p className="text-gray-500 text-sm">
                © 2026 KANIOU Zilvernaald – Alle rechten voorbehouden
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

        </div>
      </div>
    </footer>
  );
};

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
        isOpen ? "max-h-[600px] opacity-100 pb-4 px-2" : "max-h-0 opacity-0"
      }`}>
        {children}
      </div>
    </div>
  );
};

export default Footer;
