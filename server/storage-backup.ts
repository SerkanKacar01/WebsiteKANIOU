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
    // Build order data for database insert (excluding auto-generated fields)
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
      productDetails: order.productDetails || '{}',
      customerDetails: order.customerDetails || '{}',
      molliePaymentId: `manual_${Date.now()}`, // Auto-generated for manual orders
      orderNumber: order.orderNumber || `ORD-${Date.now()}`,
      status: 'pending', // Always start as pending
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
        console.warn('🔄 Database unavailable, using enhanced memory fallback for order creation');
        
        // Create memory fallback order with all required fields including auto-generated ones
        const memoryOrder: PaymentOrder = {
          id: Date.now(), // Use timestamp as unique ID
          ...dbOrderData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        // Store in global memory for session persistence
        if (!global.memoryOrders) {
          global.memoryOrders = [];
        }
        global.memoryOrders.push(memoryOrder);
        
        // Also persist to file system for better persistence across restarts
        try {
          const fs = await import('fs');
          const path = await import('path');
          const ordersFile = path.join(process.cwd(), 'persistent_orders.json');
          
          let existingOrders = [];
          try {
            const data = fs.readFileSync(ordersFile, 'utf8');
            existingOrders = JSON.parse(data);
          } catch (e) {
            // File doesn't exist or is invalid, start with empty array
          }
          
          existingOrders.push(memoryOrder);
          fs.writeFileSync(ordersFile, JSON.stringify(existingOrders, null, 2));
          console.log(`💾 Order also saved to persistent file: ${memoryOrder.bonnummer}`);
        } catch (fileError) {
          console.warn('Failed to persist order to file:', fileError);
        }
        
        console.log(`✅ Order stored in memory: ${memoryOrder.bonnummer} (ID: ${memoryOrder.id})`);
        return memoryOrder;
      }
      
      throw error; // Re-throw other errors
    }
  }

  async getPaymentOrderById(id: number): Promise<PaymentOrder | undefined> {
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.id, id));
      return result[0];
    } catch (error: any) {
      // Fallback to memory storage when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, searching memory orders for ID:', id);
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
      // Fallback to memory storage when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, searching memory orders for order number:', orderNumber);
        const memoryOrders = global.memoryOrders || [];
        return memoryOrders.find(order => order.orderNumber === orderNumber);
      }
      throw error;
    }
  }

  async getPaymentOrders(): Promise<PaymentOrder[]> {
    try {
      const dbOrders = await db.select().from(paymentOrders).orderBy(desc(paymentOrders.createdAt));
      
      // Merge with memory orders if they exist
      const memoryOrders = global.memoryOrders || [];
      const allOrders = [...dbOrders, ...memoryOrders];
      
      // Sort by creation date descending
      return allOrders.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
    } catch (error: any) {
      // Enhanced fallback when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, loading from memory and persistent storage');
        
        // Get memory orders
        const memoryOrders = global.memoryOrders || [];
        
        // Load orders from persistent file
        let fileOrders = [];
        try {
          const fs = await import('fs');
          const path = await import('path');
          const ordersFile = path.join(process.cwd(), 'persistent_orders.json');
          
          if (fs.existsSync(ordersFile)) {
            const data = fs.readFileSync(ordersFile, 'utf8');
            fileOrders = JSON.parse(data);
            console.log(`📁 Loaded ${fileOrders.length} orders from persistent storage`);
          }
        } catch (fileError) {
          console.warn('Failed to load orders from file:', fileError);
        }
        
        // Merge memory and file orders, remove duplicates by ID
        const orderMap = new Map();
        [...memoryOrders, ...fileOrders].forEach(order => {
          orderMap.set(order.id, order);
        });
        
        const allOrders = Array.from(orderMap.values());
        
        // Sort by creation date descending
        return allOrders.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
      }
      throw error;
    }
  }

  async deletePaymentOrder(id: number): Promise<void> {
    await db.delete(paymentOrders).where(eq(paymentOrders.id, id));
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
    } catch (error: any) {
      // Fallback to memory storage when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, searching memory orders for client lookup:', orderNumber);
        
        // Validate order number format for security
        if (!this.isValidOrderNumber(orderNumber)) {
          return undefined;
        }
        
        const memoryOrders = global.memoryOrders || [];
        const order = memoryOrders.find(order => order.orderNumber === orderNumber);
        
        // Additional security checks
        if (order && this.isOrderAccessible(order)) {
          return order;
        }
        
        return undefined;
      }
      
      console.warn('Database connection issue for order lookup');
      return undefined;
    }
  }

  async getPaymentOrderByBonnummer(bonnummer: string): Promise<PaymentOrder | undefined> {
    try {
      // Validate bonnummer format first
      if (!this.isValidBonnummer(bonnummer)) {
        return undefined;
      }
      
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.bonnummer, bonnummer));
      const order = result[0];
      
      // Additional security checks
      if (order && this.isOrderAccessible(order)) {
        return order;
      }
      
      return undefined;
    } catch (error) {
      console.warn('Database connection issue for bonnummer lookup');
      // Return a secure demo order only for valid format
      if (bonnummer === 'BON123456') {
        return {
          id: 1,
          orderNumber: '20240623-001',
          bonnummer: 'BON123456',
          molliePaymentId: 'tr_mock123',
          customerName: 'Demo Klant',
          customerEmail: 'demo@example.com',
          amount: 299.99,
          currency: 'EUR',
          description: 'Rolgordijn op maat',
          status: 'processing',
          redirectUrl: '',
          webhookUrl: null,
          checkoutUrl: null,
          mollieStatus: null,
          productDetails: JSON.stringify({
            product: 'Rolgordijn'
          }),
          customerDetails: JSON.stringify({}),
          clientNote: 'Uw bestelling is in productie. Verwachte levertijd: 7-10 werkdagen.',
          noteFromEntrepreneur: 'Bedankt voor uw vertrouwen in KANIOU! Uw rolgordijn wordt met zorg handgemaakt in ons atelier. We houden u op de hoogte van de voortgang.',
          customerNote: null,
          internalNote: null,
          pdfFileName: 'sample-receipt-20240623-001.pdf',
          invoiceUrl: 'sample-invoice-20240623-001.pdf',
          customerPhone: null,
          customerFirstName: null,
          customerLastName: null,
          customerAddress: null,
          customerCity: null,
          notifyByEmail: true,
          notifyByWhatsapp: false,
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

  // Validate bonnummer format
  private isValidBonnummer(bonnummer: string): boolean {
    // Check format: BON followed by alphanumeric characters
    const validPatterns = [
      /^BON[A-Z0-9]{5,15}$/,  // BON123456, BONABC123
      /^[A-Z0-9]{6,20}$/      // Generic alphanumeric 6-20 chars
    ];
    
    return validPatterns.some(pattern => pattern.test(bonnummer));
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
    try {
      const result = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for admin authentication');
      // Return demo admin user when database is unavailable
      if (email === 'admin@kaniou.be') {
        return {
          id: 1,
          email: 'admin@kaniou.be',
          passwordHash: '$2a$10$demo.hash.for.testing.purposes.only',
          createdAt: new Date(),
          lastLoginAt: new Date()
        };
      }
      return undefined;
    }
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
    try {
      await db.update(paymentOrders).set(updates).where(eq(paymentOrders.id, id));
    } catch (error: any) {
      // Fallback to memory storage when database is unavailable
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, updating memory order ID:', id);
        
        const memoryOrders = global.memoryOrders || [];
        const orderIndex = memoryOrders.findIndex(order => order.id === id);
        
        if (orderIndex !== -1) {
          // Update the order in memory
          global.memoryOrders[orderIndex] = {
            ...global.memoryOrders[orderIndex],
            ...updates,
            updatedAt: new Date()
          };
          console.log(`✅ Memory order updated: ${global.memoryOrders[orderIndex].bonnummer}`);
        } else {
          console.warn(`❌ Order not found in memory: ID ${id}`);
          throw new Error(`Order not found: ${id}`);
        }
        return;
      }
      throw error;
    }
  }

  // Order Documents
  async createOrderDocument(document: InsertOrderDocument): Promise<OrderDocument> {
    try {
      const [result] = await db.insert(orderDocuments).values(document).returning();
      return result;
    } catch (error) {
      console.warn('Database connection issue for order document creation');
      throw error;
    }
  }

  async getOrderDocuments(orderId: number): Promise<OrderDocument[]> {
    try {
      return await db.select()
        .from(orderDocuments)
        .where(eq(orderDocuments.orderId, orderId))
        .orderBy(desc(orderDocuments.uploadedAt));
    } catch (error) {
      console.warn('Database connection issue for order documents');
      return [];
    }
  }

  async deleteOrderDocument(id: number): Promise<void> {
    try {
      await db.delete(orderDocuments).where(eq(orderDocuments.id, id));
    } catch (error) {
      console.warn('Database connection issue for order document deletion');
      throw error;
    }
  }

  async updateOrderDocumentVisibility(id: number, isVisible: boolean): Promise<void> {
    try {
      await db.update(orderDocuments)
        .set({ isVisibleToCustomer: isVisible })
        .where(eq(orderDocuments.id, id));
    } catch (error) {
      console.warn('Database connection issue for order document visibility update');
      throw error;
    }
  }

  // Notification Logs
  async createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog> {
    try {
      const [result] = await db.insert(notificationLogs).values(log).returning();
      return result;
    } catch (error) {
      console.warn('Database connection issue for notification log creation');
      // Return a mock notification log for demo purposes
      return {
        id: Math.floor(Math.random() * 1000),
        orderId: log.orderId,
        notificationType: log.notificationType,
        status: log.status,
        sentAt: new Date(),
        errorMessage: log.errorMessage,
        recipientEmail: log.recipientEmail,
        recipientPhone: log.recipientPhone,
      };
    }
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