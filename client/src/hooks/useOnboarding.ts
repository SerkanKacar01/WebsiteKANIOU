import { useState, useEffect } from 'react';
import { useUserPreferences } from './useUserPreferences';

export function useOnboarding() {
  const { preferences, updateCustomPreferences } = useUserPreferences();
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (preferences) {
      const hasCompletedOnboarding = preferences.preferences?.onboardingCompleted;
      const isFirstVisit = !localStorage.getItem('kaniou_has_visited');
      
      // Show onboarding if it's a first visit and not completed
      setShouldShowOnboarding(!hasCompletedOnboarding && isFirstVisit);
      setIsLoading(false);
      
      // Mark as visited
      if (isFirstVisit) {
        localStorage.setItem('kaniou_has_visited', 'true');
      }
    }
  }, [preferences]);

  const completeOnboarding = () => {
    setShouldShowOnboarding(false);
    updateCustomPreferences({
      onboardingCompleted: true,
      completedAt: new Date().toISOString()
    });
  };

  const skipOnboarding = () => {
    setShouldShowOnboarding(false);
    updateCustomPreferences({
      onboardingSkipped: true,
      skippedAt: new Date().toISOString()
    });
  };

  const resetOnboarding = () => {
    setShouldShowOnboarding(true);
    updateCustomPreferences({
      onboardingCompleted: false,
      onboardingSkipped: false
    });
  };

  return {
    shouldShowOnboarding,
    isLoading,
    completeOnboarding,
    skipOnboarding,
    resetOnboarding
  };
}