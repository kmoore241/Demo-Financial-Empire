import { useState, useEffect } from "react";
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
import { Slider } from "@/components/ui/slider";
import {
  Zap,
  Play,
  Pause,
  Settings,
  TrendingUp,
  AlertTriangle,
  Target,
  DollarSign,
  Activity,
  Clock,
  Flame,
  BarChart3,
} from "lucide-react";

const AggressiveBot = () => {
  const [isActive, setIsActive] = useState(false);
  const [leverageLevel, setLeverageLevel] = useState([5]);
  const [balance, setBalance] = useState(15000);
  const [profit, setProfit] = useState(0);
  const [trades, setTrades] = useState(0);
  const [riskScore, setRiskScore] = useState(75);

  // Simulate aggressive bot activity
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const randomChange = (Math.random() - 0.3) * 200; // Higher volatility
        setBalance((prev) => Math.max(0, prev + randomChange));
        setProfit((prev) => prev + randomChange);
        if (Math.random() > 0.5) {
          setTrades((prev) => prev + 1);
        }
        setRiskScore(
          Math.min(100, Math.max(50, riskScore + (Math.random() - 0.5) * 10)),
        );
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive, riskScore]);

  const profitPercentage = ((profit / 15000) * 100).toFixed(2);
  const isPositive = profit >= 0;

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
          <div className="w-12 h-12 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-xl flex items-center justify-center">
            <Zap className="w-6 h-6 text-empire-navy-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-gold-600 bg-clip-text text-transparent">
              Aggressive Trading Bot
            </h1>
            <p className="text-muted-foreground">
              High-yield strategies with advanced algorithms
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant={isActive ? "default" : "secondary"}
            className={
              isActive
                ? "bg-empire-gold-500/20 text-empire-gold-400"
                : "bg-muted text-muted-foreground"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
          <Badge variant="secondary" className="bg-red-500/20 text-red-400">
            High Risk
          </Badge>
        </div>
      </motion.div>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Performance Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-xl font-bold">${balance.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-6 h-6 text-empire-gold-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">P&L</p>
                    <p
                      className={`text-xl font-bold ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
                    >
                      {isPositive ? "+" : ""}${profit.toFixed(2)}
                    </p>
                    <p
                      className={`text-xs ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
                    >
                      {profitPercentage}%
                    </p>
                  </div>
                  <TrendingUp
                    className={`w-6 h-6 ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trades</p>
                    <p className="text-xl font-bold">{trades}</p>
                  </div>
                  <Target className="w-6 h-6 text-empire-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Score</p>
                    <p className="text-xl font-bold">{riskScore.toFixed(0)}</p>
                  </div>
                  <Flame className="w-6 h-6 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>High-Frequency Performance</span>
              </CardTitle>
              <CardDescription>
                Aggressive bot trading performance with leveraged positions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-empire-gold-900/20 to-red-900/20 rounded-lg flex items-center justify-center border border-dashed border-empire-gold-400/30">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-empire-gold-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-empire-gold-400 mb-2">
                    Real-Time Trading Chart
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    High-frequency trading visualization showing leveraged
                    positions, quick scalps, and momentum-based strategies in
                    real-time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Metrics */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Risk Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Max Drawdown</p>
                  <p className="text-2xl font-bold text-red-400">-12.5%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Volatility</p>
                  <p className="text-2xl font-bold text-empire-gold-400">
                    High
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-2xl font-bold text-empire-emerald-400">
                    2.1
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control Panel */}
        <div className="space-y-6">
          {/* Bot Controls */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Aggressive Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Start/Stop Button */}
              <Button
                onClick={() => setIsActive(!isActive)}
                size="lg"
                className={`w-full ${
                  isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-empire-gold-500 hover:bg-empire-gold-600"
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Stop Bot
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
                    Start Bot
                  </>
                )}
              </Button>

              {/* Leverage Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Leverage</label>
                  <span className="text-sm text-empire-gold-400 font-bold">
                    {leverageLevel[0]}x
                  </span>
                </div>
                <Slider
                  value={leverageLevel}
                  onValueChange={(value) => setLeverageLevel(value)}
                  max={20}
                  min={2}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Extreme</span>
                </div>
              </div>

              {/* Daily Target Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Target</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(100, Math.round((Math.abs(profit) / 500) * 100))}%
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (Math.abs(profit) / 500) * 100)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Target: $500 daily profit
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Features */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-empire-gold-400" />
                <span>Strategy Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-empire-gold-400" />
                <div>
                  <p className="text-sm font-medium">Scalping Algorithm</p>
                  <p className="text-xs text-muted-foreground">
                    High-frequency micro-trades
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-empire-emerald-400" />
                <div>
                  <p className="text-sm font-medium">Momentum Trading</p>
                  <p className="text-xs text-muted-foreground">
                    Trend-following strategies
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-empire-navy-400" />
                <div>
                  <p className="text-sm font-medium">Arbitrage Detection</p>
                  <p className="text-xs text-muted-foreground">
                    Cross-exchange opportunities
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-sm font-medium">Risk Management</p>
                  <p className="text-xs text-muted-foreground">
                    Dynamic stop-loss levels
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Activity */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Live Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isActive ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  <div className="flex justify-between items-center text-sm">
                    <span>Scanning for arbitrage...</span>
                    <Badge
                      variant="secondary"
                      className="text-xs animate-pulse"
                    >
                      Live
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>BTC scalp executed</span>
                    <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400 text-xs">
                      +0.8%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>ETH momentum detected</span>
                    <Badge className="bg-empire-gold-500/20 text-empire-gold-400 text-xs">
                      Entry
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Risk threshold reached</span>
                    <Badge
                      variant="secondary"
                      className="text-xs bg-red-500/20 text-red-400"
                    >
                      Warning
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Bot is inactive. Start bot to see live trading activity.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default AggressiveBot;
