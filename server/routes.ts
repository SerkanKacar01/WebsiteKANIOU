import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCategorySchema,
  insertProductSchema,
  insertGalleryItemSchema,
  insertTestimonialSchema,
  insertSmartQuoteRequestSchema,
  insertQuoteRequestSchema,
  insertContactSubmissionSchema,
  insertDealerContactSchema,
  insertNewsletterSubscriptionSchema,
  insertStyleQuoteRequestSchema,
  insertPaymentOrderSchema,
  insertShoppingCartItemSchema,
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendEmail, createContactEmailHtml, createQuoteRequestEmailHtml, createDealerContactEmailHtml } from "./services/email";
import { emailConfig } from "./config/email";
import { formRateLimiter, spamDetectionMiddleware } from "./middleware/rateLimiter";

import { analyzeRoomForColorMatching, convertImageToBase64 } from "./services/colorMatcher";
import { sendNewsletterWelcomeEmail, sendNewsletterNotificationToAdmin } from "./newsletterService";
import multer from "multer";
import { molliePaymentService } from "./services/molliePayments";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get all categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error: any) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Create a new category (Admin only)
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const validation = insertCategorySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const category = await storage.createCategory(validation.data);
      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  // Get all products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const { category, featured, bestseller, newarrival } = req.query;
      
      if (category) {
        const products = await storage.getProductsByCategory(category as string);
        res.json(products);
      } else if (featured === 'true') {
        const products = await storage.getFeaturedProducts();
        res.json(products);
      } else if (bestseller === 'true') {
        const products = await storage.getBestSellerProducts();
        res.json(products);
      } else if (newarrival === 'true') {
        const products = await storage.getNewArrivalProducts();
        res.json(products);
      } else {
        const products = await storage.getProducts();
        res.json(products);
      }
    } catch (error: any) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Get product by ID
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(parseInt(id));
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error: any) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Create a new product (Admin only)
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validation = insertProductSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const product = await storage.createProduct(validation.data);
      res.status(201).json(product);
    } catch (error: any) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  // Get all gallery items
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error: any) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Create a new gallery item (Admin only)
  app.post("/api/gallery", async (req: Request, res: Response) => {
    try {
      const validation = insertGalleryItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const galleryItem = await storage.createGalleryItem(validation.data);
      res.status(201).json(galleryItem);
    } catch (error: any) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });

  // Get all testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Create a new testimonial (Admin only)
  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const validation = insertTestimonialSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const testimonial = await storage.createTestimonial(validation.data);
      res.status(201).json(testimonial);
    } catch (error: any) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  // Submit smart quote request with AI-powered dynamic pricing
  app.post("/api/smart-quote", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validation = insertSmartQuoteRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      // Calculate estimated price based on product type, material, and dimensions
      const { smartQuotePricing } = await import("./smartQuotePricing");
      const estimatedPrice = smartQuotePricing.calculateQuotePrice(
        validation.data.productType,
        validation.data.material,
        validation.data.width,
        validation.data.height,
        validation.data.installationRequired
      );

      const quoteData = {
        ...validation.data,
        estimatedPrice
      };

      const quote = await storage.createSmartQuoteRequest(quoteData);
      
      // Send email notification to admin
      const { sendSmartQuoteNotification } = await import("./smartQuoteEmailService");
      await sendSmartQuoteNotification(quote);

      res.status(201).json({
        ...quote,
        message: "Quote request submitted successfully! We'll contact you within 24 hours."
      });
    } catch (error: any) {
      console.error("Error creating smart quote request:", error);
      res.status(500).json({ message: "Failed to submit quote request" });
    }
  });

  // Submit quote request
  app.post("/api/quote", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validation = insertQuoteRequestSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const quote = await storage.createQuoteRequest(validation.data);
      
      // Send email to admin
      const emailHtml = createQuoteRequestEmailHtml(quote);
      await sendEmail({
        to: emailConfig.adminEmail,
        subject: `New Quote Request from ${quote.name}`,
        html: emailHtml,
      });

      res.status(201).json({
        ...quote,
        message: "Quote request submitted successfully! We'll get back to you soon."
      });
    } catch (error: any) {
      console.error("Error creating quote request:", error);
      res.status(500).json({ message: "Failed to submit quote request" });
    }
  });

  // Submit contact form
  app.post("/api/contact", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validation = insertContactSubmissionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const contact = await storage.createContactSubmission(validation.data);
      
      // Send email to admin
      const emailHtml = createContactEmailHtml(contact);
      await sendEmail({
        to: emailConfig.adminEmail,
        subject: `New Contact Form: ${contact.subject}`,
        html: emailHtml,
      });

      res.status(201).json({
        ...contact,
        message: "Your message has been sent successfully! We'll respond within 24 hours."
      });
    } catch (error: any) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Submit dealer contact form
  app.post("/api/dealer-contact", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validation = insertDealerContactSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      const dealerContact = await storage.createDealerContact(validation.data);
      
      // Send email to admin
      const emailHtml = createDealerContactEmailHtml(dealerContact);
      await sendEmail({
        to: emailConfig.adminEmail,
        subject: `New Dealer Application: ${dealerContact.businessName}`,
        html: emailHtml,
      });

      res.status(201).json({
        ...dealerContact,
        message: "Your dealer application has been submitted! We'll review it and get back to you soon."
      });
    } catch (error: any) {
      console.error("Error creating dealer contact:", error);
      res.status(500).json({ message: "Failed to submit dealer application" });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter/subscribe", formRateLimiter, async (req: Request, res: Response) => {
    try {
      const validation = insertNewsletterSubscriptionSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid input", 
          errors: fromZodError(validation.error).message 
        });
      }

      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validation.data.email);
      if (existingSubscription) {
        return res.status(409).json({ message: "Email is already subscribed to our newsletter" });
      }

      const subscription = await storage.createNewsletterSubscription(validation.data);
      
      // Send welcome email
      await sendNewsletterWelcomeEmail(subscription);
      
      // Notify admin
      await sendNewsletterNotificationToAdmin(subscription);

      res.status(201).json({
        ...subscription,
        message: "Successfully subscribed to newsletter! Check your email for confirmation."
      });
    } catch (error: any) {
      console.error("Error creating newsletter subscription:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Color matching endpoint
  app.post("/api/color-matcher", upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image uploaded" });
      }

      const base64Image = convertImageToBase64(req.file.buffer);
      const analysis = await analyzeRoomForColorMatching(base64Image);
      
      res.json(analysis);
    } catch (error: any) {
      console.error("Error in color matching:", error);
      res.status(500).json({ message: "Failed to analyze image" });
    }
  });

  // Get product recommendations
  app.get("/api/recommendations", async (req: Request, res: Response) => {
    try {
      const { userId, category, priceRange } = req.query;
      
      const recommendations = {
        products: [],
        message: "Recommendations feature coming soon"
      };
      
      res.json(recommendations);
    } catch (error: any) {
      console.error("Error getting recommendations:", error);
      res.status(500).json({ message: "Failed to get recommendations" });
    }
  });

  // Mollie payment routes
  app.post("/api/payments/create", async (req: Request, res: Response) => {
    try {
      const validation = insertPaymentOrderSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid payment data", 
          errors: fromZodError(validation.error).message 
        });
      }

      const paymentOrder = await storage.createPaymentOrder(validation.data);
      const paymentUrl = await molliePaymentService.createPayment(paymentOrder);
      
      res.json({ 
        paymentUrl,
        orderId: paymentOrder.id 
      });
    } catch (error: any) {
      console.error("Error creating payment:", error);
      res.status(500).json({ message: "Failed to create payment" });
    }
  });

  // Shopping cart routes
  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const cartItems = await storage.getShoppingCartItems(sessionId);
      res.json(cartItems);
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const validation = insertShoppingCartItemSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ 
          message: "Invalid cart data", 
          errors: fromZodError(validation.error).message 
        });
      }

      const cartItem = await storage.addToShoppingCart(validation.data);
      res.status(201).json(cartItem);
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      res.status(500).json({ message: "Failed to add to cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}