// Price synchronization service for real-time market data
import { mockCryptoCoins, mockStocks } from "./data";

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  volume24h?: number;
  marketCap?: number;
  lastUpdated: Date;
}

interface PriceSyncConfig {
  updateInterval: number; // milliseconds
  symbols: string[];
  onPriceUpdate?: (prices: Map<string, PriceData>) => void;
}

class PriceSyncService {
  private prices: Map<string, PriceData> = new Map();
  private config: PriceSyncConfig;
  private intervalId: NodeJS.Timeout | null = null;
  private subscribers: Array<(prices: Map<string, PriceData>) => void> = [];

  constructor(config: PriceSyncConfig) {
    this.config = config;
    this.initializePrices();
  }

  private initializePrices() {
    // Initialize with current mock data
    [...mockCryptoCoins, ...mockStocks].forEach((asset) => {
      this.prices.set(asset.symbol, {
        symbol: asset.symbol,
        price: asset.price,
        change24h: asset.change24h,
        changePercent24h: asset.changePercent24h,
        volume24h: asset.volume24h || (asset as any).volume,
        marketCap: asset.marketCap,
        lastUpdated: new Date(),
      });
    });
  }

  // Simulate real-time price updates using realistic market movements
  private simulateRealtimeUpdates() {
    this.prices.forEach((priceData, symbol) => {
      // Simulate realistic price movements
      const volatility = this.getVolatilityForSymbol(symbol);
      const randomChange = (Math.random() - 0.5) * 2 * volatility;

      // Apply the change
      const newPrice = priceData.price * (1 + randomChange);
      const change24h = newPrice - priceData.price;
      const changePercent24h = (change24h / priceData.price) * 100;

      // Update volume with realistic fluctuations
      const volumeChange = (Math.random() - 0.5) * 0.2;
      const newVolume = priceData.volume24h
        ? priceData.volume24h * (1 + volumeChange)
        : undefined;

      // Update market cap if available
      const newMarketCap = priceData.marketCap
        ? priceData.marketCap * (newPrice / priceData.price)
        : undefined;

      this.prices.set(symbol, {
        symbol,
        price: newPrice,
        change24h,
        changePercent24h,
        volume24h: newVolume,
        marketCap: newMarketCap,
        lastUpdated: new Date(),
      });
    });

    // Notify subscribers
    this.notifySubscribers();
  }

  private getVolatilityForSymbol(symbol: string): number {
    // Set realistic volatility based on asset type
    const cryptoVolatility = 0.08; // 8% max change per update
    const stockVolatility = 0.03; // 3% max change per update
    const stablecoinVolatility = 0.002; // 0.2% max change per update

    if (["USDC", "USDT", "DAI"].includes(symbol)) {
      return stablecoinVolatility;
    } else if (
      ["BTC", "ETH", "ADA", "SOL", "LINK", "DOT", "MATIC"].includes(symbol)
    ) {
      return cryptoVolatility;
    } else {
      return stockVolatility;
    }
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback(this.prices));
  }

  // Public methods
  public subscribe(callback: (prices: Map<string, PriceData>) => void) {
    this.subscribers.push(callback);
    // Immediately call with current prices
    callback(this.prices);
  }

  public unsubscribe(callback: (prices: Map<string, PriceData>) => void) {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback);
  }

  public start() {
    if (this.intervalId) {
      this.stop();
    }

    this.intervalId = setInterval(() => {
      this.simulateRealtimeUpdates();
    }, this.config.updateInterval);
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getPrice(symbol: string): PriceData | undefined {
    return this.prices.get(symbol);
  }

  public getAllPrices(): Map<string, PriceData> {
    return new Map(this.prices);
  }

  public updateSymbols(symbols: string[]) {
    this.config.symbols = symbols;
  }

  // Method to manually update a price (for TradingView integration)
  public updatePrice(symbol: string, priceData: Partial<PriceData>) {
    const existing = this.prices.get(symbol);
    if (existing) {
      this.prices.set(symbol, {
        ...existing,
        ...priceData,
        lastUpdated: new Date(),
      });
      this.notifySubscribers();
    }
  }
}

// Global price sync instance
export const priceSyncService = new PriceSyncService({
  updateInterval: 5000, // Update every 5 seconds
  symbols: [
    "BTC",
    "ETH",
    "ADA",
    "SOL",
    "LINK",
    "AAPL",
    "MSFT",
    "GOOGL",
    "TSLA",
  ],
});

// React hook for using price sync in components
export const usePriceSync = (symbols?: string[]) => {
  const [prices, setPrices] = React.useState<Map<string, PriceData>>(new Map());
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    const handlePriceUpdate = (newPrices: Map<string, PriceData>) => {
      if (symbols) {
        // Filter to only requested symbols
        const filteredPrices = new Map();
        symbols.forEach((symbol) => {
          const price = newPrices.get(symbol);
          if (price) {
            filteredPrices.set(symbol, price);
          }
        });
        setPrices(filteredPrices);
      } else {
        setPrices(newPrices);
      }
    };

    priceSyncService.subscribe(handlePriceUpdate);
    setIsConnected(true);

    // Start the service if not already running
    priceSyncService.start();

    return () => {
      priceSyncService.unsubscribe(handlePriceUpdate);
      setIsConnected(false);
    };
  }, [symbols]);

  return {
    prices,
    isConnected,
    getPrice: (symbol: string) => prices.get(symbol),
    start: () => priceSyncService.start(),
    stop: () => priceSyncService.stop(),
  };
};

// Helper function to format price changes
export const formatPriceChange = (changePercent: number): string => {
  const sign = changePercent >= 0 ? "+" : "";
  return `${sign}${changePercent.toFixed(2)}%`;
};

export const getPriceChangeColor = (changePercent: number): string => {
  if (changePercent > 0) return "text-empire-emerald-400";
  if (changePercent < 0) return "text-red-400";
  return "text-muted-foreground";
};

// Import React for the hook
import React from "react";

export type { PriceData, PriceSyncConfig };
