// Working 24/7 Chatbot Route Implementation
import { Request, Response } from "express";

export const working24_7ChatbotRoute = `
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
        console.log(\`🤖 24/7 CHATBOT: Using comprehensive knowledge system\`);
        
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
          aiResponse.content += \`\\n\\n\${followUpMessage.content}\`;

          console.log(\`📧 SMART NOTIFICATION: Triggered for conversation \${conversation.id} - Reason: \${triggerAnalysis.triggerReason}\`);
          console.log(\`👤 HUMAN FOLLOW-UP: Added 24-hour response notice in \${language}\`);
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
`;