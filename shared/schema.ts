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
  productType: z.string()
    .min(1, "Product type is required")
    .max(100, "Product type must be less than 100 characters"),
  material: z.string()
    .min(1, "Material is required")
    .max(100, "Material must be less than 100 characters"),
  width: z.number()
    .min(10, "Width must be at least 10cm")
    .max(1000, "Width cannot exceed 1000cm"),
  height: z.number()
    .min(10, "Height must be at least 10cm")
    .max(500, "Height cannot exceed 500cm"),
  // Honeypot field for spam protection
  website: z.string().max(0, "Invalid submission").optional(),
});

// Regular Quote Requests
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

// Dealer Contact Submissions
export const dealerContactSubmissions = pgTable("dealer_contact_submissions", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  businessType: text("business_type").notNull(),
  message: text("message").notNull(),
  language: text("language").default("nl"),
  leadType: text("lead_type").default("dealer"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDealerContactSchema = createInsertSchema(dealerContactSubmissions).omit({
  id: true,
  createdAt: true,
}).extend({
  businessName: z.string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  contactPerson: z.string()
    .min(2, "Contact person must be at least 2 characters")
    .max(100, "Contact person must be less than 100 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must be less than 254 characters"),
  phone: z.string().optional(),
  businessType: z.string()
    .min(1, "Please select a business type"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
  language: z.string().optional(),
  leadType: z.string().optional(),
});

// Newsletter Subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  language: text("language").default("nl"),
  preferences: jsonb("preferences"), // Topics they want to hear about
  isActive: boolean("is_active").default(true),
  confirmedAt: timestamp("confirmed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  createdAt: true,
});

// Payment Orders
export const paymentOrders = pgTable("payment_orders", {
  id: serial("id").primaryKey(),
  molliePaymentId: text("mollie_payment_id").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  amount: doublePrecision("amount").notNull(),
  currency: text("currency").default("EUR"),
  description: text("description").notNull(),
  status: text("status").default("pending"), // 'pending', 'paid', 'failed', 'cancelled', 'expired'
  redirectUrl: text("redirect_url").notNull(),
  webhookUrl: text("webhook_url"),
  checkoutUrl: text("checkout_url"),
  productDetails: jsonb("product_details"), // Store product information
  customerDetails: jsonb("customer_details"), // Store customer address, etc.
  mollieStatus: text("mollie_status"), // Direct status from Mollie
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPaymentOrderSchema = createInsertSchema(paymentOrders).omit({
  id: true,
  molliePaymentId: true,
  status: true,
  checkoutUrl: true,
  mollieStatus: true,
  paidAt: true,
  createdAt: true,
  updatedAt: true,
});

// Shopping Cart Items
export const shoppingCartItems = pgTable("shopping_cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").notNull().references(() => products.id, { onDelete: 'cascade' }),
  quantity: integer("quantity").notNull().default(1),
  customizations: jsonb("customizations"), // Store custom options like color, size, etc.
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertShoppingCartItemSchema = createInsertSchema(shoppingCartItems).omit({
  id: true,
  addedAt: true,
}).extend({
  productType: z.string().min(1, "Product type is required"),
  productName: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").max(50, "Quantity cannot exceed 50"),
  unitPrice: z.number().min(0.01, "Unit price must be at least €0.01"),
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

// Newsletter Relations
export const newsletterSubscriptionsRelations = relations(newsletterSubscriptions, ({ many }) => ({
  // Can add relations to other tables if needed
}));

// Payment relations
export const paymentOrdersRelations = relations(paymentOrders, ({ many }) => ({
  // Future: order items relation
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

export type DealerContactSubmission = typeof dealerContactSubmissions.$inferSelect;
export type InsertDealerContact = z.infer<typeof insertDealerContactSchema>;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;

export type PaymentOrder = typeof paymentOrders.$inferSelect;
export type InsertPaymentOrder = z.infer<typeof insertPaymentOrderSchema>;

export type ShoppingCartItem = typeof shoppingCartItems.$inferSelect;
export type InsertShoppingCartItem = z.infer<typeof insertShoppingCartItemSchema>;

// Style Consultation Tables
export const styleConsultations = pgTable("style_consultations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  language: text("language").default("nl"),
  currentStep: text("current_step").default("room_type"),
  roomType: text("room_type"),
  primaryGoal: text("primary_goal"),
  stylePreference: text("style_preference"),
  colorPreferences: text("color_preferences").array(),
  budgetRange: text("budget_range"),
  recommendations: jsonb("recommendations"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertStyleConsultationSchema = createInsertSchema(styleConsultations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type StyleConsultation = typeof styleConsultations.$inferSelect;
export type InsertStyleConsultation = z.infer<typeof insertStyleConsultationSchema>;

// Style Quote Requests
export const styleQuoteRequests = pgTable("style_quote_requests", {
  id: serial("id").primaryKey(),
  consultationId: integer("consultation_id").references(() => styleConsultations.id, { onDelete: 'cascade' }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  preferredContactTime: text("preferred_contact_time"),
  specificRequirements: text("specific_requirements"),
  estimatedBudget: text("estimated_budget"),
  language: text("language").default("nl"),
  status: text("status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStyleQuoteRequestSchema = createInsertSchema(styleQuoteRequests).omit({
  id: true,
  createdAt: true,
});

export type StyleQuoteRequest = typeof styleQuoteRequests.$inferSelect;
export type InsertStyleQuoteRequest = z.infer<typeof insertStyleQuoteRequestSchema>;