// Central data library for Financial Empire trading platform

export interface CryptoCoin {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h: number;
  marketCap: number;
  icon?: string;
  description?: string;
}

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume: number;
  marketCap?: number;
  sector?: string;
  description?: string;
}

export interface Trade {
  id: string;
  timestamp: Date;
  type: "buy" | "sell";
  asset: string;
  amount: number;
  price: number;
  total: number;
  fee: number;
  status: "completed" | "pending" | "cancelled";
  bot?: string;
  profitLoss?: number;
  profitLossPercent?: number;
  exchange?: string;
  confidence?: number;
  entryReason?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  totalBalance: number;
  availableBalance: number;
  totalProfit: number;
  totalTrades: number;
  successRate: number;
  joinDate: Date;
  preferences: {
    defaultCurrency: string;
    riskLevel: "low" | "medium" | "high";
    notifications: boolean;
  };
}

export interface LessonModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  content: {
    sections: {
      title: string;
      content: string;
      keyPoints?: string[];
      videoUrl?: string;
    }[];
  };
  quiz?: Quiz;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number; // in minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "multiple-choice" | "true-false" | "fill-in-blank";
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseTitle: string;
  issueDate: Date;
  score: number;
  validUntil?: Date;
}

export interface TradingSignal {
  id: string;
  asset: string;
  type: "buy" | "sell" | "hold";
  confidence: number; // 0-100
  price: number;
  targetPrice?: number;
  stopLoss?: number;
  reasoning: string;
  timestamp: Date;
  source: string; // e.g., "Safe Bot", "Aggressive Bot"
}

export interface WhaleTransaction {
  id: string;
  address: string;
  type: "buy" | "sell" | "transfer";
  asset: string;
  amount: number;
  usdValue: number;
  timestamp: Date;
  exchange?: string;
  impact: "high" | "medium" | "low";
}

// Mock Data

export const mockCryptoCoins: CryptoCoin[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 116234.75,
    change24h: 3378.42,
    changePercent24h: 2.99,
    volume24h: 28500000000,
    marketCap: 2298000000000,
    description: "The first and largest cryptocurrency by market cap",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2650.12,
    change24h: 156.84,
    changePercent24h: 6.29,
    volume24h: 15200000000,
    marketCap: 318400000000,
    description: "Decentralized platform for smart contracts",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.4821,
    change24h: -0.0234,
    changePercent24h: -4.63,
    volume24h: 412000000,
    marketCap: 17100000000,
    description: "Proof-of-stake blockchain platform",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 98.75,
    change24h: 8.32,
    changePercent24h: 9.2,
    volume24h: 2100000000,
    marketCap: 42800000000,
    description: "High-performance blockchain for decentralized apps",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    price: 14.82,
    change24h: 0.67,
    changePercent24h: 4.74,
    volume24h: 890000000,
    marketCap: 8200000000,
    description: "Decentralized oracle network",
  },
];

export const mockStocks: Stock[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 185.32,
    change24h: 2.84,
    changePercent24h: 1.56,
    volume: 45200000,
    marketCap: 2890000000000,
    sector: "Technology",
    description: "Consumer electronics and software company",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.91,
    change24h: 5.23,
    changePercent24h: 1.4,
    volume: 28700000,
    marketCap: 2810000000000,
    sector: "Technology",
    description: "Software and cloud computing services",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 138.45,
    change24h: -1.87,
    changePercent24h: -1.33,
    volume: 31400000,
    marketCap: 1750000000000,
    sector: "Technology",
    description: "Internet search and advertising company",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.91,
    change24h: 18.72,
    changePercent24h: 8.13,
    volume: 89100000,
    marketCap: 790000000000,
    sector: "Automotive",
    description: "Electric vehicle and clean energy company",
  },
];

export const mockTrades: Trade[] = [
  {
    id: "1",
    timestamp: new Date("2024-01-15T14:30:25Z"),
    type: "buy",
    asset: "BTC",
    amount: 0.5,
    price: 116234.75,
    total: 58117.38,
    fee: 58.12,
    status: "completed",
    bot: "Safe Bot",
    profitLoss: 1337.83,
    profitLossPercent: 2.3,
    exchange: "Binance",
    confidence: 85,
    entryReason: "Technical breakout above resistance",
  },
  {
    id: "2",
    timestamp: new Date("2024-01-15T13:45:18Z"),
    type: "sell",
    asset: "ETH",
    amount: 2.5,
    price: 2650.12,
    total: 6625.3,
    fee: 6.63,
    status: "completed",
    bot: "Aggressive Bot",
    profitLoss: 377.82,
    profitLossPercent: 5.7,
    exchange: "Coinbase",
    confidence: 92,
    entryReason: "High momentum and volume spike",
  },
  {
    id: "3",
    timestamp: new Date("2024-01-15T12:20:44Z"),
    type: "buy",
    asset: "ADA",
    amount: 5000,
    price: 0.4821,
    total: 2410.5,
    fee: 2.41,
    status: "completed",
    profitLoss: -28.93,
    profitLossPercent: -1.2,
    confidence: 68,
    entryReason: "Oversold condition with support level",
  },
  {
    id: "4",
    timestamp: new Date("2024-01-15T11:15:33Z"),
    type: "sell",
    asset: "SOL",
    amount: 15,
    price: 98.75,
    total: 1481.25,
    fee: 1.48,
    status: "pending",
    bot: "Manual",
    confidence: 75,
    entryReason: "Manual decision based on news",
  },
];

export const mockUser: User = {
  id: "user123",
  username: "TradingEmperor",
  email: "emperor@financialempire.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TradingEmperor",
  totalBalance: 127845.32,
  availableBalance: 23456.78,
  totalProfit: 15847.29,
  totalTrades: 247,
  successRate: 74.5,
  joinDate: new Date("2023-06-15"),
  preferences: {
    defaultCurrency: "USD",
    riskLevel: "medium",
    notifications: true,
  },
};

// Import comprehensive lessons
import { comprehensiveLessonModules } from "./comprehensive-lessons";

export const mockLessonModules: LessonModule[] = comprehensiveLessonModules;

export const mockTradingSignals: TradingSignal[] = [
  {
    id: "signal1",
    asset: "BTC",
    type: "buy",
    confidence: 87,
    price: 116234,
    targetPrice: 122000,
    stopLoss: 111000,
    reasoning:
      "Technical breakout above key resistance with high volume confirmation",
    timestamp: new Date(),
    source: "Aggressive Bot",
  },
  {
    id: "signal2",
    asset: "ETH",
    type: "hold",
    confidence: 72,
    price: 2650,
    reasoning: "Consolidating within range, waiting for directional move",
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    source: "Safe Bot",
  },
  {
    id: "signal3",
    asset: "ADA",
    type: "sell",
    confidence: 68,
    price: 0.48,
    stopLoss: 0.52,
    reasoning: "Bearish divergence on RSI, potential downside risk",
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
    source: "Technical Analysis",
  },
];

export const mockWhaleTransactions: WhaleTransaction[] = [
  {
    id: "whale1",
    address: "0x742d35Cc6535C0532925a3b8D2C4e91c89F2f23B",
    type: "buy",
    asset: "BTC",
    amount: 91.25,
    usdValue: 10606420,
    timestamp: new Date(Date.now() - 120000), // 2 minutes ago
    exchange: "Binance",
    impact: "high",
  },
  {
    id: "whale2",
    address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    type: "sell",
    asset: "ETH",
    amount: 1240.5,
    usdValue: 3287325,
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    exchange: "Coinbase",
    impact: "medium",
  },
];

// Utility functions

export const generateMockTrade = (overrides: Partial<Trade> = {}): Trade => {
  const assets = ["BTC", "ETH", "ADA", "SOL", "LINK"];
  const bots = ["Safe Bot", "Aggressive Bot", "Manual"];
  const exchanges = ["Binance", "Coinbase", "Kraken"];

  const asset = assets[Math.floor(Math.random() * assets.length)];
  const amount = Math.random() * 10 + 0.1;
  const price = Math.random() * 50000 + 100;
  const total = amount * price;

  return {
    id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date(),
    type: Math.random() > 0.5 ? "buy" : "sell",
    asset,
    amount,
    price,
    total,
    fee: total * 0.001, // 0.1% fee
    status: "completed",
    bot: bots[Math.floor(Math.random() * bots.length)],
    profitLoss: (Math.random() - 0.4) * total * 0.1, // Slightly positive bias
    profitLossPercent: (Math.random() - 0.4) * 10,
    exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
    confidence: Math.floor(Math.random() * 40) + 60, // 60-100
    entryReason: "Automated trading signal",
    ...overrides,
  };
};

export const calculatePortfolioStats = (trades: Trade[]) => {
  const completedTrades = trades.filter(
    (trade) => trade.status === "completed",
  );

  const totalTrades = completedTrades.length;
  const totalVolume = completedTrades.reduce(
    (sum, trade) => sum + trade.total,
    0,
  );
  const totalProfit = completedTrades.reduce(
    (sum, trade) => sum + (trade.profitLoss || 0),
    0,
  );
  const winningTrades = completedTrades.filter(
    (trade) => (trade.profitLoss || 0) > 0,
  ).length;
  const successRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;

  return {
    totalTrades,
    totalVolume,
    totalProfit,
    successRate,
    averageProfit: totalTrades > 0 ? totalProfit / totalTrades : 0,
  };
};

export const getAssetPrice = (symbol: string): number => {
  const crypto = mockCryptoCoins.find((coin) => coin.symbol === symbol);
  if (crypto) return crypto.price;

  const stock = mockStocks.find((stock) => stock.symbol === symbol);
  if (stock) return stock.price;

  return 0;
};

export const formatCurrency = (amount: number, currency = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatPercent = (value: number): string => {
  const formatted = value.toFixed(2);
  return `${value >= 0 ? "+" : ""}${formatted}%`;
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  return num.toFixed(2);
};
