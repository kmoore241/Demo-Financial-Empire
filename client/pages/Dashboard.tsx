import { useState, useEffect, memo, Suspense } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Wallet,
  PieChart,
  BarChart3,
  Bell,
  Settings,
  RefreshCw,
  Brain,
  Quote,
  Crown,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TradingFeedback from "@/components/TradingFeedback";
import TradingViewEmbed from "@/components/Market/TradingViewEmbed";
import {
  mockUser,
  calculatePortfolioStats,
  mockTrades,
  formatCurrency,
} from "@/lib/data";
import {
  getDailyQuote,
  getRandomQuote,
  Quote as QuoteType,
} from "@/lib/quotes";
import WeeklyMissions from "@/components/WeeklyMissions";
import AchievementSystem from "@/components/AchievementSystem";
import {
  usePriceSync,
  formatPriceChange,
  getPriceChangeColor,
} from "@/lib/priceSync";

const Dashboard = memo(() => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<QuoteType | null>(null);
  const [showWelcomeBack, setShowWelcomeBack] = useState(true);
  const [lastVisit, setLastVisit] = useState<string | null>(null);
  const { prices, getPrice } = usePriceSync();

  const portfolioStats = calculatePortfolioStats(mockTrades);
  const user = mockUser;

  // Initialize quotes and welcome message
  useEffect(() => {
    // Get last visit from localStorage
    const lastVisitTime = localStorage.getItem("lastVisit");
    if (lastVisitTime) {
      const lastDate = new Date(lastVisitTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 1) {
        setLastVisit(lastDate.toLocaleString());
      } else {
        setShowWelcomeBack(false);
      }
    }

    // Set current visit time
    localStorage.setItem("lastVisit", new Date().toISOString());

    // Set daily quote
    setCurrentQuote(getDailyQuote());
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { greeting: "Good Morning", icon: Sun };
    if (hour < 17) return { greeting: "Good Afternoon", icon: Sun };
    return { greeting: "Good Evening", icon: Moon };
  };

  const { greeting, icon: TimeIcon } = getTimeBasedGreeting();

  const cycleQuote = () => {
    setCurrentQuote(getRandomQuote());
  };

  const statsCards = [
    {
      title: "Total Portfolio Value",
      value: formatCurrency(user.totalBalance),
      change: `+${formatCurrency(user.totalProfit)}`,
      changePercent: `+${((user.totalProfit / user.totalBalance) * 100).toFixed(1)}%`,
      icon: DollarSign,
      positive: true,
    },
    {
      title: "Active Positions",
      value: portfolioStats.totalTrades.toString(),
      change: "+3",
      changePercent: "+15.2%",
      icon: Activity,
      positive: true,
    },
    {
      title: "Available Balance",
      value: formatCurrency(user.availableBalance),
      change: "-$1,234.56",
      changePercent: "-5.0%",
      icon: Wallet,
      positive: false,
    },
    {
      title: "Success Rate",
      value: `${user.successRate}%`,
      change: "+2.1%",
      changePercent: "+2.9%",
      icon: TrendingUp,
      positive: true,
    },
  ];

  const topPerformers = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: getPrice("BTC")
        ? `$${getPrice("BTC")!.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        : "$116,234",
      change: getPrice("BTC")
        ? formatPriceChange(getPrice("BTC")!.changePercent24h)
        : "+3.24%",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: getPrice("ETH")
        ? `$${getPrice("ETH")!.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`
        : "$2,650",
      change: getPrice("ETH")
        ? formatPriceChange(getPrice("ETH")!.changePercent24h)
        : "+5.67%",
    },
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: getPrice("AAPL")
        ? `$${getPrice("AAPL")!.price.toFixed(2)}`
        : "$185.32",
      change: getPrice("AAPL")
        ? formatPriceChange(getPrice("AAPL")!.changePercent24h)
        : "+1.23%",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: getPrice("TSLA")
        ? `$${getPrice("TSLA")!.price.toFixed(2)}`
        : "$248.91",
      change: getPrice("TSLA")
        ? formatPriceChange(getPrice("TSLA")!.changePercent24h)
        : "+7.89%",
    },
  ];

  const recentTrades = mockTrades.slice(0, 5);

  const LoadingComponent = () => (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-8 text-center">
        <div className="w-8 h-8 border-2 border-empire-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent">
              Trading Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time market data and portfolio insights
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLoading(true)}
              disabled={isLoading}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Welcome Back Banner */}
        {showWelcomeBack && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-border/50 bg-gradient-to-r from-empire-emerald-500/10 to-empire-gold-500/10 backdrop-blur-sm border-empire-emerald-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-gold-500 rounded-full flex items-center justify-center">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-empire-emerald-400">
                        {greeting}, {user.username}!
                      </h2>
                      <p className="text-muted-foreground">
                        {lastVisit
                          ? `Welcome back! Last visit: ${lastVisit}`
                          : "Welcome to your Financial Empire"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TimeIcon className="w-5 h-5 text-empire-gold-400" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowWelcomeBack(false)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Daily Quote Section */}
        {currentQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-empire-navy-500 to-empire-navy-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Quote className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-lg font-medium text-foreground italic mb-2">
                        "{currentQuote.text}"
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <cite className="text-sm text-muted-foreground font-medium">
                          — {currentQuote.author}
                        </cite>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="secondary"
                            className="bg-empire-emerald-500/20 text-empire-emerald-400"
                          >
                            {currentQuote.category}
                          </Badge>
                          {currentQuote.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={cycleQuote}
                      className="flex items-center space-x-1"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">New Quote</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Portfolio Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center space-x-2 text-xs">
                      <span
                        className={`flex items-center ${
                          stat.positive
                            ? "text-empire-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {stat.positive ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {stat.changePercent}
                      </span>
                      <span className="text-muted-foreground">
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Dashboard Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger value="overview">
                <BarChart3 className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="trading">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Trading</span>
              </TabsTrigger>
              <TabsTrigger value="signals">
                <Brain className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">AI Signals</span>
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Crown className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Achievements</span>
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <PieChart className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trading Chart */}
                <div className="lg:col-span-2">
                  <Suspense fallback={<LoadingComponent />}>
                    <TradingViewEmbed />
                  </Suspense>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* Top Performers */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-empire-emerald-400" />
                        <span>Top Performers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {topPerformers.map((asset, index) => (
                        <div
                          key={asset.symbol}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <div className="font-medium">{asset.symbol}</div>
                            <div className="text-xs text-muted-foreground">
                              {asset.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{asset.price}</div>
                            <div
                              className={`text-xs ${getPriceChangeColor(getPrice(asset.symbol)?.changePercent24h || 0)}`}
                            >
                              {asset.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Trades */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-empire-gold-400" />
                        <span>Recent Trades</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentTrades.map((trade, index) => (
                        <div key={trade.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  trade.type === "buy" ? "default" : "secondary"
                                }
                                className={
                                  trade.type === "buy"
                                    ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                                    : "bg-red-500/20 text-red-400"
                                }
                              >
                                {trade.type.toUpperCase()}
                              </Badge>
                              <span className="font-medium">{trade.asset}</span>
                            </div>
                            <Badge
                              variant={
                                trade.status === "completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {trade.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {trade.amount} @ {formatCurrency(trade.price)} •{" "}
                            {trade.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Weekly Missions - Compact */}
                  <WeeklyMissions compact className="lg:col-span-1" />
                </div>
              </div>

              {/* Full Weekly Missions Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <WeeklyMissions className="mt-8" />
              </motion.div>
            </TabsContent>

            <TabsContent value="trading" className="space-y-6 mt-6">
              <Suspense fallback={<LoadingComponent />}>
                <TradingViewEmbed />
              </Suspense>
            </TabsContent>

            <TabsContent value="signals" className="space-y-6 mt-6">
              <Suspense fallback={<LoadingComponent />}>
                <TradingFeedback />
              </Suspense>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6 mt-6">
              <AchievementSystem />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Portfolio Analytics</span>
                  </CardTitle>
                  <CardDescription>
                    Detailed analysis of your trading performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-empire-emerald-400">
                        {portfolioStats.successRate.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Win Rate
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {formatCurrency(portfolioStats.totalVolume)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Volume
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-empire-gold-400">
                        {formatCurrency(portfolioStats.averageProfit)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Profit
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
