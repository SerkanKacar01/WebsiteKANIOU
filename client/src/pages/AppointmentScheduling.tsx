import Container from "@/components/ui/container";
import SmartScheduler from "@/components/scheduling/SmartScheduler";
import { useLanguage } from "@/context/LanguageContext";

export default function AppointmentScheduling() {
  const { t } = useLanguage();

  return (
    <div className="py-8">
      <Container>
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-primary font-semibold mb-4">
            {t('Schedule Appointment')}
          </h1>
          <p className="font-body text-text-medium max-w-2xl">
            {t('Book a consultation, measurement visit, or installation appointment with our expert team.')}
          </p>
        </div>
        
        <SmartScheduler />
      </Container>
    </div>
  );
}