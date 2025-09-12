import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Crown,
  TrendingUp,
  BarChart3,
  Wallet,
  History,
  Waves,
  BookOpen,
  Settings,
  Menu,
  X,
  Shield,
  Calculator,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Trading Bots", href: "/bots", icon: TrendingUp },
    { name: "Markets", href: "/markets", icon: BarChart3 },
    { name: "Planner", href: "/planner", icon: Calculator },
    { name: "Wallet", href: "/wallet", icon: Wallet },
    { name: "History", href: "/history", icon: History },
    { name: "Academy", href: "/academy", icon: BookOpen },
    { name: "Community", href: "/community", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-lg flex items-center justify-center shadow-lg">
          <img
            src="/logo.svg"
            alt="Financial Empire Logo"
            className="w-6 h-6 object-contain"
            onError={(e) => {
              // Fallback to Crown icon if logo fails to load
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
          <Crown className="w-6 h-6 text-empire-navy-900 hidden" />
        </div>
        <Shield className="absolute -top-1 -right-1 w-4 h-4 text-empire-emerald-400" />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent truncate">
          Financial Empire
        </span>
        <span className="text-xs text-muted-foreground -mt-1 hidden sm:block truncate">
          Trading Platform
        </span>
      </div>
    </div>
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "flex items-center space-x-2 relative",
                        isActive &&
                          "bg-empire-emerald-500/20 text-empire-emerald-400 hover:bg-empire-emerald-500/30",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-empire-emerald-400"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700"
                    asChild
                  >
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden bg-card border-t border-border"
        >
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start space-x-3",
                      isActive &&
                        "bg-empire-emerald-500/20 text-empire-emerald-400",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-border">
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600"
                  asChild
                >
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
};

export default Navigation;
