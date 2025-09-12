import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Star,
  Target,
  Crown,
  Shield,
  Zap,
  TrendingUp,
  DollarSign,
  Brain,
  BookOpen,
  Users,
  CheckCircle,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "trading" | "learning" | "social" | "milestone" | "special";
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  progress: number;
  target: number;
  completed: boolean;
  unlockedAt?: Date;
  rewards: {
    xp: number;
    coins: number;
    title?: string;
  };
  icon: typeof Trophy;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const mockAchievements: Achievement[] = [
  {
    id: "first-trade",
    title: "First Steps",
    description: "Execute your first successful trade",
    category: "trading",
    tier: "bronze",
    progress: 1,
    target: 1,
    completed: true,
    unlockedAt: new Date(),
    rewards: { xp: 100, coins: 50 },
    icon: Target,
    rarity: "common",
  },
  {
    id: "profit-maker",
    title: "Profit Maker",
    description: "Achieve $10,000 in total profits",
    category: "trading",
    tier: "silver",
    progress: 7500,
    target: 10000,
    completed: false,
    rewards: { xp: 500, coins: 250, title: "Profit Master" },
    icon: DollarSign,
    rarity: "rare",
  },
  {
    id: "speed-learner",
    title: "Speed Learner",
    description: "Complete 10 academy lessons in one day",
    category: "learning",
    tier: "gold",
    progress: 8,
    target: 10,
    completed: false,
    rewards: { xp: 1000, coins: 500, title: "Quick Mind" },
    icon: Brain,
    rarity: "epic",
  },
  {
    id: "trading-legend",
    title: "Trading Legend",
    description: "Achieve 90% win rate over 100 trades",
    category: "trading",
    tier: "platinum",
    progress: 85,
    target: 100,
    completed: false,
    rewards: { xp: 2000, coins: 1000, title: "Market Wizard" },
    icon: Crown,
    rarity: "legendary",
  },
  {
    id: "risk-master",
    title: "Risk Master",
    description: "Use stop-loss orders on 50 consecutive trades",
    category: "trading",
    tier: "gold",
    progress: 45,
    target: 50,
    completed: false,
    rewards: { xp: 800, coins: 400, title: "Risk Controller" },
    icon: Shield,
    rarity: "epic",
  },
  {
    id: "knowledge-seeker",
    title: "Knowledge Seeker",
    description: "Complete all available academy courses",
    category: "learning",
    tier: "diamond",
    progress: 12,
    target: 15,
    completed: false,
    rewards: { xp: 3000, coins: 1500, title: "Master Scholar" },
    icon: BookOpen,
    rarity: "legendary",
  },
];

// Confetti component
const ConfettiParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    initial={{ opacity: 0, scale: 0, y: 0 }}
    animate={{
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      y: [0, -100, -200, -300],
      x: [0, Math.random() * 200 - 100],
      rotate: [0, 360],
    }}
    transition={{
      duration: 3,
      delay,
      ease: "easeOut",
    }}
  />
);

const Confetti = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <ConfettiParticle key={i} delay={i * 0.1} />
      ))}
    </div>
  );
};

// Victory sound effect (using audio context for better performance)
const useVictorySound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playVictorySound = () => {
    if (!soundEnabled) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Victory melody sequence
      const notes = [
        { freq: 523.25, duration: 0.2 }, // C5
        { freq: 659.25, duration: 0.2 }, // E5
        { freq: 783.99, duration: 0.2 }, // G5
        { freq: 1046.5, duration: 0.4 }, // C6
      ];

      let currentTime = ctx.currentTime;

      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.frequency.setValueAtTime(note.freq, currentTime);
        osc.type = "triangle";

        gain.gain.setValueAtTime(0, currentTime);
        gain.gain.linearRampToValueAtTime(0.3, currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(
          0.01,
          currentTime + note.duration,
        );

        osc.start(currentTime);
        osc.stop(currentTime + note.duration);

        currentTime += note.duration;
      });
    } catch (error) {
      console.log("Audio not available");
    }
  };

  return { playVictorySound, soundEnabled, setSoundEnabled };
};

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
}

const AchievementNotification: React.FC<AchievementNotificationProps> = ({
  achievement,
  onClose,
}) => {
  const { playVictorySound, soundEnabled, setSoundEnabled } = useVictorySound();

  useEffect(() => {
    playVictorySound();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "from-amber-600 to-amber-700";
      case "silver":
        return "from-gray-400 to-gray-500";
      case "gold":
        return "from-yellow-400 to-yellow-500";
      case "platinum":
        return "from-gray-300 to-gray-400";
      case "diamond":
        return "from-cyan-400 to-blue-500";
      default:
        return "from-gray-400 to-gray-500";
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400";
      case "rare":
        return "text-blue-400";
      case "epic":
        return "text-purple-400";
      case "legendary":
        return "text-orange-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -50 }}
      className="fixed top-4 right-4 z-50 max-w-sm"
    >
      <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full bg-gradient-to-br ${getTierColor(
                  achievement.tier,
                )} flex items-center justify-center`}
              >
                <achievement.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-yellow-700 dark:text-yellow-300">
                  Achievement Unlocked!
                </CardTitle>
                <Badge
                  variant="outline"
                  className={`text-xs ${getRarityColor(achievement.rarity)}`}
                >
                  {achievement.rarity}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="h-6 w-6 p-0"
              >
                {soundEnabled ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-yellow-800 dark:text-yellow-200">
              {achievement.title}
            </h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {achievement.description}
            </p>
          </div>
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Rewards:</span>
              <div className="flex items-center space-x-3">
                <span className="text-blue-600 dark:text-blue-400">
                  +{achievement.rewards.xp} XP
                </span>
                <span className="text-green-600 dark:text-green-400">
                  +{achievement.rewards.coins} coins
                </span>
                {achievement.rewards.title && (
                  <Badge variant="secondary" className="text-xs">
                    {achievement.rewards.title}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface AchievementSystemProps {
  className?: string;
  compact?: boolean;
}

export const AchievementSystem: React.FC<AchievementSystemProps> = ({
  className = "",
  compact = false,
}) => {
  const [achievements, setAchievements] =
    useState<Achievement[]>(mockAchievements);
  const [showNotification, setShowNotification] = useState<Achievement | null>(
    null,
  );
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Simulate achievement completion
  const triggerAchievement = (achievementId: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === achievementId && !achievement.completed) {
          const completed = {
            ...achievement,
            completed: true,
            unlockedAt: new Date(),
          };
          setShowNotification(completed);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
          setTimeout(() => setShowNotification(null), 5000);
          return completed;
        }
        return achievement;
      }),
    );
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "bronze":
        return "border-amber-600/50 bg-amber-500/10";
      case "silver":
        return "border-gray-400/50 bg-gray-500/10";
      case "gold":
        return "border-yellow-400/50 bg-yellow-500/10";
      case "platinum":
        return "border-gray-300/50 bg-gray-300/10";
      case "diamond":
        return "border-cyan-400/50 bg-cyan-500/10";
      default:
        return "border-border/50 bg-card/50";
    }
  };

  const categories = [
    "all",
    "trading",
    "learning",
    "social",
    "milestone",
    "special",
  ];
  const filteredAchievements = achievements.filter(
    (achievement) =>
      selectedCategory === "all" || achievement.category === selectedCategory,
  );

  const completedCount = achievements.filter((a) => a.completed).length;
  const totalAchievements = achievements.length;
  const completionRate = (completedCount / totalAchievements) * 100;

  if (compact) {
    return (
      <Card
        className={`border-border/50 bg-card/50 backdrop-blur-sm ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>Achievements</span>
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-yellow-500/20 text-yellow-600"
            >
              {completedCount}/{totalAchievements}
            </Badge>
          </div>
          <Progress value={completionRate} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredAchievements.slice(0, 3).map((achievement) => (
            <div
              key={achievement.id}
              className={`p-3 rounded-lg border transition-all ${
                achievement.completed
                  ? getTierColor(achievement.tier)
                  : "border-border/50 hover:border-yellow-400/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    achievement.completed ? "bg-yellow-500/20" : "bg-muted"
                  }`}
                >
                  {achievement.completed ? (
                    <CheckCircle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <achievement.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {achievement.description}
                  </p>
                  {!achievement.completed && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex-1 mr-2">
                        <Progress
                          value={
                            (achievement.progress / achievement.target) * 100
                          }
                          className="h-1"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {achievement.progress}/{achievement.target}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => triggerAchievement("profit-maker")}
          >
            <Trophy className="w-4 h-4 mr-2" />
            View All Achievements
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Achievement Center
            </h2>
            <p className="text-muted-foreground">
              Track your trading milestones and unlock rewards
            </p>
          </div>
        </div>
        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-600">
          {completedCount}/{totalAchievements} Unlocked
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(completionRate)}%
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-yellow-500">
                  {
                    achievements.filter((a) => a.completed && a.tier === "gold")
                      .length
                  }
                </div>
                <div className="text-xs text-muted-foreground">Gold</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-gray-400">
                  {
                    achievements.filter(
                      (a) => a.completed && a.tier === "silver",
                    ).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">Silver</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-amber-600">
                  {
                    achievements.filter(
                      (a) => a.completed && a.tier === "bronze",
                    ).length
                  }
                </div>
                <div className="text-xs text-muted-foreground">Bronze</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">
                  {achievements.filter((a) => a.rarity === "legendary").length}
                </div>
                <div className="text-xs text-muted-foreground">Legendary</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === "all" ? "All Achievements" : category}
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() =>
                !achievement.completed && triggerAchievement(achievement.id)
              }
            >
              <Card
                className={`border transition-all duration-300 h-full ${
                  achievement.completed
                    ? `${getTierColor(achievement.tier)} shadow-lg`
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-yellow-400/50"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          achievement.completed
                            ? "bg-yellow-500/20"
                            : "bg-muted"
                        }`}
                      >
                        {achievement.completed ? (
                          <CheckCircle className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <achievement.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {achievement.title}
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs capitalize ${getTierColor(achievement.tier)}`}
                          >
                            {achievement.tier}
                          </Badge>
                          <Badge
                            variant="secondary"
                            className="text-xs capitalize"
                          >
                            {achievement.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{achievement.description}</CardDescription>

                  {!achievement.completed && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <Progress
                        value={
                          (achievement.progress / achievement.target) * 100
                        }
                        className="h-2"
                      />
                    </div>
                  )}

                  {achievement.completed && achievement.unlockedAt && (
                    <div className="text-xs text-muted-foreground">
                      Unlocked: {achievement.unlockedAt.toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium">Rewards</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-blue-400">
                        {achievement.rewards.xp} XP
                      </span>
                      <span className="text-green-400">
                        {achievement.rewards.coins} coins
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Achievement Notification */}
      <AnimatePresence>
        {showNotification && (
          <AchievementNotification
            achievement={showNotification}
            onClose={() => setShowNotification(null)}
          />
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      <Confetti show={showConfetti} />
    </div>
  );
};

export default AchievementSystem;
