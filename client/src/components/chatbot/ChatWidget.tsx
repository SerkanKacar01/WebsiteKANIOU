import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
      return apiRequest("/api/chatbot/conversation", {
        method: "POST",
        body: { sessionId, language }
      });
    }
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (messageText: string) => {
      return apiRequest("/api/chatbot/message", {
        method: "POST",
        body: { 
          conversationId: sessionId, 
          message: messageText, 
          language 
        }
      });
    },
    onSuccess: () => {
      // Refresh messages
      queryClient.invalidateQueries({ queryKey: ["/api/chatbot/conversation", sessionId, "messages"] });
    }
  });

  // Get conversation messages
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/chatbot/conversation", sessionId, "messages"],
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
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-sm font-medium">KANIOU AI Assistant</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col flex-1 p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              {/* Welcome Message */}
              <div className="mb-4">
                <div className="bg-muted p-3 rounded-lg text-sm">
                  {getWelcomeMessage()}
                </div>
              </div>

              {/* Conversation Messages */}
              {messagesLoading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                messages.map((msg: ChatMessage) => (
                  <div
                    key={msg.id}
                    className={`mb-3 ${
                      msg.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg text-sm max-w-[85%] ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))
              )}

              {/* Loading indicator for AI response */}
              {sendMessageMutation.isPending && (
                <div className="mb-3 text-left">
                  <div className="inline-block bg-muted p-3 rounded-lg text-sm">
                    <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                    Aan het typen...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getPlaceholderText()}
                  disabled={sendMessageMutation.isPending || !conversationMutation.data}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!message.trim() || sendMessageMutation.isPending || !conversationMutation.data}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}