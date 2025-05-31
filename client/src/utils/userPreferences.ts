/**
 * User Preferences Management for KANIOU Chatbot
 * Handles localStorage data for personalized experiences
 */

export interface UserPreferences {
  name?: string;
  language: string;
  lastVisit?: string;
  visitCount: number;
  hasInteracted: boolean;
}

const STORAGE_KEY = 'kaniou_user_preferences';

/**
 * Get user preferences from localStorage
 */
export function getUserPreferences(): UserPreferences | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.warn('Error reading user preferences:', error);
    return null;
  }
}

/**
 * Save user preferences to localStorage
 */
export function saveUserPreferences(preferences: Partial<UserPreferences>): void {
  try {
    const existing = getUserPreferences() || {
      language: 'nl',
      visitCount: 0,
      hasInteracted: false
    };
    
    const updated = {
      ...existing,
      ...preferences,
      lastVisit: new Date().toISOString(),
      visitCount: existing.visitCount + 1,
      hasInteracted: true
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.warn('Error saving user preferences:', error);
  }
}

/**
 * Update user name when provided
 */
export function updateUserName(name: string): void {
  const preferences = getUserPreferences();
  if (preferences) {
    saveUserPreferences({ ...preferences, name });
  } else {
    saveUserPreferences({ name, language: 'nl' });
  }
}

/**
 * Check if user is returning visitor
 */
export function isReturningUser(): boolean {
  const preferences = getUserPreferences();
  return preferences !== null && preferences.hasInteracted;
}

/**
 * Get personalized greeting based on user data
 */
export function getPersonalizedGreeting(language: string): {
  isPersonalized: boolean;
  greeting: string;
  showNamePrompt: boolean;
} {
  const preferences = getUserPreferences();
  
  const greetings = {
    nl: {
      returning: (name: string) => `Welkom terug ${name}! Fijn om u weer te zien. Hoe kan ik u vandaag helpen?`,
      returningNoName: "Welkom terug bij KANIOU! We staan weer klaar om u te helpen. Wilt u stijladvies, een offerte of onze collectie bekijken?",
      new: "Welkom bij KANIOU! Ik ben hier om u te helpen met al uw vragen over maatwerk raambekleding.",
      namePrompt: "Mag ik uw naam weten voor een persoonlijkere ervaring?"
    },
    fr: {
      returning: (name: string) => `Bon retour ${name}! Ravi de vous revoir. Comment puis-je vous aider aujourd'hui?`,
      returningNoName: "Bienvenue à nouveau chez KANIOU! Nous sommes prêts à vous aider. Souhaitez-vous un conseil déco, un devis ou voir notre collection?",
      new: "Bienvenue chez KANIOU! Je suis là pour vous aider avec toutes vos questions sur nos décorations de fenêtres sur mesure.",
      namePrompt: "Puis-je connaître votre nom pour une expérience plus personnalisée?"
    },
    en: {
      returning: (name: string) => `Welcome back ${name}! Great to see you again. How can I help you today?`,
      returningNoName: "Welcome back to KANIOU! We're ready to assist you again. Would you like style advice, a quote, or to view our collection?",
      new: "Welcome to KANIOU! I'm here to help you with all your questions about custom window coverings.",
      namePrompt: "May I know your name for a more personalized experience?"
    },
    tr: {
      returning: (name: string) => `Tekrar hoş geldiniz ${name}! Sizi tekrar görmek harika. Bugün size nasıl yardımcı olabilirim?`,
      returningNoName: "KANIOU'ya tekrar hoş geldiniz! Size tekrar yardımcı olmaya hazırız. Stil önerisi, fiyat teklifi veya koleksiyonumuzu görmek ister misiniz?",
      new: "KANIOU'ya hoş geldiniz! Özel pencere kaplamaları hakkındaki tüm sorularınızda size yardımcı olmak için buradayım.",
      namePrompt: "Daha kişiselleştirilmiş bir deneyim için adınızı öğrenebilir miyim?"
    }
  };
  
  const langGreetings = greetings[language as keyof typeof greetings] || greetings.nl;
  
  if (preferences && preferences.hasInteracted) {
    // Returning user
    if (preferences.name) {
      return {
        isPersonalized: true,
        greeting: langGreetings.returning(preferences.name),
        showNamePrompt: false
      };
    } else {
      return {
        isPersonalized: true,
        greeting: langGreetings.returningNoName,
        showNamePrompt: true
      };
    }
  } else {
    // New user
    return {
      isPersonalized: false,
      greeting: langGreetings.new,
      showNamePrompt: true
    };
  }
}

/**
 * Clear corrupted user preferences data
 */
export function clearCorruptedPreferences(): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const preferences = JSON.parse(stored);
      // Check for corrupted data patterns
      if (preferences.corruptedData || 
          (preferences.name && preferences.name.includes('jullie een galerij')) ||
          (stored.includes('jullie een galerij'))) {
        console.log('🧹 Clearing corrupted user preferences data');
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  } catch (error) {
    console.warn('Error checking user preferences for corruption:', error);
    // If there's any error parsing, clear the data
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Extract name from user message
 */
export function extractNameFromMessage(message: string): string | null {
  // Simple patterns to detect when user provides their name
  const patterns = [
    /(?:ik ben|i am|je suis|ben|je m'appelle|my name is|i'm)\s+([a-zA-ZÀ-ž\s]{2,30})/i,
    /(?:mijn naam is|naam|name|nom)\s+([a-zA-ZÀ-ž\s]{2,30})/i,
    /^([a-zA-ZÀ-ž]{2,15})$/i // Single word that could be a name
  ];
  
  for (const pattern of patterns) {
    const match = message.match(pattern);
    if (match && match[1]) {
      const name = match[1].trim();
      // Validate it's likely a name (not too common words)
      const commonWords = ['help', 'hulp', 'aide', 'hallo', 'hello', 'bonjour', 'yes', 'ja', 'oui'];
      if (!commonWords.includes(name.toLowerCase()) && name.length >= 2) {
        return name;
      }
    }
  }
  
  return null;
}