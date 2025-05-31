/**
 * Appointment Email Service for KANIOU
 * Handles all appointment-related email notifications
 */

import { sendEmail } from './emailService';
import { AppointmentBooking } from '@shared/schema';

// Multilingual appointment type labels
const appointmentTypeLabels = {
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

// Multilingual email templates
const emailTemplates = {
  adminNotification: {
    nl: {
      subject: '📅 Nieuwe Afspraak Aanvraag van {{name}}',
      greeting: 'Nieuwe afspraak aanvraag ontvangen',
      appointmentDetails: 'Afspraak Details',
      customerInfo: 'Klant Informatie'
    },
    fr: {
      subject: '📅 Nouvelle Demande de Rendez-vous de {{name}}',
      greeting: 'Nouvelle demande de rendez-vous reçue',
      appointmentDetails: 'Détails du Rendez-vous',
      customerInfo: 'Informations Client'
    },
    en: {
      subject: '📅 New Appointment Request from {{name}}',
      greeting: 'New appointment request received',
      appointmentDetails: 'Appointment Details',
      customerInfo: 'Customer Information'
    },
    tr: {
      subject: '📅 {{name}} Adlı Müşteriden Yeni Randevu Talebi',
      greeting: 'Yeni randevu talebi alındı',
      appointmentDetails: 'Randevu Detayları',
      customerInfo: 'Müşteri Bilgileri'
    }
  },
  customerConfirmation: {
    nl: {
      subject: '✅ Uw afspraak aanvraag is ontvangen - KANIOU',
      greeting: 'Bedankt voor uw afspraak aanvraag!',
      message: 'We hebben uw aanvraag ontvangen en nemen binnen 24 uur contact met u op om uw afspraak te bevestigen.',
      appointmentSummary: 'Samenvatting van uw aanvraag',
      nextSteps: 'Volgende Stappen',
      step1: '• We beoordelen uw aanvraag',
      step2: '• Een van onze experts neemt contact met u op',
      step3: '• We bevestigen datum en tijd',
      step4: '• U ontvangt een kalender uitnodiging',
      footer: 'Met vriendelijke groet,\nHet KANIOU Team'
    },
    fr: {
      subject: '✅ Votre demande de rendez-vous a été reçue - KANIOU',
      greeting: 'Merci pour votre demande de rendez-vous !',
      message: 'Nous avons reçu votre demande et vous contacterons dans les 24 heures pour confirmer votre rendez-vous.',
      appointmentSummary: 'Résumé de votre demande',
      nextSteps: 'Prochaines Étapes',
      step1: '• Nous évaluons votre demande',
      step2: '• Un de nos experts vous contactera',
      step3: '• Nous confirmons la date et l\'heure',
      step4: '• Vous recevrez une invitation de calendrier',
      footer: 'Cordialement,\nL\'équipe KANIOU'
    },
    en: {
      subject: '✅ Your appointment request has been received - KANIOU',
      greeting: 'Thank you for your appointment request!',
      message: 'We have received your request and will contact you within 24 hours to confirm your appointment.',
      appointmentSummary: 'Summary of your request',
      nextSteps: 'Next Steps',
      step1: '• We review your request',
      step2: '• One of our experts will contact you',
      step3: '• We confirm date and time',
      step4: '• You will receive a calendar invitation',
      footer: 'Best regards,\nThe KANIOU Team'
    },
    tr: {
      subject: '✅ Randevu talebiniz alındı - KANIOU',
      greeting: 'Randevu talebiniz için teşekkürler!',
      message: 'Talebinizi aldık ve 24 saat içinde randevunuzu onaylamak için sizinle iletişime geçeceğiz.',
      appointmentSummary: 'Talebinizin özeti',
      nextSteps: 'Sonraki Adımlar',
      step1: '• Talebinizi değerlendiriyoruz',
      step2: '• Uzmanlarımızdan biri sizinle iletişime geçecek',
      step3: '• Tarih ve saati onaylıyoruz',
      step4: '• Takvim daveti alacaksınız',
      footer: 'Saygılarımızla,\nKANIOU Ekibi'
    }
  }
};

/**
 * Send appointment notification to admin (info@kaniou.be)
 */
export async function sendAppointmentNotificationToAdmin(appointment: AppointmentBooking): Promise<boolean> {
  try {
    const language = appointment.language || 'nl';
    const template = emailTemplates.adminNotification[language as keyof typeof emailTemplates.adminNotification];
    const appointmentLabel = appointmentTypeLabels[language as keyof typeof appointmentTypeLabels][appointment.appointmentType as keyof typeof appointmentTypeLabels.nl];

    const subject = template.subject.replace('{{name}}', appointment.fullName);

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f5f3f0 0%, #e8e4df 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .appointment-card { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .urgent { background: #fff3cd; border-left-color: #ffc107; }
        .high { background: #f8d7da; border-left-color: #dc3545; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #d4af37; margin: 0;">🏢 KANIOU</h1>
            <h2 style="color: #666; margin: 10px 0 0 0;">${template.greeting}</h2>
        </div>
        <div class="content">
            <div class="appointment-card ${appointment.urgency === 'urgent' ? 'urgent' : appointment.urgency === 'high' ? 'high' : ''}">
                <h3 style="margin-top: 0; color: #d4af37;">📅 ${template.appointmentDetails}</h3>
                
                <div class="detail-row">
                    <span class="label">Type:</span>
                    <span class="value">${appointmentLabel}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Datum:</span>
                    <span class="value">${new Date(appointment.preferredDate).toLocaleDateString(language === 'nl' ? 'nl-NL' : language === 'fr' ? 'fr-FR' : language === 'tr' ? 'tr-TR' : 'en-US')}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Tijd:</span>
                    <span class="value">${appointment.preferredTime}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Urgentie:</span>
                    <span class="value">${appointment.urgency?.toUpperCase()}</span>
                </div>
                ${appointment.roomType ? `
                <div class="detail-row">
                    <span class="label">Ruimte:</span>
                    <span class="value">${appointment.roomType}</span>
                </div>
                ` : ''}
                ${appointment.message ? `
                <div class="detail-row">
                    <span class="label">Bericht:</span>
                    <span class="value">${appointment.message}</span>
                </div>
                ` : ''}
            </div>

            <div class="appointment-card">
                <h3 style="margin-top: 0; color: #d4af37;">👤 ${template.customerInfo}</h3>
                
                <div class="detail-row">
                    <span class="label">Naam:</span>
                    <span class="value">${appointment.fullName}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${appointment.email}">${appointment.email}</a></span>
                </div>
                <div class="detail-row">
                    <span class="label">Telefoon:</span>
                    <span class="value"><a href="tel:${appointment.phone}">${appointment.phone}</a></span>
                </div>
                <div class="detail-row">
                    <span class="label">Taal:</span>
                    <span class="value">${appointment.language?.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Geboekt via:</span>
                    <span class="value">${appointment.bookedVia}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Aangemaakt:</span>
                    <span class="value">${appointment.createdAt?.toLocaleString('nl-BE', { timeZone: 'Europe/Brussels' })}</span>
                </div>
            </div>

            <p style="color: #666; font-style: italic; margin-top: 30px;">
                💡 Tip: Neem binnen 24 uur contact op om de beste klantenservice te garanderen.
            </p>
        </div>
    </div>
</body>
</html>
    `;

    const emailSent = await sendEmail({
      to: 'info@kaniou.be',
      subject,
      html: emailContent
    });

    if (emailSent) {
      console.log(`📧 Appointment notification sent to admin for booking ID: ${appointment.id}`);
    }

    return emailSent;

  } catch (error) {
    console.error('Error sending appointment notification to admin:', error);
    return false;
  }
}

/**
 * Send appointment confirmation to customer
 */
export async function sendAppointmentConfirmationToCustomer(appointment: AppointmentBooking): Promise<boolean> {
  try {
    const language = appointment.language || 'nl';
    const template = emailTemplates.customerConfirmation[language as keyof typeof emailTemplates.customerConfirmation];
    const appointmentLabel = appointmentTypeLabels[language as keyof typeof appointmentTypeLabels][appointment.appointmentType as keyof typeof appointmentTypeLabels.nl];

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .appointment-summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d4af37; }
        .next-steps { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
        .steps-list { color: #1976d2; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">✅ KANIOU</h1>
            <h2 style="margin: 10px 0 0 0; font-weight: normal;">${template.greeting}</h2>
        </div>
        <div class="content">
            <p style="font-size: 16px; color: #666;">${template.message}</p>

            <div class="appointment-summary">
                <h3 style="margin-top: 0; color: #d4af37;">📋 ${template.appointmentSummary}</h3>
                
                <div class="detail-row">
                    <span class="label">Type:</span>
                    <span class="value">${appointmentLabel}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Datum:</span>
                    <span class="value">${new Date(appointment.preferredDate).toLocaleDateString(language === 'nl' ? 'nl-NL' : language === 'fr' ? 'fr-FR' : language === 'tr' ? 'tr-TR' : 'en-US')}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Tijd:</span>
                    <span class="value">${appointment.preferredTime}</span>
                </div>
                ${appointment.roomType ? `
                <div class="detail-row">
                    <span class="label">Ruimte:</span>
                    <span class="value">${appointment.roomType}</span>
                </div>
                ` : ''}
            </div>

            <div class="next-steps">
                <h3 style="margin-top: 0; color: #1976d2;">🚀 ${template.nextSteps}</h3>
                <div class="steps-list">
                    ${template.step1}<br>
                    ${template.step2}<br>
                    ${template.step3}<br>
                    ${template.step4}
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #fff3e0; border-radius: 8px; text-align: center;">
                <h3 style="color: #ef6c00; margin-top: 0;">📞 Contact</h3>
                <p style="margin: 5px 0; color: #666;">
                    <strong>Email:</strong> info@kaniou.be<br>
                    <strong>Website:</strong> www.kaniou.be
                </p>
            </div>

            <p style="margin-top: 30px; color: #666; text-align: center;">
                ${template.footer}
            </p>
        </div>
    </div>
</body>
</html>
    `;

    const emailSent = await sendEmail({
      to: appointment.email,
      subject: template.subject,
      html: emailContent
    });

    if (emailSent) {
      console.log(`📧 Appointment confirmation sent to customer: ${appointment.email}`);
    }

    return emailSent;

  } catch (error) {
    console.error('Error sending appointment confirmation to customer:', error);
    return false;
  }
}

/**
 * Send appointment reminder email (24 hours before)
 */
export async function sendAppointmentReminder(appointment: AppointmentBooking): Promise<boolean> {
  try {
    const language = appointment.language || 'nl';
    const appointmentLabel = appointmentTypeLabels[language as keyof typeof appointmentTypeLabels][appointment.appointmentType as keyof typeof appointmentTypeLabels.nl];

    const reminderTemplates = {
      nl: {
        subject: '⏰ Herinnering: Uw afspraak morgen bij KANIOU',
        greeting: 'Herinnering voor uw afspraak',
        message: 'Dit is een vriendelijke herinnering dat u morgen een afspraak heeft bij KANIOU.',
        preparation: 'Voorbereiding voor uw bezoek',
        tip1: '• Zorg ervoor dat de ruimte toegankelijk is',
        tip2: '• Heb uw wensen en inspiratie bij de hand',
        tip3: '• Bereid eventuele vragen voor',
        contact: 'Bij vragen of wijzigingen, neem contact op'
      },
      fr: {
        subject: '⏰ Rappel: Votre rendez-vous demain chez KANIOU',
        greeting: 'Rappel pour votre rendez-vous',
        message: 'Ceci est un rappel amical que vous avez un rendez-vous demain chez KANIOU.',
        preparation: 'Préparation pour votre visite',
        tip1: '• Assurez-vous que la pièce est accessible',
        tip2: '• Ayez vos souhaits et inspirations à portée de main',
        tip3: '• Préparez vos questions éventuelles',
        contact: 'Pour toute question ou modification, contactez-nous'
      },
      en: {
        subject: '⏰ Reminder: Your appointment tomorrow at KANIOU',
        greeting: 'Reminder for your appointment',
        message: 'This is a friendly reminder that you have an appointment tomorrow at KANIOU.',
        preparation: 'Preparation for your visit',
        tip1: '• Make sure the room is accessible',
        tip2: '• Have your wishes and inspiration ready',
        tip3: '• Prepare any questions you may have',
        contact: 'For questions or changes, please contact us'
      },
      tr: {
        subject: '⏰ Hatırlatma: Yarın KANIOU\'daki randevunuz',
        greeting: 'Randevunuz için hatırlatma',
        message: 'Bu, yarın KANIOU\'da bir randevunuz olduğuna dair dostça bir hatırlatmadır.',
        preparation: 'Ziyaretiniz için hazırlık',
        tip1: '• Odanın erişilebilir olduğundan emin olun',
        tip2: '• İsteklerinizi ve ilham kaynaklarınızı hazır bulundurun',
        tip3: '• Olası sorularınızı hazırlayın',
        contact: 'Sorular veya değişiklikler için bizimle iletişime geçin'
      }
    };

    const template = reminderTemplates[language as keyof typeof reminderTemplates];

    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .appointment-details { background: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff9800; }
        .preparation-tips { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
        .label { font-weight: bold; color: #666; }
        .value { color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">⏰ KANIOU</h1>
            <h2 style="margin: 10px 0 0 0; font-weight: normal;">${template.greeting}</h2>
        </div>
        <div class="content">
            <p style="font-size: 16px; color: #666;">${template.message}</p>

            <div class="appointment-details">
                <h3 style="margin-top: 0; color: #ff9800;">📅 Afspraak Details</h3>
                
                <div class="detail-row">
                    <span class="label">Type:</span>
                    <span class="value">${appointmentLabel}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Datum:</span>
                    <span class="value">${new Date(appointment.preferredDate).toLocaleDateString(language === 'nl' ? 'nl-NL' : language === 'fr' ? 'fr-FR' : language === 'tr' ? 'tr-TR' : 'en-US')}</span>
                </div>
                <div class="detail-row">
                    <span class="label">Tijd:</span>
                    <span class="value">${appointment.preferredTime}</span>
                </div>
            </div>

            <div class="preparation-tips">
                <h3 style="margin-top: 0; color: #2e7d32;">💡 ${template.preparation}</h3>
                <div style="color: #2e7d32;">
                    ${template.tip1}<br>
                    ${template.tip2}<br>
                    ${template.tip3}
                </div>
            </div>

            <div style="margin-top: 30px; padding: 20px; background: #f3e5f5; border-radius: 8px; text-align: center;">
                <h3 style="color: #7b1fa2; margin-top: 0;">📞 ${template.contact}</h3>
                <p style="margin: 5px 0; color: #666;">
                    <strong>Email:</strong> info@kaniou.be<br>
                    <strong>Website:</strong> www.kaniou.be
                </p>
            </div>
        </div>
    </div>
</body>
</html>
    `;

    const emailSent = await sendEmail({
      to: appointment.email,
      subject: template.subject,
      html: emailContent
    });

    if (emailSent) {
      console.log(`📧 Appointment reminder sent to customer: ${appointment.email}`);
    }

    return emailSent;

  } catch (error) {
    console.error('Error sending appointment reminder:', error);
    return false;
  }
}