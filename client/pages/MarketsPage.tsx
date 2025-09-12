import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  Globe,
  DollarSign,
  Bitcoin,
  Settings,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Waves,
  Eye,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Zap,
  Activity,
  Wallet,
  Target,
  ExternalLink,
  Newspaper,
  Calendar,
  Users,
} from "lucide-react";
import TradingViewEmbed from "@/components/Market/TradingViewEmbed";
import { formatCurrency, formatPercent, formatLargeNumber } from "@/lib/data";
import {
  getTopCryptos,
  getMarketData,
  getMarketNews,
  getWhaleTransactions,
  type CryptoCoin,
} from "@/lib/marketAPI";
import { useNotificationContext } from "@/contexts/NotificationContext";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  category: "crypto" | "stocks" | "general";
  sentiment: "positive" | "negative" | "neutral";
  readTime: string;
  tags: string[];
}

interface WhaleTransaction {
  id: string;
  address: string;
  type: "buy" | "sell" | "transfer";
  asset: string;
  amount: string;
  usdValue: string;
  timestamp: string;
  exchange?: string;
  impact: "high" | "medium" | "low";
}

const MarketsPage = () => {
  const { addWhaleAlert, addPriceAlert, addNewsAlert } =
    useNotificationContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAsset, setSelectedAsset] = useState("all");
  const [minValue, setMinValue] = useState("1000000");
  const [cryptoData, setCryptoData] = useState<CryptoCoin[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [whaleTransactions, setWhaleTransactions] = useState<
    WhaleTransaction[]
  >([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [marketPrices, setMarketPrices] = useState({
    BTC: 116234,
    ETH: 2650,
    USDC: 1.0,
    USDT: 1.0,
    ADA: 0.48,
    SOL: 98.5,
    MATIC: 0.85,
    LINK: 14.5,
  });

  // Generate realistic whale transactions
  const generateRealisticTransaction = (): WhaleTransaction => {
    const assets = Object.keys(marketPrices);
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const price = marketPrices[asset as keyof typeof marketPrices];

    const minUsdValue = 1000000 + Math.random() * 15000000;
    const amount = minUsdValue / price;

    const exchanges = [
      "Binance",
      "Coinbase",
      "Kraken",
      "OKX",
      "Bybit",
      "Bitfinex",
    ];
    const types: ("buy" | "sell" | "transfer")[] = ["buy", "sell", "transfer"];

    const usdValue = amount * price;
    let impact: "high" | "medium" | "low";

    if (usdValue > 10000000) impact = "high";
    else if (usdValue > 5000000) impact = "medium";
    else impact = "low";

    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      type,
      asset,
      amount: amount.toFixed(asset === "BTC" ? 3 : asset === "ETH" ? 2 : 0),
      usdValue: `$${usdValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      timestamp: "Just now",
      exchange:
        type !== "transfer"
          ? exchanges[Math.floor(Math.random() * exchanges.length)]
          : undefined,
      impact,
    };
  };

  // Mock news data
  const mockNews: NewsItem[] = [
    {
      id: "news1",
      title:
        "Bitcoin Reaches New Heights Above $116,000 as Institutional Adoption Accelerates",
      summary:
        "Major corporations continue to add Bitcoin to their balance sheets, driving institutional adoption to new heights as BTC breaks through key resistance levels.",
      source: "CoinDesk",
      sourceUrl: "https://coindesk.com",
      publishedAt: "2 hours ago",
      category: "crypto",
      sentiment: "positive",
      readTime: "3 min",
      tags: ["Bitcoin", "Institutional", "Adoption"],
    },
    {
      id: "news2",
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      summary:
        "Fed officials hint at possible interest rate reductions, potentially boosting risk assets including stocks and crypto.",
      source: "Reuters",
      sourceUrl: "https://reuters.com",
      publishedAt: "4 hours ago",
      category: "general",
      sentiment: "positive",
      readTime: "5 min",
      tags: ["Federal Reserve", "Interest Rates", "Policy"],
    },
    {
      id: "news3",
      title: "Ethereum Network Upgrade Promises Lower Gas Fees",
      summary:
        "The latest Ethereum improvement proposal aims to significantly reduce transaction costs for users.",
      source: "Decrypt",
      sourceUrl: "https://decrypt.co",
      publishedAt: "6 hours ago",
      category: "crypto",
      sentiment: "positive",
      readTime: "4 min",
      tags: ["Ethereum", "Gas Fees", "Upgrade"],
    },
    {
      id: "news4",
      title: "Tech Giants Report Strong Q4 Earnings, AI Investments Pay Off",
      summary:
        "Major technology companies exceed expectations as artificial intelligence investments drive revenue growth.",
      source: "Wall Street Journal",
      sourceUrl: "https://wsj.com",
      publishedAt: "8 hours ago",
      category: "stocks",
      sentiment: "positive",
      readTime: "6 min",
      tags: ["Tech", "Earnings", "AI"],
    },
    {
      id: "news5",
      title: "Regulatory Clarity Boosts Crypto Market Confidence",
      summary:
        "New guidelines from financial regulators provide clearer framework for cryptocurrency operations.",
      source: "Bloomberg",
      sourceUrl: "https://bloomberg.com",
      publishedAt: "1 day ago",
      category: "crypto",
      sentiment: "positive",
      readTime: "7 min",
      tags: ["Regulation", "Compliance", "Framework"],
    },
    {
      id: "news6",
      title: "Market Volatility Expected as Economic Data Releases Approach",
      summary:
        "Analysts predict increased market activity ahead of key economic indicators including inflation and employment data.",
      source: "Financial Times",
      sourceUrl: "https://ft.com",
      publishedAt: "1 day ago",
      category: "general",
      sentiment: "neutral",
      readTime: "4 min",
      tags: ["Volatility", "Economic Data", "Analysis"],
    },
  ];

  // Initialize data with live API calls
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Fetch live market data
        const [cryptos, news, whales] = await Promise.all([
          getTopCryptos(20),
          getMarketNews(),
          getWhaleTransactions(),
        ]);

        setCryptoData(cryptos);

        // Update market prices from live data
        const livePrices: any = {};
        cryptos.forEach((crypto) => {
          livePrices[crypto.symbol.toUpperCase()] = crypto.current_price;
        });
        setMarketPrices((prev) => ({ ...prev, ...livePrices }));

        // Convert news to match interface
        const formattedNews: NewsItem[] = news
          .slice(0, 10)
          .map((article, index) => ({
            id: `news_${index}`,
            title: article.title,
            summary: article.description || article.title,
            source: article.source,
            sourceUrl: article.url,
            publishedAt: new Date(article.publishedAt).toLocaleDateString(),
            category: "crypto" as const,
            sentiment: "neutral" as const,
            readTime: "3 min",
            tags: ["Crypto", "Market"],
          }));
        setNewsItems(formattedNews);

        // Convert whale data to match interface
        const formattedWhales: WhaleTransaction[] = whales.map((whale) => ({
          id: whale.id,
          asset: whale.symbol,
          amount: whale.amount.toLocaleString(),
          usdValue: `$${whale.value.toLocaleString()}`,
          type: whale.type,
          address: whale.address,
          timestamp: new Date(whale.timestamp).toLocaleTimeString(),
          exchange: "Exchange",
          impact:
            whale.value > 10000000
              ? ("high" as const)
              : whale.value > 5000000
                ? ("medium" as const)
                : ("low" as const),
        }));
        setWhaleTransactions(formattedWhales);
      } catch (error) {
        console.error("Error fetching live data:", error);
        // Fallback to mock data
        const initialTransactions: WhaleTransaction[] = [];
        const timeStamps = [
          "2 min ago",
          "5 min ago",
          "8 min ago",
          "12 min ago",
          "18 min ago",
          "25 min ago",
        ];

        for (let i = 0; i < 6; i++) {
          const tx = generateRealisticTransaction();
          tx.id = i.toString();
          tx.timestamp = timeStamps[i];
          initialTransactions.push(tx);
        }

        setWhaleTransactions(initialTransactions);
        setNewsItems(mockNews);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Update market prices and add new whale transactions
    const priceUpdateInterval = setInterval(() => {
      setMarketPrices((prev) => {
        const newPrices = { ...prev };
        Object.keys(newPrices).forEach((asset) => {
          const oldPrice = prev[asset as keyof typeof prev];
          const change = (Math.random() - 0.5) * 0.12; // Increased volatility for better demo
          const newPrice = oldPrice * (1 + change);
          const changePercent = ((newPrice - oldPrice) / oldPrice) * 100;

          newPrices[asset as keyof typeof newPrices] = newPrice;

          // Trigger price alerts for significant changes (>7%)
          if (Math.abs(changePercent) > 7) {
            addPriceAlert(asset, newPrice, changePercent);
          }
        });
        return newPrices;
      });
    }, 30000);

    const transactionInterval = setInterval(() => {
      const marketVolatility = Math.random();
      const shouldAddTransaction = marketVolatility > 0.6;

      if (shouldAddTransaction) {
        const newTransaction = generateRealisticTransaction();
        setWhaleTransactions((prev) => [newTransaction, ...prev.slice(0, 19)]);

        // Trigger whale alert for large transactions
        const usdValue = parseFloat(
          newTransaction.usdValue.replace(/[$,]/g, ""),
        );
        const amount = parseFloat(newTransaction.amount);
        if (usdValue > 5000000) {
          // Alert for transactions over $5M
          addWhaleAlert(
            newTransaction.asset,
            amount,
            newTransaction.type as "buy" | "sell",
            usdValue,
          );
        }
      }
    }, 20000);

    // Add periodic news alerts for demonstration
    const newsInterval = setInterval(() => {
      const shouldAddNews = Math.random() > 0.8; // 20% chance every 45 seconds
      if (shouldAddNews) {
        const demoNews = [
          {
            title: "Federal Reserve Announces New Digital Currency Framework",
            summary:
              "The Federal Reserve releases comprehensive guidelines for central bank digital currencies, potentially impacting crypto markets.",
          },
          {
            title: "Major Tech Giant Announces $2B Bitcoin Purchase",
            summary:
              "A Fortune 500 company adds Bitcoin to its treasury reserves, following the corporate adoption trend.",
          },
          {
            title: "New DeFi Protocol Launches with $500M TVL",
            summary:
              "Revolutionary decentralized finance platform attracts massive liquidity on launch day.",
          },
          {
            title: "Regulatory Clarity Boosts Institutional Crypto Adoption",
            summary:
              "Clear regulatory guidelines from major jurisdictions drive institutional investment into digital assets.",
          },
        ];

        const randomNews =
          demoNews[Math.floor(Math.random() * demoNews.length)];
        addNewsAlert(randomNews.title, randomNews.summary, "Financial Times");
      }
    }, 45000); // Every 45 seconds

    return () => {
      clearInterval(priceUpdateInterval);
      clearInterval(transactionInterval);
      clearInterval(newsInterval);
    };
  }, [addPriceAlert, addWhaleAlert, addNewsAlert]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "buy":
        return <ArrowUpRight className="w-4 h-4 text-empire-emerald-400" />;
      case "sell":
        return <ArrowDownLeft className="w-4 h-4 text-red-400" />;
      case "transfer":
        return <ArrowDownLeft className="w-4 h-4 text-empire-gold-400" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "low":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "negative":
        return "bg-red-500/20 text-red-400";
      case "neutral":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredTransactions = whaleTransactions.filter((tx) => {
    if (selectedAsset !== "all" && tx.asset !== selectedAsset) return false;
    const value = parseFloat(tx.usdValue.replace(/[$,]/g, ""));
    return value >= parseFloat(minValue);
  });

  const filteredNews = newsItems.filter((news) => {
    if (activeTab === "crypto" && news.category !== "crypto") return false;
    if (activeTab === "stocks" && news.category !== "stocks") return false;
    return true;
  });

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
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
                Markets Hub
              </h1>
              <p className="text-muted-foreground">
                Complete market analysis, whale tracking, and financial news
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
              <Activity className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-muted/50">
              <TabsTrigger
                value="overview"
                className="flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="whales"
                className="flex items-center space-x-2"
              >
                <Waves className="w-4 h-4" />
                <span>Whale Tracker</span>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center space-x-2">
                <Newspaper className="w-4 h-4" />
                <span>News</span>
              </TabsTrigger>
              <TabsTrigger
                value="analysis"
                className="flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Analysis</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <TradingViewEmbed />
            </TabsContent>

            {/* Whale Tracker Tab */}
            <TabsContent value="whales" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Whale Filters */}
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Filter className="w-5 h-5" />
                      <span>Transaction Filters</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Asset
                        </label>
                        <Select
                          value={selectedAsset}
                          onValueChange={setSelectedAsset}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Assets</SelectItem>
                            <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                            <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                            <SelectItem value="USDC">
                              USD Coin (USDC)
                            </SelectItem>
                            <SelectItem value="USDT">Tether (USDT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Minimum Value (USD)
                        </label>
                        <Input
                          type="number"
                          value={minValue}
                          onChange={(e) => setMinValue(e.target.value)}
                          placeholder="1000000"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                          <Eye className="w-4 h-4 mr-2" />
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Whale Transactions */}
                  <div className="lg:col-span-2">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Zap className="w-5 h-5" />
                          <span>Live Whale Transactions</span>
                        </CardTitle>
                        <CardDescription>
                          Large transactions happening in real-time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {filteredTransactions.map((tx, index) => (
                            <motion.div
                              key={tx.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: 0.05 * index,
                              }}
                              className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-2">
                                  {getTypeIcon(tx.type)}
                                  <span className="font-medium capitalize">
                                    {tx.type}
                                  </span>
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <span className="font-bold">
                                      {tx.asset}
                                    </span>
                                    <Badge
                                      variant="secondary"
                                      className={getImpactColor(tx.impact)}
                                    >
                                      {tx.impact}
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {tx.address}
                                    {tx.exchange && ` • ${tx.exchange}`}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">{tx.amount}</div>
                                <div className="text-sm text-empire-emerald-400">
                                  {tx.usdValue}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {tx.timestamp}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Whale Statistics */}
                  <div className="space-y-6">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5" />
                          <span>Whale Statistics</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            24h Volume
                          </span>
                          <span className="font-bold">
                            $
                            {(
                              whaleTransactions.reduce(
                                (sum, tx) =>
                                  sum +
                                  parseFloat(tx.usdValue.replace(/[$,]/g, "")),
                                0,
                              ) / 1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Active Whales
                          </span>
                          <span className="font-bold text-cyan-400">
                            {new Set(whaleTransactions.map((tx) => tx.address))
                              .size + 180}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Avg Transaction
                          </span>
                          <span className="font-bold">
                            $
                            {(
                              whaleTransactions.reduce(
                                (sum, tx) =>
                                  sum +
                                  parseFloat(tx.usdValue.replace(/[$,]/g, "")),
                                0,
                              ) /
                              whaleTransactions.length /
                              1000000
                            ).toFixed(1)}
                            M
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Market Impact
                          </span>
                          <span className="font-bold text-empire-emerald-400">
                            +1.2%
                          </span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Alerts */}
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-empire-gold-400" />
                          <span>Whale Alerts</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {whaleTransactions.slice(0, 3).map((tx, index) => {
                          const isPositive =
                            tx.type === "buy" || tx.type === "transfer";
                          const colorClass = isPositive
                            ? "bg-empire-emerald-500/10 border-empire-emerald-400/30"
                            : "bg-red-500/10 border-red-400/30";
                          const iconColorClass = isPositive
                            ? "text-empire-emerald-400"
                            : "text-red-400";

                          return (
                            <div
                              key={tx.id}
                              className={`p-3 rounded-lg ${colorClass}`}
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                {isPositive ? (
                                  <TrendingUp
                                    className={`w-4 h-4 ${iconColorClass}`}
                                  />
                                ) : (
                                  <TrendingDown
                                    className={`w-4 h-4 ${iconColorClass}`}
                                  />
                                )}
                                <span className="font-medium text-sm">
                                  {tx.type === "buy"
                                    ? "Large Purchase"
                                    : tx.type === "sell"
                                      ? "Whale Sell-off"
                                      : "Large Transfer"}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {tx.amount} {tx.asset} {tx.type}ed{" "}
                                {tx.exchange
                                  ? `on ${tx.exchange}`
                                  : "between wallets"}{" "}
                                - {tx.usdValue}
                              </p>
                            </div>
                          );
                        })}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* News Tab */}
            <TabsContent value="news" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* News Feed */}
                <div className="lg:col-span-2">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Newspaper className="w-5 h-5" />
                        <span>Latest Financial News</span>
                      </CardTitle>
                      <CardDescription>
                        Real-time market news from trusted sources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {filteredNews.map((news, index) => (
                          <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant="secondary"
                                  className={getSentimentColor(news.sentiment)}
                                >
                                  {news.sentiment}
                                </Badge>
                                <Badge variant="outline">{news.category}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  {news.readTime}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {news.publishedAt}
                              </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                              {news.title}
                            </h3>

                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {news.summary}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {news.source}
                                </span>
                                <div className="flex space-x-1">
                                  {news.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    news.sourceUrl,
                                    "_blank",
                                    "noopener,noreferrer",
                                  )
                                }
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Read Full
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* News Sidebar */}
                <div className="space-y-6">
                  {/* News Categories */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Filter className="w-5 h-5" />
                        <span>Categories</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        {
                          id: "all",
                          label: "All News",
                          count: newsItems.length,
                        },
                        {
                          id: "crypto",
                          label: "Cryptocurrency",
                          count: newsItems.filter(
                            (n) => n.category === "crypto",
                          ).length,
                        },
                        {
                          id: "stocks",
                          label: "Stock Market",
                          count: newsItems.filter(
                            (n) => n.category === "stocks",
                          ).length,
                        },
                        {
                          id: "general",
                          label: "General Finance",
                          count: newsItems.filter(
                            (n) => n.category === "general",
                          ).length,
                        },
                      ].map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            activeTab === category.id ? "default" : "ghost"
                          }
                          className="w-full justify-between"
                          onClick={() => setActiveTab(category.id)}
                        >
                          <span>{category.label}</span>
                          <Badge variant="secondary">{category.count}</Badge>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* News Sources */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Globe className="w-5 h-5" />
                        <span>Trusted Sources</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Array.from(new Set(newsItems.map((n) => n.source))).map(
                        (source) => {
                          const sourceNews = newsItems.find(
                            (n) => n.source === source,
                          );
                          return (
                            <div
                              key={source}
                              className="flex items-center justify-between"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    sourceNews?.sourceUrl,
                                    "_blank",
                                    "noopener,noreferrer",
                                  )
                                }
                                className="justify-start"
                              >
                                <ExternalLink className="w-3 h-3 mr-2" />
                                {source}
                              </Button>
                              <Badge variant="outline">
                                {
                                  newsItems.filter((n) => n.source === source)
                                    .length
                                }
                              </Badge>
                            </div>
                          );
                        },
                      )}
                    </CardContent>
                  </Card>

                  {/* Market Sentiment */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5" />
                        <span>News Sentiment</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Positive
                        </span>
                        <span className="font-bold text-empire-emerald-400">
                          {
                            newsItems.filter((n) => n.sentiment === "positive")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Neutral
                        </span>
                        <span className="font-bold text-empire-gold-400">
                          {
                            newsItems.filter((n) => n.sentiment === "neutral")
                              .length
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Negative
                        </span>
                        <span className="font-bold text-red-400">
                          {
                            newsItems.filter((n) => n.sentiment === "negative")
                              .length
                          }
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <Target className="w-16 h-16 text-empire-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Advanced Market Analysis
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Comprehensive market analysis tools and AI-powered insights
                  coming soon.
                </p>
                <Button className="bg-empire-emerald-500 hover:bg-empire-emerald-600">
                  <Activity className="w-4 h-4 mr-2" />
                  View Technical Analysis
                </Button>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketsPage;
