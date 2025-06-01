import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MobileFooter = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pb-20">
      {/* Quick Contact Section */}
      <div className="bg-secondary text-primary py-6 px-4">
        <div className="text-center">
          <h3 className="font-semibold text-lg mb-4">Hulp nodig?</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="tel:+32123456789">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Phone className="h-4 w-4 mr-2" />
                Bellen
              </Button>
            </a>
            <a href="mailto:info@kaniou.be">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="h-4 w-4 mr-2" />
                E-mail
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="px-4 py-6">
        <div className="text-center mb-6">
          <h3 className="font-display text-xl font-medium mb-2">
            KANIOU <span className="text-secondary">zilvernaald</span>
          </h3>
          <p className="text-sm opacity-90">Premium Gordijnen & Zonweringen</p>
        </div>

        {/* Contact Info Cards */}
        <div className="space-y-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Bezoekadres</p>
              <p className="text-sm opacity-90">Industrieweg 12<br />2300 Turnhout</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-lg p-4 flex items-start space-x-3">
            <Clock className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Openingstijden</p>
              <p className="text-sm opacity-90">Ma-Za: 9:00 - 18:00<br />Zo: Op afspraak</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h4 className="font-medium mb-3">Service</h4>
            <div className="space-y-2 text-sm">
              <Link href="/quote">
                <div className="opacity-90 hover:opacity-100">Gratis Offerte</div>
              </Link>
              <Link href="/contact">
                <div className="opacity-90 hover:opacity-100">Contact</div>
              </Link>
              <Link href="/zakelijk">
                <div className="opacity-90 hover:opacity-100">Zakelijk</div>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Populair</h4>
            <div className="space-y-2 text-sm">
              <Link href="/products/rolgordijnen">
                <div className="opacity-90 hover:opacity-100">Rolgordijnen</div>
              </Link>
              <Link href="/products/overgordijnen">
                <div className="opacity-90 hover:opacity-100">Overgordijnen</div>
              </Link>
              <Link href="/gallerij">
                <div className="opacity-90 hover:opacity-100">Galerij</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center mb-6">
          <p className="text-sm mb-3">Volg ons</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.instagram.com/kanioubvbazilvernaald/"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="mailto:info@kaniou.be"
              className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/20 pt-6">
          <div className="grid grid-cols-2 gap-4 text-xs mb-4">
            <Link href="/privacy-policy">
              <div className="opacity-90 hover:opacity-100">Privacy</div>
            </Link>
            <Link href="/cookie-policy">
              <div className="opacity-90 hover:opacity-100">Cookies</div>
            </Link>
            <Link href="/terms-of-service">
              <div className="opacity-90 hover:opacity-100">Voorwaarden</div>
            </Link>
            <Link href="/disclaimer">
              <div className="opacity-90 hover:opacity-100">Disclaimer</div>
            </Link>
          </div>
          
          <div className="text-center text-xs opacity-75">
            © {currentYear} KANIOU zilvernaald. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MobileFooter;