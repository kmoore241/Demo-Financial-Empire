import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Lock,
  Trophy,
  BookOpen,
  TrendingUp,
  Star,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

interface AccessGateProps {
  feature: string;
  requiredProgress?: number;
  requiredCourses?: number;
  requiredQuizzes?: number;
  customRequirement?: (user: any) => boolean;
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  unlockPath?: string;
}

export const AccessGate: React.FC<AccessGateProps> = ({
  feature,
  requiredProgress = 0,
  requiredCourses = 0,
  requiredQuizzes = 0,
  customRequirement,
  children,
  fallbackTitle,
  fallbackDescription,
  unlockPath = "/academy",
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Authentication Required
            </h3>
            <p className="text-muted-foreground mb-4">
              Please sign in to access this feature
            </p>
            <div className="space-x-2">
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userProgress = user?.progress?.percent || 0;
  const userCourses = user?.progress?.coursesCompleted || 0;
  const userQuizzes = user?.progress?.quizzesCompleted || 0;

  // Check requirements
  const progressMet = userProgress >= requiredProgress;
  const coursesMet = userCourses >= requiredCourses;
  const quizzesMet = userQuizzes >= requiredQuizzes;
  const customMet = customRequirement ? customRequirement(user) : true;

  const isUnlocked = progressMet && coursesMet && quizzesMet && customMet;

  if (isUnlocked) {
    return <>{children}</>;
  }

  // Feature is locked - show unlock requirements
  const requirements = [
    {
      id: "progress",
      label: "Academy Progress",
      current: userProgress,
      required: requiredProgress,
      met: progressMet,
      icon: BookOpen,
      unit: "%",
    },
    {
      id: "courses",
      label: "Courses Completed",
      current: userCourses,
      required: requiredCourses,
      met: coursesMet,
      icon: Trophy,
      unit: "",
    },
    {
      id: "quizzes",
      label: "Quizzes Passed",
      current: userQuizzes,
      required: requiredQuizzes,
      met: quizzesMet,
      icon: Star,
      unit: "",
    },
  ].filter((req) => req.required > 0);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-dashed border-empire-gold-300 bg-empire-gold-50/30">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {fallbackTitle || `${feature} Locked`}
            </CardTitle>
            <p className="text-muted-foreground">
              {fallbackDescription ||
                `Complete the requirements below to unlock ${feature}`}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Requirements List */}
            <div className="space-y-4">
              {requirements.map((req) => {
                const Icon = req.icon;
                return (
                  <div
                    key={req.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      req.met
                        ? "bg-green-50 border-green-200"
                        : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          req.met
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {req.met ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{req.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {req.current}
                          {req.unit} / {req.required}
                          {req.unit}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={req.met ? "default" : "outline"}
                      className={
                        req.met
                          ? "bg-green-500 text-white"
                          : "text-muted-foreground"
                      }
                    >
                      {req.met ? "Complete" : "Required"}
                    </Badge>
                  </div>
                );
              })}
            </div>

            {/* Progress Visualization */}
            {requiredProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>
                    {userProgress}% / {requiredProgress}%
                  </span>
                </div>
                <Progress
                  value={userProgress}
                  className="h-2"
                  max={requiredProgress}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button asChild className="flex-1">
                <Link to={unlockPath} className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Continue Learning</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>

            {/* Motivational Message */}
            <div className="text-center p-4 bg-empire-emerald-50 rounded-lg border border-empire-emerald-200">
              <TrendingUp className="w-6 h-6 text-empire-emerald-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-empire-emerald-800">
                Keep learning to unlock advanced trading features!
              </p>
              <p className="text-xs text-empire-emerald-600 mt-1">
                Each lesson brings you closer to becoming a trading expert
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AccessGate;
