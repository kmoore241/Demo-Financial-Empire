import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
  BookOpen,
  Play,
  Clock,
  Trophy,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Brain,
  Target,
  Shield,
  Zap,
  Headphones,
} from "lucide-react";
import { mockLessonModules, mockUser } from "@/lib/data";
import { createLearningModules, type LearningModule } from "@/lib/youtubeAPI";
import VideoPlayer from "@/components/Academy/VideoPlayer";
import AdaptiveQuiz from "@/components/Academy/AdaptiveQuiz";
import {
  StudySoundtrack,
  useStudySoundtrack,
} from "@/components/StudySoundtrack";

const LMSPage = () => {
  const [lessons] = useState(mockLessonModules);
  const [enhancedModules, setEnhancedModules] = useState<LearningModule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeModule, setActiveModule] = useState<LearningModule | null>(null);
  const soundtrack = useStudySoundtrack();
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = (completedLessons / totalLessons) * 100;

  // Load enhanced modules with YouTube content
  useEffect(() => {
    const loadEnhancedContent = async () => {
      setIsLoading(true);
      try {
        const modules = await createLearningModules();
        setEnhancedModules(modules);
      } catch (error) {
        console.error("Error loading enhanced content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEnhancedContent();
  }, []);

  const learningPaths = [
    {
      title: "Beginner Trader",
      description: "Start your trading journey with fundamentals",
      lessons: 8,
      duration: "6-8 hours",
      difficulty: "beginner",
      icon: BookOpen,
      color: "from-empire-emerald-500 to-empire-emerald-600",
    },
    {
      title: "Technical Analysis Master",
      description: "Advanced chart reading and indicators",
      lessons: 12,
      duration: "10-12 hours",
      difficulty: "intermediate",
      icon: TrendingUp,
      color: "from-empire-gold-500 to-empire-gold-600",
    },
    {
      title: "Risk Management Expert",
      description: "Professional risk management strategies",
      lessons: 6,
      duration: "4-5 hours",
      difficulty: "intermediate",
      icon: Shield,
      color: "from-empire-navy-500 to-empire-navy-600",
    },
    {
      title: "Algorithmic Trading",
      description: "Build and deploy trading algorithms",
      lessons: 15,
      duration: "15-20 hours",
      difficulty: "advanced",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
    },
  ];

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      icon: Target,
      earned: true,
    },
    {
      title: "Quick Learner",
      description: "Complete 5 lessons in a week",
      icon: Zap,
      earned: true,
    },
    {
      title: "Knowledge Seeker",
      description: "Complete all beginner courses",
      icon: BookOpen,
      earned: false,
    },
    {
      title: "Master Trader",
      description: "Complete all available courses",
      icon: Trophy,
      earned: false,
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "intermediate":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Trading Academy
              </h1>
              <p className="text-muted-foreground">
                Master trading with interactive courses and expert insights
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={soundtrack.openCompact}
              className="flex items-center space-x-2"
            >
              <Headphones className="w-4 h-4" />
              <span>Study Music</span>
            </Button>
            <Badge className="bg-orange-500/20 text-orange-400">
              <Trophy className="w-3 h-3 mr-1" />
              Level {Math.floor(completedLessons / 2) + 1}
            </Badge>
          </div>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-2xl font-bold">
                    {completedLessons}/{totalLessons}
                  </p>
                </div>
                <BookOpen className="w-8 h-8 text-orange-400" />
              </div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Learning Streak
                  </p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <Star className="w-8 h-8 text-empire-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Trophy className="w-8 h-8 text-empire-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">24h</p>
                </div>
                <Clock className="w-8 h-8 text-empire-navy-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Learning Paths */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6">Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {learningPaths.map((path, index) => {
                  const Icon = path.icon;
                  return (
                    <motion.div
                      key={path.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                        <CardHeader>
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="group-hover:text-orange-400 transition-colors">
                            {path.title}
                          </CardTitle>
                          <CardDescription>{path.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">
                                {path.lessons} lessons
                              </span>
                              <Badge
                                variant="secondary"
                                className={getDifficultyColor(path.difficulty)}
                              >
                                {path.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {path.duration}
                            </div>
                            <Button className="w-full mt-4" asChild>
                              <Link to="/academy/lesson/lesson1">
                                <Play className="w-4 h-4 mr-2" />
                                Start Learning
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Recent Lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">Continue Learning</h2>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                  >
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              {lesson.completed ? (
                                <div className="w-10 h-10 bg-empire-emerald-500/20 rounded-full flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                                  <Play className="w-5 h-5 text-orange-400" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold truncate">
                                {lesson.title}
                              </h3>
                              <p className="text-sm text-muted-foreground truncate">
                                {lesson.description}
                              </p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center text-xs text-muted-foreground">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {lesson.duration} min
                                </div>
                                <Badge
                                  variant="secondary"
                                  className={getDifficultyColor(
                                    lesson.difficulty,
                                  )}
                                >
                                  {lesson.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson.completed && lesson.quiz && (
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/academy/quiz?lesson=${lesson.id}`}>
                                  <Trophy className="w-4 h-4 mr-1" />
                                  Quiz
                                </Link>
                              </Button>
                            )}
                            <Button size="sm" asChild>
                              <Link to={`/academy/lesson/${lesson.id}`}>
                                {lesson.completed ? "Review" : "Start"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5" />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className={`p-3 rounded-lg border ${
                          achievement.earned
                            ? "border-empire-gold-400/50 bg-empire-gold-500/10"
                            : "border-border/50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon
                            className={`w-6 h-6 ${
                              achievement.earned
                                ? "text-empire-gold-400"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div className="flex-1">
                            <h4
                              className={`font-medium ${
                                achievement.earned
                                  ? ""
                                  : "text-muted-foreground"
                              }`}
                            >
                              {achievement.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.earned && (
                            <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Community</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Active Learners
                    </span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Courses Completed
                    </span>
                    <span className="font-semibold">48,392</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Success Rate
                    </span>
                    <span className="font-semibold text-empire-emerald-400">
                      89.2%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Your Rank
                    </span>
                    <span className="font-semibold text-empire-gold-400">
                      #1,247
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/academy/quiz">
                      <Brain className="w-4 h-4 mr-2" />
                      Take Quiz
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/academy/certificate">
                      <Trophy className="w-4 h-4 mr-2" />
                      View Certificates
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Join Discussion
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Study Soundtrack */}
      <StudySoundtrack
        isOpen={soundtrack.isOpen}
        onClose={soundtrack.close}
        compact={soundtrack.isCompact}
      />
    </div>
  );
};

export default LMSPage;
