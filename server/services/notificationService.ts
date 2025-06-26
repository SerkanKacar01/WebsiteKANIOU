import { PaymentOrder } from "@shared/schema";
import { sendEmail } from "./email";
import { emailConfig } from "../config/email";

export interface NotificationTrigger {
  orderId: number;
  newStatus: string;
  previousStatus?: string;
  customerEmail: string;
  customerPhone?: string | null;
  notifyByEmail: boolean;
  notifyByWhatsapp: boolean;
}

export class NotificationService {
  static async sendStatusUpdateNotification(trigger: NotificationTrigger): Promise<void> {
    try {
      // Send email notification if enabled
      if (trigger.notifyByEmail) {
        await this.sendEmailNotification(trigger);
      }
      
      // Send WhatsApp notification if enabled (to be implemented with Twilio)
      if (trigger.notifyByWhatsapp && trigger.customerPhone) {
        await this.sendWhatsAppNotification(trigger);
      }
    } catch (error) {
      console.error('Notification service error:', error);
      // In production, this would be logged and retried
    }
  }

  private static async sendEmailNotification(trigger: NotificationTrigger): Promise<void> {
    const statusMessages = {
      'pending': 'Uw bestelling wordt verwerkt',
      'processing': 'Uw bestelling is verwerkt en gaat naar productie',
      'production': 'Uw bestelling is in productie',
      'ready': 'Uw bestelling is gereed voor levering',
      'delivery': 'We nemen contact met u op voor de levering',
      'completed': 'Uw bestelling is voltooid'
    };

    const subject = `KANIOU - Status update voor bestelling #${trigger.orderId}`;
    const statusMessage = statusMessages[trigger.newStatus as keyof typeof statusMessages] || 'Status bijgewerkt';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2C3E50;">Bestelling Status Update</h2>
        <p>Beste klant,</p>
        <p>De status van uw bestelling #${trigger.orderId} is bijgewerkt:</p>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #E6C988; margin: 0;">${statusMessage}</h3>
        </div>
        <p>U kunt de volledige status van uw bestelling bekijken op onze website door uw bestelnummer in te voeren.</p>
        <p>Met vriendelijke groet,<br>Het KANIOU team</p>
      </div>
    `;

    await sendEmail({
      from: emailConfig.senderEmail,
      to: trigger.customerEmail,
      subject: subject,
      html: html
    });
  }

  private static async sendWhatsAppNotification(trigger: NotificationTrigger): Promise<void> {
    // Placeholder for WhatsApp integration with Twilio
    // This would be implemented when Twilio credentials are available
    console.log(`WhatsApp notification would be sent to ${trigger.customerPhone} for order ${trigger.orderId}`);
    
    // Future implementation:
    // const twilioClient = new Twilio(accountSid, authToken);
    // await twilioClient.messages.create({
    //   from: 'whatsapp:+your_twilio_number',
    //   to: `whatsapp:${trigger.customerPhone}`,
    //   body: `KANIOU: Status update voor uw bestelling #${trigger.orderId}. Bezoek onze website voor meer details.`
    // });
  }

  // Utility method to check if notifications should be sent for a status change
  static shouldSendNotification(oldStatus: string | null, newStatus: string): boolean {
    // Don't send notifications for same status
    if (oldStatus === newStatus) return false;
    
    // Only send notifications for meaningful status changes
    const notifiableStatuses = ['processing', 'production', 'ready', 'delivery', 'completed'];
    return notifiableStatuses.includes(newStatus);
  }
}