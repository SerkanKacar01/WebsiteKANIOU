import { sendMailgunEmail } from "../mailgun/sendMail.js";
import { storage } from "../storage.js";

interface OrderNotificationData {
  orderId: number;
  orderNumber: string;
  customerName: string;
  newStatus: string;
  productType: string;
  notifyByEmail: boolean;
  notifyByWhatsapp: boolean;
  notificationEmail?: string;
  notificationPhone?: string;
}

export class NotificationService {
  async sendOrderStatusUpdate(data: OrderNotificationData): Promise<void> {
    const statusMessages = {
      pending: "Uw bestelling wordt verwerkt",
      Nieuw: "Uw bestelling is ontvangen",
      "Bestelling in verwerking": "Uw bestelling wordt verwerkt",
      "Bestelling verwerkt": "Uw bestelling is verwerkt en gaat naar productie",
      "Bestelling in productie": "Uw bestelling is in productie",
      "Bestelling is gereed": "Uw bestelling is gereed voor levering",
      "U wordt gebeld voor levering":
        "We nemen binnenkort contact op voor de levering",
    };

    const statusMessage =
      statusMessages[data.newStatus as keyof typeof statusMessages] ||
      data.newStatus;

    // Send email notification if enabled
    if (data.notifyByEmail && data.notificationEmail) {
      await this.sendEmailNotification(data, statusMessage);
    }

    // Send WhatsApp notification if enabled (placeholder for Twilio integration)
    if (data.notifyByWhatsapp && data.notificationPhone) {
      await this.sendWhatsAppNotification(data, statusMessage);
    }
  }

  private async sendEmailNotification(
    data: OrderNotificationData,
    statusMessage: string,
  ): Promise<void> {
    try {
      const subject = `KANIOU - Update bestelling ${data.orderNumber}`;
      const emailBody = `
Beste {{customerName}},

We hopen dat alles goed met u gaat.  
Dit is een automatische update over uw maatwerkbestelling bij **KANIOU Zilvernaald || Gordijnen & Zonweringen**.

🧾 **Bestelgegevens**
━━━━━━━━━━━━━━━━━━━  
📦 Bestelnummer: ${data.orderNumber}
🛍️ Producttype: ${data.productType}
📋 Huidige status: ${statusMessage}

📦 **Volg uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
U kunt de voortgang van uw bestelling op elk moment bekijken via de volgende link: https://kaniou.be/bestelling-status/${data.orderId}

🛠 **Over uw bestelling**  
━━━━━━━━━━━━━━━━━━━  
Uw bestelling wordt speciaal voor u op maat gemaakt met oog voor detail en kwaliteit.
We houden u uiteraard op de hoogte zodra uw bestelling gereed is voor levering of plaatsing.

📩 **Vragen of hulp nodig?**  
━━━━━━━━━━━━━━━━━━━  
Heeft u vragen over uw bestelling, levering of iets anders? Neem gerust contact met ons op:  
📧 E-mail: info@kaniou.be  
📞 Telefoon: +32 467 85 64 05 
🌐 Website: www.kaniou.be

🛍 Bedankt voor uw vertrouwen in **KANIOU Zilvernaald || Gordijnen & Zonweringen** –  
Dé specialist in premium gordijnen en zonwering op maat.

Met vriendelijke groet,  
**Team KANIOU**  

Accountmanager
Mr. Serkan KACAR
      `.trim();

      await sendMailgunEmail(data.notificationEmail!, subject, emailBody);

      // Log the notification
      await this.logNotification(
        data.orderId,
        "email",
        "sent",
        data.notificationEmail,
      );
    } catch (error) {
      console.error("Email notification failed:", error);
      await this.logNotification(
        data.orderId,
        "email",
        "failed",
        data.notificationEmail,
        error.message,
      );
    }
  }

  private async sendWhatsAppNotification(
    data: OrderNotificationData,
    statusMessage: string,
  ): Promise<void> {
    try {
      // Placeholder for Twilio WhatsApp integration
      // This would be implemented when Twilio credentials are provided
      console.log(
        `WhatsApp notification would be sent to ${data.notificationPhone}:`,
      );
      console.log(
        `KANIOU Update: ${statusMessage} voor bestelling ${data.orderNumber}`,
      );

      // For now, log as sent (demo mode)
      await this.logNotification(
        data.orderId,
        "whatsapp",
        "sent",
        undefined,
        undefined,
        data.notificationPhone,
      );
    } catch (error) {
      console.error("WhatsApp notification failed:", error);
      await this.logNotification(
        data.orderId,
        "whatsapp",
        "failed",
        undefined,
        error.message,
        data.notificationPhone,
      );
    }
  }

  private async logNotification(
    orderId: number,
    type: "email" | "whatsapp",
    status: "sent" | "failed",
    email?: string,
    errorMessage?: string,
    phone?: string,
  ): Promise<void> {
    try {
      await storage.createNotificationLog({
        orderId,
        notificationType: type,
        status,
        recipientEmail: email || null,
        recipientPhone: phone || null,
        errorMessage: errorMessage || null,
      });
    } catch (error) {
      console.error("Failed to log notification:", error);
    }
  }
}

export const notificationService = new NotificationService();
