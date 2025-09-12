import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Crown,
  Home,
  Search,
  TrendingUp,
  Shield,
  ArrowLeft,
  Compass,
} from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const quickLinks = [
    {
      title: "Trading Dashboard",
      description: "View your portfolio and market data",
      href: "/dashboard",
      icon: TrendingUp,
      color: "from-empire-emerald-500 to-empire-emerald-600",
    },
    {
      title: "Trading Academy",
      description: "Learn with our educational courses",
      href: "/academy",
      icon: Shield,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Secure Wallet",
      description: "Manage your digital assets",
      href: "/wallet",
      icon: Shield,
      color: "from-empire-navy-500 to-empire-navy-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Logo and Branding */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <Crown className="w-12 h-12 text-empire-navy-900" />
              </div>
              <Shield className="absolute -top-2 -right-2 w-8 h-8 text-empire-emerald-400" />
            </motion.div>
          </div>

          {/* 404 Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-empire-gold-400 via-empire-emerald-400 to-empire-gold-400 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Page Not Found in the Empire
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The trading route you're looking for doesn't exist in our
              financial empire. Perhaps it was moved to a more secure vault, or
              maybe it never existed at all.
            </p>
          </motion.div>

          {/* Current Path Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm max-w-md mx-auto">
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Requested path:</span>
                  <code className="px-2 py-1 bg-muted rounded text-empire-gold-400 font-mono">
                    {location.pathname}
                  </code>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700 text-lg px-8 py-3"
              asChild
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Return to Empire
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-empire-gold-400 text-empire-gold-400 hover:bg-empire-gold-400/10 text-lg px-8 py-3"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-8 flex items-center justify-center space-x-2">
              <Compass className="w-5 h-5" />
              <span>Explore Our Trading Empire</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={link.href}>
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-empire-emerald-500/25 transition-all duration-300 h-full">
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold text-lg mb-2 group-hover:text-empire-emerald-400 transition-colors">
                            {link.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 text-center"
          >
            <p className="text-sm text-muted-foreground">
              If you believe this is an error, please contact our support team.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Error logged: {new Date().toLocaleString()}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
