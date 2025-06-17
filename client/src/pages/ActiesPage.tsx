import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Tag, CheckCircle, Shield } from "lucide-react";
import { Link } from "wouter";

const ActiesPage = () => {
  const promotion = {
    id: 1,
    title: "20% Korting op Alle Horren",
    description: "Geniet van 20% korting op onze volledige horren collectie. Perfecte pasvorm, optimale bescherming en frisse lucht — nu voordeliger dan ooit.",
    category: "Horren",
    badge: "Je bespaart 20%",
    discount: "20% korting",
    validUntil: "Geldig tot 31 juli 2025",
    ctaText: "Profiteer nu →",
    ctaLink: "/producten/horren"
  };

  const scrollToPromotion = () => {
    document.getElementById('promotion-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <Helmet>
        <title>Acties & Aanbiedingen | KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Profiteer nu van exclusieve kortingen op premium raamdecoratie. Op = Op. Bekijk onze huidige acties en aanbiedingen."
        />
      </Helmet>

      {/* Full-width Hero Banner */}
      <div 
        className="relative min-h-[70vh] bg-gradient-to-br from-neutral-800 via-neutral-700 to-neutral-600 flex items-center overflow-hidden"
      >
        {/* Elegant background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
        
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl md:text-6xl text-white font-bold mb-6 leading-tight">
              Acties & Aanbiedingen
            </h1>
            <p className="font-body text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Profiteer nu van exclusieve kortingen op premium raamdecoratie. Op = Op.
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-4 text-lg"
              onClick={scrollToPromotion}
            >
              Bekijk onze actie
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </Container>
      </div>



      {/* Single Promotion Section */}
      <section id="promotion-section" className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card 
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0"
            >
              {/* Badge */}
              <div className="absolute top-6 left-6 z-10">
                <Badge className="bg-secondary text-white font-medium px-3 py-1">
                  <Tag className="h-3 w-3 mr-1" />
                  {promotion.badge}
                </Badge>
              </div>
              
              {/* Discount Badge */}
              <div className="absolute top-6 right-6 z-10">
                <Badge className="bg-red-500 text-white font-bold px-3 py-1">
                  {promotion.discount}
                </Badge>
              </div>
              
              <CardHeader className="pb-4 pt-16">
                <Badge variant="outline" className="mb-3 w-fit">{promotion.category}</Badge>
                <CardTitle className="text-3xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                  {promotion.title}
                </CardTitle>
                <p className="text-text-light text-lg leading-relaxed mb-4">{promotion.description}</p>
                <div className="flex items-center text-sm text-text-light mb-2">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  {promotion.validUntil}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex justify-end">
                  <Link href={promotion.ctaLink}>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white font-medium px-8 py-4 text-lg">
                      {promotion.ctaText}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>


        </Container>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-12">
                <div className="bg-secondary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
                  <Shield className="h-10 w-10 text-secondary" />
                </div>
                
                <div className="prose prose-lg max-w-none text-center">
                  <p className="text-lg text-text-light leading-relaxed mb-6">
                    At KANIOU Zilvernaald, we believe in offering premium quality at accessible prices. That's why we're giving a limited-time 20% discount on all insect screens – including inset, surface-mounted, and plissé door screens.
                  </p>
                  
                  <p className="text-lg text-text-light leading-relaxed mb-6">
                    This promotion helps customers protect their homes from insects while enjoying fresh air. All screens are custom-made, with a wide range of colors, finishes, and mounting options.
                  </p>
                  
                  <p className="text-lg text-text-light leading-relaxed mb-6">
                    The offer is available to both residential and commercial clients. Installation is available on request, and professional on-site measuring is included in the region.
                  </p>
                  
                  <p className="text-lg font-semibold text-primary mb-6">
                    🕒 Valid until 31 July 2025.
                  </p>
                  
                  <p className="text-lg text-text-light leading-relaxed">
                    For more information, customers can reach out by phone or use the contact page.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ActiesPage;