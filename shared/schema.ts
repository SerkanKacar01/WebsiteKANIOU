import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, foreignKey, unique, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Product Categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: doublePrecision("price").notNull(),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: 'cascade' }),
  isFeatured: boolean("is_featured").default(false),
  isBestSeller: boolean("is_best_seller").default(false),
  isNewArrival: boolean("is_new_arrival").default(false),
  material: text("material"),
  dimensions: text("dimensions"),
  features: text("features").array(),
  colors: text("colors").array(),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Gallery Items
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: 'cascade' }),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
});

// Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Quote Requests
export const quoteRequests = pgTable("quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  productType: text("product_type").notNull(),
  dimensions: text("dimensions"),
  requirements: text("requirements"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, "Phone number can only contain numbers, spaces, +, -, (, )"),
  productType: z.string()
    .min(1, "Product type is required")
    .max(100, "Product type must be less than 100 characters"),
  dimensions: z.string()
    .max(500, "Dimensions must be less than 500 characters")
    .optional(),
  requirements: z.string()
    .min(10, "Requirements must be at least 10 characters")
    .max(2000, "Requirements must be less than 2000 characters")
    .optional(),
  // Honeypot field for spam protection
  website: z.string().max(0, "Invalid submission").optional(),
});

// Contact Form Submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  subject: z.string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject must be less than 200 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  // Honeypot field for spam protection
  website: z.string().max(0, "Invalid submission").optional(),
});

// Define relations between tables
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
  galleryItems: many(galleryItems),
}));

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const galleryItemsRelations = relations(galleryItems, ({ one }) => ({
  category: one(categories, {
    fields: [galleryItems.categoryId],
    references: [categories.id],
  }),
}));

// Export type definitions
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;

// Chatbot Conversations
export const chatbotConversations = pgTable("chatbot_conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  userId: text("user_id"), // Optional for anonymous users
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChatbotConversationSchema = createInsertSchema(chatbotConversations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Chatbot Messages
export const chatbotMessages = pgTable("chatbot_messages", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => chatbotConversations.id, { onDelete: 'cascade' }),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  metadata: jsonb("metadata"), // Additional data like tokens, processing time, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatbotMessageSchema = createInsertSchema(chatbotMessages).omit({
  id: true,
  createdAt: true,
});

// Knowledge Base for AI responses
export const chatbotKnowledge = pgTable("chatbot_knowledge", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'product', 'faq', 'pricing', 'general'
  topic: text("topic").notNull(),
  content: text("content").notNull(),
  language: text("language").default("nl"),
  priority: integer("priority").default(1), // Higher priority = more important
  adminApproved: boolean("admin_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChatbotKnowledgeSchema = createInsertSchema(chatbotKnowledge).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Pricing Information
export const chatbotPricing = pgTable("chatbot_pricing", {
  id: serial("id").primaryKey(),
  productType: text("product_type").notNull(),
  pricingInfo: jsonb("pricing_info").notNull(),
  adminProvidedBy: text("admin_provided_by"), // Admin identifier
  requestContext: text("request_context"), // Original user question that triggered price request
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChatbotPricingSchema = createInsertSchema(chatbotPricing).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// FAQ Knowledge Base
export const chatbotFaq = pgTable("chatbot_faq", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // 'installation', 'guarantees', 'measuring', 'delivery'
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  language: text("language").default("nl"),
  adminApproved: boolean("admin_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatbotFaqSchema = createInsertSchema(chatbotFaq).omit({
  id: true,
  createdAt: true,
});

// Admin Training Sessions
export const chatbotAdminTraining = pgTable("chatbot_admin_training", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").references(() => chatbotConversations.id, { onDelete: 'cascade' }),
  adminFeedback: text("admin_feedback").notNull(),
  improvedResponse: text("improved_response").notNull(),
  trainingContext: jsonb("training_context"), // Context that led to training
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatbotAdminTrainingSchema = createInsertSchema(chatbotAdminTraining).omit({
  id: true,
  createdAt: true,
});

// Chatbot relations
export const chatbotConversationsRelations = relations(chatbotConversations, ({ many }) => ({
  messages: many(chatbotMessages),
  adminTraining: many(chatbotAdminTraining),
}));

export const chatbotMessagesRelations = relations(chatbotMessages, ({ one }) => ({
  conversation: one(chatbotConversations, {
    fields: [chatbotMessages.conversationId],
    references: [chatbotConversations.id],
  }),
}));

export const chatbotAdminTrainingRelations = relations(chatbotAdminTraining, ({ one }) => ({
  conversation: one(chatbotConversations, {
    fields: [chatbotAdminTraining.conversationId],
    references: [chatbotConversations.id],
  }),
}));

// Chatbot type definitions
export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
export type InsertChatbotConversation = z.infer<typeof insertChatbotConversationSchema>;

export type ChatbotMessage = typeof chatbotMessages.$inferSelect;
export type InsertChatbotMessage = z.infer<typeof insertChatbotMessageSchema>;

export type ChatbotKnowledge = typeof chatbotKnowledge.$inferSelect;
export type InsertChatbotKnowledge = z.infer<typeof insertChatbotKnowledgeSchema>;

export type ChatbotPricing = typeof chatbotPricing.$inferSelect;
export type InsertChatbotPricing = z.infer<typeof insertChatbotPricingSchema>;

export type ChatbotFaq = typeof chatbotFaq.$inferSelect;
export type InsertChatbotFaq = z.infer<typeof insertChatbotFaqSchema>;

export type ChatbotAdminTraining = typeof chatbotAdminTraining.$inferSelect;
export type InsertChatbotAdminTraining = z.infer<typeof insertChatbotAdminTrainingSchema>;

// Price Request Notifications
export const priceRequestNotifications = pgTable("price_request_notifications", {
  id: serial("id").primaryKey(),
  conversationId: integer("conversation_id").notNull().references(() => chatbotConversations.id, { onDelete: 'cascade' }),
  userMessage: text("user_message").notNull(),
  userEmail: text("user_email"),
  userName: text("user_name"),
  detectedKeywords: text("detected_keywords").array(),
  isResponded: boolean("is_responded").default(false),
  adminResponse: text("admin_response"),
  responseKeywords: text("response_keywords"), // Keywords to match future queries
  createdAt: timestamp("created_at").defaultNow(),
  respondedAt: timestamp("responded_at"),
});

export const insertPriceRequestNotificationSchema = createInsertSchema(priceRequestNotifications).omit({
  id: true,
  createdAt: true,
  respondedAt: true,
});

// Price Response Knowledge Base
export const priceResponseKnowledge = pgTable("price_response_knowledge", {
  id: serial("id").primaryKey(),
  triggerKeywords: text("trigger_keywords").array().notNull(), // Keywords that trigger this response
  response: text("response").notNull(),
  language: text("language").default("nl"),
  adminCreatedBy: text("admin_created_by").default("serkan"),
  usageCount: integer("usage_count").default(0),
  lastUsedAt: timestamp("last_used_at"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPriceResponseKnowledgeSchema = createInsertSchema(priceResponseKnowledge).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastUsedAt: true,
});

// Price Response Usage Logs
export const priceResponseLogs = pgTable("price_response_logs", {
  id: serial("id").primaryKey(),
  knowledgeId: integer("knowledge_id").notNull().references(() => priceResponseKnowledge.id, { onDelete: 'cascade' }),
  conversationId: integer("conversation_id").notNull().references(() => chatbotConversations.id, { onDelete: 'cascade' }),
  customerQuestion: text("customer_question").notNull(),
  responseUsed: text("response_used").notNull(),
  matchedKeywords: text("matched_keywords").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPriceResponseLogSchema = createInsertSchema(priceResponseLogs).omit({
  id: true,
  createdAt: true,
});

// Relations for new tables
export const priceRequestNotificationsRelations = relations(priceRequestNotifications, ({ one }) => ({
  conversation: one(chatbotConversations, {
    fields: [priceRequestNotifications.conversationId],
    references: [chatbotConversations.id],
  }),
}));

export const priceResponseKnowledgeRelations = relations(priceResponseKnowledge, ({ many }) => ({
  logs: many(priceResponseLogs),
}));

export const priceResponseLogsRelations = relations(priceResponseLogs, ({ one }) => ({
  knowledge: one(priceResponseKnowledge, {
    fields: [priceResponseLogs.knowledgeId],
    references: [priceResponseKnowledge.id],
  }),
  conversation: one(chatbotConversations, {
    fields: [priceResponseLogs.conversationId],
    references: [chatbotConversations.id],
  }),
}));

// Type definitions for new tables
export type PriceRequestNotification = typeof priceRequestNotifications.$inferSelect;
export type InsertPriceRequestNotification = z.infer<typeof insertPriceRequestNotificationSchema>;

export type PriceResponseKnowledge = typeof priceResponseKnowledge.$inferSelect;
export type InsertPriceResponseKnowledge = z.infer<typeof insertPriceResponseKnowledgeSchema>;

export type PriceResponseLog = typeof priceResponseLogs.$inferSelect;
export type InsertPriceResponseLog = z.infer<typeof insertPriceResponseLogSchema>;

// Newsletter Subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").notNull().unique(),
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  source: text("source").default("website"), // Where they signed up from
  subscribedAt: timestamp("subscribed_at").defaultNow(),
  unsubscribedAt: timestamp("unsubscribed_at"),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  subscribedAt: true,
  unsubscribedAt: true,
}).extend({
  name: z.string()
    .min(2, "Naam moet minstens 2 karakters bevatten")
    .max(100, "Naam mag maximaal 100 karakters bevatten")
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, "Naam mag alleen letters, spaties, koppeltekens en apostroffen bevatten")
    .optional(),
  email: z.string()
    .email("Gelieve een geldig e-mailadres in te voeren")
    .max(254, "E-mailadres mag maximaal 254 karakters bevatten"),
  language: z.string().default("nl"),
  // Honeypot field for spam protection
  website: z.string().max(0, "Ongeldige inzending").optional(),
});

// Newsletter Subscription type definitions
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
