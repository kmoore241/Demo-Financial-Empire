import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  BarChart3,
  Wallet,
  History,
  Waves,
  BookOpen,
  Settings,
  Shield,
  Crown,
  ChevronRight,
  Zap,
  Target,
  Brain,
  Lock,
  Trophy,
  Globe,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const Index = () => {
  const modules = [
    {
      title: "Trading Dashboard",
      description:
        "Real-time crypto & stock charts with TradingView integration",
      icon: BarChart3,
      href: "/dashboard",
      color: "from-empire-emerald-500 to-empire-emerald-600",
      badge: "Live Data",
    },
    {
      title: "Safe Bot",
      description: "Conservative trading strategies with risk management",
      icon: Shield,
      href: "/bots/safe",
      color: "from-empire-navy-500 to-empire-navy-600",
      badge: "Low Risk",
    },
    {
      title: "Aggressive Bot",
      description: "High-yield trading with advanced algorithms",
      icon: Zap,
      href: "/bots/aggressive",
      color: "from-empire-gold-500 to-empire-gold-600",
      badge: "High Yield",
    },
    {
      title: "Manual Trading",
      description: "Take full control with manual trading interface",
      icon: Target,
      href: "/bots/manual",
      color: "from-purple-500 to-purple-600",
      badge: "Full Control",
    },
    {
      title: "Stock Markets",
      description: "S&P 500, NASDAQ, and global market analysis",
      icon: TrendingUp,
      href: "/markets",
      color: "from-blue-500 to-blue-600",
      badge: "Global",
    },
    {
      title: "Secure Wallet",
      description: "Multi-layer security for your digital assets",
      icon: Wallet,
      href: "/wallet",
      color: "from-emerald-500 to-teal-600",
      badge: "Secure",
    },
    {
      title: "Trade History",
      description: "Comprehensive trading logs with export options",
      icon: History,
      href: "/history",
      color: "from-slate-500 to-slate-600",
      badge: "Analytics",
    },
    {
      title: "Whale Tracker",
      description: "Monitor large transactions and market sentiment",
      icon: Waves,
      href: "/whale-tracker",
      color: "from-cyan-500 to-cyan-600",
      badge: "Real-time",
    },
    {
      title: "Trading Academy",
      description: "Learn trading strategies with interactive courses",
      icon: BookOpen,
      href: "/academy",
      color: "from-orange-500 to-orange-600",
      badge: "Educational",
    },
  ];

  const stats = [
    { label: "Active Traders", value: "50,000+", icon: Globe },
    { label: "Total Volume", value: "$2.5B", icon: TrendingUp },
    { label: "Success Rate", value: "94.2%", icon: Trophy },
    { label: "Security Score", value: "AAA+", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-empire-emerald-500/10 via-transparent to-empire-gold-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Crown className="w-12 h-12 text-empire-navy-900" />
                </div>
                <Shield className="absolute -top-2 -right-2 w-8 h-8 text-empire-emerald-400" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-empire-gold-400 via-empire-emerald-400 to-empire-gold-400 bg-clip-text text-transparent">
                Financial Empire
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Where old-money prestige meets cutting-edge technology
            </p>

            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Advanced trading platform with AI-powered bots, real-time
              analytics, and institutional-grade security for the modern
              investor.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700 text-lg px-8 py-3"
                asChild
              >
                <Link to="/dashboard">
                  Start Trading <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-empire-gold-400 text-empire-gold-400 hover:bg-empire-gold-400/10 text-lg px-8 py-3"
                asChild
              >
                <Link to="/academy">
                  Learn Trading <Brain className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500/20 to-empire-gold-500/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-empire-emerald-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-empire-gold-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trading Modules */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trading <span className="text-empire-emerald-400">Ecosystem</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive suite of trading tools designed for both novice and
              professional traders
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={module.href}>
                    <Card className="h-full border-border/50 hover:border-empire-emerald-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-empire-emerald-500/25 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {module.badge}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-empire-emerald-400 transition-colors">
                          {module.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          {module.description}
                        </CardDescription>
                        <div className="flex items-center text-empire-emerald-400 group-hover:text-empire-emerald-300 transition-colors">
                          <span className="text-sm font-medium">
                            Launch Module
                          </span>
                          <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-empire-navy-900/50 to-empire-emerald-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Your
              <span className="text-empire-gold-400"> Financial Empire</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of traders who trust our platform for secure,
              profitable trading experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700 text-lg px-8 py-3"
                asChild
              >
                <Link to="/signup">
                  Create Account <Crown className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-empire-gold-400 text-empire-gold-400 hover:bg-empire-gold-400/10 text-lg px-8 py-3"
                asChild
              >
                <Link to="/wallet">
                  Connect Wallet <Wallet className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
