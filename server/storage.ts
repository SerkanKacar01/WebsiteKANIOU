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
  chatbotConversations,
  ChatbotConversation,
  InsertChatbotConversation,
  chatbotMessages,
  ChatbotMessage,
  InsertChatbotMessage,
  chatbotKnowledge,
  ChatbotKnowledge,
  InsertChatbotKnowledge,
  chatbotPricing,
  ChatbotPricing,
  InsertChatbotPricing,
  chatbotFaq,
  ChatbotFaq,
  InsertChatbotFaq,
  chatbotAdminTraining,
  ChatbotAdminTraining,
  InsertChatbotAdminTraining,
  priceRequestNotifications,
  PriceRequestNotification,
  InsertPriceRequestNotification,
  priceResponseKnowledge,
  PriceResponseKnowledge,
  InsertPriceResponseKnowledge,
  priceResponseLogs,
  PriceResponseLog,
  InsertPriceResponseLog,
  newsletterSubscriptions,
  NewsletterSubscription,
  InsertNewsletterSubscription,
  userPreferences,
  UserPreferences,
  InsertUserPreferences,
  styleConsultations,
  StyleConsultation,
  InsertStyleConsultation,
  styleProductMappings,
  StyleProductMapping,
  InsertStyleProductMapping,
  styleQuoteRequests,
  StyleQuoteRequest,
  InsertStyleQuoteRequest,
  websiteContentIndex,
  WebsiteContentIndex,
  InsertWebsiteContentIndex,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

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
  getGalleryItemsByCategory(categoryId: number): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, item: Partial<GalleryItem>): Promise<GalleryItem>;

  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Quote Requests
  createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;

  // Contact Submissions
  createContactSubmission(
    submission: InsertContactSubmission,
  ): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;

  // Chatbot Conversations
  createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation>;
  getChatbotConversationBySessionId(sessionId: string): Promise<ChatbotConversation | undefined>;
  updateChatbotConversation(id: number, updates: Partial<ChatbotConversation>): Promise<ChatbotConversation>;

  // Chatbot Messages
  createChatbotMessage(message: InsertChatbotMessage): Promise<ChatbotMessage>;
  getChatbotMessagesByConversationId(conversationId: number): Promise<ChatbotMessage[]>;

  // Chatbot Knowledge
  getChatbotKnowledge(language?: string): Promise<ChatbotKnowledge[]>;
  createChatbotKnowledge(knowledge: InsertChatbotKnowledge): Promise<ChatbotKnowledge>;
  updateChatbotKnowledge(id: number, updates: Partial<ChatbotKnowledge>): Promise<ChatbotKnowledge>;

  // Chatbot Pricing
  getChatbotPricing(): Promise<ChatbotPricing[]>;
  createChatbotPricing(pricing: InsertChatbotPricing): Promise<ChatbotPricing>;
  getChatbotPricingByProductType(productType: string): Promise<ChatbotPricing | undefined>;

  // Chatbot FAQ
  getChatbotFaq(language?: string): Promise<ChatbotFaq[]>;
  createChatbotFaq(faq: InsertChatbotFaq): Promise<ChatbotFaq>;

  // Chatbot Admin Training
  createChatbotAdminTraining(training: InsertChatbotAdminTraining): Promise<ChatbotAdminTraining>;
  getChatbotAdminTraining(): Promise<ChatbotAdminTraining[]>;

  // Website Content Index
  createWebsiteContentIndex(content: InsertWebsiteContentIndex): Promise<WebsiteContentIndex>;
  getWebsiteContentIndex(language?: string, category?: string): Promise<WebsiteContentIndex[]>;
  getWebsiteContentByUrl(url: string): Promise<WebsiteContentIndex | undefined>;
  updateWebsiteContentIndex(id: number, updates: Partial<WebsiteContentIndex>): Promise<WebsiteContentIndex>;
  deleteWebsiteContentIndex(id: number): Promise<void>;
  searchWebsiteContent(query: string, language?: string): Promise<WebsiteContentIndex[]>;

  // Style Consultations
  createStyleConsultation(consultation: InsertStyleConsultation): Promise<StyleConsultation>;
  getStyleConsultationBySessionId(sessionId: string): Promise<StyleConsultation | undefined>;
  updateStyleConsultation(sessionId: string, updates: Partial<StyleConsultation>): Promise<StyleConsultation>;
  getStyleConsultationById(id: number): Promise<StyleConsultation | undefined>;

  // Style Quote Requests
  createStyleQuoteRequest(request: InsertStyleQuoteRequest): Promise<StyleQuoteRequest>;
  getStyleQuoteRequestsByConsultation(consultationId: number): Promise<StyleQuoteRequest[]>;
  getUnprocessedStyleQuoteRequests(): Promise<StyleQuoteRequest[]>;


}

export class DatabaseStorage implements IStorage {
  // Categories
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
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
    return await db
      .select()
      .from(products)
      .where(eq(products.categoryId, categoryId));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return await db
      .select()
      .from(products)
      .where(eq(products.isFeatured, true));
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems);
  }

  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    const result = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.id, id));
    return result[0];
  }

  async getGalleryItemsByCategory(categoryId: number): Promise<GalleryItem[]> {
    return await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.categoryId, categoryId));
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const result = await db.insert(galleryItems).values(item).returning();
    return result[0];
  }

  async updateGalleryItem(id: number, item: Partial<GalleryItem>): Promise<GalleryItem> {
    const [result] = await db
      .update(galleryItems)
      .set(item)
      .where(eq(galleryItems.id, id))
      .returning();
    return result;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    const result = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.id, id));
    return result[0];
  }

  async createTestimonial(
    testimonial: InsertTestimonial,
  ): Promise<Testimonial> {
    const result = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return result[0];
  }

  // Quote Requests
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const result = await db.insert(quoteRequests).values(request).returning();
    return result[0];
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return await db
      .select()
      .from(quoteRequests)
      .orderBy(desc(quoteRequests.createdAt));
  }

  // Contact Submissions
  async createContactSubmission(
    submission: InsertContactSubmission,
  ): Promise<ContactSubmission> {
    const result = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return result[0];
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  // Chatbot Conversations
  async createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation> {
    const result = await db
      .insert(chatbotConversations)
      .values(conversation)
      .returning();
    return result[0];
  }

  async getChatbotConversationBySessionId(sessionId: string): Promise<ChatbotConversation | undefined> {
    const result = await db
      .select()
      .from(chatbotConversations)
      .where(eq(chatbotConversations.sessionId, sessionId))
      .limit(1);
    return result[0];
  }

  async updateChatbotConversation(id: number, updates: Partial<ChatbotConversation>): Promise<ChatbotConversation> {
    const result = await db
      .update(chatbotConversations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(chatbotConversations.id, id))
      .returning();
    return result[0];
  }

  // Chatbot Messages
  async createChatbotMessage(message: InsertChatbotMessage): Promise<ChatbotMessage> {
    const result = await db
      .insert(chatbotMessages)
      .values(message)
      .returning();
    return result[0];
  }

  async getChatbotMessagesByConversationId(conversationId: number): Promise<ChatbotMessage[]> {
    return await db
      .select()
      .from(chatbotMessages)
      .where(eq(chatbotMessages.conversationId, conversationId))
      .orderBy(chatbotMessages.createdAt);
  }

  // Chatbot Knowledge
  async getChatbotKnowledge(language?: string): Promise<ChatbotKnowledge[]> {
    if (language) {
      return await db
        .select()
        .from(chatbotKnowledge)
        .where(eq(chatbotKnowledge.language, language))
        .orderBy(desc(chatbotKnowledge.priority));
    }
    
    return await db
      .select()
      .from(chatbotKnowledge)
      .orderBy(desc(chatbotKnowledge.priority));
  }

  async createChatbotKnowledge(knowledge: InsertChatbotKnowledge): Promise<ChatbotKnowledge> {
    const result = await db
      .insert(chatbotKnowledge)
      .values(knowledge)
      .returning();
    return result[0];
  }

  async updateChatbotKnowledge(id: number, updates: Partial<ChatbotKnowledge>): Promise<ChatbotKnowledge> {
    const result = await db
      .update(chatbotKnowledge)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(chatbotKnowledge.id, id))
      .returning();
    return result[0];
  }

  // Chatbot Pricing
  async getChatbotPricing(): Promise<ChatbotPricing[]> {
    return await db
      .select()
      .from(chatbotPricing)
      .orderBy(desc(chatbotPricing.createdAt));
  }

  async createChatbotPricing(pricing: InsertChatbotPricing): Promise<ChatbotPricing> {
    const result = await db
      .insert(chatbotPricing)
      .values(pricing)
      .returning();
    return result[0];
  }

  async getChatbotPricingByProductType(productType: string): Promise<ChatbotPricing | undefined> {
    const result = await db
      .select()
      .from(chatbotPricing)
      .where(eq(chatbotPricing.productType, productType))
      .orderBy(desc(chatbotPricing.createdAt))
      .limit(1);
    return result[0];
  }

  // Chatbot FAQ
  async getChatbotFaq(language?: string): Promise<ChatbotFaq[]> {
    if (language) {
      return await db
        .select()
        .from(chatbotFaq)
        .where(and(
          eq(chatbotFaq.adminApproved, true),
          eq(chatbotFaq.language, language)
        ))
        .orderBy(chatbotFaq.category);
    }
    
    return await db
      .select()
      .from(chatbotFaq)
      .where(eq(chatbotFaq.adminApproved, true))
      .orderBy(chatbotFaq.category);
  }

  async createChatbotFaq(faq: InsertChatbotFaq): Promise<ChatbotFaq> {
    const result = await db
      .insert(chatbotFaq)
      .values(faq)
      .returning();
    return result[0];
  }

  // Chatbot Admin Training
  async createChatbotAdminTraining(training: InsertChatbotAdminTraining): Promise<ChatbotAdminTraining> {
    const result = await db
      .insert(chatbotAdminTraining)
      .values(training)
      .returning();
    return result[0];
  }

  async getChatbotAdminTraining(): Promise<ChatbotAdminTraining[]> {
    return await db
      .select()
      .from(chatbotAdminTraining)
      .orderBy(desc(chatbotAdminTraining.createdAt));
  }

  // Price Request Notifications
  async createPriceRequestNotification(notification: InsertPriceRequestNotification): Promise<PriceRequestNotification> {
    const result = await db
      .insert(priceRequestNotifications)
      .values(notification)
      .returning();
    return result[0];
  }

  async getPriceRequestNotifications(): Promise<PriceRequestNotification[]> {
    return await db
      .select()
      .from(priceRequestNotifications)
      .orderBy(desc(priceRequestNotifications.createdAt));
  }

  // Price Response Knowledge
  async createPriceResponseKnowledge(knowledge: InsertPriceResponseKnowledge): Promise<PriceResponseKnowledge> {
    const result = await db
      .insert(priceResponseKnowledge)
      .values(knowledge)
      .returning();
    return result[0];
  }

  async getPriceResponseKnowledge(language?: string): Promise<PriceResponseKnowledge[]> {
    if (language) {
      return await db
        .select()
        .from(priceResponseKnowledge)
        .where(and(
          eq(priceResponseKnowledge.language, language),
          eq(priceResponseKnowledge.isActive, true)
        ))
        .orderBy(desc(priceResponseKnowledge.usageCount));
    }
    
    return await db
      .select()
      .from(priceResponseKnowledge)
      .where(eq(priceResponseKnowledge.isActive, true))
      .orderBy(desc(priceResponseKnowledge.usageCount));
  }

  // Price Response Logs
  async createPriceResponseLog(log: InsertPriceResponseLog): Promise<PriceResponseLog> {
    const result = await db
      .insert(priceResponseLogs)
      .values(log)
      .returning();
    return result[0];
  }

  async getPriceResponseLogsByKnowledgeId(knowledgeId: number): Promise<PriceResponseLog[]> {
    return await db.select().from(priceResponseLogs).where(eq(priceResponseLogs.knowledgeId, knowledgeId)).orderBy(desc(priceResponseLogs.createdAt));
  }

  // Newsletter Subscriptions Implementation
  async createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [subscription] = await db.insert(newsletterSubscriptions).values(data).returning();
    return subscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | null> {
    const [subscription] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return subscription || null;
  }

  async getActiveNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.isActive, true))
      .orderBy(desc(newsletterSubscriptions.subscribedAt));
  }

  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    try {
      await db.update(newsletterSubscriptions)
        .set({ 
          isActive: false, 
          unsubscribedAt: new Date() 
        })
        .where(eq(newsletterSubscriptions.email, email));
      return true;
    } catch (error) {
      console.error('Error unsubscribing from newsletter:', error);
      return false;
    }
  }

  // Style Consultations Implementation
  async createStyleConsultation(consultation: InsertStyleConsultation): Promise<StyleConsultation> {
    const [result] = await db.insert(styleConsultations).values(consultation).returning();
    return result;
  }

  async getStyleConsultationBySessionId(sessionId: string): Promise<StyleConsultation | undefined> {
    const [result] = await db.select().from(styleConsultations).where(eq(styleConsultations.sessionId, sessionId));
    return result;
  }

  async updateStyleConsultation(sessionId: string, updates: Partial<StyleConsultation>): Promise<StyleConsultation> {
    const [result] = await db.update(styleConsultations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(styleConsultations.sessionId, sessionId))
      .returning();
    return result;
  }

  async getStyleConsultationById(id: number): Promise<StyleConsultation | undefined> {
    const [result] = await db.select().from(styleConsultations).where(eq(styleConsultations.id, id));
    return result;
  }

  // Style Quote Requests Implementation
  async createStyleQuoteRequest(request: InsertStyleQuoteRequest): Promise<StyleQuoteRequest> {
    const [result] = await db.insert(styleQuoteRequests).values(request).returning();
    return result;
  }

  async getStyleQuoteRequestsByConsultation(consultationId: number): Promise<StyleQuoteRequest[]> {
    return await db.select().from(styleQuoteRequests).where(eq(styleQuoteRequests.consultationId, consultationId));
  }

  async getUnprocessedStyleQuoteRequests(): Promise<StyleQuoteRequest[]> {
    return await db.select().from(styleQuoteRequests)
      .where(eq(styleQuoteRequests.isProcessed, false))
      .orderBy(desc(styleQuoteRequests.createdAt));
  }

  // Website Content Index Implementation
  async createWebsiteContentIndex(content: InsertWebsiteContentIndex): Promise<WebsiteContentIndex> {
    const [result] = await db.insert(websiteContentIndex).values(content).returning();
    return result;
  }

  async getWebsiteContentIndex(language?: string, category?: string): Promise<WebsiteContentIndex[]> {
    let query = db.select().from(websiteContentIndex).where(eq(websiteContentIndex.isActive, true));
    
    if (language && category) {
      return await db.select().from(websiteContentIndex)
        .where(and(
          eq(websiteContentIndex.language, language),
          eq(websiteContentIndex.category, category),
          eq(websiteContentIndex.isActive, true)
        ))
        .orderBy(desc(websiteContentIndex.lastCrawled));
    } else if (language) {
      return await db.select().from(websiteContentIndex)
        .where(and(
          eq(websiteContentIndex.language, language),
          eq(websiteContentIndex.isActive, true)
        ))
        .orderBy(desc(websiteContentIndex.lastCrawled));
    } else if (category) {
      return await db.select().from(websiteContentIndex)
        .where(and(
          eq(websiteContentIndex.category, category),
          eq(websiteContentIndex.isActive, true)
        ))
        .orderBy(desc(websiteContentIndex.lastCrawled));
    }
    
    return await db.select().from(websiteContentIndex)
      .where(eq(websiteContentIndex.isActive, true))
      .orderBy(desc(websiteContentIndex.lastCrawled));
  }

  async getWebsiteContentByUrl(url: string): Promise<WebsiteContentIndex | undefined> {
    const [result] = await db.select().from(websiteContentIndex)
      .where(eq(websiteContentIndex.pageUrl, url))
      .limit(1);
    return result;
  }

  async updateWebsiteContentIndex(id: number, updates: Partial<WebsiteContentIndex>): Promise<WebsiteContentIndex> {
    const [result] = await db.update(websiteContentIndex)
      .set({ ...updates, lastCrawled: new Date() })
      .where(eq(websiteContentIndex.id, id))
      .returning();
    return result;
  }

  async deleteWebsiteContentIndex(id: number): Promise<void> {
    await db.delete(websiteContentIndex).where(eq(websiteContentIndex.id, id));
  }

  async searchWebsiteContent(query: string, language?: string): Promise<WebsiteContentIndex[]> {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    if (language) {
      return await db.select().from(websiteContentIndex)
        .where(and(
          eq(websiteContentIndex.language, language),
          eq(websiteContentIndex.isActive, true)
        ))
        .orderBy(desc(websiteContentIndex.lastCrawled));
    }
    
    return await db.select().from(websiteContentIndex)
      .where(eq(websiteContentIndex.isActive, true))
      .orderBy(desc(websiteContentIndex.lastCrawled));
  }
}

async function seedInitialData(storage: DatabaseStorage) {
  // Check if we already have data in the categories table
  const existingCategories = await storage.getCategories();

  if (existingCategories.length === 0) {
    console.log("Seeding initial data...");

    // Seed Categories
    const curtainsCategory = await storage.createCategory({
      name: "Curtains",
      description: "Classic elegance for any room",
      imageUrl:
        "https://pixabay.com/get/ga0f2e660437ddd1c90e6416e545e80dc57cc91e9911e81b9186604d9fbf2d6fcc18ee1b212dc3e177204c00ce7977370edb3a3ba6b854f008c9592fd61d83922_1280.jpg",
    });

    const sunblindsCategory = await storage.createCategory({
      name: "Vouwgordijnen",
      description: "Perfect light control solution",
      imageUrl:
        "https://pixabay.com/get/g0db340fa81f283e739007d19afdf12d8d66f8659e94c58f18e6336c3c175f5e02cf316d5b656a07e68c7e1c54b9679c483bbf1a01eabfa1aeeb9015126371509_1280.jpg",
    });

    const romanBlindsCategory = await storage.createCategory({
      name: "Rolgordijnen",
      description: "Timeless style and functionality",
      imageUrl:
        "https://images.unsplash.com/photo-1611048268330-53de574cae3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
    });

    const sheerDrapesCategory = await storage.createCategory({
      name: "Overgordijnen",
      description: "Subtle elegance and light diffus",
      imageUrl:
        "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000",
    });

    // Seed Products
    await storage.createProduct({
      name: "Milano Linen Curtains",
      description:
        "Premium linen curtains with a classic pleated heading, perfect for adding elegance to any room.",
      price: 129.99,
      imageUrl:
        "https://images.unsplash.com/photo-1518012312832-96aea3c91144?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
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
      description:
        "Modern roller blinds with minimal design, providing excellent light control for any space.",
      price: 79.99,
      imageUrl:
        "https://images.unsplash.com/photo-1592492152545-9695d3f473f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
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
      description:
        "Luxurious textured Roman blinds adding sophistication and warmth to your interior space.",
      price: 109.99,
      imageUrl:
        "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
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
      description:
        "Lightweight, flowing sheer curtains that filter light beautifully while maintaining privacy.",
      price: 89.99,
      imageUrl:
        "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
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
      imageUrl:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: curtainsCategory.id,
    });

    await storage.createGalleryItem({
      title: "Modern Home Office",
      description: "Wooden Venetian blinds",
      imageUrl:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: sunblindsCategory.id,
    });

    // Add more gallery items for each category
    await storage.createGalleryItem({
      title: "Elegant Bedroom",
      description: "Classic roman blinds installation",
      imageUrl:
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: romanBlindsCategory.id,
    });

    await storage.createGalleryItem({
      title: "Bright Kitchen Space",
      description: "Sheer curtains allowing natural light",
      imageUrl:
        "https://images.unsplash.com/photo-1556912173-3bb406ef7e8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
      categoryId: sheerDrapesCategory.id,
    });

    // Seed Testimonials
    await storage.createTestimonial({
      name: "Beckers",
      location: "België",
      content:
        "Serkan heeft de vouwgordijnen en de houten en aluminium jaloezieën in ons nieuw huis opgehangen.We zijn heel tevreden hoe hij met zijn klanten omgaat.Serkan is heel vriendelijk, neemt zijn tijd om alles uit te leggen.Niets is hem teveel.Je kan hem altijd bereiken, indien je vragen hebt over de gordijnen etc. dan lost hij dit snel op.Prijs/kwaliteit is prima. Daarom zijn we heel blij dat wij Serkan de aankleding (gordijnen en jaloezieën) hebben laten uitvoeren.",
      rating: 5,
      imageUrl: "",
    });

    await storage.createTestimonial({
      name: "Fam. T.",
      location: "België",
      content:
        "Perfect alles goed geregeld houd zich aan de afspraak en de gordijnen zijn heel mooi hartelijk dank en tot de volgende keer! Heel aanbevolen goede familiebedrijf! Top service en afspraken worden nagekomen!!",
      rating: 5,
      imageUrl: "",
    });
    await storage.createTestimonial({
      name: "Mrs. Ilona",
      location: "België",
      content:
        "“Ik ben erg tevreden over de aankopen van mijn vitrage en overgordijnen bij de Zilvernaald. De service was uiterst vriendelijk en betrouwbaar. De gordijnen en vitrage zijn prachtig afgewerkt waardoor mijn interieur meteen een klasse uitstraling kreeg. Aanrader!”",
      rating: 5,
      imageUrl: "",
    });

    console.log("Initial data seeding complete!");
  }
}



// Initialize the database storage
export const storage = new DatabaseStorage();

// Seed initial data (will only run if the database is empty)
seedInitialData(storage).catch((error) => {
  console.error("Error seeding initial data:", error);
});

// Initialize AI chatbot knowledge base
import { seedChatbotKnowledge } from "./seedKnowledgeBase";
seedChatbotKnowledge().catch((error) => {
  console.error("Error seeding chatbot knowledge:", error);
});
