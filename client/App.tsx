import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  registerSW,
  reportWebVitals,
  sendPerformanceData,
} from "@/lib/serviceWorker";
import {
  lazyWithRetry,
  preloadResources,
  preconnectToOrigin,
  sendToAnalytics,
} from "@/lib/performance";
import { lazy, Suspense, useEffect } from "react";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import { preloadCriticalRoutes, updatePageMetadata } from "./lib/routes";
import { useLocation } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { AuthProvider } from "./contexts/AuthContext";
import FirstVisitHandler from "./components/Auth/FirstVisitHandler";
import FeedbackBox from "./components/Feedback/FeedbackBox";
import AccessGate from "./components/Access/AccessGate";
import ProtectedRoute from "./components/Routes/ProtectedRoute";

// Lazy load heavy components for better performance with retry logic
const Dashboard = lazyWithRetry(() => import("./pages/Dashboard"));
const Index = lazyWithRetry(() => import("./pages/Index"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));
const TradeHistory = lazyWithRetry(() => import("./pages/TradeHistory"));
const LMSPage = lazyWithRetry(() => import("./pages/LMSPage"));
const QuizPage = lazyWithRetry(() => import("./pages/QuizPage"));
const CertificatePage = lazyWithRetry(() => import("./pages/CertificatePage"));
const Settings = lazyWithRetry(() => import("./pages/Settings"));
const LessonDetail = lazyWithRetry(() => import("./pages/LessonDetail"));
const Login = lazyWithRetry(() => import("./pages/Login"));
const Signup = lazyWithRetry(() => import("./pages/Signup"));
const MarketsPage = lazyWithRetry(() => import("./pages/MarketsPage"));
const InvestmentPlanner = lazyWithRetry(
  () => import("./pages/InvestmentPlanner"),
);
const SafeBot = lazyWithRetry(() => import("./components/Bots/SafeBot"));
const AggressiveBot = lazyWithRetry(
  () => import("./components/Bots/AggressiveBot"),
);
const ManualBot = lazyWithRetry(() => import("./components/Bots/ManualBot"));
const BotBuilder = lazyWithRetry(() => import("./components/Bots/BotBuilder"));
const AdaptiveTradingBot = lazy(
  () => import("./components/Bots/AdaptiveTradingBot"),
);
const BotsIndex = lazyWithRetry(() => import("./pages/BotsIndex"));
const WalletUI = lazyWithRetry(() => import("./components/WalletUI"));
const TradingViewEmbed = lazyWithRetry(
  () => import("./components/Market/TradingViewEmbed"),
);
const SentimentChart = lazyWithRetry(
  () => import("./components/Market/SentimentChart"),
);
const WhaleTracker = lazyWithRetry(
  () => import("./components/Market/WhaleTracker"),
);
const CommunityPage = lazyWithRetry(() => import("./pages/CommunityPage"));

// Loading component for lazy-loaded routes
const PageLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-empire-emerald-500/20 to-empire-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <div className="w-8 h-8 border-2 border-empire-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-muted-foreground">Loading Financial Empire...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

// Placeholder component for routes not yet implemented
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          This page is under construction and will be available soon.
        </p>
        <div className="w-24 h-24 bg-gradient-to-br from-empire-emerald-500/20 to-empire-gold-500/20 rounded-2xl flex items-center justify-center mx-auto">
          <span className="text-2xl">🚧</span>
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  // Register service worker for caching and offline support
  if (typeof window !== "undefined") {
    registerSW({
      onSuccess: () => {
        console.log("Financial Empire is ready for offline use");
      },
      onUpdate: () => {
        console.log("New version available, restart the app");
      },
    });

    // Setup performance monitoring
    reportWebVitals((metric) => {
      sendPerformanceData(metric);
      sendToAnalytics(metric);
    });

    // Preload critical resources
    preloadResources();

    // Preconnect to external services
    preconnectToOrigin("https://api.coingecko.com");
    preconnectToOrigin("https://api.alphavantage.co");
    preconnectToOrigin("https://api.tradingview.com");
    preconnectToOrigin("https://fonts.googleapis.com");
    preconnectToOrigin("https://fonts.gstatic.com");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ErrorBoundary>
          <AuthProvider>
            <SettingsProvider>
              <NotificationProvider>
                <RouteHandler />
                <FirstVisitHandler />
              </NotificationProvider>
            </SettingsProvider>
          </AuthProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Separate component to handle route changes and metadata updates
const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Update page metadata when route changes
    updatePageMetadata(location.pathname);

    // Preload critical routes on app start
    if (location.pathname === "/") {
      preloadCriticalRoutes();
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bots" element={<BotsIndex />} />
          <Route path="/bots/safe" element={<SafeBot />} />
          <Route
            path="/bots/aggressive"
            element={
              <ProtectedRoute
                requiredProgress={75}
                feature="Aggressive Trading Bot"
                fallbackPath="/academy"
              >
                <AggressiveBot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bots/manual"
            element={
              <ProtectedRoute
                requiredProgress={50}
                feature="Manual Trading Bot"
                fallbackPath="/academy"
              >
                <ManualBot />
              </ProtectedRoute>
            }
          />
          <Route path="/bots/builder" element={<BotBuilder />} />
          <Route path="/bots/adaptive" element={<AdaptiveTradingBot />} />
          <Route path="/markets" element={<MarketsPage />} />
          <Route path="/wallet" element={<WalletUI />} />
          <Route path="/history" element={<TradeHistory />} />
          <Route path="/whale-tracker" element={<WhaleTracker />} />
          <Route path="/sentiment" element={<SentimentChart />} />
          <Route path="/academy" element={<LMSPage />} />
          <Route path="/academy/lessons" element={<LMSPage />} />
          <Route path="/academy/lesson/:lessonId" element={<LessonDetail />} />
          <Route path="/academy/quiz" element={<QuizPage />} />
          <Route path="/academy/certificate" element={<CertificatePage />} />
          <Route
            path="/planner"
            element={
              <ProtectedRoute
                requiredCourses={3}
                feature="Investment Planner"
                fallbackPath="/academy"
              >
                <InvestmentPlanner />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <FeedbackBox />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
