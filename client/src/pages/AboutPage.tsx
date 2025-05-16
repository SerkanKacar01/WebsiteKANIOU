import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Award, Ruler, Truck, Headphones, CheckCircle } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Elegant Drapes</title>
        <meta
          name="description"
          content="Learn about Elegant Drapes' 20+ years of experience creating premium window treatments. Discover our story, values, and commitment to quality."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              About Elegant Drapes
            </h1>
            <p className="font-body text-text-medium max-w-2xl mx-auto">
              For over 20 years, we've been crafting premium window treatments
              that transform ordinary spaces into extraordinary interiors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-display text-2xl text-primary font-semibold mb-4">
                Our Story
              </h2>
              <p className="font-body text-text-medium mb-6">
                Founded in 2001, Elegant Drapes began with a simple mission: to create 
                beautiful, high-quality window coverings that reflect each client's 
                personal style. What started as a small family business has grown into 
                one of the leading providers of premium window treatments in the region.
              </p>
              <p className="font-body text-text-medium mb-6">
                Our journey began with a simple belief: everyone deserves beautiful,
                high-quality window coverings that reflect their personal style. Today, 
                we're proud to serve thousands of customers each year, helping them 
                transform their spaces with our expert craftsmanship and design.
              </p>
              <p className="font-body text-text-medium">
                We take pride in our personalized approach, working closely with each 
                client to understand their needs and preferences, and delivering 
                solutions that exceed expectations. Our team of experienced designers 
                and installers are passionate about what they do, and it shows in 
                the quality of our work.
              </p>
            </div>
            
            <div className="relative">
              <img
                src="https://pixabay.com/get/g356064e5e472162ea3bdf7db76831017a205df5f1807a09d7636efef6f9b054d4c9aaf47b9c21d1c58d3c45cc428f1f1560cf1e2a2d0ead5771100045f79d161_1280.jpg"
                alt="Elegant Drapes Showroom"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-display text-lg text-primary font-medium">30+</p>
                <p className="font-body text-text-medium text-sm">
                  Years of Excellence
                </p>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="font-display text-lg text-primary font-medium">
                  5000+
                </p>
                <p className="font-body text-text-medium text-sm">
                  Tevreden klanten
                </p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
              Over KANIOU Zilvernaald
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Premium Qualit
                </h3>
                <p className="font-body text-text-medium">
                  Only the finest materials and craftmanship in every product, ensuring beauty and durability.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Ruler className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Custom Made
                </h3>
                <p className="font-body text-text-medium">
                  Tailored to your exact specifications and requirements for a perfect fit every time.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Professional Installation
                </h3>
                <p className="font-body text-text-medium">
                  Expert fitting service ensuring perfect results with minimum disruption to your home.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-secondary text-2xl mb-4">
                  <Headphones className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-primary font-medium mb-2">
                  Expert Consultation
                </h3>
                <p className="font-body text-text-medium">
                  Personalized advice from our window treatment specialists to help you make the best choice.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md mb-16">
            <h2 className="font-display text-2xl text-primary font-semibold mb-6" id="measure-guide">
              Measurement & Installation Guides
            </h2>
            
            <Accordion type="single" collapsible className="mb-8">
              <AccordionItem value="measure-curtains">
                <AccordionTrigger className="text-lg font-medium">How to Measure for Curtains</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>To ensure a perfect fit for your curtains, follow these steps:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Measure the width of your window or track. For a fuller look, add 15-20cm on each side.</li>
                      <li>Measure from the top of the track/pole to where you want the curtains to finish (typically either windowsill, below sill, or floor length).</li>
                      <li>For track-mounted curtains, add 2-3cm to the height measurement to allow for the heading.</li>
                      <li>For pole-mounted curtains, measure from the top of the pole to your desired end point, then add 2-3cm for rings.</li>
                    </ol>
                    <p className="text-accent">Pro tip: When ordering, always provide the exact measurements you've taken. Our team will make the necessary adjustments for the specific heading type you choose.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="measure-blinds">
                <AccordionTrigger className="text-lg font-medium">How to Measure for Blinds</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>For accurate blind measurements, follow these guidelines:</p>
                    <h4 className="font-medium">Inside Mount (Recess Fit):</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Measure the exact width at the top, middle, and bottom of the window recess.</li>
                      <li>Use the narrowest measurement to ensure the blind fits without obstruction.</li>
                      <li>Measure the height at the left, middle, and right sides of the recess.</li>
                      <li>Use the longest measurement to ensure full coverage.</li>
                    </ol>
                    <h4 className="font-medium">Outside Mount:</h4>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Measure the exact width of the area you want the blind to cover. Add 5-10cm on each side for optimal light blockage.</li>
                      <li>Measure the height from where you want the blind to start to where you want it to end.</li>
                    </ol>
                    <p className="text-accent">Note: For roller blinds, be specific about which side you want the controls on.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="installation">
                <AccordionTrigger className="text-lg font-medium" id="installation-guide">Installation Tips</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <p>While we offer professional installation services, if you choose to install yourself:</p>
                    <h4 className="font-medium">For Curtain Poles:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Position the pole brackets 15cm above the window and 15-20cm beyond the window width on each side.</li>
                      <li>Use appropriate wall plugs and fixings for your wall type.</li>
                      <li>Ensure the pole is level before final tightening.</li>
                    </ul>
                    <h4 className="font-medium">For Curtain Tracks:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Position the track approximately 10cm above the window.</li>
                      <li>Ensure supports are spaced every 50-60cm and properly secured.</li>
                      <li>Test smooth operation before attaching curtains.</li>
                    </ul>
                    <h4 className="font-medium">For Blinds:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Mark bracket positions ensuring they're level.</li>
                      <li>For outside mounts, position brackets on the wall or window frame.</li>
                      <li>For inside mounts, position brackets inside the recess.</li>
                      <li>Test operation before finalizing installation.</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <h2 className="font-display text-2xl text-primary font-semibold mb-6" id="care-instructions">
              Care Instructions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Curtains & Drapes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Regular dusting with a feather duster or vacuum with upholstery attachment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Check care labels for washing instructions - most can be machine washed on gentle cycle</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Iron on low heat while slightly damp for best results</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Professional cleaning recommended for silk and lined curtains</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Blinds</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Dust regularly with a microfiber cloth or duster</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Spot clean with mild detergent and water as needed</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>For wooden blinds, use wood cleaner occasionally to maintain finish</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Keep mechanisms clean and free from dust to ensure smooth operation</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h2 className="font-display text-2xl text-primary font-semibold mb-6" id="faq">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible>
              <AccordionItem value="q1">
                <AccordionTrigger>How long does it take to receive custom window treatments?</AccordionTrigger>
                <AccordionContent>
                  Typically, custom window treatments take 2-3 weeks from order to installation, depending on the complexity of the design, fabric availability, and our current workload. We'll provide you with a specific timeline when you place your order.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q2">
                <AccordionTrigger>Do you offer in-home consultations?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer complimentary in-home consultations where our design experts will bring samples, take measurements, and provide personalized recommendations based on your space and preferences. Contact us to schedule an appointment.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q3">
                <AccordionTrigger>What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  <div id="return-policy">
                    Ready-made products in original condition may be returned within 14 days for a full refund or exchange. Custom-made items cannot be returned unless there is a manufacturing defect. Please contact us with any concerns about your order.
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q4">
                <AccordionTrigger>What warranty do you offer?</AccordionTrigger>
                <AccordionContent>
                  <div id="warranty">
                    All our products come with a 2-year warranty against manufacturing defects. This covers issues with fabric, stitching, hardware, and mechanisms under normal use. The warranty does not cover damage from improper installation, accidents, or normal wear and tear.
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="q5">
                <AccordionTrigger>Can you match curtains to my existing decor?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! We offer a wide range of fabrics, patterns, and colors that can be customized to match your existing decor. During consultation, we can help you select the perfect options to complement your space.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="text-center">
            <h2 className="font-display text-2xl text-primary font-semibold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="font-body text-text-medium max-w-2xl mx-auto mb-6">
              Contact our team for expert advice or request a quote for your
              custom window treatment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <a>
                  <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-accent">
                    Request a Quote
                  </Button>
                </a>
              </Link>
              <Link href="/contact">
                <a>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Contact Us
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutPage;
