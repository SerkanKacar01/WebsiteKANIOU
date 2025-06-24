import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Gift, 
  Target, 
  Award, 
  Crown,
  Zap,
  CheckCircle,
  Lock,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  category: 'interaction' | 'purchase' | 'social' | 'exploration';
}

interface UserRewards {
  totalPoints: number;
  level: number;
  currentLevelProgress: number;
  nextLevelThreshold: number;
  achievements: Achievement[];
  availableRewards: Reward[];
  streak: number;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'freebie' | 'premium' | 'exclusive';
  available: boolean;
  claimed: boolean;
}

export function RewardsSystem() {
  const [userRewards, setUserRewards] = useState<UserRewards>({
    totalPoints: 1250,
    level: 3,
    currentLevelProgress: 250,
    nextLevelThreshold: 500,
    streak: 7,
    achievements: [
      {
        id: 'first_visit',
        title: 'Eerste Bezoek',
        description: 'Welkom bij KANIOU!',
        icon: <Star className="h-5 w-5" />,
        points: 50,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        category: 'interaction'
      },
      {
        id: 'contact_interaction',
        title: 'Contact Gemaakt',
        description: 'Gebruik het contactformulier',
        icon: <Zap className="h-5 w-5" />,
        points: 100,
        unlocked: true,
        progress: 3,
        maxProgress: 3,
        category: 'interaction'
      },
      {
        id: 'product_explorer',
        title: 'Product Ontdekker',
        description: 'Bekijk 10 verschillende producten',
        icon: <Target className="h-5 w-5" />,
        points: 200,
        unlocked: false,
        progress: 7,
        maxProgress: 10,
        category: 'exploration'
      },
      {
        id: 'quote_request',
        title: 'Offerte Aanvraag',
        description: 'Vraag je eerste offerte aan',
        icon: <Award className="h-5 w-5" />,
        points: 300,
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        category: 'interaction'
      },
      {
        id: 'style_consultant',
        title: 'Stijl Consultant',
        description: 'Gebruik de kleur matcher tool',
        icon: <Sparkles className="h-5 w-5" />,
        points: 150,
        unlocked: false,
        progress: 0,
        maxProgress: 1,
        category: 'exploration'
      },
      {
        id: 'loyalty_champion',
        title: 'Loyaliteit Kampioen',
        description: 'Bezoek 7 dagen op rij',
        icon: <Crown className="h-5 w-5" />,
        points: 500,
        unlocked: true,
        progress: 7,
        maxProgress: 7,
        category: 'interaction'
      }
    ],
    availableRewards: [
      {
        id: 'discount_5',
        title: '5% Korting',
        description: 'Op je volgende aankoop',
        pointsCost: 500,
        type: 'discount',
        available: true,
        claimed: false
      },
      {
        id: 'free_consultation',
        title: 'Gratis Thuisadvies',
        description: 'Persoonlijk kleurenadvies',
        pointsCost: 800,
        type: 'freebie',
        available: true,
        claimed: false
      },
      {
        id: 'discount_10',
        title: '10% Korting',
        description: 'Op je volgende aankoop',
        pointsCost: 1000,
        type: 'discount',
        available: true,
        claimed: false
      },
      {
        id: 'premium_samples',
        title: 'Premium Staalkaart',
        description: 'Exclusieve materiaalstalen',
        pointsCost: 1200,
        type: 'premium',
        available: true,
        claimed: false
      },
      {
        id: 'vip_access',
        title: 'VIP Toegang',
        description: 'Exclusieve collectie preview',
        pointsCost: 2000,
        type: 'exclusive',
        available: false,
        claimed: false
      }
    ]
  });

  const [selectedTab, setSelectedTab] = useState<'achievements' | 'rewards'>('achievements');

  const getLevelName = (level: number) => {
    const levels = [
      'Nieuwkomer',
      'Ontdekker', 
      'Kenner',
      'Expert',
      'Meester',
      'Legende'
    ];
    return levels[Math.min(level - 1, levels.length - 1)] || 'Legende';
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'bg-blue-100 text-blue-800';
      case 'freebie': return 'bg-green-100 text-green-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'exclusive': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const claimReward = (rewardId: string) => {
    setUserRewards(prev => ({
      ...prev,
      totalPoints: prev.totalPoints - prev.availableRewards.find(r => r.id === rewardId)!.pointsCost,
      availableRewards: prev.availableRewards.map(reward =>
        reward.id === rewardId ? { ...reward, claimed: true } : reward
      )
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">KANIOU Beloningssysteem</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Verdien punten door onze website te verkennen en beloon jezelf met exclusieve voordelen
        </p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="text-2xl font-bold">{userRewards.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Totaal Punten</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Crown className="h-6 w-6 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">Niveau {userRewards.level}</div>
            <div className="text-sm text-muted-foreground">{getLevelName(userRewards.level)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">{userRewards.streak}</div>
            <div className="text-sm text-muted-foreground">Dagen Streak</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-green-500" />
            </div>
            <div className="text-2xl font-bold">
              {userRewards.achievements.filter(a => a.unlocked).length}
            </div>
            <div className="text-sm text-muted-foreground">Prestaties</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Niveau Voortgang</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Niveau {userRewards.level} - {getLevelName(userRewards.level)}</span>
            <span className="text-sm text-muted-foreground">
              {userRewards.currentLevelProgress} / {userRewards.nextLevelThreshold} punten
            </span>
          </div>
          <Progress 
            value={(userRewards.currentLevelProgress / userRewards.nextLevelThreshold) * 100} 
            className="h-3"
          />
          <div className="text-sm text-muted-foreground mt-2">
            Nog {userRewards.nextLevelThreshold - userRewards.currentLevelProgress} punten tot niveau {userRewards.level + 1}
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-2 mb-6">
        <Button
          variant={selectedTab === 'achievements' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('achievements')}
        >
          <Trophy className="h-4 w-4 mr-2" />
          Prestaties
        </Button>
        <Button
          variant={selectedTab === 'rewards' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('rewards')}
        >
          <Gift className="h-4 w-4 mr-2" />
          Beloningen
        </Button>
      </div>

      {/* Achievements Tab */}
      {selectedTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRewards.achievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={cn(
                "transition-all duration-200",
                achievement.unlocked 
                  ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200" 
                  : "bg-gray-50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    achievement.unlocked ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"
                  )}>
                    {achievement.unlocked ? achievement.icon : <Lock className="h-5 w-5" />}
                  </div>
                  <div className="text-right">
                    <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                      +{achievement.points} punten
                    </Badge>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Voortgang</span>
                    <span>{achievement.progress} / {achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100}
                    className="h-2"
                  />
                </div>
                
                {achievement.unlocked && (
                  <div className="flex items-center mt-3 text-green-600">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Voltooid!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Rewards Tab */}
      {selectedTab === 'rewards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRewards.availableRewards.map((reward) => (
            <Card 
              key={reward.id}
              className={cn(
                "transition-all duration-200",
                !reward.available && "opacity-50",
                reward.claimed && "bg-gray-50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getRewardTypeColor(reward.type)}>
                    {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                  </Badge>
                  <div className="text-right">
                    <div className="text-lg font-bold">{reward.pointsCost}</div>
                    <div className="text-sm text-muted-foreground">punten</div>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-1">{reward.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                
                <Button
                  className="w-full"
                  disabled={
                    !reward.available || 
                    reward.claimed || 
                    userRewards.totalPoints < reward.pointsCost
                  }
                  onClick={() => claimReward(reward.id)}
                >
                  {reward.claimed ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Ingewisseld
                    </>
                  ) : !reward.available ? (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Nog niet beschikbaar
                    </>
                  ) : userRewards.totalPoints < reward.pointsCost ? (
                    `${reward.pointsCost - userRewards.totalPoints} punten tekort`
                  ) : (
                    <>
                      <Gift className="h-4 w-4 mr-2" />
                      Inwisselen
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}