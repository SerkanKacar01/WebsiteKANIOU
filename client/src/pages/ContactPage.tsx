import Container from "@/components/ui/container";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Crown, 
  Star, 
  Award,
  Shield,
  ArrowRight,
  Calendar,
  MessageCircle
} from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import PageLayout from "@/components/layout/PageLayout";

const ContactPage = () => {
  return (
    <PageLayout
      title="Neem Contact Op"
      subtitle="Persoonlijke Service"
      description="Ervaar persoonlijke service op het hoogste niveau. Ons team van interieurspecialisten staat voor u klaar."
      metaDescription="Neem contact op met KANIOU Zilvernaald voor premium maatwerk raamdecoratie. Professioneel advies, luxe showroom, en persoonlijke service voor uw interieur."
      breadcrumbs={[{ label: "Contact" }]}
      showCTA={false}
    >
      <section className="py-16 lg:py-20 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <MessageCircle className="w-6 h-6 text-[#C8A85B]" />
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl text-[#2C3E50] font-black mb-6 tracking-tight leading-tight">
              Neem <span className="bg-gradient-to-r from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] bg-clip-text text-transparent">contact</span> op
            </h2>
            
            <p className="text-xl text-[#2C3E50]/70 font-light leading-relaxed max-w-3xl mx-auto">
              Ons deskundige team staat klaar om u te voorzien van het beste advies voor uw raamdecoratie
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] p-6 rounded-2xl inline-flex mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <MapPin className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                    Bezoek onze luxe showroom
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-6 group-hover:w-20 transition-all duration-500"></div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="font-body text-lg text-[#2C3E50] font-medium">Pauwengraaf 66</p>
                    <p className="font-body text-lg text-[#2C3E50] font-medium">3630 Maasmechelen, België</p>
                  </div>
                  
                  <div className="border-t border-[#C8A85B]/20 pt-6">
                    <div className="flex items-center justify-center mb-3">
                      <Clock className="text-[#C8A85B] h-5 w-5 mr-2" />
                      <span className="font-display font-semibold text-[#2C3E50]">Openingstijden</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-body text-[#2C3E50]/80">Ma - Za: 10:00 - 18:00</p>
                      <p className="font-body text-[#2C3E50]/80">Zondag: Gesloten</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] p-6 rounded-2xl inline-flex mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Phone className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                    Bel ons direct
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-6 group-hover:w-20 transition-all duration-500"></div>
                  
                  <div className="mb-6">
                    <a
                      href="tel:+32467856405"
                      className="font-display text-2xl text-[#C8A85B] font-bold hover:text-[#D4AF37] transition-colors group-hover:scale-110 inline-block transform transition-transform"
                    >
                      +32 467 85 64 05
                    </a>
                  </div>
                  
                  <div className="border-t border-[#C8A85B]/20 pt-6">
                    <div className="flex items-center justify-center mb-3">
                      <Clock className="text-[#C8A85B] h-5 w-5 mr-2" />
                      <span className="font-display font-semibold text-[#2C3E50]">Bereikbaarheid</span>
                    </div>
                    <div className="space-y-1">
                      <p className="font-body text-[#2C3E50]/80">Ma - Za: 10:00 - 18:00</p>
                      <p className="font-body text-[#2C3E50]/80">Zondag: Gesloten</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#C8A85B]/10 hover:border-[#C8A85B]/30 group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/5 via-transparent to-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 text-center">
                  <div className="bg-gradient-to-br from-[#C8A85B] via-[#D4AF37] to-[#C8A85B] p-6 rounded-2xl inline-flex mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Mail className="text-white w-8 h-8" />
                  </div>
                  
                  <h3 className="font-display text-2xl text-[#2C3E50] font-black mb-4 tracking-tight group-hover:text-[#C8A85B] transition-colors">
                    Stuur ons een e-mail
                  </h3>
                  
                  <div className="w-16 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-6 group-hover:w-20 transition-all duration-500"></div>
                  
                  <div className="mb-6">
                    <a
                      href="mailto:info@kaniou.be"
                      className="font-display text-xl text-[#C8A85B] font-bold hover:text-[#D4AF37] transition-colors group-hover:scale-110 inline-block transform transition-transform"
                    >
                      info@kaniou.be
                    </a>
                  </div>
                  
                  <div className="border-t border-[#C8A85B]/20 pt-6">
                    <div className="flex items-center justify-center mb-3">
                      <Shield className="text-[#C8A85B] h-5 w-5 mr-2" />
                      <span className="font-display font-semibold text-[#2C3E50]">Responstijd</span>
                    </div>
                    <p className="font-body text-[#2C3E50]/80">Binnen 24 uur op werkdagen</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-[#C8A85B]/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8A85B]/3 via-transparent to-[#D4AF37]/3"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C8A85B]"></div>
                    <MessageCircle className="w-5 h-5 text-[#C8A85B]" />
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#C8A85B] to-transparent"></div>
                  </div>
                  <h2 className="font-display text-3xl text-[#2C3E50] font-black mb-4 tracking-tight">
                    Stuur ons een <span className="text-[#C8A85B]">bericht</span>
                  </h2>
                  <p className="text-[#2C3E50]/70 font-light">Onze experts nemen binnen 24 uur contact met u op</p>
                </div>
                <ContactForm />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#C8A85B]/10 overflow-hidden relative">
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold text-sm">KANIOU Showroom</span>
                  </div>
                </div>
              </div>
              
              <div className="h-full w-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.5554716862737!2d5.691408300000001!3d50.9886857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0c5d2ad242f0f%3A0x1d9efc14cec41751!2sKANIOU%20bvba%20ZILVERNAALD!5e0!3m2!1sen!2sbe!4v1683924568227!5m2!1sen!2sbe"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="KANIOU zilvernaald premium showroom locatie"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2C3E50] via-[#1a2332] to-[#2C3E50] rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#C8A85B]/10 via-transparent to-[#D4AF37]/10"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 mb-8">
                  <Crown className="w-6 h-6 text-[#C8A85B]" />
                </div>
                
                <h2 className="font-display text-3xl md:text-5xl text-white font-black mb-6 tracking-tight">
                  Premium adviesgesprek
                </h2>
                
                <p className="text-white/70 text-xl font-light max-w-3xl mx-auto leading-relaxed">
                  Ontvang deskundig advies van onze interieurspecialisten en transformeer uw woning met onze premium raamdecoratie
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#C8A85B]/30 transition-all duration-500 group hover:-translate-y-2">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-display text-xl text-white font-bold mb-4 tracking-tight">
                      Advies aan huis
                    </h3>
                    
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4"></div>
                    
                    <p className="font-body text-white/80 leading-relaxed mb-8">
                      Persoonlijk bezoek voor nauwkeurige opmetingen en advies op maat van uw interieur
                    </p>
                    
                    <a
                      href="/quote"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-6 py-3 rounded-full font-bold transition-all duration-500 hover:shadow-2xl hover:scale-105"
                    >
                      Afspraak maken
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#C8A85B]/30 transition-all duration-500 group hover:-translate-y-2">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-display text-xl text-white font-bold mb-4 tracking-tight">
                      Showroom afspraak
                    </h3>
                    
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4"></div>
                    
                    <p className="font-body text-white/80 leading-relaxed mb-8">
                      Ontdek ons volledige premium assortiment en ontvang professioneel advies in onze luxe showroom
                    </p>
                    
                    <a
                      href="tel:+32467856405"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-6 py-3 rounded-full font-bold transition-all duration-500 hover:shadow-2xl hover:scale-105"
                    >
                      Nu bellen
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#C8A85B]/30 transition-all duration-500 group hover:-translate-y-2">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-[#C8A85B] to-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-110">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="font-display text-xl text-white font-bold mb-4 tracking-tight">
                      Virtueel advies
                    </h3>
                    
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] mx-auto mb-4"></div>
                    
                    <p className="font-body text-white/80 leading-relaxed mb-8">
                      Online videogesprek vanuit het comfort van uw eigen woning met onze interieurdesigners
                    </p>
                    
                    <a
                      href="mailto:info@kaniou.be"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C8A85B] to-[#D4AF37] text-white px-6 py-3 rounded-full font-bold transition-all duration-500 hover:shadow-2xl hover:scale-105"
                    >
                      Online aanvragen
                      <MessageCircle className="w-4 h-4" />
                    </a>
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

export default ContactPage;
