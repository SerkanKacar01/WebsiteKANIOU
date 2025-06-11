import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProductsPage = () => {
  const { t } = useLanguage();

  const flyScreenProducts = [
    {
      id: 1,
      name: "Standard Fly Screen",
      description: "Perfect fit for PVC or aluminum windows. Installed without drilling.",
      price: "€29.95",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      alt: "Standard Fly Screen"
    },
    {
      id: 2,
      name: "Magnetic Fly Screen",
      description: "Simple magnetic attachment. Reliable and easy to remove.",
      price: "€39.95",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop",
      alt: "Magnetic Fly Screen"
    },
    {
      id: 3,
      name: "Luxury Fly Screen",
      description: "Sleek design with ultra-thin frame. Premium powder-coated aluminum.",
      price: "€49.95",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&h=300&fit=crop",
      alt: "Luxury Fly Screen"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Container>
        <>
          {/* Shop Header */}
          <section className="text-center py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Our Premium Fly Screens
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              High-quality clamp-mounted solutions, made to fit perfectly on your windows.
            </p>
          </section>

          {/* Product Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10">
            {flyScreenProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#D9C29C] hover:bg-[#D9C29C]/90 text-white font-semibold py-3"
                    size="lg"
                  >
                    Buy Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </>
      </Container>
    </div>
  );
};

export default ProductsPage;