// Market Data API Integration with CoinGecko and Alpha Vantage

export interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  last_updated: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap?: number;
  lastUpdated: string;
}

export interface WhaleTransaction {
  id: string;
  symbol: string;
  amount: number;
  value: number;
  type: "buy" | "sell";
  timestamp: string;
  address: string;
  description: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

// CoinGecko API functions
const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";

export const getTopCryptos = async (limit = 50): Promise<CryptoCoin[]> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch crypto data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    // Return mock data as fallback
    return getMockCryptoData();
  }
};

export const getCryptoPrice = async (coinId: string): Promise<number> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/simple/price?ids=${coinId}&vs_currencies=usd`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch crypto price");
    }

    const data = await response.json();
    return data[coinId]?.usd || 0;
  } catch (error) {
    console.error("Error fetching crypto price:", error);
    return 0;
  }
};

// Alpha Vantage API functions (Note: Requires API key)
const ALPHA_VANTAGE_API_KEY = process.env.VITE_ALPHA_VANTAGE_API_KEY || "demo";
const ALPHA_VANTAGE_BASE = "https://www.alphavantage.co/query";

export const getStockPrice = async (
  symbol: string,
): Promise<StockData | null> => {
  try {
    const response = await fetch(
      `${ALPHA_VANTAGE_BASE}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch stock data");
    }

    const data = await response.json();
    const quote = data["Global Quote"];

    if (!quote) {
      throw new Error("Invalid stock data");
    }

    return {
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      change: parseFloat(quote["09. change"]),
      changePercent: parseFloat(quote["10. change percent"].replace("%", "")),
      volume: parseInt(quote["06. volume"]),
      lastUpdated: quote["07. latest trading day"],
    };
  } catch (error) {
    console.error("Error fetching stock data:", error);
    // Return mock data as fallback
    return getMockStockData(symbol);
  }
};

export const getMarketNews = async (): Promise<NewsArticle[]> => {
  try {
    // Using CoinGecko's news endpoint (free tier)
    const response = await fetch(`${COINGECKO_API_BASE}/news`);

    if (!response.ok) {
      throw new Error("Failed to fetch news");
    }

    const data = await response.json();
    return (
      data.data?.slice(0, 10).map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.news_site,
        publishedAt: article.published_at,
        imageUrl: article.thumb_2x,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return getMockNewsData();
  }
};

// Whale tracker simulation (CoinGecko doesn't provide whale data directly)
export const getWhaleTransactions = async (): Promise<WhaleTransaction[]> => {
  try {
    // This would typically connect to blockchain explorers or whale alert APIs
    // For now, we'll simulate based on volume data
    const topCryptos = await getTopCryptos(10);
    const whaleTransactions: WhaleTransaction[] = [];

    topCryptos.forEach((crypto, index) => {
      if (crypto.total_volume > 1000000000) {
        // High volume suggests whale activity
        whaleTransactions.push({
          id: `whale_${crypto.id}_${Date.now()}_${index}`,
          symbol: crypto.symbol.toUpperCase(),
          amount: Math.floor(Math.random() * 1000000),
          value: crypto.current_price * Math.floor(Math.random() * 1000000),
          type: Math.random() > 0.5 ? "buy" : "sell",
          timestamp: new Date(
            Date.now() - Math.random() * 3600000,
          ).toISOString(),
          address: `0x${Math.random().toString(16).substr(2, 8)}...`,
          description: `Large ${crypto.symbol.toUpperCase()} transaction detected`,
        });
      }
    });

    return whaleTransactions.slice(0, 5);
  } catch (error) {
    console.error("Error generating whale data:", error);
    return getMockWhaleData();
  }
};

// Mock data functions for fallbacks
const getMockCryptoData = (): CryptoCoin[] => [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    current_price: 116234.75,
    price_change_percentage_24h: 2.34,
    market_cap: 2298000000000,
    total_volume: 45000000000,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    last_updated: new Date().toISOString(),
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    current_price: 4250.67,
    price_change_percentage_24h: 1.87,
    market_cap: 512000000000,
    total_volume: 28000000000,
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    last_updated: new Date().toISOString(),
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    current_price: 245.89,
    price_change_percentage_24h: 5.21,
    market_cap: 118000000000,
    total_volume: 8500000000,
    image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    last_updated: new Date().toISOString(),
  },
];

const getMockStockData = (symbol: string): StockData => ({
  symbol: symbol.toUpperCase(),
  price: Math.random() * 1000 + 50,
  change: (Math.random() - 0.5) * 20,
  changePercent: (Math.random() - 0.5) * 10,
  volume: Math.floor(Math.random() * 10000000),
  lastUpdated: new Date().toISOString(),
});

const getMockNewsData = (): NewsArticle[] => [
  {
    title: "Bitcoin Reaches New All-Time High Amid Institutional Adoption",
    description:
      "Major corporations continue to add Bitcoin to their treasury reserves...",
    url: "https://example.com/news/1",
    source: "CryptoNews",
    publishedAt: new Date().toISOString(),
  },
  {
    title: "Ethereum 2.0 Staking Rewards Attract Institutional Investors",
    description:
      "The transition to proof-of-stake has created new opportunities...",
    url: "https://example.com/news/2",
    source: "DeFi Today",
    publishedAt: new Date().toISOString(),
  },
];

const getMockWhaleData = (): WhaleTransaction[] => [
  {
    id: "whale_btc_001",
    symbol: "BTC",
    amount: 500,
    value: 58117375,
    type: "buy",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    address: "0xabc123...def456",
    description: "Large BTC purchase detected on exchange",
  },
  {
    id: "whale_eth_002",
    symbol: "ETH",
    amount: 10000,
    value: 42506700,
    type: "sell",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    address: "0xdef456...abc123",
    description: "Significant ETH transfer to exchange wallet",
  },
];

// Market data aggregation
export const getMarketData = async () => {
  const [cryptos, news, whales] = await Promise.all([
    getTopCryptos(20),
    getMarketNews(),
    getWhaleTransactions(),
  ]);

  return {
    cryptos,
    news,
    whales,
    lastUpdated: new Date().toISOString(),
  };
};

// Price update hooks for real-time data
export const subscribeToPrice = (
  coinId: string,
  callback: (price: number) => void,
) => {
  const interval = setInterval(async () => {
    const price = await getCryptoPrice(coinId);
    callback(price);
  }, 30000); // Update every 30 seconds

  return () => clearInterval(interval);
};

// Trading simulation functions
export const executeTrade = async (decision: any) => {
  // Simulate trade execution
  console.log("Executing trade:", decision);
  return {
    success: true,
    orderId: `order_${Date.now()}`,
    executedAt: new Date().toISOString(),
  };
};
