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
      "Uw bericht is succesvol ontvangen. Een medewerker van ons team neemt zo spoedig mogelijk contact met u op. Hartelijk dank voor uw interesse in KANIOU Zilvernaald.",
  },

  // Quote request settings
  quoteForm: {
    subjectPrefix: "[Quote Request] ",
    successMessage:
      "Uw offerteaanvraag is succesvol ingediend. Ons team zal de gegevens zorgvuldig bekijken en neemt binnenkort contact met u op met een op maat gemaakte prijsofferte.",
  },
};
