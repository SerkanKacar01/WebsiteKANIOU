import {
  categories,
  Category,
  InsertCategory,
  products,
  Product,
  InsertProduct,
  galleryItems,
  GalleryItem,
  InsertGalleryItem,
  testimonials,
  Testimonial,
  InsertTestimonial,
  quoteRequests,
  QuoteRequest,
  InsertQuoteRequest,
  contactSubmissions,
  ContactSubmission,
  InsertContactSubmission,
  paymentOrders,
  PaymentOrder,
  InsertPaymentOrder,
  adminUsers,
  AdminUser,
  InsertAdminUser,
  adminSessions,
  AdminSession,
  InsertAdminSession,
  notificationLogs,
  NotificationLog,
  InsertNotificationLog,
  orderDocuments,
  OrderDocument,
  InsertOrderDocument,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, lt, and } from "drizzle-orm";

declare global {
  var memoryOrders: PaymentOrder[] | undefined;
}

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemById(id: number): Promise<GalleryItem | undefined>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Payment Orders
  createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder>;
  getPaymentOrderById(id: number): Promise<PaymentOrder | undefined>;
  getPaymentOrderByOrderNumber(orderNumber: string): Promise<PaymentOrder | undefined>;
  getPaymentOrderByBonnummer(bonnummer: string): Promise<PaymentOrder | undefined>;
  getPaymentOrders(): Promise<PaymentOrder[]>;
  deletePaymentOrder(id: number): Promise<void>;
  
  // Admin Authentication
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminLastLogin(id: number): Promise<void>;
  
  // Admin Sessions
  createAdminSession(session: InsertAdminSession): Promise<AdminSession>;
  getAdminSessionById(sessionId: string): Promise<AdminSession | undefined>;
  deleteAdminSession(sessionId: string): Promise<void>;
  cleanupExpiredSessions(): Promise<void>;
  
  // Order Management
  updatePaymentOrder(id: number, updates: Partial<PaymentOrder>): Promise<void>;
  
  // Order Documents
  createOrderDocument(document: InsertOrderDocument): Promise<OrderDocument>;
  getOrderDocuments(orderId: number): Promise<OrderDocument[]>;
  deleteOrderDocument(id: number): Promise<void>;
  updateOrderDocumentVisibility(id: number, isVisible: boolean): Promise<void>;
  
  // Notification Logs
  createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog>;
}

class DatabaseStorage implements IStorage {
  
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.warn('Database connection issue for categories');
      return [];
    }
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(categories).values(category).returning();
    return result[0];
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.warn('Database connection issue for products');
      return [];
    }
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.featured, true));
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }
  
  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    try {
      return await db.select().from(galleryItems);
    } catch (error) {
      console.warn('Database connection issue for gallery');
      return [];
    }
  }
  
  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    try {
      const result = await db.select().from(galleryItems).where(eq(galleryItems.id, id));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for gallery item');
      return undefined;
    }
  }
  
  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const result = await db.insert(galleryItems).values(item).returning();
    return result[0];
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      return await db.select().from(testimonials);
    } catch (error) {
      console.warn('Database connection issue for testimonials');
      return [];
    }
  }
  
  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const result = await db.select().from(testimonials).where(eq(testimonials.id, id));
    return result[0];
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }
  
  // Quote Requests
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const result = await db.insert(quoteRequests).values(request).returning();
    return result[0];
  }
  
  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
  }
  
  // Contact Submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  // Payment Orders - FIXED VERSION
  async createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder> {
    // Build order data for database with proper types
    const dbOrderData = {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerPhone: order.customerPhone || null,
      customerFirstName: order.customerFirstName || null,
      customerLastName: order.customerLastName || null,
      customerAddress: order.customerAddress || null,
      customerCity: order.customerCity || null,
      amount: order.amount,
      description: order.description,
      redirectUrl: order.redirectUrl || '',
      currency: order.currency || 'EUR',
      webhookUrl: order.webhookUrl || null,
      productDetails: order.productDetails || null,
      customerDetails: order.customerDetails || null,
      molliePaymentId: `manual_${Date.now()}`,
      orderNumber: order.orderNumber || `ORD-${Date.now()}`,
      status: 'pending',
      bonnummer: order.bonnummer,
      clientNote: order.clientNote || null,
      noteFromEntrepreneur: order.noteFromEntrepreneur || null,
      notificationPreference: order.notificationPreference || 'email',
      notifyByEmail: order.notifyByEmail !== false,
      notifyByWhatsapp: order.notifyByWhatsapp || false,
      pdfFileName: order.pdfFileName || null,
      invoiceUrl: order.invoiceUrl || null,
      notificationLogs: null,
      paidAt: null
    };
    
    try {
      const result = await db.insert(paymentOrders).values(dbOrderData).returning();
      console.log(`✅ Order saved to database: ${result[0].bonnummer} (ID: ${result[0].id})`);
      return result[0];
    } catch (error: any) {
      // Enhanced fallback to memory storage when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, using memory fallback for order creation');
        
        // Create memory fallback order
        const memoryOrder: PaymentOrder = {
          id: Date.now(),
          ...dbOrderData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Store in global memory
        if (!global.memoryOrders) {
          global.memoryOrders = [];
        }
        global.memoryOrders.push(memoryOrder);
        
        console.log(`✅ Order stored in memory: ${memoryOrder.bonnummer} (ID: ${memoryOrder.id})`);
        return memoryOrder;
      }
      
      throw error;
    }
  }

  async getPaymentOrderById(id: number): Promise<PaymentOrder | undefined> {
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.id, id));
      return result[0];
    } catch (error: any) {
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        const memoryOrders = global.memoryOrders || [];
        return memoryOrders.find(order => order.id === id);
      }
      throw error;
    }
  }

  async getPaymentOrderByOrderNumber(orderNumber: string): Promise<PaymentOrder | undefined> {
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.orderNumber, orderNumber));
      return result[0];
    } catch (error: any) {
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        const memoryOrders = global.memoryOrders || [];
        return memoryOrders.find(order => order.orderNumber === orderNumber);
      }
      throw error;
    }
  }

  async getPaymentOrders(): Promise<PaymentOrder[]> {
    try {
      const dbOrders = await db.select().from(paymentOrders).orderBy(desc(paymentOrders.createdAt));
      const memoryOrders = global.memoryOrders || [];
      const allOrders = [...dbOrders, ...memoryOrders];
      return allOrders.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    } catch (error: any) {
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, returning memory orders only');
        return global.memoryOrders || [];
      }
      throw error;
    }
  }

  async deletePaymentOrder(id: number): Promise<void> {
    await db.delete(paymentOrders).where(eq(paymentOrders.id, id));
  }

  async getPaymentOrderByBonnummer(bonnummer: string): Promise<PaymentOrder | undefined> {
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.bonnummer, bonnummer));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for bonnummer lookup');
      // Check memory orders
      const memoryOrders = global.memoryOrders || [];
      return memoryOrders.find(order => order.bonnummer === bonnummer);
    }
  }

  // Order tracking methods for clients
  async getOrderByOrderNumber(orderNumber: string): Promise<PaymentOrder | undefined> {
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.orderNumber, orderNumber));
      return result[0];
    } catch (error: any) {
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        const memoryOrders = global.memoryOrders || [];
        return memoryOrders.find(order => order.orderNumber === orderNumber);
      }
      return undefined;
    }
  }

  // Admin Authentication
  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    try {
      const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for admin authentication');
      return undefined;
    }
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const result = await db.insert(adminUsers).values(user).returning();
    return result[0];
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, id));
  }

  // Admin Sessions
  async createAdminSession(session: InsertAdminSession): Promise<AdminSession> {
    const result = await db.insert(adminSessions).values(session).returning();
    return result[0];
  }

  async getAdminSessionById(sessionId: string): Promise<AdminSession | undefined> {
    const result = await db.select().from(adminSessions).where(eq(adminSessions.sessionId, sessionId));
    return result[0];
  }

  async deleteAdminSession(sessionId: string): Promise<void> {
    await db.delete(adminSessions).where(eq(adminSessions.sessionId, sessionId));
  }

  async cleanupExpiredSessions(): Promise<void> {
    await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date()));
  }

  // Order Management
  async updatePaymentOrder(id: number, updates: Partial<PaymentOrder>): Promise<void> {
    await db.update(paymentOrders).set(updates).where(eq(paymentOrders.id, id));
  }

  // Order Documents
  async createOrderDocument(document: InsertOrderDocument): Promise<OrderDocument> {
    const result = await db.insert(orderDocuments).values(document).returning();
    return result[0];
  }

  async getOrderDocuments(orderId: number): Promise<OrderDocument[]> {
    return await db.select().from(orderDocuments)
      .where(eq(orderDocuments.orderId, orderId))
      .orderBy(desc(orderDocuments.uploadedAt));
  }

  async deleteOrderDocument(id: number): Promise<void> {
    await db.delete(orderDocuments).where(eq(orderDocuments.id, id));
  }

  async updateOrderDocumentVisibility(id: number, isVisible: boolean): Promise<void> {
    await db.update(orderDocuments).set({ isVisibleToClient: isVisible }).where(eq(orderDocuments.id, id));
  }

  // Notification Logs
  async createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog> {
    const result = await db.insert(notificationLogs).values(log).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();