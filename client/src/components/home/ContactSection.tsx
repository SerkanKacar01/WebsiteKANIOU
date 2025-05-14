import Container from "@/components/ui/container";
import { MapPin, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  
  return (
    <section id="contact" className="py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            Neem Contact Op
          </h2>
          <p className="font-body text-text-medium max-w-2xl mx-auto">
            Kom in Contact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              Bezoek Onze Showroom
            </h3>
            <p className="font-body text-text-medium">
              Raambehandelingstraat 123
              <br />
              1234 AB Amsterdam
            </p>
            <p className="font-body text-text-medium mt-2">
              Maandag - Vrijdag: 9:00 - 18:00
              <br />
              Zaterdag: 10:00 - 17:00
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              Bel Ons
            </h3>
            <p className="font-body text-text-medium">+31 20 123 4567</p>
            <p className="font-body text-text-medium mt-2">
              Maandag - Vrijdag: 9:00 - 18:00
              <br />
              Zaterdag: 10:00 - 17:00
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-secondary text-xl" />
            </div>
            <h3 className="font-display text-xl text-primary font-medium mb-2">
              E-mail Ons
            </h3>
            <p className="font-body text-text-medium">info@elegantdrapes.com</p>
            <p className="font-body text-text-medium mt-2">
              Wij reageren binnen 24 uur
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-96 bg-neutral-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095989797!2d-74.00425634857871!3d40.741889379328765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1630525618522!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title="Onze locatie op de kaart"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
