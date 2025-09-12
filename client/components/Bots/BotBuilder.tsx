import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bot,
  Settings,
  Play,
  Pause,
  Save,
  Copy,
  Trash2,
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  Zap,
  Brain,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity,
  Plus,
  Minus,
} from "lucide-react";

interface TradingRule {
  id: string;
  type: "entry" | "exit" | "risk";
  condition: string;
  operator: ">" | "<" | "=" | ">=" | "<=";
  value: number;
  enabled: boolean;
}

interface BotStrategy {
  id: string;
  name: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  rules: TradingRule[];
  settings: {
    maxPositionSize: number;
    stopLoss: number;
    takeProfit: number;
    maxDailyTrades: number;
    tradingHours: {
      start: string;
      end: string;
    };
    assets: string[];
  };
  performance: {
    winRate: number;
    totalTrades: number;
    profit: number;
    maxDrawdown: number;
  };
}

const defaultStrategy: BotStrategy = {
  id: "custom-1",
  name: "My Custom Bot",
  description: "A personalized trading strategy",
  riskLevel: "medium",
  rules: [
    {
      id: "rule1",
      type: "entry",
      condition: "RSI",
      operator: "<",
      value: 30,
      enabled: true,
    },
    {
      id: "rule2",
      type: "exit",
      condition: "RSI",
      operator: ">",
      value: 70,
      enabled: true,
    },
    {
      id: "rule3",
      type: "risk",
      condition: "Position Size",
      operator: "<=",
      value: 5,
      enabled: true,
    },
  ],
  settings: {
    maxPositionSize: 1000,
    stopLoss: 5,
    takeProfit: 10,
    maxDailyTrades: 10,
    tradingHours: {
      start: "09:00",
      end: "17:00",
    },
    assets: ["BTC", "ETH"],
  },
  performance: {
    winRate: 0,
    totalTrades: 0,
    profit: 0,
    maxDrawdown: 0,
  },
};

const prebuiltStrategies: BotStrategy[] = [
  {
    id: "scalping",
    name: "Scalping Pro",
    description: "High-frequency trades for small profits",
    riskLevel: "high",
    rules: [
      {
        id: "s1",
        type: "entry",
        condition: "Price Change",
        operator: ">",
        value: 0.5,
        enabled: true,
      },
    ],
    settings: {
      maxPositionSize: 500,
      stopLoss: 2,
      takeProfit: 3,
      maxDailyTrades: 50,
      tradingHours: { start: "00:00", end: "23:59" },
      assets: ["BTC", "ETH", "SOL"],
    },
    performance: {
      winRate: 68,
      totalTrades: 245,
      profit: 1250,
      maxDrawdown: 8,
    },
  },
  {
    id: "swing",
    name: "Swing Trader",
    description: "Medium-term trend following",
    riskLevel: "medium",
    rules: [
      {
        id: "sw1",
        type: "entry",
        condition: "Moving Average",
        operator: ">",
        value: 50,
        enabled: true,
      },
    ],
    settings: {
      maxPositionSize: 2000,
      stopLoss: 8,
      takeProfit: 15,
      maxDailyTrades: 5,
      tradingHours: { start: "09:00", end: "17:00" },
      assets: ["BTC", "ETH"],
    },
    performance: {
      winRate: 75,
      totalTrades: 48,
      profit: 3200,
      maxDrawdown: 12,
    },
  },
  {
    id: "hodl",
    name: "HODL Helper",
    description: "Long-term accumulation strategy",
    riskLevel: "low",
    rules: [
      {
        id: "h1",
        type: "entry",
        condition: "Price Drop",
        operator: ">",
        value: 10,
        enabled: true,
      },
    ],
    settings: {
      maxPositionSize: 5000,
      stopLoss: 20,
      takeProfit: 50,
      maxDailyTrades: 1,
      tradingHours: { start: "00:00", end: "23:59" },
      assets: ["BTC", "ETH"],
    },
    performance: {
      winRate: 85,
      totalTrades: 12,
      profit: 8500,
      maxDrawdown: 15,
    },
  },
];

export const BotBuilder = () => {
  const [currentStrategy, setCurrentStrategy] =
    useState<BotStrategy>(defaultStrategy);
  const [isRunning, setIsRunning] = useState(false);
  const [savedStrategies, setSavedStrategies] = useState<BotStrategy[]>([]);
  const [selectedPrebuilt, setSelectedPrebuilt] = useState<string>("");

  const addRule = (type: "entry" | "exit" | "risk") => {
    const newRule: TradingRule = {
      id: `rule_${Date.now()}`,
      type,
      condition: "RSI",
      operator: ">",
      value: 50,
      enabled: true,
    };
    setCurrentStrategy((prev) => ({
      ...prev,
      rules: [...prev.rules, newRule],
    }));
  };

  const updateRule = (ruleId: string, updates: Partial<TradingRule>) => {
    setCurrentStrategy((prev) => ({
      ...prev,
      rules: prev.rules.map((rule) =>
        rule.id === ruleId ? { ...rule, ...updates } : rule,
      ),
    }));
  };

  const removeRule = (ruleId: string) => {
    setCurrentStrategy((prev) => ({
      ...prev,
      rules: prev.rules.filter((rule) => rule.id !== ruleId),
    }));
  };

  const saveStrategy = () => {
    const newStrategy = {
      ...currentStrategy,
      id: `strategy_${Date.now()}`,
    };
    setSavedStrategies((prev) => [...prev, newStrategy]);
  };

  const loadPrebuiltStrategy = (strategyId: string) => {
    const strategy = prebuiltStrategies.find((s) => s.id === strategyId);
    if (strategy) {
      setCurrentStrategy({ ...strategy, id: `custom_${Date.now()}` });
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "medium":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "high":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Simulate bot performance
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentStrategy((prev) => ({
          ...prev,
          performance: {
            ...prev.performance,
            totalTrades:
              prev.performance.totalTrades + Math.random() > 0.7 ? 1 : 0,
            profit: prev.performance.profit + (Math.random() - 0.3) * 100,
            winRate: Math.min(
              100,
              prev.performance.winRate + Math.random() * 2,
            ),
          },
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Bot Builder
              </h1>
              <p className="text-muted-foreground">
                Create and customize your trading strategies
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant={isRunning ? "destructive" : "default"}
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center space-x-2"
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isRunning ? "Stop Bot" : "Start Bot"}</span>
            </Button>
            <Button variant="outline" onClick={saveStrategy}>
              <Save className="w-4 h-4 mr-2" />
              Save Strategy
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bot Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Strategy Configuration</span>
                  </CardTitle>
                  <CardDescription>
                    Customize your bot's trading parameters and rules
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">Basic</TabsTrigger>
                      <TabsTrigger value="rules">Rules</TabsTrigger>
                      <TabsTrigger value="risk">Risk</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bot-name">Bot Name</Label>
                          <Input
                            id="bot-name"
                            value={currentStrategy.name}
                            onChange={(e) =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="risk-level">Risk Level</Label>
                          <Select
                            value={currentStrategy.riskLevel}
                            onValueChange={(value: "low" | "medium" | "high") =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                riskLevel: value,
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Risk</SelectItem>
                              <SelectItem value="medium">
                                Medium Risk
                              </SelectItem>
                              <SelectItem value="high">High Risk</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          value={currentStrategy.description}
                          onChange={(e) =>
                            setCurrentStrategy((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Max Position Size ($)</Label>
                        <Slider
                          value={[currentStrategy.settings.maxPositionSize]}
                          onValueChange={([value]) =>
                            setCurrentStrategy((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                maxPositionSize: value,
                              },
                            }))
                          }
                          max={10000}
                          min={100}
                          step={100}
                          className="mt-2"
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          ${currentStrategy.settings.maxPositionSize}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="rules" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Trading Rules</h3>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addRule("entry")}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Entry
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addRule("exit")}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Exit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addRule("risk")}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Risk
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {currentStrategy.rules.map((rule) => (
                          <Card key={rule.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 flex-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    rule.type === "entry"
                                      ? "border-empire-emerald-400 text-empire-emerald-400"
                                      : rule.type === "exit"
                                        ? "border-red-400 text-red-400"
                                        : "border-empire-gold-400 text-empire-gold-400"
                                  }
                                >
                                  {rule.type}
                                </Badge>
                                <Select
                                  value={rule.condition}
                                  onValueChange={(value) =>
                                    updateRule(rule.id, { condition: value })
                                  }
                                >
                                  <SelectTrigger className="w-32">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="RSI">RSI</SelectItem>
                                    <SelectItem value="Moving Average">
                                      MA
                                    </SelectItem>
                                    <SelectItem value="Price Change">
                                      Price
                                    </SelectItem>
                                    <SelectItem value="Volume">
                                      Volume
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={rule.operator}
                                  onValueChange={(value: any) =>
                                    updateRule(rule.id, { operator: value })
                                  }
                                >
                                  <SelectTrigger className="w-16">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value=">">{">"}</SelectItem>
                                    <SelectItem value="<">{"<"}</SelectItem>
                                    <SelectItem value=">=">{">="}</SelectItem>
                                    <SelectItem value="<=">{"<="}</SelectItem>
                                    <SelectItem value="=">{"="}</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Input
                                  type="number"
                                  value={rule.value}
                                  onChange={(e) =>
                                    updateRule(rule.id, {
                                      value: parseFloat(e.target.value),
                                    })
                                  }
                                  className="w-20"
                                />
                                <Switch
                                  checked={rule.enabled}
                                  onCheckedChange={(enabled) =>
                                    updateRule(rule.id, { enabled })
                                  }
                                />
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeRule(rule.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="risk" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label>Stop Loss (%)</Label>
                          <Slider
                            value={[currentStrategy.settings.stopLoss]}
                            onValueChange={([value]) =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                settings: { ...prev.settings, stopLoss: value },
                              }))
                            }
                            max={20}
                            min={1}
                            step={0.5}
                            className="mt-2"
                          />
                          <div className="text-sm text-muted-foreground mt-1">
                            {currentStrategy.settings.stopLoss}%
                          </div>
                        </div>
                        <div>
                          <Label>Take Profit (%)</Label>
                          <Slider
                            value={[currentStrategy.settings.takeProfit]}
                            onValueChange={([value]) =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                settings: {
                                  ...prev.settings,
                                  takeProfit: value,
                                },
                              }))
                            }
                            max={50}
                            min={1}
                            step={0.5}
                            className="mt-2"
                          />
                          <div className="text-sm text-muted-foreground mt-1">
                            {currentStrategy.settings.takeProfit}%
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label>Max Daily Trades</Label>
                        <Slider
                          value={[currentStrategy.settings.maxDailyTrades]}
                          onValueChange={([value]) =>
                            setCurrentStrategy((prev) => ({
                              ...prev,
                              settings: {
                                ...prev.settings,
                                maxDailyTrades: value,
                              },
                            }))
                          }
                          max={100}
                          min={1}
                          step={1}
                          className="mt-2"
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {currentStrategy.settings.maxDailyTrades} trades
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-time">Trading Start Time</Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={currentStrategy.settings.tradingHours.start}
                            onChange={(e) =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                settings: {
                                  ...prev.settings,
                                  tradingHours: {
                                    ...prev.settings.tradingHours,
                                    start: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-time">Trading End Time</Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={currentStrategy.settings.tradingHours.end}
                            onChange={(e) =>
                              setCurrentStrategy((prev) => ({
                                ...prev,
                                settings: {
                                  ...prev.settings,
                                  tradingHours: {
                                    ...prev.settings.tradingHours,
                                    end: e.target.value,
                                  },
                                },
                              }))
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Supported Assets</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {["BTC", "ETH", "ADA", "SOL", "LINK", "DOT"].map(
                            (asset) => (
                              <Badge
                                key={asset}
                                variant={
                                  currentStrategy.settings.assets.includes(
                                    asset,
                                  )
                                    ? "default"
                                    : "outline"
                                }
                                className="cursor-pointer"
                                onClick={() =>
                                  setCurrentStrategy((prev) => ({
                                    ...prev,
                                    settings: {
                                      ...prev.settings,
                                      assets: prev.settings.assets.includes(
                                        asset,
                                      )
                                        ? prev.settings.assets.filter(
                                            (a) => a !== asset,
                                          )
                                        : [...prev.settings.assets, asset],
                                    },
                                  }))
                                }
                              >
                                {asset}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Live Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Trades
                    </span>
                    <span className="font-semibold">
                      {currentStrategy.performance.totalTrades}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Win Rate
                    </span>
                    <span className="font-semibold text-empire-emerald-400">
                      {currentStrategy.performance.winRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Profit
                    </span>
                    <span
                      className={`font-semibold ${
                        currentStrategy.performance.profit >= 0
                          ? "text-empire-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      ${currentStrategy.performance.profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status
                    </span>
                    <Badge
                      variant={isRunning ? "default" : "secondary"}
                      className={
                        isRunning
                          ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {isRunning ? "Running" : "Stopped"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Prebuilt Strategies */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Templates</span>
                  </CardTitle>
                  <CardDescription>
                    Start with proven strategies
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {prebuiltStrategies.map((strategy) => (
                    <div
                      key={strategy.id}
                      className="p-3 rounded-lg border border-border/50 hover:border-empire-emerald-400/50 transition-colors cursor-pointer"
                      onClick={() => loadPrebuiltStrategy(strategy.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{strategy.name}</h4>
                        <Badge
                          variant="outline"
                          className={getRiskColor(strategy.riskLevel)}
                        >
                          {strategy.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {strategy.description}
                      </p>
                      <div className="flex justify-between text-xs">
                        <span className="text-empire-emerald-400">
                          {strategy.performance.winRate}% win rate
                        </span>
                        <span className="text-empire-gold-400">
                          ${strategy.performance.profit} profit
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotBuilder;
