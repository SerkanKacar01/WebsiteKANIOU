import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Elegant Drapes</title>
        <meta
          name="description"
          content="Get in touch with Elegant Drapes for questions about our premium curtains, blinds, and window treatments. Visit our showroom or contact us online."
        />
      </Helmet>
      
      <div className="py-12 bg-neutral-100">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Get in Touch
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              We're here to help with any questions about our products or services.
              Reach out to our friendly team for personalized assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                Visit Our Showroom
              </h3>
              <p className="font-body text-text-medium">
                123 Design Avenue<br />
                New York, NY 10001
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-secondary h-4 w-4 mr-2" />
                  <span className="font-medium">Opening Hours</span>
                </div>
                <p className="font-body text-text-medium text-sm">
                  Monday - Saturday: 10am - 6pm<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                Call Us
              </h3>
              <p className="font-body text-text-medium">
                <a 
                  href="tel:+15551234567" 
                  className="hover:text-accent transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="text-secondary h-4 w-4 mr-2" />
                  <span className="font-medium">Call Center Hours</span>
                </div>
                <p className="font-body text-text-medium text-sm">
                  Monday - Friday: 9am - 5pm<br />
                  Weekend: 10am - 4pm
                </p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="bg-neutral-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-primary font-medium mb-2">
                Email Us
              </h3>
              <p className="font-body text-text-medium">
                <a 
                  href="mailto:info@elegantdrapes.com" 
                  className="hover:text-accent transition-colors"
                >
                  info@elegantdrapes.com
                </a>
              </p>
              <p className="font-body text-text-medium mt-2">
                <a 
                  href="mailto:customer.service@elegantdrapes.com" 
                  className="hover:text-accent transition-colors"
                >
                  customer.service@elegantdrapes.com
                </a>
              </p>
              <p className="font-body text-text-medium text-sm mt-4">
                We aim to respond to all inquiries within 24 hours during business days.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-display text-2xl text-primary font-semibold mb-6">
                Send Us a Message
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
                  title="Elegant Drapes Location"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
              Book a Consultation
            </h2>
            <p className="font-body text-text-medium text-center max-w-2xl mx-auto mb-8">
              Get expert advice and personalized recommendations for your home. Our design consultants can visit your home or
              meet you at our showroom to help you select the perfect window treatments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  In-Home Consultation
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Let our experts come to you for precise measurements and personalized recommendations.
                </p>
                <a 
                  href="/quote" 
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Schedule Now
                </a>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  Showroom Appointment
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Visit our showroom to explore our full range of products and speak with our design team.
                </p>
                <a 
                  href="tel:+15551234567" 
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Book by Phone
                </a>
              </div>
              
              <div className="border border-neutral-200 rounded-lg p-6 text-center">
                <h3 className="font-display text-xl text-primary font-medium mb-4">
                  Virtual Consultation
                </h3>
                <p className="font-body text-text-medium mb-6">
                  Get expert advice from the comfort of your own home via video call with our designers.
                </p>
                <a 
                  href="mailto:appointments@elegantdrapes.com" 
                  className="inline-block bg-secondary hover:bg-accent text-white px-6 py-2 rounded-md transition-colors"
                >
                  Request Online
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
