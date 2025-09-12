import { LessonModule } from "./data";

export const comprehensiveLessonModules: LessonModule[] = [
  {
    id: "lesson1",
    title: "Introduction to Cryptocurrency Trading",
    description:
      "Learn the fundamentals of cryptocurrency and blockchain technology",
    duration: 45,
    difficulty: "beginner",
    completed: true,
    content: {
      sections: [
        {
          title: "What is Cryptocurrency?",
          content:
            "Cryptocurrency is a digital or virtual currency that uses cryptography for security. Unlike traditional currencies issued by governments (fiat), cryptocurrencies operate on decentralized networks based on blockchain technology. This means no single entity controls the currency, making it resistant to government interference or manipulation. Key characteristics include: digital nature, cryptographic security, decentralization, limited supply, and global accessibility.",
          videoUrl: "https://www.youtube.com/embed/VYWc9dFqROI",
          keyPoints: [
            "Digital currency secured by cryptography",
            "Operates on decentralized blockchain networks",
            "Not controlled by governments or central authorities",
            "Limited supply creates scarcity",
            "Accessible globally 24/7",
          ],
        },
        {
          title: "Blockchain Technology Explained",
          content:
            "Blockchain is the underlying technology that powers cryptocurrencies. It's essentially a distributed digital ledger that records transactions across multiple computers in a way that makes it virtually impossible to change, hack, or cheat. Each 'block' contains a cryptographic hash of the previous block, a timestamp, and transaction data. This creates an immutable chain of records that provides transparency and security without requiring a central authority.",
          videoUrl: "https://www.youtube.com/embed/SSo_EIwHSd4",
          keyPoints: [
            "Distributed digital ledger technology",
            "Blocks linked by cryptographic hashes",
            "Immutable and transparent records",
            "Decentralized validation process",
            "Enhanced security without central authority",
          ],
        },
        {
          title: "Understanding Market Basics",
          content:
            "Cryptocurrency markets operate 24/7, unlike traditional stock markets. Key concepts include: Market Cap (total value of all coins), Trading Volume (amount traded in 24 hours), Price Action (how price moves over time), Liquidity (ease of buying/selling), and Volatility (price fluctuation degree). Understanding these helps you navigate the crypto landscape effectively.",
          videoUrl: "https://www.youtube.com/embed/Mlk5qzkzrVs",
          keyPoints: [
            "24/7 continuous market operation",
            "Market cap indicates total value",
            "Volume shows trading activity",
            "Liquidity affects ease of trading",
            "Volatility measures price fluctuation",
          ],
        },
        {
          title: "Types of Cryptocurrencies",
          content:
            "Not all cryptocurrencies are the same. Bitcoin (BTC) is digital gold and store of value. Ethereum (ETH) enables smart contracts and DeFi. Stablecoins like USDC maintain stable value. Utility tokens provide access to specific services. Governance tokens give voting rights in protocols. Each serves different purposes in the crypto ecosystem.",
        },
        {
          title: "Risk Management Fundamentals",
          content:
            "The golden rule: never invest more than you can afford to lose. Cryptocurrency is highly volatile and risky. Essential risk management includes: diversification across different assets, using stop-losses to limit downside, position sizing (never put all eggs in one basket), and having a clear trading plan with entry and exit strategies.",
        },
      ],
    },
    quiz: {
      id: "quiz1",
      title: "Cryptocurrency Fundamentals Quiz",
      passingScore: 70,
      timeLimit: 20,
      questions: [
        {
          id: "q1",
          question:
            "What technology do cryptocurrencies primarily use for security and decentralization?",
          type: "multiple-choice",
          options: [
            "Blockchain",
            "Artificial Intelligence",
            "Cloud Computing",
            "Quantum Computing",
          ],
          correctAnswer: 0,
          explanation:
            "Cryptocurrencies use blockchain technology for decentralized, secure, and transparent transactions without requiring a central authority.",
        },
        {
          id: "q2",
          question:
            "What is the main advantage of cryptocurrency being decentralized?",
          type: "multiple-choice",
          options: [
            "Faster transactions",
            "No government control",
            "Higher prices",
            "Better security",
          ],
          correctAnswer: 1,
          explanation:
            "Decentralization means no single entity (like government or bank) controls the currency, providing freedom from central authority interference.",
        },
        {
          id: "q3",
          question:
            "What should you never do when investing in cryptocurrencies?",
          type: "multiple-choice",
          options: [
            "Research before investing",
            "Use stop-losses",
            "Invest more than you can afford to lose",
            "Diversify your portfolio",
          ],
          correctAnswer: 2,
          explanation:
            "Never invest more than you can afford to lose is the fundamental rule in crypto investing due to high volatility and risk.",
        },
        {
          id: "q4",
          question: "True or False: Cryptocurrency markets operate 24/7.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "True. Unlike traditional stock markets that have opening and closing hours, cryptocurrency markets operate continuously, 24 hours a day, 7 days a week.",
        },
        {
          id: "q5",
          question: "What is market capitalization in cryptocurrency?",
          type: "multiple-choice",
          options: [
            "The price of one coin",
            "Total value of all coins in circulation",
            "Daily trading volume",
            "Number of transactions",
          ],
          correctAnswer: 1,
          explanation:
            "Market cap is calculated by multiplying the current price by the total number of coins in circulation, representing the total value of the cryptocurrency.",
        },
        {
          id: "q6",
          question: "Which cryptocurrency is known as 'digital gold'?",
          type: "multiple-choice",
          options: ["Ethereum", "Bitcoin", "Litecoin", "Ripple"],
          correctAnswer: 1,
          explanation:
            "Bitcoin is often called 'digital gold' because it's viewed as a store of value and was the first cryptocurrency, similar to how gold is a traditional store of value.",
        },
      ],
    },
  },
  {
    id: "lesson2",
    title: "Technical Analysis Fundamentals",
    description:
      "Master chart reading, patterns, and technical analysis tools for trading decisions",
    duration: 60,
    difficulty: "intermediate",
    completed: false,
    content: {
      sections: [
        {
          title: "Introduction to Technical Analysis",
          content:
            "Technical analysis is the study of price movements and trading volume to predict future price directions. It's based on three core principles: 1) Market action discounts everything (all information is reflected in price), 2) Prices move in trends, and 3) History tends to repeat itself. Unlike fundamental analysis which looks at intrinsic value, technical analysis focuses purely on price and volume patterns.",
        },
        {
          title: "Understanding Chart Types",
          content:
            "Different chart types show price data in various ways. Line charts connect closing prices and show overall trend. Bar charts show open, high, low, and close (OHLC) for each period. Candlestick charts are most popular, visually representing OHLC data with colored 'candles' - green/white for up moves, red/black for down moves. The body shows open-to-close range, while wicks show the high-low range.",
        },
        {
          title: "Support and Resistance Levels",
          content:
            "Support is a price level where buying pressure is expected to emerge, acting like a 'floor' that prevents further decline. Resistance is where selling pressure emerges, acting like a 'ceiling' preventing further rise. These levels can be horizontal (at specific prices), diagonal (trend lines), or dynamic (moving averages). When broken, they often reverse roles - old resistance becomes new support and vice versa.",
        },
        {
          title: "Chart Patterns Recognition",
          content:
            "Chart patterns are formations created by price movements that tend to repeat and often signal future direction. Continuation patterns (flags, pennants, triangles) suggest trend will continue. Reversal patterns (head and shoulders, double tops/bottoms) suggest trend change. Breakout patterns require volume confirmation - high volume on breakout increases reliability.",
        },
        {
          title: "Essential Technical Indicators",
          content:
            "Moving Averages smooth price data and identify trends - price above MA suggests uptrend. RSI (Relative Strength Index) measures momentum from 0-100, with 70+ indicating overbought and 30- oversold conditions. MACD shows relationship between two moving averages, generating buy/sell signals when lines cross. Volume confirms price movements - genuine moves should have supporting volume.",
        },
        {
          title: "Timeframe Analysis",
          content:
            "Multiple timeframe analysis provides context. Higher timeframes (daily, weekly) show overall trend and major levels. Lower timeframes (1h, 15min) help with precise entry/exit timing. The rule: trade in direction of higher timeframe trend, use lower timeframes for entries. Day traders might use 4h for trend, 15min for entries. Swing traders use daily for trend, 4h for entries.",
        },
      ],
    },
    quiz: {
      id: "quiz2",
      title: "Technical Analysis Mastery Quiz",
      passingScore: 75,
      timeLimit: 25,
      questions: [
        {
          id: "q1",
          question: "What are the three core principles of technical analysis?",
          type: "multiple-choice",
          options: [
            "Price, volume, time",
            "Market action discounts everything, prices move in trends, history repeats",
            "Buy low, sell high, use stop losses",
            "Support, resistance, trends",
          ],
          correctAnswer: 1,
          explanation:
            "The three core principles are: 1) Market action discounts everything, 2) Prices move in trends, 3) History tends to repeat itself.",
        },
        {
          id: "q2",
          question: "What does a candlestick chart show?",
          type: "multiple-choice",
          options: [
            "Only closing prices",
            "Open, High, Low, Close prices",
            "Volume only",
            "Moving averages",
          ],
          correctAnswer: 1,
          explanation:
            "Candlestick charts display the Open, High, Low, and Close (OHLC) prices for each time period, with the body showing open-to-close range and wicks showing high-low range.",
        },
        {
          id: "q3",
          question: "What happens when a support level is broken?",
          type: "multiple-choice",
          options: [
            "Price always reverses immediately",
            "It often becomes new resistance",
            "Nothing significant",
            "Volume always increases",
          ],
          correctAnswer: 1,
          explanation:
            "When support is broken, it often becomes new resistance due to role reversal - previous buyers become sellers at that level.",
        },
        {
          id: "q4",
          question: "RSI reading of 80 typically indicates:",
          type: "multiple-choice",
          options: [
            "Oversold condition",
            "Overbought condition",
            "Neutral condition",
            "Strong uptrend",
          ],
          correctAnswer: 1,
          explanation:
            "RSI above 70 (especially 80+) indicates overbought conditions, suggesting potential for price decline or consolidation.",
        },
        {
          id: "q5",
          question: "True or False: High volume confirms price breakouts.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "True. High volume on breakouts indicates strong conviction and increases the reliability of the breakout move.",
        },
        {
          id: "q6",
          question: "What is the purpose of multiple timeframe analysis?",
          type: "multiple-choice",
          options: [
            "To confuse traders",
            "To see trend context and timing entries",
            "To increase trading frequency",
            "To avoid using indicators",
          ],
          correctAnswer: 1,
          explanation:
            "Multiple timeframe analysis helps see the bigger picture trend context while using lower timeframes for precise entry and exit timing.",
        },
        {
          id: "q7",
          question: "Which pattern typically signals trend continuation?",
          type: "multiple-choice",
          options: [
            "Head and shoulders",
            "Double top",
            "Flag pattern",
            "Double bottom",
          ],
          correctAnswer: 2,
          explanation:
            "Flag patterns are continuation patterns that suggest the existing trend will resume after a brief consolidation period.",
        },
        {
          id: "q8",
          question: "Moving averages are best used for:",
          type: "multiple-choice",
          options: [
            "Exact price prediction",
            "Trend identification",
            "Volume analysis",
            "News interpretation",
          ],
          correctAnswer: 1,
          explanation:
            "Moving averages smooth price data and are primarily used for trend identification - price above MA suggests uptrend, below suggests downtrend.",
        },
      ],
    },
  },
  {
    id: "lesson3",
    title: "Risk Management and Position Sizing",
    description:
      "Learn to protect your capital and manage risk like a professional trader",
    duration: 50,
    difficulty: "intermediate",
    completed: false,
    content: {
      sections: [
        {
          title: "The Foundation of Trading Success",
          content:
            "Risk management is the most crucial aspect of successful trading - more important than finding winning trades. It's about preserving capital during losing streaks and maximizing gains during winning streaks. Professional traders understand that losses are inevitable; the key is controlling them. A trader with a 40% win rate can be profitable with proper risk management, while a trader with 80% wins can lose money with poor risk control.",
        },
        {
          title: "Position Sizing Strategies",
          content:
            "Position sizing determines how much capital to risk on each trade. The 1-2% rule suggests never risking more than 1-2% of total capital per trade. For a $10,000 account, this means risking max $100-200 per trade. Calculate position size by: (Account Risk ÷ Trade Risk) = Position Size. If risking $100 on a trade with $10 stop loss, position size is $100 ÷ $10 = 10 units. This ensures survival through inevitable losing streaks.",
        },
        {
          title: "Stop Losses and Take Profits",
          content:
            "Stop losses are predetermined exit points to limit losses - set them BEFORE entering trades to remove emotion. Place stops at logical technical levels (below support for longs, above resistance for shorts), not arbitrary percentages. Take profits secure gains at predetermined levels. Use trailing stops for trending markets to capture extended moves while protecting profits. Never move stops against you - this violates the protective purpose.",
        },
        {
          title: "Risk/Reward Ratios",
          content:
            "Risk/reward ratio compares potential loss to potential gain. A 1:2 ratio means risking $1 to potentially make $2. With 1:2 ratios, you only need 33% win rate to break even, leaving room for profit. Always measure from entry to stop loss (risk) and entry to target (reward). Don't take trades with unfavorable ratios - patience for good setups is crucial for long-term success.",
        },
        {
          title: "Diversification and Correlation",
          content:
            "Don't put all eggs in one basket. Diversify across different assets, timeframes, and strategies. However, understand correlation - during market crashes, most cryptos move together, reducing diversification benefits. Consider diversifying into different asset classes (stocks, commodities, forex) for true risk reduction. Also diversify across time - don't deploy all capital at once, scale into positions gradually.",
        },
        {
          title: "Psychological Aspects of Risk",
          content:
            "Risk management is as much psychological as mathematical. Fear of missing out (FOMO) leads to oversized positions. Revenge trading after losses increases risk-taking. Overconfidence after wins reduces caution. Combat these by: having pre-defined rules, keeping trading journal, reviewing decisions regularly, and maintaining strict discipline regardless of recent performance.",
        },
      ],
    },
    quiz: {
      id: "quiz3",
      title: "Risk Management Mastery Quiz",
      passingScore: 80,
      timeLimit: 20,
      questions: [
        {
          id: "q1",
          question:
            "What percentage of capital should you typically risk per trade?",
          type: "multiple-choice",
          options: ["5-10%", "1-2%", "15-20%", "25-30%"],
          correctAnswer: 1,
          explanation:
            "Professional traders typically risk only 1-2% of their capital per trade to ensure long-term survival and consistent performance.",
        },
        {
          id: "q2",
          question: "When should you set your stop loss?",
          type: "multiple-choice",
          options: [
            "After the trade goes against you",
            "When you're in profit",
            "Before entering the trade",
            "Only for losing trades",
          ],
          correctAnswer: 2,
          explanation:
            "Stop losses should always be set before entering a trade to remove emotion from the decision and ensure disciplined risk management.",
        },
        {
          id: "q3",
          question:
            "With a 1:2 risk/reward ratio, what win rate do you need to break even?",
          type: "multiple-choice",
          options: ["50%", "33%", "66%", "25%"],
          correctAnswer: 1,
          explanation:
            "With 1:2 risk/reward, you make $2 for every $1 lost. You need to win 1 out of every 3 trades (33%) to break even: 2 losses (-$2) + 1 win (+$2) = $0.",
        },
        {
          id: "q4",
          question: "True or False: You can be profitable with a 40% win rate.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "True. With proper risk management and favorable risk/reward ratios (like 1:2 or better), you can be profitable even with lower win rates.",
        },
        {
          id: "q5",
          question: "What is position sizing?",
          type: "multiple-choice",
          options: [
            "The price of the asset",
            "How much capital to risk per trade",
            "The size of your screen",
            "The number of trades per day",
          ],
          correctAnswer: 1,
          explanation:
            "Position sizing determines how much capital to risk on each trade based on your risk management rules and account size.",
        },
        {
          id: "q6",
          question: "Where should stop losses be placed?",
          type: "multiple-choice",
          options: [
            "At random percentages below entry",
            "At logical technical levels",
            "Only at round numbers",
            "As far as possible",
          ],
          correctAnswer: 1,
          explanation:
            "Stop losses should be placed at logical technical levels like below support for long trades or above resistance for short trades.",
        },
        {
          id: "q7",
          question: "What is the main purpose of diversification?",
          type: "multiple-choice",
          options: [
            "To increase profits",
            "To reduce risk",
            "To trade more frequently",
            "To follow trends",
          ],
          correctAnswer: 1,
          explanation:
            "Diversification's main purpose is to reduce risk by spreading exposure across different assets, preventing total loss from any single investment.",
        },
        {
          id: "q8",
          question:
            "True or False: You should move your stop loss against you if the trade isn't working.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "False. Never move stop losses against you as this violates the protective purpose and can turn small losses into large ones.",
        },
      ],
    },
  },
  {
    id: "lesson4",
    title: "Trading Psychology and Discipline",
    description:
      "Master the mental game and develop the psychological edge needed for consistent trading success",
    duration: 55,
    difficulty: "advanced",
    completed: false,
    content: {
      sections: [
        {
          title: "The Psychological Challenge of Trading",
          content:
            "Trading is 20% strategy and 80% psychology. Markets are designed to trigger our worst instincts - fear, greed, hope, and ego. Understanding these emotional forces is crucial because they can sabotage even the best trading strategies. Fear causes us to exit winners too early or avoid good setups. Greed makes us hold losers too long or risk too much. Hope prevents us from cutting losses. Ego makes us revenge trade after losses.",
        },
        {
          title: "Common Psychological Traps",
          content:
            "FOMO (Fear of Missing Out) causes chasing prices and poor entries. Revenge trading after losses leads to emotional decisions and bigger losses. Overconfidence after wins increases risk-taking and carelessness. Analysis paralysis prevents taking good setups due to overthinking. Confirmation bias makes us see only information that supports our position. Loss aversion makes cutting losses emotionally painful, leading to hope instead of action.",
        },
        {
          title: "Developing Trading Discipline",
          content:
            "Discipline comes from having clear, written rules and following them regardless of emotions. Create detailed trading plans covering: entry criteria, position sizing, stop loss placement, profit targets, and exit rules. Stick to these rules even when they feel wrong in the moment. Discipline isn't natural - it must be developed through consistent practice and self-awareness. Track your rule violations and their consequences.",
        },
        {
          title: "Managing Emotions During Trading",
          content:
            "Emotional control starts before you trade. Proper preparation reduces anxiety and uncertainty. Use meditation, exercise, or other stress-reduction techniques. During trading, focus on process, not outcomes. Accept that losses are part of the business. Take breaks when feeling emotional - never trade angry, depressed, or overly excited. Keep a trading journal documenting both trades and emotions to identify patterns.",
        },
        {
          title: "Building Mental Resilience",
          content:
            "Resilience helps bounce back from setbacks stronger. Losing streaks are inevitable - how you handle them determines long-term success. Focus on what you can control (process, risk management) rather than what you can't (market direction). Learn from every trade, both winners and losers. Maintain perspective - trading is a marathon, not a sprint. Develop life outside trading to maintain emotional balance.",
        },
        {
          title: "The Professional Mindset",
          content:
            "Think like a business owner, not a gambler. Professional traders understand that individual trades don't matter - it's the overall edge over many trades that creates profits. They focus on consistent execution rather than big wins. They view losses as business expenses, not personal failures. They continuously educate themselves and adapt to changing markets. Most importantly, they know when to walk away and preserve capital.",
        },
      ],
    },
    quiz: {
      id: "quiz4",
      title: "Trading Psychology Assessment",
      passingScore: 75,
      timeLimit: 25,
      questions: [
        {
          id: "q1",
          question:
            "What percentage of trading success is attributed to psychology?",
          type: "multiple-choice",
          options: ["20%", "50%", "80%", "100%"],
          correctAnswer: 2,
          explanation:
            "Trading is often said to be 20% strategy and 80% psychology, highlighting the crucial importance of mental discipline and emotional control.",
        },
        {
          id: "q2",
          question: "What is FOMO in trading?",
          type: "multiple-choice",
          options: [
            "Fear of Making Orders",
            "Fear of Missing Out",
            "Fear of Market Orders",
            "Fear of Money Operations",
          ],
          correctAnswer: 1,
          explanation:
            "FOMO (Fear of Missing Out) causes traders to chase prices and enter trades at poor timing due to fear of missing potential profits.",
        },
        {
          id: "q3",
          question: "What is revenge trading?",
          type: "multiple-choice",
          options: [
            "Trading for consistent profits",
            "Trading to recover losses quickly through increased risk",
            "Trading with a detailed plan",
            "Trading multiple assets",
          ],
          correctAnswer: 1,
          explanation:
            "Revenge trading is attempting to quickly recover losses through emotional, high-risk trades, often leading to even bigger losses.",
        },
        {
          id: "q4",
          question:
            "True or False: Professional traders never experience losses.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "False. All traders, including professionals, experience losses. The difference is how they manage and learn from those losses.",
        },
        {
          id: "q5",
          question: "What should you focus on during trading?",
          type: "multiple-choice",
          options: [
            "Making money quickly",
            "Process and rule following",
            "Predicting market direction",
            "Copying other traders",
          ],
          correctAnswer: 1,
          explanation:
            "Successful traders focus on following their process and rules consistently, rather than individual trade outcomes or trying to predict markets.",
        },
        {
          id: "q6",
          question: "How should losing streaks be handled?",
          type: "multiple-choice",
          options: [
            "Increase position sizes",
            "Take a break and review approach",
            "Change strategy immediately",
            "Trade more frequently",
          ],
          correctAnswer: 1,
          explanation:
            "During losing streaks, it's best to take a break, review your approach objectively, and ensure you're following your trading plan.",
        },
        {
          id: "q7",
          question: "What is the purpose of keeping a trading journal?",
          type: "multiple-choice",
          options: [
            "Tax purposes only",
            "Track emotions and improve performance",
            "Impress other traders",
            "It serves no purpose",
          ],
          correctAnswer: 1,
          explanation:
            "A trading journal helps track both performance and emotions, providing valuable insights for continuous improvement and pattern recognition.",
        },
        {
          id: "q8",
          question:
            "True or False: Emotions should be completely eliminated from trading.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "False. Emotions can't be eliminated, but they can be managed and controlled through discipline, preparation, and self-awareness.",
        },
        {
          id: "q9",
          question: "What defines a professional trading mindset?",
          type: "multiple-choice",
          options: [
            "Always being right",
            "Making big profits on every trade",
            "Focusing on edge over many trades",
            "Never taking losses",
          ],
          correctAnswer: 2,
          explanation:
            "Professional traders understand that success comes from having an edge over many trades, not from being right on every individual trade.",
        },
      ],
    },
  },
  {
    id: "lesson5",
    title: "Advanced Trading Strategies",
    description:
      "Learn sophisticated trading approaches including swing trading, scalping, and algorithmic concepts",
    duration: 70,
    difficulty: "advanced",
    completed: false,
    content: {
      sections: [
        {
          title: "Swing Trading Strategies",
          content:
            "Swing trading captures price swings over days to weeks, balancing the patience of investing with the activity of day trading. Key strategies include: Trading breakouts from consolidation patterns, riding momentum after earnings or news, mean reversion when prices deviate from moving averages, and sector rotation based on market cycles. Success requires patience to wait for high-quality setups and discipline to hold through minor fluctuations.",
        },
        {
          title: "Scalping and Day Trading",
          content:
            "Scalping involves very short-term trades lasting minutes to hours, profiting from small price movements with high frequency. Requirements include: strong technical analysis skills, fast execution platform, excellent risk management, and emotional discipline. Focus on liquid markets, trade during high-volume periods, use tight stops, and maintain strict win/loss ratios. Not suitable for everyone due to stress and time requirements.",
        },
        {
          title: "Momentum and Trend Following",
          content:
            "Momentum strategies buy strength and sell weakness, riding trends rather than fighting them. Identify trends using multiple timeframes, enter on pullbacks to moving averages, use momentum indicators like RSI and MACD for confirmation. Trend following works well in trending markets but struggles in choppy, sideways markets. Combine with market regime analysis to know when to apply these strategies.",
        },
        {
          title: "Mean Reversion Strategies",
          content:
            "Mean reversion assumes prices will return to their average after extreme moves. Works well in range-bound markets. Identify oversold/overbought conditions using RSI, Bollinger Bands, or other oscillators. Enter counter-trend positions with tight stops. This strategy is opposite to momentum trading - use in appropriate market conditions. Requires excellent timing and strong risk management.",
        },
        {
          title: "Options and Derivatives Trading",
          content:
            "Options provide leverage and flexibility but require deep understanding. Basic strategies include: buying calls for bullish outlook, buying puts for bearish outlook, selling covered calls for income, and protective puts for insurance. Advanced strategies involve spreads, straddles, and strangles. Understand Greeks (Delta, Gamma, Theta, Vega) and time decay. High risk/reward potential with complexity.",
        },
        {
          title: "Algorithmic Trading Concepts",
          content:
            "Algorithmic trading uses computer programs to execute trades based on predefined criteria. Benefits include emotion-free execution, speed, and ability to monitor multiple markets simultaneously. Common approaches: statistical arbitrage, pairs trading, market making, and trend following algorithms. Requires programming skills, market data feeds, and significant capital. Understand limitations and market microstructure.",
        },
      ],
    },
    quiz: {
      id: "quiz5",
      title: "Advanced Trading Strategies Quiz",
      passingScore: 80,
      timeLimit: 30,
      questions: [
        {
          id: "q1",
          question: "What is the typical holding period for swing trading?",
          type: "multiple-choice",
          options: [
            "Minutes to hours",
            "Days to weeks",
            "Months to years",
            "Seconds to minutes",
          ],
          correctAnswer: 1,
          explanation:
            "Swing trading typically involves holding positions for days to weeks, capturing intermediate price movements or 'swings' in the market.",
        },
        {
          id: "q2",
          question: "Scalping is best suited for which market conditions?",
          type: "multiple-choice",
          options: [
            "Low volume markets",
            "High volume, liquid markets",
            "Trending markets only",
            "Weekend markets",
          ],
          correctAnswer: 1,
          explanation:
            "Scalping requires high volume and liquid markets to ensure tight spreads and fast execution, allowing for profitable small price movements.",
        },
        {
          id: "q3",
          question: "When do momentum strategies work best?",
          type: "multiple-choice",
          options: [
            "In sideways markets",
            "In trending markets",
            "During low volatility",
            "All market conditions",
          ],
          correctAnswer: 1,
          explanation:
            "Momentum strategies work best in trending markets where price movements continue in one direction, allowing traders to ride the trend.",
        },
        {
          id: "q4",
          question: "What is mean reversion trading?",
          type: "multiple-choice",
          options: [
            "Following trends",
            "Trading against extreme price moves expecting return to average",
            "Using only moving averages",
            "Copying other traders",
          ],
          correctAnswer: 1,
          explanation:
            "Mean reversion trading involves betting that prices will return to their average after extreme moves, going against the current price direction.",
        },
        {
          id: "q5",
          question:
            "True or False: Options trading requires understanding of 'Greeks'.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation:
            "True. Understanding Greeks (Delta, Gamma, Theta, Vega) is crucial for options trading as they measure various risk factors and price sensitivities.",
        },
        {
          id: "q6",
          question: "What is the main advantage of algorithmic trading?",
          type: "multiple-choice",
          options: [
            "Guaranteed profits",
            "Emotion-free execution and speed",
            "No risk involved",
            "No need for market knowledge",
          ],
          correctAnswer: 1,
          explanation:
            "Algorithmic trading's main advantages are emotion-free execution, speed, and ability to monitor multiple markets simultaneously with consistent rule application.",
        },
        {
          id: "q7",
          question:
            "Which strategy involves buying calls or puts based on market outlook?",
          type: "multiple-choice",
          options: [
            "Scalping",
            "Swing trading",
            "Options trading",
            "Algorithmic trading",
          ],
          correctAnswer: 2,
          explanation:
            "Options trading involves buying calls for bullish outlook or puts for bearish outlook, using derivatives to leverage market movements.",
        },
        {
          id: "q8",
          question: "What type of analysis is most important for scalping?",
          type: "multiple-choice",
          options: [
            "Fundamental analysis",
            "Technical analysis",
            "Sentiment analysis",
            "Economic analysis",
          ],
          correctAnswer: 1,
          explanation:
            "Scalping relies heavily on technical analysis for quick entry and exit decisions, as fundamental factors are less relevant for very short-term trades.",
        },
        {
          id: "q9",
          question:
            "True or False: Mean reversion strategies work well in strongly trending markets.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 1,
          explanation:
            "False. Mean reversion strategies work better in range-bound markets, as trending markets can continue longer than expected, making counter-trend trades risky.",
        },
        {
          id: "q10",
          question: "What is required for successful swing trading?",
          type: "multiple-choice",
          options: [
            "Constant market monitoring",
            "Patience and discipline",
            "High-frequency execution",
            "Second-by-second analysis",
          ],
          correctAnswer: 1,
          explanation:
            "Swing trading requires patience to wait for high-quality setups and discipline to hold positions through minor fluctuations until targets are reached.",
        },
      ],
    },
  },
];
