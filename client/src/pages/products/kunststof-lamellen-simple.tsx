import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon, ChevronRight } from "lucide-react";

const KunststofLamellenSimplePage = () => {
  return (
    <>
      <Helmet>
        <title>Kunststof lamellen - Praktische Kunststof Lamellen | Kaniou Zilvernaald</title>
        <meta
          name="description"
          content="Kunststof lamellen van Kaniou Zilvernaald - onderhoudsvriendelijke verticale lamellen voor kantoor en woonruimtes. Ontdek onze collectie."
        />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <Container>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <HomeIcon className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Producten</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink>Kunststof lamellen</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </div>

      {/* Hero Section */}
      <div className="bg-[#f9f7f3] py-20">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl text-[#2C3E50] font-semibold mb-6">
              Kunststof lamellen
            </h1>
            <div className="w-24 h-0.5 bg-[#D5B992] mx-auto mb-8"></div>
            <p className="font-body text-xl text-[#2C3E50] leading-relaxed">
              Meer informatie over dit product volgt binnenkort. Neem gerust contact met ons op voor specifieke vragen.
            </p>
          </div>
        </Container>
      </div>

      {/* Content Placeholder Section */}
      <div className="py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#f9f7f3] rounded-lg p-12 mb-12">
              <h2 className="font-display text-2xl text-[#2C3E50] font-semibold mb-6">
                Binnenkort beschikbaar
              </h2>
              <p className="font-body text-[#2C3E50] leading-relaxed mb-8">
                We werken hard aan het toevoegen van gedetailleerde informatie over onze kunststof lamellen collectie. 
                Onze specialisten staan klaar om u persoonlijk te adviseren over de mogelijkheden.
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-[#2C3E50] font-semibold mb-6">
                Interesse in kunststof lamellen?
              </h3>
              <p className="font-body text-lg text-[#2C3E50] leading-relaxed mb-8">
                Vraag vrijblijvend een offerte aan of neem contact met ons op voor persoonlijk advies.
              </p>
              <Link href="/offerte">
                <Button
                  size="lg"
                  className="bg-[#D5B992] hover:bg-[#C4A882] text-white px-8 py-4 text-lg font-medium rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Vrijblijvend offerte aanvragen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default KunststofLamellenSimplePage;