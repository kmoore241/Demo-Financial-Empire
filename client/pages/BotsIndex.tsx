import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Shield,
  Zap,
  User,
  Settings,
  TrendingUp,
  Brain,
  Target,
  DollarSign,
  Activity,
  Star,
  ChevronRight,
} from "lucide-react";

const BotsIndex = () => {
  const bots = [
    {
      id: "safe",
      name: "Safe Trading Bot",
      description: "Conservative strategies with capital preservation focus",
      icon: Shield,
      riskLevel: "Low",
      riskColor: "bg-empire-emerald-500/20 text-empire-emerald-400",
      performance: {
        winRate: "78%",
        monthlyReturn: "8.2%",
        maxDrawdown: "3.1%",
      },
      features: [
        "Conservative risk management",
        "Stop-loss automation",
        "Blue-chip asset focus",
        "24/7 monitoring",
      ],
      href: "/bots/safe",
      isActive: true,
      color: "from-empire-emerald-500 to-empire-emerald-600",
    },
    {
      id: "aggressive",
      name: "Aggressive Bot",
      description: "High-frequency trading with momentum strategies",
      icon: Zap,
      riskLevel: "High",
      riskColor: "bg-red-500/20 text-red-400",
      performance: {
        winRate: "65%",
        monthlyReturn: "22.5%",
        maxDrawdown: "12.8%",
      },
      features: [
        "High-frequency trading",
        "Momentum strategies",
        "Scalping opportunities",
        "Advanced algorithms",
      ],
      href: "/bots/aggressive",
      isActive: true,
      color: "from-red-500 to-red-600",
    },
    {
      id: "manual",
      name: "Manual Trading Bot",
      description: "Semi-automated trading with manual oversight",
      icon: User,
      riskLevel: "Medium",
      riskColor: "bg-empire-gold-500/20 text-empire-gold-400",
      performance: {
        winRate: "72%",
        monthlyReturn: "15.3%",
        maxDrawdown: "7.2%",
      },
      features: [
        "Manual trade approval",
        "Custom signals",
        "Portfolio balancing",
        "Risk alerts",
      ],
      href: "/bots/manual",
      isActive: true,
      color: "from-empire-gold-500 to-empire-gold-600",
    },
    {
      id: "adaptive",
      name: "Adaptive AI Bot",
      description: "Advanced machine learning with pattern recognition",
      icon: Brain,
      riskLevel: "Dynamic",
      riskColor: "bg-purple-500/20 text-purple-400",
      performance: {
        winRate: "85%",
        monthlyReturn: "15.7%",
        maxDrawdown: "5.2%",
      },
      features: [
        "AI pattern recognition",
        "Adaptive learning",
        "Technical analysis",
        "Real-time optimization",
      ],
      href: "/bots/adaptive",
      isActive: true,
      color: "from-purple-500 to-purple-600",
      isNew: true,
    },
    {
      id: "builder",
      name: "Bot Builder",
      description: "Create and customize your own trading strategies",
      icon: Settings,
      riskLevel: "Custom",
      riskColor: "bg-orange-500/20 text-orange-400",
      performance: {
        winRate: "Variable",
        monthlyReturn: "Custom",
        maxDrawdown: "Configurable",
      },
      features: [
        "Strategy customization",
        "Rule-based logic",
        "Backtesting tools",
        "Template library",
      ],
      href: "/bots/builder",
      isActive: true,
      color: "from-purple-500 to-purple-600",
    },
  ];

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
            <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
                Trading Bots
              </h1>
              <p className="text-muted-foreground">
                Automated trading strategies for every risk tolerance
              </p>
            </div>
          </div>
          <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
            <Activity className="w-3 h-3 mr-1" />
            {bots.filter((bot) => bot.isActive).length} Active Bots
          </Badge>
        </motion.div>

        {/* Bot Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Profit</p>
                  <p className="text-2xl font-bold text-empire-emerald-400">
                    $12,847
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-empire-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Trades</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Activity className="w-8 h-8 text-empire-gold-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Win Rate</p>
                  <p className="text-2xl font-bold">73.8%</p>
                </div>
                <Target className="w-8 h-8 text-empire-navy-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio ROI</p>
                  <p className="text-2xl font-bold text-empire-emerald-400">
                    +18.2%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-empire-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bots Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {bots.map((bot, index) => {
            const Icon = bot.icon;
            return (
              <motion.div
                key={bot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bot.color} flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="group-hover:text-empire-emerald-400 transition-colors">
                            {bot.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className={`text-xs ${bot.riskColor}`}
                          >
                            {bot.riskLevel} Risk
                          </Badge>
                        </div>
                      </div>
                      {bot.isActive && (
                        <Badge
                          variant="default"
                          className="bg-empire-emerald-500/20 text-empire-emerald-400"
                        >
                          Active
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{bot.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-empire-emerald-400">
                          {bot.performance.winRate}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Win Rate
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-empire-gold-400">
                          {bot.performance.monthlyReturn}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Monthly
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-400">
                          {bot.performance.maxDrawdown}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Drawdown
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Key Features
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {bot.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-empire-emerald-400 rounded-full" />
                            <span className="text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full mt-4" asChild>
                      <Link to={bot.href}>
                        {bot.id === "builder" ? (
                          <>
                            <Settings className="w-4 h-4 mr-2" />
                            Build Strategy
                          </>
                        ) : (
                          <>
                            <ChevronRight className="w-4 h-4 mr-2" />
                            Configure Bot
                          </>
                        )}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Getting Started with Trading Bots</span>
              </CardTitle>
              <CardDescription>
                Choose the right bot for your trading style and risk tolerance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-empire-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-6 h-6 text-empire-emerald-400" />
                  </div>
                  <h3 className="font-semibold mb-2">New to Trading?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Start with our Safe Bot for conservative, low-risk
                    strategies that protect your capital.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/bots/safe">Try Safe Bot</Link>
                  </Button>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-empire-gold-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <User className="w-6 h-6 text-empire-gold-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Want Control?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use our Manual Bot to maintain oversight while benefiting
                    from automation.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/bots/manual">Try Manual Bot</Link>
                  </Button>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Settings className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold mb-2">Custom Strategy?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Build your own bot with our intuitive strategy builder and
                    proven templates.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/bots/builder">Build Custom Bot</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default BotsIndex;
