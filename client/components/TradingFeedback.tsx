import { useState, useEffect, memo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
} from "lucide-react";
import { mockTradingSignals, formatCurrency, formatPercent } from "@/lib/data";
import type { TradingSignal } from "@/lib/data";

const TradingFeedback = memo(() => {
  const [signals, setSignals] = useState<TradingSignal[]>(mockTradingSignals);
  const [recentTrades, setRecentTrades] = useState([
    {
      id: "1",
      asset: "BTC",
      action: "BUY",
      confidence: 87,
      entryPrice: 42850,
      currentPrice: 43200,
      profit: 0.82,
      status: "active",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      asset: "ETH",
      action: "SELL",
      confidence: 92,
      entryPrice: 2650,
      currentPrice: 2625,
      profit: 0.94,
      status: "closed",
      timestamp: "15 min ago",
    },
    {
      id: "3",
      asset: "ADA",
      action: "BUY",
      confidence: 68,
      entryPrice: 0.48,
      currentPrice: 0.475,
      profit: -1.04,
      status: "active",
      timestamp: "1 hour ago",
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update signals confidence occasionally
      setSignals((prev) =>
        prev.map((signal) => ({
          ...signal,
          confidence: Math.max(
            50,
            Math.min(100, signal.confidence + (Math.random() - 0.5) * 5),
          ),
          timestamp: new Date(),
        })),
      );

      // Update trade profits
      setRecentTrades((prev) =>
        prev.map((trade) => ({
          ...trade,
          currentPrice: trade.currentPrice * (1 + (Math.random() - 0.5) * 0.01),
          profit: trade.profit + (Math.random() - 0.4) * 0.5,
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-empire-emerald-400";
    if (confidence >= 60) return "text-empire-gold-400";
    return "text-red-400";
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return "bg-empire-emerald-500";
    if (confidence >= 60) return "bg-empire-gold-500";
    return "bg-red-500";
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case "buy":
        return <TrendingUp className="w-4 h-4 text-empire-emerald-400" />;
      case "sell":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      case "hold":
        return <Target className="w-4 h-4 text-empire-gold-400" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
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
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              AI Trading Signals
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-time trading recommendations with confidence scores
            </p>
          </div>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400">
          <Zap className="w-3 h-3 mr-1" />
          Live Analysis
        </Badge>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Signals */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Active Trading Signals</span>
              </CardTitle>
              <CardDescription>
                AI-generated buy/sell/hold recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {signals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(signal.type)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{signal.asset}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs uppercase ${
                              signal.type === "buy"
                                ? "border-empire-emerald-400 text-empire-emerald-400"
                                : signal.type === "sell"
                                  ? "border-red-400 text-red-400"
                                  : "border-empire-gold-400 text-empire-gold-400"
                            }`}
                          >
                            {signal.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {signal.source}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">
                        {formatCurrency(signal.price)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {signal.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Confidence Meter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confidence</span>
                      <span
                        className={`text-sm font-bold ${getConfidenceColor(signal.confidence)}`}
                      >
                        {signal.confidence}%
                      </span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={signal.confidence}
                        className="h-2"
                        style={{
                          background: `linear-gradient(to right, #ef4444 0%, #f59e0b 50%, #10b981 100%)`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Low</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Entry Details */}
                  <div className="mt-3 p-3 rounded-md bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">
                      Analysis:
                    </p>
                    <p className="text-sm">{signal.reasoning}</p>
                    {signal.targetPrice && (
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span>
                          Target: {formatCurrency(signal.targetPrice)}
                        </span>
                        {signal.stopLoss && (
                          <span>Stop: {formatCurrency(signal.stopLoss)}</span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Trades Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Recent Trade Performance</span>
              </CardTitle>
              <CardDescription>
                Live tracking of executed trades and their outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTrades.map((trade, index) => (
                <motion.div
                  key={trade.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-4 rounded-lg border border-border/50"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(trade.action)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold">{trade.asset}</span>
                          <Badge
                            variant={
                              trade.status === "active"
                                ? "default"
                                : "secondary"
                            }
                            className={
                              trade.status === "active"
                                ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {trade.status === "active" ? (
                              <Clock className="w-3 h-3 mr-1" />
                            ) : (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {trade.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {trade.timestamp}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-bold ${
                          trade.profit >= 0
                            ? "text-empire-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {trade.profit >= 0 ? "+" : ""}
                        {formatPercent(trade.profit)}
                      </div>
                      <div className="text-xs text-muted-foreground">P&L</div>
                    </div>
                  </div>

                  {/* Trade Details */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Entry:</span>
                      <span>{formatCurrency(trade.entryPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current:</span>
                      <span>{formatCurrency(trade.currentPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className={getConfidenceColor(trade.confidence)}>
                        {trade.confidence}%
                      </span>
                    </div>
                  </div>

                  {/* Confidence Bar */}
                  <div className="mt-3">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getConfidenceBg(trade.confidence)} transition-all duration-500`}
                        style={{ width: `${trade.confidence}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Performance Summary */}
              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-empire-emerald-500/10 border border-purple-400/30">
                <h4 className="font-medium mb-3 flex items-center space-x-2">
                  <Brain className="w-4 h-4" />
                  <span>AI Performance Summary</span>
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Win Rate:</span>
                    <span className="ml-2 font-bold text-empire-emerald-400">
                      74.3%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Avg Confidence:
                    </span>
                    <span className="ml-2 font-bold">82.1%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Profit:</span>
                    <span className="ml-2 font-bold text-empire-emerald-400">
                      +12.7%
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Active Trades:
                    </span>
                    <span className="ml-2 font-bold">
                      {recentTrades.filter((t) => t.status === "active").length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
});

TradingFeedback.displayName = "TradingFeedback";

export default TradingFeedback;
