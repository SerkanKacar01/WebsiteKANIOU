import { createMollieClient } from '@mollie/api-client';
import type { PaymentCreateParams, Payment } from '@mollie/api-client';
import { storage } from '../storage';
import { InsertPaymentOrder } from '@shared/schema';

// Initialize Mollie client with API key from environment
const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY || '',
});

export interface PaymentCreationData {
  amount: number;
  currency?: string;
  description: string;
  customerName: string;
  customerEmail: string;
  redirectUrl: string;
  webhookUrl?: string;
  productDetails?: any;
  customerDetails?: any;
}

export class MolliePaymentService {
  /**
   * Create a new payment with Mollie
   */
  async createPayment(data: PaymentCreationData): Promise<{
    paymentId: string;
    checkoutUrl: string;
    orderId: number;
  }> {
    // Validate API key exists
    if (!process.env.MOLLIE_API_KEY) {
      throw new Error('Mollie API key not configured');
    }

    // Prepare payment parameters for Mollie
    const paymentParams: PaymentCreateParams = {
      amount: {
        currency: data.currency || 'EUR',
        value: data.amount.toFixed(2),
      },
      description: data.description,
      redirectUrl: data.redirectUrl,
      metadata: {
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        orderId: Date.now().toString(), // Temporary ID for reference
      },
    };

    // Add webhook URL only for production environments
    if (data.webhookUrl && !data.webhookUrl.includes('localhost') && !data.redirectUrl.includes('localhost')) {
      paymentParams.webhookUrl = data.webhookUrl;
    }

    try {
      // Create payment with Mollie
      const payment: Payment = await mollieClient.payments.create(paymentParams);

      // Store payment order in database - use direct database insert
      const savedOrder = await storage.createPaymentOrderWithMollieId({
        molliePaymentId: payment.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        amount: data.amount,
        currency: data.currency || 'EUR',
        description: data.description,
        redirectUrl: data.redirectUrl,
        webhookUrl: data.webhookUrl,
        checkoutUrl: payment.getCheckoutUrl() || '',
        productDetails: data.productDetails,
        customerDetails: data.customerDetails,
        mollieStatus: payment.status,
        status: 'pending',
      });

      return {
        paymentId: payment.id,
        checkoutUrl: payment.getCheckoutUrl() || '',
        orderId: savedOrder.id,
      };
    } catch (error) {
      console.error('Mollie payment creation failed:', error);
      throw new Error('Failed to create payment. Please try again.');
    }
  }

  /**
   * Handle webhook from Mollie when payment status changes
   */
  async handleWebhook(paymentId: string): Promise<void> {
    try {
      // Get payment details from Mollie
      const payment = await mollieClient.payments.get(paymentId);
      
      // Find corresponding order in database
      const order = await storage.getPaymentOrderByMollieId(paymentId);
      if (!order) {
        console.error(`Order not found for Mollie payment ID: ${paymentId}`);
        return;
      }

      // Map Mollie status to our internal status
      let internalStatus = 'pending';
      switch (payment.status) {
        case 'paid':
          internalStatus = 'paid';
          break;
        case 'failed':
        case 'canceled':
          internalStatus = 'failed';
          break;
        case 'expired':
          internalStatus = 'expired';
          break;
        default:
          internalStatus = 'pending';
      }

      // Update order status
      await storage.updatePaymentOrder(order.id, {
        status: internalStatus,
        mollieStatus: payment.status,
        paidAt: payment.status === 'paid' ? new Date(payment.paidAt || Date.now()) : undefined,
      });

      // Additional processing for successful payments
      if (payment.status === 'paid') {
        await this.onPaymentSuccess(order.id);
      }

    } catch (error) {
      console.error('Webhook processing failed:', error);
      throw error;
    }
  }

  /**
   * Get payment status from Mollie
   */
  async getPaymentStatus(paymentId: string): Promise<{
    status: string;
    isPaid: boolean;
    paidAt?: string;
  }> {
    try {
      const payment = await mollieClient.payments.get(paymentId);
      
      return {
        status: payment.status,
        isPaid: payment.status === 'paid',
        paidAt: payment.paidAt || undefined,
      };
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw new Error('Failed to retrieve payment status');
    }
  }

  /**
   * Process successful payment
   */
  private async onPaymentSuccess(orderId: number): Promise<void> {
    try {
      const order = await storage.getPaymentOrderById(orderId);
      if (!order) return;

      // Clear customer's shopping cart if session-based
      if (order.customerDetails?.sessionId) {
        await storage.clearCart(order.customerDetails.sessionId);
      }

      // Send confirmation email (implement as needed)
      // await this.sendOrderConfirmationEmail(order);

      console.log(`Payment successful for order ${orderId}`);
    } catch (error) {
      console.error('Failed to process successful payment:', error);
    }
  }

  /**
   * Validate webhook signature (recommended for production)
   */
  validateWebhookSignature(paymentId: string, signature: string): boolean {
    // Implementation depends on your webhook security setup
    // For now, return true - implement proper validation in production
    return true;
  }

  /**
   * Cancel a payment
   */
  async cancelPayment(paymentId: string): Promise<boolean> {
    try {
      const payment = await mollieClient.payments.get(paymentId);
      
      if (payment.isCancelable()) {
        await mollieClient.payments.cancel(paymentId);
        
        // Update order status
        const order = await storage.getPaymentOrderByMollieId(paymentId);
        if (order) {
          await storage.updatePaymentOrder(order.id, {
            status: 'cancelled',
            mollieStatus: 'canceled',
          });
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to cancel payment:', error);
      return false;
    }
  }
}

export const molliePaymentService = new MolliePaymentService();