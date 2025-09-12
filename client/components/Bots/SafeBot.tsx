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
  Shield,
  Play,
  Pause,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Target,
  Clock,
} from "lucide-react";

const SafeBot = () => {
  const [isActive, setIsActive] = useState(false);
  const [riskLevel, setRiskLevel] = useState([25]);
  const [balance, setBalance] = useState(10000);
  const [profit, setProfit] = useState(0);
  const [trades, setTrades] = useState(0);

  // Simulate bot activity
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const randomChange = (Math.random() - 0.4) * 50; // Bias toward positive
        setBalance((prev) => Math.max(0, prev + randomChange));
        setProfit((prev) => prev + randomChange);
        if (Math.random() > 0.7) {
          setTrades((prev) => prev + 1);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const profitPercentage = ((profit / 10000) * 100).toFixed(2);
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
          <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
              Safe Trading Bot
            </h1>
            <p className="text-muted-foreground">
              Conservative strategies with capital preservation
            </p>
          </div>
        </div>
        <Badge
          variant={isActive ? "default" : "secondary"}
          className={
            isActive
              ? "bg-empire-emerald-500/20 text-empire-emerald-400"
              : "bg-muted text-muted-foreground"
          }
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Balance</p>
                    <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-empire-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Profit/Loss</p>
                    <p
                      className={`text-2xl font-bold ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
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
                    className={`w-8 h-8 ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Trades</p>
                    <p className="text-2xl font-bold">{trades}</p>
                  </div>
                  <Target className="w-8 h-8 text-empire-gold-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Performance Overview</span>
              </CardTitle>
              <CardDescription>
                Safe bot trading performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-empire-emerald-900/20 to-empire-navy-900/20 rounded-lg flex items-center justify-center border border-dashed border-empire-emerald-400/30">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-empire-emerald-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-empire-emerald-400 mb-2">
                    Performance Chart
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Real-time performance visualization showing profit/loss,
                    trades executed, and risk metrics over time.
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
                <span>Bot Controls</span>
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
                    : "bg-empire-emerald-500 hover:bg-empire-emerald-600"
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

              {/* Risk Level */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Risk Level</label>
                  <span className="text-sm text-muted-foreground">
                    {riskLevel[0]}%
                  </span>
                </div>
                <Slider
                  value={riskLevel}
                  onValueChange={(value) => setRiskLevel(value)}
                  max={50}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conservative</span>
                  <span>Moderate</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Daily Target</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.min(100, Math.round((Math.abs(profit) / 100) * 100))}%
                  </span>
                </div>
                <Progress
                  value={Math.min(100, (Math.abs(profit) / 100) * 100)}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Safety Features */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-empire-emerald-400" />
                <span>Safety Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                <div>
                  <p className="text-sm font-medium">Stop Loss Protection</p>
                  <p className="text-xs text-muted-foreground">
                    Maximum 5% loss per trade
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                <div>
                  <p className="text-sm font-medium">Diversification</p>
                  <p className="text-xs text-muted-foreground">
                    Multiple asset allocation
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-empire-emerald-400" />
                <div>
                  <p className="text-sm font-medium">Market Monitoring</p>
                  <p className="text-xs text-muted-foreground">
                    24/7 volatility tracking
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-empire-gold-400" />
                <div>
                  <p className="text-sm font-medium">Emergency Halt</p>
                  <p className="text-xs text-muted-foreground">
                    Auto-stop on high volatility
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isActive ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>Analyzing market trends...</span>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Risk assessment complete</span>
                    <Badge
                      variant="default"
                      className="bg-empire-emerald-500/20 text-empire-emerald-400 text-xs"
                    >
                      Safe
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Position monitoring</span>
                    <Badge variant="secondary" className="text-xs">
                      Ongoing
                    </Badge>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Bot is inactive. Start bot to see activity.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default SafeBot;
