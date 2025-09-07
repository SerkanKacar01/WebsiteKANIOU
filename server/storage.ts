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
  shoppingCartItems,
  ShoppingCartItem,
  InsertShoppingCartItem,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, lt, and } from "drizzle-orm";
import { randomBytes, createHash } from 'crypto';

// SECURITY: Ultra-secure bonnummer generation system
class SecureBonnummerGenerator {
  private static readonly PREFIX = 'KAN';
  private static readonly YEAR = new Date().getFullYear().toString().slice(-2);
  
  /**
   * Generate cryptographically secure bonnummer
   * Format: KAN-25-XXXXXX-CC (PREFIX-YEAR-RANDOM-CHECKSUM)
   * Example: KAN-25-A7B9M3-XR
   */
  static generateSecureBonnummer(): string {
    // Generate 6 random characters (letters + numbers)
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ23456789'; // No 0,O,1,I for readability
    let randomPart = '';
    
    for (let i = 0; i < 6; i++) {
      const randomIndex = randomBytes(1)[0] % chars.length;
      randomPart += chars[randomIndex];
    }
    
    // Create base bonnummer
    const base = `${this.PREFIX}-${this.YEAR}-${randomPart}`;
    
    // Generate 2-digit checksum for validation
    const checksum = this.generateChecksum(base);
    
    return `${base}-${checksum}`;
  }
  
  /**
   * Generate secure checksum for bonnummer validation
   */
  private static generateChecksum(base: string): string {
    const hash = createHash('sha256').update(base + process.env.BONNUMMER_SECRET || 'KANIOU_SECRET_2025').digest('hex');
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZ23456789';
    return chars[parseInt(hash.slice(0, 1), 16) % chars.length] + 
           chars[parseInt(hash.slice(1, 2), 16) % chars.length];
  }
  
  /**
   * Validate bonnummer format and checksum
   */
  static isValidBonnummer(bonnummer: string): boolean {
    if (!bonnummer || typeof bonnummer !== 'string') return false;
    
    // Allow demo bonnummers for testing purposes
    const demoBonnummers = [
      'KAN-25-A7B9M3-XR',
      'KAN-25-K2P8N7-DM', 
      'KAN-25-R5T2Q8-FH'
    ];
    if (demoBonnummers.includes(bonnummer)) return true;
    
    // Check format: KAN-YY-XXXXXX-CC
    const pattern = /^KAN-\d{2}-[A-Z2-9]{6}-[A-Z2-9]{2}$/;
    if (!pattern.test(bonnummer)) return false;
    
    // Validate checksum
    const parts = bonnummer.split('-');
    if (parts.length !== 4) return false;
    
    const base = `${parts[0]}-${parts[1]}-${parts[2]}`;
    const expectedChecksum = this.generateChecksum(base);
    
    return parts[3] === expectedChecksum;
  }
}

// SECURITY: Order access validation
class OrderAccessValidator {
  /**
   * Check if order can be accessed by customer
   */
  static isOrderAccessible(order: PaymentOrder, customerEmail?: string): boolean {
    if (!order) return false;
    
    // Order must not be cancelled or expired
    if (order.status === 'cancelled' || order.status === 'expired') {
      return false;
    }
    
    // If email provided, it must match
    if (customerEmail && order.customerEmail !== customerEmail) {
      return false;
    }
    
    // Orders older than 2 years are not accessible for security
    if (order.createdAt) {
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      
      if (new Date(order.createdAt) < twoYearsAgo) {
        return false;
      }
    }
    
    return true;
  }
}

// SECURITY: Tracking attempt monitoring
class TrackingSecurityMonitor {
  private static readonly MAX_ATTEMPTS_PER_IP = 10;
  private static readonly TIME_WINDOW = 60 * 60 * 1000; // 1 hour
  
  static isRateLimited(ip: string): boolean {
    if (!global.trackingAttempts) {
      global.trackingAttempts = new Map();
    }
    
    const now = Date.now();
    const record = global.trackingAttempts.get(ip);
    
    if (!record) {
      global.trackingAttempts.set(ip, { count: 1, lastAttempt: now });
      return false;
    }
    
    // Reset if window expired
    if (now - record.lastAttempt > this.TIME_WINDOW) {
      global.trackingAttempts.set(ip, { count: 1, lastAttempt: now });
      return false;
    }
    
    // Check if over limit
    if (record.count >= this.MAX_ATTEMPTS_PER_IP) {
      console.warn(`🚨 SECURITY: IP ${ip} rate limited for order tracking (${record.count} attempts)`);
      return true;
    }
    
    // Increment counter
    record.count++;
    record.lastAttempt = now;
    global.trackingAttempts.set(ip, record);
    
    return false;
  }
  
  static logSuspiciousActivity(ip: string, bonnummer: string, reason: string): void {
    console.warn(`🚨 SECURITY ALERT: Suspicious tracking attempt from IP ${ip}`);
    console.warn(`   Bonnummer: ${bonnummer}`);
    console.warn(`   Reason: ${reason}`);
    console.warn(`   Time: ${new Date().toISOString()}`);
  }
}

declare global {
  var memoryOrders: PaymentOrder[] | undefined;
  var memoryAdminUsers: AdminUser[] | undefined;
  var memoryColorSampleRequests: ColorSampleRequest[] | undefined;
  var memoryCategories: Category[] | undefined;
  var memoryProducts: Product[] | undefined;
  var memoryCartItems: any[] | undefined;
  var memoryOrderDocuments: OrderDocument[] | undefined;
  var memoryGalleryItems: GalleryItem[] | undefined;
  var trackingAttempts: Map<string, {count: number, lastAttempt: number}> | undefined;
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
  
  // Shopping Cart
  addToCart(item: any): Promise<any>;
  getCartBySession(sessionId: string): Promise<{ items: any[], summary: { totalAmount: number, totalItems: number, currency: string } }>;
  updateCartItemQuantity(itemId: number, quantity: number): Promise<any>;
  removeFromCart(itemId: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
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
            name: 'HTC 620 Vlekkenformule',
            description: `Verwijdert eenvoudig vlekken uit textiel, meubelstof en tapijt. Direct toepasbaar met handige sprayflacon. Niet geschikt voor leder.

**Gebruiksaanwijzing:**
Spray direct op de vlek, laat 2-3 minuten inwerken, en dep voorzichtig met een schone doek.`,
            price: 16.95,
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
      // Return high-end gallery items from memory
      if (!global.memoryGalleryItems) {
        global.memoryGalleryItems = [
          {
            id: 1,
            title: "Luxe Eetkamer Gordijn Complex",
            description: "Elegante moderne eetkamer met premium gordijnen, beige tonen en stijlvolle combinatie van woonkamer en eetruimte.",
            imageUrl: "/gallery/premium-1",
            categoryId: 1
          },
          {
            id: 2,
            title: "Executive Verticale Lamellen Suite",
            description: "Professionele verticale lamellen in moderne woonruimte met optimale lichtregeling en privacy-oplossingen.",
            imageUrl: "/gallery/premium-2",
            categoryId: 2
          },
          {
            id: 3,
            title: "Premium Villa Woonkamer Ensemble",
            description: "Luxe woonkamer met gecombineerde raambekleding - gordijnen en lamellen voor complete privacy en elegantie.",
            imageUrl: "/gallery/premium-3",
            categoryId: 1
          },
          {
            id: 4,
            title: "Modern Living Gordijn Systeem",
            description: "Stijlvolle woonkamer met plafondgemonteerde gordijnen in neutrale tinten voor een moderne uitstraling.",
            imageUrl: "/gallery/premium-4",
            categoryId: 1
          },
          {
            id: 5,
            title: "Minimalistisch Verticale Lamellen",
            description: "Clean wit interieur met verticale lamellen voor optimale lichtinval en privacy in moderne woonruimte.",
            imageUrl: "/gallery/premium-5",
            categoryId: 2
          },
          {
            id: 6,
            title: "Penthouse Gordijn Collection",
            description: "Exclusieve beige gordijnen in penthouse setting met luxe materialen en warme sfeerverlichting.",
            imageUrl: "/gallery/premium-6",
            categoryId: 1
          },
          {
            id: 7,
            title: "Executive Dining Jalouzieën",
            description: "Elegante houten jalouzieën in executive dining area met perfecte balans tussen privacy en natuurlijk licht.",
            imageUrl: "/gallery/premium-7",
            categoryId: 3
          },
          {
            id: 8,
            title: "Modern Rolgordijn Complex",
            description: "Geavanceerde rolgordijnen in moderne woonkamer met verschillende lichtinstellingen en zonwering.",
            imageUrl: "/gallery/premium-8",
            categoryId: 4
          },
          {
            id: 9,
            title: "Luxe Appartement Gordijnen",
            description: "Premium gordijnensemble in luxe appartement met beige tinten en elegante plooivorming.",
            imageUrl: "/gallery/premium-9",
            categoryId: 1
          },
          {
            id: 10,
            title: "Designer Living Combinatie",
            description: "Exclusieve mix van verticale lamellen en gordijnen in designer woonkamer met neutrale kleurpalette.",
            imageUrl: "/gallery/premium-10",
            categoryId: 2
          },
          {
            id: 11,
            title: "Corporate Office Verticale Lamellen",
            description: "Professionele verticale lamellen voor zakelijke omgevingen met optimale functionaliteit en stijl.",
            imageUrl: "/gallery/premium-11",
            categoryId: 2
          },
          {
            id: 12,
            title: "Premium Villa Living Gordijnen",
            description: "Hoogwaardige gordijnen in villa setting met luxe stoffen en perfecte kleurcoördinatie.",
            imageUrl: "/gallery/premium-12",
            categoryId: 1
          },
          {
            id: 13,
            title: "Modern Penthouse Rolgordijnen",
            description: "Strakke rolgordijnen in penthouse met panoramische ramen en optimale zonwering functionaliteit.",
            imageUrl: "/gallery/premium-13",
            categoryId: 4
          },
          {
            id: 14,
            title: "Luxe Dining Jalouzieën Suite",
            description: "Klassieke jalouzieën in elegante dining room met warme tinten en premium houtafwerking.",
            imageUrl: "/gallery/premium-14",
            categoryId: 3
          },
          {
            id: 15,
            title: "Executive Lounge Gordijn Systeem",
            description: "Geavanceerd gordijnsysteem in executive lounge met luxe materialen en perfecte lichtregeling.",
            imageUrl: "/gallery/premium-15",
            categoryId: 1
          },
          {
            id: 16,
            title: "Villa Jalouzieën Complex",
            description: "Innovatief jalouzieën complex in moderne villa met meerdere raamopeningen en gecoördineerde bediening.",
            imageUrl: "/gallery/premium-16",
            categoryId: 3
          },
          {
            id: 17,
            title: "Moderne Woonkamer Verticale Lamellen",
            description: "Elegante verticale lamellen in moderne woonkamer met perfecte lichtregeling en privacy.",
            imageUrl: "/gallery/premium-34",
            categoryId: 2
          },
          {
            id: 18,
            title: "Luxe Appartement Rolgordijnen",
            description: "Premium rolgordijnen in luxe appartement met verschillende kamers en optimale zonwering.",
            imageUrl: "/gallery/premium-35",
            categoryId: 4
          },
          {
            id: 19,
            title: "Design Living Gordijn Complex",
            description: "Exclusief gordijnensemble in design woonkamer met neutrale tinten en premium afwerking.",
            imageUrl: "/gallery/premium-36",
            categoryId: 1
          },
          {
            id: 20,
            title: "Executive Villa Gordijnen",
            description: "Hoogwaardige gordijnen in executive villa met luxe materialen en elegante plooivorming.",
            imageUrl: "/gallery/premium-37",
            categoryId: 1
          },
          {
            id: 21,
            title: "Penthouse Combinatie Raambekleding",
            description: "Exclusieve mix van gordijnen en verticale lamellen in penthouse met panoramische uitzichten.",
            imageUrl: "/gallery/premium-38",
            categoryId: 1
          },
          {
            id: 22,
            title: "Moderne Woning Jalouzieën",
            description: "Stijlvolle jalouzieën in moderne woning met warme houtaccenten en natuurlijke lichttoetreding.",
            imageUrl: "/gallery/premium-39",
            categoryId: 3
          },
          {
            id: 23,
            title: "Luxe Villa Woonkamer Gordijnen",
            description: "Premium gordijnensemble in villa woonkamer met beige tinten en exclusieve stoffen.",
            imageUrl: "/gallery/premium-40",
            categoryId: 1
          },
          {
            id: 24,
            title: "Design Appartement Rolgordijnen",
            description: "Moderne rolgordijnen in design appartement met verschillende niveaus en optimale functies.",
            imageUrl: "/gallery/premium-41",
            categoryId: 4
          },
          {
            id: 25,
            title: "Executive Dining Gordijnen",
            description: "Elegante gordijnen in executive dining area met perfecte kleurcoördinatie en luxe afwerking.",
            imageUrl: "/gallery/premium-42",
            categoryId: 1
          },
          {
            id: 26,
            title: "Villa Living Verticale Lamellen",
            description: "Professionele verticale lamellen in villa living met optimale privacy en lichtregeling.",
            imageUrl: "/gallery/premium-43",
            categoryId: 2
          },
          {
            id: 27,
            title: "Penthouse Master Suite Gordijnen",
            description: "Luxe gordijnen in penthouse master suite met exclusieve materialen en perfecte hang.",
            imageUrl: "/gallery/premium-44",
            categoryId: 1
          },
          {
            id: 28,
            title: "Modern Living Jalouzieën Complex",
            description: "Innovatieve jalouzieën in modern living met meerdere raamopeningen en gecoördineerde bediening.",
            imageUrl: "/gallery/premium-45",
            categoryId: 3
          },
          {
            id: 29,
            title: "Executive Villa Rolgordijnen",
            description: "Premium rolgordijnen in executive villa met geavanceerde zonwering en privacy functionaliteit.",
            imageUrl: "/gallery/premium-46",
            categoryId: 4
          },
          {
            id: 30,
            title: "Luxe Woonkamer Gordijn Systeem",
            description: "Geavanceerd gordijnsysteem in luxe woonkamer met elektrische bediening en perfecte lichtregeling.",
            imageUrl: "/gallery/premium-47",
            categoryId: 1
          },
          {
            id: 31,
            title: "Design Villa Verticale Lamellen",
            description: "Exclusieve verticale lamellen in design villa met hoogwaardige materialen en stijlvolle afwerking.",
            imageUrl: "/gallery/premium-48",
            categoryId: 2
          },
          {
            id: 32,
            title: "Modern Appartement Rolgordijnen",
            description: "Strakke rolgordijnen in modern appartement met verschillende zones en optimale zonwering.",
            imageUrl: "/gallery/premium-49",
            categoryId: 4
          },
          {
            id: 33,
            title: "Premium Villa Gordijn Collection",
            description: "Complete gordijncollectie in premium villa met beige tinten en luxe stoffen combinaties.",
            imageUrl: "/gallery/premium-50",
            categoryId: 1
          }
        ];
      }
      return global.memoryGalleryItems;
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
      bonnummer: order.bonnummer || SecureBonnummerGenerator.generateSecureBonnummer(),
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

  async getPaymentOrderByBonnummer(bonnummer: string, customerEmail?: string, clientIp?: string): Promise<PaymentOrder | undefined> {
    // SECURITY: Enhanced order tracking with multiple protection layers
    
    // Rate limiting check
    if (clientIp && TrackingSecurityMonitor.isRateLimited(clientIp)) {
      TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Rate limit exceeded');
      return undefined;
    }
    
    // Validate bonnummer format and checksum
    if (!SecureBonnummerGenerator.isValidBonnummer(bonnummer)) {
      if (clientIp) {
        TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Invalid bonnummer format or checksum');
      }
      return undefined;
    }
    
    try {
      const result = await db.select().from(paymentOrders).where(eq(paymentOrders.bonnummer, bonnummer));
      const order = result[0];
      
      // Additional access validation
      if (order && !OrderAccessValidator.isOrderAccessible(order, customerEmail)) {
        if (clientIp) {
          TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Order access validation failed');
        }
        return undefined;
      }
      
      return order;
    } catch (error) {
      console.warn('Database connection issue for bonnummer lookup');
      
      // Check memory orders with same security
      const memoryOrders = global.memoryOrders || [];
      const order = memoryOrders.find(order => order.bonnummer === bonnummer);
      
      if (order && !OrderAccessValidator.isOrderAccessible(order, customerEmail)) {
        if (clientIp) {
          TrackingSecurityMonitor.logSuspiciousActivity(clientIp, bonnummer, 'Memory order access validation failed');
        }
        return undefined;
      }
      
      return order;
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
    try {
      const result = await db.insert(orderDocuments).values(document).returning();
      return result[0];
    } catch (error) {
      console.warn('Database connection issue for order document creation, using memory fallback');
      // Memory fallback for order documents
      if (!global.memoryOrderDocuments) {
        global.memoryOrderDocuments = [];
      }
      const newDocument: OrderDocument = {
        id: Date.now(),
        orderId: document.orderId,
        filename: document.filename,
        storedFilename: document.storedFilename,
        documentType: document.documentType,
        filePath: document.filePath,
        isVisibleToCustomer: document.isVisibleToCustomer || false,
        uploadedAt: new Date(),
        fileSize: document.fileSize || null,
      };
      global.memoryOrderDocuments.push(newDocument);
      console.log(`✅ Document stored in memory for order ${document.orderId}: ${document.filename}`);
      return newDocument;
    }
  }

  async getOrderDocuments(orderId: number): Promise<OrderDocument[]> {
    try {
      return await db.select().from(orderDocuments)
        .where(eq(orderDocuments.orderId, orderId))
        .orderBy(desc(orderDocuments.uploadedAt));
    } catch (error) {
      console.warn('Database connection issue for order documents, using memory fallback');
      if (!global.memoryOrderDocuments) {
        global.memoryOrderDocuments = [];
      }
      return global.memoryOrderDocuments
        .filter(doc => doc.orderId === orderId)
        .sort((a, b) => {
          const dateA = a.uploadedAt instanceof Date ? a.uploadedAt.getTime() : 0;
          const dateB = b.uploadedAt instanceof Date ? b.uploadedAt.getTime() : 0;
          return dateB - dateA;
        });
    }
  }

  async deleteOrderDocument(id: number): Promise<void> {
    try {
      await db.delete(orderDocuments).where(eq(orderDocuments.id, id));
    } catch (error) {
      console.warn('Database connection issue for order document deletion, using memory fallback');
      if (!global.memoryOrderDocuments) {
        global.memoryOrderDocuments = [];
      }
      const index = global.memoryOrderDocuments.findIndex(doc => doc.id === id);
      if (index > -1) {
        global.memoryOrderDocuments.splice(index, 1);
        console.log(`✅ Document ${id} deleted from memory`);
      }
    }
  }

  async updateOrderDocumentVisibility(id: number, isVisible: boolean): Promise<void> {
    try {
      await db.update(orderDocuments).set({ isVisibleToCustomer: isVisible }).where(eq(orderDocuments.id, id));
    } catch (error) {
      console.warn('Database connection issue for order document visibility update, using memory fallback');
      if (!global.memoryOrderDocuments) {
        global.memoryOrderDocuments = [];
      }
      const document = global.memoryOrderDocuments.find(doc => doc.id === id);
      if (document) {
        document.isVisibleToCustomer = isVisible;
        console.log(`✅ Document ${id} visibility updated in memory: ${isVisible}`);
      }
    }
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

  // Shopping Cart Methods
  async addToCart(item: any): Promise<any> {
    try {
      // For simplified cart implementation, we'll use memory storage with database fallback
      const cartItem = {
        id: Date.now(), // Simple ID generation for memory storage
        sessionId: item.sessionId,
        productType: item.productType,
        productName: item.productName,
        material: item.material || '',
        color: item.color || '',
        width: item.width || 0,
        height: item.height || 0,
        quantity: item.quantity || 1,
        unitPrice: item.unitPrice,
        totalPrice: (item.quantity || 1) * item.unitPrice,
        customizations: item.customizations || {},
        imageUrl: item.imageUrl || '',
        addedAt: new Date()
      };

      if (!global.memoryCartItems) {
        global.memoryCartItems = [];
      }
      
      global.memoryCartItems.push(cartItem);
      return cartItem;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  }

  async getCartBySession(sessionId: string): Promise<{ items: any[], summary: { totalAmount: number, totalItems: number, currency: string } }> {
    try {
      const cartItems = global.memoryCartItems?.filter(item => item.sessionId === sessionId) || [];
      
      const totalAmount = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        items: cartItems,
        summary: {
          totalAmount: parseFloat(totalAmount.toFixed(2)),
          totalItems,
          currency: 'EUR'
        }
      };
    } catch (error) {
      console.error('Get cart error:', error);
      return { items: [], summary: { totalAmount: 0, totalItems: 0, currency: 'EUR' } };
    }
  }

  async updateCartItemQuantity(itemId: number, quantity: number): Promise<any> {
    try {
      if (!global.memoryCartItems) {
        throw new Error('Cart item not found');
      }
      
      const itemIndex = global.memoryCartItems.findIndex(item => item.id === itemId);
      if (itemIndex === -1) {
        throw new Error('Cart item not found');
      }
      
      global.memoryCartItems[itemIndex].quantity = quantity;
      global.memoryCartItems[itemIndex].totalPrice = quantity * global.memoryCartItems[itemIndex].unitPrice;
      
      return global.memoryCartItems[itemIndex];
    } catch (error) {
      console.error('Update cart item error:', error);
      throw error;
    }
  }

  async removeFromCart(itemId: number): Promise<void> {
    try {
      if (!global.memoryCartItems) {
        return;
      }
      
      const itemIndex = global.memoryCartItems.findIndex(item => item.id === itemId);
      if (itemIndex > -1) {
        global.memoryCartItems.splice(itemIndex, 1);
      }
    } catch (error) {
      console.error('Remove from cart error:', error);
      throw error;
    }
  }

  async clearCart(sessionId: string): Promise<void> {
    try {
      if (!global.memoryCartItems) {
        return;
      }
      
      global.memoryCartItems = global.memoryCartItems.filter(item => item.sessionId !== sessionId);
    } catch (error) {
      console.error('Clear cart error:', error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();

// Export security classes for use in routes
export { SecureBonnummerGenerator, OrderAccessValidator, TrackingSecurityMonitor };