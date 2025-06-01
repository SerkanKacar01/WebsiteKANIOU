import { useLanguage } from "@/context/LanguageContext";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  Globe, 
  Package, 
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useState } from "react";
import DealerContactForm from "@/components/forms/DealerContactForm";

const BusinessPage = () => {
  const { language, t } = useLanguage();
  const [showDealerForm, setShowDealerForm] = useState(false);

  const content = {
    nl: {
      title: "Zakelijke Oplossingen & Partnerships",
      subtitle: "Professionele raamdecoratie voor bedrijven, projecten en dealers",
      heroDescription: "KANIOU biedt uitgebreide zakelijke diensten voor architecten, interieurdesigners, aannemers en retailpartners. Van grootschalige projecten tot exclusieve dealerschappen.",
      
      services: {
        title: "Onze Zakelijke Diensten",
        items: [
          {
            icon: Building2,
            title: "Projectoplossingen",
            description: "Grootschalige projecten voor kantoren, hotels, zorgcentra en woningbouw"
          },
          {
            icon: Users,
            title: "B2B Partnerships",
            description: "Samenwerking met architecten, interieurdesigners en aannemers"
          },
          {
            icon: TrendingUp,
            title: "Volume Pricing",
            description: "Aantrekkelijke prijsafspraken voor grote bestellingen"
          },
          {
            icon: Award,
            title: "Projectmanagement",
            description: "Dedicated projectbegeleiding van ontwerp tot installatie"
          }
        ]
      },
      
      dealer: {
        title: "Zakelijke Dealerschappen & Partners",
        description: "Bent u een interieurbedrijf, aannemer, winkel, studio of zelfstandige ondernemer die op zoek is naar kwalitatieve raamdecoratie-oplossingen voor uw klanten? KANIOU biedt professionelle ondersteuning, projectprijzen en exclusieve dealervoorwaarden.",
        button: "Vraag Meer Info Aan",
        benefits: [
          "Europa-brede verzending",
          "Volume prijsstelling",
          "Geen minimumorders",
          "Exclusieve territoriale partnerships",
          "Gebruik van eigen merk mogelijk",
          "Uitgebreide producttraining"
        ],
        faq: [
          {
            question: "Wat is vereist om dealer te worden?",
            answer: "Een bestaand bedrijf in de interieur- of bouwsector, ervaring met klanten en bereidheid tot producttraining."
          },
          {
            question: "Bieden jullie exclusieve regionale partnerships aan?",
            answer: "Ja, voor geselecteerde gebieden bieden wij exclusieve dealerschappen aan met territoriale bescherming."
          },
          {
            question: "Kunnen we ons eigen merk gebruiken?",
            answer: "Voor grote dealers is private labeling mogelijk onder bepaalde voorwaarden."
          }
        ]
      }
    },
    
    en: {
      title: "Business Solutions & Partnerships",
      subtitle: "Professional window treatments for businesses, projects and dealers",
      heroDescription: "KANIOU offers comprehensive business services for architects, interior designers, contractors and retail partners. From large-scale projects to exclusive dealerships.",
      
      services: {
        title: "Our Business Services",
        items: [
          {
            icon: Building2,
            title: "Project Solutions",
            description: "Large-scale projects for offices, hotels, care centers and residential developments"
          },
          {
            icon: Users,
            title: "B2B Partnerships",
            description: "Collaboration with architects, interior designers and contractors"
          },
          {
            icon: TrendingUp,
            title: "Volume Pricing",
            description: "Attractive pricing agreements for large orders"
          },
          {
            icon: Award,
            title: "Project Management",
            description: "Dedicated project support from design to installation"
          }
        ]
      },
      
      dealer: {
        title: "Dealer & Reseller Opportunities",
        description: "Are you an interior firm, contractor, retail store, studio, or self-employed professional looking for premium window covering solutions for your clients? KANIOU offers exclusive dealer programs, project-based pricing, and professional support.",
        button: "Request Information",
        benefits: [
          "Europe-wide shipping",
          "Volume pricing",
          "No minimums",
          "Exclusive regional partnerships",
          "Private label options",
          "Comprehensive product training"
        ],
        faq: [
          {
            question: "What is required to become a dealer?",
            answer: "An existing business in the interior or construction sector, customer experience and willingness to undergo product training."
          },
          {
            question: "Do you offer exclusive regional partnerships?",
            answer: "Yes, for selected areas we offer exclusive dealerships with territorial protection."
          },
          {
            question: "Can we use our own brand?",
            answer: "Private labeling is possible for large dealers under certain conditions."
          }
        ]
      }
    },
    
    fr: {
      title: "Solutions Business & Partenariats",
      subtitle: "Habillage de fenêtres professionnel pour entreprises, projets et revendeurs",
      heroDescription: "KANIOU offre des services business complets pour architectes, designers d'intérieur, entrepreneurs et partenaires de vente. Des projets à grande échelle aux concessions exclusives.",
      
      services: {
        title: "Nos Services Business",
        items: [
          {
            icon: Building2,
            title: "Solutions Projet",
            description: "Projets à grande échelle pour bureaux, hôtels, centres de soins et développements résidentiels"
          },
          {
            icon: Users,
            title: "Partenariats B2B",
            description: "Collaboration avec architectes, designers d'intérieur et entrepreneurs"
          },
          {
            icon: TrendingUp,
            title: "Tarification Volume",
            description: "Accords tarifaires attractifs pour les grandes commandes"
          },
          {
            icon: Award,
            title: "Gestion de Projet",
            description: "Support projet dédié du design à l'installation"
          }
        ]
      },
      
      dealer: {
        title: "Opportunités Revendeur & Distributeur",
        description: "Êtes-vous une entreprise d'intérieur, entrepreneur, magasin, studio ou professionnel indépendant à la recherche de solutions premium d'habillage de fenêtres pour vos clients? KANIOU offre des programmes de revendeur exclusifs, tarification projet et support professionnel.",
        button: "Demander Information",
        benefits: [
          "Expédition dans toute l'Europe",
          "Tarification volume",
          "Pas de minimums",
          "Partenariats régionaux exclusifs",
          "Options marque privée",
          "Formation produit complète"
        ],
        faq: [
          {
            question: "Qu'est-ce qui est requis pour devenir revendeur?",
            answer: "Une entreprise existante dans le secteur intérieur ou construction, expérience client et volonté de suivre une formation produit."
          },
          {
            question: "Offrez-vous des partenariats régionaux exclusifs?",
            answer: "Oui, pour des zones sélectionnées nous offrons des concessions exclusives avec protection territoriale."
          },
          {
            question: "Pouvons-nous utiliser notre propre marque?",
            answer: "La marque privée est possible pour les grands revendeurs sous certaines conditions."
          }
        ]
      }
    },
    
    de: {
      title: "Business-Lösungen & Partnerschaften",
      subtitle: "Professionelle Fensterbekleidung für Unternehmen, Projekte und Händler",
      heroDescription: "KANIOU bietet umfassende Business-Services für Architekten, Innenarchitekten, Auftragnehmer und Einzelhandelspartner. Von Großprojekten bis zu exklusiven Händlerschaften.",
      
      services: {
        title: "Unsere Business-Services",
        items: [
          {
            icon: Building2,
            title: "Projekt-Lösungen",
            description: "Großprojekte für Büros, Hotels, Pflegezentren und Wohnentwicklungen"
          },
          {
            icon: Users,
            title: "B2B-Partnerschaften",
            description: "Zusammenarbeit mit Architekten, Innenarchitekten und Auftragnehmern"
          },
          {
            icon: TrendingUp,
            title: "Mengen-Preise",
            description: "Attraktive Preisvereinbarungen für Großbestellungen"
          },
          {
            icon: Award,
            title: "Projektmanagement",
            description: "Dedizierte Projektunterstützung von Design bis Installation"
          }
        ]
      },
      
      dealer: {
        title: "Händler & Wiederverkäufer Möglichkeiten",
        description: "Sind Sie ein Einrichtungsunternehmen, Auftragnehmer, Einzelhandelsgeschäft, Studio oder selbständiger Profi auf der Suche nach Premium-Fensterbekleidungslösungen für Ihre Kunden? KANIOU bietet exklusive Händlerprogramme, projektbasierte Preise und professionelle Unterstützung.",
        button: "Information Anfordern",
        benefits: [
          "Europaweiter Versand",
          "Mengenpreise",
          "Keine Mindestmengen",
          "Exklusive regionale Partnerschaften",
          "Private Label Optionen",
          "Umfassende Produktschulung"
        ],
        faq: [
          {
            question: "Was ist erforderlich, um Händler zu werden?",
            answer: "Ein bestehendes Unternehmen im Einrichtungs- oder Bausektor, Kundenerfahrung und Bereitschaft zur Produktschulung."
          },
          {
            question: "Bieten Sie exklusive regionale Partnerschaften an?",
            answer: "Ja, für ausgewählte Gebiete bieten wir exklusive Händlerschaften mit territorialem Schutz an."
          },
          {
            question: "Können wir unsere eigene Marke verwenden?",
            answer: "Private Labeling ist für große Händler unter bestimmten Bedingungen möglich."
          }
        ]
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.nl;

  const scrollToDealerForm = () => {
    setShowDealerForm(true);
    setTimeout(() => {
      const element = document.getElementById('dealerform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <Helmet>
        <title>{currentContent.title} | KANIOU</title>
        <meta name="description" content={currentContent.heroDescription} />
        <meta property="og:title" content={currentContent.title} />
        <meta property="og:description" content={currentContent.heroDescription} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {currentContent.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {currentContent.subtitle}
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto text-blue-50">
              {currentContent.heroDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={scrollToDealerForm}
                className="bg-white text-blue-900 hover:bg-blue-50"
              >
                {currentContent.dealer.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contact
              </Button>
            </div>
          </div>
        </section>

        {/* Business Services Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {currentContent.services.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {currentContent.services.items.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Dealer Opportunities Section */}
        <section id="dealer-section" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                🔗 {currentContent.dealer.title}
              </h2>
              <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-8">
                {currentContent.dealer.description}
              </p>
              <Button 
                size="lg" 
                onClick={scrollToDealerForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                📝 {currentContent.dealer.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Benefits Icons */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {currentContent.dealer.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-center">
                    <div className="text-2xl mb-2">
                      {index === 0 && "🌍"}
                      {index === 1 && "📦"}
                      {index === 2 && "✅"}
                      {index === 3 && "🤝"}
                      {index === 4 && "🏷️"}
                      {index === 5 && "🎓"}
                    </div>
                    <p className="text-sm font-medium text-gray-800">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                Veelgestelde Vragen
              </h3>
              <div className="space-y-6">
                {currentContent.dealer.faq.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {item.question}
                    </h4>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        {showDealerForm && (
          <section id="dealerform" className="py-16 px-4 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
                Dealer Contact Form
              </h2>
              <DealerContactForm />
            </div>
          </section>
        )}

        {/* Contact Information */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <Mail className="h-6 w-6 mr-3" />
                <span>info@kaniou.be</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-6 w-6 mr-3" />
                <span>+32 (0)11 XX XX XX</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 mr-3" />
                <span>België</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessPage;