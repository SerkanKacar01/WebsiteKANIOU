import { Link } from "wouter";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CookieSettings } from "@/components/CookieSettings";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-white pt-8 md:pt-16 pb-8">
      <Container className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center md:text-left">
            <h3 className="font-display text-lg md:text-xl font-medium mb-4">
              {t("KANIOU").split(" ")[0]}
              <span className="text-secondary">
                {t("zilvernaald").split(" ")[1] || "zilvernaald"}
              </span>
            </h3>
            <p className="font-body text-white mb-6 text-[14px] md:text-base">
              {t("PREMIUM | Gordijnen & Zonweringen")}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.instagram.com/kanioubvbazilvernaald/"
                className="text-white hover:text-secondary transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@kaniou.be"
                className="text-white hover:text-secondary transition-colors p-2 min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display text-[16px] md:text-lg font-medium mb-4">
              {t("Producten")}
            </h4>
            <ul className="font-body space-y-2 text-[14px] md:text-base">
              <li>
                <Link href="/products/fly-screens">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Fly Screens")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Request Quote")}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display text-[16px] md:text-lg font-medium mb-4">
              {t("Klantenserice")}
            </h4>
            <ul className="font-body space-y-2 text-[14px] md:text-base">
              <li>
                <Link href="/about#measure-guide">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Meet instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#installation-guide">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Installatie instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#care-instructions">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Onderhouds instructies")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#return-policy">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Retour beleid")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#warranty">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Garantie voorwaarden")}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <div className="text-white hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center justify-center md:justify-start">
                    {t("Veelgestelde vragen")}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-display text-[16px] md:text-lg font-medium mb-4">
              {t("Nieuwsbrief")}
            </h4>
            <p className="font-body text-white mb-4 text-[14px] md:text-base max-w-[90%] mx-auto md:mx-0">
              {t(
                "Blijf op de hoogte van nieuwe collecties, aanbiedingen en inspiratie voor uw interieur.",
              )}
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-0" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t("E-mail")}
                className="sm:rounded-r-none text-black bg-white border-0 min-h-[44px] text-[14px] md:text-base"
              />
              <Button
                type="submit"
                className="sm:rounded-l-none bg-secondary hover:bg-accent min-h-[44px] text-[14px] md:text-base"
              >
                <Mail className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 md:pt-8">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-0 md:flex-row md:justify-between md:text-left">
            <p className="font-body text-white text-[12px] md:text-sm">
              {t(
                "© 2025 KANIOU zilvernaald – Alle rechten voorbehouden.",
              ).replace("{year}", currentYear.toString())}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              <Link href="/privacy-policy">
                <div className="font-body text-white text-[12px] md:text-sm hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center">
                  Privacy Policy
                </div>
              </Link>
              <Link href="/cookie-policy">
                <div className="font-body text-white text-[12px] md:text-sm hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center">
                  Cookie Policy
                </div>
              </Link>
              <Link href="/cookie-preferences">
                <div className="font-body text-white text-[12px] md:text-sm hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center">
                  Cookies beheren
                </div>
              </Link>
              <Link href="/terms-of-service">
                <div className="font-body text-white text-[12px] md:text-sm hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center">
                  Terms
                </div>
              </Link>
              <Link href="/disclaimer">
                <div className="font-body text-white text-[12px] md:text-sm hover:text-secondary transition-colors cursor-pointer min-h-[40px] flex items-center">
                  Disclaimer
                </div>
              </Link>
              <CookieSettings />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
