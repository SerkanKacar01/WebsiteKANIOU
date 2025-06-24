import { useState, useEffect, useCallback } from 'react';

interface UserActivity {
  action: string;
  timestamp: Date;
  points: number;
  details?: Record<string, any>;
}

interface GamificationState {
  totalPoints: number;
  level: number;
  streak: number;
  lastVisit: Date | null;
  activities: UserActivity[];
  achievements: string[];
}

const POINTS_CONFIG = {
  FIRST_VISIT: 50,
  DAILY_VISIT: 10,
  CONTACT_FORM_USE: 25,
  PRODUCT_VIEW: 5,
  QUOTE_REQUEST: 100,
  COLOR_MATCHER_USE: 30,
  NEWSLETTER_SIGNUP: 75,
  PRODUCT_360_VIEW: 15,
  STYLE_CONSULTATION: 50,
  CONSECUTIVE_DAYS: 25, // bonus per consecutive day after 3 days
};

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 10000];

const STORAGE_KEY = 'kaniou_gamification';

export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          lastVisit: parsed.lastVisit ? new Date(parsed.lastVisit) : null,
          activities: parsed.activities?.map((a: any) => ({
            ...a,
            timestamp: new Date(a.timestamp)
          })) || []
        };
      }
    } catch (error) {
      console.error('Error loading gamification data:', error);
    }
    
    return {
      totalPoints: 0,
      level: 1,
      streak: 0,
      lastVisit: null,
      activities: [],
      achievements: []
    };
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Calculate level from total points
  const calculateLevel = useCallback((points: number): number => {
    let level = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (points >= LEVEL_THRESHOLDS[i]) {
        level = i + 1;
        break;
      }
    }
    return Math.min(level, LEVEL_THRESHOLDS.length);
  }, []);

  // Calculate streak based on daily visits
  const calculateStreak = useCallback((activities: UserActivity[]): number => {
    const dailyVisits = activities
      .filter(a => a.action === 'DAILY_VISIT')
      .map(a => a.timestamp.toDateString())
      .filter((date, index, arr) => arr.indexOf(date) === index)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dailyVisits.includes(today)) {
      streak = 1;
      let checkDate = new Date(Date.now() - 86400000);
      
      for (let i = 1; i < dailyVisits.length; i++) {
        const checkDateString = checkDate.toDateString();
        if (dailyVisits.includes(checkDateString)) {
          streak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    } else if (dailyVisits.includes(yesterday)) {
      // Yesterday was last visit, streak continues but today hasn't been counted yet
      let checkDate = new Date(Date.now() - 86400000);
      
      for (let i = 0; i < dailyVisits.length; i++) {
        const checkDateString = checkDate.toDateString();
        if (dailyVisits.includes(checkDateString)) {
          streak++;
          checkDate = new Date(checkDate.getTime() - 86400000);
        } else {
          break;
        }
      }
    }

    return streak;
  }, []);

  // Award points for an action
  const awardPoints = useCallback((action: keyof typeof POINTS_CONFIG, details?: Record<string, any>) => {
    const points = POINTS_CONFIG[action];
    if (!points) return;

    const activity: UserActivity = {
      action,
      timestamp: new Date(),
      points,
      details
    };

    setState(prevState => {
      const newActivities = [...prevState.activities, activity];
      const newTotalPoints = prevState.totalPoints + points;
      const newLevel = calculateLevel(newTotalPoints);
      const newStreak = calculateStreak(newActivities);

      // Check for level up achievement
      const newAchievements = [...prevState.achievements];
      if (newLevel > prevState.level && !newAchievements.includes(`level_${newLevel}`)) {
        newAchievements.push(`level_${newLevel}`);
      }

      // Check for streak achievements
      if (newStreak >= 7 && !newAchievements.includes('streak_7')) {
        newAchievements.push('streak_7');
      }
      if (newStreak >= 30 && !newAchievements.includes('streak_30')) {
        newAchievements.push('streak_30');
      }

      return {
        ...prevState,
        totalPoints: newTotalPoints,
        level: newLevel,
        streak: newStreak,
        activities: newActivities,
        achievements: newAchievements
      };
    });
  }, [calculateLevel, calculateStreak]);

  // Track daily visit
  const trackDailyVisit = useCallback(() => {
    const today = new Date().toDateString();
    const hasVisitedToday = state.activities.some(
      a => a.action === 'DAILY_VISIT' && a.timestamp.toDateString() === today
    );

    if (!hasVisitedToday) {
      if (!state.lastVisit) {
        // First visit ever
        awardPoints('FIRST_VISIT');
      }
      
      awardPoints('DAILY_VISIT');
      
      // Bonus points for consecutive days (after 3 days)
      const newStreak = calculateStreak([...state.activities, {
        action: 'DAILY_VISIT',
        timestamp: new Date(),
        points: POINTS_CONFIG.DAILY_VISIT
      }]);
      
      if (newStreak >= 3) {
        awardPoints('CONSECUTIVE_DAYS');
      }

      setState(prev => ({ ...prev, lastVisit: new Date() }));
    }
  }, [state.activities, state.lastVisit, awardPoints, calculateStreak]);

  // Initialize daily visit tracking
  useEffect(() => {
    trackDailyVisit();
  }, []);

  // Get current level progress
  const getCurrentLevelProgress = useCallback(() => {
    const currentLevelThreshold = LEVEL_THRESHOLDS[state.level - 1] || 0;
    const nextLevelThreshold = LEVEL_THRESHOLDS[state.level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
    const progress = state.totalPoints - currentLevelThreshold;
    const maxProgress = nextLevelThreshold - currentLevelThreshold;
    
    return {
      current: progress,
      max: maxProgress,
      percentage: (progress / maxProgress) * 100
    };
  }, [state.totalPoints, state.level]);

  // Get available achievements
  const getAvailableAchievements = useCallback(() => {
    const productViews = state.activities.filter(a => a.action === 'PRODUCT_VIEW').length;
    const chatbotInteractions = state.activities.filter(a => a.action === 'CHATBOT_INTERACTION').length;
    const quoteRequests = state.activities.filter(a => a.action === 'QUOTE_REQUEST').length;
    
    return [
      {
        id: 'product_explorer',
        title: 'Product Ontdekker',
        description: 'Bekijk 10 verschillende producten',
        progress: Math.min(productViews, 10),
        maxProgress: 10,
        unlocked: productViews >= 10,
        points: 200
      },
      {
        id: 'chatbot_master',
        title: 'Chatbot Meester',
        description: 'Voer 5 gesprekken met de AI-assistent',
        progress: Math.min(chatbotInteractions, 5),
        maxProgress: 5,
        unlocked: chatbotInteractions >= 5,
        points: 150
      },
      {
        id: 'quote_specialist',
        title: 'Offerte Specialist',
        description: 'Vraag 3 offertes aan',
        progress: Math.min(quoteRequests, 3),
        maxProgress: 3,
        unlocked: quoteRequests >= 3,
        points: 300
      },
      {
        id: 'loyalty_champion',
        title: 'Loyaliteit Kampioen',
        description: 'Bezoek 7 dagen achter elkaar',
        progress: Math.min(state.streak, 7),
        maxProgress: 7,
        unlocked: state.streak >= 7,
        points: 500
      }
    ];
  }, [state.activities, state.streak]);

  return {
    state,
    awardPoints,
    trackDailyVisit,
    getCurrentLevelProgress,
    getAvailableAchievements,
    calculateLevel,
    POINTS_CONFIG
  };
}