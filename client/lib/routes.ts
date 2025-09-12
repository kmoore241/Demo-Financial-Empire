// Route configuration for code splitting optimization
import { lazy } from "react";

// Group related routes for better code splitting
export const coreRoutes = {
  Index: () => import("../pages/Index"),
  Dashboard: () => import("../pages/Dashboard"),
  NotFound: () => import("../pages/NotFound"),
};

export const tradingRoutes = {
  SafeBot: () => import("../components/Bots/SafeBot"),
  AggressiveBot: () => import("../components/Bots/AggressiveBot"),
  ManualBot: () => import("../components/Bots/ManualBot"),
  TradingViewEmbed: () => import("../components/Market/TradingViewEmbed"),
  TradeHistory: () => import("../pages/TradeHistory"),
};

export const marketRoutes = {
  SentimentChart: () => import("../components/Market/SentimentChart"),
  WhaleTracker: () => import("../components/Market/WhaleTracker"),
};

export const walletRoutes = {
  WalletUI: () => import("../components/WalletUI"),
};

export const educationRoutes = {
  LMSPage: () => import("../pages/LMSPage"),
  QuizPage: () => import("../pages/QuizPage"),
  CertificatePage: () => import("../pages/CertificatePage"),
};

export const userRoutes = {
  Settings: () => import("../pages/Settings"),
};

// Performance optimization: preload critical routes
export const preloadCriticalRoutes = () => {
  // Preload dashboard since it's likely the next route users will visit
  coreRoutes.Dashboard();

  // Preload trading components for quick access
  setTimeout(() => {
    tradingRoutes.TradingViewEmbed();
  }, 2000);
};

// Route metadata for better organization
export const routeMetadata = {
  "/": {
    title: "Financial Empire - Advanced Trading Platform",
    description: "Professional trading platform with AI-powered tools",
    preload: ["Dashboard"],
  },
  "/dashboard": {
    title: "Trading Dashboard - Financial Empire",
    description: "Real-time portfolio and market analytics",
    preload: ["TradingViewEmbed", "SafeBot"],
  },
  "/bots/safe": {
    title: "Safe Trading Bot - Financial Empire",
    description: "Conservative trading strategies with risk management",
    preload: [],
  },
  "/bots/aggressive": {
    title: "Aggressive Trading Bot - Financial Empire",
    description: "High-yield trading with advanced algorithms",
    preload: [],
  },
  "/bots/manual": {
    title: "Manual Trading - Financial Empire",
    description: "Full control manual trading interface",
    preload: [],
  },
  "/markets": {
    title: "Live Markets - Financial Empire",
    description: "Real-time crypto and stock market data",
    preload: [],
  },
  "/wallet": {
    title: "Secure Wallet - Financial Empire",
    description: "Multi-layer security for digital assets",
    preload: [],
  },
  "/history": {
    title: "Trade History - Financial Empire",
    description: "Comprehensive trading logs with export options",
    preload: [],
  },
  "/whale-tracker": {
    title: "Whale Tracker - Financial Empire",
    description: "Monitor large transactions and market sentiment",
    preload: [],
  },
  "/sentiment": {
    title: "Market Sentiment - Financial Empire",
    description: "AI-powered sentiment analysis and fear & greed index",
    preload: [],
  },
  "/academy": {
    title: "Trading Academy - Financial Empire",
    description: "Learn trading with interactive courses",
    preload: ["QuizPage"],
  },
  "/academy/quiz": {
    title: "Trading Quiz - Financial Empire",
    description: "Test your trading knowledge",
    preload: ["CertificatePage"],
  },
  "/academy/certificate": {
    title: "Certificates - Financial Empire",
    description: "Your trading achievements and certifications",
    preload: [],
  },
  "/settings": {
    title: "Settings - Financial Empire",
    description: "Manage your account preferences and trading configurations",
    preload: [],
  },
};

// Utility function to update page metadata
export const updatePageMetadata = (path: string) => {
  const metadata = routeMetadata[path as keyof typeof routeMetadata];
  if (metadata) {
    document.title = metadata.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    }

    // Update Open Graph title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", metadata.title);
    }

    // Update Open Graph description
    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", metadata.description);
    }
  }
};
