import OpenAI from "openai";
import type { ChatbotConversation, ChatbotMessage, ChatbotKnowledge, Product, Category } from "@shared/schema";
import { DUTCH_PRODUCT_KNOWLEDGE, getProductKnowledge, compareProducts, searchProducts } from "./productKnowledge";
import { buildConversationContext, findLearnedResponse, logLearnedResponseUsage, storeConversationContext } from "./conversationMemory";
import { findRelevantKnowledge, analyzeQuestionIntent, generateKnowledgeResponse } from "./knowledgeRetrieval";
import { detectUserLanguage, getMultilingualKnowledge, getPricingKeywords, getProductKeywords } from "./languageDetection";
import { getSystemMessage, SYSTEM_MESSAGES, getProductInfo } from "./multilingualResponses";
import { extractProductTypes as extractProductNames, generateProductPricingResponse, getProductPricingInfo } from "./productPricing";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ChatbotContext {
  conversation: ChatbotConversation;
  messages: ChatbotMessage[];
  products: Product[];
  categories: Category[];
  knowledgeBase: ChatbotKnowledge[];
  language: string;
  detectedLanguage?: string;
}

export interface ChatbotResponse {
  content: string;
  requiresPricing: boolean;
  detectedProductTypes: string[];
  metadata: {
    tokensUsed: number;
    responseTime: number;
    confidence: number;
  };
}

/**
 * Generate AI response for chatbot using OpenAI GPT-4o with STRICT language enforcement
 * The chatbot MUST respond in the user's selected language only, never auto-detect or override
 */
export async function generateChatbotResponse(
  userMessage: string,
  context: ChatbotContext
): Promise<ChatbotResponse> {
  const startTime = Date.now();

  try {
    // ENFORCE SELECTED LANGUAGE: Use only the language chosen by user via flag dropdown
    // Never auto-detect or override the user's language selection
    const responseLanguage = context.language;
    
    console.log(`🌐 LANGUAGE ENFORCEMENT: Responding strictly in selected language: ${responseLanguage}`);
    console.log(`📝 USER MESSAGE: "${userMessage}" - RESPONSE LANGUAGE: ${responseLanguage}`);
    
    // Update context with enforced language
    const enhancedContext = { ...context, detectedLanguage: responseLanguage };

    // Step 2: Check for learned responses from previous admin training
    const conversationContext = await buildConversationContext(context.conversation.sessionId);
    const learnedResponse = await findLearnedResponse(userMessage, conversationContext, responseLanguage);
    
    if (learnedResponse && learnedResponse.confidence > 0.8) {
      console.log(`🧠 MEMORY MATCH: Using learned response (confidence: ${Math.round(learnedResponse.confidence * 100)}%)`);
      
      // Log usage of learned response
      await logLearnedResponseUsage(0, context.conversation.sessionId, userMessage);
      
      // Detect if this is still a pricing request for metadata
      const requiresPricing = detectPricingRequest(userMessage, responseLanguage);
      const extractedProducts = extractProductNames(userMessage);
      
      return {
        content: learnedResponse.response,
        requiresPricing,
        detectedProductTypes: extractedProducts,
        metadata: {
          tokensUsed: 0,
          responseTime: Date.now() - startTime,
          confidence: learnedResponse.confidence
        }
      };
    }

    // Step 3: Build multilingual context-aware system prompt
    const systemPrompt = buildMultilingualSystemPrompt(enhancedContext, responseLanguage);
    
    // Build conversation history
    const conversationHistory = context.messages.slice(-10).map(msg => ({
      role: msg.role as "user" | "assistant",
      content: msg.content
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const responseContent = response.choices[0].message.content;
    const parsedResponse = JSON.parse(responseContent || "{}");

    const endTime = Date.now();

    return {
      content: parsedResponse.message || getFallbackResponse(userMessage, responseLanguage),
      requiresPricing: parsedResponse.requiresPricing || false,
      detectedProductTypes: parsedResponse.detectedProductTypes || [],
      metadata: {
        tokensUsed: response.usage?.total_tokens || 0,
        responseTime: endTime - startTime,
        confidence: parsedResponse.confidence || 0.8
      }
    };

  } catch (error) {
    console.error("OpenAI API Error:", error);
    
    return {
      content: getFallbackResponse(userMessage, context.language),
      requiresPricing: false,
      detectedProductTypes: [],
      metadata: {
        tokensUsed: 0,
        responseTime: Date.now() - startTime,
        confidence: 0.1
      }
    };
  }
}

/**
 * Build comprehensive multilingual system prompt for the chatbot
 */
function buildMultilingualSystemPrompt(context: ChatbotContext, responseLanguage: string): string {
  const { products, categories, knowledgeBase } = context;

  const languageInstructions = getAdvancedLanguageInstructions(responseLanguage);
  const productInfo = buildMultilingualProductKnowledge(products, categories, responseLanguage);
  const knowledgeInfo = buildKnowledgeBase(knowledgeBase, responseLanguage);
  const pricingInstructions = getMultilingualPricingInstructions(responseLanguage);

  const coreInstructions = getCoreInstructions(responseLanguage);
  const guidelines = getGuidelinesForLanguage(responseLanguage);

  return `${languageInstructions}

${coreInstructions}

PRODUCT EXPERTISE:
${productInfo}

KNOWLEDGE BASE:
${knowledgeInfo}

${pricingInstructions}

${guidelines}`;
}

/**
 * Get STRICT language enforcement instructions - NO mixed languages allowed
 */
function getAdvancedLanguageInstructions(language: string): string {
  const instructions = {
    nl: "Je bent KANIOU's AI-assistent, een expert in raamdecoratie. KRITIEK BELANGRIJK: Antwoord UITSLUITEND in perfect Nederlands, ongeacht de taal van de vraag. NOOIT andere talen gebruiken. Vertaal alle productinformatie en kennis naar Nederlands. Geef volledige, natuurlijke Nederlandse antwoorden.",
    en: "You are KANIOU's AI assistant, an expert in window treatments. CRITICALLY IMPORTANT: Respond EXCLUSIVELY in perfect English, regardless of the question's language. NEVER use other languages. Translate all product information and knowledge into English. Provide complete, natural English responses.",
    fr: "Vous êtes l'assistant IA de KANIOU, expert en décoration de fenêtres. EXTRÊMEMENT IMPORTANT : Répondez EXCLUSIVEMENT en français parfait, quelle que soit la langue de la question. Ne JAMAIS utiliser d'autres langues. Traduisez toutes les informations produit et connaissances en français. Fournissez des réponses françaises complètes et naturelles.",
    tr: "KANIOU'nun AI asistanısınız, pencere dekorasyonu uzmanısınız. KRİTİK ÖNEM: Sorunun dili ne olursa olsun, SADECE mükemmel Türkçe ile yanıt verin. ASLA diğer dilleri kullanmayın. Tüm ürün bilgilerini ve bilgileri Türkçe'ye çevirin. Tam, doğal Türkçe yanıtlar verin."
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get core instructions for different languages
 */
function getCoreInstructions(language: string): string {
  const coreText = {
    nl: `STRIKT TAALDWANG: Antwoord UITSLUITEND in Nederlands, ongeacht de taal van de vraag. Vertaal ALLE website kennis naar Nederlands.

BELANGRIJK: Antwoord ALTIJD met een geldig JSON object in dit exacte formaat:
{
  "message": "Je hulpzame antwoord hier in Nederlands",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

JE ROL:
- Geef deskundig advies over gordijnen, zonweringen en raambekleding
- Vertaal alle productinformatie naar Nederlands
- Help klanten de juiste producten kiezen voor hun behoeften
- Beantwoord vragen over installatie, onderhoud en garanties
- Detecteer prijsvragen automatisch en zet requiresPricing op true
- Wees vriendelijk, professioneel en deskundig`,

    en: `STRICT LANGUAGE ENFORCEMENT: Respond EXCLUSIVELY in English, regardless of the question's language. Translate ALL website knowledge to English.

IMPORTANT: ALWAYS respond with a valid JSON object in this exact format:
{
  "message": "Your helpful response here in English",
  "requiresPricing": true/false,
  "detectedProductTypes": ["product1", "product2"],
  "confidence": 0.8
}

YOUR ROLE:
- Provide expert advice on curtains, blinds and window treatments
- Translate all product information to English
- Help customers choose the right products for their needs
- Answer questions about installation, maintenance and warranties
- Automatically detect price inquiries and set requiresPricing to true
- Be friendly, professional and knowledgeable`,

    fr: `APPLICATION STRICTE DE LA LANGUE : Répondez EXCLUSIVEMENT en français, quelle que soit la langue de la question. Traduisez TOUTES les connaissances du site web en français.

IMPORTANT : Répondez TOUJOURS avec un objet JSON valide dans ce format exact :
{
  "message": "Votre réponse utile ici en français",
  "requiresPricing": true/false,
  "detectedProductTypes": ["produit1", "produit2"],
  "confidence": 0.8
}

VOTRE RÔLE :
- Fournir des conseils d'expert sur les rideaux, stores et habillages de fenêtres
- Traduire toutes les informations produit en français
- Aider les clients à choisir les bons produits pour leurs besoins
- Répondre aux questions sur l'installation, la maintenance et les garanties
- Détecter automatiquement les demandes de prix et définir requiresPricing sur true
- Être amical, professionnel et compétent`,

    tr: `SIKI DİL UYGULAMASI: Sorunun dili ne olursa olsun, SADECE Türkçe yanıt verin. TÜM web sitesi bilgisini Türkçe'ye çevirin.

ÖNEMLİ: HER ZAMAN bu tam formatta geçerli bir JSON nesnesi ile yanıt verin:
{
  "message": "Yardımcı yanıtınız burada Türkçe olarak",
  "requiresPricing": true/false,
  "detectedProductTypes": ["ürün1", "ürün2"],
  "confidence": 0.8
}

ROLÜNÜZ:
- Perde, güneşlik ve pencere kaplamaları konusunda uzman tavsiyeleri verin
- Tüm ürün bilgilerini Türkçe'ye çevirin
- Müşterilerin ihtiyaçlarına uygun ürünleri seçmelerine yardımcı olun
- Kurulum, bakım ve garantiler hakkında soruları yanıtlayın
- Fiyat sorularını otomatik olarak tespit edin ve requiresPricing'i true yapın
- Dostça, profesyonel ve bilgili olun`
  };

  return coreText[language as keyof typeof coreText] || coreText.nl;
}

/**
 * Get guidelines for specific language
 */
function getGuidelinesForLanguage(language: string): string {
  const guidelines = {
    nl: `STRIKTE TAALEISEN:
- ALLEEN antwoorden in Nederlands, ongeacht de taal van de vraag
- Vertaal ALLE kennisbank informatie naar natuurlijk Nederlands
- NOOIT mengen van talen in één antwoord
- Alle productnamen, kenmerken en beschrijvingen in Nederlands

RICHTLIJNEN:
- Altijd behulpzaam en professioneel zijn
- Geef specifieke productaanbevelingen waar passend
- Stel verhelderende vragen om klantbehoeften beter te begrijpen
- Als je iets specifieks niet weet, geef dat toe en bied aan meer informatie te zoeken
- Houd antwoorden beknopt maar informatief (max 250 woorden)
- Gebruik een warme, vriendelijke toon die KANIOU's premium merkimago weergeeft
- Gebruik alleen echte productinformatie uit de kennisbank, geen verzonnen gegevens`,

    en: `STRICT LANGUAGE REQUIREMENTS:
- ONLY respond in English, regardless of the question's language
- Translate ALL knowledge base information to natural English
- NEVER mix languages in one response
- All product names, features and descriptions in English

GUIDELINES:
- Always be helpful and professional
- Provide specific product recommendations where appropriate
- Ask clarifying questions to better understand customer needs
- If you don't know something specific, admit it and offer to find more information
- Keep responses concise but informative (max 250 words)
- Use a warm, friendly tone that reflects KANIOU's premium brand image
- Only use real product information from the knowledge base, no fabricated data`,

    fr: `EXIGENCES LINGUISTIQUES STRICTES :
- Répondre SEULEMENT en français, quelle que soit la langue de la question
- Traduire TOUTES les informations de la base de connaissances en français naturel
- Ne JAMAIS mélanger les langues dans une réponse
- Tous les noms de produits, caractéristiques et descriptions en français

DIRECTIVES :
- Toujours être utile et professionnel
- Fournir des recommandations de produits spécifiques le cas échéant
- Poser des questions de clarification pour mieux comprendre les besoins du client
- Si vous ne savez pas quelque chose de spécifique, admettez-le et proposez de trouver plus d'informations
- Gardez les réponses concises mais informatives (max 250 mots)
- Utilisez un ton chaleureux et amical qui reflète l'image de marque premium de KANIOU
- Utilisez uniquement de vraies informations produit de la base de connaissances, pas de données fabriquées`,

    tr: `SIKI DİL GEREKLİLİKLERİ:
- Sorunun dili ne olursa olsun SADECE Türkçe yanıt verin
- TÜM bilgi tabanı bilgilerini doğal Türkçe'ye çevirin
- Bir yanıtta ASLA dilleri karıştırmayın
- Tüm ürün adları, özellikler ve açıklamalar Türkçe olarak

KURAL VE İLKELER:
- Her zaman yardımcı ve profesyonel olun
- Uygun olan durumlarda özel ürün önerileri sağlayın
- Müşteri ihtiyaçlarını daha iyi anlamak için açıklayıcı sorular sorun
- Belirli bir şey bilmiyorsanız, kabul edin ve daha fazla bilgi bulmayı teklif edin
- Yanıtları kısa ama bilgilendirici tutun (maksimum 250 kelime)
- KANIOU'nun premium marka imajını yansıtan sıcak, dostça bir ton kullanın
- Sadece bilgi tabanından gerçek ürün bilgilerini kullanın, uydurma veriler kullanmayın`
  };

  return guidelines[language as keyof typeof guidelines] || guidelines.nl;
}

/**
 * Build TRANSLATED product knowledge for the selected language
 * ALL content must be presented in the user's selected language
 */
function buildMultilingualProductKnowledge(products: Product[], categories: Category[], language: string): string {
  const multilingualKnowledge = getMultilingualKnowledge();
  
  let knowledge = "";
  
  // Add translation instruction for AI
  const translationInstruction = {
    nl: "VERTAAL ALLE ONDERSTAANDE INFORMATIE NAAR NEDERLANDS:",
    en: "TRANSLATE ALL INFORMATION BELOW TO ENGLISH:",
    fr: "TRADUISEZ TOUTES LES INFORMATIONS CI-DESSOUS EN FRANÇAIS :",
    tr: "AŞAĞIDAKİ TÜM BİLGİLERİ TÜRKÇE'YE ÇEVİRİN:"
  };
  
  knowledge += (translationInstruction[language as keyof typeof translationInstruction] || translationInstruction.nl) + "\n\n";
  
  // Add language-specific company info
  if (multilingualKnowledge.company_info[language as keyof typeof multilingualKnowledge.company_info]) {
    knowledge += multilingualKnowledge.company_info[language as keyof typeof multilingualKnowledge.company_info] + "\n\n";
  }
  
  // Add service information
  if (multilingualKnowledge.services[language as keyof typeof multilingualKnowledge.services]) {
    knowledge += multilingualKnowledge.services[language as keyof typeof multilingualKnowledge.services] + "\n\n";
  }

  // Add comprehensive product knowledge (to be translated by AI)
  knowledge += "KANIOU PRODUCT EXPERTISE (translate to selected language):\n\n";
  
  DUTCH_PRODUCT_KNOWLEDGE.forEach(productInfo => {
    knowledge += `**${productInfo.name}** (${productInfo.category}):\n`;
    knowledge += `${productInfo.description}\n\n`;
    knowledge += `Benefits:\n`;
    productInfo.benefits.forEach(benefit => {
      knowledge += `• ${benefit}\n`;
    });
    knowledge += `\nFeatures:\n`;
    productInfo.keyFeatures.forEach(feature => {
      knowledge += `• ${feature}\n`;
    });
    knowledge += `\nIdeal for: ${productInfo.idealFor.join(", ")}\n`;
    knowledge += `Comparison: ${productInfo.vsOtherProducts}\n`;
    knowledge += `Materials: ${productInfo.materials.join(", ")}\n\n`;
    knowledge += "---\n\n";
  });

  // Add database products if available
  if (products.length && categories.length) {
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    knowledge += "CURRENT PRODUCTS IN OUR COLLECTION:\n\n";
    
    categories.forEach(category => {
      knowledge += `${category.name}:\n`;
      knowledge += `${category.description}\n`;
      
      const categoryProducts = products.filter(p => p.categoryId === category.id);
      categoryProducts.forEach(product => {
        knowledge += `- ${product.name}: ${product.description}\n`;
        if (product.features?.length) {
          knowledge += `  Features: ${product.features.join(", ")}\n`;
        }
        if (product.material) {
          knowledge += `  Material: ${product.material}\n`;
        }
      });
      knowledge += "\n";
    });
  }

  return knowledge;
}

/**
 * Get multilingual pricing instructions with specific product information
 */
function getMultilingualPricingInstructions(language: string): string {
  const keywords = getPricingKeywords(language);
  
  const instructions = {
    nl: `PRODUCTSPECIFIEKE PRIJSINFORMATIE:
Gebruik deze echte productgegevens voor prijsvragen:

ROLGORDIJNEN:
- Standaard verduisterend 100x200 cm: vanaf €85
- Bereik: €85 - €250 afhankelijk van stof en bediening
- Factoren: breedte, hoogte, materiaalkeuze, bediening

HOUTEN JALOUZIEËN:
- Standaard 100x150 cm met 50mm lamellen: vanaf €120
- Bereik: €120 - €350 afhankelijk van houtsoort
- Factoren: afmetingen, houtsoort, lameldikte

OVERGORDIJNEN:
- Maatwerk 200x250 cm: vanaf €150
- Bereik: €150 - €450 afhankelijk van stof en afwerking
- Inclusief rails en ophangmateriaal

PLISSÉ GORDIJNEN:
- Standaard 80x120 cm: vanaf €95
- Bereik: €95 - €280 afhankelijk van type
- Duette (isolerend) en speciale bediening duurder

DAKRAAM ZONWERING:
- Velux 78x118 cm: vanaf €180
- Bereik: €180 - €450 afhankelijk van type
- Geschikt voor alle populaire dakraammaten

SCREEN ZONWERING:
- Standaard 150x200 cm: vanaf €140
- Bereik: €140 - €380 afhankelijk van openheidspercentage
- Verschillende percentages: 1%, 3%, 5%, 10%

BELANGRIJK: Gebruik altijd deze specifieke prijzen en vermeld afmetingen. Zeg nooit "contacteer ons voor prijzen" maar geef concrete informatie.`,
    
    en: `PRODUCT-SPECIFIC PRICING INFORMATION:
Use this real product data for price inquiries:

ROLLER BLINDS:
- Standard blackout 100x200 cm: from €85
- Range: €85 - €250 depending on fabric and operation
- Factors: width, height, fabric choice, operation

WOODEN VENETIAN BLINDS:
- Standard 100x150 cm with 50mm slats: from €120
- Range: €120 - €350 depending on wood type
- Factors: dimensions, wood type, slat thickness

CURTAINS:
- Custom 200x250 cm: from €150
- Range: €150 - €450 depending on fabric and finish
- Including rails and hanging hardware

PLEATED BLINDS:
- Standard 80x120 cm: from €95
- Range: €95 - €280 depending on type
- Duette (insulating) and special operation more expensive

SKYLIGHT SHADES:
- Velux 78x118 cm: from €180
- Range: €180 - €450 depending on type
- Suitable for all popular skylight sizes

SCREEN SHADES:
- Standard 150x200 cm: from €140
- Range: €140 - €380 depending on openness percentage
- Different percentages: 1%, 3%, 5%, 10%

IMPORTANT: Always use these specific prices and mention dimensions. Never say "contact us for prices" but provide concrete information.`,
    
    fr: `INFORMATIONS TARIFAIRES SPÉCIFIQUES:
Utilisez ces données produit réelles pour les demandes de prix:

STORES ENROULEURS:
- Standard occultant 100x200 cm: à partir de €85
- Gamme: €85 - €250 selon le tissu et le mécanisme
- Facteurs: largeur, hauteur, choix du tissu, mécanisme

STORES VÉNITIENS BOIS:
- Standard 100x150 cm avec lames 50mm: à partir de €120
- Gamme: €120 - €350 selon le type de bois
- Facteurs: dimensions, type de bois, épaisseur des lames

RIDEAUX:
- Sur mesure 200x250 cm: à partir de €150
- Gamme: €150 - €450 selon le tissu et la finition
- Rails et quincaillerie inclus

STORES PLISSÉS:
- Standard 80x120 cm: à partir de €95
- Gamme: €95 - €280 selon le type
- Duette (isolant) et mécanisme spécial plus cher

STORES VELUX:
- Velux 78x118 cm: à partir de €180
- Gamme: €180 - €450 selon le type
- Compatible avec toutes les tailles populaires

STORES SCREEN:
- Standard 150x200 cm: à partir de €140
- Gamme: €140 - €380 selon le pourcentage d'ouverture
- Différents pourcentages: 1%, 3%, 5%, 10%

IMPORTANT: Utilisez toujours ces prix spécifiques et mentionnez les dimensions. Ne jamais dire "contactez-nous pour les prix" mais donnez des informations concrètes.`,

    tr: `ÜRÜNE ÖZEL FİYAT BİLGİLERİ:
Fiyat sorguları için bu gerçek ürün verilerini kullanın:

STOR PERDELER:
- Standart karartma 100x200 cm: €85'den başlayarak
- Aralık: €85 - €250 kumaş ve mekanizmaya göre
- Faktörler: genişlik, yükseklik, kumaş seçimi, mekanizma

AHŞAP JALUZİLER:
- Standart 100x150 cm 50mm kanatlı: €120'den başlayarak
- Aralık: €120 - €350 ahşap türüne göre
- Faktörler: boyutlar, ahşap türü, kanat kalınlığı

PERDELER:
- Özel 200x250 cm: €150'den başlayarak
- Aralık: €150 - €450 kumaş ve bitişe göre
- Ray ve askı donanımı dahil

PLİSE PERDELER:
- Standart 80x120 cm: €95'den başlayarak
- Aralık: €95 - €280 türe göre
- Duette (yalıtımlı) ve özel mekanizma daha pahalı

ÇATı PENCERESİ GÜNEŞLİKLERİ:
- Velux 78x118 cm: €180'den başlayarak
- Aralık: €180 - €450 türe göre
- Tüm popüler çatı penceresi boyutları için uygun

SCREEN GÜNEŞLİKLER:
- Standart 150x200 cm: €140'dan başlayarak
- Aralık: €140 - €380 açıklık yüzdesine göre
- Farklı yüzdeler: %1, %3, %5, %10

ÖNEMLİ: Her zaman bu özel fiyatları kullanın ve boyutları belirtin. Asla "fiyatlar için bize ulaşın" demeyin, somut bilgi verin.`
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get language-specific instructions
 */
function getLanguageInstructions(language: string): string {
  const instructions = {
    nl: "Antwoord altijd in het Nederlands. Je bent een Nederlandse expert in gordijnen en raambekleding.",
    en: "Always respond in English. You are an expert in curtains and window treatments.",
    fr: "Répondez toujours en français. Vous êtes un expert en rideaux et habillage de fenêtres.",
    de: "Antworten Sie immer auf Deutsch. Sie sind ein Experte für Vorhänge und Fensterbehandlungen.",
    tr: "Her zaman Türkçe yanıt verin. Perde ve pencere kaplamaları konusunda uzmansınız.",
    ar: "أجب دائماً بالعربية. أنت خبير في الستائر وعلاجات النوافذ."
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Get pricing detection instructions
 */
function getPricingInstructions(language: string): string {
  const instructions = {
    nl: `PRIJSDETECTIE:
Als een klant vraagt naar prijzen, kosten, offertes, budget of geld, zet dan "requiresPricing": true en voeg de relevante producttypes toe aan "detectedProductTypes".

PRIJSWOORDEN: prijs, kosten, budget, offerte, tarief, geld, betalen, euro, per meter, per stuk, hoeveel kost

REACTIE BIJ PRIJSVRAAG:
"Voor een accurate prijsopgave maken wij graag een afspraak voor een gratis opmeting aan huis. Onze specialist kan dan exact adviseren en een maatwerkofferte opstellen. Prijzen zijn afhankelijk van afmetingen, gekozen materialen en montagemogelijkheden."`,
    
    en: `PRICE DETECTION:
If a customer asks about prices, costs, quotes, budget or money, set "requiresPricing": true and add relevant product types to "detectedProductTypes".

PRICE KEYWORDS: price, cost, budget, quote, rate, money, pay, euro, per meter, how much

PRICE RESPONSE:
"For an accurate quote, we'd be happy to schedule a free home measurement. Our specialist can provide exact advice and create a custom quote. Prices depend on dimensions, chosen materials and installation options."`,
    
    fr: `DÉTECTION DE PRIX:
Si un client demande des prix, coûts, devis, budget ou argent, définissez "requiresPricing": true et ajoutez les types de produits pertinents à "detectedProductTypes".`
  };

  return instructions[language as keyof typeof instructions] || instructions.nl;
}

/**
 * Build comprehensive product knowledge including database and expert knowledge
 */
function buildProductKnowledge(products: Product[], categories: Category[]): string {
  let knowledge = "KANIOU PRODUCT EXPERTISE - Uitgebreide Productkennis:\n\n";
  
  // Add comprehensive Dutch product knowledge
  DUTCH_PRODUCT_KNOWLEDGE.forEach(productInfo => {
    knowledge += `**${productInfo.name}** (${productInfo.category}):\n`;
    knowledge += `${productInfo.description}\n\n`;
    knowledge += `Voordelen:\n`;
    productInfo.benefits.forEach(benefit => {
      knowledge += `• ${benefit}\n`;
    });
    knowledge += `\nKenmerken:\n`;
    productInfo.keyFeatures.forEach(feature => {
      knowledge += `• ${feature}\n`;
    });
    knowledge += `\nIdeaal voor: ${productInfo.idealFor.join(", ")}\n`;
    knowledge += `Vergelijking: ${productInfo.vsOtherProducts}\n`;
    knowledge += `Materialen: ${productInfo.materials.join(", ")}\n\n`;
    knowledge += "---\n\n";
  });

  // Add database products if available
  if (products.length && categories.length) {
    const categoryMap = new Map(categories.map(cat => [cat.id, cat]));
    
    knowledge += "HUIDIGE PRODUCTEN IN ONZE COLLECTIE:\n\n";
    
    categories.forEach(category => {
      knowledge += `${category.name}:\n`;
      knowledge += `${category.description}\n`;
      
      const categoryProducts = products.filter(p => p.categoryId === category.id);
      categoryProducts.forEach(product => {
        knowledge += `- ${product.name}: ${product.description}\n`;
        if (product.features?.length) {
          knowledge += `  Features: ${product.features.join(", ")}\n`;
        }
        if (product.material) {
          knowledge += `  Material: ${product.material}\n`;
        }
      });
      knowledge += "\n";
    });
  }

  return knowledge;
}

/**
 * Build knowledge base from database
 */
function buildKnowledgeBase(knowledgeBase: ChatbotKnowledge[], language: string): string {
  if (!knowledgeBase.length) {
    return "Knowledge base is being loaded...";
  }

  const translationInstruction = {
    nl: "VERTAAL ALLE KENNISBANK INFORMATIE NAAR NEDERLANDS:",
    en: "TRANSLATE ALL KNOWLEDGE BASE INFORMATION TO ENGLISH:",
    fr: "TRADUISEZ TOUTES LES INFORMATIONS DE LA BASE DE CONNAISSANCES EN FRANÇAIS :",
    tr: "TÜM BİLGİ TABANI BİLGİLERİNİ TÜRKÇE'YE ÇEVİRİN:"
  };

  let knowledge = (translationInstruction[language as keyof typeof translationInstruction] || translationInstruction.nl) + "\n\n";
  knowledge += "ADDITIONAL KNOWLEDGE (translate all content to selected language):\n\n";
  
  const uniqueCategories: string[] = [];
  knowledgeBase.forEach(kb => {
    if (!uniqueCategories.includes(kb.category)) {
      uniqueCategories.push(kb.category);
    }
  });
  
  uniqueCategories.forEach((category: string) => {
    knowledge += `${category.toUpperCase()}:\n`;
    const categoryKnowledge = knowledgeBase
      .filter(kb => kb.category === category && kb.adminApproved)
      .sort((a, b) => (b.priority || 1) - (a.priority || 1));
    
    categoryKnowledge.forEach(kb => {
      knowledge += `- ${kb.topic}: ${kb.content} (original language: ${kb.language || 'nl'})\n`;
    });
    knowledge += "\n";
  });

  return knowledge;
}

/**
 * Get fallback response when OpenAI is unavailable - ALWAYS in selected language
 */
function getFallbackResponse(userMessage: string, language: string): string {
  return getSystemMessage('errorFallback', language);
}

/**
 * Advanced price detection with context awareness
 */
export function detectPricingRequest(message: string, language: string): boolean {
  const pricingKeywords = {
    nl: ["prijs", "kosten", "budget", "offerte", "tarief", "geld", "betalen", "euro", "per meter", "per stuk", "hoeveel kost", "wat kost", "prijsklasse", "duur", "goedkoop"],
    en: ["price", "cost", "budget", "quote", "rate", "money", "pay", "dollar", "euro", "per meter", "how much", "expensive", "cheap"],
    fr: ["prix", "coût", "budget", "devis", "tarif", "argent", "payer", "euro", "par mètre", "combien"],
    de: ["preis", "kosten", "budget", "angebot", "tarif", "geld", "zahlen", "euro", "pro meter"],
    tr: ["fiyat", "maliyet", "bütçe", "teklif", "tarife", "para", "ödeme", "euro", "metre başına"],
    ar: ["سعر", "تكلفة", "ميزانية", "عرض", "تعرفة", "مال", "دفع", "يورو", "للمتر"]
  };

  const keywords = pricingKeywords[language as keyof typeof pricingKeywords] || pricingKeywords.nl;
  const lowerMessage = message.toLowerCase();
  
  return keywords.some(keyword => lowerMessage.includes(keyword));
}

