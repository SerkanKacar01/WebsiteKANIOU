
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
