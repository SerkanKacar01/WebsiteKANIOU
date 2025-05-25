import { Helmet } from "react-helmet-async";
import Container from "@/components/ui/container";
import CustomizationWizard from "@/components/wizard/CustomizationWizard";

const CustomizationWizardPage = () => {
  return (
    <>
      <Helmet>
        <title>Maatwerk Wizard - KANIOU zilvernaald</title>
        <meta
          name="description"
          content="Design uw perfecte raambekleding in eenvoudige stappen. Onze interactieve wizard helpt u de ideale gordijnen, lamellen of rolgordijnen kiezen."
        />
      </Helmet>

      <div className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-primary font-semibold mb-4">
              Maatwerk Wizard
            </h1>
            <p className="text-xl text-text-medium max-w-3xl mx-auto">
              Design uw perfecte raambekleding in eenvoudige stappen. Beantwoord een paar 
              vragen en ontdek welke oplossing het beste bij uw wensen en interieur past.
            </p>
          </div>

          <CustomizationWizard />
        </Container>
      </div>
    </>
  );
};

export default CustomizationWizardPage;