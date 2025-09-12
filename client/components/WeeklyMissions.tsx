import { useState, useEffect } from "react";
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
  Target,
  Trophy,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  Brain,
  CheckCircle,
  Star,
  Zap,
  Shield,
  BarChart3,
  Eye,
  BookOpen,
  RefreshCw,
  Gift,
} from "lucide-react";

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: "trading" | "learning" | "portfolio" | "social" | "streak";
  difficulty: "easy" | "medium" | "hard";
  progress: number;
  target: number;
  reward: {
    type: "xp" | "coins" | "badge" | "unlock";
    amount: number;
    description: string;
  };
  timeLeft: string;
  completed: boolean;
  icon: typeof Target;
  category: string;
}

const generateWeeklyMissions = (): Mission[] => {
  const missions: Mission[] = [
    {
      id: "trade-5-times",
      title: "Active Trader",
      description: "Execute 5 successful trades this week",
      type: "trading",
      difficulty: "easy",
      progress: 3,
      target: 5,
      reward: {
        type: "coins",
        amount: 500,
        description: "500 Empire Coins",
      },
      timeLeft: "3 days",
      completed: false,
      icon: TrendingUp,
      category: "Trading",
    },
    {
      id: "profit-target",
      title: "Profit Hunter",
      description: "Achieve $1,000 profit this week",
      type: "trading",
      difficulty: "medium",
      progress: 750,
      target: 1000,
      reward: {
        type: "xp",
        amount: 1000,
        description: "1,000 XP + Profit Badge",
      },
      timeLeft: "3 days",
      completed: false,
      icon: DollarSign,
      category: "Trading",
    },
    {
      id: "complete-course",
      title: "Knowledge Seeker",
      description: "Complete 3 academy lessons",
      type: "learning",
      difficulty: "easy",
      progress: 1,
      target: 3,
      reward: {
        type: "unlock",
        amount: 1,
        description: "Unlock Advanced Strategies",
      },
      timeLeft: "3 days",
      completed: false,
      icon: BookOpen,
      category: "Learning",
    },
    {
      id: "diversify-portfolio",
      title: "Portfolio Master",
      description: "Hold positions in 6 different assets",
      type: "portfolio",
      difficulty: "medium",
      progress: 4,
      target: 6,
      reward: {
        type: "badge",
        amount: 1,
        description: "Diversification Expert Badge",
      },
      timeLeft: "3 days",
      completed: false,
      icon: BarChart3,
      category: "Portfolio",
    },
    {
      id: "daily-login",
      title: "Consistent Trader",
      description: "Login for 7 consecutive days",
      type: "streak",
      difficulty: "easy",
      progress: 5,
      target: 7,
      reward: {
        type: "coins",
        amount: 750,
        description: "750 Empire Coins + Streak Badge",
      },
      timeLeft: "3 days",
      completed: false,
      icon: Star,
      category: "Engagement",
    },
    {
      id: "risk-management",
      title: "Risk Controller",
      description: "Use stop-loss orders on 5 trades",
      type: "trading",
      difficulty: "medium",
      progress: 2,
      target: 5,
      reward: {
        type: "xp",
        amount: 800,
        description: "800 XP + Risk Manager Badge",
      },
      timeLeft: "3 days",
      completed: false,
      icon: Shield,
      category: "Risk Management",
    },
    {
      id: "analyzer",
      title: "Technical Analyst",
      description: "Analyze 10 charts using technical indicators",
      type: "trading",
      difficulty: "hard",
      progress: 7,
      target: 10,
      reward: {
        type: "unlock",
        amount: 1,
        description: "Unlock Pro Analysis Tools",
      },
      timeLeft: "3 days",
      completed: false,
      icon: Eye,
      category: "Analysis",
    },
  ];

  // Randomly mark some as completed for demo
  missions.forEach((mission) => {
    if (Math.random() > 0.7) {
      mission.completed = true;
      mission.progress = mission.target;
    }
  });

  return missions;
};

interface WeeklyMissionsProps {
  className?: string;
  compact?: boolean;
}

export const WeeklyMissions: React.FC<WeeklyMissionsProps> = ({
  className = "",
  compact = false,
}) => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setMissions(generateWeeklyMissions());
  }, []);

  const handleRefreshMissions = () => {
    setRefreshing(true);
    setTimeout(() => {
      setMissions(generateWeeklyMissions());
      setRefreshing(false);
    }, 1000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "medium":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "hard":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case "xp":
        return <Zap className="w-4 h-4" />;
      case "coins":
        return <DollarSign className="w-4 h-4" />;
      case "badge":
        return <Trophy className="w-4 h-4" />;
      case "unlock":
        return <Gift className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const categories = [
    "all",
    ...Array.from(new Set(missions.map((m) => m.category))),
  ];

  const filteredMissions = missions.filter(
    (mission) =>
      selectedCategory === "all" || mission.category === selectedCategory,
  );

  const completedCount = missions.filter((m) => m.completed).length;
  const totalMissions = missions.length;
  const weeklyProgress = (completedCount / totalMissions) * 100;

  if (compact) {
    return (
      <Card
        className={`border-border/50 bg-card/50 backdrop-blur-sm ${className}`}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Target className="w-5 h-5 text-empire-emerald-400" />
              <span>Weekly Missions</span>
            </CardTitle>
            <Badge
              variant="outline"
              className="bg-empire-emerald-500/20 text-empire-emerald-400"
            >
              {completedCount}/{totalMissions}
            </Badge>
          </div>
          <Progress value={weeklyProgress} className="h-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredMissions.slice(0, 3).map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-lg border transition-all ${
                mission.completed
                  ? "border-empire-emerald-400/30 bg-empire-emerald-500/10"
                  : "border-border/50 hover:border-empire-emerald-400/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    mission.completed ? "bg-empire-emerald-500/20" : "bg-muted"
                  }`}
                >
                  {mission.completed ? (
                    <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                  ) : (
                    <mission.icon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">
                      {mission.title}
                    </h4>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDifficultyColor(mission.difficulty)}`}
                    >
                      {mission.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {mission.description}
                  </p>
                  {!mission.completed && (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex-1 mr-2">
                        <Progress
                          value={(mission.progress / mission.target) * 100}
                          className="h-1"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {mission.progress}/{mission.target}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <Target className="w-4 h-4 mr-2" />
            View All Missions
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
              Weekly Missions
            </h2>
            <p className="text-muted-foreground">
              Complete missions to earn rewards and level up
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Badge
            variant="outline"
            className="bg-empire-emerald-500/20 text-empire-emerald-400"
          >
            {completedCount}/{totalMissions} Complete
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshMissions}
            disabled={refreshing}
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Weekly Progress</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(weeklyProgress)}%
              </span>
            </div>
            <Progress value={weeklyProgress} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-empire-emerald-400">
                  {completedCount}
                </div>
                <div className="text-xs text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-empire-gold-400">
                  {missions.filter((m) => !m.completed).length}
                </div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <div className="text-lg font-bold text-empire-navy-400">
                  2,850
                </div>
                <div className="text-xs text-muted-foreground">Total XP</div>
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
            {category === "all" ? "All Missions" : category}
          </Button>
        ))}
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card
                className={`border transition-all duration-300 h-full ${
                  mission.completed
                    ? "border-empire-emerald-400/50 bg-empire-emerald-500/5 shadow-lg"
                    : "border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:border-empire-emerald-400/50"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          mission.completed
                            ? "bg-empire-emerald-500/20"
                            : "bg-muted"
                        }`}
                      >
                        {mission.completed ? (
                          <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                        ) : (
                          <mission.icon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {mission.title}
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getDifficultyColor(mission.difficulty)}`}
                        >
                          {mission.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {mission.timeLeft}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{mission.description}</CardDescription>

                  {!mission.completed && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          {mission.progress}/{mission.target}
                        </span>
                      </div>
                      <Progress
                        value={(mission.progress / mission.target) * 100}
                        className="h-2"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {getRewardIcon(mission.reward.type)}
                      <span className="text-sm font-medium">Reward</span>
                    </div>
                    <span className="text-sm text-empire-gold-400">
                      {mission.reward.description}
                    </span>
                  </div>

                  <Badge variant="secondary" className="w-full justify-center">
                    {mission.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeeklyMissions;
