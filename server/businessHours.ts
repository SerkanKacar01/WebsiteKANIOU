/**
 * Business Hours Logic for KANIOU Chatbot
 * Operating Hours: Monday-Saturday 10:00-18:00 (Belgium Time)
 */

export interface BusinessHoursConfig {
  timezone: string;
  openDays: number[]; // 0=Sunday, 1=Monday, etc.
  openTime: string;   // HH:MM format
  closeTime: string;  // HH:MM format
}

export const KANIOU_BUSINESS_HOURS: BusinessHoursConfig = {
  timezone: 'Europe/Brussels', // Belgium time (CET/CEST)
  openDays: [1, 2, 3, 4, 5, 6], // Monday to Saturday
  openTime: '10:00',
  closeTime: '18:00'
};

/**
 * Check if current time is within business hours
 */
export function isWithinBusinessHours(config: BusinessHoursConfig = KANIOU_BUSINESS_HOURS): boolean {
  try {
    const now = new Date();
    const belgiumTime = new Date(now.toLocaleString("en-US", { timeZone: config.timezone }));
    
    const currentDay = belgiumTime.getDay(); // 0=Sunday, 1=Monday, etc.
    const currentTime = belgiumTime.getHours() * 100 + belgiumTime.getMinutes(); // HHMM format
    
    // Check if today is a business day
    if (!config.openDays.includes(currentDay)) {
      return false;
    }
    
    // Parse open and close times
    const [openHour, openMin] = config.openTime.split(':').map(Number);
    const [closeHour, closeMin] = config.closeTime.split(':').map(Number);
    
    const openTime = openHour * 100 + openMin;
    const closeTime = closeHour * 100 + closeMin;
    
    // Check if current time is within business hours
    return currentTime >= openTime && currentTime < closeTime;
    
  } catch (error) {
    console.error('Error checking business hours:', error);
    // Default to open if there's an error
    return true;
  }
}

/**
 * Get business hours response in multiple languages
 */
export function getBusinessHoursResponse(language: string = 'nl'): string {
  const responses = {
    nl: "We zijn momenteel gesloten. Ons team is beschikbaar van maandag tot zaterdag tussen 10:00 en 18:00. Laat uw bericht achter en wij nemen zo spoedig mogelijk contact met u op.",
    
    en: "We are currently closed. Our team is available from Monday to Saturday between 10:00 and 18:00. Please leave your message, and we will get back to you as soon as possible.",
    
    fr: "Nous sommes actuellement fermés. Notre équipe est disponible du lundi au samedi entre 10h00 et 18h00. Veuillez laisser votre message et nous vous recontacterons dès que possible.",
    
    de: "Wir sind derzeit geschlossen. Unser Team ist von Montag bis Samstag zwischen 10:00 und 18:00 Uhr verfügbar. Bitte hinterlassen Sie Ihre Nachricht und wir melden uns schnellstmöglich bei Ihnen.",
    
    tr: "Şu anda kapalıyız. Ekibimiz Pazartesi'den Cumartesi'ye 10:00-18:00 saatleri arasında hizmetinizdedir. Lütfen mesajınızı bırakın, en kısa sürede size geri döneceğiz.",
    
    ar: "نحن مغلقون حاليًا. فريقنا متاح من الاثنين إلى السبت بين الساعة 10:00 و 18:00. يرجى ترك رسالتك وسنعاود الاتصال بك في أقرب وقت ممكن."
  };
  
  return responses[language as keyof typeof responses] || responses.nl;
}

/**
 * Get current business status for logging
 */
export function getBusinessStatus(): { 
  isOpen: boolean; 
  currentTime: string; 
  nextOpenTime: string;
  timezone: string;
} {
  const isOpen = isWithinBusinessHours();
  const now = new Date();
  const belgiumTime = new Date(now.toLocaleString("en-US", { timeZone: KANIOU_BUSINESS_HOURS.timezone }));
  
  const currentTime = belgiumTime.toLocaleTimeString('nl-BE', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long'
  });
  
  // Calculate next opening time
  let nextOpenTime = "Maandag 10:00";
  const currentDay = belgiumTime.getDay();
  
  if (currentDay === 0) { // Sunday
    nextOpenTime = "Maandag 10:00";
  } else if (currentDay === 6) { // Saturday
    const currentHour = belgiumTime.getHours();
    if (currentHour >= 18) {
      nextOpenTime = "Maandag 10:00";
    } else {
      nextOpenTime = "Vandaag om 10:00";
    }
  } else { // Monday-Friday
    const currentHour = belgiumTime.getHours();
    if (currentHour < 10) {
      nextOpenTime = "Vandaag om 10:00";
    } else if (currentHour >= 18) {
      const tomorrow = new Date(belgiumTime);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDay = tomorrow.getDay();
      
      if (tomorrowDay === 0) { // Tomorrow is Sunday
        nextOpenTime = "Maandag 10:00";
      } else {
        nextOpenTime = "Morgen om 10:00";
      }
    }
  }
  
  return {
    isOpen,
    currentTime,
    nextOpenTime,
    timezone: KANIOU_BUSINESS_HOURS.timezone
  };
}