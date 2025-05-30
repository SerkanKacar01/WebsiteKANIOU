/**
 * Customer Support Chat Escalation System
 * Handles seamless transition from AI chatbot to human support
 */

import { sendEmail } from './emailService';

export interface EscalationRequest {
  sessionId: string;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  conversationHistory: ChatMessage[];
  escalationReason: 'complex_query' | 'pricing_request' | 'technical_issue' | 'complaint' | 'custom_solution' | 'user_request';
  urgency: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  userMessage: string;
  timestamp: string;
  userLocation?: string;
  preferredContact: 'email' | 'phone' | 'chat';
  businessHours: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    type?: string;
    confidence?: number;
    sources?: string[];
  };
}

export interface EscalationResponse {
  success: boolean;
  escalationId: string;
  estimatedWaitTime: string;
  supportAgentAvailable: boolean;
  nextSteps: string[];
  supportTicketNumber?: string;
  message: string;
}

/**
 * Intelligent escalation trigger detection
 */
export function shouldTriggerEscalation(
  userMessage: string, 
  conversationHistory: ChatMessage[],
  language: string = 'nl'
): { shouldEscalate: boolean; reason: string; confidence: number } {
  
  const escalationKeywords = {
    nl: {
      pricing: ['prijs', 'kosten', 'offerte', 'prijslijst', 'budget', 'korting'],
      complaint: ['klacht', 'probleem', 'ontevreden', 'slecht', 'fout', 'verkeerd'],
      complex: ['maatwerk', 'specifiek', 'complex', 'advies', 'montage', 'installatie'],
      urgent: ['dringend', 'urgent', 'spoed', 'vandaag', 'direct', 'nu'],
      human: ['mens', 'medewerker', 'verkoper', 'adviseur', 'specialist']
    },
    fr: {
      pricing: ['prix', 'coût', 'devis', 'tarif', 'budget', 'remise'],
      complaint: ['plainte', 'problème', 'mécontent', 'mauvais', 'erreur'],
      complex: ['sur mesure', 'spécifique', 'complexe', 'conseil', 'montage'],
      urgent: ['urgent', 'priorité', 'aujourd\'hui', 'direct', 'maintenant'],
      human: ['humain', 'employé', 'vendeur', 'conseiller', 'spécialiste']
    },
    en: {
      pricing: ['price', 'cost', 'quote', 'pricing', 'budget', 'discount'],
      complaint: ['complaint', 'problem', 'unsatisfied', 'bad', 'error', 'wrong'],
      complex: ['custom', 'specific', 'complex', 'advice', 'installation'],
      urgent: ['urgent', 'priority', 'today', 'direct', 'now', 'immediate'],
      human: ['human', 'employee', 'salesperson', 'advisor', 'specialist']
    }
  };

  const keywords = escalationKeywords[language as keyof typeof escalationKeywords] || escalationKeywords.nl;
  const message = userMessage.toLowerCase();
  
  // Check for direct human request
  if (keywords.human.some(keyword => message.includes(keyword))) {
    return { shouldEscalate: true, reason: 'user_request', confidence: 0.95 };
  }

  // Check for pricing inquiries
  if (keywords.pricing.some(keyword => message.includes(keyword))) {
    return { shouldEscalate: true, reason: 'pricing_request', confidence: 0.85 };
  }

  // Check for complaints
  if (keywords.complaint.some(keyword => message.includes(keyword))) {
    return { shouldEscalate: true, reason: 'complaint', confidence: 0.90 };
  }

  // Check for complex queries
  if (keywords.complex.some(keyword => message.includes(keyword))) {
    return { shouldEscalate: true, reason: 'complex_query', confidence: 0.75 };
  }

  // Check for urgency
  if (keywords.urgent.some(keyword => message.includes(keyword))) {
    return { shouldEscalate: true, reason: 'technical_issue', confidence: 0.80 };
  }

  // Check conversation length - escalate after many exchanges
  if (conversationHistory.length > 10) {
    return { shouldEscalate: true, reason: 'complex_query', confidence: 0.70 };
  }

  return { shouldEscalate: false, reason: '', confidence: 0 };
}

/**
 * Process escalation request and create support ticket
 */
export async function processEscalation(request: EscalationRequest): Promise<EscalationResponse> {
  try {
    // Generate unique escalation ID
    const escalationId = `ESC_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const supportTicketNumber = `KANIOU-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

    // Determine urgency level
    const urgency = determineUrgency(request);
    
    // Check if support agent is available (business hours logic)
    const supportAgentAvailable = request.businessHours;
    
    // Calculate estimated wait time
    const estimatedWaitTime = calculateWaitTime(urgency, supportAgentAvailable);

    // Send escalation notification to support team
    await notifySupportTeam(request, escalationId, supportTicketNumber);
    
    // Send confirmation to customer
    if (request.userEmail) {
      await sendCustomerConfirmation(request, escalationId, supportTicketNumber, estimatedWaitTime);
    }

    // Log escalation for analytics
    logEscalation(request, escalationId);

    const response: EscalationResponse = {
      success: true,
      escalationId,
      estimatedWaitTime,
      supportAgentAvailable,
      supportTicketNumber,
      nextSteps: generateNextSteps(request, supportAgentAvailable),
      message: generateResponseMessage(request, estimatedWaitTime, supportTicketNumber)
    };

    return response;

  } catch (error) {
    console.error('Escalation processing error:', error);
    return {
      success: false,
      escalationId: '',
      estimatedWaitTime: '',
      supportAgentAvailable: false,
      nextSteps: ['Probeer later opnieuw of neem direct contact met ons op'],
      message: 'Er is een fout opgetreden bij het doorverbinden. Probeer het later opnieuw of neem direct contact met ons op.'
    };
  }
}

/**
 * Determine urgency level based on request
 */
function determineUrgency(request: EscalationRequest): 'low' | 'medium' | 'high' | 'urgent' {
  if (request.escalationReason === 'complaint') return 'high';
  if (request.escalationReason === 'pricing_request') return 'medium';
  if (request.escalationReason === 'technical_issue') return 'high';
  if (request.urgency === 'urgent') return 'urgent';
  
  return request.urgency;
}

/**
 * Calculate estimated wait time
 */
function calculateWaitTime(urgency: string, agentAvailable: boolean): string {
  if (!agentAvailable) {
    return 'binnen 24 uur (buiten kantooruren)';
  }

  switch (urgency) {
    case 'urgent': return 'binnen 5 minuten';
    case 'high': return 'binnen 15 minuten';
    case 'medium': return 'binnen 30 minuten';
    default: return 'binnen 1 uur';
  }
}

/**
 * Notify support team about escalation
 */
async function notifySupportTeam(
  request: EscalationRequest, 
  escalationId: string, 
  ticketNumber: string
): Promise<void> {
  const supportEmail = {
    to: 'support@kaniou.be',
    subject: `🚨 Chat Escalation - ${ticketNumber} - ${request.escalationReason}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
          Chat Escalation Request
        </h2>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Escalation Details</h3>
          <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
          <p><strong>Escalation ID:</strong> ${escalationId}</p>
          <p><strong>Reason:</strong> ${request.escalationReason}</p>
          <p><strong>Urgency:</strong> ${request.urgency}</p>
          <p><strong>Category:</strong> ${request.category}</p>
          <p><strong>Timestamp:</strong> ${new Date(request.timestamp).toLocaleString('nl-BE')}</p>
        </div>

        <div style="background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Customer Information</h3>
          <p><strong>Name:</strong> ${request.userName || 'Niet opgegeven'}</p>
          <p><strong>Email:</strong> ${request.userEmail || 'Niet opgegeven'}</p>
          <p><strong>Phone:</strong> ${request.userPhone || 'Niet opgegeven'}</p>
          <p><strong>Location:</strong> ${request.userLocation || 'Niet opgegeven'}</p>
          <p><strong>Preferred Contact:</strong> ${request.preferredContact}</p>
        </div>

        <div style="background: #fff3e0; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Current User Message</h3>
          <p style="font-style: italic; padding: 10px; background: white; border-left: 4px solid #ff9800;">
            "${request.userMessage}"
          </p>
        </div>

        <div style="background: #f3e5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Conversation History</h3>
          <div style="max-height: 300px; overflow-y: auto;">
            ${request.conversationHistory.slice(-6).map(msg => `
              <div style="margin: 10px 0; padding: 8px; background: ${msg.role === 'user' ? '#e8f5e8' : '#f0f0f0'}; border-radius: 4px;">
                <strong>${msg.role === 'user' ? 'Klant' : 'AI Assistant'}:</strong>
                <p style="margin: 5px 0 0 0;">${msg.content}</p>
                <small style="color: #666;">${new Date(msg.timestamp).toLocaleTimeString('nl-BE')}</small>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="background: #ffebee; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #333;">Action Required</h3>
          <p>Een klant heeft ondersteuning nodig die buiten de mogelijkheden van de AI chatbot valt.</p>
          <p><strong>Geschatte responstijd:</strong> ${calculateWaitTime(request.urgency, request.businessHours)}</p>
          <p><strong>Prioriteit:</strong> ${request.urgency.toUpperCase()}</p>
        </div>

        <div style="text-align: center; margin: 20px 0;">
          <a href="mailto:${request.userEmail}" style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Beantwoord Klant Direct
          </a>
        </div>
      </div>
    `
  };

  await sendEmail(supportEmail);
}

/**
 * Send confirmation email to customer
 */
async function sendCustomerConfirmation(
  request: EscalationRequest,
  escalationId: string,
  ticketNumber: string,
  estimatedWaitTime: string
): Promise<void> {
  const customerEmail = {
    to: request.userEmail!,
    subject: `KANIOU Support - Uw aanvraag is ontvangen (${ticketNumber})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">KANIOU Support</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Uw aanvraag is doorgestuurd naar ons team</p>
        </div>

        <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #333; margin: 0 0 15px 0;">Hallo ${request.userName || 'Gewaardeerde klant'},</h2>
            <p style="color: #666; margin: 0; line-height: 1.6;">
              Bedankt voor uw bericht. Onze AI-assistent heeft uw aanvraag doorgestuurd naar onze specialisten 
              omdat u persoonlijke ondersteuning nodig heeft.
            </p>
          </div>

          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #1976d2; margin: 0 0 15px 0;">📋 Uw Support Details</h3>
            <p><strong>Ticketnummer:</strong> ${ticketNumber}</p>
            <p><strong>Geschatte responstijd:</strong> ${estimatedWaitTime}</p>
            <p><strong>Status:</strong> In behandeling</p>
            <p style="margin: 0;"><strong>Uw bericht:</strong> "${request.userMessage}"</p>
          </div>

          <div style="background: #f3e5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #7b1fa2; margin: 0 0 15px 0;">⏰ Wat gebeurt er nu?</h3>
            <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
              <li>Een van onze specialisten bekijkt uw aanvraag</li>
              <li>U ontvangt ${request.businessHours ? 'spoedig' : 'binnen 24 uur'} een persoonlijk antwoord</li>
              <li>Bij dringende zaken kunt u ons bellen: <strong>+32 3 123 45 67</strong></li>
            </ul>
          </div>

          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #388e3c; margin: 0 0 15px 0;">💡 Ondertussen kunt u ook:</h3>
            <ul style="color: #666; line-height: 1.8; padding-left: 20px;">
              <li><a href="https://kaniou.be/gallery" style="color: #4CAF50; text-decoration: none;">Onze inspiratiegalerij bekijken</a></li>
              <li><a href="https://kaniou.be/kleur-matcher" style="color: #4CAF50; text-decoration: none;">De kleur matcher gebruiken</a></li>
              <li><a href="https://kaniou.be/recommendations" style="color: #4CAF50; text-decoration: none;">Persoonlijke aanbevelingen bekijken</a></li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <p style="color: #666; margin: 0 0 20px 0;">Heeft u nog vragen over uw aanvraag?</p>
            <a href="mailto:support@kaniou.be?subject=Re: ${ticketNumber}" style="background: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
              Antwoord op deze email
            </a>
          </div>
        </div>

        <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; font-size: 14px;">
          <p style="margin: 0;">KANIOU - Uw specialist in maatwerk raamdecoratie</p>
          <p style="margin: 5px 0 0 0;">+32 3 123 45 67 | support@kaniou.be | www.kaniou.be</p>
        </div>
      </div>
    `
  };

  await emailService.sendEmail(customerEmail);
}

/**
 * Generate next steps for customer
 */
function generateNextSteps(request: EscalationRequest, agentAvailable: boolean): string[] {
  const steps = [];
  
  if (agentAvailable) {
    steps.push('Een specialist bekijkt nu uw aanvraag');
    steps.push('U krijgt spoedig een persoonlijk antwoord');
  } else {
    steps.push('Uw aanvraag is geregistreerd onder ticketnummer');
    steps.push('Een specialist neemt binnen 24 uur contact met u op');
  }
  
  if (request.userEmail) {
    steps.push('U ontvangt een bevestigingsmail met alle details');
  }
  
  steps.push('Bij spoedeisende zaken kunt u bellen: +32 3 123 45 67');
  
  return steps;
}

/**
 * Generate response message
 */
function generateResponseMessage(
  request: EscalationRequest, 
  estimatedWaitTime: string, 
  ticketNumber: string
): string {
  return `Ik heb uw aanvraag doorgestuurd naar onze specialisten. 

📋 **Ticketnummer:** ${ticketNumber}
⏰ **Responstijd:** ${estimatedWaitTime}
📧 **Bevestiging:** ${request.userEmail ? 'Verzonden naar uw email' : 'Geen email opgegeven'}

Onze experts hebben ervaring met precies dit soort vragen en kunnen u veel beter helpen dan ik. ${request.businessHours ? 'Er is momenteel iemand beschikbaar die spoedig contact met u opneemt.' : 'Aangezien het buiten kantooruren is, neemt iemand morgenvroeg contact met u op.'}

**Wat kunt u ondertussen doen?**
• Bekijk onze [inspiratiegalerij](https://kaniou.be/gallery)
• Gebruik de [kleur matcher](https://kaniou.be/kleur-matcher) 
• Ontdek [persoonlijke aanbevelingen](https://kaniou.be/recommendations)

Bij spoedzaken: **+32 3 123 45 67**`;
}

/**
 * Log escalation for analytics
 */
function logEscalation(request: EscalationRequest, escalationId: string): void {
  const escalationLog = {
    escalationId,
    timestamp: request.timestamp,
    reason: request.escalationReason,
    urgency: request.urgency,
    category: request.category,
    userId: request.userId,
    sessionId: request.sessionId,
    conversationLength: request.conversationHistory.length,
    businessHours: request.businessHours,
    hasEmail: !!request.userEmail,
    hasPhone: !!request.userPhone
  };

  // Store in local storage for analytics (in production, this would go to a database)
  const existingLogs = JSON.parse(localStorage.getItem('kaniou_escalation_logs') || '[]');
  existingLogs.push(escalationLog);
  localStorage.setItem('kaniou_escalation_logs', JSON.stringify(existingLogs));
  
  console.log('Escalation logged:', escalationLog);
}

/**
 * Get escalation analytics
 */
export function getEscalationAnalytics(): {
  totalEscalations: number;
  escalationsByReason: Record<string, number>;
  escalationsByUrgency: Record<string, number>;
  averageConversationLength: number;
  businessHoursRate: number;
} {
  const logs = JSON.parse(localStorage.getItem('kaniou_escalation_logs') || '[]');
  
  const analytics = {
    totalEscalations: logs.length,
    escalationsByReason: {} as Record<string, number>,
    escalationsByUrgency: {} as Record<string, number>,
    averageConversationLength: 0,
    businessHoursRate: 0
  };
  
  if (logs.length === 0) return analytics;
  
  logs.forEach((log: any) => {
    analytics.escalationsByReason[log.reason] = (analytics.escalationsByReason[log.reason] || 0) + 1;
    analytics.escalationsByUrgency[log.urgency] = (analytics.escalationsByUrgency[log.urgency] || 0) + 1;
  });
  
  analytics.averageConversationLength = logs.reduce((sum: number, log: any) => sum + log.conversationLength, 0) / logs.length;
  analytics.businessHoursRate = logs.filter((log: any) => log.businessHours).length / logs.length;
  
  return analytics;
}