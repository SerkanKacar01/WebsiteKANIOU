# Website Email Notification System

## Overview
This project includes an integrated email notification system that sends you automated emails when users submit forms on your website. When a visitor fills out a contact form or quote request form, you'll receive a beautifully formatted email notification with all their information.

## Features
- Email notifications for contact form submissions
- Email notifications for quote request submissions
- Both HTML and plain text email formats for maximum compatibility
- Secure API key storage through environment variables
- Configurable email content, addresses, and subject lines

## Configuration
You can customize all email notification settings in `server/config/email.ts`:

```typescript
// Example configurations you can modify
{
  // The email that will receive form notifications
  notificationEmail: 'info@kaniou.be',
  
  // The address that will appear as the sender 
  // Important: This should be verified in SendGrid
  senderEmail: 'notifications@yourdomain.com',
  
  // Your business name (appears in email content)
  businessName: 'Kaniou',
  
  // Customize email subject prefixes
  contactForm: {
    subjectPrefix: '[Contact Form] ',
    successMessage: 'Your message has been received. We will get back to you soon.',
  },
  
  quoteForm: {
    subjectPrefix: '[Quote Request] ',
    successMessage: 'Your quote request has been received. We will contact you shortly with a quote.',
  }
}
```

## SendGrid Setup
This project uses SendGrid to deliver emails. To ensure reliable delivery:

1. Sign up for a SendGrid account at sendgrid.com
2. Create a verified sender identity for your domain
3. Create an API key with "Mail Send" permissions
4. Set the API key as an environment variable named `SENDGRID_API_KEY`

## Technical Details
- All email sending functionality is contained in `server/services/email.ts`
- Email templates are defined as functions that generate HTML content
- Both the contact and quote request APIs include email notifications
- Form submissions are still stored in the database even if email sending fails