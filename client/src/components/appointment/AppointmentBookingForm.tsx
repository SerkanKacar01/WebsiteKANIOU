import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertAppointmentBookingSchema, type InsertAppointmentBooking } from '@shared/schema';
import { useLanguage } from '@/context/LanguageContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Home, AlertCircle, CheckCircle2 } from 'lucide-react';
import { format, addDays, isWeekend, isSunday } from 'date-fns';
import { nl, fr, enUS, tr } from 'date-fns/locale';

interface AppointmentBookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialSessionId?: string;
  bookedVia?: 'website' | 'chatbot' | 'phone';
}

const appointmentTypes = {
  nl: {
    measurement: 'Opmeting',
    design_advice: 'Ontwerpadvies',
    showroom_visit: 'Showroom bezoek'
  },
  fr: {
    measurement: 'Prise de mesures',
    design_advice: 'Conseil en design',
    showroom_visit: 'Visite du showroom'
  },
  en: {
    measurement: 'Measurement',
    design_advice: 'Design Advice',
    showroom_visit: 'Showroom Visit'
  },
  tr: {
    measurement: 'Ölçüm',
    design_advice: 'Tasarım Danışmanlığı',
    showroom_visit: 'Showroom Ziyareti'
  }
};

const urgencyLevels = {
  nl: {
    low: 'Laag',
    medium: 'Gemiddeld',
    high: 'Hoog',
    urgent: 'Dringend'
  },
  fr: {
    low: 'Faible',
    medium: 'Moyen',
    high: 'Élevé',
    urgent: 'Urgent'
  },
  en: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent'
  },
  tr: {
    low: 'Düşük',
    medium: 'Orta',
    high: 'Yüksek',
    urgent: 'Acil'
  }
};

const formLabels = {
  nl: {
    title: 'Afspraak Inplannen',
    subtitle: 'Plan uw gratis consultatiegesprek in',
    fullName: 'Volledige naam',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
    appointmentType: 'Type afspraak',
    preferredDate: 'Gewenste datum',
    preferredTime: 'Gewenste tijd',
    roomType: 'Type ruimte (optioneel)',
    message: 'Aanvullende informatie (optioneel)',
    urgency: 'Urgentie',
    submit: 'Afspraak Aanvragen',
    submitting: 'Aanvraag wordt verzonden...',
    selectTime: 'Selecteer een tijd',
    selectType: 'Selecteer het type afspraak',
    selectUrgency: 'Selecteer urgentie',
    success: 'Afspraak succesvol aangevraagd!',
    successMessage: 'We nemen binnen 24 uur contact met u op om uw afspraak te bevestigen.',
    error: 'Er is een fout opgetreden',
    loadingSlots: 'Beschikbare tijden laden...',
    noSlotsAvailable: 'Geen beschikbare tijden voor deze datum',
    selectValidDate: 'Selecteer een geldige datum',
    weekendWarning: 'We zijn gesloten op zondag',
    pastDateWarning: 'Kan geen afspraken inplannen voor verleden datums'
  },
  fr: {
    title: 'Prendre Rendez-vous',
    subtitle: 'Planifiez votre consultation gratuite',
    fullName: 'Nom complet',
    email: 'Adresse e-mail',
    phone: 'Numéro de téléphone',
    appointmentType: 'Type de rendez-vous',
    preferredDate: 'Date souhaitée',
    preferredTime: 'Heure souhaitée',
    roomType: 'Type de pièce (optionnel)',
    message: 'Informations supplémentaires (optionnel)',
    urgency: 'Urgence',
    submit: 'Demander un Rendez-vous',
    submitting: 'Envoi en cours...',
    selectTime: 'Sélectionner une heure',
    selectType: 'Sélectionner le type de rendez-vous',
    selectUrgency: 'Sélectionner l\'urgence',
    success: 'Rendez-vous demandé avec succès !',
    successMessage: 'Nous vous contacterons dans les 24 heures pour confirmer votre rendez-vous.',
    error: 'Une erreur s\'est produite',
    loadingSlots: 'Chargement des créneaux disponibles...',
    noSlotsAvailable: 'Aucun créneau disponible pour cette date',
    selectValidDate: 'Sélectionner une date valide',
    weekendWarning: 'Nous sommes fermés le dimanche',
    pastDateWarning: 'Impossible de planifier des rendez-vous pour des dates passées'
  },
  en: {
    title: 'Schedule Appointment',
    subtitle: 'Schedule your free consultation',
    fullName: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    appointmentType: 'Appointment type',
    preferredDate: 'Preferred date',
    preferredTime: 'Preferred time',
    roomType: 'Room type (optional)',
    message: 'Additional information (optional)',
    urgency: 'Urgency',
    submit: 'Request Appointment',
    submitting: 'Submitting request...',
    selectTime: 'Select a time',
    selectType: 'Select appointment type',
    selectUrgency: 'Select urgency',
    success: 'Appointment requested successfully!',
    successMessage: 'We will contact you within 24 hours to confirm your appointment.',
    error: 'An error occurred',
    loadingSlots: 'Loading available times...',
    noSlotsAvailable: 'No available times for this date',
    selectValidDate: 'Select a valid date',
    weekendWarning: 'We are closed on Sundays',
    pastDateWarning: 'Cannot schedule appointments for past dates'
  },
  tr: {
    title: 'Randevu Al',
    subtitle: 'Ücretsiz danışmanlığınızı planlayın',
    fullName: 'Ad soyad',
    email: 'E-posta adresi',
    phone: 'Telefon numarası',
    appointmentType: 'Randevu türü',
    preferredDate: 'Tercih edilen tarih',
    preferredTime: 'Tercih edilen saat',
    roomType: 'Oda türü (isteğe bağlı)',
    message: 'Ek bilgiler (isteğe bağlı)',
    urgency: 'Aciliyet',
    submit: 'Randevu Talep Et',
    submitting: 'Talep gönderiliyor...',
    selectTime: 'Bir saat seçin',
    selectType: 'Randevu türünü seçin',
    selectUrgency: 'Aciliyet seviyesini seçin',
    success: 'Randevu başarıyla talep edildi!',
    successMessage: 'Randevunuzu onaylamak için 24 saat içinde sizinle iletişime geçeceğiz.',
    error: 'Bir hata oluştu',
    loadingSlots: 'Müsait saatler yükleniyor...',
    noSlotsAvailable: 'Bu tarih için müsait saat yok',
    selectValidDate: 'Geçerli bir tarih seçin',
    weekendWarning: 'Pazar günleri kapalıyız',
    pastDateWarning: 'Geçmiş tarihler için randevu alınamaz'
  }
};

export default function AppointmentBookingForm({ 
  isOpen, 
  onClose, 
  initialSessionId,
  bookedVia = 'website'
}: AppointmentBookingFormProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);

  const labels = formLabels[language as keyof typeof formLabels];
  const types = appointmentTypes[language as keyof typeof appointmentTypes];
  const urgency = urgencyLevels[language as keyof typeof urgencyLevels];

  const form = useForm<InsertAppointmentBooking>({
    resolver: zodResolver(insertAppointmentBookingSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      appointmentType: 'measurement',
      preferredDate: '',
      preferredTime: '',
      roomType: '',
      message: '',
      language: language as 'nl' | 'fr' | 'en' | 'tr',
      urgency: 'medium',
      bookedVia,
      sessionId: initialSessionId
    }
  });

  // Fetch available time slots for selected date
  const { data: availableSlots, isLoading: slotsLoading } = useQuery({
    queryKey: ['/api/appointments/available-slots', selectedDate],
    enabled: !!selectedDate && selectedDate !== '',
    queryFn: async () => {
      const response = await fetch(`/api/appointments/available-slots/${selectedDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      return response.json();
    }
  });

  const appointmentMutation = useMutation({
    mutationFn: async (data: InsertAppointmentBooking) => {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create appointment');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setIsSuccess(true);
      toast({
        title: labels.success,
        description: labels.successMessage,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/appointments'] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: labels.error,
        description: error.message || 'Failed to create appointment',
        variant: 'destructive',
      });
    }
  });

  const onSubmit = (data: InsertAppointmentBooking) => {
    appointmentMutation.mutate(data);
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    form.setValue('preferredDate', date);
    form.setValue('preferredTime', ''); // Reset time when date changes
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);
      if (!isSunday(date)) { // Skip Sundays
        const dateString = format(date, 'yyyy-MM-dd');
        const displayDate = format(date, 'EEEE, MMMM d, yyyy', {
          locale: language === 'nl' ? nl : language === 'fr' ? fr : language === 'tr' ? tr : enUS
        });
        options.push({ value: dateString, label: displayDate });
      }
    }
    return options;
  };

  const formatTimeSlot = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), 'HH:mm');
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {labels.success}
            </h3>
            <p className="text-gray-600 mb-6">
              {labels.successMessage}
            </p>
            <Button 
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="w-full"
            >
              Sluiten
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <Calendar className="h-6 w-6 text-primary" />
            {labels.title}
          </DialogTitle>
          <p className="text-gray-600">{labels.subtitle}</p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {labels.fullName}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={labels.fullName} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {labels.email}
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder={labels.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {labels.phone}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+32 XXX XX XX XX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="appointmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labels.appointmentType}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={labels.selectType} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="measurement">{types.measurement}</SelectItem>
                        <SelectItem value="design_advice">{types.design_advice}</SelectItem>
                        <SelectItem value="showroom_visit">{types.showroom_visit}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="preferredDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labels.preferredDate}</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      handleDateChange(value);
                    }}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={labels.selectValidDate} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {generateDateOptions().map((date) => (
                          <SelectItem key={date.value} value={date.value}>
                            {date.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {labels.preferredTime}
                    </FormLabel>
                    <Select onValueChange={field.onChange} disabled={!selectedDate}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            slotsLoading ? labels.loadingSlots : labels.selectTime
                          } />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableSlots?.availableSlots?.length > 0 ? (
                          availableSlots.availableSlots.map((time: string) => (
                            <SelectItem key={time} value={time}>
                              {formatTimeSlot(time)}
                            </SelectItem>
                          ))
                        ) : selectedDate ? (
                          <SelectItem value="" disabled>
                            {labels.noSlotsAvailable}
                          </SelectItem>
                        ) : null}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roomType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      {labels.roomType}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Woonkamer, Slaapkamer, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="urgency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {labels.urgency}
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={labels.selectUrgency} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">{urgency.low}</SelectItem>
                        <SelectItem value="medium">{urgency.medium}</SelectItem>
                        <SelectItem value="high">{urgency.high}</SelectItem>
                        <SelectItem value="urgent">{urgency.urgent}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {labels.message}
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Vertel ons over uw wensen en vereisten..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                disabled={appointmentMutation.isPending}
                className="flex-1"
              >
                {appointmentMutation.isPending ? labels.submitting : labels.submit}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}