import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertCategorySchema,
  insertProductSchema,
  insertGalleryItemSchema,
  insertTestimonialSchema,
  insertQuoteRequestSchema,
  insertContactSubmissionSchema,
  insertChatbotConversationSchema,
  insertChatbotMessageSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendEmail, createContactEmailHtml, createQuoteRequestEmailHtml } from "./services/email";
import { emailConfig } from "./config/email";
import { formRateLimiter, spamDetectionMiddleware } from "./middleware/rateLimiter";
import { analyzeRoomForColorMatching, convertImageToBase64 } from "./services/colorMatcher";
import { generateChatbotResponse, detectPricingRequest, extractProductTypes } from "./openai";
import { isWithinBusinessHours, getBusinessHoursResponse, getBusinessStatus } from "./businessHours";
import { 
  detectPriceRequest, 
  checkLearnedResponse, 
  logResponseUsage, 
  createPriceRequestNotification, 
  getPriceRequestFallback,
  checkNotificationRateLimit
} from "./priceAssistant";
import { sendPriceRequestNotification } from "./emailService";
import multer from "multer";

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed'));
      }
    }
  });

  // API endpoints
  const apiRouter = app.route("/api");
  
  // Categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });
  
  app.get("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      
      const category = await storage.getCategoryById(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });
  
  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCategorySchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid category data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newCategory = await storage.createCategory(validatedData.data);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });
  
  // Products
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      let products;
      
      if (req.query.categoryId) {
        const categoryId = parseInt(req.query.categoryId as string);
        if (isNaN(categoryId)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
        products = await storage.getProductsByCategory(categoryId);
      } else if (req.query.featured === 'true') {
        products = await storage.getFeaturedProducts();
      } else {
        products = await storage.getProducts();
      }
      
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProductSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid product data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newProduct = await storage.createProduct(validatedData.data);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  
  // Gallery Items
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      let galleryItems;
      
      if (categoryId) {
        galleryItems = await storage.getGalleryItemsByCategory(categoryId);
      } else {
        galleryItems = await storage.getGalleryItems();
      }
      
      res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  
  app.get("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gallery item ID" });
      }
      
      const galleryItem = await storage.getGalleryItemById(id);
      if (!galleryItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }
      
      res.json(galleryItem);
    } catch (error) {
      console.error("Error fetching gallery item:", error);
      res.status(500).json({ message: "Failed to fetch gallery item" });
    }
  });
  
  app.post("/api/gallery", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGalleryItemSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid gallery item data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newGalleryItem = await storage.createGalleryItem(validatedData.data);
      res.status(201).json(newGalleryItem);
    } catch (error) {
      console.error("Error creating gallery item:", error);
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });
  
  app.put("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid gallery item ID" });
      }
      
      // Check if the gallery item exists
      const existingItem = await storage.getGalleryItemById(id);
      if (!existingItem) {
        return res.status(404).json({ message: "Gallery item not found" });
      }

      // Validate and update the gallery item
      const updateData = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        categoryId: req.body.categoryId
      };
      
      const updatedItem = await storage.updateGalleryItem(id, updateData);
      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating gallery item:", error);
      res.status(500).json({ message: "Failed to update gallery item" });
    }
  });
  
  // Testimonials
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  app.get("/api/testimonials/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid testimonial ID" });
      }
      
      const testimonial = await storage.getTestimonialById(id);
      if (!testimonial) {
        return res.status(404).json({ message: "Testimonial not found" });
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error("Error fetching testimonial:", error);
      res.status(500).json({ message: "Failed to fetch testimonial" });
    }
  });
  
  app.post("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const validatedData = insertTestimonialSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid testimonial data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newTestimonial = await storage.createTestimonial(validatedData.data);
      res.status(201).json(newTestimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  // Quote Requests
  app.post("/api/quote-requests", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertQuoteRequestSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid quote request data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newQuoteRequest = await storage.createQuoteRequest(validatedData.data);
      
      // Log successful backup to database
      console.log(`✅ QUOTE REQUEST BACKUP: Saved submission #${newQuoteRequest.id} from ${validatedData.data.name} (${validatedData.data.email}) at ${new Date().toISOString()}`);
      
      // Send email notification about the new quote request
      try {
        // Create properly typed email data
        const emailData: {
          name: string;
          email: string;
          phone: string;
          productType: string;
          dimensions?: string;
          requirements?: string;
        } = {
          name: validatedData.data.name,
          email: validatedData.data.email,
          phone: validatedData.data.phone,
          productType: validatedData.data.productType
        };
        
        // Only add optional fields if they exist and aren't null
        if (validatedData.data.dimensions) {
          emailData.dimensions = validatedData.data.dimensions;
        }
        
        if (validatedData.data.requirements) {
          emailData.requirements = validatedData.data.requirements;
        }
        
        const htmlContent = createQuoteRequestEmailHtml(emailData);
        
        // Create plain text version as fallback
        const textContent = `
NEW QUOTE REQUEST

CUSTOMER INFORMATION
Name: ${emailData.name}
Email: ${emailData.email}
Phone: ${emailData.phone}

PROJECT DETAILS
Product Type: ${emailData.productType}
${emailData.dimensions ? `Dimensions: ${emailData.dimensions}` : ''}
${emailData.requirements ? `\nSpecial Requirements:\n${emailData.requirements}` : ''}

---
Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
To prepare a quote, please contact the customer directly.
        `.trim();
        
        await sendEmail({
          to: emailConfig.notificationEmail,
          from: emailConfig.senderEmail,
          subject: `${emailConfig.quoteForm.subjectPrefix}New Request from ${emailData.name}`,
          html: htmlContent,
          text: textContent
        });
        
        console.log('📧 Quote request email notification sent successfully');
      } catch (emailError) {
        // Log the error but don't fail the request if email sending fails
        console.error('❌ EMAIL FAILED: Quote request email could not be sent, but data is safely backed up in database:', emailError);
      }
      
      res.status(201).json(newQuoteRequest);
    } catch (error) {
      console.error("Error creating quote request:", error);
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });
  
  // Contact Submissions
  app.post("/api/contact", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.safeParse(req.body);
      if (!validatedData.success) {
        return res.status(400).json({ 
          message: "Invalid contact submission data", 
          errors: fromZodError(validatedData.error).message 
        });
      }
      
      const newSubmission = await storage.createContactSubmission(validatedData.data);
      
      // Log successful backup to database
      console.log(`✅ CONTACT FORM BACKUP: Saved submission #${newSubmission.id} from ${validatedData.data.name} (${validatedData.data.email}) at ${new Date().toISOString()}`);
      
      // Send email notification about the new contact form submission
      try {
        // Create properly typed email data
        const emailData: {
          name: string;
          email: string;
          subject: string;
          message: string;
        } = {
          name: validatedData.data.name,
          email: validatedData.data.email,
          subject: validatedData.data.subject,
          message: validatedData.data.message
        };
        
        const htmlContent = createContactEmailHtml(emailData);
        
        // Create plain text version as fallback
        const textContent = `
NEW CONTACT FORM MESSAGE

FROM: ${emailData.name} (${emailData.email})
SUBJECT: ${emailData.subject}

MESSAGE:
${emailData.message}

---
Submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
To respond, simply reply to this email.
        `.trim();
        
        await sendEmail({
          to: emailConfig.notificationEmail,
          from: emailConfig.senderEmail,
          subject: `${emailConfig.contactForm.subjectPrefix}${emailData.subject}`,
          html: htmlContent,
          text: textContent
        });
        
        console.log('📧 Contact form email notification sent successfully');
      } catch (emailError) {
        // Log the error but don't fail the request if email sending fails
        console.error('❌ EMAIL FAILED: Contact form email could not be sent, but data is safely backed up in database:', emailError);
      }
      
      res.status(201).json(newSubmission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to create contact submission" });
    }
  });

  // Color Matcher API endpoint
  app.post("/api/color-matcher", upload.single('roomImage'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Convert uploaded image to base64
      const base64Image = convertImageToBase64(req.file.buffer);
      
      // Analyze the room image for color recommendations
      const analysis = await analyzeRoomForColorMatching(base64Image);
      
      res.json(analysis);
    } catch (error) {
      console.error("Error in color matcher:", error);
      res.status(500).json({ message: "Failed to analyze image. Please try again." });
    }
  });

  // Chatbot API endpoints
  
  // Start or get existing conversation
  app.post("/api/chatbot/conversation", async (req: Request, res: Response) => {
    try {
      const { sessionId, language = "nl" } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      // Check if conversation already exists
      let conversation = await storage.getChatbotConversationBySessionId(sessionId);
      
      if (!conversation) {
        // Create new conversation
        conversation = await storage.createChatbotConversation({
          sessionId,
          language,
          isActive: true
        });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error handling chatbot conversation:", error);
      res.status(500).json({ message: "Failed to handle conversation" });
    }
  });

  // Send message to chatbot
  app.post("/api/chatbot/message", async (req: Request, res: Response) => {
    try {
      const { conversationId, message, language = "nl" } = req.body;
      
      if (!conversationId || !message) {
        return res.status(400).json({ message: "Conversation ID and message are required" });
      }

      // Get conversation
      const conversation = await storage.getChatbotConversationBySessionId(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Save user message
      await storage.createChatbotMessage({
        conversationId: conversation.id,
        role: "user",
        content: message
      });

      // STEP 1: Enhanced Price Detection System
      const priceDetection = detectPriceRequest(message, language);
      console.log(`🎯 PRICE DETECTION: ${priceDetection.isPriceRequest ? 'DETECTED' : 'NOT_DETECTED'} - Confidence: ${Math.round(priceDetection.confidence * 100)}%`, 
        priceDetection.detectedKeywords.length > 0 ? `Keywords: ${priceDetection.detectedKeywords.join(', ')}` : '');

      // STEP 4: Check for learned responses first (if price request detected)
      let learnedResponse = null;
      if (priceDetection.isPriceRequest) {
        learnedResponse = await checkLearnedResponse(message, language);
        if (learnedResponse) {
          console.log(`💡 LEARNED RESPONSE FOUND: Using knowledge #${learnedResponse.knowledgeId} - Matched: ${learnedResponse.matchedKeywords.join(', ')}`);
          
          // Use the learned response
          const aiResponse = {
            content: learnedResponse.response,
            requiresPricing: false, // Already handled by learned response
            detectedProductTypes: priceDetection.extractedProducts,
            metadata: {
              tokensUsed: 0,
              responseTime: 50,
              confidence: 0.95,
              businessHours: isWithinBusinessHours(),
              afterHours: !isWithinBusinessHours(),
              learnedResponse: true,
              knowledgeId: learnedResponse.knowledgeId
            }
          };

          // Save the learned response
          const savedResponse = await storage.createChatbotMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: aiResponse.content,
            metadata: aiResponse.metadata
          });

          // STEP 5: Log usage of learned response
          await logResponseUsage(
            learnedResponse.knowledgeId,
            conversation.id,
            message,
            learnedResponse.response,
            learnedResponse.matchedKeywords
          );

          return res.json({
            message: aiResponse.content,
            messageId: savedResponse.id,
            requiresPricing: aiResponse.requiresPricing,
            metadata: aiResponse.metadata
          });
        }
      }

      // Check business hours for regular processing
      const isOpen = isWithinBusinessHours();
      const businessStatus = getBusinessStatus();
      
      let aiResponse;
      let savedResponse;

      if (!isOpen) {
        // Outside business hours - provide professional after-hours response
        const afterHoursMessage = getBusinessHoursResponse(language);
        
        console.log(`🕐 AFTER HOURS MESSAGE: ${businessStatus.currentTime} (${businessStatus.timezone}) - Outside business hours MA-ZA 10:00-18:00`);
        
        aiResponse = {
          content: afterHoursMessage,
          requiresPricing: priceDetection.isPriceRequest,
          detectedProductTypes: priceDetection.extractedProducts,
          metadata: {
            tokensUsed: 0,
            responseTime: 0,
            confidence: 1.0,
            businessHours: false,
            afterHours: true,
            priceDetection
          }
        };

        // Save after-hours response
        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });
      } else {
        // During business hours - check if price request needs special handling
        if (priceDetection.isPriceRequest) {
          console.log(`💰 PRICE REQUEST: High confidence (${Math.round(priceDetection.confidence * 100)}%) - Products: ${priceDetection.extractedProducts.join(', ') || 'General pricing'}`);
          
          // Use price request fallback response
          const priceResponse = getPriceRequestFallback(language);
          
          aiResponse = {
            content: priceResponse,
            requiresPricing: true,
            detectedProductTypes: priceDetection.extractedProducts,
            metadata: {
              tokensUsed: 0,
              responseTime: 100,
              confidence: priceDetection.confidence,
              businessHours: true,
              afterHours: false,
              priceDetection,
              needsAdminResponse: true
            }
          };

          // Save price request response
          savedResponse = await storage.createChatbotMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: aiResponse.content,
            metadata: aiResponse.metadata
          });

          // STEP 2: Send notification to admin (with rate limiting)
          if (checkNotificationRateLimit('price_requests')) {
            try {
              // Create database notification record
              const notificationId = await createPriceRequestNotification(
                conversation.id,
                message,
                priceDetection.detectedKeywords
              );

              if (notificationId) {
                // Send email notification to Serkan
                const emailSent = await sendPriceRequestNotification({
                  userMessage: message,
                  detectedKeywords: priceDetection.detectedKeywords,
                  timestamp: new Date(),
                  conversationId: conversation.id,
                  sessionId: conversation.sessionId,
                  language: priceDetection.language,
                  extractedProducts: priceDetection.extractedProducts,
                  confidence: priceDetection.confidence
                });

                if (emailSent) {
                  console.log(`📧 ADMIN NOTIFICATION: Sent price request notification #${notificationId} to admin`);
                } else {
                  console.log(`⚠️ EMAIL WARNING: Notification #${notificationId} saved to database but email failed`);
                }
              }
            } catch (notificationError) {
              console.error('❌ NOTIFICATION ERROR:', notificationError);
            }
          } else {
            console.log(`⏰ RATE LIMITED: Price request notification skipped (max 3 per minute)`);
          }
        } else {
          // Regular AI response for non-price requests
          console.log(`✅ BUSINESS HOURS: ${businessStatus.currentTime} (${businessStatus.timezone}) - Normal AI processing`);
          
          // Get context for AI response
          const [messages, products, categories, knowledgeBase] = await Promise.all([
            storage.getChatbotMessagesByConversationId(conversation.id),
            storage.getProducts(),
            storage.getCategories(),
            storage.getChatbotKnowledge(language)
          ]);

          // Generate AI response
          aiResponse = await generateChatbotResponse(message, {
            conversation,
            messages,
            products,
            categories,
            knowledgeBase,
            language
          });

          // Add business hours metadata
          aiResponse.metadata.businessHours = true;
          aiResponse.metadata.afterHours = false;
          aiResponse.metadata.priceDetection = priceDetection;

          // Save AI response
          savedResponse = await storage.createChatbotMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: aiResponse.content,
            metadata: aiResponse.metadata
          });
        }
      }

      // Legacy pricing handling (kept for compatibility)
      if (aiResponse.requiresPricing && aiResponse.detectedProductTypes.length > 0) {
        // Create pricing request record
        await storage.createChatbotPricing({
          productType: aiResponse.detectedProductTypes.join(", "),
          pricingInfo: { requestedProducts: aiResponse.detectedProductTypes },
          requestContext: message
        });

        console.log(`📋 LEGACY PRICING: Recorded request for: ${aiResponse.detectedProductTypes.join(", ")}`);
      }

      res.json({
        message: aiResponse.content,
        messageId: savedResponse.id,
        requiresPricing: aiResponse.requiresPricing,
        metadata: aiResponse.metadata
      });

    } catch (error) {
      console.error("Error processing chatbot message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Get conversation history
  app.get("/api/chatbot/conversation/:sessionId/messages", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      
      const conversation = await storage.getChatbotConversationBySessionId(sessionId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Business hours status endpoint
  app.get("/api/chatbot/business-hours", async (req: Request, res: Response) => {
    try {
      const businessStatus = getBusinessStatus();
      const language = req.query.language as string || 'nl';
      
      res.json({
        isOpen: businessStatus.isOpen,
        currentTime: businessStatus.currentTime,
        nextOpenTime: businessStatus.nextOpenTime,
        timezone: businessStatus.timezone,
        message: businessStatus.isOpen ? null : getBusinessHoursResponse(language)
      });
    } catch (error) {
      console.error("Error checking business hours:", error);
      res.status(500).json({ message: "Failed to check business hours" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
