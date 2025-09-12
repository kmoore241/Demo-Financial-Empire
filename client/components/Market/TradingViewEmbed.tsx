import { useState, useEffect, memo, useRef } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  TrendingUp,
  TrendingDown,
  BarChart3,
  Globe,
  DollarSign,
  Bitcoin,
  Settings,
  RefreshCw,
} from "lucide-react";
import {
  mockCryptoCoins,
  mockStocks,
  formatCurrency,
  formatPercent,
  formatLargeNumber,
} from "@/lib/data";

const TradingViewEmbed = memo(() => {
  const [activeMarket, setActiveMarket] = useState("crypto");
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState(mockCryptoCoins);
  const [stockData, setStockData] = useState(mockStocks);
  const cryptoWidgetRef = useRef<HTMLDivElement>(null);
  const stockWidgetRef = useRef<HTMLDivElement>(null);

  // Load TradingView widgets
  useEffect(() => {
    const loadTradingViewWidget = () => {
      try {
        // Clear existing content
        if (cryptoWidgetRef.current && activeMarket === "crypto") {
          cryptoWidgetRef.current.innerHTML = "";

          // Create widget container
          const container = document.createElement("div");
          container.className = "tradingview-widget-container";
          container.style.height = "100%";
          container.style.width = "100%";

          const widgetDiv = document.createElement("div");
          widgetDiv.className = "tradingview-widget-container__widget";
          widgetDiv.style.height = "calc(100% - 32px)";
          widgetDiv.style.width = "100%";

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          script.async = true;

          const config = {
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            withdateranges: true,
            range: "YTD",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: false,
            studies: ["STD;SMA"],
          };

          script.innerHTML = JSON.stringify(config);

          container.appendChild(widgetDiv);
          container.appendChild(script);
          cryptoWidgetRef.current.appendChild(container);
        }

        if (stockWidgetRef.current && activeMarket === "stocks") {
          stockWidgetRef.current.innerHTML = "";

          // Create widget container
          const container = document.createElement("div");
          container.className = "tradingview-widget-container";
          container.style.height = "100%";
          container.style.width = "100%";

          const widgetDiv = document.createElement("div");
          widgetDiv.className = "tradingview-widget-container__widget";
          widgetDiv.style.height = "calc(100% - 32px)";
          widgetDiv.style.width = "100%";

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
          script.async = true;

          const config = {
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            withdateranges: true,
            range: "YTD",
            hide_side_toolbar: false,
            allow_symbol_change: true,
            details: true,
            hotlist: true,
            calendar: false,
            studies: ["STD;SMA", "STD;MACD"],
          };

          script.innerHTML = JSON.stringify(config);

          container.appendChild(widgetDiv);
          container.appendChild(script);
          stockWidgetRef.current.appendChild(container);
        }
      } catch (error) {
        console.error("TradingView widget error:", error);
        // Fall back to showing placeholder
      }
    };

    const timer = setTimeout(loadTradingViewWidget, 1000);
    return () => clearTimeout(timer);
  }, [activeMarket]);

  // Simulate real-time price updates for the data grid
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prev) =>
        prev.map((coin) => ({
          ...coin,
          price: coin.price * (1 + (Math.random() - 0.5) * 0.01), // ±0.5% random change
          change24h: coin.change24h * (1 + (Math.random() - 0.5) * 0.1),
          changePercent24h:
            coin.changePercent24h * (1 + (Math.random() - 0.5) * 0.1),
        })),
      );

      setStockData((prev) =>
        prev.map((stock) => ({
          ...stock,
          price: stock.price * (1 + (Math.random() - 0.5) * 0.005), // ±0.25% random change
          change24h: stock.change24h * (1 + (Math.random() - 0.5) * 0.1),
          changePercent24h:
            stock.changePercent24h * (1 + (Math.random() - 0.5) * 0.1),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentData = activeMarket === "crypto" ? cryptoData : stockData;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Live Markets</h2>
          <p className="text-muted-foreground">
            Real-time market data and analysis
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Market Tabs */}
      <Tabs
        value={activeMarket}
        onValueChange={setActiveMarket}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="crypto" className="flex items-center space-x-2">
            <Bitcoin className="w-4 h-4" />
            <span>Cryptocurrency</span>
          </TabsTrigger>
          <TabsTrigger value="stocks" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>S&P 500 / NASDAQ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="crypto" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chart */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bitcoin className="w-5 h-5 text-empire-gold-400" />
                  <span>Cryptocurrency Market</span>
                </CardTitle>
                <CardDescription>
                  Live crypto trading data powered by TradingView
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-empire-navy-900/20 to-empire-emerald-900/20 rounded-lg overflow-hidden">
                  <div
                    ref={cryptoWidgetRef}
                    className="w-full h-full"
                    style={{ minHeight: "400px" }}
                  >
                    {/* Loading placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="w-8 h-8 sm:w-12 sm:h-12 text-empire-emerald-400 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-base sm:text-lg font-semibold text-empire-emerald-400 mb-2">
                          Loading TradingView Chart...
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-4">
                          Real-time cryptocurrency charts powered by TradingView
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chart */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-empire-navy-400" />
                  <span>Stock Market Overview</span>
                </CardTitle>
                <CardDescription>
                  S&P 500, NASDAQ, and major stock indices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-empire-navy-900/20 to-empire-gold-900/20 rounded-lg overflow-hidden">
                  <div
                    ref={stockWidgetRef}
                    className="w-full h-full"
                    style={{ minHeight: "400px" }}
                  >
                    {/* Loading placeholder */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 sm:w-12 sm:h-12 text-empire-gold-400 mx-auto mb-4 animate-pulse" />
                        <h3 className="text-base sm:text-lg font-semibold text-empire-gold-400 mb-2">
                          Loading TradingView Chart...
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-4">
                          Real-time stock market charts powered by TradingView
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>

      {/* Market Data Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        {currentData.map((asset, index) => {
          const isPositive = asset.changePercent24h >= 0;
          return (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              whileHover={{ y: -2 }}
              className="group"
            >
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-sm sm:text-lg truncate">
                          {asset.symbol}
                        </span>
                        <Badge
                          variant={isPositive ? "default" : "secondary"}
                          className={
                            isPositive
                              ? "bg-empire-emerald-500/20 text-empire-emerald-400 text-xs"
                              : "bg-red-500/20 text-red-400 text-xs"
                          }
                        >
                          {isPositive ? (
                            <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                          )}
                          {formatPercent(asset.changePercent24h)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {asset.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg sm:text-xl font-bold">
                      {formatCurrency(asset.price)}
                    </div>
                    <div
                      className={`text-xs sm:text-sm ${isPositive ? "text-empire-emerald-400" : "text-red-400"}`}
                    >
                      {isPositive ? "+" : ""}
                      {formatCurrency(asset.change24h)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Vol:{" "}
                      {activeMarket === "crypto"
                        ? formatLargeNumber(asset.volume24h || 0)
                        : formatLargeNumber((asset as any).volume || 0)}
                    </div>
                    {asset.marketCap && (
                      <div className="text-xs text-muted-foreground">
                        Cap: {formatLargeNumber(asset.marketCap)}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});

TradingViewEmbed.displayName = "TradingViewEmbed";

export default TradingViewEmbed;
