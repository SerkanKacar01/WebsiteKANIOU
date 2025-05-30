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
  insertNewsletterSubscriptionSchema,
  insertStyleQuoteRequestSchema
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
import { 
  isStyleConsultationRequest,
  getConsultationWelcomeMessage,
  getConsultationQuestion,
  generateRecommendations,
  generateConsultationSummary
} from "./styleConsultation";
import multer from "multer";

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

      // Detect pricing and product requests
      const priceDetection = detectPriceIntent(message, language);
      console.log(`🕵️ PRICE DETECTION: ${priceDetection.isPriceRequest ? 'YES' : 'NO'} - Confidence: ${Math.round(priceDetection.confidence * 100)}% - Products: ${priceDetection.extractedProducts.join(', ') || 'None'}`);

      // 24/7 Chatbot Operation - Always Available
      console.log(`🤖 24/7 CHATBOT: Processing message at any time - Full service available`);
      
      let aiResponse: any;
      let savedResponse: any;
      
      // Handle Style Consultation Flow
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
        
      } else if (priceDetection.isPriceRequest) {
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
        messageId: savedResponse.id,
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

      await sendEmail({
        to: emailConfig.adminEmail,
        subject: `Nieuwe Stijl Consultatie Offerte - ${validatedData.customerName}`,
        html: emailHtml
      });

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

  const httpServer = createServer(app);
  return httpServer;
}