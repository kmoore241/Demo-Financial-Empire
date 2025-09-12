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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  History,
  Download,
  FileText,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Clock,
  Target,
  BarChart3,
  Search,
  RefreshCw,
} from "lucide-react";

interface Trade {
  id: string;
  timestamp: string;
  type: "buy" | "sell";
  pair: string;
  amount: string;
  price: string;
  total: string;
  fee: string;
  status: "completed" | "pending" | "cancelled";
  bot?: string;
  profit?: string;
}

const TradeHistory = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filteredTrades, setFilteredTrades] = useState<Trade[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [dateRange, setDateRange] = useState("7d");

  // Mock trade data
  const mockTrades: Trade[] = [
    {
      id: "1",
      timestamp: "2024-01-15 14:30:25",
      type: "buy",
      pair: "BTC/USDT",
      amount: "0.5000",
      price: "42,850.32",
      total: "21,425.16",
      fee: "21.43",
      status: "completed",
      bot: "Safe Bot",
      profit: "+2.3%",
    },
    {
      id: "2",
      timestamp: "2024-01-15 13:45:18",
      type: "sell",
      pair: "ETH/USDT",
      amount: "2.5000",
      price: "2,650.12",
      total: "6,625.30",
      fee: "6.63",
      status: "completed",
      bot: "Aggressive Bot",
      profit: "+5.7%",
    },
    {
      id: "3",
      timestamp: "2024-01-15 12:20:44",
      type: "buy",
      pair: "ADA/USDT",
      amount: "5000.0000",
      price: "0.4821",
      total: "2,410.50",
      fee: "2.41",
      status: "completed",
      profit: "-1.2%",
    },
    {
      id: "4",
      timestamp: "2024-01-15 11:15:33",
      type: "sell",
      pair: "SOL/USDT",
      amount: "15.0000",
      price: "98.75",
      total: "1,481.25",
      fee: "1.48",
      status: "pending",
      bot: "Manual",
    },
    {
      id: "5",
      timestamp: "2024-01-15 10:05:12",
      type: "buy",
      pair: "LINK/USDT",
      amount: "200.0000",
      price: "14.82",
      total: "2,964.00",
      fee: "2.96",
      status: "completed",
      bot: "Safe Bot",
      profit: "+0.8%",
    },
    {
      id: "6",
      timestamp: "2024-01-14 16:42:18",
      type: "sell",
      pair: "DOT/USDT",
      amount: "180.0000",
      price: "8.45",
      total: "1,521.00",
      fee: "1.52",
      status: "cancelled",
    },
    {
      id: "7",
      timestamp: "2024-01-14 15:28:55",
      type: "buy",
      pair: "AVAX/USDT",
      amount: "50.0000",
      price: "36.24",
      total: "1,812.00",
      fee: "1.81",
      status: "completed",
      bot: "Aggressive Bot",
      profit: "+8.9%",
    },
    {
      id: "8",
      timestamp: "2024-01-14 14:11:39",
      type: "sell",
      pair: "BTC/USDT",
      amount: "0.2500",
      price: "42,120.85",
      total: "10,530.21",
      fee: "10.53",
      status: "completed",
      bot: "Manual",
      profit: "+3.4%",
    },
  ];

  useEffect(() => {
    setTrades(mockTrades);
    setFilteredTrades(mockTrades);
  }, []);

  // Filter trades based on search and filters
  useEffect(() => {
    let filtered = trades;

    if (searchTerm) {
      filtered = filtered.filter(
        (trade) =>
          trade.pair.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trade.bot?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          trade.id.includes(searchTerm),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((trade) => trade.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((trade) => trade.status === filterStatus);
    }

    setFilteredTrades(filtered);
  }, [trades, searchTerm, filterType, filterStatus]);

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Timestamp",
      "Type",
      "Pair",
      "Amount",
      "Price",
      "Total",
      "Fee",
      "Status",
      "Bot",
      "Profit",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredTrades.map((trade) =>
        [
          trade.id,
          trade.timestamp,
          trade.type,
          trade.pair,
          trade.amount,
          trade.price.replace(/,/g, ""),
          trade.total.replace(/,/g, ""),
          trade.fee.replace(/,/g, ""),
          trade.status,
          trade.bot || "",
          trade.profit || "",
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trade-history-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(filteredTrades, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `trade-history-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-empire-gold-500/20 text-empire-gold-400">
            Pending
          </Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-400">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "buy" ? (
      <TrendingUp className="w-4 h-4 text-empire-emerald-400" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-400" />
    );
  };

  const totalProfit = trades
    .filter((trade) => trade.profit && trade.status === "completed")
    .reduce((sum, trade) => {
      const profit = parseFloat(trade.profit!.replace(/[+%]/g, ""));
      return sum + profit;
    }, 0);

  const totalVolume = trades
    .filter((trade) => trade.status === "completed")
    .reduce((sum, trade) => {
      const total = parseFloat(trade.total.replace(/,/g, ""));
      return sum + total;
    }, 0);

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
          <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent">
              Trade History
            </h1>
            <p className="text-muted-foreground">
              Comprehensive trading logs with export options
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            className="border-empire-emerald-400/50 hover:bg-empire-emerald-500/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToJSON}
            className="border-empire-gold-400/50 hover:bg-empire-gold-500/10"
          >
            <FileText className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-2xl font-bold">{trades.length}</p>
              </div>
              <Target className="w-8 h-8 text-slate-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">${totalVolume.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-empire-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Profit</p>
                <p className="text-2xl font-bold text-empire-emerald-400">
                  +{(totalProfit / trades.length).toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-empire-gold-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">
                  {(
                    (trades.filter((t) => t.status === "completed").length /
                      trades.length) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-empire-emerald-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search trades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Trade Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="buy">Buy Orders</SelectItem>
                  <SelectItem value="sell">Sell Orders</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trade Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Trading History</span>
              <Badge variant="secondary">
                {filteredTrades.length} of {trades.length} trades
              </Badge>
            </CardTitle>
            <CardDescription>
              Detailed view of all your trading activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Pair</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Bot/Manual</TableHead>
                    <TableHead>P&L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrades.map((trade, index) => (
                    <motion.tr
                      key={trade.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium text-xs">
                              {trade.timestamp.split(" ")[1]}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {trade.timestamp.split(" ")[0]}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(trade.type)}
                          <span
                            className={`font-medium capitalize ${
                              trade.type === "buy"
                                ? "text-empire-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {trade.type}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {trade.pair}
                      </TableCell>
                      <TableCell>{trade.amount}</TableCell>
                      <TableCell>${trade.price}</TableCell>
                      <TableCell className="font-medium">
                        ${trade.total}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        ${trade.fee}
                      </TableCell>
                      <TableCell>{getStatusBadge(trade.status)}</TableCell>
                      <TableCell>
                        {trade.bot ? (
                          <Badge variant="outline" className="text-xs">
                            {trade.bot}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Manual
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {trade.profit && (
                          <span
                            className={`font-medium ${
                              trade.profit.startsWith("+")
                                ? "text-empire-emerald-400"
                                : "text-red-400"
                            }`}
                          >
                            {trade.profit}
                          </span>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TradeHistory;
