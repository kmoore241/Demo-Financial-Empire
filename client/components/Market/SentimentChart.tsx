import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Heart,
  Frown,
  Smile,
  Meh,
  Activity,
  BarChart3,
  Gauge,
} from "lucide-react";

const SentimentChart = () => {
  const [fearGreedIndex, setFearGreedIndex] = useState(32);
  const [marketSentiment, setMarketSentiment] = useState("Fear");

  // Simulate real-time sentiment updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setFearGreedIndex((prev) => Math.max(0, Math.min(100, prev + change)));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fearGreedIndex < 25) {
      setMarketSentiment("Extreme Fear");
    } else if (fearGreedIndex < 45) {
      setMarketSentiment("Fear");
    } else if (fearGreedIndex < 55) {
      setMarketSentiment("Neutral");
    } else if (fearGreedIndex < 75) {
      setMarketSentiment("Greed");
    } else {
      setMarketSentiment("Extreme Greed");
    }
  }, [fearGreedIndex]);

  const sentimentData = [
    {
      source: "Social Media",
      sentiment: "Bullish",
      score: 72,
      change: "+5.2%",
      positive: true,
    },
    {
      source: "News Analysis",
      sentiment: "Neutral",
      score: 58,
      change: "-2.1%",
      positive: false,
    },
    {
      source: "Technical Indicators",
      sentiment: "Bearish",
      score: 34,
      change: "-8.7%",
      positive: false,
    },
    {
      source: "Options Flow",
      sentiment: "Bullish",
      score: 81,
      change: "+12.3%",
      positive: true,
    },
  ];

  const marketMetrics = [
    {
      name: "VIX (Volatility)",
      value: "28.4",
      status: "High",
      color: "text-red-400",
    },
    {
      name: "Put/Call Ratio",
      value: "0.87",
      status: "Neutral",
      color: "text-empire-gold-400",
    },
    {
      name: "RSI (14)",
      value: "42.3",
      status: "Oversold",
      color: "text-empire-emerald-400",
    },
    {
      name: "MACD Signal",
      value: "Bearish",
      status: "Sell",
      color: "text-red-400",
    },
  ];

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "extreme fear":
        return <Frown className="w-6 h-6 text-red-500" />;
      case "fear":
        return <Frown className="w-6 h-6 text-red-400" />;
      case "neutral":
        return <Meh className="w-6 h-6 text-empire-gold-400" />;
      case "greed":
        return <Smile className="w-6 h-6 text-empire-emerald-400" />;
      case "extreme greed":
        return <Smile className="w-6 h-6 text-empire-emerald-500" />;
      default:
        return <Activity className="w-6 h-6" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case "extreme fear":
        return "text-red-500";
      case "fear":
        return "text-red-400";
      case "neutral":
        return "text-empire-gold-400";
      case "greed":
        return "text-empire-emerald-400";
      case "extreme greed":
        return "text-empire-emerald-500";
      default:
        return "text-foreground";
    }
  };

  const getFearGreedColor = (index: number) => {
    if (index < 25) return "bg-red-500";
    if (index < 45) return "bg-red-400";
    if (index < 55) return "bg-empire-gold-400";
    if (index < 75) return "bg-empire-emerald-400";
    return "bg-empire-emerald-500";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Market Sentiment
            </h1>
            <p className="text-muted-foreground">
              AI-powered sentiment analysis and fear & greed index
            </p>
          </div>
        </div>
        <Badge className="bg-cyan-500/20 text-cyan-400">Real-time</Badge>
      </motion.div>

      {/* Fear & Greed Index */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Fear & Greed Gauge */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Gauge className="w-6 h-6" />
              <span>Fear & Greed Index</span>
            </CardTitle>
            <CardDescription>
              Market emotion indicator (0 = Extreme Fear, 100 = Extreme Greed)
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-8 border-muted"></div>
              <div
                className={`absolute inset-0 rounded-full border-8 border-transparent ${getFearGreedColor(fearGreedIndex)}`}
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${50 + (fearGreedIndex / 100) * 50}% 0%, ${50 + (fearGreedIndex / 100) * 50}% 100%, 50% 100%)`,
                }}
              ></div>
              <div className="absolute inset-8 rounded-full bg-background flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold">
                    {Math.round(fearGreedIndex)}
                  </div>
                  <div className="text-sm text-muted-foreground">Index</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2">
                {getSentimentIcon(marketSentiment)}
                <span
                  className={`text-xl font-bold ${getSentimentColor(marketSentiment)}`}
                >
                  {marketSentiment}
                </span>
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Extreme Fear</span>
                <span>Neutral</span>
                <span>Extreme Greed</span>
              </div>

              <Progress
                value={fearGreedIndex}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Breakdown */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Sentiment Breakdown</span>
            </CardTitle>
            <CardDescription>Multi-source sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sentimentData.map((item, index) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50"
              >
                <div>
                  <div className="font-medium">{item.source}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.sentiment}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{item.score}</div>
                  <div
                    className={`text-sm ${item.positive ? "text-empire-emerald-400" : "text-red-400"}`}
                  >
                    {item.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Technical Indicators</span>
            </CardTitle>
            <CardDescription>
              Key market metrics and technical signals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marketMetrics.map((metric, index) => (
                <motion.div
                  key={metric.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="text-center p-4 rounded-lg border border-border/50"
                >
                  <div className="text-sm text-muted-foreground mb-1">
                    {metric.name}
                  </div>
                  <div className="text-xl font-bold mb-1">{metric.value}</div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${metric.color}`}
                  >
                    {metric.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sentiment Analysis Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Sentiment Timeline</span>
            </CardTitle>
            <CardDescription>
              Historical sentiment data and predictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="24h" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-muted/50">
                <TabsTrigger value="24h">24H</TabsTrigger>
                <TabsTrigger value="7d">7D</TabsTrigger>
                <TabsTrigger value="30d">30D</TabsTrigger>
                <TabsTrigger value="90d">90D</TabsTrigger>
              </TabsList>

              <TabsContent value="24h">
                <div className="h-64 bg-gradient-to-br from-cyan-900/20 to-empire-navy-900/20 rounded-lg flex items-center justify-center border border-dashed border-cyan-400/30">
                  <div className="text-center">
                    <Brain className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                      Sentiment Timeline Chart
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Interactive chart showing sentiment changes over time with
                      AI-powered predictions and key market events.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="7d">
                <div className="h-64 bg-gradient-to-br from-cyan-900/20 to-empire-emerald-900/20 rounded-lg flex items-center justify-center border border-dashed border-empire-emerald-400/30">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-empire-emerald-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-empire-emerald-400 mb-2">
                      7-Day Sentiment Trend
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Weekly sentiment analysis with correlation to price
                      movements and trading volume.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="30d">
                <div className="h-64 bg-gradient-to-br from-empire-gold-900/20 to-cyan-900/20 rounded-lg flex items-center justify-center border border-dashed border-empire-gold-400/30">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-empire-gold-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-empire-gold-400 mb-2">
                      Monthly Overview
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Monthly sentiment patterns and market cycle analysis.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="90d">
                <div className="h-64 bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-lg flex items-center justify-center border border-dashed border-purple-400/30">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">
                      Quarterly Analysis
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Long-term sentiment trends and market sentiment cycles.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SentimentChart;
