import Container from "@/components/ui/container";
import PageLayout from "@/components/layout/PageLayout";
import { Camera, ExternalLink, Heart, Image, Star, Eye } from "lucide-react";

const GalleryPage = () => {
  return (
    <PageLayout
      title="Onze Realisaties"
      subtitle="Premium Galerij"
      description="Ontdek onze mooiste projecten en laat u inspireren door de oneindige mogelijkheden van premium raambekleding op maat."
      metaDescription="Bekijk onze realisaties op Instagram. Premium raamdecoratie op maat door KANIOU Zilvernaald."
      breadcrumbs={[{ label: "Galerij" }]}
      showCTA={true}
    >
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-2xl mb-8 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>

            <h2
              className="text-3xl md:text-4xl font-light text-[#2C3E50] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Volg ons op Instagram
            </h2>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C4A36C] to-transparent mx-auto mb-8" />

            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Al onze realisaties, projecten en inspiratie delen wij via ons Instagram-account.
              Bekijk op uw gemak onze volledige portfolio met honderden foto's van afgewerkte projecten.
            </p>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Van overgordijnen en rolgordijnen tot shutters en screens &mdash; ontdek wat wij voor uw interieur kunnen betekenen.
            </p>

            <a
              href="https://www.instagram.com/kanioubvbazilvernaald/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white text-sm font-medium tracking-[0.15em] uppercase rounded-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Bekijk onze Instagram
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>

            <p className="text-gray-400 text-sm mt-6">
              @kanioubvbazilvernaald
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2C3E50]/5 rounded-xl mb-5">
                <Image className="w-7 h-7 text-[#2C3E50]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">500+ Foto's</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Uitgebreide collectie van afgewerkte projecten en realisaties
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2C3E50]/5 rounded-xl mb-5">
                <Eye className="w-7 h-7 text-[#2C3E50]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Dagelijks Nieuw</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Regelmatig nieuwe projecten en inspiratie voor uw interieur
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2C3E50]/5 rounded-xl mb-5">
                <Heart className="w-7 h-7 text-[#2C3E50]" />
              </div>
              <h3 className="text-lg font-semibold text-[#2C3E50] mb-2">Echte Projecten</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Authentieke foto's van realisaties bij klanten thuis
              </p>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default GalleryPage;
