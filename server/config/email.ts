/**
 * Email configuration settings
 * Customize these values to match your business information
 */

export const emailConfig = {
  // The email that will receive form notifications (your business email)
  notificationEmail: "info@kaniou.be", // Confirmed email address for submissions

  // The address that will appear as the sender (should be verified in SendGrid)
  senderEmail: "info@kaniou.be", // Using your domain for better deliverability

  // Your business name (will appear in email subjects and content)
  businessName: "KANIOU || Gordijnen & Zonweringen",

  // Contact form settings
  contactForm: {
    subjectPrefix: "[Contact Form] ",
    successMessage:
      "Uw bericht is succesvol ontvangen via info@kaniou.be. Een medewerker van ons team neemt zo spoedig mogelijk contact met u op. We gebruiken uw e-mailadres alleen voor contactdoeleinden en respecteren uw privacy. Hartelijk dank voor uw interesse in KANIOU Zilvernaald.",
  },

  // Quote request settings
  quoteForm: {
    subjectPrefix: "[Quote Request] ",
    successMessage:
      "Uw offerteaanvraag is succesvol ingediend naar info@kaniou.be. Ons team zal de gegevens zorgvuldig bekijken en neemt binnenkort contact met u op met een op maat gemaakte prijsofferte. We gebruiken uw e-mailadres alleen voor offertes en respecteren uw privacy.",
  },
};
