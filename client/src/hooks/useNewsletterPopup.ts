import { useState, useEffect, useCallback } from 'react';

// Newsletter popup behavior tracking
const NEWSLETTER_STORAGE_KEYS = {
  CLOSED: 'kaniou_newsletter_closed',
  SUBSCRIBED: 'kaniou_newsletter_subscribed',
  LAST_SHOWN: 'kaniou_newsletter_last_shown',
  AUTO_TRIGGERED: 'kaniou_newsletter_auto_triggered'
} as const;

const POPUP_COOLDOWN_DAYS = 7;
const AUTO_POPUP_DELAY_MS = 30000; // 30 seconds
const SCROLL_THRESHOLD = 0.5; // 50% of page

// Helper functions for localStorage management
export const setNewsletterClosed = () => {
  const timestamp = Date.now();
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.CLOSED, timestamp.toString());
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.LAST_SHOWN, timestamp.toString());
};

export const setNewsletterSubscribed = () => {
  const timestamp = Date.now();
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.SUBSCRIBED, timestamp.toString());
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.LAST_SHOWN, timestamp.toString());
};

export const setNewsletterAutoTriggered = () => {
  const timestamp = Date.now();
  localStorage.setItem(NEWSLETTER_STORAGE_KEYS.AUTO_TRIGGERED, timestamp.toString());
};

export const shouldShowNewsletterPopup = (): boolean => {
  // Check if user has already subscribed
  const subscribed = localStorage.getItem(NEWSLETTER_STORAGE_KEYS.SUBSCRIBED);
  if (subscribed) return false;

  // Check if user closed popup recently
  const closedTimestamp = localStorage.getItem(NEWSLETTER_STORAGE_KEYS.CLOSED);
  if (closedTimestamp) {
    const daysSinceClosed = (Date.now() - parseInt(closedTimestamp)) / (1000 * 60 * 60 * 24);
    if (daysSinceClosed < POPUP_COOLDOWN_DAYS) return false;
  }

  return true;
};

export const shouldAutoTriggerPopup = (): boolean => {
  if (!shouldShowNewsletterPopup()) return false;

  // Check if auto-trigger was already shown today
  const autoTriggeredTimestamp = localStorage.getItem(NEWSLETTER_STORAGE_KEYS.AUTO_TRIGGERED);
  if (autoTriggeredTimestamp) {
    const hoursSinceAutoTrigger = (Date.now() - parseInt(autoTriggeredTimestamp)) / (1000 * 60 * 60);
    if (hoursSinceAutoTrigger < 24) return false; // Only auto-trigger once per day
  }

  return true;
};

interface UseNewsletterPopupOptions {
  enableAutoTrigger?: boolean;
  enableScrollTrigger?: boolean;
  enableTimeTrigger?: boolean;
  customDelay?: number;
}

export const useNewsletterPopup = (options: UseNewsletterPopupOptions = {}) => {
  const {
    enableAutoTrigger = false,
    enableScrollTrigger = false,
    enableTimeTrigger = false,
    customDelay = AUTO_POPUP_DELAY_MS
  } = options;

  const [shouldShow, setShouldShow] = useState(false);
  const [hasAutoTriggered, setHasAutoTriggered] = useState(false);

  // Check if popup should be shown initially
  useEffect(() => {
    const canShow = shouldShowNewsletterPopup();
    setShouldShow(canShow);
  }, []);

  // Time-based trigger
  useEffect(() => {
    if (!enableTimeTrigger || !shouldShow || hasAutoTriggered) return;
    if (!shouldAutoTriggerPopup()) return;

    const timer = setTimeout(() => {
      setShouldShow(true);
      setNewsletterAutoTriggered();
      setHasAutoTriggered(true);
    }, customDelay);

    return () => clearTimeout(timer);
  }, [enableTimeTrigger, shouldShow, hasAutoTriggered, customDelay]);

  // Scroll-based trigger
  useEffect(() => {
    if (!enableScrollTrigger || !shouldShow || hasAutoTriggered) return;
    if (!shouldAutoTriggerPopup()) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / documentHeight;

      if (scrollPercentage >= SCROLL_THRESHOLD) {
        setShouldShow(true);
        setNewsletterAutoTriggered();
        setHasAutoTriggered(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enableScrollTrigger, shouldShow, hasAutoTriggered]);

  // Manual trigger function
  const triggerPopup = useCallback(() => {
    if (shouldShowNewsletterPopup()) {
      setShouldShow(true);
    }
  }, []);

  // Close popup function
  const closePopup = useCallback(() => {
    setShouldShow(false);
    setNewsletterClosed();
  }, []);

  // Subscribe function
  const markSubscribed = useCallback(() => {
    setShouldShow(false);
    setNewsletterSubscribed();
  }, []);

  return {
    shouldShow,
    triggerPopup,
    closePopup,
    markSubscribed,
    canShowPopup: shouldShowNewsletterPopup()
  };
};