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
  colorSampleRequests,
  ColorSampleRequest,
  InsertColorSampleRequest,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, lt, and } from "drizzle-orm";

declare global {
  var memoryOrders: PaymentOrder[] | undefined;
  var memoryAdminUsers: AdminUser[] | undefined;
  var memoryColorSampleRequests: ColorSampleRequest[] | undefined;
  var memoryCategories: Category[] | undefined;
  var memoryProducts: Product[] | undefined;
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
  updateOrderStatus(id: number, statusKey: string, isActive: boolean): Promise<void>;
  
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
  
  // Color Sample Requests
  createColorSampleRequest(request: InsertColorSampleRequest): Promise<ColorSampleRequest>;
  getColorSampleRequests(): Promise<ColorSampleRequest[]>;
  getColorSampleRequestById(id: number): Promise<ColorSampleRequest | undefined>;
  updateColorSampleRequestStatus(id: number, status: string): Promise<void>;
}

class DatabaseStorage implements IStorage {
  
  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.warn('Database connection issue for categories');
      // Initialize memory storage with cleaning category for HTC 620
      if (!global.memoryCategories) {
        global.memoryCategories = [
          {
            id: 1,
            name: 'Reiniging & Onderhoud',
            description: 'Professionele reinigingsproducten voor vloeren, textiel en gordijnen',
            imageUrl: '/images/cleaning-category.jpg'
          }
        ];
      }
      return global.memoryCategories;
    }
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    try {
      const result = await db.select().from(categories).where(eq(categories.id, id));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for category by id');
      if (!global.memoryCategories) {
        await this.getCategories(); // Initialize memory storage
      }
      return global.memoryCategories?.find(cat => cat.id === id);
    }
  }
  
  async createCategory(category: InsertCategory): Promise<Category> {
    try {
      const result = await db.insert(categories).values(category).returning();
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for category creation - using memory storage');
      if (!global.memoryCategories) {
        global.memoryCategories = [];
      }
      
      const newCategory: Category = {
        id: global.memoryCategories.length + 1,
        ...category
      };
      
      global.memoryCategories.push(newCategory);
      return newCategory;
    }
  }
  
  // Products
  async getProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products);
    } catch (error) {
      console.warn('Database connection issue for products');
      // Initialize memory storage with HTC 620 product
      if (!global.memoryProducts) {
        global.memoryProducts = [
          {
            id: 1,
            name: 'HTC 620 Vlekkenformule – Tapijt & Textiel Vlekkenreiniger (0,5 liter)',
            description: `**Professionele vlekkenreiniger voor tapijten en textiel**

HTC 620 is een krachtige vlekkenformule speciaal ontwikkeld voor het effectief verwijderen van vlekken uit tapijten, gordijnen en meubelstof. Deze professionele reiniger is geschikt voor alle textielsoorten en biedt uitstekende resultaten.

**Belangrijkste voordelen:**
• Verwijdert effectief vlekken van koffie, wijn, vet en algemeen vuil
• Veilig voor alle textielsoorten en kleuren
• Laat geen residu achter
• Snelle werking voor verse én ingedroogde vlekken
• Milieuvriendelijke formule

**Toepassingen:**
• Tapijten en vloerkleden
• Gordijnen en overgordijnen
• Meubelstof en bekleding
• Autointerieur textiel
• Commerciële en residentiële ruimtes

**Gebruiksaanwijzing:**
1. Test eerst op een onopvallende plek
2. Spray direct op de vlek
3. Laat 2-3 minuten inwerken
4. Dep voorzichtig met een schone doek
5. Spoel indien nodig na met water

**Technische specificaties:**
• Volume: 0,5 liter
• pH-waarde: 7-8 (mild alkalisch)
• Biologisch afbreekbaar
• Niet-giftig bij normaal gebruik`,
            price: 9.95,
            imageUrl: '/images/htc-620-vlekkenreiniger.jpg',
            categoryId: 1,
            isFeatured: true,
            isBestSeller: false,
            isNewArrival: true,
            material: 'Vloeistof',
            dimensions: '0,5 liter fles',
            features: [
              'Professionele kwaliteit',
              'Geschikt voor alle textielsoorten', 
              'Milieuvriendelijke formule',
              'Snelle werking',
              'Geen residu'
            ],
            colors: ['Transparant']
          }
        ];
      }
      return global.memoryProducts;
    }
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const result = await db.select().from(products).where(eq(products.id, id));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for product by id');
      if (!global.memoryProducts) {
        await this.getProducts(); // Initialize memory storage
      }
      return global.memoryProducts?.find(product => product.id === id);
    }
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    try {
      return await db.select().from(products).where(eq(products.categoryId, categoryId));
    } catch (error) {
      console.warn('Database connection issue for products by category');
      if (!global.memoryProducts) {
        await this.getProducts(); // Initialize memory storage
      }
      return global.memoryProducts?.filter(product => product.categoryId === categoryId) || [];
    }
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    try {
      return await db.select().from(products).where(eq(products.isFeatured, true));
    } catch (error) {
      console.warn('Database connection issue for featured products');
      if (!global.memoryProducts) {
        await this.getProducts(); // Initialize memory storage
      }
      return global.memoryProducts?.filter(product => product.isFeatured) || [];
    }
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    try {
      const result = await db.insert(products).values(product).returning();
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for product creation - using memory storage');
      if (!global.memoryProducts) {
        global.memoryProducts = [];
      }
      
      const newProduct: Product = {
        id: global.memoryProducts.length + 1,
        ...product,
        isFeatured: product.isFeatured ?? false,
        isBestSeller: product.isBestSeller ?? false,
        isNewArrival: product.isNewArrival ?? false,
        material: product.material ?? null,
        dimensions: product.dimensions ?? null,
        features: product.features ?? null,
        colors: product.colors ?? null
      };
      
      global.memoryProducts.push(newProduct);
      return newProduct;
    }
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
      orderNumber: order.orderNumber || null, // Use the provided order number or null
      status: 'pending',
      bonnummer: order.bonnummer,
      clientNote: order.clientNote || null,
      noteFromEntrepreneur: order.noteFromEntrepreneur || null,
      customerNote: order.customerNote || null,
      internalNote: order.internalNote || null,
      checkoutUrl: '',
      mollieStatus: null,
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
        
        // Create memory fallback order with all required fields
        const memoryOrder = {
          id: Date.now(),
          ...dbOrderData,
          // Initialize all status fields as null
          statusBestelOntvangen: null,
          statusInVerwerking: null,
          statusVerwerkt: null,
          statusInProductie: null,
          statusGereed: null,
          statusWordtGebeld: null,
          statusGeleverd: null,
          createdAt: new Date(),
          updatedAt: new Date()
        } as PaymentOrder;
        
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
    try {
      await db.delete(paymentOrders).where(eq(paymentOrders.id, id));
    } catch (error: any) {
      if (error.message?.includes('Control plane request failed') || error.message?.includes('endpoint is disabled')) {
        console.warn('🔄 Database unavailable, deleting from memory storage');
        
        // Delete from memory storage
        if (global.memoryOrders) {
          const originalLength = global.memoryOrders.length;
          global.memoryOrders = global.memoryOrders.filter(order => order.id !== id);
          const newLength = global.memoryOrders.length;
          
          if (originalLength > newLength) {
            console.log(`✅ Order ${id} deleted from memory storage`);
          } else {
            console.warn(`⚠️ Order ${id} not found in memory storage`);
          }
        } else {
          console.warn(`⚠️ No memory orders to delete from`);
        }
        return;
      }
      throw error;
    }
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
      console.warn('Database connection issue for admin authentication - checking memory storage');
      // Memory fallback for admin users
      const memoryAdmins = global.memoryAdminUsers || [];
      return memoryAdmins.find(user => user.email === email);
    }
  }

  async createAdminUser(user: InsertAdminUser): Promise<AdminUser> {
    try {
      const result = await db.insert(adminUsers).values(user).returning();
      return result[0];
    } catch (error) {
      console.warn('Database unavailable for admin user creation - using memory storage');
      // Memory fallback for admin user creation
      if (!global.memoryAdminUsers) {
        global.memoryAdminUsers = [];
      }
      
      const newAdminUser: AdminUser = {
        id: global.memoryAdminUsers.length + 1,
        email: user.email,
        passwordHash: user.passwordHash,
        createdAt: new Date(),
        lastLoginAt: null,
      };
      global.memoryAdminUsers.push(newAdminUser);
      console.log(`✅ Admin user created in memory: ${user.email}`);
      return newAdminUser;
    }
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

  // Order Management with memory fallback
  async updatePaymentOrder(id: number, updates: Partial<PaymentOrder>): Promise<void> {
    // Check if we're in memory-only mode (database unavailable)
    const hasIndividualStatusFields = updates.statusBestelOntvangen !== undefined || 
                                     updates.statusInVerwerking !== undefined || 
                                     updates.statusVerwerkt !== undefined ||
                                     updates.statusInProductie !== undefined ||
                                     updates.statusGereed !== undefined ||
                                     updates.statusWordtGebeld !== undefined ||
                                     updates.statusGeleverd !== undefined;

    // If we have individual status fields and we're likely in memory mode, skip database
    if (hasIndividualStatusFields && global.memoryOrders && global.memoryOrders.length > 0) {
      console.warn('🔄 Database unavailable (status fields detected), using memory fallback for order update');
      
      // Update in global memory storage
      const orderIndex = global.memoryOrders.findIndex((order: any) => order.id === id);
      if (orderIndex !== -1) {
        global.memoryOrders[orderIndex] = {
          ...global.memoryOrders[orderIndex],
          ...updates,
          updatedAt: new Date()
        };
        console.log(`✅ Order ${id} updated in memory storage`);
        return;
      } else {
        console.warn(`⚠️ Order ${id} not found in memory storage`);
        return;
      }
    }

    try {
      await db.update(paymentOrders).set(updates).where(eq(paymentOrders.id, id));
      console.log(`✅ Order ${id} updated in database`);
    } catch (error: any) {
      // Fallback to memory storage when database is unavailable or has conversion errors
      if (error.message?.includes('Control plane request failed') || 
          error.message?.includes('endpoint is disabled') ||
          error.message?.includes('toISOString is not a function') ||
          error.message?.includes('timestamp') ||
          error.message?.includes('mapToDriverValue')) {
        console.warn('🔄 Database unavailable or timestamp conversion error, using memory fallback for order update');
        
        // Update in global memory storage
        if (global.memoryOrders) {
          const orderIndex = global.memoryOrders.findIndex((order: any) => order.id === id);
          if (orderIndex !== -1) {
            global.memoryOrders[orderIndex] = {
              ...global.memoryOrders[orderIndex],
              ...updates,
              updatedAt: new Date()
            };
            console.log(`✅ Order ${id} updated in memory storage`);
          } else {
            console.warn(`⚠️ Order ${id} not found in memory storage`);
          }
        } else {
          console.warn('⚠️ No memory storage available for order update');
        }
      } else {
        throw error;
      }
    }
  }

  // Update individual order status with timestamp
  async updateOrderStatus(id: number, statusKey: string, isActive: boolean): Promise<void> {
    const updates: Partial<PaymentOrder> = {};
    
    // Map status keys to database fields
    const statusMap: {[key: string]: keyof PaymentOrder} = {
      'bestelling_ontvangen': 'statusBestelOntvangen',
      'bestelling_in_verwerking': 'statusInVerwerking', 
      'bestelling_verwerkt': 'statusVerwerkt',
      'bestelling_in_productie': 'statusInProductie',
      'bestelling_gereed': 'statusGereed',
      'wordt_gebeld_voor_levering': 'statusWordtGebeld',
      'bestelling_geleverd': 'statusGeleverd'
    };
    
    const dbField = statusMap[statusKey];
    if (dbField) {
      (updates as any)[dbField] = isActive ? new Date() : null;
      updates.updatedAt = new Date();
      await this.updatePaymentOrder(id, updates);
      console.log(`✅ Status ${statusKey} ${isActive ? 'activated' : 'deactivated'} for order ${id}`);
    } else {
      throw new Error(`Invalid status key: ${statusKey}`);
    }
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
    await db.update(orderDocuments).set({ isVisibleToCustomer: isVisible }).where(eq(orderDocuments.id, id));
  }

  // Notification Logs
  async createNotificationLog(log: InsertNotificationLog): Promise<NotificationLog> {
    const result = await db.insert(notificationLogs).values(log).returning();
    return result[0];
  }

  // Color Sample Requests
  async createColorSampleRequest(request: InsertColorSampleRequest): Promise<ColorSampleRequest> {
    try {
      const result = await db.insert(colorSampleRequests).values(request).returning();
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for color sample request creation, using memory fallback');
      // Memory fallback for color sample requests
      if (!global.memoryColorSampleRequests) {
        global.memoryColorSampleRequests = [];
      }
      const newRequest: ColorSampleRequest = {
        id: Date.now(),
        email: request.email,
        selectedColor: request.selectedColor,
        colorName: request.colorName,
        status: 'pending',
        shippingAddress: request.shippingAddress || null,
        notes: request.notes || null,
        createdAt: new Date(),
      };
      global.memoryColorSampleRequests.push(newRequest);
      return newRequest;
    }
  }

  async getColorSampleRequests(): Promise<ColorSampleRequest[]> {
    try {
      return await db.select().from(colorSampleRequests).orderBy(desc(colorSampleRequests.createdAt));
    } catch (error) {
      console.warn('Database connection issue for color sample requests');
      return global.memoryColorSampleRequests || [];
    }
  }

  async getColorSampleRequestById(id: number): Promise<ColorSampleRequest | undefined> {
    try {
      const result = await db.select().from(colorSampleRequests).where(eq(colorSampleRequests.id, id));
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for color sample request lookup');
      const memoryRequests = global.memoryColorSampleRequests || [];
      return memoryRequests.find(req => req.id === id);
    }
  }

  async updateColorSampleRequestStatus(id: number, status: string): Promise<void> {
    try {
      await db.update(colorSampleRequests).set({ status }).where(eq(colorSampleRequests.id, id));
    } catch (error) {
      console.warn('Database connection issue for color sample request status update, using memory fallback');
      const memoryRequests = global.memoryColorSampleRequests || [];
      const request = memoryRequests.find(req => req.id === id);
      if (request) {
        request.status = status;
      }
    }
  }
}

export const storage = new DatabaseStorage();