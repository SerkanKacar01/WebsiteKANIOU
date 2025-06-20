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
  insertChatbotConversationSchema,
  insertChatbotMessageSchema,
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
import { recommendationService } from "./smartRecommendations";
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
import { 
  isStyleConsultationRequest,
  getConsultationWelcomeMessage,
  getConsultationQuestion,
  generateRecommendations,
  generateConsultationSummary
} from "./styleConsultation";
import {
  detectProductGalleryRequest,
  generateProductGalleryResponse,
  generateCategoryGalleryResponse,
  detectCategoryRequest
} from "./productGalleryFlow";
import multer from "multer";
import { molliePaymentService } from "./services/molliePayments";


// Type aliases for better code readability
const detectPriceIntent = detectPriceRequest;
const findMatchingLearnedResponse = checkLearnedResponse;

export async function registerRoutes(app: Express): Promise<Server> {
  // Configure multer for file uploads
  const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

  // Send message to chatbot - 24/7 Operation
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



      // Check for style consultation request
      const isStyleRequest = isStyleConsultationRequest(message, language);
      console.log(`🎨 STYLE CONSULTATION: ${isStyleRequest ? 'YES' : 'NO'} - Request detected`);

      // Check for product gallery request (Step 4 Smart Suggestions)
      const isProductGalleryRequest = detectProductGalleryRequest(message, language);
      const specificCategory = detectCategoryRequest(message, language);
      console.log(`🖼️ PRODUCT GALLERY: ${isProductGalleryRequest ? 'YES' : 'NO'} - Category: ${specificCategory || 'General'}`);

      // Check for product catalog questions
      const { isProductCatalogQuestion, generateProductCatalogResponse } = await import('./productCatalogResponse');
      const isProductCatalog = isProductCatalogQuestion(message, language);

      // Detect pricing and product requests
      const priceDetection = detectPriceIntent(message, language);
      console.log(`🕵️ PRICE DETECTION: ${priceDetection.isPriceRequest ? 'YES' : 'NO'} - Confidence: ${Math.round(priceDetection.confidence * 100)}% - Products: ${priceDetection.extractedProducts.join(', ') || 'None'}`);

      // 24/7 Chatbot Operation - Always Available
      console.log(`🤖 24/7 CHATBOT: Processing message at any time - Full service available`);
      
      let aiResponse: any;
      let savedResponse: any;
      
      // Handle Style Consultation Flow (High Priority)
      if (isStyleRequest) {
        console.log(`🎨 STYLE CONSULTATION: Starting consultation flow`);
        
        // Check if there's an existing consultation session
        let consultation = await storage.getStyleConsultationBySessionId(conversationId);
        
        if (!consultation) {
          // Start new consultation
          consultation = await storage.createStyleConsultation({
            sessionId: conversationId,
            conversationId: conversation.id,
            language,
            currentStep: "room_type"
          });
          
          const welcomeMessage = getConsultationWelcomeMessage(language);
          const firstQuestion = getConsultationQuestion("room_type", language);
          
          aiResponse = {
            content: `${welcomeMessage}\n\n${firstQuestion?.question}`,
            requiresPricing: false,
            metadata: {
              consultationStep: "room_type",
              consultationOptions: firstQuestion?.options,
              isStyleConsultation: true
            }
          };

          savedResponse = await storage.createChatbotMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: aiResponse.content,
            metadata: aiResponse.metadata
          });
        } else {
          // Continue existing consultation
          console.log(`🎨 CONTINUING CONSULTATION: Step ${consultation.currentStep}`);
          
          // Process the user's answer and move to next step
          const currentStep = consultation.currentStep;
          let updates: any = {};
          
          switch (currentStep) {
            case "room_type":
              updates.roomType = message;
              updates.currentStep = "primary_goal";
              break;
            case "primary_goal":
              updates.primaryGoal = message;
              updates.currentStep = "style_preference";
              break;
            case "style_preference":
              updates.stylePreference = message;
              updates.currentStep = "color_material";
              break;
            case "color_material":
              updates.colorPreferences = [message];
              updates.currentStep = "budget";
              break;
            case "budget":
              updates.budgetRange = message;
              updates.currentStep = "recommendations";
              updates.isCompleted = true;
              break;
          }
          
          consultation = await storage.updateStyleConsultation(conversationId, updates);
          
          if (consultation.currentStep === "recommendations") {
            // Generate final recommendations
            const recommendations = generateRecommendations(
              consultation.roomType || "",
              consultation.primaryGoal || "",
              consultation.stylePreference || "",
              consultation.colorPreferences?.[0],
              consultation.budgetRange || "",
              language
            );
            
            // Update consultation with recommendations
            await storage.updateStyleConsultation(conversationId, {
              recommendations: recommendations as any
            });
            
            const summaryMessage = generateConsultationSummary(recommendations, consultation.roomType || "", language);
            
            aiResponse = {
              content: summaryMessage,
              requiresPricing: false,
              metadata: {
                consultationCompleted: true,
                recommendations,
                isStyleConsultation: true
              }
            };
          } else {
            // Ask next question
            const nextQuestion = getConsultationQuestion(consultation.currentStep || "", language);
            if (nextQuestion) {
              aiResponse = {
                content: nextQuestion.question,
                requiresPricing: false,
                metadata: {
                  consultationStep: consultation.currentStep,
                  consultationOptions: nextQuestion.options,
                  isStyleConsultation: true
                }
              };
            } else {
              aiResponse = {
                content: "Er is een fout opgetreden bij het laden van de volgende vraag.",
                requiresPricing: false,
                metadata: {
                  error: true,
                  isStyleConsultation: true
                }
              };
            }
          }
        }
        
        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });
        
      } 
      // Handle Product Catalog Questions (Second Priority)
      else if (isProductCatalog) {
        console.log(`📋 PRODUCT CATALOG: Question detected, providing complete product list`);
        
        const catalogResponse = generateProductCatalogResponse(message, language);
        
        aiResponse = {
          content: catalogResponse,
          requiresPricing: false,
          metadata: {
            type: 'product_catalog',
            comprehensive: true
          }
        };

        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });
        
      } 
      // Handle Price Requests (Third Priority)
      else if (priceDetection.isPriceRequest) {
        console.log(`💰 PRICE REQUEST: High confidence (${Math.round(priceDetection.confidence * 100)}%) - Products: ${priceDetection.extractedProducts.join(', ') || 'General pricing'}`);
        
        const priceResponse = generateProductPricingResponse(
          priceDetection.extractedProducts, 
          language, 
          message
        );
        
        aiResponse = {
          content: priceResponse,
          requiresPricing: false,
          detectedProductTypes: priceDetection.extractedProducts,
          metadata: {
            tokensUsed: 0,
            responseTime: 100,
            confidence: priceDetection.confidence,
            businessHours: true,
            afterHours: false,
            priceDetection,
            pricingProvided: true
          }
        };

        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });
      } else {
        console.log(`🤖 24/7 CHATBOT: Using comprehensive knowledge system`);
        
        const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
        const conversationContext = messages.map(m => m.content);

        const comprehensiveResponse = await answerWithComprehensiveKnowledge(
          message,
          language,
          conversationContext
        );

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

        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });
      }

      // Smart Email Notification Trigger Analysis for 24/7 Operation
      try {
        const conversationMessages = await storage.getChatbotMessagesByConversationId(conversation.id);
        const messageHistory = conversationMessages.map(msg => ({
          role: msg.role,
          content: msg.content,
          createdAt: msg.createdAt?.toISOString()
        }));

        const triggerAnalysis = analyzeTriggerConditions(
          message,
          messageHistory,
          aiResponse.metadata?.confidence || 0.5,
          language
        );

        console.log(`🔔 TRIGGER ANALYSIS: Should trigger: ${triggerAnalysis.shouldTrigger}, Reason: ${triggerAnalysis.triggerReason}, Confidence: ${Math.round(triggerAnalysis.confidence * 100)}%`);

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

          sendSmartNotification(notificationData).catch(error => {
            console.error('Failed to send smart notification:', error);
          });

          const followUpMessage = getHumanFollowUpMessage(language);
          aiResponse.content += `\n\n${followUpMessage.content}`;

          console.log(`📧 SMART NOTIFICATION: Triggered for conversation ${conversation.id} - Reason: ${triggerAnalysis.triggerReason}`);
          console.log(`👤 HUMAN FOLLOW-UP: Added 24-hour response notice in ${language}`);
        }
      } catch (error) {
        console.error('Error in smart notification analysis:', error);
      }

      res.json({
        message: aiResponse.content,
        messageId: savedResponse?.id,
        requiresPricing: aiResponse.requiresPricing,
        metadata: aiResponse.metadata
      });

    } catch (error) {
      console.error("Error processing chatbot message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });

  // Create a new conversation
  app.post("/api/chatbot/conversation", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.body;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      // Check if conversation already exists
      let conversation = await storage.getChatbotConversationBySessionId(sessionId);
      
      if (!conversation) {
        // Create new conversation
        conversation = await storage.createChatbotConversation({
          sessionId,
          language: "nl"
        });
      }

      res.json(conversation);
    } catch (error) {
      console.error("Error handling chatbot conversation:", error);
      res.status(500).json({ message: "Failed to handle conversation" });
    }
  });

  // Get conversation messages
  app.get("/api/chatbot/conversation/:sessionId/messages", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      // Get or create conversation first
      let conversation = await storage.getChatbotConversationBySessionId(sessionId);
      
      if (!conversation) {
        // Create conversation if it doesn't exist
        conversation = await storage.createChatbotConversation({
          sessionId,
          language: "nl"
        });
        
        // Return empty messages for new conversation
        return res.json([]);
      }

      // Get messages for the conversation
      const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
      res.json(messages);
      
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  // Business hours endpoint - only responds when specifically requested
  app.get("/api/chatbot/business-hours", async (req: Request, res: Response) => {
    try {
      const { message, language } = req.query;
      
      // Only provide business hours if explicitly asked
      if (message && isAskingForBusinessHours(message as string, language as string || 'nl')) {
        const businessStatus = getBusinessStatus();
        res.json(businessStatus);
      } else {
        // For 24/7 operation, always return available status
        res.json({
          isOpen: true,
          currentTime: new Date().toLocaleString('nl-BE', { timeZone: 'Europe/Brussels' }),
          businessHours: {
            monday: "10:00-18:00",
            tuesday: "10:00-18:00", 
            wednesday: "10:00-18:00",
            thursday: "10:00-18:00",
            friday: "10:00-18:00",
            saturday: "10:00-18:00",
            sunday: "Gesloten / Fermé / Closed / Kapalı"
          },
          timezone: "Europe/Brussels",
          chatAvailable: true, // 24/7 chat availability
          note: "Chat is available 24/7. Human assistance available during business hours."
        });
      }
    } catch (error) {
      console.error("Error getting business hours:", error);
      res.status(500).json({ message: "Failed to get business hours" });
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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }

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

  // Style consultation quote request endpoint
  app.post("/api/style-consultation/quote", async (req: Request, res: Response) => {
    try {
      const validatedData = insertStyleQuoteRequestSchema.parse(req.body);
      
      // Get the consultation session
      const consultation = await storage.getStyleConsultationById(validatedData.consultationId);
      if (!consultation) {
        return res.status(404).json({ message: "Consultation session not found" });
      }

      // Create the quote request
      const quoteRequest = await storage.createStyleQuoteRequest(validatedData);
      
      // Send notification email to admin
      const emailHtml = `
        <h2>Nieuwe Stijl Consultatie Offerte Aanvraag</h2>
        <h3>Klantgegevens:</h3>
        <p><strong>Naam:</strong> ${validatedData.customerName}</p>
        <p><strong>Email:</strong> ${validatedData.customerEmail}</p>
        <p><strong>Adres:</strong> ${validatedData.customerAddress || 'Niet opgegeven'}</p>
        
        <h3>Consultatie Details:</h3>
        <p><strong>Ruimte:</strong> ${consultation.roomType}</p>
        <p><strong>Doel:</strong> ${consultation.primaryGoal}</p>
        <p><strong>Stijl:</strong> ${consultation.stylePreference}</p>
        <p><strong>Budget:</strong> ${consultation.budgetRange}</p>
        
        <h3>Geselecteerde Aanbevelingen:</h3>
        <pre>${JSON.stringify(validatedData.selectedRecommendations, null, 2)}</pre>
        
        <h3>Metingen:</h3>
        <p>${validatedData.measurements || 'Niet opgegeven'}</p>
        
        <h3>Extra Wensen:</h3>
        <p>${validatedData.additionalRequirements || 'Geen'}</p>
      `;

      const emailSuccess = await sendEmail({
        to: emailConfig.notificationEmail,
        from: emailConfig.senderEmail,
        subject: `Nieuwe Stijl Consultatie Offerte - ${validatedData.customerName}`,
        html: emailHtml
      });

      if (!emailSuccess) {
        console.error(`❌ STYLE CONSULTATION: Email failed to send to ${emailConfig.notificationEmail} for ${validatedData.customerName}`);
        throw new Error("Email delivery failed");
      }

      console.log(`📧 STYLE CONSULTATION: Email successfully delivered to ${emailConfig.notificationEmail} for ${validatedData.customerName}`);

      res.json({ 
        success: true, 
        message: "Quote request submitted successfully",
        quoteRequestId: quoteRequest.id
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Error creating style consultation quote request:", error);
      res.status(500).json({ message: "Failed to create quote request" });
    }
  });

  // Get style consultation status
  app.get("/api/style-consultation/status/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;
      const consultation = await storage.getStyleConsultationBySessionId(sessionId);
      
      if (!consultation) {
        return res.status(404).json({ message: "Consultation not found" });
      }

      res.json({
        consultation,
        isCompleted: consultation.isCompleted,
        currentStep: consultation.currentStep,
        recommendations: consultation.recommendations
      });

    } catch (error) {
      console.error("Error getting consultation status:", error);
      res.status(500).json({ message: "Failed to get consultation status" });
    }
  });

  // Chatbot lead collection endpoint
  app.post("/api/chatbot/lead", async (req: Request, res: Response) => {
    try {
      const { conversationId, name, email, gdprConsent, language } = req.body;
      
      if (!conversationId || !name || !email || !gdprConsent) {
        return res.status(400).json({ 
          message: "Conversation ID, name, email, and GDPR consent are required" 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          message: "Invalid email format" 
        });
      }

      // Get conversation messages for context
      const conversation = await storage.getChatbotConversationBySessionId(conversationId);
      let chatSummary = "Geen eerdere berichten beschikbaar";
      
      if (conversation) {
        const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
        if (messages.length > 0) {
          chatSummary = messages
            .slice(-5) // Last 5 messages
            .map(msg => `${msg.role === 'user' ? 'Klant' : 'Bot'}: ${msg.content}`)
            .join('\n');
        }
      }

      // Create email content
      const emailHtml = `
        <h2>Nieuwe offerteaanvraag via chatbot – KANIOU</h2>
        
        <h3>Klantgegevens:</h3>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Bevestiging:</strong> ✅ gebruiker gaf toestemming</p>
        <p><strong>Tijdstip:</strong> ${new Date().toLocaleString('nl-BE', { 
          timeZone: 'Europe/Brussels',
          dateStyle: 'full',
          timeStyle: 'medium'
        })}</p>
        <p><strong>Taal:</strong> ${language || 'nl'}</p>
        
        <h3>Chat samenvatting:</h3>
        <div style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; font-family: monospace; white-space: pre-wrap;">
${chatSummary}
        </div>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          Deze aanvraag werd automatisch gegenereerd door de KANIOU chatbot.
        </p>
      `;

      // Send email to info@kaniou.be with enhanced error handling
      const emailSuccess = await sendEmail({
        to: "info@kaniou.be",
        from: emailConfig.senderEmail,
        subject: "Nieuwe offerteaanvraag via chatbot – KANIOU",
        html: emailHtml
      });

      if (!emailSuccess) {
        console.error(`❌ QUOTE REQUEST: Email failed to send to info@kaniou.be for ${name} (${email})`);
        throw new Error("Email delivery failed");
      }

      console.log(`📧 QUOTE REQUEST: Email successfully delivered to info@kaniou.be for ${name} (${email})`);

      res.json({ 
        success: true, 
        message: "Quote request submitted successfully" 
      });

    } catch (error) {
      console.error("Error processing chatbot lead:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to process quote request" 
      });
    }
  });

  // Smart Product Recommendations API
  app.get("/api/recommendations", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string || 'anonymous';
      const sessionId = req.query.sessionId as string || `session_${Date.now()}`;
      
      const recommendations = await recommendationService.generateRecommendations(userId, sessionId);
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error generating recommendations:", error);
      res.status(500).json({ 
        message: "Failed to generate recommendations",
        recommendations: [],
        userBehavior: { totalProducts: 0, analyzedCategories: 0, confidenceScore: 0 }
      });
    }
  });

  // Chat Escalation API
  app.post("/api/chatbot/escalate", async (req: Request, res: Response) => {
    try {
      const { processEscalation } = await import('./chatEscalation');
      const { isWithinBusinessHours } = await import('./businessHours');
      
      const escalationRequest = {
        ...req.body,
        timestamp: new Date().toISOString(),
        businessHours: isWithinBusinessHours()
      };

      const result = await processEscalation(escalationRequest);
      
      res.json(result);
    } catch (error) {
      console.error("Error processing escalation:", error);
      res.status(500).json({
        success: false,
        escalationId: '',
        estimatedWaitTime: '',
        supportAgentAvailable: false,
        nextSteps: ['Probeer later opnieuw of neem direct contact met ons op'],
        message: 'Er is een fout opgetreden bij het doorverbinden. Probeer het later opnieuw.'
      });
    }
  });

  // Check if escalation should be triggered
  app.post("/api/chatbot/check-escalation", async (req: Request, res: Response) => {
    try {
      const { shouldTriggerEscalation } = await import('./chatEscalation');
      const { userMessage, conversationHistory, language = 'nl' } = req.body;
      
      const result = shouldTriggerEscalation(userMessage, conversationHistory, language);
      
      res.json(result);
    } catch (error) {
      console.error("Error checking escalation trigger:", error);
      res.status(500).json({
        shouldEscalate: false,
        reason: '',
        confidence: 0
      });
    }
  });





  // Dealer Contact Form Route
  app.post("/api/contact/dealer", formRateLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = insertDealerContactSchema.parse(req.body);
      
      // Create dealer contact submission in storage
      const dealerContact = await storage.createDealerContact(validatedData);
      
      // Send email notification
      const emailHtml = createDealerContactEmailHtml({
        businessName: validatedData.businessName,
        contactPerson: validatedData.contactPerson,
        email: validatedData.email,
        phone: validatedData.phone,
        businessType: validatedData.businessType,
        message: validatedData.message,
        language: validatedData.language
      });

      await sendEmail({
        from: emailConfig.senderEmail,
        to: emailConfig.notificationEmail,
        subject: `[Dealer Partnership] ${validatedData.businessName} - ${validatedData.businessType}`,
        html: emailHtml,
        text: `New dealer partnership inquiry from ${validatedData.businessName}\n\nContact: ${validatedData.contactPerson}\nEmail: ${validatedData.email}\nPhone: ${validatedData.phone || 'Not provided'}\nBusiness Type: ${validatedData.businessType}\n\nMessage:\n${validatedData.message}`
      });

      res.json({
        success: true,
        message: "Dealer contact form submitted successfully",
        submissionId: dealerContact.id
      });

    } catch (error) {
      console.error("Error processing dealer contact form:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to submit dealer contact form"
      });
    }
  });

  // Smart Quote Generator Routes
  app.post("/api/smart-quotes", formRateLimiter, async (req: Request, res: Response) => {
    try {
      const validatedData = insertSmartQuoteRequestSchema.parse(req.body);
      
      // Import pricing functions
      const { calculateEstimatedPrice, validateDimensions, isMaterialCompatible } = await import('./smartQuotePricing');
      
      // Validate dimensions
      const dimensionValidation = validateDimensions(validatedData.width, validatedData.height);
      if (!dimensionValidation.valid) {
        return res.status(400).json({
          success: false,
          message: dimensionValidation.error
        });
      }
      
      // Validate material compatibility
      if (!isMaterialCompatible(validatedData.productType, validatedData.material)) {
        return res.status(400).json({
          success: false,
          message: "Selected material is not compatible with this product type"
        });
      }
      
      // Create smart quote request
      const smartQuote = await storage.createSmartQuoteRequest(validatedData);
      
      // Send notification emails
      const { sendSmartQuoteNotificationToAdmin, sendSmartQuoteConfirmationToCustomer } = await import('./smartQuoteEmailService');
      
      const adminEmailSent = await sendSmartQuoteNotificationToAdmin(smartQuote);
      const customerEmailSent = await sendSmartQuoteConfirmationToCustomer(smartQuote);
      
      console.log(`💰 New smart quote created: #${smartQuote.id} - ${smartQuote.productType} (${smartQuote.width}x${smartQuote.height}cm) - €${smartQuote.estimatedPrice}`);
      
      res.json({
        success: true,
        quoteId: smartQuote.id,
        estimatedPrice: smartQuote.estimatedPrice,
        message: "Smart quote request submitted successfully",
        emailsSent: {
          admin: adminEmailSent,
          customer: customerEmailSent
        }
      });
      
    } catch (error) {
      console.error("Error creating smart quote:", error);
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to create smart quote request"
      });
    }
  });

  // Get pricing estimation without creating quote
  app.post("/api/smart-quotes/estimate", async (req: Request, res: Response) => {
    try {
      const { productType, material, width, height, installationRequired } = req.body;
      
      if (!productType || !material || !width || !height) {
        return res.status(400).json({
          success: false,
          message: "Product type, material, width, and height are required"
        });
      }
      
      const { calculateEstimatedPrice, validateDimensions, isMaterialCompatible } = await import('./smartQuotePricing');
      
      // Validate dimensions
      const dimensionValidation = validateDimensions(width, height);
      if (!dimensionValidation.valid) {
        return res.status(400).json({
          success: false,
          message: dimensionValidation.error
        });
      }
      
      // Validate material compatibility
      if (!isMaterialCompatible(productType, material)) {
        return res.status(400).json({
          success: false,
          message: "Selected material is not compatible with this product type"
        });
      }
      
      const estimatedPrice = calculateEstimatedPrice(
        productType,
        material,
        width,
        height,
        installationRequired || false
      );
      
      res.json({
        success: true,
        estimatedPrice,
        dimensions: { width, height },
        productType,
        material,
        installationRequired: installationRequired || false
      });
      
    } catch (error) {
      console.error("Error calculating price estimate:", error);
      res.status(500).json({
        success: false,
        message: "Failed to calculate price estimate"
      });
    }
  });

  // Get available product types and materials
  app.get("/api/smart-quotes/config", async (req: Request, res: Response) => {
    try {
      const { getAvailableProductTypes, getAvailableMaterials, PRICING_CONFIG } = await import('./smartQuotePricing');
      
      const productTypes = getAvailableProductTypes();
      const config = Object.entries(PRICING_CONFIG).reduce((acc, [key, value]) => {
        acc[key] = {
          name: value.name,
          materials: getAvailableMaterials(key),
          installationCost: value.installationCost
        };
        return acc;
      }, {} as Record<string, any>);
      
      res.json({
        success: true,
        productTypes,
        config
      });
      
    } catch (error) {
      console.error("Error getting smart quote config:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get configuration"
      });
    }
  });

  // Get smart quote requests (admin endpoint)
  app.get("/api/smart-quotes", async (req: Request, res: Response) => {
    try {
      const quotes = await storage.getSmartQuoteRequests();
      res.json({
        success: true,
        quotes
      });
    } catch (error) {
      console.error("Error fetching smart quotes:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch smart quotes"
      });
    }
  });

  // Gallery API endpoints
  app.get("/api/gallery", async (req: Request, res: Response) => {
    try {
      const galleryItems = await storage.getGalleryItems();
      res.json(galleryItems);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Get categories
  app.get("/api/categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Testimonials endpoint
  app.get("/api/testimonials", async (req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Inventory Alerts Routes
  app.get("/api/inventory/stock", async (req: Request, res: Response) => {
    try {
      const stockLevels = await storage.getProductStock();
      res.json(stockLevels);
    } catch (error) {
      console.error("Error fetching stock levels:", error);
      res.status(500).json({ message: "Failed to fetch stock levels" });
    }
  });

  app.post("/api/inventory/alerts", formRateLimiter, async (req: Request, res: Response) => {
    try {
      const { email, productName, productVariant, language } = req.body;
      
      if (!email || !productName) {
        return res.status(400).json({
          success: false,
          message: "Email and product name are required"
        });
      }

      const alert = await storage.createInventoryAlert({
        email,
        productName,
        productVariant,
        language: language || 'nl',
        isActive: true
      });

      // Send admin notification  
      const { sendInventoryAlertToAdmin } = await import('./inventoryEmailService');
      await sendInventoryAlertToAdmin({
        id: alert.id,
        email,
        productType: productName,
        alertType: 'back_in_stock',
        isActive: true,
        createdAt: new Date().toISOString()
      });

      console.log(`🔔 New inventory alert created: ${email} for ${productName}${productVariant ? ` (${productVariant})` : ''}`);

      res.json({
        success: true,
        alertId: alert.id,
        message: "Inventory alert created successfully"
      });

    } catch (error) {
      console.error("Error creating inventory alert:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create inventory alert"
      });
    }
  });

  app.get("/api/inventory/alerts/:email", async (req: Request, res: Response) => {
    try {
      const { email } = req.params;
      const alerts = await storage.getInventoryAlertsByEmail(email);
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching user alerts:", error);
      res.status(500).json({ message: "Failed to fetch user alerts" });
    }
  });

  app.delete("/api/inventory/alerts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteInventoryAlert(id);
      
      res.json({
        success: true,
        message: "Alert removed successfully"
      });
    } catch (error) {
      console.error("Error removing alert:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove alert"
      });
    }
  });

  // Appointment Time Slots Route
  app.get("/api/appointments/slots/:date", async (req: Request, res: Response) => {
    try {
      const { date } = req.params;
      
      // Default available time slots
      const timeSlots = [
        '09:00', '10:30', '13:00', '14:30', '16:00'
      ].map(time => ({
        time,
        available: true, // Default to available for now
        technicianName: 'Available'
      }));

      res.json(timeSlots);
    } catch (error) {
      console.error("Error fetching time slots:", error);
      res.status(500).json({ message: "Failed to fetch time slots" });
    }
  });

  // Availability Management API Routes
  
  // Get all blocked dates
  app.get("/api/admin/blocked-dates", async (req: Request, res: Response) => {
    try {
      const blockedDates = await storage.getBlockedDates();
      res.json({
        success: true,
        blockedDates
      });
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch blocked dates"
      });
    }
  });

  // Create a new blocked date
  app.post("/api/admin/blocked-dates", async (req: Request, res: Response) => {
    try {
      const { date, reason, isRecurring, recurringType, blockedSlots } = req.body;
      
      const blockedDate = await storage.createBlockedDate({
        date,
        reason,
        isRecurring: isRecurring || false,
        recurringType,
        blockedSlots: blockedSlots || []
      });
      
      res.json({
        success: true,
        message: "Date blocked successfully",
        blockedDate
      });
    } catch (error) {
      console.error("Error creating blocked date:", error);
      res.status(500).json({
        success: false,
        message: "Failed to block date"
      });
    }
  });

  // Update a blocked date
  app.put("/api/admin/blocked-dates/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      
      const updatedBlockedDate = await storage.updateBlockedDate(id, updates);
      
      res.json({
        success: true,
        message: "Blocked date updated successfully",
        blockedDate: updatedBlockedDate
      });
    } catch (error) {
      console.error("Error updating blocked date:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update blocked date"
      });
    }
  });

  // Delete a blocked date
  app.delete("/api/admin/blocked-dates/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBlockedDate(id);
      
      res.json({
        success: true,
        message: "Blocked date removed successfully"
      });
    } catch (error) {
      console.error("Error deleting blocked date:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove blocked date"
      });
    }
  });

  // Newsletter Subscription
  app.post("/api/newsletter/subscribe", formRateLimiter, spamDetectionMiddleware, async (req: Request, res: Response) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
      if (existingSubscription && existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          message: validatedData.language === "nl" 
            ? "Dit e-mailadres is al ingeschreven voor onze nieuwsbrief"
            : validatedData.language === "fr"
            ? "Cette adresse e-mail est déjà abonnée à notre newsletter"
            : "This email address is already subscribed to our newsletter"
        });
      }

      // Create or reactivate subscription
      let subscription;
      if (existingSubscription && !existingSubscription.isActive) {
        // Reactivate existing subscription
        subscription = await storage.updateNewsletterSubscription(existingSubscription.id, {
          isActive: true,
          name: validatedData.name,
          language: validatedData.language,
          unsubscribedAt: null
        });
      } else {
        // Create new subscription
        subscription = await storage.createNewsletterSubscription(validatedData);
      }

      // Send welcome email
      try {
        await sendNewsletterWelcomeEmail({
          email: subscription.email,
          name: subscription.name || "",
          language: subscription.language || "nl"
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the request if email fails
      }

      // Send notification to admin
      try {
        await sendNewsletterNotificationToAdmin({
          email: subscription.email,
          name: subscription.name || "",
          language: subscription.language || "nl"
        });
      } catch (adminEmailError) {
        console.error("Failed to send admin notification:", adminEmailError);
        // Don't fail the request if admin email fails
      }

      res.json({
        success: true,
        message: validatedData.language === "nl"
          ? "Bedankt voor je inschrijving! Je ontvangt binnenkort een bevestigingsmail."
          : validatedData.language === "fr"
          ? "Merci pour votre inscription ! Vous recevrez bientôt un e-mail de confirmation."
          : "Thank you for subscribing! You'll receive a confirmation email soon.",
        subscription: {
          email: subscription.email,
          language: subscription.language
        }
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }

      res.status(500).json({
        success: false,
        message: req.body.language === "nl"
          ? "Er is een fout opgetreden bij het verwerken van je inschrijving"
          : req.body.language === "fr"
          ? "Une erreur s'est produite lors du traitement de votre inscription"
          : "An error occurred while processing your subscription"
      });
    }
  });

  // Color Matcher API - Room analysis with image upload
  app.post("/api/color-matcher", upload.single('roomImage'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No image file provided"
        });
      }

      // Convert uploaded image to base64
      const base64Image = convertImageToBase64(req.file.buffer);
      
      // Analyze the room image
      const analysis = await analyzeRoomForColorMatching(base64Image);
      
      console.log(`🎨 COLOR MATCHER: Successfully analyzed room image - ${analysis.recommendations.length} recommendations generated`);
      
      res.json(analysis);
      
    } catch (error) {
      console.error("Error in color matcher:", error);
      res.status(500).json({
        message: "Failed to analyze room image. Please try again."
      });
    }
  });

  // Cookiebot API Integration
  app.get("/api/cookiebot/verify", async (req: Request, res: Response) => {
    try {
      const cookieHeader = req.headers.cookie || '';
      const consentMatch = cookieHeader.match(/CookieConsent=([^;]+)/);
      
      if (!consentMatch) {
        return res.json({
          success: false,
          message: 'No consent cookie found',
          consent: {
            necessary: false,
            preferences: false,
            statistics: false,
            marketing: false
          }
        });
      }

      const consentValue = decodeURIComponent(consentMatch[1]);
      let consent = {
        necessary: false,
        preferences: false,
        statistics: false,
        marketing: false
      };

      try {
        // Parse Cookiebot consent format
        const consentObj = JSON.parse(consentValue.replace(/([a-zA-Z]+):/g, '"$1":'));
        consent = {
          necessary: consentObj.necessary === true,
          preferences: consentObj.preferences === true,
          statistics: consentObj.statistics === true,
          marketing: consentObj.marketing === true
        };
      } catch (parseError) {
        // Fallback parsing
        consent = {
          necessary: consentValue.includes('necessary:true'),
          preferences: consentValue.includes('preferences:true'),
          statistics: consentValue.includes('statistics:true'),
          marketing: consentValue.includes('marketing:true')
        };
      }

      res.json({
        success: true,
        consent,
        timestamp: new Date().toISOString(),
        domainId: '277bd293-9336-4f15-ba87-4c760a56129b'
      });

    } catch (error) {
      console.error('Consent verification error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        consent: {
          necessary: false,
          preferences: false,
          statistics: false,
          marketing: false
        }
      });
    }
  });

  // Cookiebot compliance status endpoint
  app.get("/api/cookiebot/compliance-status", async (req: Request, res: Response) => {
    try {
      const cookieHeader = req.headers.cookie || '';
      const hasConsentCookie = cookieHeader.includes('CookieConsent=');
      
      const domainId = '277bd293-9336-4f15-ba87-4c760a56129b';
      const hasApiKey = !!process.env.COOKIEBOT_API_KEY;
      
      res.json({
        success: true,
        compliance: {
          cookiebotConfigured: true,
          domainId,
          apiKeyPresent: hasApiKey,
          userHasConsent: hasConsentCookie,
          gdprCompliant: hasConsentCookie && hasApiKey
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Compliance status error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to check compliance status'
      });
    }
  });

  // ============================================================================
  // PAYMENT ENDPOINTS - Mollie Integration
  // ============================================================================

  // Create payment with Mollie
  app.post("/api/payment/create", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPaymentOrderSchema.parse(req.body);

      // Create the full redirect URL
      const baseUrl = req.protocol + '://' + req.get('host');
      const redirectUrl = `${baseUrl}/payment/success`;
      // Only set webhook URL for production environments
      const webhookUrl = baseUrl.includes('localhost') ? undefined : `${baseUrl}/api/payment/webhook`;

      const paymentData = {
        amount: validatedData.amount,
        currency: validatedData.currency || 'EUR',
        description: validatedData.description,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        redirectUrl,
        webhookUrl,
        productDetails: validatedData.productDetails,
        customerDetails: validatedData.customerDetails,
      };

      const result = await molliePaymentService.createPayment(paymentData);

      res.json({
        success: true,
        paymentId: result.paymentId,
        checkoutUrl: result.checkoutUrl,
        orderId: result.orderId,
      });

    } catch (error) {
      console.error("Payment creation failed:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: fromZodError(error).toString(),
        });
      }

      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Failed to create payment",
      });
    }
  });

  // Mollie webhook endpoint
  app.post("/api/payment/webhook", async (req: Request, res: Response) => {
    try {
      const paymentId = req.body.id;

      if (!paymentId) {
        return res.status(400).json({
          success: false,
          message: "Payment ID is required",
        });
      }

      await molliePaymentService.handleWebhook(paymentId);

      // Mollie expects a 200 status code
      res.status(200).send("OK");

    } catch (error) {
      console.error("Webhook processing failed:", error);
      res.status(500).json({
        success: false,
        message: "Webhook processing failed",
      });
    }
  });

  // Get payment status
  app.get("/api/payment/status/:paymentId", async (req: Request, res: Response) => {
    try {
      const { paymentId } = req.params;

      const status = await molliePaymentService.getPaymentStatus(paymentId);

      res.json({
        success: true,
        status,
      });

    } catch (error) {
      console.error("Failed to get payment status:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve payment status",
      });
    }
  });

  // Get payment order details
  app.get("/api/payment/order/:orderId", async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.orderId);

      if (isNaN(orderId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid order ID",
        });
      }

      const order = await storage.getPaymentOrderById(orderId);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.json({
        success: true,
        order,
      });

    } catch (error) {
      console.error("Failed to get order:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve order",
      });
    }
  });

  // ============================================================================
  // SHOPPING CART ENDPOINTS
  // ============================================================================

  // Add item to cart
  app.post("/api/cart/add", async (req: Request, res: Response) => {
    try {
      const validatedData = insertShoppingCartItemSchema.parse(req.body);

      const cartItem = await storage.addItemToCart(validatedData);

      res.json({
        success: true,
        item: cartItem,
      });

    } catch (error) {
      console.error("Failed to add item to cart:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: fromZodError(error).toString(),
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to add item to cart",
      });
    }
  });

  // Get cart items
  app.get("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;

      const items = await storage.getCartItems(sessionId);

      const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);
      const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

      res.json({
        success: true,
        items,
        summary: {
          totalAmount,
          totalItems,
          currency: 'EUR',
        },
      });

    } catch (error) {
      console.error("Failed to get cart items:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve cart items",
      });
    }
  });

  // Update cart item
  app.patch("/api/cart/item/:itemId", async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.itemId);
      const updates = req.body;

      if (isNaN(itemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid item ID",
        });
      }

      const updatedItem = await storage.updateCartItem(itemId, updates);

      res.json({
        success: true,
        item: updatedItem,
      });

    } catch (error) {
      console.error("Failed to update cart item:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update cart item",
      });
    }
  });

  // Remove item from cart
  app.delete("/api/cart/item/:itemId", async (req: Request, res: Response) => {
    try {
      const itemId = parseInt(req.params.itemId);

      if (isNaN(itemId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid item ID",
        });
      }

      await storage.removeCartItem(itemId);

      res.json({
        success: true,
        message: "Item removed from cart",
      });

    } catch (error) {
      console.error("Failed to remove cart item:", error);
      res.status(500).json({
        success: false,
        message: "Failed to remove cart item",
      });
    }
  });

  // Clear cart
  app.delete("/api/cart/:sessionId", async (req: Request, res: Response) => {
    try {
      const { sessionId } = req.params;

      await storage.clearCart(sessionId);

      res.json({
        success: true,
        message: "Cart cleared",
      });

    } catch (error) {
      console.error("Failed to clear cart:", error);
      res.status(500).json({
        success: false,
        message: "Failed to clear cart",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}