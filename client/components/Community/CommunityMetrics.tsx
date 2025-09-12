import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Trophy,
  BookOpen,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Crown,
  Target,
  Activity,
  MessageCircle,
  ThumbsUp,
  Share2,
  MapPin,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface CommunityStats {
  totalUsers: number;
  activeUsers: number;
  coursesCompleted: number;
  totalAchievements: number;
  avgCompletionRate: number;
  topCountries: { country: string; users: number }[];
  recentActivities: ActivityItem[];
  leaderboard: LeaderboardUser[];
}

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  type: "course" | "achievement" | "trade" | "certification";
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  coursesCompleted: number;
  achievements: number;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  badge: string;
  location?: string;
}

export const CommunityMetrics: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<CommunityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "overview" | "leaderboard" | "activity"
  >("overview");

  useEffect(() => {
    const generateCommunityStats = (): CommunityStats => {
      const baseUsers = 15847;
      const todayVariation = Math.floor(Math.random() * 200) + 50;
      const totalUsers = baseUsers + todayVariation;

      const leaderboard: LeaderboardUser[] = [
        {
          id: "1",
          name: "Alexandra Chen",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150",
          score: 24850,
          coursesCompleted: 12,
          achievements: 28,
          level: "expert",
          badge: "Trading Master",
          location: "Singapore",
        },
        {
          id: "2",
          name: "Marcus Rodriguez",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          score: 23120,
          coursesCompleted: 11,
          achievements: 24,
          level: "expert",
          badge: "Portfolio Wizard",
          location: "Mexico City",
        },
        {
          id: "3",
          name: "Sarah Kim",
          score: 22890,
          coursesCompleted: 10,
          achievements: 22,
          level: "advanced",
          badge: "Risk Manager",
          location: "Seoul",
        },
        {
          id: "4",
          name: user?.name || "Financial Trader",
          score: 18750,
          coursesCompleted: 8,
          achievements: 16,
          level: "advanced",
          badge: "Rising Star",
          location: "Global",
        },
        {
          id: "5",
          name: "David Thompson",
          score: 17230,
          coursesCompleted: 7,
          achievements: 14,
          level: "intermediate",
          badge: "Technical Analyst",
          location: "London",
        },
      ];

      const recentActivities: ActivityItem[] = [
        {
          id: "1",
          user: "Alexandra Chen",
          action: "Completed Advanced Portfolio Management",
          timestamp: "2 minutes ago",
          type: "course",
        },
        {
          id: "2",
          user: "Marcus R.",
          action: "Earned 'Options Master' achievement",
          timestamp: "5 minutes ago",
          type: "achievement",
        },
        {
          id: "3",
          user: "Sarah Kim",
          action: "Executed successful crypto arbitrage",
          timestamp: "8 minutes ago",
          type: "trade",
        },
        {
          id: "4",
          user: user?.name || "You",
          action: "Received Trading Fundamentals certification",
          timestamp: "12 minutes ago",
          type: "certification",
        },
        {
          id: "5",
          user: "David T.",
          action: "Completed Risk Management course",
          timestamp: "15 minutes ago",
          type: "course",
        },
        {
          id: "6",
          user: "Emma Wilson",
          action: "Achieved 85% win rate milestone",
          timestamp: "18 minutes ago",
          type: "achievement",
        },
        {
          id: "7",
          user: "James Lee",
          action: "Joined the Financial Empire community",
          timestamp: "22 minutes ago",
          type: "achievement",
        },
      ];

      return {
        totalUsers,
        activeUsers: Math.floor(totalUsers * 0.23),
        coursesCompleted: Math.floor(totalUsers * 3.2),
        totalAchievements: Math.floor(totalUsers * 5.8),
        avgCompletionRate: 78.5,
        topCountries: [
          { country: "United States", users: Math.floor(totalUsers * 0.28) },
          { country: "United Kingdom", users: Math.floor(totalUsers * 0.15) },
          { country: "Canada", users: Math.floor(totalUsers * 0.12) },
          { country: "Germany", users: Math.floor(totalUsers * 0.1) },
          { country: "Singapore", users: Math.floor(totalUsers * 0.08) },
        ],
        recentActivities,
        leaderboard,
      };
    };

    const loadStats = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setStats(generateCommunityStats());
      setIsLoading(false);
    };

    loadStats();

    // Update stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, [user?.name]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      case "achievement":
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case "trade":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "certification":
        return <Award className="w-4 h-4 text-purple-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "expert":
        return <Crown className="w-4 h-4 text-purple-500" />;
      case "advanced":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "intermediate":
        return <Target className="w-4 h-4 text-blue-500" />;
      default:
        return <Users className="w-4 h-4 text-green-500" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="h-32 bg-muted/50"></CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-gold-400 bg-clip-text text-transparent mb-4">
          Financial Empire Community
        </h1>
        <p className="text-muted-foreground">
          Join thousands of traders on their journey to financial independence
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-empire-emerald-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">
                {stats.totalUsers.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground">Total Members</p>
              <Badge className="mt-2 bg-empire-emerald-500/20 text-empire-emerald-400">
                +{Math.floor(Math.random() * 50 + 20)} today
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">
                {stats.activeUsers.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground">Active This Week</p>
              <Badge className="mt-2 bg-blue-500/20 text-blue-400">
                23% of total
              </Badge>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">
                {stats.coursesCompleted.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground">Courses Completed</p>
              <Progress value={stats.avgCompletionRate} className="mt-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">
                {stats.totalAchievements.toLocaleString()}
              </h3>
              <p className="text-sm text-muted-foreground">
                Achievements Earned
              </p>
              <Badge className="mt-2 bg-yellow-500/20 text-yellow-400">
                Avg. 5.8 per user
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "overview", label: "Overview", icon: Users },
          { id: "leaderboard", label: "Leaderboard", icon: Trophy },
          { id: "activity", label: "Recent Activity", icon: Activity },
        ].map((tab) => (
          <Button
            key={tab.id}
            variant={selectedTab === tab.id ? "default" : "outline"}
            onClick={() => setSelectedTab(tab.id as any)}
            className="flex items-center space-x-2"
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {selectedTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Global Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Global Reach</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                      >
                        {index + 1}
                      </Badge>
                      <span className="text-sm">{country.country}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div
                          className="bg-empire-emerald-500 h-2 rounded-full"
                          style={{
                            width: `${(country.users / stats.totalUsers) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {country.users.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Community Highlights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-empire-emerald-400">
                  This Week's Milestones
                </h4>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• 847 new certifications earned</li>
                  <li>• 1,234 courses completed</li>
                  <li>• 2,156 successful trades executed</li>
                  <li>• 89% average course satisfaction</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-empire-gold-400">
                  Upcoming Events
                </h4>
                <ul className="text-sm space-y-1 mt-2">
                  <li>• Monthly Trading Challenge (Starts in 3 days)</li>
                  <li>• Live Webinar: Market Analysis (Friday 2 PM)</li>
                  <li>• Community Q&A Session (Next Tuesday)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === "leaderboard" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Top Performers</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.leaderboard.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    user.name === (user?.name || "Financial Trader")
                      ? "bg-empire-emerald-500/10 border-empire-emerald-500/30"
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={index < 3 ? "default" : "outline"}
                      className={`w-8 h-8 rounded-full p-0 flex items-center justify-center ${
                        index === 0
                          ? "bg-yellow-500 text-yellow-900"
                          : index === 1
                            ? "bg-gray-400 text-gray-900"
                            : index === 2
                              ? "bg-orange-500 text-orange-900"
                              : ""
                      }`}
                    >
                      {index + 1}
                    </Badge>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        {getLevelIcon(user.level)}
                        <span className="capitalize">{user.level}</span>
                        <span>•</span>
                        <span>{user.badge}</span>
                        {user.location && (
                          <>
                            <span>•</span>
                            <span>{user.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-empire-emerald-400">
                      {user.score.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {user.coursesCompleted} courses • {user.achievements}{" "}
                      achievements
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedTab === "activity" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Live Activity Feed</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50"
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{activity.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <ThumbsUp className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Share2 className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommunityMetrics;
