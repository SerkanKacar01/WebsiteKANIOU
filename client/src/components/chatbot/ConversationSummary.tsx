/**
 * Conversation Summary Component
 * Displays intelligent conversation summaries with email option
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle, Mail, Clock, MessageSquare } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/hooks/useLanguage";
import type { ConversationSummary } from "@/utils/conversationSummary";

interface ConversationSummaryProps {
  summary: ConversationSummary;
  onClose: () => void;
}

export function ConversationSummaryComponent({ summary, onClose }: ConversationSummaryProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { language } = useLanguage();

  const sendEmailMutation = useMutation({
    mutationFn: async (emailAddress: string) => {
      const response = await fetch("/api/chatbot/summary/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailAddress,
          summary: summary.summary,
          language: summary.language
        })
      });
      return response.json();
    },
    onSuccess: () => {
      setEmailSent(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && !sendEmailMutation.isPending) {
      sendEmailMutation.mutate(email.trim());
    }
  };

  const getLocalizedText = () => {
    const texts = {
      nl: {
        title: "Gesprek Samenvatting",
        duration: "Duur",
        messages: "Berichten",
        emailPrompt: "Wilt u deze samenvatting per e-mail ontvangen?",
        emailPlaceholder: "Uw e-mailadres",
        sendEmail: "Versturen",
        emailSent: "E-mail verstuurd!",
        close: "Sluiten",
        yes: "Ja",
        no: "Nee"
      },
      fr: {
        title: "Résumé de Conversation",
        duration: "Durée",
        messages: "Messages",
        emailPrompt: "Souhaitez-vous recevoir ce résumé par e-mail?",
        emailPlaceholder: "Votre adresse e-mail",
        sendEmail: "Envoyer",
        emailSent: "E-mail envoyé!",
        close: "Fermer",
        yes: "Oui",
        no: "Non"
      },
      en: {
        title: "Conversation Summary",
        duration: "Duration",
        messages: "Messages",
        emailPrompt: "Would you like to receive this summary via email?",
        emailPlaceholder: "Your email address",
        sendEmail: "Send",
        emailSent: "Email sent!",
        close: "Close",
        yes: "Yes",
        no: "No"
      },
      tr: {
        title: "Konuşma Özeti",
        duration: "Süre",
        messages: "Mesajlar",
        emailPrompt: "Bu özeti e-posta ile almak ister misiniz?",
        emailPlaceholder: "E-posta adresiniz",
        sendEmail: "Gönder",
        emailSent: "E-posta gönderildi!",
        close: "Kapat",
        yes: "Evet",
        no: "Hayır"
      }
    };

    return texts[language as keyof typeof texts] || texts.nl;
  };

  const text = getLocalizedText();

  if (emailSent) {
    return (
      <Card className="p-4 m-3 bg-green-50 border-green-200">
        <div className="flex items-center justify-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">{text.emailSent}</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 m-3 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2 text-amber-900">
          <MessageSquare className="h-5 w-5" />
          <h3 className="font-semibold">{text.title}</h3>
        </div>

        {/* Summary Stats */}
        <div className="flex gap-4 text-sm text-amber-700">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{text.duration}: {summary.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{text.messages}: {summary.totalMessages}</span>
          </div>
        </div>

        {/* Summary Content */}
        <div className="bg-white p-3 rounded-lg border border-amber-200">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
            {summary.summary}
          </pre>
        </div>

        {/* Email Option */}
        {!showEmailForm ? (
          <div className="space-y-3">
            <p className="text-sm text-amber-800">{text.emailPrompt}</p>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowEmailForm(true)}
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Mail className="h-4 w-4 mr-1" />
                {text.yes}
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                {text.no}
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={text.emailPlaceholder}
              required
              className="border-amber-300 focus:border-amber-500"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                size="sm"
                disabled={sendEmailMutation.isPending}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Mail className="h-4 w-4 mr-1" />
                {sendEmailMutation.isPending ? 'Sending...' : text.sendEmail}
              </Button>
              <Button
                type="button"
                onClick={() => setShowEmailForm(false)}
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                {text.close}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
}