import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Bug,
  Lightbulb,
  X,
  ExternalLink,
  Heart,
  Zap,
  Star,
} from "lucide-react";

export const FeedbackBox: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const feedbackOptions = [
    {
      id: "bug",
      title: "Report Bug",
      description: "Found something broken?",
      icon: Bug,
      color: "text-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
      url: "https://tally.so/r/n9Zxyz",
    },
    {
      id: "feature",
      title: "Suggest Feature",
      description: "Have an idea to improve?",
      icon: Lightbulb,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 hover:bg-yellow-100",
      url: "https://tally.so/r/w5x9yz",
    },
    {
      id: "feedback",
      title: "General Feedback",
      description: "Share your thoughts",
      icon: MessageCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      url: "https://tally.so/r/mR8xPQ",
    },
    {
      id: "love",
      title: "Show Love",
      description: "Enjoying the platform?",
      icon: Heart,
      color: "text-pink-500",
      bgColor: "bg-pink-50 hover:bg-pink-100",
      url: "https://tally.so/r/love-fe",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-3"
          >
            <Card className="w-80 shadow-2xl border-2 border-empire-emerald-200 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">Help us improve!</h4>
                      <p className="text-xs text-muted-foreground">
                        Your feedback shapes Financial Empire
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {feedbackOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.a
                        key={option.id}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${option.bgColor} border border-transparent hover:border-current/20`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className={`w-5 h-5 ${option.color}`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{option.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {option.description}
                          </p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Built with 💚 by Financial Empire
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsVisible(false)}
                      className="text-xs h-6 px-2"
                    >
                      Hide
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 500, damping: 25 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${
            isExpanded
              ? "bg-empire-emerald-600 hover:bg-empire-emerald-700"
              : "bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700"
          }`}
        >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 text-white" />
            )}
          </motion.div>
        </Button>
      </motion.div>

      {/* Pulsing indicator */}
      {!isExpanded && (
        <motion.div
          className="absolute inset-0 rounded-full bg-empire-emerald-400 opacity-30"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

export default FeedbackBox;
