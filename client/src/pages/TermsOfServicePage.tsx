import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/layout/LanguageSelector";

const TermsOfServicePage = () => {
  const { t, language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Terms of Service | {t('app.title')}</title>
        <meta
          name="description"
          content="Terms of Service and conditions for using our products and services."
        />
      </Helmet>
      
      <div className="bg-neutral-100 py-16">
        <Container>
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>
          
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
              Terms of Service
            </h1>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 lg:p-10">
            {/* For now, only English version is implemented */}
            <div className="prose prose-headings:font-display prose-headings:text-primary prose-headings:font-semibold prose-p:font-body prose-p:text-text-medium max-w-none">
              <h2 className="text-xl mb-4">TERMS OF SERVICE — KANIOU.BE</h2>
              
              <p className="text-sm text-neutral-500 mb-6">
                Effective Date: 01-06-2025<br />
                Last Updated: 29-04-2025
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">1. General Information</h3>
              <p className="mb-4">
                This website is operated by KANIOU BVBA, registered in Belgium under company number 0721.785.413, with its registered office at Pauwengraaf 66, 3630 Maasmechelen te België. Throughout the site, the terms "we", "us" and "our" refer to KANIOU.
              </p>
              <p className="mb-6">
                By accessing or using our website, you agree to be bound by the following Terms of Service ("Terms"), including all additional terms, policies and notices referenced herein and/or available by hyperlink.
              </p>
              <p className="mb-6">
                If you do not agree to these Terms, you may not use this website or any of its services.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">2. Website Usage</h3>
              <p className="mb-4">
                You agree to use this website only for lawful purposes. You must not:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Use the website in any way that breaches any applicable local, national or international law or regulation</li>
                <li>Use the website to send or upload any unsolicited or unauthorized advertising or promotional material</li>
                <li>Attempt to gain unauthorized access to our server or any database connected to this website</li>
                <li>Transmit any viruses, trojans, worms, or other material that is malicious or technologically harmful</li>
              </ul>
              <p className="mb-6">
                We reserve the right to restrict or terminate your access to the website at our sole discretion without notice if you violate these Terms.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">3. Services and Products</h3>
              <p className="mb-6">
                KANIOU provides custom window treatments, including but not limited to curtains, blinds, shutters, and sun protection systems. All products are tailor-made according to client specifications.
              </p>
              <p className="mb-6">
                The images and descriptions on the website are for illustrative purposes only. Final product details will be confirmed via written quotation and order confirmation.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">4. Quotations and Orders</h3>
              <p className="mb-6">
                All quotes are non-binding until confirmed in writing. Prices shown on the website are indicative and may vary based on exact measurements, materials, labor, installation, and location.
              </p>
              <p className="mb-6">
                Quotes are valid for a maximum of 30 calendar days unless stated otherwise. Acceptance of a quote by the customer must be done in writing or via official communication channels.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">5. Payment Terms</h3>
              <p className="mb-4">
                Unless agreed otherwise in writing:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>A deposit may be required to initiate custom production</li>
                <li>Full payment must be made prior to installation</li>
                <li>Late payments may incur interest charges and administrative costs</li>
              </ul>
              <p className="mb-6">
                We reserve the right to suspend or cancel any order if payment is delayed or incomplete.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">6. Intellectual Property Rights</h3>
              <p className="mb-6">
                All content on this website — including text, graphics, images, logos, product designs, icons, and code — is the exclusive property of KANIOU BVBA or its licensors and is protected by copyright and trademark laws.
              </p>
              <p className="mb-6">
                You are not permitted to reproduce, copy, distribute, sell, or use any content from this website without prior written consent.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">7. Limitation of Liability</h3>
              <p className="mb-6">
                KANIOU makes every reasonable effort to ensure that the information on this website is accurate and up to date. However, we do not guarantee the completeness, accuracy, or reliability of any content.
              </p>
              <p className="mb-4">
                We are not liable for:
              </p>
              <ul className="list-disc pl-6 mb-6">
                <li>Any direct or indirect damages caused by the use of this site</li>
                <li>Delays or errors in information</li>
                <li>Incompatibility with user software, devices, or browser performance</li>
                <li>Viruses or other harmful components resulting from use</li>
              </ul>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">8. User-Generated Content</h3>
              <p className="mb-6">
                If you submit reviews, photos, testimonials, or other materials to us via the website or social media, you grant us the right to use, reproduce, modify, and publish that content for promotional purposes, without compensation.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">9. Third-Party Links</h3>
              <p className="mb-6">
                This website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of such websites and you access them at your own risk.
              </p>
              
              <hr className="my-6" />
              
              <h3 className="text-lg mt-8 mb-3">10. Privacy and Data Protection</h3>
              <p className="mb-6">
                KANIOU handles your personal data in accordance with the General Data Protection Regulation (GDPR) and Belgian privacy law.
              </p>
              <p className="mb-6">
                For full details, please read our <a href="/privacy-policy" className="text-primary hover:text-secondary underline">Privacy Policy</a>, which forms part of these Terms.
              </p>
              <p className="mb-6">
                By using this website, you agree to the processing of your personal data as described therein.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default TermsOfServicePage;