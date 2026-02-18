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

    if (data.notifyByEmail && data.notificationEmail) {
      await this.sendEmailNotification(data, statusMessage);
    }

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

      console.log(`📧 Notificatie zou verzonden worden naar ${data.notificationEmail}: ${subject}`);

      await this.logNotification(
        data.orderId,
        "email",
        "sent",
        data.notificationEmail,
      );
    } catch (error: any) {
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
      console.log(
        `WhatsApp notification would be sent to ${data.notificationPhone}:`,
      );
      console.log(
        `KANIOU Update: ${statusMessage} voor bestelling ${data.orderNumber}`,
      );

      await this.logNotification(
        data.orderId,
        "whatsapp",
        "sent",
        undefined,
        undefined,
        data.notificationPhone,
      );
    } catch (error: any) {
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
