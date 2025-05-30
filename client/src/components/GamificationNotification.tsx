import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Trophy, Star, Zap, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificationProps {
  points: number;
  action: string;
  show: boolean;
  onHide: () => void;
}

const ACTION_LABELS = {
  FIRST_VISIT: 'Welkom bij KANIOU!',
  DAILY_VISIT: 'Dagelijks bezoek',
  CHATBOT_INTERACTION: 'Chatbot gesprek',
  PRODUCT_VIEW: 'Product bekeken',
  QUOTE_REQUEST: 'Offerte aangevraagd',
  COLOR_MATCHER_USE: 'Kleur matcher gebruikt',
  NEWSLETTER_SIGNUP: 'Nieuwsbrief aanmelding',
  PRODUCT_360_VIEW: '360° product bekeken',
  STYLE_CONSULTATION: 'Stijladvies gestart',
  CONSECUTIVE_DAYS: 'Loyaliteitsbonus',
};

const ACTION_ICONS = {
  FIRST_VISIT: <Star className="h-5 w-5" />,
  DAILY_VISIT: <Zap className="h-5 w-5" />,
  CHATBOT_INTERACTION: <Zap className="h-5 w-5" />,
  PRODUCT_VIEW: <Star className="h-5 w-5" />,
  QUOTE_REQUEST: <Trophy className="h-5 w-5" />,
  COLOR_MATCHER_USE: <Star className="h-5 w-5" />,
  NEWSLETTER_SIGNUP: <Gift className="h-5 w-5" />,
  PRODUCT_360_VIEW: <Star className="h-5 w-5" />,
  STYLE_CONSULTATION: <Trophy className="h-5 w-5" />,
  CONSECUTIVE_DAYS: <Trophy className="h-5 w-5" />,
};

export function GamificationNotification({ points, action, show, onHide }: NotificationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onHide]);

  if (!show) return null;

  const label = ACTION_LABELS[action as keyof typeof ACTION_LABELS] || 'Punten verdiend';
  const icon = ACTION_ICONS[action as keyof typeof ACTION_ICONS] || <Star className="h-5 w-5" />;

  return (
    <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-right-full duration-500">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg border-0 min-w-[280px]">
        <div className="p-4 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            {icon}
          </div>
          <div className="flex-1">
            <div className="font-medium text-sm">{label}</div>
            <div className="text-white/90 text-xs">+{points} punten verdiend</div>
          </div>
          <div className="text-2xl font-bold">+{points}</div>
        </div>
      </Card>
    </div>
  );
}

interface GamificationProviderProps {
  children: React.ReactNode;
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const [notification, setNotification] = useState<{
    points: number;
    action: string;
    show: boolean;
  }>({
    points: 0,
    action: '',
    show: false
  });

  const showNotification = (points: number, action: string) => {
    setNotification({ points, action, show: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return (
    <>
      {children}
      <GamificationNotification
        points={notification.points}
        action={notification.action}
        show={notification.show}
        onHide={hideNotification}
      />
    </>
  );
}