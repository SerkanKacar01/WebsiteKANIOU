import PageLayout from "@/components/layout/PageLayout";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { CheckCircle, Clock, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const OffertePage = () => {
  return (
    <PageLayout
      title="Offerte Aanvragen"
      subtitle="Vrijblijvend"
      breadcrumbs={[{ label: "Offerte" }]}
      showCTA={false}
    >
      <section className="py-16 lg:py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-3xl rounded-3xl border border-white/20 shadow-2xl"></div>
              <Card className="relative bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D5B36A] via-[#E0C188] to-[#D5B36A]"></div>
                <CardContent className="p-12 md:p-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-3xl text-primary font-light mb-8 relative">
                      <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                        Start je offerte aanvraag hier
                      </span>
                      <div className="w-16 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] mt-3 rounded-full"></div>
                    </h2>
                    <QuoteForm />
                  </div>

                  <div className="bg-gradient-to-br from-[#F9F7F3] to-[#F5F2E8] p-8 rounded-2xl border border-[#D5B36A]/20 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D5B36A]/5 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                    <div className="relative">
                      <h3 className="font-display text-2xl text-primary font-semibold mb-6 relative">
                        <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                          Wat je mag verwachten na je aanvraag
                        </span>
                      </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start group hover:transform hover:scale-[1.02] transition-all duration-300">
                        <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full p-2 mt-1 mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-semibold text-primary mb-2">
                            Binnen 24 uur contact
                          </h4>
                          <p className="text-base text-text-light leading-relaxed">
                            Onze experts nemen binnen één werkdag contact met je
                            op
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start group hover:transform hover:scale-[1.02] transition-all duration-300">
                        <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full p-2 mt-1 mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-semibold text-primary mb-2">
                            Gratis adviesgesprek
                          </h4>
                          <p className="text-base text-text-light leading-relaxed">
                            Persoonlijk advies en inmeting bij jou thuis
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start group hover:transform hover:scale-[1.02] transition-all duration-300">
                        <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full p-2 mt-1 mr-4 flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-display text-lg font-semibold text-primary mb-2">
                            Maatwerk offerte
                          </h4>
                          <p className="text-base text-text-light leading-relaxed">
                            Volledig aangepaste offerte inclusief montage
                          </p>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-6 pt-6 border-t border-[#D5B36A]/20">
                      <h4 className="font-display text-xl font-semibold text-primary mb-4">
                        <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                          Direct contact opnemen?
                        </span>
                      </h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start border-[#D5B36A]/30 hover:border-[#D5B36A] hover:bg-[#D5B36A]/5 transition-all duration-300 group"
                          size="sm"
                        >
                          <Phone className="h-5 w-5 mr-3 text-[#D5B36A] group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">+32 467 85 64 05</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start border-[#D5B36A]/30 hover:border-[#D5B36A] hover:bg-[#D5B36A]/5 transition-all duration-300 group"
                          size="sm"
                        >
                          <Mail className="h-5 w-5 mr-3 text-[#D5B36A] group-hover:scale-110 transition-transform duration-300" />
                          <span className="font-medium">info@kaniou.be</span>
                        </Button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-20 bg-gradient-to-b from-white to-[#F9F7F3] relative overflow-hidden">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-br from-[#D5B36A]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#E0C188]/5 to-transparent rounded-full blur-3xl"></div>
        
        <Container className="relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full mb-6 shadow-xl">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h2 className="font-display text-3xl md:text-5xl text-primary font-light text-center mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                  Waarom kiezen voor KANIOU zilvernaald?
                </span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#D5B36A] to-[#E0C188] mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/20 to-[#E0C188]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#D5B36A]/20 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                      <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                        30+ jaar ervaring
                      </span>
                    </h3>
                    <p className="text-lg text-text-light leading-relaxed">
                      Ruime ervaring in maatwerk raamdecoratie voor particulieren en
                      bedrijven
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/20 to-[#E0C188]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#D5B36A]/20 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <Clock className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                      <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                        Levertijden van 3 tot 4 weken
                      </span>
                    </h3>
                    <p className="text-lg text-text-light leading-relaxed">
                      Korte levertijden en professionele montage door prof. monteur
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-center group hover:transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D5B36A]/20 to-[#E0C188]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-[#D5B36A]/20 rounded-3xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <div className="bg-gradient-to-br from-[#D5B36A] to-[#E0C188] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <Phone className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                      <span className="bg-gradient-to-r from-[#2C3E50] to-[#34495E] bg-clip-text text-transparent">
                        Persoonlijk advies
                      </span>
                    </h3>
                    <p className="text-lg text-text-light leading-relaxed">
                      Gratis adviesgesprek en inmeting bij jou thuis of op kantoor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </PageLayout>
  );
};

export default OffertePage;
