import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contacteer ons || KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Get in touch with Elegant Drapes for questions about our premium curtains, blinds, and window treatments. Visit our showroom or contact us online."
        />
      </Helmet>

      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Neem contact met ons op
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              Wij staan klaar om al uw vragen over onze producten en diensten te
              beantwoorden. Neem gerust contact op met ons vriendelijke team
              voor persoonlijk en professioneel advies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                Bezoek onze showroom
              </h3>
              <p className="font-body text-text-medium">
                Pauwengraaf 66
                <br />
                3630, Maasmechelen te België
                <br />
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-secondary h-4 w-4 mr-2" />
                  <span className="font-medium">Openingstijden </span>
                </div>
                <p className="font-body text-text-medium text-sm">
                  Maandag tot/met Zaterdag: 10:00 - 18:00
                  <br />
                  Zondag: Gesloten
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                Bel ons
              </h3>
              <p className="font-body text-text-medium">
                <a
                  href="tel:+15551234567"
                  className="hover:text-accent transition-colors"
                >
                  +32 467 85 64 05
                </a>
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-secondary h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Telefonisch bereikbaarheid
                  </span>
                </div>
                <p className="font-body text-text-medium text-sm">
                  Maandag tot/met Zaterdag: 10:00 - 18:00
                  <br />
                  Zondag: Gesloten
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                E-mail ons
              </h3>
              <p className="font-body text-text-medium">
                <a
                  href="mailto:info@elegantdrapes.com"
                  className="hover:text-accent transition-colors"
                >
                  info@kaniou.be
                </a>
              </p>
              <p className="font-body text-text-medium mt-2">
                <a
                  href="mailto:customer.service@elegantdrapes.com"
                  className="hover:text-accent transition-colors"
                ></a>
              </p>
              <p className="font-body text-text-medium text-sm mt-4">
                Wij streven ernaar om alle vragen binnen 24 uur op werkdagen te
                beantwoorden.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-display text-2xl text-primary font-semibold mb-6">
                Bericht verzenden
              </h2>
              <ContactForm />
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-full w-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095989797!2d-74.00425634857871!3d40.741889379328765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1630525618522!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="KANIOU zilvernaald locatie"
                ></iframe>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
              Plan een advies gesprek
            </h2>
            <p className="font-body text-text-medium text-center max-w-2xl mx-auto mb-8">
              Ontvang professioneel advies en persoonlijke aanbevelingen voor uw
              woning. Onze interieuradviseurs komen graag bij u langs of
              ontvangen u in onze showroom om u te helpen bij het kiezen van de
              perfecte raamdecoratie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  Advies aan huis
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Laat onze experts bij u langskomen voor nauwkeurige opmetingen
                  en persoonlijk advies op maat van uw interieur.
                </p>
                <a
                  href="/quote"
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Afspraak maken
                </a>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  Showroom afspraak
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Bezoek onze showroom om ons volledige assortiment te ontdekken
                  en in gesprek te gaan met ons ontwerpteam voor professioneel
                  advies.
                </p>
                <a
                  href="tel:+15551234567"
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Telefonisch afspreken
                </a>
              </div>

              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  Virtueel advies gesprek
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Ontvang deskundig advies vanuit het comfort van uw eigen
                  woning via een videogesprek met een van onze
                  interieurontwerpers.
                </p>
                <a
                  href="mailto:appointments@elegantdrapes.com"
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Online aanvragen
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
