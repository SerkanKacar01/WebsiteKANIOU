import Container from "@/components/ui/container";
import { MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ContactSection = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            {t("Neem contact met ons op")}
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            {t(
              "Voor vragen, afspraken of professioneel advies staat ons team voor u klaar.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              {t("Showroom bezoeken")}
            </h3>
            <p className="font-body text-text-medium">
              {t("Pauwengraaf 66")}
              <br />
              {t("3630 Maasmechelen, België")}
            </p>
            <p className="font-body text-text-medium mt-2">
              {t("Maandag t/m Zaterdag: 10:00 – 18:00")}
              <br />
              {t("Zondag: Gesloten")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              {t("Telefonisch bereikbaar")}
            </h3>
            <p className="font-body text-text-medium">
              {t("+32 467 85 64 05")}
            </p>
            <p className="font-body text-text-medium mt-2">
              {t("Maandag t/m Zaterdag: 10:00 – 18:00")}
              <br />
              {t("Zondag: Gesloten")}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              {t("E-mail ons")}
            </h3>
            <p className="font-body text-text-medium">
              {t("Stuur ons een bericht via e-mail")}
            </p>
            <p className="font-body text-text-medium mt-2">
              {t("info@kaniu.be")}
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 bg-neutral-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2515.5554716862737!2d5.691408300000001!3d50.9886857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c0c5d2ad242f0f%3A0x1d9efc14cec41751!2sKANIOU%20bvba%20ZILVERNAALD!5e0!3m2!1sen!2sbe!4v1683924568227!5m2!1sen!2sbe"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title={t("contact.map.title")}
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
