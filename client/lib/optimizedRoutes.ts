// Optimized routing with better code splitting and error boundaries
import { lazy } from "react";
import { lazyWithRetry } from "./performance";

// Critical routes - loaded immediately
export const Index = lazy(() => import("../pages/Index"));
export const NotFound = lazy(() => import("../pages/NotFound"));

// Primary routes - high priority lazy loading
export const Dashboard = lazyWithRetry(() => import("../pages/Dashboard"));
export const Login = lazyWithRetry(() => import("../pages/Login"));
export const Signup = lazyWithRetry(() => import("../pages/Signup"));

// Secondary routes - lower priority
export const MarketsPage = lazyWithRetry(() => import("../pages/MarketsPage"));
export const LMSPage = lazyWithRetry(() => import("../pages/LMSPage"));
export const Settings = lazyWithRetry(() => import("../pages/Settings"));
export const InvestmentPlanner = lazyWithRetry(
  () => import("../pages/InvestmentPlanner"),
);

// Feature-specific routes - load on demand
export const BotsIndex = lazyWithRetry(() => import("../pages/BotsIndex"));
export const TradeHistory = lazyWithRetry(
  () => import("../pages/TradeHistory"),
);
export const CertificatePage = lazyWithRetry(
  () => import("../pages/CertificatePage"),
);
export const CommunityPage = lazyWithRetry(
  () => import("../pages/CommunityPage"),
);

// Bot components - separate chunk
export const SafeBot = lazyWithRetry(
  () => import("../components/Bots/SafeBot"),
);
export const AggressiveBot = lazyWithRetry(
  () => import("../components/Bots/AggressiveBot"),
);
export const ManualBot = lazyWithRetry(
  () => import("../components/Bots/ManualBot"),
);
export const BotBuilder = lazyWithRetry(
  () => import("../components/Bots/BotBuilder"),
);
export const AdaptiveTradingBot = lazyWithRetry(
  () => import("../components/Bots/AdaptiveTradingBot"),
);

// Academy components - separate chunk
export const LessonDetail = lazyWithRetry(
  () => import("../pages/LessonDetail"),
);
export const QuizPage = lazyWithRetry(() => import("../pages/QuizPage"));

// Market components - separate chunk
export const WalletUI = lazyWithRetry(() => import("../components/WalletUI"));
export const TradingViewEmbed = lazyWithRetry(
  () => import("../components/Market/TradingViewEmbed"),
);
export const SentimentChart = lazyWithRetry(
  () => import("../components/Market/SentimentChart"),
);
export const WhaleTracker = lazyWithRetry(
  () => import("../components/Market/WhaleTracker"),
);

// Preload critical routes
export const preloadCriticalRoutes = () => {
  // Only preload the most important routes
  const criticalRoutes = [Dashboard, MarketsPage, LMSPage];

  criticalRoutes.forEach((route) => {
    // Preload the component
    route.preload?.();
  });
};

// Route configuration with access control
export const routeConfig = {
  // Public routes
  public: ["/", "/login", "/signup"],

  // Protected routes requiring authentication
  protected: [
    "/dashboard",
    "/markets",
    "/wallet",
    "/history",
    "/settings",
    "/community",
    "/academy",
    "/planner",
    "/certificates",
  ],

  // Gated routes requiring specific progress
  gated: {
    "/bots/manual": { requiredProgress: 50 },
    "/bots/aggressive": { requiredProgress: 75 },
    "/planner": { requiredCourses: 3 },
    "/certificates": { requiredQuizzes: 2 },
  },
};
