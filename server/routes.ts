import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";
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
import { AdminAuth, requireAdminAuth } from "./auth";
import cookieParser from "cookie-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add cookie parser middleware
  app.use(cookieParser());
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
      res.json([]);
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
      res.json([]);
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

  // Order tracking route - updated for proper order number lookup
  app.get("/api/orders/track/:orderNumber", async (req: Request, res: Response) => {
    try {
      const { orderNumber } = req.params;
      
      // Try to find order by order number string first
      let order = await storage.getPaymentOrderByOrderNumber(orderNumber);
      
      // If not found and it's a number, try by ID as fallback
      if (!order) {
        const orderId = parseInt(orderNumber);
        if (!isNaN(orderId)) {
          order = await storage.getPaymentOrderById(orderId);
        }
      }
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Return order data for client tracking
      res.json({
        id: order.id,
        orderNumber: order.orderNumber || `KAN-${order.id}`,
        status: order.status || 'pending',
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        amount: order.amount,
        currency: order.currency || 'EUR',
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        clientNote: order.clientNote,
        pdfFileName: order.pdfFileName,
        notificationPreference: order.notificationPreference || 'email'
      });
    } catch (error: any) {
      console.error("Error tracking order:", error);
      res.status(500).json({ message: "Failed to track order" });
    }
  });

  // Update notification preferences for orders
  app.post("/api/orders/update-preferences", async (req: Request, res: Response) => {
    try {
      const { orderNumber, notificationPreference } = req.body;
      
      if (!orderNumber || !notificationPreference) {
        return res.status(400).json({ message: "Order number and notification preference required" });
      }
      
      // Find order by order number
      let order = await storage.getPaymentOrderByOrderNumber(orderNumber);
      
      // If not found and it's a number, try by ID as fallback
      if (!order) {
        const orderId = parseInt(orderNumber);
        if (!isNaN(orderId)) {
          order = await storage.getPaymentOrderById(orderId);
        }
      }
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Update notification preference
      await storage.updatePaymentOrder(order.id, {
        notificationPreference,
        updatedAt: new Date()
      });
      
      res.json({ message: "Notification preferences updated successfully" });
    } catch (error: any) {
      console.error("Error updating notification preferences:", error);
      res.status(500).json({ message: "Failed to update notification preferences" });
    }
  });

  // Download order PDF
  app.get("/api/orders/:id/pdf", async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }
      
      const order = await storage.getPaymentOrderById(orderId);
      
      if (!order || !order.pdfFileName) {
        return res.status(404).json({ message: "PDF not found" });
      }
      
      // In a real implementation, you would serve the file from uploads directory
      // For now, create a simple PDF response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${order.pdfFileName}"`);
      res.status(200).send('PDF content for order ' + order.orderNumber + ' would be served here');
    } catch (error: any) {
      console.error("Error downloading PDF:", error);
      res.status(500).json({ message: "Failed to download PDF" });
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

  // Admin Authentication Routes
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ error: "Email en wachtwoord zijn vereist" });
      }
      
      const authData = await AdminAuth.login(email, password);
      if (!authData) {
        return res.status(401).json({ error: "Ongeldige inloggegevens" });
      }
      
      // Set secure HTTP-only cookie
      res.cookie("admin_session", authData.sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: authData.expiresAt,
      });
      
      res.json({ 
        success: true, 
        message: "Succesvol ingelogd",
        expiresAt: authData.expiresAt,
      });
    } catch (error: any) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden bij het inloggen" });
    }
  });

  app.post("/api/admin/logout", async (req: Request, res: Response) => {
    try {
      const sessionId = req.cookies?.admin_session;
      if (sessionId) {
        await AdminAuth.logout(sessionId);
      }
      
      res.clearCookie("admin_session");
      res.json({ success: true, message: "Succesvol uitgelogd" });
    } catch (error: any) {
      console.error("Admin logout error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden bij het uitloggen" });
    }
  });

  app.get("/api/admin/status", async (req: Request, res: Response) => {
    try {
      const sessionId = req.cookies?.admin_session;
      const authData = await AdminAuth.validateSession(sessionId);
      
      if (!authData) {
        return res.status(401).json({ authenticated: false });
      }
      
      res.json({ 
        authenticated: true, 
        email: authData.email,
        expiresAt: authData.expiresAt,
      });
    } catch (error: any) {
      console.error("Admin status check error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden" });
    }
  });

  // Protected Admin Routes
  app.get("/api/admin/dashboard", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      // Return dashboard data
      const orders = await storage.getPaymentOrders();
      
      // Calculate dashboard stats
      const totalOrders = orders.length;
      const pendingOrders = orders.filter(order => 
        order.status && !['Geleverd', 'Geannuleerd'].includes(order.status)
      ).length;
      const totalRevenue = orders
        .filter(order => order.status === 'Geleverd')
        .reduce((sum, order) => sum + order.amount, 0);

      // Format orders for dashboard
      const formattedOrders = orders.map(order => ({
        id: order.id,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        amount: order.amount,
        currency: order.currency || 'EUR',
        productType: order.description || 'Algemeen product',
        status: order.status || 'Bestelling ontvangen',
        createdAt: order.createdAt?.toISOString() || new Date().toISOString(),
        clientNote: order.clientNote || '',
        pdfFileName: order.pdfFileName || null,
        notificationPreference: (order.notificationPreference as 'email' | 'whatsapp' | 'both') || 'email',
        orderStatuses: []
      }));

      res.json({
        totalOrders,
        pendingOrders,
        totalRevenue,
        orders: formattedOrders
      });
    } catch (error: any) {
      console.error("Dashboard data error:", error);
      res.status(500).json({ error: "Er is een fout opgetreden bij het laden van dashboard gegevens" });
    }
  });

  // Update order endpoint
  app.patch("/api/admin/orders/:id", requireAdminAuth, async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      const { status, clientNote, notificationPreference } = req.body;

      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      // Get existing order
      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      // Update order in database
      await storage.updatePaymentOrder(orderId, {
        status: status || existingOrder.status,
        clientNote: clientNote !== undefined ? clientNote : existingOrder.clientNote,
        notificationPreference: notificationPreference || existingOrder.notificationPreference,
        updatedAt: new Date()
      });

      res.json({ 
        success: true, 
        message: "Order succesvol bijgewerkt" 
      });
    } catch (error: any) {
      console.error("Update order error:", error);
      res.status(500).json({ error: "Fout bij bijwerken order" });
    }
  });

  // PDF upload endpoint
  app.post("/api/admin/orders/:id/upload-pdf", requireAdminAuth, upload.single('pdf'), async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.id);
      
      if (isNaN(orderId)) {
        return res.status(400).json({ error: "Ongeldig order ID" });
      }

      if (!req.file) {
        return res.status(400).json({ error: "Geen PDF bestand ontvangen" });
      }

      // Validate file type
      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: "Alleen PDF bestanden zijn toegestaan" });
      }

      // Get existing order
      const existingOrder = await storage.getPaymentOrderById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ error: "Order niet gevonden" });
      }

      // Update order with PDF filename
      await storage.updatePaymentOrder(orderId, {
        pdfFileName: req.file.filename,
        updatedAt: new Date()
      });

      res.json({ 
        success: true, 
        message: "PDF succesvol geüpload",
        fileName: req.file.filename
      });
    } catch (error: any) {
      console.error("PDF upload error:", error);
      res.status(500).json({ error: "Fout bij uploaden PDF" });
    }
  });

  // PDF download endpoint for customers
  app.get("/api/orders/:orderNumber/download-pdf", formRateLimiter, async (req: Request, res: Response) => {
    try {
      const { orderNumber } = req.params;
      
      // Use secure order lookup
      const order = await storage.getOrderByOrderNumber(orderNumber);
      
      if (!order || !order.pdfFileName) {
        return res.status(404).json({ message: "PDF niet beschikbaar voor deze bestelling" });
      }

      const filePath = path.join(__dirname, '../uploads', order.pdfFileName);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "PDF bestand niet gevonden op server" });
      }

      // Set proper headers for PDF download/viewing
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="Bestelbon-${orderNumber}.pdf"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
    } catch (error: any) {
      console.error("PDF download error:", error);
      res.status(500).json({ message: "Fout bij downloaden PDF" });
    }
  });

  // Auth status endpoint for dashboard
  app.get("/api/admin/auth-status", async (req: Request, res: Response) => {
    try {
      const sessionId = req.cookies?.admin_session;
      if (!sessionId) {
        return res.json({ authenticated: false });
      }
      
      const isValid = await AdminAuth.validateSession(sessionId);
      if (!isValid) {
        res.clearCookie("admin_session");
        return res.json({ authenticated: false });
      }
      
      // Get admin user info
      const session = await storage.getAdminSessionById(sessionId);
      if (!session) {
        return res.json({ authenticated: false });
      }
      
      const adminUser = await storage.getAdminUserByEmail("admin@kaniou.be");
      
      res.json({ 
        authenticated: true,
        email: adminUser?.email,
      });
    } catch (error: any) {
      console.error("Auth status check error:", error);
      res.json({ authenticated: false });
    }
  });

  // Order tracking endpoints for clients
  app.get('/api/orders/track/:orderNumber', async (req, res) => {
    try {
      const { orderNumber } = req.params;
      const order = await storage.getOrderByOrderNumber(orderNumber);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.json(order);
    } catch (error) {
      console.error('Error tracking order:', error);
      res.status(500).json({ message: 'Failed to track order' });
    }
  });

  // Update order notification preferences
  app.post('/api/orders/update-preferences', async (req, res) => {
    try {
      const { orderNumber, notificationPreference } = req.body;
      
      if (!orderNumber || !notificationPreference) {
        return res.status(400).json({ message: 'Order number and notification preference are required' });
      }
      
      await storage.updateOrderNotificationPreference(orderNumber, notificationPreference);
      res.json({ message: 'Preferences updated successfully' });
    } catch (error) {
      console.error('Error updating preferences:', error);
      res.status(500).json({ message: 'Failed to update preferences' });
    }
  });

  // Serve PDF files for orders
  app.get('/api/orders/:id/pdf', async (req, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const order = await storage.getPaymentOrderById(orderId);
      
      if (!order || !order.pdfFileName) {
        return res.status(404).json({ message: 'PDF not found' });
      }
      
      // In a real implementation, you would serve the file from storage
      // For now, we'll return a placeholder response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${order.pdfFileName}"`);
      res.status(200).send('PDF content would be served here');
    } catch (error) {
      console.error('Error serving PDF:', error);
      res.status(500).json({ message: 'Failed to serve PDF' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}