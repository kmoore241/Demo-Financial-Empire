// AI Trading Analysis and Pattern Recognition

export interface MarketDataPoint {
  timestamp: string;
  price: number;
  volume: number;
  symbol: string;
}

export interface TradingDecision {
  action: "buy" | "sell" | "hold";
  confidence: number;
  reasoning: string;
  feedback: string;
  riskLevel: "low" | "medium" | "high";
  suggestedAmount?: number;
  stopLoss?: number;
  takeProfit?: number;
}

export interface TechnicalIndicators {
  rsi: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  movingAverages: {
    sma20: number;
    sma50: number;
    ema12: number;
    ema26: number;
  };
  bollinger: {
    upper: number;
    middle: number;
    lower: number;
  };
  volume: {
    current: number;
    average: number;
    ratio: number;
  };
}

export interface PatternRecognition {
  pattern: string;
  confidence: number;
  description: string;
  bullishSignal: boolean;
}

// Simple Moving Average calculation
export const calculateSMA = (
  prices: number[],
  period: number,
): number | null => {
  if (prices.length < period) return null;
  const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
  return sum / period;
};

// Exponential Moving Average calculation
export const calculateEMA = (
  prices: number[],
  period: number,
): number | null => {
  if (prices.length < period) return null;

  const multiplier = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
};

// RSI calculation
export const calculateRSI = (
  prices: number[],
  period: number = 14,
): number | null => {
  if (prices.length < period + 1) return null;

  const changes = [];
  for (let i = 1; i < prices.length; i++) {
    changes.push(prices[i] - prices[i - 1]);
  }

  const gains = changes.map((change) => (change > 0 ? change : 0));
  const losses = changes.map((change) => (change < 0 ? -change : 0));

  const avgGain = gains.slice(-period).reduce((a, b) => a + b, 0) / period;
  const avgLoss = losses.slice(-period).reduce((a, b) => a + b, 0) / period;

  if (avgLoss === 0) return 100;

  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
};

// MACD calculation
export const calculateMACD = (prices: number[]): any | null => {
  const ema12 = calculateEMA(prices, 12);
  const ema26 = calculateEMA(prices, 26);

  if (!ema12 || !ema26) return null;

  const macd = ema12 - ema26;
  const signal = calculateEMA([macd], 9) || 0;
  const histogram = macd - signal;

  return { macd, signal, histogram };
};

// Bollinger Bands calculation
export const calculateBollingerBands = (
  prices: number[],
  period: number = 20,
  stdDevMultiplier: number = 2,
): any | null => {
  const sma = calculateSMA(prices, period);
  if (!sma) return null;

  const variance =
    prices
      .slice(-period)
      .reduce((acc, price) => acc + Math.pow(price - sma, 2), 0) / period;
  const stdDev = Math.sqrt(variance);

  return {
    upper: sma + stdDevMultiplier * stdDev,
    middle: sma,
    lower: sma - stdDevMultiplier * stdDev,
  };
};

// Technical indicators analysis
export const analyzeTechnicalIndicators = (
  marketData: MarketDataPoint[],
): TechnicalIndicators | null => {
  if (marketData.length < 50) return null;

  const prices = marketData.map((d) => d.price);
  const volumes = marketData.map((d) => d.volume);

  const rsi = calculateRSI(prices) || 50;
  const macd = calculateMACD(prices) || { macd: 0, signal: 0, histogram: 0 };
  const bollinger = calculateBollingerBands(prices) || {
    upper: 0,
    middle: 0,
    lower: 0,
  };

  const sma20 = calculateSMA(prices, 20) || 0;
  const sma50 = calculateSMA(prices, 50) || 0;
  const ema12 = calculateEMA(prices, 12) || 0;
  const ema26 = calculateEMA(prices, 26) || 0;

  const currentVolume = volumes[volumes.length - 1];
  const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;

  return {
    rsi,
    macd,
    movingAverages: { sma20, sma50, ema12, ema26 },
    bollinger,
    volume: {
      current: currentVolume,
      average: avgVolume,
      ratio: currentVolume / avgVolume,
    },
  };
};

// Pattern recognition
export const recognizePatterns = (
  marketData: MarketDataPoint[],
): PatternRecognition[] => {
  const patterns: PatternRecognition[] = [];
  const prices = marketData.slice(-20).map((d) => d.price);

  if (prices.length < 10) return patterns;

  // Golden Cross pattern
  const sma20 = calculateSMA(prices, 20);
  const sma50 = calculateSMA(prices, 50);
  if (sma20 && sma50 && sma20 > sma50) {
    patterns.push({
      pattern: "Golden Cross",
      confidence: 0.75,
      description: "20-period SMA crossed above 50-period SMA",
      bullishSignal: true,
    });
  }

  // Ascending Triangle
  const highs = prices.slice(-10);
  const isAscending = highs.every(
    (price, i) => i === 0 || price >= highs[i - 1] * 0.98,
  );
  if (isAscending) {
    patterns.push({
      pattern: "Ascending Triangle",
      confidence: 0.65,
      description: "Series of higher lows with resistance at same level",
      bullishSignal: true,
    });
  }

  // Double Bottom
  const recentLows = prices.slice(-10);
  const minPrice = Math.min(...recentLows);
  const minIndices = recentLows
    .map((price, i) => (price === minPrice ? i : -1))
    .filter((i) => i !== -1);

  if (minIndices.length >= 2) {
    patterns.push({
      pattern: "Double Bottom",
      confidence: 0.7,
      description: "Two distinct lows at similar price levels",
      bullishSignal: true,
    });
  }

  return patterns;
};

// Main analysis function
export const analyzePattern = (
  marketData: MarketDataPoint[],
): TradingDecision => {
  if (marketData.length < 20) {
    return {
      action: "hold",
      confidence: 0.1,
      reasoning: "Insufficient data for analysis",
      feedback: "Need more historical data to make informed decisions",
      riskLevel: "high",
    };
  }

  const indicators = analyzeTechnicalIndicators(marketData);
  const patterns = recognizePatterns(marketData);

  if (!indicators) {
    return {
      action: "hold",
      confidence: 0.2,
      reasoning: "Unable to calculate technical indicators",
      feedback: "Market data analysis incomplete",
      riskLevel: "high",
    };
  }

  // Decision logic based on technical indicators
  let bullishSignals = 0;
  let bearishSignals = 0;
  let reasoning = [];

  // RSI analysis
  if (indicators.rsi < 30) {
    bullishSignals++;
    reasoning.push("RSI indicates oversold conditions");
  } else if (indicators.rsi > 70) {
    bearishSignals++;
    reasoning.push("RSI indicates overbought conditions");
  }

  // MACD analysis
  if (indicators.macd.macd > indicators.macd.signal) {
    bullishSignals++;
    reasoning.push("MACD line above signal line");
  } else {
    bearishSignals++;
    reasoning.push("MACD line below signal line");
  }

  // Moving average analysis
  if (indicators.movingAverages.sma20 > indicators.movingAverages.sma50) {
    bullishSignals++;
    reasoning.push("Short-term MA above long-term MA");
  } else {
    bearishSignals++;
    reasoning.push("Short-term MA below long-term MA");
  }

  // Volume analysis
  if (indicators.volume.ratio > 1.5) {
    bullishSignals++;
    reasoning.push("Above-average volume supports the move");
  }

  // Pattern analysis
  const bullishPatterns = patterns.filter((p) => p.bullishSignal);
  const bearishPatterns = patterns.filter((p) => !p.bullishSignal);

  bullishSignals += bullishPatterns.length;
  bearishSignals += bearishPatterns.length;

  patterns.forEach((pattern) => {
    reasoning.push(`${pattern.pattern} pattern detected`);
  });

  // Generate decision
  const totalSignals = bullishSignals + bearishSignals;
  const confidence =
    totalSignals > 0
      ? Math.abs(bullishSignals - bearishSignals) / totalSignals
      : 0;

  let action: "buy" | "sell" | "hold" = "hold";
  let riskLevel: "low" | "medium" | "high" = "medium";

  if (bullishSignals > bearishSignals && confidence > 0.6) {
    action = "buy";
    riskLevel = confidence > 0.8 ? "low" : "medium";
  } else if (bearishSignals > bullishSignals && confidence > 0.6) {
    action = "sell";
    riskLevel = confidence > 0.8 ? "low" : "medium";
  } else {
    riskLevel = "high";
  }

  const currentPrice = marketData[marketData.length - 1].price;

  return {
    action,
    confidence: Math.min(confidence, 0.95), // Cap at 95%
    reasoning: reasoning.join(", "),
    feedback: `Analysis based on ${totalSignals} signals (${bullishSignals} bullish, ${bearishSignals} bearish)`,
    riskLevel,
    suggestedAmount: action !== "hold" ? 0.1 : undefined, // 10% of portfolio
    stopLoss: action === "buy" ? currentPrice * 0.95 : currentPrice * 1.05,
    takeProfit: action === "buy" ? currentPrice * 1.1 : currentPrice * 0.9,
  };
};

// Strategy adjustment based on performance
export const adjustStrategy = (
  performance: { wins: number; losses: number; totalTrades: number },
  currentStrategy: any,
): any => {
  const winRate =
    performance.totalTrades > 0
      ? performance.wins / performance.totalTrades
      : 0;

  if (winRate < 0.4) {
    // Poor performance, be more conservative
    return {
      ...currentStrategy,
      riskTolerance: Math.max(currentStrategy.riskTolerance - 0.1, 0.1),
      confidenceThreshold: Math.min(
        currentStrategy.confidenceThreshold + 0.1,
        0.9,
      ),
      feedback:
        "Strategy adjusted to be more conservative due to poor performance",
    };
  } else if (winRate > 0.7) {
    // Good performance, can be slightly more aggressive
    return {
      ...currentStrategy,
      riskTolerance: Math.min(currentStrategy.riskTolerance + 0.05, 0.8),
      confidenceThreshold: Math.max(
        currentStrategy.confidenceThreshold - 0.05,
        0.5,
      ),
      feedback:
        "Strategy adjusted to be slightly more aggressive due to good performance",
    };
  }

  return {
    ...currentStrategy,
    feedback: "Strategy maintained due to acceptable performance",
  };
};
