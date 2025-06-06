import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2, CheckCircle, Eye } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/hooks/useLanguage";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { useGamification } from "@/hooks/useGamification";
import { LanguageSelector } from "./LanguageSelector";
import { QuickReplyButtons, PRICE_REQUEST_OPTIONS, GENERAL_HELP_OPTIONS } from "./QuickReplyButtons";
import { LeadCollectionForm } from "./LeadCollectionForm";
import { 
  getPersonalizedGreeting, 
  saveUserPreferences, 
  extractNameFromMessage,
  updateUserName,
  clearCorruptedPreferences 
} from "@/utils/userPreferences";
import {
  detectConversationEnd,
  generateConversationSummary,
  checkInactivityTimeout,
  type ConversationSummary as SummaryType
} from "@/utils/conversationSummary";
import { ConversationSummaryComponent } from "./ConversationSummary";
import { SmartSuggestionButtons } from "./SmartSuggestionButtons";
import kaniouLogo from "@/assets/KAN.LOGO.png";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  metadata?: any;
}

interface ChatState {
  showQuickReplies: boolean;
  quickReplyType: 'price_request' | 'general' | null;
  showLeadForm: boolean;
  lastAssistantMessage?: ChatMessage;
  waitingForLeadSubmission: boolean;
  showSmartSuggestions: boolean;
  showExitPrompt: boolean;
  lastActivityTime: number;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [chatState, setChatState] = useState<ChatState>({
    showQuickReplies: false,
    quickReplyType: null,
    showLeadForm: false,
    waitingForLeadSubmission: false,
    showSmartSuggestions: true,
    showExitPrompt: false,
    lastActivityTime: Date.now()
  });
  const [personalizedGreeting, setPersonalizedGreeting] = useState<{
    greeting: string;
    isPersonalized: boolean;
    showNamePrompt: boolean;
  } | null>(null);
  const [conversationSummary, setConversationSummary] = useState<SummaryType | null>(null);
  const [conversationStartTime] = useState(() => new Date());
  const [lastMessageTime, setLastMessageTime] = useState(new Date());
  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { language, t, changeLanguage } = useLanguage();
  const { preferences, updateLanguage, updateName, getLanguage, isLoading: preferencesLoading } = useUserPreferences();
  const { awardPoints } = useGamification();

  // Initialize user's preferred language when preferences load (only once)
  useEffect(() => {
    if (!preferencesLoading && preferences && preferences.language && preferences.language !== language) {
      changeLanguage(preferences.language as any);
    }
  }, [preferencesLoading, preferences?.language]); // Remove language and changeLanguage from dependencies

  // Initialize personalized greeting when language changes or component mounts
  useEffect(() => {
    // Clear any corrupted data first
    clearCorruptedPreferences();
    
    const greetingData = getPersonalizedGreeting(language);
    setPersonalizedGreeting(greetingData);
    
    // Save user interaction when chatbot opens
    if (isOpen) {
      saveUserPreferences({ language });
      
      // Check if smart suggestions should be shown based on trigger rules
      const lastChatTime = localStorage.getItem('kaniou_last_chat_time');
      const isNewUser = localStorage.getItem('kaniou_user_visited') === null;
      const now = new Date().getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      // Trigger Rules:
      // 1. New user opening chatbot for the first time
      // 2. Returning user after 24+ hours of inactivity
      const shouldShowSuggestions = isNewUser || 
        (!lastChatTime || (now - parseInt(lastChatTime)) > twentyFourHours);
      
      // Mark user as visited if new user
      if (isNewUser) {
        localStorage.setItem('kaniou_user_visited', 'true');
      }
      
      setChatState(prev => ({
        ...prev,
        showSmartSuggestions: shouldShowSuggestions
      }));
    }
  }, [language, isOpen]);

  // Check business hours
  const { data: businessHours } = useQuery({
    queryKey: ["/api/chatbot/business-hours", language],
    queryFn: async () => {
      const response = await fetch(`/api/chatbot/business-hours?language=${language}`);
      return response.json();
    },
    refetchInterval: 60000, // Check every minute
    staleTime: 30000 // Consider data stale after 30 seconds
  });

  // Get or create conversation
  const conversationMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/chatbot/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, language })
      });
      return response.json();
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      const response = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          conversationId: sessionId, 
          message: messageText, 
          language 
        })
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Force refresh messages immediately
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversation", sessionId, "messages"] });
      
      // Also refetch to ensure immediate update
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: ["/api/chatbot/conversation", sessionId, "messages"] });
      }, 100);
      
      // Check if the response indicates price detection or style consultation
      if (data.metadata?.priceDetected || data.metadata?.isStyleConsultation) {
        setChatState(prev => ({
          ...prev,
          showQuickReplies: true,
          quickReplyType: 'price_request',
          lastAssistantMessage: data
        }));
      } else {
        // Reset quick replies for non-price messages
        setChatState(prev => ({
          ...prev,
          showQuickReplies: false,
          quickReplyType: null
        }));
      }

      // Check if style consultation was completed
      if (data.metadata?.consultationCompleted) {
        // Show exit prompt after style consultation completion with a delay
        setTimeout(() => {
          setChatState(prev => ({
            ...prev,
            showExitPrompt: true,
            lastActivityTime: Date.now()
          }));
        }, 3000); // 3 second delay to let user read the consultation summary
      }
    }
  });

  // Submit lead form mutation
  const submitLeadMutation = useMutation({
    mutationFn: async (leadData: { name: string; email: string; gdprConsent: boolean }) => {
      const response = await fetch("/api/chatbot/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: sessionId,
          name: leadData.name,
          email: leadData.email,
          gdprConsent: leadData.gdprConsent,
          language
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      console.log('📧 Quote request submitted successfully:', data);
      
      setChatState(prev => ({
        ...prev,
        showLeadForm: false,
        waitingForLeadSubmission: false,
        showQuickReplies: false
      }));
      
      // Send a confirmation message with privacy disclaimer
      const confirmationMessages = {
        nl: "✅ Bedankt! Uw offerteaanvraag is succesvol verzonden naar info@kaniou.be. U ontvangt binnen 24 uur een gepersonaliseerde offerte per e-mail.\n\n🔒 We gebruiken uw e-mailadres alleen voor offertes en respecteren uw privacy.",
        en: "✅ Thank you! Your quote request has been successfully sent to info@kaniou.be. You'll receive a personalized offer within 24 hours via email.\n\n🔒 We use your email only for quotation purposes and respect your privacy.",
        fr: "✅ Merci! Votre demande de devis a été envoyée avec succès à info@kaniou.be. Vous recevrez une offre personnalisée dans les 24 heures par e-mail.\n\n🔒 Nous utilisons votre email uniquement pour les devis et respectons votre vie privée.",
        tr: "✅ Teşekkürler! Teklif talebiniz info@kaniou.be'a başarıyla gönderildi. 24 saat içinde e-posta ile kişiselleştirilmiş bir teklif alacaksınız.\n\n🔒 E-posta adresinizi sadece teklif amaçları için kullanıyor ve gizliliğinize saygı gösteriyoruz."
      };
      
      const confirmationText = confirmationMessages[language as keyof typeof confirmationMessages] || confirmationMessages.nl;
      
      // Add confirmation message directly to the chat
      const confirmationMessage = {
        id: Date.now(),
        role: "assistant" as const,
        content: confirmationText,
        createdAt: new Date().toISOString(),
        metadata: { automated: true, success: true }
      };
      
      // Update messages cache directly for immediate display
      queryClient.setQueryData(["/api/chatbot/conversation", sessionId, "messages"], (oldMessages: any) => [
        ...(oldMessages || []),
        confirmationMessage
      ]);

      // Show exit prompt after form completion with a short delay
      setTimeout(() => {
        setChatState(prev => ({
          ...prev,
          showExitPrompt: true,
          lastActivityTime: Date.now()
        }));
      }, 2000); // 2 second delay to let user read confirmation
    },
    onError: (error) => {
      console.error('❌ Quote request failed:', error);
      
      setChatState(prev => ({
        ...prev,
        waitingForLeadSubmission: false
      }));
      
      // Show error message
      const errorMessages = {
        nl: "❌ Er is een fout opgetreden bij het verzenden van uw aanvraag. Probeer het opnieuw of neem direct contact op via info@kaniou.be.",
        en: "❌ An error occurred while sending your request. Please try again or contact us directly at info@kaniou.be.",
        fr: "❌ Une erreur s'est produite lors de l'envoi de votre demande. Veuillez réessayer ou nous contacter directement à info@kaniou.be.",
        tr: "❌ Talebiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin veya doğrudan info@kaniou.be ile iletişime geçin."
      };
      
      const errorText = errorMessages[language as keyof typeof errorMessages] || errorMessages.nl;
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now(),
        role: "assistant" as const,
        content: errorText,
        createdAt: new Date().toISOString(),
        metadata: { automated: true, error: true }
      };
      
      queryClient.setQueryData(["/api/chatbot/conversation", sessionId, "messages"], (oldMessages: any) => [
        ...(oldMessages || []),
        errorMessage
      ]);
    }
  });

  // Get conversation messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/chatbot/conversation", sessionId, "messages"],
    queryFn: async () => {
      const response = await fetch(`/api/chatbot/conversation/${sessionId}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      return response.json();
    },
    enabled: isOpen,
    refetchInterval: false,
    retry: 3
  });

  // Monitor for conversation inactivity
  useEffect(() => {
    if (!isOpen || conversationSummary || messages.length === 0) return;

    // Clear existing timer
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }

    // Set new inactivity timer (3 minutes)
    const timer = setTimeout(() => {
      if (messages.length > 2) { // Only show summary if there was actual conversation
        const summary = generateConversationSummary(
          messages.map((m: ChatMessage) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            createdAt: m.createdAt,
            metadata: m.metadata
          })),
          language,
          conversationStartTime
        );
        setConversationSummary(summary);
      }
    }, 3 * 60 * 1000); // 3 minutes

    setInactivityTimer(timer);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [lastMessageTime, isOpen, messages, conversationSummary, language, conversationStartTime, inactivityTimer]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [inactivityTimer]);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && !conversationMutation.data && !conversationMutation.isPending) {
      conversationMutation.mutate();
    }
  }, [isOpen]);

  // Inactivity detection and conversation completion flow
  useEffect(() => {
    if (!isOpen || messages.length === 0) return;

    const checkForInactivity = () => {
      const now = Date.now();
      const timeSinceLastActivity = now - chatState.lastActivityTime;
      const lastMessage = messages[messages.length - 1];
      
      // Check if 30 seconds have passed since last activity
      if (timeSinceLastActivity >= 30000 && 
          lastMessage?.role === 'assistant' && 
          !chatState.showExitPrompt && 
          !chatState.showLeadForm &&
          !chatState.showSmartSuggestions) {
        
        // Check if last message indicates conversation completion
        const completionIndicators = {
          nl: [
            'kan ik u ergens anders mee helpen', 'heeft u verder nog vragen', 'nog iets anders', 'anders helpen',
            'succesvol verzonden', 'offerte aanvraag', 'binnen 24 uur', 'bedankt voor uw bezoek',
            'consultatie voltooid', 'aanbevelingen voor u', 'persoonlijke offerte'
          ],
          fr: [
            'puis-je vous aider avec autre chose', 'avez-vous d\'autres questions', 'autre chose',
            'envoyé avec succès', 'demande de devis', 'dans les 24 heures', 'merci pour votre visite',
            'consultation terminée', 'recommandations pour vous'
          ],
          en: [
            'can i help you with anything else', 'do you have any other questions', 'anything else',
            'successfully sent', 'quote request', 'within 24 hours', 'thank you for visiting',
            'consultation completed', 'recommendations for you', 'personalized offer'
          ],
          tr: [
            'başka bir konuda yardımcı olabilir miyim', 'başka sorunuz var mı',
            'başarıyla gönderildi', 'teklif talebi', '24 saat içinde', 'ziyaret ettiğiniz için teşekkürler',
            'danışmanlık tamamlandı', 'size öneriler'
          ]
        };
        
        const indicators = completionIndicators[language as keyof typeof completionIndicators] || completionIndicators.nl;
        const messageContent = lastMessage.content.toLowerCase();
        const isCompletionMessage = indicators.some(indicator => messageContent.includes(indicator));
        
        // Show exit prompt if it's been 30+ seconds OR if it's a completion message
        if (isCompletionMessage || timeSinceLastActivity >= 30000) {
          setChatState(prev => ({ ...prev, showExitPrompt: true }));
        }
      }
    };

    const timer = setInterval(checkForInactivity, 5000); // Check every 5 seconds
    return () => clearInterval(timer);
  }, [isOpen, messages, chatState.lastActivityTime, chatState.showExitPrompt, chatState.showLeadForm, chatState.showSmartSuggestions, language]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle smart suggestion clicks
  const handleSmartSuggestion = (suggestionText: string, action?: string) => {
    // Hide suggestions immediately and update last chat time
    setChatState(prev => ({ 
      ...prev, 
      showSmartSuggestions: false,
      showQuickReplies: false,
      quickReplyType: null,
      showLeadForm: false,
      showExitPrompt: false,
      lastActivityTime: Date.now()
    }));
    
    // Update last chat time
    localStorage.setItem('kaniou_last_chat_time', new Date().getTime().toString());
    
    // Handle Step 4: Core Suggestion Button Actions
    switch (action) {
      case 'appointment_booking':
        // 🪟 Free Measurement Appointment - leads to chatbot form
        const appointmentMessages = {
          nl: "Ik wil graag een gratis inmeetafspraak bij mij thuis inplannen",
          fr: "J'aimerais planifier un rendez-vous de mesure gratuit chez moi",
          en: "I would like to schedule a free measurement appointment at my home",
          tr: "Evimde ücretsiz bir ölçüm randevusu planlamak istiyorum"
        };
        const appointmentText = appointmentMessages[language as keyof typeof appointmentMessages] || appointmentMessages.nl;
        sendMessageMutation.mutate(appointmentText);
        break;

      case 'style_consultation':
        // 🎨 Get Style Advice - triggers AI interior style consultation flow
        const styleMessages = {
          nl: "Ik wil graag stijladvies voor mijn raambekleding",
          fr: "J'aimerais des conseils de style pour mes stores",
          en: "I would like style advice for my window treatments",
          tr: "Perde seçimi için stil tavsiyesi istiyorum"
        };
        const styleText = styleMessages[language as keyof typeof styleMessages] || styleMessages.nl;
        sendMessageMutation.mutate(styleText);
        break;

      case 'quote_request':
        // 🧾 Request a Quote - opens chatbot quote request wizard
        setChatState(prev => ({ ...prev, showLeadForm: true }));
        const quoteMessages = {
          nl: "Graag help ik u met een offerte! Laten we beginnen met enkele gegevens voor uw persoonlijke offerte.",
          fr: "Je serais ravi de vous aider avec un devis! Commençons par quelques détails pour votre offre personnalisée.",
          en: "I'd be happy to help you with a quote! Let's start with some details for your personalized offer.",
          tr: "Bir teklif konusunda size yardımcı olmaktan mutluluk duyarım! Kişiselleştirilmiş teklifiniz için bazı detaylarla başlayalım."
        };
        const quoteText = quoteMessages[language as keyof typeof quoteMessages] || quoteMessages.nl;
        sendMessageMutation.mutate(quoteText);
        break;

      case 'product_gallery':
        // 🖼️ View Product Gallery - opens carousel or image preview
        const galleryMessages = {
          nl: "Toon mij de productgalerij met voorbeelden van jullie raambekleding",
          fr: "Montrez-moi la galerie de produits avec des exemples de vos stores",
          en: "Show me the product gallery with examples of your window treatments",
          tr: "Perde örneklerinizle ürün galerisini gösterin"
        };
        const galleryText = galleryMessages[language as keyof typeof galleryMessages] || galleryMessages.nl;
        sendMessageMutation.mutate(galleryText);
        break;

      case 'product_information':
        // 📦 Product Information - asks user to select product type for details
        const productInfoMessages = {
          nl: "Ik wil meer informatie over jullie producten en hun eigenschappen",
          fr: "Je voudrais plus d'informations sur vos produits et leurs caractéristiques",
          en: "I would like more information about your products and their features",
          tr: "Ürünleriniz ve özellikleri hakkında daha fazla bilgi istiyorum"
        };
        const productInfoText = productInfoMessages[language as keyof typeof productInfoMessages] || productInfoMessages.nl;
        sendMessageMutation.mutate(productInfoText);
        break;

      case 'interactive_qa':
        // ❓ Need Help Choosing? - starts interactive Q&A to narrow down options
        const helpChoosingMessages = {
          nl: "Help me de juiste raambekleding kiezen op basis van mijn ruimte en stijl",
          fr: "Aidez-moi à choisir les bons stores en fonction de mon espace et de mon style",
          en: "Help me choose the right window treatments based on my space and style",
          tr: "Alanım ve tarzıma göre doğru perde seçiminde bana yardım edin"
        };
        const helpText = helpChoosingMessages[language as keyof typeof helpChoosingMessages] || helpChoosingMessages.nl;
        sendMessageMutation.mutate(helpText);
        break;

      case 'business_solutions':
        // 🏢 Business Solutions - redirect to business page
        window.open('/zakelijk', '_blank');
        break;

      default:
        // For other suggestions, send as regular message
        sendMessageMutation.mutate(suggestionText);
        break;
    }
  };

  // Handle exit prompt actions
  const handleExitPromptAction = (action: 'show_suggestions' | 'close_chat') => {
    setChatState(prev => ({ ...prev, showExitPrompt: false }));
    
    if (action === 'show_suggestions') {
      // Re-show smart suggestion buttons
      setChatState(prev => ({ 
        ...prev, 
        showSmartSuggestions: true,
        lastActivityTime: Date.now()
      }));
    } else if (action === 'close_chat') {
      // Show thank you message and reset chat
      const thankYouMessages = {
        nl: "Bedankt voor uw bezoek aan KANIOU. We staan altijd voor u klaar!",
        fr: "Merci pour votre visite chez KANIOU. Nous sommes toujours là pour vous!",
        en: "Thank you for visiting KANIOU. We're always here for you!",
        tr: "KANIOU'yu ziyaret ettiğiniz için teşekkürler. Her zaman sizin için buradayız!"
      };
      
      const thankYouText = thankYouMessages[language as keyof typeof thankYouMessages] || thankYouMessages.nl;
      
      // Add thank you message to chat
      const thankYouMessage = {
        id: Date.now(),
        role: "assistant" as const,
        content: thankYouText,
        createdAt: new Date().toISOString(),
        metadata: { automated: true, closing: true }
      };
      
      queryClient.setQueryData(["/api/chatbot/conversation", sessionId, "messages"], (oldMessages: any) => [
        ...(oldMessages || []),
        thankYouMessage
      ]);
      
      // Update last chat time when closing
      localStorage.setItem('kaniou_last_chat_time', new Date().getTime().toString());
      
      // Close chat after a brief delay
      setTimeout(() => {
        setIsOpen(false);
        // Reset chat state for next session - don't show suggestions immediately
        setChatState({
          showQuickReplies: false,
          quickReplyType: null,
          showLeadForm: false,
          waitingForLeadSubmission: false,
          showSmartSuggestions: false, // Don't show until 24h rule triggers
          showExitPrompt: false,
          lastActivityTime: Date.now()
        });
      }, 2000);
    }
  };

  // Handle quick reply selection
  const handleQuickReply = (option: any) => {
    setChatState(prev => ({ ...prev, showQuickReplies: false }));

    if (option.action === 'request_offer_yes') {
      // Show follow-up message and lead form
      const followUpMessages = {
        nl: "Uitstekend! Ik ga u helpen met het aanvragen van een persoonlijke offerte. Laten we beginnen met enkele gegevens.",
        en: "Excellent! I'll help you request a personalized offer. Let's start with some details.",
        fr: "Excellent! Je vais vous aider à demander une offre personnalisée. Commençons par quelques détails.",
        tr: "Mükemmel! Kişiselleştirilmiş bir teklif talep etmenize yardımcı olacağım. Bazı detaylarla başlayalım."
      };
      
      const followUpText = followUpMessages[language as keyof typeof followUpMessages] || followUpMessages.nl;
      
      // Send the follow-up message and show the lead form
      sendMessageMutation.mutate(followUpText);
      setChatState(prev => ({ ...prev, showLeadForm: true }));
      
    } else if (option.action === 'request_offer_no') {
      const laterMessages = {
        nl: "Geen probleem! Als u later vragen heeft over onze producten of prijzen, help ik u graag verder. U kunt ook onze website bekijken voor meer informatie.",
        en: "No problem! If you have questions about our products or prices later, I'm happy to help. You can also browse our website for more information.",
        fr: "Pas de problème! Si vous avez des questions sur nos produits ou prix plus tard, je suis là pour vous aider. Vous pouvez aussi parcourir notre site web pour plus d'informations.",
        tr: "Sorun değil! Daha sonra ürünlerimiz veya fiyatlarımız hakkında sorularınız olursa, size yardımcı olmaktan mutluluk duyarım. Daha fazla bilgi için web sitemize de göz atabilirsiniz."
      };
      
      const laterText = laterMessages[language as keyof typeof laterMessages] || laterMessages.nl;
      sendMessageMutation.mutate(laterText);
      
      // Show general help options
      setChatState(prev => ({ 
        ...prev, 
        showQuickReplies: true, 
        quickReplyType: 'general' 
      }));
      
    } else {
      // Handle other actions like navigation
      sendMessageMutation.mutate(option.text);
    }
  };

  // Handle lead form submission
  const handleLeadSubmit = (leadData: { name: string; email: string; gdprConsent: boolean }) => {
    setChatState(prev => ({ ...prev, waitingForLeadSubmission: true }));
    submitLeadMutation.mutate(leadData);
  };

  // Handle lead form cancellation
  const handleLeadCancel = () => {
    setChatState(prev => ({ 
      ...prev, 
      showLeadForm: false,
      showQuickReplies: true,
      quickReplyType: 'general'
    }));
  };

  // Handle input change to hide suggestions when user starts typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Hide smart suggestions when user starts typing
    if (value.trim() && chatState.showSmartSuggestions) {
      setChatState(prev => ({
        ...prev,
        showSmartSuggestions: false
      }));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const messageText = message.trim();
    setMessage("");

    // Update last message time for inactivity tracking
    setLastMessageTime(new Date());

    // Award points for chatbot interaction
    awardPoints('CHATBOT_INTERACTION');

    // Check if user provided their name and update preferences
    const extractedName = extractNameFromMessage(messageText);
    if (extractedName) {
      updateUserName(extractedName);
      // Update the greeting to personalized version
      const newGreeting = getPersonalizedGreeting(language);
      setPersonalizedGreeting(newGreeting);
    }

    // Check if conversation is ending
    const endIndicator = detectConversationEnd(messageText, language);
    if (endIndicator.isEnding && endIndicator.confidence > 0.6 && messages.length > 2) {
      // Generate summary after a short delay to allow the final response
      setTimeout(() => {
        const summary = generateConversationSummary(
          messages.map((m: ChatMessage) => ({
            id: m.id,
            role: m.role,
            content: m.content,
            createdAt: m.createdAt,
            metadata: m.metadata
          })),
          language,
          conversationStartTime
        );
        setConversationSummary(summary);
      }, 2000);
    }

    // Reset chat state when user sends a manual message
    setChatState(prev => ({
      ...prev,
      showQuickReplies: false,
      quickReplyType: null,
      showLeadForm: false,
      showSmartSuggestions: false,
      showExitPrompt: false,
      lastActivityTime: Date.now()
    }));
    
    // Update last chat time when user sends a message
    localStorage.setItem('kaniou_last_chat_time', new Date().getTime().toString());

    try {
      await sendMessageMutation.mutateAsync(messageText);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Show error message to user
      const errorMessages = {
        nl: "Er is een fout opgetreden bij het versturen van uw bericht. Probeer het opnieuw.",
        en: "An error occurred while sending your message. Please try again.",
        fr: "Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.",
        tr: "Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      };
      
      const errorText = errorMessages[language as keyof typeof errorMessages] || errorMessages.nl;
      
      // Add error message to UI manually since backend failed
      const errorMessage: ChatMessage = {
        id: Date.now(),
        role: "assistant",
        content: errorText,
        createdAt: new Date().toISOString(),
        metadata: { error: true }
      };
      
      // Update the messages cache directly
      queryClient.setQueryData(["/api/chatbot/conversation", sessionId, "messages"], (oldMessages: any) => [
        ...(oldMessages || []),
        { id: Date.now() - 1, role: "user", content: messageText, createdAt: new Date().toISOString() },
        errorMessage
      ]);
    }
  };



  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-primary hover:to-orange-600 border-2 border-white z-50 chatbot-button group"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] max-w-96 sm:w-96 h-[calc(100vh-2rem)] max-h-[500px] shadow-2xl z-50 flex flex-col border-2 border-amber-200 chatbot-window overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white rounded-t-lg border-b-2 border-amber-300">
            <div className="flex items-center gap-3">
              {/* KANIOU Logo */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white rounded-md p-1 shadow-sm">
                  <img 
                    src={kaniouLogo} 
                    alt="KANIOU" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-sm font-bold text-amber-200">KANIOU</CardTitle>
                  <div className="flex items-center gap-1">
                    <div 
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        businessHours?.isOpen ? 'bg-green-400' : 'bg-orange-400'
                      }`} 
                      title={businessHours?.isOpen ? t("chatbot.online") : t("chatbot.businessHours.afterHoursNotice")}
                    ></div>
                    <span className="text-xs text-gray-300">
                      {businessHours?.isOpen ? 'Online' : 'Na openingstijd'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <LanguageSelector />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 text-white hover:bg-white/20 transition-colors"
                aria-label={t("chatbot.close")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
            {/* Messages Area */}
            <ScrollArea className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden">
              {/* Enhanced Welcome Message Container */}
              <div className="mb-6 w-full">
                <div className={`chatbot-welcome-container relative p-4 rounded-xl text-sm animate-in fade-in-50 duration-500 max-w-full break-words shadow-lg ${
                  personalizedGreeting?.isPersonalized 
                    ? 'bg-white border-2 border-green-200'
                    : 'bg-white border-2 border-amber-200'
                }`} style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  {/* Gold highlight bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-t-xl"></div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <MessageCircle className={`h-5 w-5 flex-shrink-0 ${
                        personalizedGreeting?.isPersonalized ? 'text-green-600' : 'text-primary'
                      }`} />
                      <span className="chatbot-welcome-title font-bold text-lg text-gray-800">
                        {personalizedGreeting?.isPersonalized ? 'Welcome back!' : t("chatbot.welcome")}
                      </span>
                    </div>
                  </div>
                  <div className="chatbot-welcome-message break-words overflow-wrap-anywhere text-gray-700 leading-relaxed" style={{ fontSize: '1.1rem' }}>
                    {personalizedGreeting?.greeting || t("chatbot.welcomeMessage")}
                  </div>
                  {personalizedGreeting?.showNamePrompt && !personalizedGreeting?.isPersonalized && (
                    <div className="mt-2 text-xs opacity-75 break-words">
                      {(() => {
                        const namePrompts = {
                          nl: "Mag ik uw naam weten voor een persoonlijkere ervaring?",
                          fr: "Puis-je connaître votre nom pour une expérience plus personnalisée?",
                          en: "May I know your name for a more personalized experience?",
                          tr: "Daha kişiselleştirilmiş bir deneyim için adınızı öğrenebilir miyim?"
                        };
                        return namePrompts[language as keyof typeof namePrompts] || namePrompts.nl;
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Business Hours Notice */}
              {businessHours && !businessHours.isOpen && (
                <div className="mb-4 w-full">
                  <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 p-3 rounded-lg text-sm text-orange-900 animate-in fade-in-50 duration-500 max-w-full break-words">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                      <span className="font-medium break-words">{t("chatbot.businessHours.afterHoursNotice")}</span>
                    </div>
                    <div className="space-y-2">
                      <p className="break-words overflow-wrap-anywhere">{businessHours.message}</p>
                      <div className="text-xs opacity-80 space-y-1">
                        <p className="break-words">{t("chatbot.businessHours.openHours")}</p>
                        <p className="break-words">{t("chatbot.businessHours.leaveMessage")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Smart Suggestion Buttons - Show for new users or after 24h inactivity */}
              {chatState.showSmartSuggestions && messages.length === 0 && !messagesLoading && (
                <SmartSuggestionButtons
                  onSuggestionClick={handleSmartSuggestion}
                  onHide={() => setChatState(prev => ({ ...prev, showSmartSuggestions: false }))}
                  sessionId={sessionId}
                />
              )}

              {/* Conversation Messages */}
              {messagesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">{t("chatbot.connecting")}</span>
                  </div>
                </div>
              ) : (
                (messages as ChatMessage[]).map((msg: ChatMessage) => (
                  <div
                    key={msg.id}
                    className={`mb-3 w-full message-enter ${
                      msg.role === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg text-sm shadow-sm max-w-[85%] min-w-0 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <div className="break-words overflow-wrap-anywhere whitespace-pre-wrap word-break-break-word hyphens-auto">{msg.content}</div>
                      <div className={`text-xs mt-1 opacity-70 ${
                        msg.role === "user" ? "text-primary-foreground/70" : "text-gray-500"
                      }`}>
                        {new Date(msg.createdAt).toLocaleTimeString('nl-NL', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Loading indicator for AI response */}
              {sendMessageMutation.isPending && (
                <div className="mb-3 w-full flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-bl-sm text-sm shadow-sm max-w-[85%] min-w-0">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary flex-shrink-0" />
                      <span className="text-gray-600 break-words">{t("chatbot.typing")}</span>
                      <div className="flex gap-1 flex-shrink-0">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exit Prompt - Show after inactivity or completion */}
              {chatState.showExitPrompt && (
                <div className="mb-4 w-full flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4 max-w-[85%] min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <MessageCircle className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-semibold text-blue-800">
                        {(() => {
                          const prompts = {
                            nl: "Wilt u deze chat afsluiten of andere opties bekijken?",
                            fr: "Souhaitez-vous terminer cette conversation ou voir d'autres options?",
                            en: "Would you like to end this chat or see more options?",
                            tr: "Sohbeti sonlandırmak mı istersiniz yoksa başka seçenekleri mi görmek istersiniz?"
                          };
                          return prompts[language as keyof typeof prompts] || prompts.nl;
                        })()}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        onClick={() => handleExitPromptAction('show_suggestions')}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1 min-w-0"
                        size="sm"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {(() => {
                          const suggestions = {
                            nl: "Bekijk suggesties",
                            fr: "Voir les suggestions",
                            en: "See suggestions",
                            tr: "Önerileri gör"
                          };
                          return suggestions[language as keyof typeof suggestions] || suggestions.nl;
                        })()}
                      </Button>
                      
                      <Button
                        onClick={() => handleExitPromptAction('close_chat')}
                        variant="outline"
                        className="border-blue-200 text-blue-700 hover:bg-blue-50 flex-1 min-w-0"
                        size="sm"
                      >
                        <X className="h-4 w-4 mr-1" />
                        {(() => {
                          const closings = {
                            nl: "Sluit chat af",
                            fr: "Fermer le chat",
                            en: "Close chat",
                            tr: "Sohbeti kapat"
                          };
                          return closings[language as keyof typeof closings] || closings.nl;
                        })()}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Reply Buttons */}
              {chatState.showQuickReplies && chatState.quickReplyType && !chatState.showLeadForm && (
                <div className="mb-4 w-full flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="max-w-[85%] min-w-0">
                    {chatState.quickReplyType === 'price_request' && (
                      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-amber-800">
                            {language === 'nl' ? 'Wilt u een persoonlijke offerte aanvragen?' :
                             language === 'en' ? 'Would you like to request a personal offer?' :
                             language === 'fr' ? 'Souhaitez-vous demander une offre personnelle?' :
                             'Kişisel bir teklif talep etmek ister misiniz?'}
                          </span>
                        </div>
                        <QuickReplyButtons
                          options={PRICE_REQUEST_OPTIONS(language)}
                          onSelect={handleQuickReply}
                          disabled={sendMessageMutation.isPending}
                        />
                      </div>
                    )}
                    
                    {chatState.quickReplyType === 'general' && (
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageCircle className="h-5 w-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">
                            {language === 'nl' ? 'Kan ik u ergens anders mee helpen?' :
                             language === 'en' ? 'Can I help you with something else?' :
                             language === 'fr' ? 'Puis-je vous aider avec autre chose?' :
                             'Başka bir konuda size yardımcı olabilir miyim?'}
                          </span>
                        </div>
                        <QuickReplyButtons
                          options={GENERAL_HELP_OPTIONS(language)}
                          onSelect={handleQuickReply}
                          disabled={sendMessageMutation.isPending}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lead Collection Form */}
              {chatState.showLeadForm && (
                <div className="mb-4 text-left animate-in slide-in-from-bottom-4 duration-300">
                  <div className="max-w-[95%]">
                    <LeadCollectionForm
                      onSubmit={handleLeadSubmit}
                      onCancel={handleLeadCancel}
                      isSubmitting={submitLeadMutation.isPending || chatState.waitingForLeadSubmission}
                    />
                  </div>
                </div>
              )}
              
              {/* Conversation Summary */}
              {conversationSummary && (
                <ConversationSummaryComponent
                  summary={conversationSummary}
                  onClose={() => setConversationSummary(null)}
                />
              )}
              
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 flex-shrink-0">
              <div className="flex gap-2 w-full">
                <Input
                  value={message}
                  onChange={handleInputChange}
                  placeholder={t("chatbot.placeholder")}
                  disabled={sendMessageMutation.isPending || !conversationMutation.data || chatState.showLeadForm}
                  className="flex-1 min-w-0 border-amber-300 focus:border-amber-500 bg-white shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim() || sendMessageMutation.isPending || !conversationMutation.data || chatState.showLeadForm}
                  className="bg-gradient-to-r from-primary to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-md transition-all duration-200 flex-shrink-0"
                >
                  {sendMessageMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}