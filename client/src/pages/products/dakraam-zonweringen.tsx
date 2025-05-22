import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";

const DakraamZonweringenPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Dakraam Zonweringen - Made to Measure | KANIOU Zilvernaald</title>
        <meta name="description" content="Discover our made-to-measure Dakraam Zonweringen for Fakro and Velux windows, available in various styles and colors. Professional skylight shading solutions." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                  Dakraam Zonweringen
                </h1>
                <p className="text-lg text-text-light max-w-2xl mx-auto">
                  Discover our made-to-measure Dakraam Zonweringen for Fakro and Velux windows, available in various styles and colors. 
                  Professional skylight shading solutions for optimal comfort.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-text-dark">Features & Benefits</h2>
                  <ul className="space-y-3 text-text-light">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Compatible with Fakro and Velux windows
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Effective heat and glare reduction
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Easy operation mechanisms
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Professional installation service
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-xl font-semibold text-text-dark mb-4">Get Your Custom Quote</h3>
                  <p className="text-text-light mb-6">
                    Ready to improve comfort with Dakraam Zonweringen? 
                    Get a personalized quote tailored to your skylight needs.
                  </p>
                  <Link href="/quote">
                    <Button className="w-full bg-secondary hover:bg-accent">
                      Request Free Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DakraamZonweringenPage;