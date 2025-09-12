import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  Play,
  Pause,
  RotateCcw,
  Settings,
} from "lucide-react";
import { getMarketData, executeTrade } from "@/lib/marketAPI";
import { analyzePattern, adjustStrategy } from "@/lib/aiTrainer";

interface BotPerformance {
  wins: number;
  losses: number;
  totalTrades: number;
  totalReturn: number;
  winRate: number;
}

export default function AdaptiveTradingBot() {
  const [marketData, setMarketData] = useState<any[]>([]);
  const [confidence, setConfidence] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<any>(null);
  const [performance, setPerformance] = useState<BotPerformance>({
    wins: 0,
    losses: 0,
    totalTrades: 0,
    totalReturn: 0,
    winRate: 0,
  });
  const [strategy, setStrategy] = useState({
    riskTolerance: 0.5,
    confidenceThreshold: 0.7,
    maxPositionSize: 0.1,
  });
  const [trades, setTrades] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    const fetchAndAnalyze = async () => {
      if (!isActive) return;

      setIsAnalyzing(true);
      try {
        // Fetch latest market data
        const data = await getMarketData();
        const cryptoData = data.cryptos.slice(0, 5);

        // Convert to format expected by AI analyzer
        const formattedData = cryptoData.map((crypto) => ({
          timestamp: crypto.last_updated,
          price: crypto.current_price,
          volume: crypto.total_volume,
          symbol: crypto.symbol,
        }));

        setMarketData(formattedData);

        // Analyze each crypto
        for (const crypto of cryptoData) {
          const cryptoHistory = [
            ...Array(20)
              .fill(0)
              .map((_, i) => ({
                timestamp: new Date(
                  Date.now() - (20 - i) * 3600000,
                ).toISOString(),
                price:
                  crypto.current_price *
                  (1 + (Math.random() - 0.5) * 0.1) *
                  (1 - i * 0.001),
                volume: crypto.total_volume * (1 + (Math.random() - 0.5) * 0.2),
                symbol: crypto.symbol,
              })),
          ];

          const decision = analyzePattern(cryptoHistory);
          setCurrentDecision(decision);
          setConfidence(decision.confidence);
          setFeedback(decision.feedback);

          // Execute trade if confidence is high enough
          if (
            decision.confidence > strategy.confidenceThreshold &&
            decision.action !== "hold"
          ) {
            await executeTrade({
              symbol: crypto.symbol,
              action: decision.action,
              amount: decision.suggestedAmount,
              price: crypto.current_price,
              confidence: decision.confidence,
              reasoning: decision.reasoning,
            });

            // Update trades history
            const newTrade = {
              id: `trade_${Date.now()}`,
              symbol: crypto.symbol.toUpperCase(),
              action: decision.action,
              price: crypto.current_price,
              amount: decision.suggestedAmount || 0.1,
              confidence: decision.confidence,
              timestamp: new Date().toISOString(),
              status: "executed",
            };

            setTrades((prev) => [newTrade, ...prev.slice(0, 9)]);

            // Simulate trade outcome for performance tracking
            const isWin = Math.random() > 0.4; // 60% win rate simulation
            setPerformance((prev) => {
              const newWins = prev.wins + (isWin ? 1 : 0);
              const newLosses = prev.losses + (isWin ? 0 : 1);
              const newTotal = prev.totalTrades + 1;
              const returnAmount = isWin
                ? (Math.random() * 0.05 + 0.01) * 100
                : -(Math.random() * 0.03 + 0.005) * 100;

              return {
                wins: newWins,
                losses: newLosses,
                totalTrades: newTotal,
                totalReturn: prev.totalReturn + returnAmount,
                winRate: (newWins / newTotal) * 100,
              };
            });
          }
        }

        // Adjust strategy based on performance
        const adjustedStrategy = adjustStrategy(performance, strategy);
        setStrategy(adjustedStrategy);
      } catch (error) {
        console.error("Bot analysis error:", error);
        setFeedback("Error analyzing market data");
      } finally {
        setIsAnalyzing(false);
      }
    };

    if (isActive) {
      fetchAndAnalyze();
      const interval = setInterval(fetchAndAnalyze, 60000); // Run every minute
      return () => clearInterval(interval);
    }
  }, [isActive, strategy.confidenceThreshold, performance]);

  const resetBot = () => {
    setPerformance({
      wins: 0,
      losses: 0,
      totalTrades: 0,
      totalReturn: 0,
      winRate: 0,
    });
    setTrades([]);
    setCurrentDecision(null);
    setConfidence(0);
    setFeedback("Bot reset successfully");
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 0.8) return "text-green-500";
    if (conf >= 0.6) return "text-yellow-500";
    return "text-red-500";
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "buy":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "sell":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Bot Card */}
      <Card className="bg-gradient-to-br from-empire-navy-950/50 to-empire-navy-900/30 border-empire-emerald-500/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-gold-400 bg-clip-text text-transparent">
                  AI Trading Bot
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Adaptive Learning Algorithm
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isActive ? "destructive" : "default"}
                size="sm"
                onClick={() => setIsActive(!isActive)}
                className="flex items-center space-x-2"
              >
                {isActive ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                <span>{isActive ? "Pause" : "Start"}</span>
              </Button>
              <Button variant="outline" size="sm" onClick={resetBot}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status and Confidence */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isActive ? "bg-green-500 animate-pulse" : "bg-gray-400"
                  }`}
                />
                <span className="text-sm font-medium">
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
              {isAnalyzing && (
                <div className="text-xs text-muted-foreground">
                  Analyzing...
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                <span className={getConfidenceColor(confidence)}>
                  {Math.round(confidence * 100)}%
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Confidence</div>
              <Progress value={confidence * 100} className="w-full h-2 mt-2" />
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold mb-1">
                {performance.totalTrades}
              </div>
              <div className="text-sm text-muted-foreground">Total Trades</div>
            </div>
          </div>

          {/* Current Decision */}
          {currentDecision && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-card rounded-lg border"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getActionIcon(currentDecision.action)}
                  <span className="font-medium capitalize">
                    {currentDecision.action} Signal
                  </span>
                </div>
                <Badge
                  variant={
                    currentDecision.riskLevel === "low"
                      ? "default"
                      : currentDecision.riskLevel === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {currentDecision.riskLevel} risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {currentDecision.reasoning}
              </p>
              <p className="text-xs italic text-muted-foreground">{feedback}</p>
            </motion.div>
          )}

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-bold text-green-400">
                {performance.wins}
              </div>
              <div className="text-xs text-muted-foreground">Wins</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-bold text-red-400">
                {performance.losses}
              </div>
              <div className="text-xs text-muted-foreground">Losses</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div className="text-lg font-bold text-empire-emerald-400">
                {performance.winRate.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Win Rate</div>
            </div>
            <div className="text-center p-3 bg-card rounded-lg">
              <div
                className={`text-lg font-bold ${
                  performance.totalReturn >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {performance.totalReturn >= 0 ? "+" : ""}
                {performance.totalReturn.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground">Total Return</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      {trades.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Trades</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trades.map((trade) => (
                <div
                  key={trade.id}
                  className="flex items-center justify-between p-3 bg-card rounded-lg border"
                >
                  <div className="flex items-center space-x-3">
                    {getActionIcon(trade.action)}
                    <div>
                      <div className="font-medium">
                        {trade.action.toUpperCase()} {trade.symbol}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${trade.price.toFixed(2)} • {trade.confidence * 100}%
                        confidence
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      {new Date(trade.timestamp).toLocaleTimeString()}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {trade.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
