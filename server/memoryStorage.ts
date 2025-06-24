import type { IStorage } from "./storage";
import type {
  Category, InsertCategory,
  Product, InsertProduct,
  GalleryItem, InsertGalleryItem,
  Testimonial, InsertTestimonial,
  SmartQuoteRequest, InsertSmartQuoteRequest,
  QuoteRequest, InsertQuoteRequest,
  ContactSubmission, InsertContactSubmission,
  DealerContactSubmission, InsertDealerContact,
  ChatbotConversation, InsertChatbotConversation,
  ChatbotMessage, InsertChatbotMessage,
  ChatbotKnowledge, InsertChatbotKnowledge,
  ChatbotPricing, InsertChatbotPricing,
  ChatbotFaq, InsertChatbotFaq,
  ChatbotAdminTraining, InsertChatbotAdminTraining,
  PriceRequestNotification, InsertPriceRequestNotification,
  PriceResponseKnowledge, InsertPriceResponseKnowledge,
  PriceResponseLog, InsertPriceResponseLog,
  NewsletterSubscription, InsertNewsletterSubscription,
  StyleQuoteRequest, InsertStyleQuoteRequest,
  PaymentOrder, InsertPaymentOrder,
  ShoppingCartItem, InsertShoppingCartItem
} from "@shared/schema";

export class MemoryStorage implements IStorage {
  private categories: Category[] = [];
  private products: Product[] = [];
  private galleryItems: GalleryItem[] = [];
  private testimonials: Testimonial[] = [];
  private smartQuoteRequests: SmartQuoteRequest[] = [];
  private quoteRequests: QuoteRequest[] = [];
  private contactSubmissions: ContactSubmission[] = [];
  private dealerContactSubmissions: DealerContactSubmission[] = [];
  private chatbotConversations: ChatbotConversation[] = [];
  private chatbotMessages: ChatbotMessage[] = [];
  private chatbotKnowledge: ChatbotKnowledge[] = [];
  private chatbotPricing: ChatbotPricing[] = [];
  private chatbotFaq: ChatbotFaq[] = [];
  private chatbotAdminTraining: ChatbotAdminTraining[] = [];
  private priceRequestNotifications: PriceRequestNotification[] = [];
  private priceResponseKnowledge: PriceResponseKnowledge[] = [];
  private priceResponseLogs: PriceResponseLog[] = [];
  private newsletterSubscriptions: NewsletterSubscription[] = [];
  private styleQuoteRequests: StyleQuoteRequest[] = [];
  private paymentOrders: PaymentOrder[] = [];
  private shoppingCartItems: ShoppingCartItem[] = [];

  private nextId = 1;

  // Categories
  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.find(c => c.id === id);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const newCategory: Category = { ...category, id: this.nextId++ };
    this.categories.push(newCategory);
    return newCategory;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return [...this.products];
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.find(p => p.id === id);
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return this.products.filter(p => p.categoryId === categoryId);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.products.filter(p => p.isFeatured);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct: Product = { ...product, id: this.nextId++ };
    this.products.push(newProduct);
    return newProduct;
  }

  // Gallery Items
  async getGalleryItems(): Promise<GalleryItem[]> {
    return [...this.galleryItems];
  }

  async getGalleryItemById(id: number): Promise<GalleryItem | undefined> {
    return this.galleryItems.find(g => g.id === id);
  }

  async createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem> {
    const newItem: GalleryItem = { ...item, id: this.nextId++ };
    this.galleryItems.push(newItem);
    return newItem;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return [...this.testimonials];
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.find(t => t.id === id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = { ...testimonial, id: this.nextId++ };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  // Smart Quote Requests
  async createSmartQuoteRequest(request: InsertSmartQuoteRequest): Promise<SmartQuoteRequest> {
    const newRequest: SmartQuoteRequest = { 
      ...request, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.smartQuoteRequests.push(newRequest);
    return newRequest;
  }

  async getSmartQuoteRequests(): Promise<SmartQuoteRequest[]> {
    return [...this.smartQuoteRequests];
  }

  // Quote Requests
  async createQuoteRequest(request: InsertQuoteRequest): Promise<QuoteRequest> {
    const newRequest: QuoteRequest = { 
      ...request, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.quoteRequests.push(newRequest);
    return newRequest;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return [...this.quoteRequests];
  }

  // Contact Submissions
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.contactSubmissions.push(newSubmission);
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return [...this.contactSubmissions];
  }

  // Dealer Contact Submissions
  async createDealerContactSubmission(submission: InsertDealerContact): Promise<DealerContactSubmission> {
    const newSubmission: DealerContactSubmission = { 
      ...submission, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.dealerContactSubmissions.push(newSubmission);
    return newSubmission;
  }

  async getDealerContactSubmissions(): Promise<DealerContactSubmission[]> {
    return [...this.dealerContactSubmissions];
  }

  // Chatbot Conversations
  async createChatbotConversation(conversation: InsertChatbotConversation): Promise<ChatbotConversation> {
    const newConversation: ChatbotConversation = { 
      ...conversation, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.chatbotConversations.push(newConversation);
    return newConversation;
  }

  async getChatbotConversationById(id: number): Promise<ChatbotConversation | undefined> {
    return this.chatbotConversations.find(c => c.id === id);
  }

  async getChatbotConversationBySessionId(sessionId: string): Promise<ChatbotConversation | undefined> {
    return this.chatbotConversations.find(c => c.sessionId === sessionId);
  }

  async updateChatbotConversation(id: number, updates: Partial<ChatbotConversation>): Promise<ChatbotConversation> {
    const index = this.chatbotConversations.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Conversation not found');
    this.chatbotConversations[index] = { ...this.chatbotConversations[index], ...updates };
    return this.chatbotConversations[index];
  }

  // Chatbot Messages
  async createChatbotMessage(message: InsertChatbotMessage): Promise<ChatbotMessage> {
    const newMessage: ChatbotMessage = { 
      ...message, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.chatbotMessages.push(newMessage);
    return newMessage;
  }

  async getChatbotMessagesByConversationId(conversationId: number): Promise<ChatbotMessage[]> {
    return this.chatbotMessages.filter(m => m.conversationId === conversationId);
  }

  // Chatbot Knowledge
  async getChatbotKnowledge(): Promise<ChatbotKnowledge[]> {
    return [...this.chatbotKnowledge];
  }

  async createChatbotKnowledge(knowledge: InsertChatbotKnowledge): Promise<ChatbotKnowledge> {
    const newKnowledge: ChatbotKnowledge = { ...knowledge, id: this.nextId++ };
    this.chatbotKnowledge.push(newKnowledge);
    return newKnowledge;
  }

  // Chatbot Pricing
  async getChatbotPricing(): Promise<ChatbotPricing[]> {
    return [...this.chatbotPricing];
  }

  async createChatbotPricing(pricing: InsertChatbotPricing): Promise<ChatbotPricing> {
    const newPricing: ChatbotPricing = { ...pricing, id: this.nextId++ };
    this.chatbotPricing.push(newPricing);
    return newPricing;
  }

  // Chatbot FAQ
  async getChatbotFaq(): Promise<ChatbotFaq[]> {
    return [...this.chatbotFaq];
  }

  async createChatbotFaq(faq: InsertChatbotFaq): Promise<ChatbotFaq> {
    const newFaq: ChatbotFaq = { ...faq, id: this.nextId++ };
    this.chatbotFaq.push(newFaq);
    return newFaq;
  }

  // Chatbot Admin Training
  async getChatbotAdminTraining(): Promise<ChatbotAdminTraining[]> {
    return [...this.chatbotAdminTraining];
  }

  async createChatbotAdminTraining(training: InsertChatbotAdminTraining): Promise<ChatbotAdminTraining> {
    const newTraining: ChatbotAdminTraining = { 
      ...training, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.chatbotAdminTraining.push(newTraining);
    return newTraining;
  }

  // Price Request Notifications
  async createPriceRequestNotification(notification: InsertPriceRequestNotification): Promise<PriceRequestNotification> {
    const newNotification: PriceRequestNotification = { 
      ...notification, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.priceRequestNotifications.push(newNotification);
    return newNotification;
  }

  // Price Response Knowledge
  async getPriceResponseKnowledge(): Promise<PriceResponseKnowledge[]> {
    return [...this.priceResponseKnowledge];
  }

  async createPriceResponseKnowledge(knowledge: InsertPriceResponseKnowledge): Promise<PriceResponseKnowledge> {
    const newKnowledge: PriceResponseKnowledge = { 
      ...knowledge, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.priceResponseKnowledge.push(newKnowledge);
    return newKnowledge;
  }

  // Price Response Logs
  async createPriceResponseLog(log: InsertPriceResponseLog): Promise<PriceResponseLog> {
    const newLog: PriceResponseLog = { 
      ...log, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.priceResponseLogs.push(newLog);
    return newLog;
  }

  // Newsletter Subscriptions
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const newSubscription: NewsletterSubscription = { 
      ...subscription, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.newsletterSubscriptions.push(newSubscription);
    return newSubscription;
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    return this.newsletterSubscriptions.find(s => s.email === email);
  }

  // Style Quote Requests
  async createStyleQuoteRequest(request: InsertStyleQuoteRequest): Promise<StyleQuoteRequest> {
    const newRequest: StyleQuoteRequest = { 
      ...request, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.styleQuoteRequests.push(newRequest);
    return newRequest;
  }

  // Payment Orders
  async createPaymentOrder(order: InsertPaymentOrder): Promise<PaymentOrder> {
    const newOrder: PaymentOrder = { 
      ...order, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.paymentOrders.push(newOrder);
    return newOrder;
  }

  async createPaymentOrderWithMollieId(data: {
    molliePaymentId: string;
    customerName: string;
    customerEmail: string;
    amount: number;
    currency: string;
    description: string;
    redirectUrl: string;
    webhookUrl?: string;
    checkoutUrl?: string;
    productDetails?: any;
    customerDetails?: any;
    mollieStatus?: string;
    status?: string;
  }): Promise<PaymentOrder> {
    const newOrder: PaymentOrder = {
      id: this.nextId++,
      molliePaymentId: data.molliePaymentId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      redirectUrl: data.redirectUrl,
      webhookUrl: data.webhookUrl || null,
      checkoutUrl: data.checkoutUrl || null,
      productDetails: data.productDetails || null,
      customerDetails: data.customerDetails || null,
      mollieStatus: data.mollieStatus || 'pending',
      status: data.status || 'pending',
      createdAt: new Date()
    };
    this.paymentOrders.push(newOrder);
    return newOrder;
  }

  async getPaymentOrderById(id: number): Promise<PaymentOrder | undefined> {
    return this.paymentOrders.find(o => o.id === id);
  }

  async getPaymentOrderByMollieId(molliePaymentId: string): Promise<PaymentOrder | undefined> {
    return this.paymentOrders.find(o => o.molliePaymentId === molliePaymentId);
  }

  async updatePaymentOrder(id: number, updates: Partial<PaymentOrder>): Promise<PaymentOrder> {
    const index = this.paymentOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Payment order not found');
    this.paymentOrders[index] = { ...this.paymentOrders[index], ...updates };
    return this.paymentOrders[index];
  }

  async getPaymentOrdersByCustomerEmail(email: string): Promise<PaymentOrder[]> {
    return this.paymentOrders.filter(o => o.customerEmail === email);
  }

  // Shopping Cart
  async addItemToCart(item: InsertShoppingCartItem): Promise<ShoppingCartItem> {
    const newItem: ShoppingCartItem = { 
      ...item, 
      id: this.nextId++,
      createdAt: new Date()
    };
    this.shoppingCartItems.push(newItem);
    return newItem;
  }

  async getCartItems(sessionId: string): Promise<ShoppingCartItem[]> {
    return this.shoppingCartItems.filter(i => i.sessionId === sessionId);
  }

  async updateCartItem(id: number, updates: Partial<ShoppingCartItem>): Promise<ShoppingCartItem> {
    const index = this.shoppingCartItems.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Cart item not found');
    this.shoppingCartItems[index] = { ...this.shoppingCartItems[index], ...updates };
    return this.shoppingCartItems[index];
  }

  async removeCartItem(id: number): Promise<void> {
    const index = this.shoppingCartItems.findIndex(i => i.id === id);
    if (index !== -1) {
      this.shoppingCartItems.splice(index, 1);
    }
  }

  async clearCart(sessionId: string): Promise<void> {
    this.shoppingCartItems = this.shoppingCartItems.filter(i => i.sessionId !== sessionId);
  }
}