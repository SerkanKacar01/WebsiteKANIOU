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
              Transform your space with premium window treatments crafted for
              style and functionality.
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
                href="mailto:info@elegantdrapes.com"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Products</h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/products?category=curtains">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Curtains
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=blinds">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Blinds
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=shades">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Shades
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=drapes">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Drapes
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Accessories
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Custom Solutions
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Customer Service
            </h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/about#measure-guide">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Measure Guide
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about#installation-guide">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Installation Guide
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about#care-instructions">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Care Instructions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about#return-policy">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Return Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about#warranty">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    Warranty Info
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <a className="text-neutral-300 hover:text-secondary transition-colors">
                    FAQs
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              Newsletter
            </h4>
            <p className="font-body text-neutral-300 mb-4">
              Subscribe for design tips and exclusive offers.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
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
              &copy; {currentYear} ElegantDrapes. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <a className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms-of-service">
                <a className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </Link>
              <Link href="/sitemap">
                <a className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors">
                  Sitemap
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
