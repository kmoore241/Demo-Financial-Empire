import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Eye,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowUpDown,
} from "lucide-react";

const ManualBot = () => {
  const [orderType, setOrderType] = useState("market");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("BTC");

  const [openOrders, setOpenOrders] = useState([
    {
      id: 1,
      type: "Buy",
      asset: "BTC",
      amount: "0.5",
      price: "$42,500",
      status: "Open",
      time: "5 min ago",
    },
    {
      id: 2,
      type: "Sell",
      asset: "ETH",
      amount: "2.0",
      price: "$2,650",
      status: "Filled",
      time: "15 min ago",
    },
  ]);

  const [watchlist, setWatchlist] = useState([
    { symbol: "BTC", price: "$116,234", change: "+2.99%", positive: true },
    { symbol: "ETH", price: "$2,650", change: "+6.29%", positive: true },
    { symbol: "ADA", price: "$0.48", change: "-4.63%", positive: false },
    { symbol: "SOL", price: "$98.75", change: "+9.20%", positive: true },
  ]);

  const assets = ["BTC", "ETH", "ADA", "SOL", "LINK", "DOT"];

  const handlePlaceOrder = () => {
    const newOrder = {
      id: openOrders.length + 1,
      type: tradeType === "buy" ? "Buy" : "Sell",
      asset: selectedAsset,
      amount,
      price: orderType === "market" ? "Market" : price,
      status: "Open",
      time: "Just now",
    };
    setOpenOrders([newOrder, ...openOrders]);
    setAmount("");
    setPrice("");
  };

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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Manual Trading
            </h1>
            <p className="text-muted-foreground">
              Take full control with manual trading interface
            </p>
          </div>
        </div>
        <Badge className="bg-purple-500/20 text-purple-400">Full Control</Badge>
      </motion.div>

      {/* Main Trading Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Entry */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ArrowUpDown className="w-5 h-5" />
                <span>Place Order</span>
              </CardTitle>
              <CardDescription>
                Execute manual trades with precision control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="spot" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                  <TabsTrigger value="spot">Spot</TabsTrigger>
                  <TabsTrigger value="margin">Margin</TabsTrigger>
                  <TabsTrigger value="futures">Futures</TabsTrigger>
                </TabsList>

                <TabsContent value="spot" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Buy Panel */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-empire-emerald-400" />
                        <span className="font-semibold text-empire-emerald-400">
                          Buy Order
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="buy-asset">Asset</Label>
                          <Select
                            value={selectedAsset}
                            onValueChange={setSelectedAsset}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {assets.map((asset) => (
                                <SelectItem key={asset} value={asset}>
                                  {asset}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="buy-type">Order Type</Label>
                          <Select
                            value={orderType}
                            onValueChange={setOrderType}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="market">Market</SelectItem>
                              <SelectItem value="limit">Limit</SelectItem>
                              <SelectItem value="stop">Stop Loss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="buy-amount">Amount</Label>
                          <Input
                            id="buy-amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>

                        {orderType !== "market" && (
                          <div>
                            <Label htmlFor="buy-price">Price</Label>
                            <Input
                              id="buy-price"
                              type="number"
                              placeholder="0.00"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        )}

                        <Button
                          onClick={handlePlaceOrder}
                          className="w-full bg-empire-emerald-500 hover:bg-empire-emerald-600"
                          disabled={!amount}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Buy {selectedAsset}
                        </Button>
                      </div>
                    </div>

                    {/* Sell Panel */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="w-5 h-5 text-red-400" />
                        <span className="font-semibold text-red-400">
                          Sell Order
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="sell-asset">Asset</Label>
                          <Select
                            value={selectedAsset}
                            onValueChange={setSelectedAsset}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {assets.map((asset) => (
                                <SelectItem key={asset} value={asset}>
                                  {asset}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="sell-type">Order Type</Label>
                          <Select
                            value={orderType}
                            onValueChange={setOrderType}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="market">Market</SelectItem>
                              <SelectItem value="limit">Limit</SelectItem>
                              <SelectItem value="stop">Stop Loss</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="sell-amount">Amount</Label>
                          <Input
                            id="sell-amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>

                        {orderType !== "market" && (
                          <div>
                            <Label htmlFor="sell-price">Price</Label>
                            <Input
                              id="sell-price"
                              type="number"
                              placeholder="0.00"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </div>
                        )}

                        <Button
                          onClick={handlePlaceOrder}
                          className="w-full bg-red-500 hover:bg-red-600"
                          disabled={!amount}
                        >
                          <TrendingDown className="w-4 h-4 mr-2" />
                          Sell {selectedAsset}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="margin">
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 text-empire-gold-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Margin Trading
                    </h3>
                    <p className="text-muted-foreground">
                      Advanced margin trading features coming soon
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="futures">
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Futures Trading
                    </h3>
                    <p className="text-muted-foreground">
                      Futures contracts and derivatives trading interface
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Order Book Visualization */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Order Book & Chart</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-purple-900/20 to-empire-navy-900/20 rounded-lg flex items-center justify-center border border-dashed border-purple-400/30">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">
                    Live Order Book
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Real-time order book data, depth chart, and price action
                    visualization for manual trading decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Balance Overview */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Portfolio</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Balance
                  </span>
                  <span className="font-semibold">$25,847.32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Available
                  </span>
                  <span className="font-semibold text-empire-emerald-400">
                    $15,423.18
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    In Orders
                  </span>
                  <span className="font-semibold text-empire-gold-400">
                    $10,424.14
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Holdings</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>BTC</span>
                    <span>0.5842</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ETH</span>
                    <span>8.239</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ADA</span>
                    <span>2,450</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Watchlist */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Watchlist</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlist.map((asset) => (
                <div
                  key={asset.symbol}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedAsset(asset.symbol)}
                >
                  <div>
                    <div className="font-medium">{asset.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      {asset.price}
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      asset.positive
                        ? "text-empire-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {asset.change}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Open Orders */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Open Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {openOrders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="space-y-2 p-3 rounded-lg border border-border/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={order.type === "Buy" ? "default" : "secondary"}
                        className={
                          order.type === "Buy"
                            ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }
                      >
                        {order.type}
                      </Badge>
                      <span className="font-medium">{order.asset}</span>
                    </div>
                    <Badge
                      variant={
                        order.status === "Filled" ? "default" : "secondary"
                      }
                      className={
                        order.status === "Filled"
                          ? "bg-empire-emerald-500/20 text-empire-emerald-400"
                          : ""
                      }
                    >
                      {order.status === "Filled" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 mr-1" />
                      )}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {order.amount} @ {order.price} • {order.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Risk Controls */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-empire-emerald-400" />
                <span>Risk Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Loss Limit</span>
                <span className="text-sm font-medium text-red-400">
                  $500 (-2%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Position Size Limit</span>
                <span className="text-sm font-medium">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stop Loss</span>
                <span className="text-sm font-medium text-empire-emerald-400">
                  Active
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ManualBot;
