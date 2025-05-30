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
  insertChatbotMessageSchema,
  insertNewsletterSubscriptionSchema
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { sendEmail, createContactEmailHtml, createQuoteRequestEmailHtml } from "./services/email";
import { emailConfig } from "./config/email";
import { formRateLimiter, spamDetectionMiddleware } from "./middleware/rateLimiter";
import { analyzeRoomForColorMatching, convertImageToBase64 } from "./services/colorMatcher";
import { generateChatbotResponse } from "./openai";
import { isWithinBusinessHours, getBusinessHoursResponse, getBusinessStatus } from "./businessHours";
import { 
  detectPriceRequest, 
  checkLearnedResponse, 
  logResponseUsage, 
  createPriceRequestNotification, 
  getPriceRequestFallback,
  checkNotificationRateLimit
} from "./priceAssistant";
import { generateProductPricingResponse } from "./productPricing";
import { sendPriceRequestNotification } from "./emailService";
import { answerWithComprehensiveKnowledge } from "./comprehensiveKnowledge";
import { sendNewsletterWelcomeEmail, sendNewsletterNotificationToAdmin } from "./newsletterService";
import { sendConversationSummaryEmail } from "./emailSummary";
import { 
  analyzeTriggerConditions, 
  sendSmartNotification, 
  formatConversationForEmail 
} from "./smartNotificationTrigger";
import { 
  getHumanFollowUpMessage,
  isAskingForBusinessHours 
} from "./humanFollowUpMessages";
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
      } else {
        // 24/7 Chatbot Operation - Process all requests normally regardless of time
        console.log(`🤖 24/7 CHATBOT: Processing message at any time - Full service available`);
        
        let aiResponse;
        let savedResponse;
        
        if (priceDetection.isPriceRequest) {
          console.log(`💰 PRICE REQUEST: High confidence (${Math.round(priceDetection.confidence * 100)}%) - Products: ${priceDetection.extractedProducts.join(', ') || 'General pricing'}`);
          
          // Generate actual pricing response using product data
          const priceResponse = generateProductPricingResponse(
            priceDetection.extractedProducts, 
            language, 
            message
          );
          
          console.log(`💡 PRICING RESPONSE: Generated specific pricing info for detected products`);
          
          aiResponse = {
            content: priceResponse,
            requiresPricing: false, // Changed to false since we're providing actual pricing
            detectedProductTypes: priceDetection.extractedProducts,
            metadata: {
              tokensUsed: 0,
              responseTime: 100,
              confidence: priceDetection.confidence,
              businessHours: true,
              afterHours: false,
              priceDetection,
              pricingProvided: true // Added flag to indicate actual pricing was provided
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
          // Use comprehensive knowledge system for ALL non-price requests
          console.log(`🤖 24/7 CHATBOT: Using comprehensive knowledge system`);
          
          // Get conversation context for better responses
          const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
          const conversationContext = messages.map(m => m.content);

          // Generate response using comprehensive knowledge
          const comprehensiveResponse = await answerWithComprehensiveKnowledge(
            message,
            language,
            conversationContext
          );

          console.log(`🧠 COMPREHENSIVE RESPONSE: Confidence ${Math.round(comprehensiveResponse.confidence * 100)}% - Sources: ${comprehensiveResponse.sources.join(', ')} - Fallback: ${comprehensiveResponse.usedFallback}`);

          aiResponse = {
            content: comprehensiveResponse.content,
            requiresPricing: false,
            detectedProductTypes: priceDetection.extractedProducts,
            metadata: {
              tokensUsed: 0,
              responseTime: 150,
              confidence: comprehensiveResponse.confidence,
              businessHours: true,
              afterHours: false,
              priceDetection,
              sources: comprehensiveResponse.sources,
              usedFallback: comprehensiveResponse.usedFallback,
              comprehensiveKnowledge: true
            }
          };

          // Save comprehensive knowledge response
          savedResponse = await storage.createChatbotMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: aiResponse.content,
            metadata: aiResponse.metadata
          });
        }
      }

      // Legacy pricing handling (kept for compatibility)
      if (aiResponse && aiResponse.requiresPricing && aiResponse.detectedProductTypes.length > 0) {
          // Create pricing request record
          await storage.createChatbotPricing({
            productType: aiResponse.detectedProductTypes.join(", "),
            pricingInfo: { requestedProducts: aiResponse.detectedProductTypes },
            requestContext: message
          });

          console.log(`📋 LEGACY PRICING: Recorded request for: ${aiResponse.detectedProductTypes.join(", ")}`);
        }

        // Smart Email Notification Trigger Analysis for 24/7 Operation
        try {
          const conversationMessages = await storage.getChatbotMessagesByConversationId(conversation.id);
          const messageHistory = conversationMessages.map(msg => ({
            role: msg.role,
            content: msg.content,
            createdAt: msg.createdAt?.toISOString()
          }));

          // Analyze if notification should be triggered
          const triggerAnalysis = analyzeTriggerConditions(
            message,
            messageHistory,
            aiResponse.metadata?.confidence || 0.5,
            language
          );

          console.log(`🔔 TRIGGER ANALYSIS: Should trigger: ${triggerAnalysis.shouldTrigger}, Reason: ${triggerAnalysis.triggerReason}, Confidence: ${Math.round(triggerAnalysis.confidence * 100)}%`);

          // Send notification and add human follow-up message if conditions are met
          if (triggerAnalysis.shouldTrigger) {
            const notificationData = {
              customerQuestion: message,
              fullConversation: formatConversationForEmail(messageHistory),
              language: language,
              triggerReason: triggerAnalysis.triggerReason,
              timestamp: new Date().toLocaleString('nl-BE', { 
                timeZone: 'Europe/Brussels',
                dateStyle: 'full',
                timeStyle: 'medium'
              }),
              conversationId: conversation.id.toString()
            };

            // Send notification asynchronously (don't block response)
            sendSmartNotification(notificationData).catch(error => {
              console.error('Failed to send smart notification:', error);
            });

            // Add human follow-up message to response
            const followUpMessage = getHumanFollowUpMessage(language);
            aiResponse.content += `\n\n${followUpMessage.content}`;

            console.log(`📧 SMART NOTIFICATION: Triggered for conversation ${conversation.id} - Reason: ${triggerAnalysis.triggerReason}`);
            console.log(`👤 HUMAN FOLLOW-UP: Added 24-hour response notice in ${language}`);
          }
        } catch (error) {
          console.error('Error in smart notification analysis:', error);
          // Continue with normal response even if notification fails
        }

        res.json({
          message: aiResponse.content,
          messageId: savedResponse.id,
          requiresPricing: aiResponse.requiresPricing,
          metadata: aiResponse.metadata
        });
      }

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

  // Lead collection endpoint for chatbot offer requests
  app.post("/api/chatbot/lead", async (req: Request, res: Response) => {
    try {
      const { conversationId, name, email, gdprConsent, language = "nl" } = req.body;
      
      if (!conversationId || !name || !email || !gdprConsent) {
        return res.status(400).json({ message: "All fields are required including GDPR consent" });
      }

      // Get conversation
      const conversation = await storage.getChatbotConversationBySessionId(conversationId);
      if (!conversation) {
        return res.status(404).json({ message: "Conversation not found" });
      }

      // Create quote request from lead data
      const quoteRequestData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: null, // Optional for chatbot leads
        message: `Automatische offerte aanvraag via chatbot (Sessie: ${conversationId})`,
        productType: "Algemene interesse", // Default for chatbot leads
        windowMeasurements: null,
        requirements: null,
        language: language,
        gdprConsent: gdprConsent,
        source: 'chatbot_lead'
      };

      const newQuoteRequest = await storage.createQuoteRequest(quoteRequestData);
      
      console.log(`✅ CHATBOT LEAD: Created quote request #${newQuoteRequest.id} for ${name} (${email}) from conversation ${conversationId}`);

      // Send email notification about the new lead
      try {
        const emailMessages = {
          nl: {
            subject: "🤖 Nieuwe Lead via Chatbot",
            intro: "Er is een nieuwe offerte aanvraag via de chatbot ontvangen!",
            followUp: "Neem binnen 24 uur contact op voor de beste service."
          },
          en: {
            subject: "🤖 New Lead via Chatbot", 
            intro: "A new quote request has been received via the chatbot!",
            followUp: "Contact within 24 hours for the best service."
          },
          fr: {
            subject: "🤖 Nouveau Prospect via Chatbot",
            intro: "Une nouvelle demande de devis a été reçue via le chatbot!",
            followUp: "Contactez dans les 24 heures pour le meilleur service."
          },
          tr: {
            subject: "🤖 Chatbot Üzerinden Yeni Müşteri Adayı",
            intro: "Chatbot üzerinden yeni bir teklif talebi alındı!",
            followUp: "En iyi hizmet için 24 saat içinde iletişime geçin."
          }
        };

        const messages = emailMessages[language as keyof typeof emailMessages] || emailMessages.nl;
        
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
                .footer { background: #1e293b; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
                .info-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #f59e0b; }
                .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
                .urgent { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🤖 ${messages.subject}</h1>
                    <p>${messages.intro}</p>
                </div>
                
                <div class="content">
                    <div class="urgent">
                        <h3>🚨 PRIORITEIT: Chatbot Lead</h3>
                        <p><strong>${messages.followUp}</strong></p>
                    </div>

                    <div class="info-box">
                        <h3>👤 Klantgegevens</h3>
                        <p><strong>Naam:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Taal:</strong> ${language.toUpperCase()}</p>
                        <p><strong>GDPR Toestemming:</strong> ✅ Verleend</p>
                    </div>
                    
                    <div class="info-box">
                        <h3>🤖 Chatbot Details</h3>
                        <p><strong>Conversatie ID:</strong> ${conversationId}</p>
                        <p><strong>Offerte Aanvraag ID:</strong> #${newQuoteRequest.id}</p>
                        <p><strong>Tijdstip:</strong> ${new Date().toLocaleString('nl-NL')}</p>
                    </div>
                    
                    <div class="info-box">
                        <h3>⚡ Aanbevolen Actie</h3>
                        <p>1. Bekijk de volledige chatbot conversatie voor context</p>
                        <p>2. Neem binnen 4 uur contact op via telefoon of email</p>
                        <p>3. Bereid een gepersonaliseerde offerte voor</p>
                        <p>4. Update de status in het admin panel</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p>KANIOU Chatbot Lead System | Automatisch gegenereerd</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // This will be handled by the existing email service
        console.log(`📧 CHATBOT LEAD EMAIL: Preparing notification for quote request #${newQuoteRequest.id}`);
        
      } catch (emailError) {
        console.error('❌ EMAIL ERROR: Failed to send chatbot lead notification, but lead is saved:', emailError);
      }

      res.json({
        success: true,
        message: "Lead successfully collected",
        quoteRequestId: newQuoteRequest.id,
        conversationId: conversation.id
      });

    } catch (error) {
      console.error("Error processing chatbot lead:", error);
      res.status(500).json({ message: "Failed to process lead" });
    }
  });

  // Admin API Routes for Chatbot Management
  
  // Get all knowledge base entries
  app.get("/api/admin/chatbot/knowledge", async (req: Request, res: Response) => {
    try {
      const knowledge = await storage.getChatbotKnowledge();
      res.json(knowledge);
    } catch (error) {
      console.error("Error fetching knowledge base:", error);
      res.status(500).json({ message: "Failed to fetch knowledge base" });
    }
  });

  // Add new knowledge entry
  app.post("/api/admin/chatbot/knowledge", async (req: Request, res: Response) => {
    try {
      const knowledgeData = {
        category: req.body.category,
        topic: req.body.topic,
        content: req.body.content,
        language: req.body.language || 'nl',
        priority: req.body.priority || 5,
        adminApproved: req.body.adminApproved || true
      };

      const newKnowledge = await storage.createChatbotKnowledge(knowledgeData);
      res.json(newKnowledge);
    } catch (error) {
      console.error("Error adding knowledge:", error);
      res.status(500).json({ message: "Failed to add knowledge entry" });
    }
  });

  // Get all conversations with message counts
  app.get("/api/admin/chatbot/conversations", async (req: Request, res: Response) => {
    try {
      const conversations = await storage.getChatbotConversations();
      
      // Get message counts for each conversation
      const conversationsWithMessages = await Promise.all(
        conversations.map(async (conversation) => {
          const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
          return {
            ...conversation,
            messages: messages
          };
        })
      );
      
      res.json(conversationsWithMessages);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  // Get price request notifications
  app.get("/api/admin/chatbot/price-requests", async (req: Request, res: Response) => {
    try {
      const priceRequests = await storage.getPriceRequestNotifications();
      res.json(priceRequests);
    } catch (error) {
      console.error("Error fetching price requests:", error);
      res.status(500).json({ message: "Failed to fetch price requests" });
    }
  });

  // Mark price request as responded
  app.patch("/api/admin/chatbot/price-requests/:id/respond", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const priceRequestId = parseInt(id);
      
      // For now, we'll update the responded status directly in the database
      // This would need to be implemented in your storage interface
      
      res.json({ message: "Price request marked as responded", id: priceRequestId });
    } catch (error) {
      console.error("Error updating price request:", error);
      res.status(500).json({ message: "Failed to update price request" });
    }
  });

  // Get chatbot analytics
  app.get("/api/admin/chatbot/analytics", async (req: Request, res: Response) => {
    try {
      const knowledge = await storage.getChatbotKnowledge();
      const conversations = await storage.getChatbotConversations();
      const priceRequests = await storage.getPriceRequestNotifications();
      
      const analytics = {
        totalKnowledge: knowledge.length,
        approvedKnowledge: knowledge.filter(k => k.adminApproved).length,
        totalConversations: conversations.length,
        activeConversations: conversations.filter(c => c.isActive).length,
        pendingPriceRequests: priceRequests.filter(p => !p.isResponded).length,
        totalPriceRequests: priceRequests.length
      };
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  // Conversation Summary Email endpoint
  app.post("/api/chatbot/summary/email", async (req: Request, res: Response) => {
    try {
      const { email, summary, language } = req.body;

      if (!email || !summary || !language) {
        return res.status(400).json({ 
          message: "Email, summary, and language are required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }

      // Send the conversation summary email
      const emailSent = await sendConversationSummaryEmail({
        email,
        summary,
        language
      });

      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Conversation summary sent successfully" 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send conversation summary email" 
        });
      }

    } catch (error) {
      console.error("Error sending conversation summary email:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Newsletter subscription endpoints
  app.post("/api/newsletter/subscribe", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
      
      if (existingSubscription) {
        if (existingSubscription.isActive) {
          return res.status(409).json({ 
            message: "Dit e-mailadres is al ingeschreven voor onze nieuwsbrief.",
            status: "already_subscribed" 
          });
        } else {
          // Reactivate subscription
          await storage.unsubscribeFromNewsletter(validatedData.email);
          const reactivatedSubscription = await storage.createNewsletterSubscription({
            ...validatedData,
            isActive: true
          });
          
          // Send welcome email
          await sendNewsletterWelcomeEmail({
            name: validatedData.name,
            email: validatedData.email,
            language: validatedData.language || "nl"
          });
          
          // Notify admin
          await sendNewsletterNotificationToAdmin({
            name: validatedData.name,
            email: validatedData.email,
            language: validatedData.language || "nl"
          });
          
          return res.status(201).json({ 
            message: "Welkom terug! Je bent opnieuw ingeschreven.",
            subscription: reactivatedSubscription 
          });
        }
      }
      
      // Create new subscription
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      // Send welcome email to subscriber
      const welcomeEmailSent = await sendNewsletterWelcomeEmail({
        name: validatedData.name,
        email: validatedData.email,
        language: validatedData.language || "nl"
      });
      
      // Send notification to admin
      const adminNotificationSent = await sendNewsletterNotificationToAdmin({
        name: validatedData.name,
        email: validatedData.email,
        language: validatedData.language || "nl"
      });
      
      console.log(`📧 Newsletter signup: ${validatedData.email}, Welcome email: ${welcomeEmailSent}, Admin notification: ${adminNotificationSent}`);
      
      res.status(201).json({ 
        message: "Bedankt voor je inschrijving! Je ontvangt binnenkort onze aanbiedingen.",
        subscription: subscription
      });
      
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Ongeldige gegevens",
          errors: validationError.details
        });
      }
      
      res.status(500).json({ 
        message: "Er ging iets mis bij het inschrijven. Probeer het later opnieuw." 
      });
    }
  });

  app.post("/api/newsletter/unsubscribe", async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ message: "E-mailadres is vereist" });
      }
      
      const success = await storage.unsubscribeFromNewsletter(email);
      
      if (success) {
        res.json({ message: "Je bent succesvol uitgeschreven van onze nieuwsbrief." });
      } else {
        res.status(404).json({ message: "E-mailadres niet gevonden" });
      }
      
    } catch (error) {
      console.error("Newsletter unsubscribe error:", error);
      res.status(500).json({ message: "Er ging iets mis bij het uitschrijven." });
    }
  });

  app.get("/api/newsletter/subscribers", async (req: Request, res: Response) => {
    try {
      const subscribers = await storage.getActiveNewsletterSubscriptions();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ message: "Er ging iets mis bij het ophalen van abonnees." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
