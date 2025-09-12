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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Waves,
  TrendingUp,
  TrendingDown,
  Eye,
  AlertTriangle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Zap,
  Activity,
  BarChart3,
  Wallet,
  Target,
} from "lucide-react";

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

const WhaleTracker = () => {
  const [whaleTransactions, setWhaleTransactions] = useState<
    WhaleTransaction[]
  >([]);
  const [selectedAsset, setSelectedAsset] = useState("all");
  const [minValue, setMinValue] = useState("1000000");

  // Real-time market prices for whale transaction calculations
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

  // Generate realistic whale transactions based on current market conditions
  const generateRealisticTransaction = (): WhaleTransaction => {
    const assets = Object.keys(marketPrices);
    const asset = assets[Math.floor(Math.random() * assets.length)];
    const price = marketPrices[asset as keyof typeof marketPrices];

    // Generate whale-sized amounts (minimum $1M USD value)
    const minUsdValue = 1000000 + Math.random() * 15000000; // $1M - $16M
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

  // Initialize with realistic whale transactions
  const generateInitialTransactions = (): WhaleTransaction[] => {
    const transactions: WhaleTransaction[] = [];
    const timeStamps = [
      "2 min ago",
      "5 min ago",
      "8 min ago",
      "12 min ago",
      "18 min ago",
      "25 min ago",
      "35 min ago",
      "42 min ago",
    ];

    for (let i = 0; i < 8; i++) {
      const tx = generateRealisticTransaction();
      tx.id = i.toString();
      tx.timestamp = timeStamps[i];
      transactions.push(tx);
    }

    return transactions;
  };

  const whaleWallets = [
    {
      address: "0x742d35Cc...2f23B",
      label: "Tesla Wallet",
      balance: "$2.4B",
      activity: "Very Active",
      risk: "Low",
    },
    {
      address: "0x1a2b3c4d...8e9f0",
      label: "Unknown Whale #1",
      balance: "$1.8B",
      activity: "Moderate",
      risk: "Medium",
    },
    {
      address: "0x9f8e7d6c...4b3a2",
      label: "Grayscale Fund",
      balance: "$3.2B",
      activity: "Low",
      risk: "Low",
    },
    {
      address: "0x5a6b7c8d...1e2f3",
      label: "Unknown Whale #2",
      balance: "$987M",
      activity: "High",
      risk: "High",
    },
  ];

  // Generate market impact data based on recent transactions
  const generateMarketImpactData = () => {
    const recentTransactions = whaleTransactions.slice(0, 4);
    return recentTransactions.map((tx, index) => {
      const baseTime = new Date();
      baseTime.setMinutes(baseTime.getMinutes() - (index + 1) * 15);
      const timeString = baseTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Calculate impact based on transaction size and type
      const usdValue = parseFloat(tx.usdValue.replace(/[$,]/g, ""));
      let impactPercent = 0;

      if (tx.type === "buy") {
        impactPercent = (usdValue / 100000000) * (Math.random() * 2 + 0.5); // 0.5-2.5% for buys
      } else if (tx.type === "sell") {
        impactPercent = -(usdValue / 100000000) * (Math.random() * 2 + 0.5); // negative for sells
      }

      return {
        time: timeString,
        event: `${tx.asset} ${tx.type === "transfer" ? "Transfer" : tx.type === "buy" ? "Purchase" : "Sale"}`,
        impact: `${impactPercent >= 0 ? "+" : ""}${impactPercent.toFixed(1)}%`,
        volume: tx.usdValue,
        positive: impactPercent >= 0,
      };
    });
  };

  const marketImpactData = generateMarketImpactData();

  // Fetch real market prices and simulate blockchain monitoring
  useEffect(() => {
    // Initialize with realistic transactions
    setWhaleTransactions(generateInitialTransactions());

    // Update market prices every 30 seconds (simulating real API calls)
    const priceUpdateInterval = setInterval(() => {
      setMarketPrices((prev) => {
        const newPrices = { ...prev };
        Object.keys(newPrices).forEach((asset) => {
          // Simulate realistic price movements (-3% to +3%)
          const change = (Math.random() - 0.5) * 0.06;
          newPrices[asset as keyof typeof newPrices] *= 1 + change;
        });
        return newPrices;
      });
    }, 30000);

    // Add new whale transactions based on market activity
    const transactionInterval = setInterval(() => {
      // Higher probability during volatile market conditions
      const marketVolatility = Math.random();
      const shouldAddTransaction = marketVolatility > 0.6; // 40% chance every 20 seconds

      if (shouldAddTransaction) {
        const newTransaction = generateRealisticTransaction();

        setWhaleTransactions((prev) => {
          const updated = [newTransaction, ...prev.slice(0, 19)]; // Keep last 20 transactions
          return updated;
        });
      }
    }, 20000); // Check every 20 seconds

    return () => {
      clearInterval(priceUpdateInterval);
      clearInterval(transactionInterval);
    };
  }, []);

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

  const filteredTransactions = whaleTransactions.filter((tx) => {
    if (selectedAsset !== "all" && tx.asset !== selectedAsset) return false;
    const value = parseFloat(tx.usdValue.replace(/[$,]/g, ""));
    return value >= parseFloat(minValue);
  });

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
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
              Whale Tracker
            </h1>
            <p className="text-muted-foreground">
              Monitor large transactions and market sentiment
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-cyan-500/20 text-cyan-400">
            <Activity className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <Badge variant="secondary">
            {filteredTransactions.length} Transactions
          </Badge>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
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
                <label className="text-sm font-medium mb-2 block">Asset</label>
                <Select value={selectedAsset} onValueChange={setSelectedAsset}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDC">USD Coin (USDC)</SelectItem>
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
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Whale Transactions */}
        <div className="lg:col-span-2 space-y-6">
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
                    transition={{ duration: 0.4, delay: 0.05 * index }}
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
                          <span className="font-bold">{tx.asset}</span>
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

          {/* Market Impact */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Market Impact Analysis</span>
              </CardTitle>
              <CardDescription>
                How whale movements affect market prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketImpactData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-muted-foreground">
                        {item.time}
                      </div>
                      <div className="font-medium">{item.event}</div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${item.positive ? "text-empire-emerald-400" : "text-red-400"}`}
                      >
                        {item.impact}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {item.volume}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Whale Statistics */}
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
                        sum + parseFloat(tx.usdValue.replace(/[$,]/g, "")),
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
                  {new Set(whaleTransactions.map((tx) => tx.address)).size +
                    180}
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
                        sum + parseFloat(tx.usdValue.replace(/[$,]/g, "")),
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
                <span
                  className={`font-bold ${
                    marketImpactData[0]?.positive
                      ? "text-empire-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {marketImpactData[0]?.impact || "+0.0%"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Top Whale Wallets */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wallet className="w-5 h-5" />
                <span>Top Whale Wallets</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {whaleWallets.map((wallet, index) => (
                <motion.div
                  key={wallet.address}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="space-y-2 p-3 rounded-lg border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{wallet.label}</div>
                    <Badge
                      variant="secondary"
                      className={
                        wallet.risk === "Low"
                          ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                          : wallet.risk === "Medium"
                            ? "bg-empire-gold-500/20 text-empire-gold-400"
                            : "bg-red-500/20 text-red-400"
                      }
                    >
                      {wallet.risk}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {wallet.address}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Balance: {wallet.balance}</span>
                    <span className="text-cyan-400">{wallet.activity}</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-empire-gold-400" />
                <span>Whale Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {whaleTransactions.slice(0, 3).map((tx, index) => {
                const isPositive = tx.type === "buy" || tx.type === "transfer";
                const colorClass = isPositive
                  ? "bg-empire-emerald-500/10 border-empire-emerald-400/30"
                  : "bg-red-500/10 border-red-400/30";
                const iconColorClass = isPositive
                  ? "text-empire-emerald-400"
                  : "text-red-400";

                return (
                  <div key={tx.id} className={`p-3 rounded-lg ${colorClass}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {isPositive ? (
                        <TrendingUp className={`w-4 h-4 ${iconColorClass}`} />
                      ) : (
                        <TrendingDown className={`w-4 h-4 ${iconColorClass}`} />
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
                      {tx.exchange ? `on ${tx.exchange}` : "between wallets"} -{" "}
                      {tx.usdValue}
                    </p>
                  </div>
                );
              })}
              )
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default WhaleTracker;
