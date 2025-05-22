import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-xl font-medium mb-4">
              {t("KANIOU").split(" ")[0]}
              <span className="text-secondary">
                {t("zilvernaald").split(" ")[1] || "zilvernaald"}
              </span>
            </h3>
            <p className="font-body text-neutral-300 mb-6">
              {t("PREMIUM | Gordijnen & Zonweringen")}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/kanioubvbazilvernaald/"
                className="text-white hover:text-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
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
            <h4 className="font-display text-lg font-medium mb-4">
              {t("Producten")}
            </h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/products?category=curtains">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Gordijnen")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=blinds">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Zonweringen")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=shades">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Vouwgordijnen")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=drapes">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("SQUID")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Gordijnrails")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Gordijnroedes")}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              {t("Klantenserice")}
            </h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/about#measure-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Meet instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#installation-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Installatie instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#care-instructions">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Onderhouds instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#return-policy">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Retour beleid")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#warranty">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Garantie voorwaarden")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t("Veelgestelde vragen")}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              {t("Nieuwsbrief")}
            </h4>
            <p className="font-body text-neutral-300 mb-4">
              {t(
                "Blijf op de hoogte van nieuwe collecties, aanbiedingen en inspiratie voor uw interieur.",
              )}
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("E-mail")}
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
              {t(
                "© 2025 KANIOU zilvernaald – Alle rechten voorbehouden.",
              ).replace("{year}", currentYear.toString())}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Privacy Policy
                </div>
              </Link>
              <Link href="/cookie-policy">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Cookie Policy
                </div>
              </Link>
              <Link href="/terms-of-service">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Terms
                </div>
              </Link>
              <Link href="/disclaimer">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  Disclaimer
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
