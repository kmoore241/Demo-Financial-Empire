import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Bell,
  ExternalLink,
  DollarSign,
  Bitcoin,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "price_spike" | "price_drop" | "whale_alert" | "news" | "system";
  severity: "high" | "medium" | "low";
  timestamp: Date;
  asset?: string;
  price?: number;
  change?: number;
  link?: string;
  autoHide?: boolean;
  persistent?: boolean;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onDismiss?: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  maxVisible?: number;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onNotificationClick,
  onDismiss,
  position = "top-right",
  maxVisible = 3,
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, maxVisible));
  }, [notifications, maxVisible]);

  const getIcon = (type: string) => {
    switch (type) {
      case "price_spike":
        return <TrendingUp className="w-5 h-5 text-empire-emerald-400" />;
      case "price_drop":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      case "whale_alert":
        return <Activity className="w-5 h-5 text-empire-gold-400" />;
      case "news":
        return <Newspaper className="w-5 h-5 text-blue-400" />;
      case "system":
        return <Bell className="w-5 h-5 text-empire-emerald-400" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-empire-gold-400" />;
    }
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500/50 bg-red-500/10 shadow-red-500/20";
      case "medium":
        return "border-empire-gold-500/50 bg-empire-gold-500/10 shadow-empire-gold-500/20";
      case "low":
        return "border-empire-emerald-500/50 bg-empire-emerald-500/10 shadow-empire-emerald-500/20";
      default:
        return "border-border/50 bg-card/50";
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      default:
        return "top-4 right-4";
    }
  };

  const handleDismiss = (id: string) => {
    if (onDismiss) {
      onDismiss(id);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <div
      className={`fixed ${getPositionStyles()} z-50 space-y-3 max-w-sm w-full`}
    >
      <AnimatePresence>
        {visibleNotifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{
              opacity: 0,
              x: position.includes("right") ? 300 : -300,
              scale: 0.8,
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{
              opacity: 0,
              x: position.includes("right") ? 300 : -300,
              scale: 0.8,
            }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Card
              className={`border backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${getSeverityStyles(
                notification.severity,
              )}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground truncate">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2 ml-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            notification.severity === "high"
                              ? "border-red-400/50 text-red-400"
                              : notification.severity === "medium"
                                ? "border-empire-gold-400/50 text-empire-gold-400"
                                : "border-empire-emerald-400/50 text-empire-emerald-400"
                          }`}
                        >
                          {notification.severity}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-background/80"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismiss(notification.id);
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    {(notification.asset || notification.price) && (
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          {notification.asset && (
                            <Badge variant="secondary" className="text-xs">
                              {notification.asset}
                            </Badge>
                          )}
                          {notification.price && (
                            <span className="text-xs font-medium">
                              ${notification.price.toLocaleString()}
                            </span>
                          )}
                          {notification.change && (
                            <span
                              className={`text-xs font-medium ${
                                notification.change > 0
                                  ? "text-empire-emerald-400"
                                  : "text-red-400"
                              }`}
                            >
                              {notification.change > 0 ? "+" : ""}
                              {notification.change.toFixed(2)}%
                            </span>
                          )}
                        </div>
                        {notification.link && (
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      {notification.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Hook for managing notifications
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">) => {
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };

      setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]); // Keep max 10 notifications

      // Auto-hide notification after delay if specified
      if (notification.autoHide !== false) {
        setTimeout(() => {
          removeNotification(newNotification.id);
        }, 8000); // 8 seconds default
      }
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

// Helper functions for creating specific notification types
export const createPriceSpikeNotification = (
  asset: string,
  price: number,
  change: number,
): Omit<Notification, "id" | "timestamp"> => ({
  title: `${asset} Price Spike!`,
  message: `${asset} has increased significantly. Current price: $${price.toLocaleString()}`,
  type: "price_spike",
  severity: change > 10 ? "high" : change > 5 ? "medium" : "low",
  asset,
  price,
  change,
  link: "/markets",
});

export const createPriceDropNotification = (
  asset: string,
  price: number,
  change: number,
): Omit<Notification, "id" | "timestamp"> => ({
  title: `${asset} Price Drop Alert`,
  message: `${asset} has dropped significantly. Current price: $${price.toLocaleString()}`,
  type: "price_drop",
  severity:
    Math.abs(change) > 10 ? "high" : Math.abs(change) > 5 ? "medium" : "low",
  asset,
  price,
  change,
  link: "/markets",
});

export const createWhaleAlertNotification = (
  asset: string,
  amount: number,
  type: "buy" | "sell",
  usdValue: number,
): Omit<Notification, "id" | "timestamp"> => ({
  title: `Whale ${type.toUpperCase()} Alert!`,
  message: `Large ${type} order detected: ${amount.toFixed(2)} ${asset} worth $${usdValue.toLocaleString()}`,
  type: "whale_alert",
  severity:
    usdValue > 10000000 ? "high" : usdValue > 1000000 ? "medium" : "low",
  asset,
  price: usdValue,
  link: "/markets",
});

export const createNewsNotification = (
  title: string,
  summary: string,
  source?: string,
): Omit<Notification, "id" | "timestamp"> => ({
  title: `Breaking: ${title}`,
  message: summary,
  type: "news",
  severity: "medium",
  link: "/markets",
});
