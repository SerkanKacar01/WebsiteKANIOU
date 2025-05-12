import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import QuoteForm from "@/components/forms/QuoteForm";
import { CheckCircle } from "lucide-react";

const QuotePage = () => {
  return (
    <>
      <Helmet>
        <title>Request a Quote | Elegant Drapes</title>
        <meta
          name="description"
          content="Request a personalized quote for premium curtains, blinds, and window treatments from Elegant Drapes. Custom solutions tailored to your needs."
        />
      </Helmet>
      
      <div className="py-12 bg-primary relative">
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl text-white font-semibold mb-4">
                Request a Free Quote
              </h1>
              <p className="font-body text-white/90 max-w-2xl mx-auto">
                Fill out the form below and our specialists will get back to you
                with a personalized quote tailored to your requirements.
              </p>
            </div>
            
            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h2 className="font-display text-2xl text-primary font-semibold mb-6">
                      Your Quote Details
                    </h2>
                    <QuoteForm />
                  </div>
                  
                  <div className="bg-neutral-100 p-6 rounded-lg">
                    <h3 className="font-display text-xl text-primary font-medium mb-4">
                      What Happens Next
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          We'll review your request within 24 hours
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          A design consultant will contact you to discuss requirements
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          We'll schedule an in-home measurement if needed
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-secondary rounded-full p-1 mt-0.5 mr-3 flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-text-medium">
                          You'll receive a detailed quote with options
                        </span>
                      </li>
                    </ul>
                    
                    <div className="mt-8 pt-6 border-t border-neutral-300">
                      <h4 className="font-medium mb-2">Questions?</h4>
                      <p className="text-text-medium text-sm mb-2">
                        Call us directly at:
                      </p>
                      <a 
                        href="tel:+15551234567" 
                        className="text-accent font-medium text-lg"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
              <h2 className="font-display text-2xl text-primary font-semibold mb-6 text-center">
                What Our Customers Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 fill-current" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "The team was incredibly helpful throughout the entire process. The curtains are stunning and fit perfectly!"
                  </p>
                  <p className="font-medium">Sarah J.</p>
                  <p className="text-text-light text-sm">New York, NY</p>
                </div>
                
                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 fill-current" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "From quote to installation, everything was smooth and professional. The blinds transformed our living room!"
                  </p>
                  <p className="font-medium">Michael R.</p>
                  <p className="text-text-light text-sm">Chicago, IL</p>
                </div>
                
                <div className="bg-neutral-100 p-6 rounded-lg">
                  <div className="flex text-secondary mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 fill-current" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-body text-text-medium italic mb-4">
                    "I was nervous about custom window treatments, but the quote process was simple and the final result exceeded my expectations!"
                  </p>
                  <p className="font-medium">Emily C.</p>
                  <p className="text-text-light text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default QuotePage;
