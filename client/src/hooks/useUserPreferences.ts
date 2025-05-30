import { useState, useEffect } from 'react';

export interface UserPreferences {
  userId: string;
  language: string;
  name?: string;
  email?: string;
  lastActive: Date;
  preferences?: {
    theme?: string;
    notifications?: boolean;
    [key: string]: any;
  };
}

const STORAGE_KEY = 'kaniou_user_preferences';

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate a unique user ID if none exists
  const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Load preferences from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert lastActive back to Date object
        parsed.lastActive = new Date(parsed.lastActive);
        setPreferences(parsed);
      } else {
        // Create new user preferences
        const newPreferences: UserPreferences = {
          userId: generateUserId(),
          language: 'nl', // Default to Dutch
          lastActive: new Date(),
        };
        setPreferences(newPreferences);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPreferences));
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
      // Fallback to new preferences
      const newPreferences: UserPreferences = {
        userId: generateUserId(),
        language: 'nl',
        lastActive: new Date(),
      };
      setPreferences(newPreferences);
    }
    setIsLoading(false);
  }, []);

  // Save preferences to localStorage
  const savePreferences = (updates: Partial<UserPreferences>) => {
    if (!preferences) return;

    const updatedPreferences = {
      ...preferences,
      ...updates,
      lastActive: new Date(),
    };

    setPreferences(updatedPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPreferences));
  };

  // Update language preference
  const updateLanguage = (language: string) => {
    savePreferences({ language });
  };

  // Update user name
  const updateName = (name: string) => {
    savePreferences({ name });
  };

  // Update user email
  const updateEmail = (email: string) => {
    savePreferences({ email });
  };

  // Update custom preferences
  const updateCustomPreferences = (customPrefs: Record<string, any>) => {
    savePreferences({
      preferences: {
        ...preferences?.preferences,
        ...customPrefs,
      },
    });
  };

  // Get user's preferred language
  const getLanguage = (): string => {
    return preferences?.language || 'nl';
  };

  // Check if user has been active recently (within last 24 hours)
  const isRecentlyActive = (): boolean => {
    if (!preferences?.lastActive) return false;
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return preferences.lastActive > twentyFourHoursAgo;
  };

  return {
    preferences,
    isLoading,
    savePreferences,
    updateLanguage,
    updateName,
    updateEmail,
    updateCustomPreferences,
    getLanguage,
    isRecentlyActive,
  };
}