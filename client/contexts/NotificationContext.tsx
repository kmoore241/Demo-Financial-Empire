import React, { createContext, useContext, ReactNode } from "react";
import {
  NotificationSystem,
  useNotifications,
  Notification,
  createPriceSpikeNotification,
  createPriceDropNotification,
  createWhaleAlertNotification,
  createNewsNotification,
} from "@/components/NotificationSystem";
import { useNavigate } from "react-router-dom";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  addPriceAlert: (asset: string, price: number, change: number) => void;
  addWhaleAlert: (
    asset: string,
    amount: number,
    type: "buy" | "sell",
    usdValue: number,
  ) => void;
  addNewsAlert: (title: string, summary: string, source?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useNotifications();

  const addPriceAlert = (asset: string, price: number, change: number) => {
    if (Math.abs(change) > 5) {
      // Only alert for significant changes
      const notification =
        change > 0
          ? createPriceSpikeNotification(asset, price, change)
          : createPriceDropNotification(asset, price, change);
      addNotification(notification);
    }
  };

  const addWhaleAlert = (
    asset: string,
    amount: number,
    type: "buy" | "sell",
    usdValue: number,
  ) => {
    if (usdValue > 500000) {
      // Only alert for large transactions
      const notification = createWhaleAlertNotification(
        asset,
        amount,
        type,
        usdValue,
      );
      addNotification(notification);
    }
  };

  const addNewsAlert = (title: string, summary: string, source?: string) => {
    const notification = createNewsNotification(title, summary, source);
    addNotification(notification);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const value: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    addPriceAlert,
    addWhaleAlert,
    addNewsAlert,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationSystem
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onDismiss={removeNotification}
        maxVisible={3}
      />
    </NotificationContext.Provider>
  );
};
