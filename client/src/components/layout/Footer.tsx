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
              {t('app.title').split(' ')[0]}<span className="text-secondary">{t('app.title').split(' ')[1] || 'Drapes'}</span>
            </h3>
            <p className="font-body text-neutral-300 mb-6">
              {t('hero.subtitle')}
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
            <h4 className="font-display text-lg font-medium mb-4">{t('products')}</h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/products?category=curtains">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('curtains')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=blinds">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('blinds')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=shades">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('shades')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=drapes">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('drapes')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('accessories')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/quote">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('customSolutions')}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              {t('support')}
            </h4>
            <ul className="font-body space-y-2">
              <li>
                <Link href="/about#measure-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('measureGuide')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#installation-guide">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('installationGuide')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#care-instructions">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('careInstructions')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#return-policy">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('returnPolicy')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#warranty">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('warranty')}
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about#faq">
                  <div className="text-neutral-300 hover:text-secondary transition-colors cursor-pointer">
                    {t('faq')}
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">
              {t('newsletter')}
            </h4>
            <p className="font-body text-neutral-300 mb-4">
              {t('newsletterDescription')}
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder={t('emailPlaceholder')}
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
              {t('copyright').replace('{year}', currentYear.toString())}
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  {t('privacy')}
                </div>
              </Link>
              <Link href="/terms-of-service">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  {t('terms')}
                </div>
              </Link>
              <Link href="/sitemap">
                <div className="font-body text-neutral-400 text-sm hover:text-secondary transition-colors cursor-pointer">
                  {t('sitemap')}
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
