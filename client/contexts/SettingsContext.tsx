import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  trading: boolean;
  news: boolean;
  security: boolean;
}

export interface TradingSettings {
  autoTrade: boolean;
  riskLevel: "low" | "medium" | "high";
  maxDailyLoss: string;
  confirmOrders: boolean;
  soundAlerts: boolean;
  defaultCurrency: "usd" | "eur" | "btc" | "eth";
}

export interface AppearanceSettings {
  darkMode: boolean;
  colorScheme: "empire-green" | "royal-gold" | "navy-blue";
  chartStyle: "candlestick" | "line" | "area" | "ohlc";
  fontSize: "small" | "medium" | "large" | "extra-large";
}

export interface SettingsContextType {
  notifications: NotificationSettings;
  trading: TradingSettings;
  appearance: AppearanceSettings;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updateTrading: (settings: Partial<TradingSettings>) => void;
  updateAppearance: (settings: Partial<AppearanceSettings>) => void;
  resetToDefaults: () => void;
  exportSettings: () => string;
  importSettings: (settingsJson: string) => boolean;
}

const defaultNotifications: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  trading: true,
  news: true,
  security: true,
};

const defaultTrading: TradingSettings = {
  autoTrade: false,
  riskLevel: "medium",
  maxDailyLoss: "1000",
  confirmOrders: true,
  soundAlerts: true,
  defaultCurrency: "usd",
};

const defaultAppearance: AppearanceSettings = {
  darkMode: true,
  colorScheme: "empire-green",
  chartStyle: "candlestick",
  fontSize: "medium",
};

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] =
    useState<NotificationSettings>(defaultNotifications);
  const [trading, setTrading] = useState<TradingSettings>(defaultTrading);
  const [appearance, setAppearance] =
    useState<AppearanceSettings>(defaultAppearance);

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedNotifications = localStorage.getItem(
          "fe-notifications-settings",
        );
        const savedTrading = localStorage.getItem("fe-trading-settings");
        const savedAppearance = localStorage.getItem("fe-appearance-settings");

        if (savedNotifications) {
          setNotifications({
            ...defaultNotifications,
            ...JSON.parse(savedNotifications),
          });
        }
        if (savedTrading) {
          setTrading({ ...defaultTrading, ...JSON.parse(savedTrading) });
        }
        if (savedAppearance) {
          setAppearance({
            ...defaultAppearance,
            ...JSON.parse(savedAppearance),
          });
        }
      } catch (error) {
        console.error("Failed to load settings from localStorage:", error);
      }
    };

    loadSettings();
  }, []);

  // Apply appearance settings to document
  useEffect(() => {
    const applyAppearanceSettings = () => {
      const root = document.documentElement;

      // Apply dark mode
      if (appearance.darkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      // Apply color scheme
      root.setAttribute("data-color-scheme", appearance.colorScheme);

      // Apply font size
      root.setAttribute("data-font-size", appearance.fontSize);
    };

    applyAppearanceSettings();
  }, [appearance]);

  const updateNotifications = (newSettings: Partial<NotificationSettings>) => {
    const updated = { ...notifications, ...newSettings };
    setNotifications(updated);
    localStorage.setItem("fe-notifications-settings", JSON.stringify(updated));
  };

  const updateTrading = (newSettings: Partial<TradingSettings>) => {
    const updated = { ...trading, ...newSettings };
    setTrading(updated);
    localStorage.setItem("fe-trading-settings", JSON.stringify(updated));
  };

  const updateAppearance = (newSettings: Partial<AppearanceSettings>) => {
    const updated = { ...appearance, ...newSettings };
    setAppearance(updated);
    localStorage.setItem("fe-appearance-settings", JSON.stringify(updated));
  };

  const resetToDefaults = () => {
    setNotifications(defaultNotifications);
    setTrading(defaultTrading);
    setAppearance(defaultAppearance);

    localStorage.removeItem("fe-notifications-settings");
    localStorage.removeItem("fe-trading-settings");
    localStorage.removeItem("fe-appearance-settings");
  };

  const exportSettings = () => {
    const allSettings = {
      notifications,
      trading,
      appearance,
      exportDate: new Date().toISOString(),
      version: "1.0",
    };
    return JSON.stringify(allSettings, null, 2);
  };

  const importSettings = (settingsJson: string) => {
    try {
      const parsed = JSON.parse(settingsJson);

      if (parsed.notifications) {
        updateNotifications(parsed.notifications);
      }
      if (parsed.trading) {
        updateTrading(parsed.trading);
      }
      if (parsed.appearance) {
        updateAppearance(parsed.appearance);
      }

      return true;
    } catch (error) {
      console.error("Failed to import settings:", error);
      return false;
    }
  };

  const value: SettingsContextType = {
    notifications,
    trading,
    appearance,
    updateNotifications,
    updateTrading,
    updateAppearance,
    resetToDefaults,
    exportSettings,
    importSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Hook for components that need to react to specific setting changes
export const useNotificationSettings = () => {
  const { notifications, updateNotifications } = useSettings();
  return { notifications, updateNotifications };
};

export const useTradingSettings = () => {
  const { trading, updateTrading } = useSettings();
  return { trading, updateTrading };
};

export const useAppearanceSettings = () => {
  const { appearance, updateAppearance } = useSettings();
  return { appearance, updateAppearance };
};
