import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/hooks/useLanguage";
import { LanguageSelector } from "./LanguageSelector";

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  metadata?: any;
}

interface ChatbotWidgetProps {
  language?: string;
}

export function ChatbotWidget({ language = "nl" }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

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
    onSuccess: () => {
      // Refresh messages
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversation", sessionId, "messages"] });
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const messageText = message.trim();
    setMessage("");

    try {
      await sendMessageMutation.mutateAsync(messageText);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      nl: "Hallo! Ik ben KANIOU's AI-assistent. Hoe kan ik u helpen met uw gordijnen en raambekleding?",
      en: "Hello! I'm KANIOU's AI assistant. How can I help you with your curtains and window treatments?",
      fr: "Bonjour! Je suis l'assistant IA de KANIOU. Comment puis-je vous aider avec vos rideaux et habillages de fenêtres?",
      de: "Hallo! Ich bin KANIOU's KI-Assistent. Wie kann ich Ihnen bei Ihren Vorhängen und Fensterbehandlungen helfen?",
      tr: "Merhaba! Ben KANIOU'nun AI asistanıyım. Perde ve pencere kaplamalarınızla nasıl yardımcı olabilirim?",
      ar: "مرحباً! أنا مساعد KANIOU الذكي. كيف يمكنني مساعدتك في الستائر وعلاجات النوافذ؟"
    };
    return welcomeMessages[language as keyof typeof welcomeMessages] || welcomeMessages.nl;
  };

  const getPlaceholderText = () => {
    const placeholders = {
      nl: "Typ uw vraag hier...",
      en: "Type your question here...",
      fr: "Tapez votre question ici...",
      de: "Geben Sie Ihre Frage hier ein...",
      tr: "Sorunuzu buraya yazın...",
      ar: "اكتب سؤالك هنا..."
    };
    return placeholders[language as keyof typeof placeholders] || placeholders.nl;
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
        <Card className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] shadow-2xl z-50 flex flex-col border-2 border-primary/20 animate-in slide-in-from-bottom-4 slide-in-from-right-4 duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <CardTitle className="text-sm font-semibold">KANIOU AI Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col flex-1 p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-lg text-sm text-blue-900 animate-in fade-in-50 duration-500">
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Welkom bij KANIOU!</span>
                  </div>
                  {getWelcomeMessage()}
                </div>
              </div>

              {/* Conversation Messages */}
              {messagesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Gesprek laden...</span>
                  </div>
                </div>
              ) : (
                (messages as ChatMessage[]).map((msg: ChatMessage) => (
                  <div
                    key={msg.id}
                    className={`mb-4 animate-in slide-in-from-bottom-2 duration-300 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg text-sm max-w-[85%] shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap break-words">{msg.content}</div>
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
                <div className="mb-3 text-left animate-in slide-in-from-bottom-2 duration-300">
                  <div className="inline-block bg-white border border-gray-200 p-3 rounded-lg rounded-bl-sm text-sm shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-gray-600">AI aan het typen...</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getPlaceholderText()}
                  disabled={sendMessageMutation.isPending || !conversationMutation.data}
                  className="flex-1 border-gray-300 focus:border-primary bg-white"
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
                  disabled={!message.trim() || sendMessageMutation.isPending || !conversationMutation.data}
                  className="bg-primary hover:bg-primary/90 transition-colors"
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