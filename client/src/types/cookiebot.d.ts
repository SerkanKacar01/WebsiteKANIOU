declare global {
  interface Window {
    Cookiebot?: {
      show: () => void;
      hide: () => void;
      renew: () => void;
      consent: {
        necessary: boolean;
        preferences: boolean;
        statistics: boolean;
        marketing: boolean;
      };
    };
  }
}

export {};