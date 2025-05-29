import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2, CheckCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "./LanguageSelector";
import { QuickReplyButtons, PRICE_REQUEST_OPTIONS, GENERAL_HELP_OPTIONS } from "./QuickReplyButtons";
import { LeadCollectionForm } from "./LeadCollectionForm";
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
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [chatState, setChatState] = useState<ChatState>({
    showQuickReplies: false,
    quickReplyType: null,
    showLeadForm: false,
    waitingForLeadSubmission: false
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { language, t } = useLanguage();

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
      // Refresh messages
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversation", sessionId, "messages"] });
      
      // Check if the response indicates price detection
      if (data.metadata?.priceDetected) {
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
      return response.json();
    },
    onSuccess: () => {
      setChatState(prev => ({
        ...prev,
        showLeadForm: false,
        waitingForLeadSubmission: false,
        showQuickReplies: false
      }));
      
      // Send a confirmation message
      const confirmationMessages = {
        nl: "Bedankt! We hebben uw aanvraag ontvangen. U ontvangt binnen 24 uur een gepersonaliseerde offerte per e-mail.",
        en: "Thank you! We've received your request. You'll receive a personalized offer within 24 hours via email.",
        fr: "Merci! Nous avons reçu votre demande. Vous recevrez une offre personnalisée dans les 24 heures par e-mail.",
        tr: "Teşekkürler! Talebinizi aldık. 24 saat içinde e-posta ile kişiselleştirilmiş bir teklif alacaksınız."
      };
      
      const confirmationText = confirmationMessages[language as keyof typeof confirmationMessages] || confirmationMessages.nl;
      
      // Send confirmation as an automated message
      sendMessageMutation.mutate(confirmationText);
    }
  });

  // Get conversation messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/chatbot/conversation", sessionId, "messages"],
    queryFn: async () => {
      const response = await fetch(`/api/chatbot/conversation/${sessionId}/messages`);
      return response.json();
    },
    enabled: isOpen && !!conversationMutation.data,
    refetchInterval: false
  });

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && !conversationMutation.data && !conversationMutation.isPending) {
      conversationMutation.mutate();
    }
  }, [isOpen]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const messageText = message.trim();
    setMessage("");

    // Reset chat state when user sends a manual message
    setChatState(prev => ({
      ...prev,
      showQuickReplies: false,
      quickReplyType: null,
      showLeadForm: false
    }));

    try {
      await sendMessageMutation.mutateAsync(messageText);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };



  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] max-w-96 sm:w-96 h-[calc(100vh-2rem)] max-h-[500px] shadow-2xl z-50 flex flex-col border-2 border-amber-200 animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-300 overflow-hidden">
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
              {/* Welcome Message */}
              <div className="mb-4 w-full">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-900 animate-in fade-in-50 duration-500 max-w-full break-words">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="font-medium">{t("chatbot.welcome")}</span>
                  </div>
                  <div className="break-words overflow-wrap-anywhere">
                    {t("chatbot.welcomeMessage")}
                  </div>
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
                    className={`mb-3 w-full animate-in slide-in-from-bottom-2 duration-300 ${
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

              {/* Quick Reply Buttons */}
              {chatState.showQuickReplies && chatState.quickReplyType && !chatState.showLeadForm && (
                <div className="mb-4 w-full flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                  <div className="max-w-[85%] min-w-0">
                    {chatState.quickReplyType === 'price_request' && (
                      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-amber-600" />
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
              
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t-2 border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 flex-shrink-0">
              <div className="flex gap-2 w-full">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white shadow-md transition-all duration-200 flex-shrink-0"
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