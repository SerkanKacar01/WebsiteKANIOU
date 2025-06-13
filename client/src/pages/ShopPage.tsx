import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Star, Award, Truck, Users, Target } from "lucide-react";
import { Link } from "wouter";

const ShopPage = () => {
  const { t } = useLanguage();

  // Featured product types - JALOEZIEËN only as per instructions
  const productTypes = [
    {
      id: 1,
      name: "Houten jaloezieën",
      description: "Warmte & elegantie in echt hout",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop&crop=center",
      link: "/products?category=houten-jaloezien"
    },
    {
      id: 2,
      name: "Kunststof jaloezieën", 
      description: "Betaalbare kwaliteit en vochtbestendig",
      image: "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=500&h=400&fit=crop&crop=center",
      link: "/products?category=kunststof-jaloezien"
    },
    {
      id: 3,
      name: "Aluminium jaloezieën",
      description: "Strak design voor elke ruimte", 
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center",
      link: "/products?category=aluminium-jaloezien"
    }
  ];

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Helmet>
        <title>KANIOU - Jaloezieën op maat | Premium raamdecoratie</title>
        <meta 
          name="description" 
          content="Vind de perfecte raamdecoratie voor jouw woning. Jaloezieën op maat in hout, kunststof en aluminium. 30+ jaar ervaring, advies aan huis." 
        />
        <meta property="og:title" content="KANIOU - Jaloezieën op maat | Premium raamdecoratie" />
        <meta property="og:description" content="Jaloezieën op maat – stijlvol, functioneel en betaalbaar" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&crop=center')"
        }}
      >
        <Container>
          <div className="text-center max-w-4xl mx-auto text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vind de perfecte raamdecoratie voor jouw woning
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Jaloezieën op maat – stijlvol, functioneel en betaalbaar
            </p>
            <Button 
              onClick={scrollToProducts}
              className="bg-[#B88C4B] hover:bg-[#A67C3B] text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Bekijk onze jaloezieën
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Product Types Section */}
      <section id="featured-products" className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Onze Jaloezieën
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kies uit onze hoogwaardige collectie jaloezieën voor elke ruimte en stijl
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productTypes.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  <Link href={product.link}>
                    <Button 
                      className="bg-[#B88C4B] hover:bg-[#A67C3B] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 w-full"
                    >
                      Bekijk meer
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#F5F5F5]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Waarom kiezen voor KANIOU?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#B88C4B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">30+ jaar ervaring</h3>
              <p className="text-gray-600">Decennia van expertise in raamdecoratie</p>
            </div>

            <div className="text-center">
              <div className="bg-[#B88C4B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advies aan huis</h3>
              <p className="text-gray-600">Persoonlijk advies bij u thuis</p>
            </div>

            <div className="text-center">
              <div className="bg-[#B88C4B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Op maat gemaakt</h3>
              <p className="text-gray-600">Elke jaloezie perfect op maat</p>
            </div>

            <div className="text-center">
              <div className="bg-[#B88C4B] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scherpe prijzen</h3>
              <p className="text-gray-600">Beste kwaliteit voor de beste prijs</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust + CTA Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Customer Reviews */}
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 italic">
                    "Uitstekende service en prachtige jaloezieën. Het advies aan huis was zeer professioneel."
                  </p>
                  <p className="font-semibold text-gray-900">- Familie van der Berg</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-4 italic">
                    "Perfecte pasvorm en snelle levering. Zeer tevreden met de kwaliteit en prijs."
                  </p>
                  <p className="font-semibold text-gray-900">- M. Janssen</p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Klaar voor uw nieuwe jaloezieën?
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                Ontvang vandaag nog een vrijblijvende offerte op maat
              </p>
              <Link href="/offerte">
                <Button 
                  className="bg-[#B88C4B] hover:bg-[#A67C3B] text-white font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Vraag direct een offerte aan
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ShopPage;