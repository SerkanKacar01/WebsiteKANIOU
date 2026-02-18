import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { ChevronRight, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  description?: string;
  metaDescription?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
  showCTA?: boolean;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

const PageLayout = ({
  title,
  subtitle,
  description,
  metaDescription,
  breadcrumbs = [],
  children,
  showCTA = true,
  ctaTitle = "Vrijblijvend advies nodig?",
  ctaDescription = "Onze specialisten helpen u graag met persoonlijk advies op maat. Neem contact op of vraag direct een offerte aan.",
  ctaPrimaryLabel = "Offerte Aanvragen",
  ctaPrimaryHref = "/offerte",
  ctaSecondaryLabel = "Neem Contact Op",
  ctaSecondaryHref = "/contact",
}: PageLayoutProps) => {
  const [, setLocation] = useLocation();

  return (
    <>
      <Helmet>
        <title>{title} | KANIOU Zilvernaald</title>
        <meta name="description" content={metaDescription || description || subtitle || title} />
        <meta property="og:title" content={`${title} | KANIOU Zilvernaald`} />
        <meta property="og:description" content={metaDescription || description || subtitle || title} />
      </Helmet>

      {/* Hero Banner */}
      <section className="relative bg-[#2C3E50] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50] via-[#34495e] to-[#2C3E50]"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <Container className="relative z-10 py-16 lg:py-20">
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 text-white/50 text-[13px] tracking-wide mb-8">
              <button onClick={() => setLocation("/")} className="hover:text-white/80 transition-colors">
                Home
              </button>
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5" />
                  {crumb.href ? (
                    <button onClick={() => setLocation(crumb.href!)} className="hover:text-white/80 transition-colors">
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-[#C4A36C]">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <div className="max-w-3xl">
            {subtitle && (
              <span className="inline-block text-[#C4A36C] text-[13px] font-medium tracking-[0.2em] uppercase mb-4">
                {subtitle}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-white/70 leading-relaxed max-w-2xl">
                {description}
              </p>
            )}
            <div className="w-16 h-0.5 bg-[#C4A36C] mt-6"></div>
          </div>
        </Container>
      </section>

      {/* Page Content */}
      <div className="bg-[#FAFAF8]">
        {children}
      </div>

      {/* CTA Section */}
      {showCTA && (
        <section className="bg-[#2C3E50] py-16 lg:py-20">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                {ctaTitle}
              </h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                {ctaDescription}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setLocation(ctaPrimaryHref!)}
                  className="px-8 py-3.5 bg-[#C4A36C] text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-[#b08f56] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {ctaPrimaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLocation(ctaSecondaryHref!)}
                  className="px-8 py-3.5 border border-white/30 text-white text-[13px] font-medium tracking-[0.15em] uppercase hover:bg-white/10 transition-all duration-300"
                >
                  {ctaSecondaryLabel}
                </button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default PageLayout;
