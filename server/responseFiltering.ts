/**
 * Response Filtering and Optimization System
 * Ensures chatbot provides concise, relevant, and well-structured answers
 */

export interface FilteredResponse {
  content: string;
  confidence: number;
  isRelevant: boolean;
  wordCount: number;
  hasTestimonials: boolean;
}

export interface QuestionAnalysis {
  type: 'product' | 'pricing' | 'service' | 'installation' | 'company' | 'testimonials' | 'general';
  keywords: string[];
  intent: string;
  specificProduct?: string;
  needsTestimonials: boolean;
  expectsShortAnswer: boolean;
}

/**
 * Analyze user question to determine response strategy
 */
export function analyzeUserQuestion(question: string, language: string): QuestionAnalysis {
  const lowerQuestion = question.toLowerCase();
  
  // Question type detection
  let type: QuestionAnalysis['type'] = 'general';
  let needsTestimonials = false;
  let expectsShortAnswer = true;
  
  // Product-specific questions
  if (/\b(rolgordijn|jaloezie|plisse|overgordijn|screen|dakraam|curtain|blind|shade)\b/i.test(question)) {
    type = 'product';
  }
  // Pricing questions
  else if (/\b(prijs|kost|euro|price|cost|tarief|budget)\b/i.test(question)) {
    type = 'pricing';
  }
  // Installation/service questions
  else if (/\b(montage|installatie|install|ophangen|mount|service)\b/i.test(question)) {
    type = 'installation';
    expectsShortAnswer = true;
  }
  // Company information
  else if (/\b(kaniou|bedrijf|company|over|about|waar|where|contact)\b/i.test(question)) {
    type = 'company';
  }
  // Testimonials/reviews
  else if (/\b(review|ervaring|testimonial|klant|customer|mening|opinion)\b/i.test(question)) {
    type = 'testimonials';
    needsTestimonials = true;
    expectsShortAnswer = false;
  }
  // Service questions
  else if (/\b(garantie|warranty|onderhoud|maintenance|levering|delivery)\b/i.test(question)) {
    type = 'service';
  }

  // Extract keywords
  const keywords = question
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 5);

  // Detect specific product mentions
  const productPatterns = {
    rolgordijn: /\b(rolgordijn|roller.*blind)\b/i,
    jaloezie: /\b(jaloezie|venetian.*blind|houten.*jaloezie)\b/i,
    plisse: /\b(plisse|pleat.*blind|vouwgordijn)\b/i,
    overgordijn: /\b(overgordijn|curtain|gordijn)\b/i,
    screen: /\b(screen|zonwering)\b/i,
    dakraam: /\b(dakraam|velux|skylight)\b/i
  };

  let specificProduct: string | undefined;
  for (const [product, pattern] of Object.entries(productPatterns)) {
    if (pattern.test(question)) {
      specificProduct = product;
      break;
    }
  }

  return {
    type,
    keywords,
    intent: determineIntent(question),
    specificProduct,
    needsTestimonials,
    expectsShortAnswer
  };
}

/**
 * Determine user intent from question
 */
function determineIntent(question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  if (/^(wat|hoe|how|what)/.test(lowerQuestion)) return 'informational';
  if (/^(kan|kunt|could|can)/.test(lowerQuestion)) return 'capability';
  if (/^(waar|where)/.test(lowerQuestion)) return 'location';
  if (/^(wanneer|when)/.test(lowerQuestion)) return 'timing';
  if (/\?/.test(question)) return 'question';
  
  return 'general';
}

/**
 * Filter and optimize comprehensive knowledge for relevance
 */
export function filterRelevantContent(
  comprehensiveKnowledge: string,
  analysis: QuestionAnalysis,
  language: string
): string {
  const knowledgeLines = comprehensiveKnowledge.split('\n');
  const relevantLines: Array<{line: string, score: number, category: string}> = [];
  
  // Score each line based on relevance
  knowledgeLines.forEach(line => {
    if (line.trim().length < 10) return;
    
    const lineLower = line.toLowerCase();
    let score = 0;
    let category = 'general';
    
    // Keyword matching
    analysis.keywords.forEach(keyword => {
      if (lineLower.includes(keyword)) {
        score += keyword.length > 4 ? 3 : 2;
      }
    });
    
    // Category-specific scoring
    if (analysis.type === 'product' && analysis.specificProduct) {
      if (lineLower.includes(analysis.specificProduct)) {
        score += 5;
        category = 'product';
      }
    }
    
    if (analysis.type === 'pricing' && /\b(€|euro|prijs|price|cost)\b/.test(lineLower)) {
      score += 4;
      category = 'pricing';
    }
    
    if (analysis.type === 'installation' && /\b(montage|install|service)\b/.test(lineLower)) {
      score += 4;
      category = 'installation';
    }
    
    if (analysis.type === 'company' && /\b(kaniou|bedrijf|company)\b/.test(lineLower)) {
      score += 4;
      category = 'company';
    }
    
    // Filter out testimonials unless specifically requested
    if (!analysis.needsTestimonials && /\b(testimonial|review|klant|customer|\"|'')\b/.test(lineLower)) {
      score = 0; // Exclude testimonials
    }
    
    if (score > 0) {
      relevantLines.push({ line: line.trim(), score, category });
    }
  });
  
  // Sort by relevance and limit results
  const maxLines = analysis.expectsShortAnswer ? 3 : 6;
  const topRelevant = relevantLines
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLines)
    .map(item => item.line);
  
  return topRelevant.join('\n');
}

/**
 * Generate optimized response from filtered content
 */
export function generateOptimizedResponse(
  question: string,
  filteredContent: string,
  analysis: QuestionAnalysis,
  language: string
): FilteredResponse {
  let response = '';
  let confidence = 0.8;
  
  // Generate response based on question type
  switch (analysis.type) {
    case 'installation':
      response = generateInstallationResponse(filteredContent, language);
      confidence = 0.9;
      break;
    case 'pricing':
      response = generatePricingResponse(filteredContent, language);
      confidence = 0.9;
      break;
    case 'product':
      response = generateProductResponse(filteredContent, analysis.specificProduct, language);
      confidence = 0.85;
      break;
    case 'service':
      response = generateServiceResponse(filteredContent, language);
      confidence = 0.85;
      break;
    case 'company':
      response = generateCompanyResponse(filteredContent, language);
      confidence = 0.8;
      break;
    case 'testimonials':
      response = generateTestimonialsResponse(filteredContent, language);
      confidence = 0.75;
      break;
    default:
      response = generateGeneralResponse(filteredContent, language);
      confidence = 0.7;
  }
  
  // Add follow-up question if response is getting long
  const wordCount = response.split(/\s+/).length;
  if (wordCount > 50 && analysis.expectsShortAnswer) {
    const followUpTexts = {
      nl: "\n\nWilt u meer details weten?",
      en: "\n\nWould you like more details?",
      fr: "\n\nSouhaitez-vous plus de détails ?",
      tr: "\n\nDaha fazla ayrıntı ister misiniz?"
    };
    
    response += followUpTexts[language as keyof typeof followUpTexts] || followUpTexts.nl;
  }
  
  return {
    content: response,
    confidence,
    isRelevant: filteredContent.length > 0,
    wordCount,
    hasTestimonials: /\b(testimonial|review|klant|customer)\b/i.test(response)
  };
}

/**
 * Generate installation-specific response
 */
function generateInstallationResponse(content: string, language: string): string {
  const responses = {
    nl: "Ja, KANIOU biedt een professionele montageservice aan huis. Onze specialist installeert uw raambekleding veilig en correct. Dit is beschikbaar in heel België. Wilt u een afspraak inplannen?",
    en: "Yes, KANIOU offers a professional installation service at home. Our specialist will install your window treatments safely and correctly. This is available throughout Belgium. Would you like to schedule an appointment?",
    fr: "Oui, KANIOU offre un service d'installation professionnel à domicile. Notre spécialiste installera vos habillages de fenêtres de manière sûre et correcte. Disponible dans toute la Belgique. Souhaitez-vous prendre rendez-vous ?",
    tr: "Evet, KANIOU evde profesyonel kurulum hizmeti sunmaktadır. Uzmanımız pencere kaplamalarınızı güvenli ve doğru şekilde kuracaktır. Bu hizmet Belçika genelinde mevcuttur. Randevu almak ister misiniz?"
  };
  
  // If we have specific content about installation, use it
  if (content && content.length > 20) {
    const baseResponse = responses[language as keyof typeof responses] || responses.nl;
    return `${baseResponse}\n\n${content}`;
  }
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Generate pricing-specific response
 */
function generatePricingResponse(content: string, language: string): string {
  if (content && content.length > 20) {
    const introTexts = {
      nl: "Op basis van onze prijsinformatie:\n\n",
      en: "Based on our pricing information:\n\n",
      fr: "D'après nos informations tarifaires:\n\n",
      tr: "Fiyat bilgilerimize göre:\n\n"
    };
    
    const outroTexts = {
      nl: "\n\nVoor een exacte offerte plannen we graag een gratis thuismeting in.",
      en: "\n\nFor an exact quote, we'd like to schedule a free home measurement.",
      fr: "\n\nPour un devis exact, nous aimerions planifier une prise de mesures gratuite à domicile.",
      tr: "\n\nKesin bir teklif için ücretsiz ev ölçümü planlamak istiyoruz."
    };
    
    const intro = introTexts[language as keyof typeof introTexts] || introTexts.nl;
    const outro = outroTexts[language as keyof typeof outroTexts] || outroTexts.nl;
    
    return intro + content + outro;
  }
  
  const fallbackTexts = {
    nl: "Voor prijsinformatie plannen we graag een gratis thuismeting in. Zo kunnen we u een exact advies en offerte geven op maat.",
    en: "For pricing information, we'd like to schedule a free home measurement. This way we can provide exact advice and a custom quote.",
    fr: "Pour les informations tarifaires, nous aimerions planifier une prise de mesures gratuite. Ainsi nous pouvons fournir des conseils exacts et un devis personnalisé.",
    tr: "Fiyat bilgileri için ücretsiz ev ölçümü planlamak istiyoruz. Bu şekilde tam tavsiye ve özel teklif sağlayabiliriz."
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}

/**
 * Generate product-specific response
 */
function generateProductResponse(content: string, specificProduct: string | undefined, language: string): string {
  if (content && content.length > 20) {
    const introTexts = {
      nl: specificProduct ? `Informatie over ${specificProduct}:\n\n` : "Productinformatie:\n\n",
      en: specificProduct ? `Information about ${specificProduct}:\n\n` : "Product information:\n\n",
      fr: specificProduct ? `Informations sur ${specificProduct}:\n\n` : "Informations produit:\n\n",
      tr: specificProduct ? `${specificProduct} hakkında bilgi:\n\n` : "Ürün bilgileri:\n\n"
    };
    
    const intro = introTexts[language as keyof typeof introTexts] || introTexts.nl;
    return intro + content;
  }
  
  const fallbackTexts = {
    nl: "Voor gedetailleerde productinformatie help ik u graag verder. Kunt u specificeren welk product u interesseert?",
    en: "I'd be happy to help with detailed product information. Could you specify which product interests you?",
    fr: "Je serais ravi de vous aider avec des informations détaillées sur les produits. Pourriez-vous préciser quel produit vous intéresse ?",
    tr: "Detaylı ürün bilgileri konusunda size yardımcı olmaktan memnuniyet duyarım. Hangi ürünle ilgilendiğinizi belirtebilir misiniz?"
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}

/**
 * Generate service-specific response
 */
function generateServiceResponse(content: string, language: string): string {
  if (content && content.length > 20) {
    const introTexts = {
      nl: "Onze service:\n\n",
      en: "Our service:\n\n",
      fr: "Notre service:\n\n",
      tr: "Hizmetimiz:\n\n"
    };
    
    const intro = introTexts[language as keyof typeof introTexts] || introTexts.nl;
    return intro + content;
  }
  
  const fallbackTexts = {
    nl: "KANIOU biedt uitgebreide service including gratis thuismeting, professionele montage, garantie en nazorg. Waarmee kan ik u helpen?",
    en: "KANIOU offers comprehensive service including free home measurement, professional installation, warranty and aftercare. How can I help you?",
    fr: "KANIOU offre un service complet incluant prise de mesures gratuite, installation professionnelle, garantie et suivi. Comment puis-je vous aider ?",
    tr: "KANIOU ücretsiz ev ölçümü, profesyonel kurulum, garanti ve satış sonrası hizmet dahil kapsamlı hizmet sunmaktadır. Size nasıl yardımcı olabilirim?"
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}

/**
 * Generate company-specific response
 */
function generateCompanyResponse(content: string, language: string): string {
  if (content && content.length > 20) {
    return content;
  }
  
  const fallbackTexts = {
    nl: "KANIOU is uw specialist voor premium raambekleding in België. We bieden maatwerk, kwaliteit en persoonlijke service. Openingstijden: Ma-Za 10:00-18:00.",
    en: "KANIOU is your specialist for premium window treatments in Belgium. We offer custom solutions, quality and personal service. Opening hours: Mon-Sat 10:00-18:00.",
    fr: "KANIOU est votre spécialiste en habillage de fenêtres premium en Belgique. Nous offrons du sur-mesure, de la qualité et un service personnel. Horaires: Lun-Sam 10:00-18:00.",
    tr: "KANIOU, Belçika'da premium pencere kaplamaları konusunda uzmanınızdır. Özel çözümler, kalite ve kişisel hizmet sunuyoruz. Açılış saatleri: Pzt-Cmt 10:00-18:00."
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}

/**
 * Generate testimonials response
 */
function generateTestimonialsResponse(content: string, language: string): string {
  if (content && content.length > 20) {
    const introTexts = {
      nl: "Wat onze klanten zeggen:\n\n",
      en: "What our customers say:\n\n",
      fr: "Ce que disent nos clients:\n\n",
      tr: "Müşterilerimiz ne diyor:\n\n"
    };
    
    const intro = introTexts[language as keyof typeof introTexts] || introTexts.nl;
    return intro + content;
  }
  
  const fallbackTexts = {
    nl: "Onze klanten waarderen onze kwaliteit, service en vakmanschap. Voor specifieke testimonials kan ik u meer vertellen over klantervaringen.",
    en: "Our customers appreciate our quality, service and craftsmanship. For specific testimonials, I can tell you more about customer experiences.",
    fr: "Nos clients apprécient notre qualité, service et savoir-faire. Pour des témoignages spécifiques, je peux vous en dire plus sur les expériences clients.",
    tr: "Müşterilerimiz kalitemizi, hizmetimizi ve işçiliğimizi takdir ediyor. Belirli referanslar için müşteri deneyimleri hakkında daha fazla bilgi verebilirim."
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}

/**
 * Generate general response
 */
function generateGeneralResponse(content: string, language: string): string {
  if (content && content.length > 20) {
    return content;
  }
  
  const fallbackTexts = {
    nl: "Ik help u graag met informatie over KANIOU raambekleding. U kunt mij vragen over producten, prijzen, montage of service. Wat zou u willen weten?",
    en: "I'd be happy to help with information about KANIOU window treatments. You can ask me about products, prices, installation or service. What would you like to know?",
    fr: "Je serais ravi de vous aider avec des informations sur les habillages de fenêtres KANIOU. Vous pouvez me poser des questions sur les produits, prix, installation ou service. Que souhaitez-vous savoir ?",
    tr: "KANIOU pencere kaplamaları hakkında bilgi konusunda size yardımcı olmaktan memnuniyet duyarım. Bana ürünler, fiyatlar, kurulum veya hizmet hakkında sorular sorabilirsiniz. Ne öğrenmek istersiniz?"
  };
  
  return fallbackTexts[language as keyof typeof fallbackTexts] || fallbackTexts.nl;
}