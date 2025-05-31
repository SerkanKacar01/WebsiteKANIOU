/**
 * Appointment Booking Integration with KANIOU Chatbot
 * Handles appointment requests through conversational AI
 */

import { sendAppointmentNotificationToAdmin, sendAppointmentConfirmationToCustomer } from './appointmentEmailService';
import { storage } from './storage';
import type { InsertAppointmentBooking } from '@shared/schema';

// Multilingual appointment detection keywords
const appointmentKeywords = {
  nl: [
    'afspraak', 'appointment', 'inplannen', 'bezoek', 'opmeting', 'meten', 'inmeten',
    'adviseur', 'advies', 'consult', 'showroom', 'komen kijken', 'langskomen',
    'bezoeken', 'ontwerp', 'design', 'planning', 'wanneer', 'datum', 'tijd'
  ],
  fr: [
    'rendez-vous', 'visite', 'mesure', 'mesurer', 'conseil', 'conseiller',
    'showroom', 'venir voir', 'planifier', 'design', 'conception', 'quand', 'date', 'heure'
  ],
  en: [
    'appointment', 'visit', 'measurement', 'measure', 'advice', 'advisor',
    'showroom', 'come see', 'schedule', 'plan', 'design', 'when', 'date', 'time'
  ],
  tr: [
    'randevu', 'ziyaret', 'ölçüm', 'ölçmek', 'danışman', 'tavsiye',
    'showroom', 'gelip görmek', 'planla', 'tasarım', 'ne zaman', 'tarih', 'saat'
  ]
};

// Multilingual chatbot responses for appointment booking
const appointmentResponses = {
  nl: {
    detectedRequest: `Ik zie dat u een afspraak wilt inplannen! 📅

Ik kan u helpen met het inplannen van:
• **Gratis opmeting** - Voor een exacte prijsofferte
• **Ontwerpadvies** - Persoonlijk advies voor uw interieur  
• **Showroom bezoek** - Bekijk onze collectie

Zou u graag een afspraak willen inplannen? Ik kan het boekingsformulier voor u openen.`,

    bookingPrompt: `Perfect! Laat me het afspraakformulier voor u openen. 

U kunt kiezen uit:
• **Opmeting** - We komen langs voor exacte metingen
• **Ontwerpadvies** - Advies over stijl en materialen
• **Showroom bezoek** - Bekijk onze producten

Het formulier opent zich zo automatisch. Heeft u nog vragen over de verschillende opties?`,

    followUp: `Heeft u het afspraakformulier kunnen invullen? Als u hulp nodig heeft of vragen heeft over de verschillende services, help ik u graag verder!`
  },
  fr: {
    detectedRequest: `Je vois que vous souhaitez prendre rendez-vous! 📅

Je peux vous aider à planifier:
• **Prise de mesures gratuite** - Pour un devis précis
• **Conseil en design** - Conseils personnalisés pour votre intérieur
• **Visite du showroom** - Découvrez notre collection

Souhaiteriez-vous prendre rendez-vous? Je peux ouvrir le formulaire de réservation pour vous.`,

    bookingPrompt: `Parfait! Laissez-moi ouvrir le formulaire de rendez-vous pour vous.

Vous pouvez choisir entre:
• **Prise de mesures** - Nous venons prendre les mesures exactes
• **Conseil en design** - Conseils sur le style et les matériaux
• **Visite du showroom** - Découvrez nos produits

Le formulaire va s'ouvrir automatiquement. Avez-vous des questions sur les différentes options?`,

    followUp: `Avez-vous pu remplir le formulaire de rendez-vous? Si vous avez besoin d'aide ou des questions sur nos différents services, je suis là pour vous aider!`
  },
  en: {
    detectedRequest: `I see you'd like to schedule an appointment! 📅

I can help you plan:
• **Free measurement** - For an accurate price quote
• **Design advice** - Personal advice for your interior
• **Showroom visit** - View our collection

Would you like to schedule an appointment? I can open the booking form for you.`,

    bookingPrompt: `Perfect! Let me open the appointment form for you.

You can choose from:
• **Measurement** - We'll visit for exact measurements
• **Design advice** - Advice on style and materials
• **Showroom visit** - View our products

The form will open automatically. Do you have any questions about the different options?`,

    followUp: `Were you able to fill out the appointment form? If you need help or have questions about our different services, I'm happy to help!`
  },
  tr: {
    detectedRequest: `Randevu almak istediğinizi görüyorum! 📅

Size yardımcı olabileceğim hizmetler:
• **Ücretsiz ölçüm** - Kesin fiyat teklifi için
• **Tasarım danışmanlığı** - İç mekanınız için kişisel tavsiye
• **Showroom ziyareti** - Koleksiyonumuzu görün

Randevu almak ister misiniz? Rezervasyon formunu sizin için açabilirim.`,

    bookingPrompt: `Mükemmel! Randevu formunu sizin için açayım.

Şunlar arasından seçebilirsiniz:
• **Ölçüm** - Kesin ölçümler için ziyaret
• **Tasarım danışmanlığı** - Stil ve malzeme tavsiyeleri
• **Showroom ziyareti** - Ürünlerimizi görün

Form otomatik olarak açılacak. Farklı seçenekler hakkında sorularınız var mı?`,

    followUp: `Randevu formunu doldurabildiniz mi? Yardıma ihtiyacınız varsa veya farklı hizmetlerimiz hakkında sorularınız varsa, size yardımcı olmaktan memnuniyet duyarım!`
  }
};

/**
 * Detect if user message contains appointment booking intent
 */
export function detectAppointmentRequest(message: string, language: string = 'nl'): boolean {
  const keywords = appointmentKeywords[language as keyof typeof appointmentKeywords] || appointmentKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  // Check for appointment keywords
  const hasAppointmentKeyword = keywords.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
  
  // Additional contextual checks
  const hasActionWords = /\b(wil|zou|kan|mag|graag|please|would|could|want|wish|möchte|souhaite|istiyorum)\b/i.test(message);
  const hasQuestionWords = /\b(wanneer|when|quand|ne zaman|hoe|how|comment|nasıl)\b/i.test(message);
  
  return hasAppointmentKeyword && (hasActionWords || hasQuestionWords);
}

/**
 * Generate appointment booking response based on language
 */
export function generateAppointmentResponse(
  stage: 'detected' | 'prompt' | 'followup', 
  language: string = 'nl'
): { content: string; shouldOpenForm: boolean; metadata: any } {
  
  const responses = appointmentResponses[language as keyof typeof appointmentResponses] || appointmentResponses.nl;
  
  switch (stage) {
    case 'detected':
      return {
        content: responses.detectedRequest,
        shouldOpenForm: false,
        metadata: {
          type: 'appointment_detected',
          intent: 'appointment_inquiry',
          requiresUserConfirmation: true
        }
      };
      
    case 'prompt':
      return {
        content: responses.bookingPrompt,
        shouldOpenForm: true,
        metadata: {
          type: 'appointment_booking',
          intent: 'open_booking_form',
          action: 'open_appointment_form'
        }
      };
      
    case 'followup':
      return {
        content: responses.followUp,
        shouldOpenForm: false,
        metadata: {
          type: 'appointment_followup',
          intent: 'appointment_support'
        }
      };
      
    default:
      return {
        content: responses.detectedRequest,
        shouldOpenForm: false,
        metadata: { type: 'appointment_default' }
      };
  }
}

/**
 * Process chatbot appointment booking
 */
export async function processChatbotAppointmentBooking(
  appointmentData: InsertAppointmentBooking,
  sessionId: string
): Promise<{ success: boolean; appointmentId?: number; message: string }> {
  
  try {
    // Create appointment with chatbot session ID
    const appointmentWithSession = {
      ...appointmentData,
      sessionId,
      bookedVia: 'chatbot' as const
    };
    
    // Check for available time slots
    const availableSlots = await storage.getAvailableTimeSlots(appointmentData.preferredDate);
    if (!availableSlots.includes(appointmentData.preferredTime)) {
      return {
        success: false,
        message: 'Selected time slot is not available'
      };
    }

    const appointment = await storage.createAppointmentBooking(appointmentWithSession);

    // Send notification emails
    const adminEmailSent = await sendAppointmentNotificationToAdmin(appointment);
    const customerEmailSent = await sendAppointmentConfirmationToCustomer(appointment);

    // Update booking with email status
    await storage.updateAppointmentBooking(appointment.id, {
      confirmationEmailSent: customerEmailSent
    });

    console.log(`📅 Chatbot appointment booking created: ${appointment.id} - ${appointment.appointmentType} on ${appointment.preferredDate} at ${appointment.preferredTime}`);

    return {
      success: true,
      appointmentId: appointment.id,
      message: 'Appointment booking created successfully via chatbot'
    };

  } catch (error) {
    console.error('Error processing chatbot appointment booking:', error);
    return {
      success: false,
      message: 'Failed to create appointment booking'
    };
  }
}

/**
 * Get appointment confirmation message for chatbot
 */
export function getAppointmentConfirmationMessage(
  appointmentId: number,
  appointmentType: string,
  preferredDate: string,
  preferredTime: string,
  language: string = 'nl'
): string {
  
  const confirmationMessages = {
    nl: `✅ **Afspraak Bevestigd!**

Uw afspraak is succesvol ingepland:
• **Type**: ${appointmentType}
• **Datum**: ${new Date(preferredDate).toLocaleDateString('nl-NL')}
• **Tijd**: ${preferredTime}
• **Referentie**: #${appointmentId}

📧 U ontvangt een bevestigingsmail met alle details.
📞 We nemen binnen 24 uur contact met u op om de afspraak definitief te bevestigen.

Heeft u nog vragen over uw afspraak?`,

    fr: `✅ **Rendez-vous Confirmé!**

Votre rendez-vous a été planifié avec succès:
• **Type**: ${appointmentType}
• **Date**: ${new Date(preferredDate).toLocaleDateString('fr-FR')}
• **Heure**: ${preferredTime}
• **Référence**: #${appointmentId}

📧 Vous recevrez un email de confirmation avec tous les détails.
📞 Nous vous contacterons dans les 24 heures pour confirmer définitivement le rendez-vous.

Avez-vous des questions sur votre rendez-vous?`,

    en: `✅ **Appointment Confirmed!**

Your appointment has been successfully scheduled:
• **Type**: ${appointmentType}
• **Date**: ${new Date(preferredDate).toLocaleDateString('en-US')}
• **Time**: ${preferredTime}
• **Reference**: #${appointmentId}

📧 You will receive a confirmation email with all details.
📞 We will contact you within 24 hours to finalize the appointment confirmation.

Do you have any questions about your appointment?`,

    tr: `✅ **Randevu Onaylandı!**

Randevunuz başarıyla planlandı:
• **Tür**: ${appointmentType}
• **Tarih**: ${new Date(preferredDate).toLocaleDateString('tr-TR')}
• **Saat**: ${preferredTime}
• **Referans**: #${appointmentId}

📧 Tüm detayları içeren bir onay e-postası alacaksınız.
📞 Randevuyu kesin olarak onaylamak için 24 saat içinde sizinle iletişime geçeceğiz.

Randevunuzla ilgili sorularınız var mı?`
  };

  return confirmationMessages[language as keyof typeof confirmationMessages] || confirmationMessages.nl;
}

/**
 * Check if user is asking about appointment booking in their message
 */
export function isAppointmentBookingQuery(message: string, language: string = 'nl'): boolean {
  const appointmentPatterns = {
    nl: [
      /afspraak.*maken/i,
      /afspraak.*inplannen/i,
      /wanneer.*beschikbaar/i,
      /opmeting.*plannen/i,
      /bezoek.*inplannen/i,
      /advies.*gesprek/i
    ],
    fr: [
      /rendez.vous.*prendre/i,
      /rendez.vous.*planifier/i,
      /quand.*disponible/i,
      /mesure.*planifier/i,
      /visite.*planifier/i,
      /conseil.*rendez.vous/i
    ],
    en: [
      /appointment.*book/i,
      /appointment.*schedule/i,
      /when.*available/i,
      /measurement.*schedule/i,
      /visit.*schedule/i,
      /advice.*appointment/i
    ],
    tr: [
      /randevu.*al/i,
      /randevu.*planla/i,
      /ne.*zaman.*müsait/i,
      /ölçüm.*planla/i,
      /ziyaret.*planla/i,
      /danışman.*randevu/i
    ]
  };

  const patterns = appointmentPatterns[language as keyof typeof appointmentPatterns] || appointmentPatterns.nl;
  return patterns.some(pattern => pattern.test(message));
}