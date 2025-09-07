import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight, Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductDetailTemplateProps {
  productName: string;
  productDescription: string;
  imageUrl: string;
  startingPrice: number;
  priceUnit: string; // "per window" or "per m²"
  features: string[];
  categoryName?: string;
  categoryPath?: string;
  // Second price block (optional)
  secondPrice?: number;
  secondPriceUnit?: string;
}

const ProductDetailTemplate = ({
  productName,
  productDescription,
  imageUrl,
  startingPrice,
  priceUnit,
  features,
  categoryName,
  categoryPath,
  secondPrice,
  secondPriceUnit,
}: ProductDetailTemplateProps) => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{productName} | Elegant Drapes</title>
        <meta
          name="description"
          content={`${productName} - ${productDescription} Starting at €${startingPrice.toFixed(2)} ${priceUnit} (incl. made-to-measure)`}
        />
        <meta property="og:title" content={`${productName} | Elegant Drapes`} />
        <meta
          property="og:description"
          content={`${productName} - ${productDescription} Starting at €${startingPrice.toFixed(2)} ${priceUnit} (incl. made-to-measure)`}
        />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">
                    <HomeIcon className="h-4 w-4" />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/products">Producten</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {categoryName && categoryPath && (
                <>
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/products/${categoryPath}`}>
                        {categoryName}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span className="font-medium">{productName}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden shadow-md">
            <img
              src={imageUrl}
              alt={productName}
              className="w-full h-auto object-cover aspect-[4/3]"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-3">
              {productName}
            </h1>

            {/* Price Display - Bold and Prominent */}
            <div className="bg-neutral-100 p-4 rounded-lg mb-6">
              <p className="font-body text-2xl">
                <span className="font-bold text-accent">
                  Begint vanaf €{startingPrice.toFixed(2)}
                </span>
                <span className="text-text-medium ml-2 text-base">
                  {priceUnit} (incl. Gemaakt volgens exacte specificaties)
                </span>
              </p>
            </div>
            
            {/* Second Price Display - Independent */}
            {secondPrice && secondPriceUnit && (
              <div className="bg-neutral-100 p-4 rounded-lg mb-6">
                <p className="font-body text-2xl">
                  <span className="font-bold text-accent">
                    Begint vanaf €{secondPrice.toFixed(2)}
                  </span>
                  <span className="text-text-medium ml-2 text-base">
                    {secondPriceUnit} (incl. Gemaakt volgens exacte specificaties)
                  </span>
                </p>
              </div>
            )}

            {/* Short Description */}
            <p className="text-text-medium mb-6">{productDescription}</p>

            {/* Key Features List */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-medium mb-4">
                Key Features
              </h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link href="/quote">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white"
                >
                  Vraag vrijblijvend een offerte aan
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Neem contact met ons op voor meer informatie
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Optional FAQ Section */}
        <div className="mt-16 border-t pt-12">
          <h2 className="font-display text-2xl text-primary font-semibold mb-8">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-display text-lg font-medium mb-2">
                Kan ik kleuren en materialen aanpassen?
              </h3>
              <p className="text-text-medium">
                Ja, al onze producten, waaronder SQUID®, zijn volledig op maat
                verkrijgbaar. U kunt kiezen uit diverse kleuren en afwerkingen
                die perfect aansluiten bij uw interieurstijl. Onze collectie
                biedt een breed scala aan mogelijkheden voor zowel moderne als
                klassieke interieurs.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-display text-lg font-medium mb-2">
                Hoe lang duurt de installatie?
              </h3>
              <p className="text-text-medium">
                De installatie neemt doorgaans 1 tot 2 uur per raam in beslag,
                afhankelijk van de afmetingen en complexiteit van de toepassing.
                Onze professionele plaatsers zorgen voor een naadloze afwerking
                met minimale overlast.
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-display text-lg font-medium mb-2">
                Is er garantie op dit product?
              </h3>
              <p className="text-text-medium">
                Ja, op de geselecteerde SQUID®-collectie geldt een garantie van{" "}
                <strong>5 jaar.</strong> Deze dekt fabricagefouten en
                mechanische gebreken bij normaal gebruik.
                <br />
              </p>
            </div>

            <div className="bg-neutral-50 p-6 rounded-lg">
              <h3 className="font-display text-lg font-medium mb-2">
                Hoe onderhoud en reinig ik SQUID®?
              </h3>
              <p className="text-text-medium">
                SQUID® is eenvoudig te onderhouden. U kunt het oppervlak
                reinigen met een licht vochtige doek zonder schoonmaakmiddel.
                Vermijd agressieve reinigingsmiddelen of schurende materialen.
                Bij installatie ontvangt u van ons een gedetailleerde
                onderhoudsinstructie.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetailTemplate;
