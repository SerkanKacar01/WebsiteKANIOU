/**
 * Email configuration settings
 * Customize these values to match your business information
 */

export const emailConfig = {
  // The email that will receive form notifications (your business email)
  notificationEmail: 'info@kaniou.be',
  
  // The address that will appear as the sender (should be verified in SendGrid)
  senderEmail: 'notifications@yourdomain.com',
  
  // Your business name (will appear in email subjects and content)
  businessName: 'Kaniou',
  
  // Contact form settings
  contactForm: {
    subjectPrefix: '[Contact Form] ',
    successMessage: 'Your message has been received. We will get back to you soon.',
  },
  
  // Quote request settings
  quoteForm: {
    subjectPrefix: '[Quote Request] ',
    successMessage: 'Your quote request has been received. We will contact you shortly with a quote.',
  }
};