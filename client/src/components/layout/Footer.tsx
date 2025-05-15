import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-xl font-medium mb-4">
              Elegant<span className="text-secondary">Drapes</span>
            </h3>
            <p className="font-body text-neutral-300 mb-6">
              Premium Gordijnen & Raambehandelingen
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@kaniou.be"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Producten</h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/products?category=curtains">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Gordijnen
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=blinds">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Jaloezieën
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=shades">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Rolgordijnen
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=drapes">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Overgordijnen
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Accessoires
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Maatwerk Oplossingen
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Ondersteuning
            </h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/about#measure-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Meetgids
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#installation-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Installatiegids
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#care-instructions">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Verzorgingsinstructies
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#return-policy">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Retourbeleid
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#warranty">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Garantie-informatie
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    Veelgestelde Vragen
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Abonneer op Onze Nieuwsbrief
            </h4>
            <p className="font-body text-neutral-300 mb-4">
              Abonneer voor ontwerptips en exclusieve aanbiedingen.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Schrijf hier uw e-mail"
                className="rounded-r-none text-black bg-white border-0"
              />
              <Button
                type="submit"
                className="rounded-l-none bg-secondary hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-body text-neutral-400 text-sm mb-4 md:mb-0">
              © {currentYear} KANIOU bvba ZILVERNAALD. Alle rechten voorbehouden.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Privacybeleid
                </div>
              </Link>
              <Link href="/terms-of-service">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Servicevoorwaarden
                </div>
              </Link>
              <Link href="/sitemap">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Sitemap
                </div>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
