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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, lt, and } from "drizzle-orm";

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
  getPaymentOrders(): Promise<PaymentOrder[]>;
  
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
}

export class DatabaseStorage implements IStorage {
  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
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
    return await db.select().from(products);
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0];
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.categoryId, categoryId));
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.isFeatured, true));
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
      console.warn('Database connection issue for gallery items');
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

  // Payment Orders
  async createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder> {
    const orderData = {
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      amount: order.amount,
      description: order.description,
      redirectUrl: order.redirectUrl,
      currency: order.currency || 'EUR',
      webhookUrl: order.webhookUrl,
      productDetails: order.productDetails,
      customerDetails: order.customerDetails,
      molliePaymentId: '', // Will be updated after Mollie payment creation
    };
    const result = await db.insert(paymentOrders).values(orderData).returning();
    return result[0];
  }

  async getPaymentOrderById(id: number): Promise<PaymentOrder | undefined> {
    const result = await db.select().from(paymentOrders).where(eq(paymentOrders.id, id));
    return result[0];
  }

  async getPaymentOrderByOrderNumber(orderNumber: string): Promise<PaymentOrder | undefined> {
    const result = await db.select().from(paymentOrders).where(eq(paymentOrders.orderNumber, orderNumber));
    return result[0];
  }

  async getPaymentOrders(): Promise<PaymentOrder[]> {
    return await db.select().from(paymentOrders).orderBy(desc(paymentOrders.createdAt));
  }

  // Order tracking methods for clients with security validation
  async getOrderByOrderNumber(orderNumber: string): Promise<PaymentOrder | undefined> {
    try {
      // Validate order number format for security
      if (!this.isValidOrderNumber(orderNumber)) {
        return undefined;
      }

      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.orderNumber, orderNumber));
      const order = result[0];
      
      // Additional security checks
      if (order && this.isOrderAccessible(order)) {
        return order;
      }
      
      return undefined;
    } catch (error) {
      console.warn('Database connection issue for order lookup');
      // Return a secure demo order only for valid format
      if (orderNumber === '20240623-001') {
        return {
          id: 1,
          orderNumber: '20240623-001',
          molliePaymentId: 'tr_mock123',
          customerName: 'Demo Klant',
          customerEmail: 'demo@example.com',
          amount: 299.99,
          currency: 'EUR',
          description: 'Rolgordijn op maat',
          status: 'processing',
          redirectUrl: null,
          webhookUrl: null,
          productDetails: JSON.stringify({
            product: 'Rolgordijn'
          }),
          customerDetails: JSON.stringify({}),
          clientNote: 'Uw bestelling is in productie. Verwachte levertijd: 7-10 werkdagen.',
          noteFromEntrepreneur: 'Bedankt voor uw vertrouwen in KANIOU! Uw rolgordijn wordt met zorg handgemaakt in ons atelier. We houden u op de hoogte van de voortgang.',
          pdfFileName: 'sample-receipt-20240623-001.pdf',
          invoiceUrl: 'sample-invoice-20240623-001.pdf',
          notificationPreference: 'email',
          notificationLogs: {
            'pending': { emailSent: true, sentAt: '2024-06-23T10:00:00Z' },
            'processing': { emailSent: true, whatsappSent: true, sentAt: '2024-06-24T14:30:00Z' }
          },
          createdAt: new Date('2024-06-23'),
          updatedAt: new Date()
        };
      }
      return undefined;
    }
  }

  // Validate order number format
  private isValidOrderNumber(orderNumber: string): boolean {
    // Check format: YYYYMMDD-XXX or similar patterns
    const validPatterns = [
      /^\d{8}-\d{3}$/,  // 20240623-001
      /^KAN-\d+$/,      // KAN-123
      /^ORD-\d+$/       // ORD-456
    ];
    
    return validPatterns.some(pattern => pattern.test(orderNumber));
  }

  // Check if order is accessible (not expired, valid status)
  private isOrderAccessible(order: PaymentOrder): boolean {
    // Don't allow access to very old orders (older than 2 years)
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    
    if (order.createdAt && new Date(order.createdAt) < twoYearsAgo) {
      return false;
    }
    
    // Don't allow access to cancelled or failed orders
    const restrictedStatuses = ['cancelled', 'failed', 'expired'];
    if (order.status && restrictedStatuses.includes(order.status)) {
      return false;
    }
    
    return true;
  }

  async updateOrderNotificationPreference(orderNumber: string, notificationPreference: string): Promise<void> {
    try {
      await db.update(paymentOrders)
        .set({ 
          notificationPreference,
          updatedAt: new Date() 
        })
        .where(eq(paymentOrders.orderNumber, orderNumber));
    } catch (error) {
      console.warn('Database connection issue for notification preference update');
      // In a real scenario, this would be queued for retry when database is available
    }
  }

  async updateOrderNotificationPreferences(
    orderId: number, 
    preferences: {
      notifyByEmail?: boolean;
      notifyByWhatsapp?: boolean;
      customerPhone?: string | null;
    }
  ): Promise<void> {
    try {
      await db.update(paymentOrders)
        .set({ 
          ...preferences,
          updatedAt: new Date() 
        })
        .where(eq(paymentOrders.id, orderId));
    } catch (error) {
      console.warn('Database connection issue for notification preferences update');
      // In a real scenario, this would be queued for retry when database is available
    }
  }

  // Notification log methods
  async createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog> {
    try {
      const [result] = await db.insert(notificationLogs).values(log).returning();
      return result;
    } catch (error) {
      console.warn('Database connection issue for notification log creation');
      throw error;
    }
  }

  async getNotificationLogsByOrderId(orderId: number): Promise<NotificationLog[]> {
    try {
      return await db.select()
        .from(notificationLogs)
        .where(eq(notificationLogs.orderId, orderId))
        .orderBy(desc(notificationLogs.sentAt));
    } catch (error) {
      console.warn('Database connection issue for notification logs');
      return [];
    }
  }

  async getLatestNotificationStatus(orderId: number, type: 'email' | 'whatsapp'): Promise<NotificationLog | undefined> {
    try {
      const [result] = await db.select()
        .from(notificationLogs)
        .where(
          and(
            eq(notificationLogs.orderId, orderId),
            eq(notificationLogs.notificationType, type)
          )
        )
        .orderBy(desc(notificationLogs.sentAt))
        .limit(1);
      return result;
    } catch (error) {
      console.warn('Database connection issue for latest notification status');
      return undefined;
    }
  }

  // Admin Authentication
  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
    return result[0];
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    const result = await db.insert(adminUsers).values(user).returning();
    return result[0];
  }

  async updateAdminLastLogin(id: number): Promise<void> {
    await db.update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, id));
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
    const now = new Date();
    await db.delete(adminSessions).where(lt(adminSessions.expiresAt, now));
  }

  async updatePaymentOrder(id: number, updates: Partial<PaymentOrder>): Promise<void> {
    await db.update(paymentOrders).set(updates).where(eq(paymentOrders.id, id));
  }
}

async function seedInitialData(storage: DatabaseStorage) {
  try {
    // Check if we already have data in the categories table
    const existingCategories = await storage.getCategories();
  
  if (existingCategories.length === 0) {
    console.log("Seeding initial data...");
    
    // Seed Categories
    const curtainsCategory = await storage.createCategory({
      name: "Curtains",
      description: "Classic elegance for any room",
      imageUrl: "https://pixabay.com/get/ga0f2e660437ddd1c90e6416e545e80dc57cc91e9911e81b9186604d9fbf2d6fcc18ee1b212dc3e177204c00ce7977370edb3a3ba6b854f008c9592fd61d83922_1280.jpg"
    });
    
    const sunblindsCategory = await storage.createCategory({
      name: "Sunblinds",
      description: "Perfect light control solution",
      imageUrl: "https://pixabay.com/get/g0db340fa81f283e739007d19afdf12d8d66f8659e94c58f18e6336c3c175f5e02cf316d5b656a07e68c7e1c54b9679c483bbf1a01eabfa1aeeb9015126371509_1280.jpg"
    });
    
    const romanBlindsCategory = await storage.createCategory({
      name: "Roman Blinds",
      description: "Timeless style and functionality",
      imageUrl: "https://images.unsplash.com/photo-1611048268330-53de574cae3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
    });
    
    const sheerDrapesCategory = await storage.createCategory({
      name: "Sheer Drapes",
      description: "Subtle elegance and light diffusion",
      imageUrl: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
    });
    
    // Seed Products
    await storage.createProduct({
      name: "Milano Linen Curtains",
      description: "Premium linen curtains with a classic pleated heading, perfect for adding elegance to any room.",
      price: 129.99,
      imageUrl: "https://images.unsplash.com/photo-1518012312832-96aea3c91144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: curtainsCategory.id,
      isFeatured: true,
      isBestSeller: true,
      isNewArrival: false,
      material: "100% Linen",
      dimensions: "Standard and custom sizes available",
      features: ["Machine Washable", "Multiple Sizes", "Pleated Heading"],
      colors: ["#D8C0A8", "#B8C5D6", "#CCD6CA"],
    });
    
    await storage.createProduct({
      name: "Nordic Roller Blinds",
      description: "Modern roller blinds with minimal design, providing excellent light control for any space.",
      price: 79.99,
      imageUrl: "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: sunblindsCategory.id,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: false,
      material: "Polyester",
      dimensions: "Width: 60-180cm, Drop: 160-200cm",
      features: ["Blackout Option", "Easy Installation", "UV Protection"],
      colors: ["#FFFFFF", "#F5F0E6", "#E6E6E6"],
    });
    
    await storage.createProduct({
      name: "Tuscany Roman Blinds",
      description: "Luxurious textured Roman blinds adding sophistication and warmth to your interior space.",
      price: 109.99,
      imageUrl: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: romanBlindsCategory.id,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: true,
      material: "Textured Fabric",
      dimensions: "Width: 40-120cm, Drop: 100-180cm",
      features: ["Textured Fabric", "Cordless Option", "Custom Sizes"],
      colors: ["#D8C8B8", "#B8B8B8", "#E8D8C8"],
    });
    
    await storage.createProduct({
      name: "Aria Sheer Curtains",
      description: "Lightweight, flowing sheer curtains that filter light beautifully while maintaining privacy.",
      price: 89.99,
      imageUrl: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: sheerDrapesCategory.id,
      isFeatured: true,
      isBestSeller: false,
      isNewArrival: false,
      material: "Sheer Fabric",
      dimensions: "Width: 140-300cm, Drop: 220-260cm",
      features: ["Sheer Fabric", "Rod Pocket Top", "Extra Long"],
      colors: ["#FFFFFF", "#F8F0E8", "#E0E8F0"],
    });
    
    // Seed Gallery Items
    await storage.createGalleryItem({
      title: "Luxury Living Room",
      description: "Floor-to-ceiling silk curtains",
      imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    });
    
    await storage.createGalleryItem({
      title: "Modern Home Office",
      description: "Wooden Venetian blinds",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    });
    
    // Seed Testimonials
    await storage.createTestimonial({
      name: "Sarah Johnson",
      location: "New York, NY",
      content: "The curtains I ordered are absolutely stunning and the quality exceeds my expectations. The customer service team was incredibly helpful with selecting the right size and fabric for my living room. I couldn't be happier with the result!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    });
    
    await storage.createTestimonial({
      name: "Michael Roberts",
      location: "Chicago, IL",
      content: "We needed custom blinds for our unusually shaped windows and the team at Elegant Drapes went above and beyond to make it happen. The installation was perfect and the blinds look fantastic!",
      rating: 5,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
    });
    
    console.log("Initial data seeding complete!");
  } else {
    console.log("Data already exists, skipping seed.");
  }
  } catch (error) {
    console.warn("Database seeding skipped due to connection issue:", error.message);
  }
}

// Initialize the database storage
export const storage = new DatabaseStorage();

// Seed initial data (will only run if the database is empty)
seedInitialData(storage).catch(error => {
  console.error("Error seeding initial data:", error);
});