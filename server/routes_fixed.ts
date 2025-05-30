/**
 * Fixed 24/7 Chatbot Route Implementation
 * This will replace the broken chatbot message route
 */

// Fixed chatbot message endpoint for 24/7 operation
export const chatbotMessageRoute = `
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

      // Detect pricing and product requests
      const priceDetection = detectPriceIntent(message, language);
      console.log(\`🕵️ PRICE DETECTION: \${priceDetection.isPriceRequest ? 'YES' : 'NO'} - Confidence: \${Math.round(priceDetection.confidence * 100)}% - Products: \${priceDetection.extractedProducts.join(', ') || 'None'}\`);

      // 24/7 Chatbot Operation - Always Available
      console.log(\`🤖 24/7 CHATBOT: Processing message at any time - Full service available\`);
      
      let aiResponse;
      let savedResponse;
      
      if (priceDetection.isPriceRequest) {
        console.log(\`💰 PRICE REQUEST: High confidence (\${Math.round(priceDetection.confidence * 100)}%) - Products: \${priceDetection.extractedProducts.join(', ') || 'General pricing'}\`);
        
        // Generate actual pricing response using product data
        const priceResponse = generateProductPricingResponse(
          priceDetection.extractedProducts, 
          language, 
          message
        );
        
        console.log(\`💡 PRICING RESPONSE: Generated specific pricing info for detected products\`);
        
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

        // Save price request response
        savedResponse = await storage.createChatbotMessage({
          conversationId: conversation.id,
          role: "assistant",
          content: aiResponse.content,
          metadata: aiResponse.metadata
        });

        // Check rate limiting for email notifications 
        if (await checkNotificationRateLimit(priceDetection.extractedProducts.join(", "))) {
          await sendPriceRequestNotification({
            name: "Anonieme Chatbot Gebruiker",
            email: "info@kaniou.be",
            phone: null,
            message: \`Chatbot gebruiker heeft gevraagd naar prijzen voor: \${priceDetection.extractedProducts.join(", ")}. Bericht: "\${message}"\`,
            productType: priceDetection.extractedProducts.join(", "),
            windowMeasurements: null,
            requirements: null,
            language,
            gdprConsent: true,
            source: "chatbot"
          });
          console.log(\`📧 PRICING EMAIL: Sent notification for detected products\`);
        } else {
          console.log(\`⏰ RATE LIMITED: Price request notification skipped (max 3 per minute)\`);
        }
      } else {
        // Use comprehensive knowledge system for ALL non-price requests
        console.log(\`🤖 24/7 CHATBOT: Using comprehensive knowledge system\`);
        
        // Get conversation context for better responses
        const messages = await storage.getChatbotMessagesByConversationId(conversation.id);
        const conversationContext = messages.map(m => m.content);

        // Generate response using comprehensive knowledge
        const comprehensiveResponse = await answerWithComprehensiveKnowledge(
          message,
          language,
          conversationContext
        );

        console.log(\`🧠 COMPREHENSIVE RESPONSE: Confidence \${Math.round(comprehensiveResponse.confidence * 100)}% - Sources: \${comprehensiveResponse.sources.join(', ')} - Fallback: \${comprehensiveResponse.usedFallback}\`);

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

      // Legacy pricing handling (kept for compatibility)
      if (aiResponse && aiResponse.requiresPricing && aiResponse.detectedProductTypes.length > 0) {
        // Create pricing request record
        await storage.createChatbotPricing({
          productType: aiResponse.detectedProductTypes.join(", "),
          pricingInfo: { requestedProducts: aiResponse.detectedProductTypes },
          requestContext: message
        });

        console.log(\`📋 LEGACY PRICING: Recorded request for: \${aiResponse.detectedProductTypes.join(", ")}\`);
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

        console.log(\`🔔 TRIGGER ANALYSIS: Should trigger: \${triggerAnalysis.shouldTrigger}, Reason: \${triggerAnalysis.triggerReason}, Confidence: \${Math.round(triggerAnalysis.confidence * 100)}%\`);

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
          aiResponse.content += \`\\n\\n\${followUpMessage.content}\`;

          console.log(\`📧 SMART NOTIFICATION: Triggered for conversation \${conversation.id} - Reason: \${triggerAnalysis.triggerReason}\`);
          console.log(\`👤 HUMAN FOLLOW-UP: Added 24-hour response notice in \${language}\`);
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

    } catch (error) {
      console.error("Error processing chatbot message:", error);
      res.status(500).json({ message: "Failed to process message" });
    }
  });
`;