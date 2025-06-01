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

// Smart Quote Requests with Dynamic Pricing
export const smartQuoteRequests = pgTable("smart_quote_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  roomType: text("room_type").notNull(),
  productType: text("product_type").notNull(),
  material: text("material").notNull(),
  width: doublePrecision("width").notNull(), // in cm
  height: doublePrecision("height").notNull(), // in cm
  colorPreference: text("color_preference"),
  stylePreference: text("style_preference"),
  installationRequired: boolean("installation_required").default(false),
  additionalNotes: text("additional_notes"),
  estimatedPrice: doublePrecision("estimated_price").notNull(),
  language: text("language").default("nl"),
  status: text("status").default("pending"), // 'pending', 'quoted', 'confirmed', 'cancelled'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertSmartQuoteRequestSchema = createInsertSchema(smartQuoteRequests).omit({
  id: true,
  createdAt: true,
  estimatedPrice: true, // Will be calculated automatically
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
  roomType: z.string()
    .min(1, "Room type is required"),
  productType: z.string()
    .min(1, "Product type is required"),
  material: z.string()
    .min(1, "Material selection is required"),
  width: z.number()
    .min(30, "Width must be at least 30cm")
    .max(500, "Width cannot exceed 500cm"),
  height: z.number()
    .min(30, "Height must be at least 30cm")
    .max(400, "Height cannot exceed 400cm"),
  colorPreference: z.string().optional(),
  stylePreference: z.string().optional(),
  installationRequired: z.boolean().default(false),
  additionalNotes: z.string()
    .max(1000, "Additional notes must be less than 1000 characters")
    .optional(),
  language: z.string().default("nl"),
  // Honeypot field for spam protection
  website: z.string().max(0, "Invalid submission").optional(),
});

// Keep the old quote requests table for backward compatibility
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

export type SmartQuoteRequest = typeof smartQuoteRequests.$inferSelect;
export type InsertSmartQuoteRequest = z.infer<typeof insertSmartQuoteRequestSchema>;

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



// Virtual Room Preview System
export const virtualRoomPreviews = pgTable("virtual_room_previews", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  roomImageUrl: text("room_image_url").notNull(), // Original room photo
  previewImageUrl: text("preview_image_url"), // Generated preview with product
  productCategory: text("product_category").notNull(),
  productMaterial: text("product_material"),
  productColor: text("product_color"),
  productStyle: text("product_style"),
  roomType: text("room_type"), // living room, bedroom, kitchen, etc.
  dimensions: jsonb("dimensions"), // width, height if provided
  customerEmail: text("customer_email"),
  customerName: text("customer_name"),
  language: text("language").default("nl"),
  isQuoteRequested: boolean("is_quote_requested").default(false),
  metadata: jsonb("metadata"), // Additional preview settings
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVirtualRoomPreviewSchema = createInsertSchema(virtualRoomPreviews).omit({
  id: true,
  createdAt: true,
}).extend({
  sessionId: z.string().min(1, "Session ID is required"),
  roomImageUrl: z.string().url("Valid room image URL required"),
  productCategory: z.string().min(1, "Product category is required"),
  productMaterial: z.string().optional(),
  productColor: z.string().optional(),
  productStyle: z.string().optional(),
  roomType: z.string().optional(),
  customerEmail: z.string().email().optional(),
  customerName: z.string().min(2).max(100).optional(),
  language: z.string().default("nl"),
  isQuoteRequested: z.boolean().default(false),
});

export type VirtualRoomPreview = typeof virtualRoomPreviews.$inferSelect;
export type InsertVirtualRoomPreview = z.infer<typeof insertVirtualRoomPreviewSchema>;



// Blocked Dates and Availability Management
export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(), // YYYY-MM-DD format
  reason: text("reason"), // Holiday, vacation, etc.
  isRecurring: boolean("is_recurring").default(false),
  recurringType: text("recurring_type"), // 'weekly', 'monthly', 'yearly'
  blockedSlots: text("blocked_slots").array(), // Specific time slots to block, or empty for full day
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBlockedDateSchema = createInsertSchema(blockedDates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  reason: z.string().min(1, "Reason is required").max(200, "Reason must be less than 200 characters"),
  isRecurring: z.boolean().default(false),
  recurringType: z.enum(["weekly", "monthly", "yearly"]).optional(),
  blockedSlots: z.array(z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format")).optional(),
});

export type BlockedDate = typeof blockedDates.$inferSelect;
export type InsertBlockedDate = z.infer<typeof insertBlockedDateSchema>;

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

// User Preferences for personalized experience
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(), // Session-based or persistent user ID
  language: text("language").notNull().default("nl"), // User's preferred language
  name: text("name"), // User's name if provided
  email: text("email"), // User's email if provided
  chatHistory: jsonb("chat_history"), // Summarized chat history
  preferences: jsonb("preferences"), // Additional user preferences
  lastActive: timestamp("last_active").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  userId: z.string().min(1, "User ID is required"),
  language: z.enum(["nl", "en", "fr", "tr"], {
    errorMap: () => ({ message: "Language must be one of: nl, en, fr, tr" })
  }),
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
});

export type UserPreferences = typeof userPreferences.$inferSelect;
export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;

// Interior Style Consultation Sessions
export const styleConsultations = pgTable("style_consultations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  conversationId: integer("conversation_id").references(() => chatbotConversations.id, { onDelete: 'cascade' }),
  currentStep: text("current_step").default("room_type"), // room_type, primary_goal, style_preference, color_material, budget, recommendations
  roomType: text("room_type"),
  primaryGoal: text("primary_goal"),
  stylePreference: text("style_preference"),
  colorPreferences: text("color_preferences").array(),
  materialPreferences: text("material_preferences").array(),
  budgetRange: text("budget_range"),
  windowSize: text("window_size"),
  specialRequirements: text("special_requirements"),
  recommendations: jsonb("recommendations"),
  language: text("language").default("nl"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStyleConsultationSchema = createInsertSchema(styleConsultations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Style Consultation Product Mappings
export const styleProductMappings = pgTable("style_product_mappings", {
  id: serial("id").primaryKey(),
  roomType: text("room_type").notNull(),
  styleType: text("style_type").notNull(),
  primaryGoal: text("primary_goal").notNull(),
  recommendedProducts: text("recommended_products").array().notNull(),
  productDescriptions: jsonb("product_descriptions").notNull(),
  priceRanges: jsonb("price_ranges").notNull(),
  materialSuggestions: text("material_suggestions").array(),
  colorSuggestions: text("color_suggestions").array(),
  specialNotes: text("special_notes"),
  priority: integer("priority").default(1),
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStyleProductMappingSchema = createInsertSchema(styleProductMappings).omit({
  id: true,
  createdAt: true,
});

// Style Consultation Quote Requests
export const styleQuoteRequests = pgTable("style_quote_requests", {
  id: serial("id").primaryKey(),
  consultationId: integer("consultation_id").notNull().references(() => styleConsultations.id, { onDelete: 'cascade' }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerAddress: text("customer_address"),
  selectedRecommendations: jsonb("selected_recommendations").notNull(),
  measurements: text("measurements"),
  additionalRequirements: text("additional_requirements"),
  isProcessed: boolean("is_processed").default(false),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  processedAt: timestamp("processed_at"),
});

export const insertStyleQuoteRequestSchema = createInsertSchema(styleQuoteRequests).omit({
  id: true,
  createdAt: true,
  processedAt: true,
}).extend({
  customerName: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens, and apostrophes"),
  customerEmail: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  customerAddress: z.string()
    .max(500, "Address must be less than 500 characters")
    .optional(),
  measurements: z.string()
    .max(1000, "Measurements must be less than 1000 characters")
    .optional(),
  additionalRequirements: z.string()
    .max(2000, "Additional requirements must be less than 2000 characters")
    .optional(),
});

// Relations for style consultation tables
export const styleConsultationsRelations = relations(styleConsultations, ({ one, many }) => ({
  conversation: one(chatbotConversations, {
    fields: [styleConsultations.conversationId],
    references: [chatbotConversations.id],
  }),
  quoteRequests: many(styleQuoteRequests),
}));

export const styleQuoteRequestsRelations = relations(styleQuoteRequests, ({ one }) => ({
  consultation: one(styleConsultations, {
    fields: [styleQuoteRequests.consultationId],
    references: [styleConsultations.id],
  }),
}));

// Type definitions for style consultation tables
export type StyleConsultation = typeof styleConsultations.$inferSelect;
export type InsertStyleConsultation = z.infer<typeof insertStyleConsultationSchema>;

export type StyleProductMapping = typeof styleProductMappings.$inferSelect;
export type InsertStyleProductMapping = z.infer<typeof insertStyleProductMappingSchema>;

export type StyleQuoteRequest = typeof styleQuoteRequests.$inferSelect;
export type InsertStyleQuoteRequest = z.infer<typeof insertStyleQuoteRequestSchema>;

// Website Content Index - Full site crawl and knowledge extraction
export const websiteContentIndex = pgTable("website_content_index", {
  id: serial("id").primaryKey(),
  pageUrl: text("page_url").notNull(),
  pageTitle: text("page_title").notNull(),
  category: text("category").notNull(), // 'products', 'services', 'pricing', 'installation', 'warranty', 'maintenance', 'company', 'support', 'faq'
  subCategory: text("sub_category"), // For more granular organization
  language: text("language").notNull().default("nl"), // 'nl', 'fr', 'en', 'tr'
  contentType: text("content_type").notNull(), // 'product-description', 'service-info', 'pricing-table', 'faq', 'general-info'
  headingText: text("heading_text"), // Main headings (H1, H2, H3)
  bodyContent: text("body_content").notNull(), // Full text content
  metaDescription: text("meta_description"), // SEO meta description
  keywords: text("keywords").array(), // Extracted keywords
  images: jsonb("images"), // Image URLs and alt texts
  links: jsonb("links"), // Internal and external links
  structuredData: jsonb("structured_data"), // Any schema.org or structured data
  lastCrawled: timestamp("last_crawled").defaultNow(),
  isActive: boolean("is_active").default(true),
  crawlSource: text("crawl_source").default("manual"), // 'manual', 'automated', 'sitemap'
});

export const insertWebsiteContentIndexSchema = createInsertSchema(websiteContentIndex).omit({
  id: true,
  lastCrawled: true,
});

// Website Content Index type definitions
export type WebsiteContentIndex = typeof websiteContentIndex.$inferSelect;
export type InsertWebsiteContentIndex = z.infer<typeof insertWebsiteContentIndexSchema>;

// Inventory Alert Subscriptions
export const inventoryAlerts = pgTable("inventory_alerts", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  productName: text("product_name").notNull(),
  productVariant: text("product_variant"), // Optional variant/size/color
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  notificationSent: boolean("notification_sent").default(false),
  conversationId: integer("conversation_id").references(() => chatbotConversations.id, { onDelete: 'set null' }),
  userAgent: text("user_agent"), // For analytics
  createdAt: timestamp("created_at").defaultNow(),
  notifiedAt: timestamp("notified_at"),
}, (table) => ({
  // Prevent duplicate subscriptions for same email/product
  uniqueSubscription: unique().on(table.email, table.productName, table.productVariant),
}));

export const insertInventoryAlertSchema = createInsertSchema(inventoryAlerts).omit({
  id: true,
  createdAt: true,
  notifiedAt: true,
}).extend({
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  productName: z.string()
    .min(1, "Product name is required")
    .max(200, "Product name must be less than 200 characters"),
  productVariant: z.string()
    .max(100, "Product variant must be less than 100 characters")
    .optional(),
  language: z.enum(["nl", "fr", "en", "tr"]).default("nl"),
});

// Product Stock Status for tracking availability
export const productStock = pgTable("product_stock", {
  id: serial("id").primaryKey(),
  productName: text("product_name").notNull(),
  productVariant: text("product_variant"), // Optional variant
  stockLevel: integer("stock_level").notNull().default(0),
  lowStockThreshold: integer("low_stock_threshold").default(5),
  isAvailable: boolean("is_available").default(true),
  lastUpdated: timestamp("last_updated").defaultNow(),
  updatedBy: text("updated_by").default("admin"), // Who updated the stock
}, (table) => ({
  // Ensure unique product/variant combinations
  uniqueProduct: unique().on(table.productName, table.productVariant),
}));

export const insertProductStockSchema = createInsertSchema(productStock).omit({
  id: true,
  lastUpdated: true,
}).extend({
  productName: z.string()
    .min(1, "Product name is required")
    .max(200, "Product name must be less than 200 characters"),
  productVariant: z.string()
    .max(100, "Product variant must be less than 100 characters")
    .optional(),
  stockLevel: z.number()
    .min(0, "Stock level cannot be negative"),
  lowStockThreshold: z.number()
    .min(0, "Low stock threshold cannot be negative")
    .default(5),
});

// Inventory Alert Log for tracking notifications sent
export const inventoryAlertLog = pgTable("inventory_alert_log", {
  id: serial("id").primaryKey(),
  alertId: integer("alert_id").notNull().references(() => inventoryAlerts.id, { onDelete: 'cascade' }),
  notificationType: text("notification_type").notNull(), // 'back_in_stock', 'low_stock', 'admin_notification'
  recipientEmail: text("recipient_email").notNull(),
  emailSubject: text("email_subject").notNull(),
  emailContent: text("email_content").notNull(),
  language: text("language").default("nl"),
  sentSuccessfully: boolean("sent_successfully").default(false),
  errorMessage: text("error_message"),
  sentAt: timestamp("sent_at").defaultNow(),
});

export const insertInventoryAlertLogSchema = createInsertSchema(inventoryAlertLog).omit({
  id: true,
  sentAt: true,
});

// Relations for inventory alerts
export const inventoryAlertsRelations = relations(inventoryAlerts, ({ one, many }) => ({
  conversation: one(chatbotConversations, {
    fields: [inventoryAlerts.conversationId],
    references: [chatbotConversations.id],
  }),
  logs: many(inventoryAlertLog),
}));

export const inventoryAlertLogRelations = relations(inventoryAlertLog, ({ one }) => ({
  alert: one(inventoryAlerts, {
    fields: [inventoryAlertLog.alertId],
    references: [inventoryAlerts.id],
  }),
}));

// Type definitions for inventory alerts
export type InventoryAlert = typeof inventoryAlerts.$inferSelect;
export type InsertInventoryAlert = z.infer<typeof insertInventoryAlertSchema>;

export type ProductStock = typeof productStock.$inferSelect;
export type InsertProductStock = z.infer<typeof insertProductStockSchema>;

export type InventoryAlertLog = typeof inventoryAlertLog.$inferSelect;
export type InsertInventoryAlertLog = z.infer<typeof insertInventoryAlertLogSchema>;

// Loyalty Program Tables
export const loyaltyCustomers = pgTable("loyalty_customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  totalPoints: integer("total_points").default(0),
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  lastActivity: timestamp("last_activity").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLoyaltyCustomerSchema = createInsertSchema(loyaltyCustomers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(254),
  language: z.enum(["nl", "fr", "en", "tr"]).default("nl"),
});

export const loyaltyTransactions = pgTable("loyalty_transactions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => loyaltyCustomers.id, { onDelete: 'cascade' }),
  type: text("type").notNull(), // 'purchase', 'review', 'referral', 'quote', 'newsletter'
  points: integer("points").notNull(),
  description: text("description").notNull(),
  relatedId: text("related_id"), // Link to related record (quote ID, product ID, etc.)
  language: text("language").default("nl"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoyaltyTransactionSchema = createInsertSchema(loyaltyTransactions).omit({
  id: true,
  createdAt: true,
}).extend({
  type: z.enum(["purchase", "review", "referral", "quote", "newsletter"]),
  points: z.number().min(1).max(1000),
  description: z.string().min(1).max(500),
});

export const loyaltyRewards = pgTable("loyalty_rewards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pointsRequired: integer("points_required").notNull(),
  rewardValue: doublePrecision("reward_value"), // e.g., €10 discount
  rewardType: text("reward_type").notNull(), // 'discount', 'service', 'priority'
  language: text("language").default("nl"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLoyaltyRewardSchema = createInsertSchema(loyaltyRewards).omit({
  id: true,
  createdAt: true,
}).extend({
  rewardType: z.enum(["discount", "service", "priority"]),
  pointsRequired: z.number().min(1).max(2000),
});

export const loyaltyRedemptions = pgTable("loyalty_redemptions", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => loyaltyCustomers.id, { onDelete: 'cascade' }),
  rewardId: integer("reward_id").notNull().references(() => loyaltyRewards.id, { onDelete: 'cascade' }),
  pointsUsed: integer("points_used").notNull(),
  status: text("status").default("pending"), // 'pending', 'approved', 'used', 'expired'
  redeemedAt: timestamp("redeemed_at").defaultNow(),
  usedAt: timestamp("used_at"),
  expiresAt: timestamp("expires_at"),
});

export const insertLoyaltyRedemptionSchema = createInsertSchema(loyaltyRedemptions).omit({
  id: true,
  redeemedAt: true,
});

// Warranty System Tables
export const customerWarranties = pgTable("customer_warranties", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => loyaltyCustomers.id, { onDelete: 'cascade' }),
  productName: text("product_name").notNull(),
  productType: text("product_type").notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  warrantyPeriodMonths: integer("warranty_period_months").default(24), // 2 years default
  warrantyExpiryDate: timestamp("warranty_expiry_date").notNull(),
  relatedQuoteId: text("related_quote_id"), // Link to quote or purchase
  status: text("status").default("active"), // 'active', 'expired', 'extended', 'claimed'
  language: text("language").default("nl"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCustomerWarrantySchema = createInsertSchema(customerWarranties).omit({
  id: true,
  createdAt: true,
  warrantyExpiryDate: true, // Will be calculated automatically
}).extend({
  productName: z.string().min(2).max(200),
  productType: z.string().min(2).max(100),
  warrantyPeriodMonths: z.number().min(12).max(120).default(24),
});

export const warrantyReminders = pgTable("warranty_reminders", {
  id: serial("id").primaryKey(),
  warrantyId: integer("warranty_id").notNull().references(() => customerWarranties.id, { onDelete: 'cascade' }),
  reminderType: text("reminder_type").notNull(), // '30_days', '7_days', 'expired'
  scheduledDate: timestamp("scheduled_date").notNull(),
  sentAt: timestamp("sent_at"),
  method: text("method").default("chatbot"), // 'chatbot', 'email', 'both'
  language: text("language").default("nl"),
  status: text("status").default("pending"), // 'pending', 'sent', 'failed'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWarrantyReminderSchema = createInsertSchema(warrantyReminders).omit({
  id: true,
  createdAt: true,
}).extend({
  reminderType: z.enum(["30_days", "7_days", "expired"]),
  method: z.enum(["chatbot", "email", "both"]).default("chatbot"),
});

// Loyalty Program Relations
export const loyaltyCustomersRelations = relations(loyaltyCustomers, ({ many }) => ({
  transactions: many(loyaltyTransactions),
  redemptions: many(loyaltyRedemptions),
  warranties: many(customerWarranties),
}));

export const loyaltyTransactionsRelations = relations(loyaltyTransactions, ({ one }) => ({
  customer: one(loyaltyCustomers, {
    fields: [loyaltyTransactions.customerId],
    references: [loyaltyCustomers.id],
  }),
}));

export const loyaltyRedemptionsRelations = relations(loyaltyRedemptions, ({ one }) => ({
  customer: one(loyaltyCustomers, {
    fields: [loyaltyRedemptions.customerId],
    references: [loyaltyCustomers.id],
  }),
  reward: one(loyaltyRewards, {
    fields: [loyaltyRedemptions.rewardId],
    references: [loyaltyRewards.id],
  }),
}));

export const customerWarrantiesRelations = relations(customerWarranties, ({ one, many }) => ({
  customer: one(loyaltyCustomers, {
    fields: [customerWarranties.customerId],
    references: [loyaltyCustomers.id],
  }),
  reminders: many(warrantyReminders),
}));

export const warrantyRemindersRelations = relations(warrantyReminders, ({ one }) => ({
  warranty: one(customerWarranties, {
    fields: [warrantyReminders.warrantyId],
    references: [customerWarranties.id],
  }),
}));

// Type definitions for Loyalty & Warranty System
export type LoyaltyCustomer = typeof loyaltyCustomers.$inferSelect;
export type InsertLoyaltyCustomer = z.infer<typeof insertLoyaltyCustomerSchema>;

export type LoyaltyTransaction = typeof loyaltyTransactions.$inferSelect;
export type InsertLoyaltyTransaction = z.infer<typeof insertLoyaltyTransactionSchema>;

export type LoyaltyReward = typeof loyaltyRewards.$inferSelect;
export type InsertLoyaltyReward = z.infer<typeof insertLoyaltyRewardSchema>;

export type LoyaltyRedemption = typeof loyaltyRedemptions.$inferSelect;
export type InsertLoyaltyRedemption = z.infer<typeof insertLoyaltyRedemptionSchema>;

export type CustomerWarranty = typeof customerWarranties.$inferSelect;
export type InsertCustomerWarranty = z.infer<typeof insertCustomerWarrantySchema>;

export type WarrantyReminder = typeof warrantyReminders.$inferSelect;
export type InsertWarrantyReminder = z.infer<typeof insertWarrantyReminderSchema>;
