import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import AppointmentBookingForm from './AppointmentBookingForm';

interface AppointmentBookingButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
  sessionId?: string;
  bookedVia?: 'website' | 'chatbot' | 'phone';
}

const buttonLabels = {
  nl: {
    bookAppointment: 'Afspraak Inplannen',
    scheduleConsultation: 'Gratis Consultatie'
  },
  fr: {
    bookAppointment: 'Prendre Rendez-vous',
    scheduleConsultation: 'Consultation Gratuite'
  },
  en: {
    bookAppointment: 'Book Appointment',
    scheduleConsultation: 'Free Consultation'
  },
  tr: {
    bookAppointment: 'Randevu Al',
    scheduleConsultation: 'Ücretsiz Danışmanlık'
  }
};

export default function AppointmentBookingButton({
  variant = 'default',
  size = 'default',
  className = '',
  sessionId,
  bookedVia = 'website'
}: AppointmentBookingButtonProps) {
  const { language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const labels = buttonLabels[language as keyof typeof buttonLabels];

  return (
    <>
      <Button
        onClick={() => setIsFormOpen(true)}
        variant={variant}
        size={size}
        className={`flex items-center gap-2 ${className}`}
      >
        <Calendar className="h-4 w-4" />
        {labels.bookAppointment}
      </Button>

      <AppointmentBookingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialSessionId={sessionId}
        bookedVia={bookedVia}
      />
    </>
  );
}

export function AppointmentBookingCTA({
  className = ''
}: {
  className?: string;
}) {
  const { language } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const labels = buttonLabels[language as keyof typeof buttonLabels];

  return (
    <>
      <div className={`bg-gradient-to-r from-primary/10 to-primary/5 p-6 rounded-lg border ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {labels.scheduleConsultation}
            </h3>
            <p className="text-gray-600 text-sm">
              {language === 'nl' && 'Plan een gratis opmeting of ontwerpadvies in. Onze experts helpen u graag.'}
              {language === 'fr' && 'Planifiez une prise de mesures ou un conseil en design gratuit. Nos experts sont là pour vous aider.'}
              {language === 'en' && 'Schedule a free measurement or design consultation. Our experts are here to help.'}
              {language === 'tr' && 'Ücretsiz ölçüm veya tasarım danışmanlığı planlayın. Uzmanlarımız size yardımcı olmak için burada.'}
            </p>
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Clock className="h-4 w-4" />
            {labels.bookAppointment}
          </Button>
        </div>
      </div>

      <AppointmentBookingForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        bookedVia="website"
      />
    </>
  );
}