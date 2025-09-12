// YouTube API Service for Educational Content

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  viewCount: number;
  channelName: string;
  channelId: string;
  publishedAt: string;
  tags: string[];
  url: string;
  embedUrl: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  videos: YouTubeVideo[];
  estimatedDuration: string;
  objectives: string[];
  prerequisites?: string[];
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  points: number;
}

// Trusted educational channels for financial content
const TRUSTED_CHANNELS = [
  {
    id: "UCNjPtOCvMrKY5eLwr_-7eUg", // Ben Felix
    name: "Ben Felix",
    speciality: "Portfolio Management",
  },
  {
    id: "UCDVYQ4Zhbm3S2dlz7P1GBDg", // The Plain Bagel
    name: "The Plain Bagel",
    speciality: "Financial Education",
  },
  {
    id: "UCR1IuLEqb6UEA_zQ81kwXfg", // Real Vision
    name: "Real Vision",
    speciality: "Market Analysis",
  },
  {
    id: "UC7Lxnz0WxtAhQUmfPfz7fUw", // Patrick Boyle
    name: "Patrick Boyle",
    speciality: "Finance & Economics",
  },
];

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || "demo";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// Fetch videos from trusted channels
export const fetchEducationalVideos = async (
  searchQuery: string = "trading basics",
  maxResults: number = 10,
): Promise<YouTubeVideo[]> => {
  if (YOUTUBE_API_KEY === "demo") {
    return getMockVideos();
  }

  try {
    const channelIds = TRUSTED_CHANNELS.map((ch) => ch.id).join(",");

    const response = await fetch(
      `${YOUTUBE_API_BASE}/search?key=${YOUTUBE_API_KEY}&channelId=${channelIds}&part=snippet&type=video&q=${encodeURIComponent(searchQuery)}&maxResults=${maxResults}&order=relevance`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch YouTube videos");
    }

    const data = await response.json();

    if (!data.items) {
      return getMockVideos();
    }

    // Get video details including duration
    const videoIds = data.items.map((item: any) => item.id.videoId).join(",");
    const detailsResponse = await fetch(
      `${YOUTUBE_API_BASE}/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`,
    );

    const detailsData = await detailsResponse.json();

    return detailsData.items.map((video: any) => ({
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl:
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.default.url,
      duration: parseDuration(video.contentDetails.duration),
      viewCount: parseInt(video.statistics.viewCount || "0"),
      channelName: video.snippet.channelTitle,
      channelId: video.snippet.channelId,
      publishedAt: video.snippet.publishedAt,
      tags: video.snippet.tags || [],
      url: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
    }));
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return getMockVideos();
  }
};

// Parse YouTube duration format (PT4M13S -> 4:13)
const parseDuration = (duration: string): string => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";

  const hours = parseInt(match[1] || "0");
  const minutes = parseInt(match[2] || "0");
  const seconds = parseInt(match[3] || "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

// Create learning modules from YouTube videos
export const createLearningModules = async (): Promise<LearningModule[]> => {
  const modules: LearningModule[] = [];

  const topics = [
    {
      title: "Trading Fundamentals",
      query: "stock trading basics fundamentals",
      category: "basics",
      difficulty: "beginner" as const,
      objectives: [
        "Understand basic trading concepts",
        "Learn about different asset classes",
        "Recognize market terminology",
        "Identify trading opportunities",
      ],
    },
    {
      title: "Technical Analysis",
      query: "technical analysis chart patterns",
      category: "analysis",
      difficulty: "intermediate" as const,
      objectives: [
        "Read and interpret charts",
        "Identify support and resistance",
        "Use technical indicators",
        "Recognize chart patterns",
      ],
    },
    {
      title: "Risk Management",
      query: "trading risk management portfolio",
      category: "risk",
      difficulty: "intermediate" as const,
      objectives: [
        "Calculate position sizes",
        "Set stop-loss orders",
        "Diversify portfolios",
        "Manage trading psychology",
      ],
    },
    {
      title: "Advanced Strategies",
      query: "advanced trading strategies options",
      category: "advanced",
      difficulty: "advanced" as const,
      objectives: [
        "Implement complex strategies",
        "Use derivatives effectively",
        "Manage multiple positions",
        "Optimize portfolio returns",
      ],
    },
  ];

  for (const topic of topics) {
    const videos = await fetchEducationalVideos(topic.query, 5);

    modules.push({
      id: `module_${topic.category}`,
      title: topic.title,
      description: `Comprehensive ${topic.title.toLowerCase()} course`,
      category: topic.category,
      difficulty: topic.difficulty,
      videos,
      estimatedDuration: `${videos.length * 15} minutes`,
      objectives: topic.objectives,
      quiz: generateQuizForTopic(topic.title, topic.difficulty),
    });
  }

  return modules;
};

// Generate adaptive quiz questions
const generateQuizForTopic = (
  topic: string,
  difficulty: string,
): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];

  if (topic.includes("Fundamentals")) {
    questions.push({
      id: "q1",
      question: "What is the primary goal of fundamental analysis?",
      options: [
        "To predict short-term price movements",
        "To determine the intrinsic value of an asset",
        "To identify chart patterns",
        "To time market entry and exit",
      ],
      correctAnswer: 1,
      explanation:
        "Fundamental analysis aims to determine the intrinsic value of an asset by examining economic factors, company financials, and market conditions.",
      difficulty: difficulty as any,
      points:
        difficulty === "beginner"
          ? 10
          : difficulty === "intermediate"
            ? 15
            : 20,
    });
  }

  if (topic.includes("Technical")) {
    questions.push({
      id: "q2",
      question: "What does a 'support level' represent in technical analysis?",
      options: [
        "A price level where buying interest is strong",
        "The highest price an asset can reach",
        "A bearish signal for selling",
        "The average trading volume",
      ],
      correctAnswer: 0,
      explanation:
        "A support level is a price point where buying pressure typically prevents further decline, acting as a 'floor' for the asset price.",
      difficulty: difficulty as any,
      points:
        difficulty === "beginner"
          ? 10
          : difficulty === "intermediate"
            ? 15
            : 20,
    });
  }

  if (topic.includes("Risk")) {
    questions.push({
      id: "q3",
      question:
        "What percentage of your portfolio should typically be risked on a single trade?",
      options: ["10-20%", "25-50%", "1-3%", "It doesn't matter"],
      correctAnswer: 2,
      explanation:
        "Most professional traders recommend risking only 1-3% of total portfolio value on any single trade to preserve capital.",
      difficulty: difficulty as any,
      points:
        difficulty === "beginner"
          ? 10
          : difficulty === "intermediate"
            ? 15
            : 20,
    });
  }

  return questions;
};

// Mock data for fallback
const getMockVideos = (): YouTubeVideo[] => [
  {
    id: "mock1",
    title: "Trading Basics: Complete Beginner's Guide to Stock Market",
    description:
      "Learn the fundamentals of stock trading, including how markets work, basic terminology, and getting started with your first trades.",
    thumbnailUrl: "https://img.youtube.com/vi/mock1/mqdefault.jpg",
    duration: "15:32",
    viewCount: 1250000,
    channelName: "Trading Education",
    channelId: "mock_channel_1",
    publishedAt: "2024-01-15T10:00:00Z",
    tags: ["trading", "stocks", "beginner", "education"],
    url: "https://www.youtube.com/watch?v=mock1",
    embedUrl: "https://www.youtube.com/embed/mock1",
  },
  {
    id: "mock2",
    title: "Technical Analysis Masterclass: Chart Patterns That Work",
    description:
      "Deep dive into the most reliable chart patterns and technical indicators used by professional traders.",
    thumbnailUrl: "https://img.youtube.com/vi/mock2/mqdefault.jpg",
    duration: "22:45",
    viewCount: 895000,
    channelName: "Market Analysis Pro",
    channelId: "mock_channel_2",
    publishedAt: "2024-01-10T14:30:00Z",
    tags: ["technical analysis", "charts", "patterns", "indicators"],
    url: "https://www.youtube.com/watch?v=mock2",
    embedUrl: "https://www.youtube.com/embed/mock2",
  },
  {
    id: "mock3",
    title: "Risk Management: How to Protect Your Trading Capital",
    description:
      "Essential risk management strategies every trader needs to know to survive and thrive in the markets.",
    thumbnailUrl: "https://img.youtube.com/vi/mock3/mqdefault.jpg",
    duration: "18:20",
    viewCount: 675000,
    channelName: "Professional Trading",
    channelId: "mock_channel_3",
    publishedAt: "2024-01-05T09:15:00Z",
    tags: ["risk management", "trading psychology", "money management"],
    url: "https://www.youtube.com/watch?v=mock3",
    embedUrl: "https://www.youtube.com/embed/mock3",
  },
];

// Adaptive testing system
export interface LearningProgress {
  moduleId: string;
  videosWatched: string[];
  quizScores: { [questionId: string]: boolean };
  overallScore: number;
  timeSpent: number;
  lastAccessed: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  strengths: string[];
  weaknesses: string[];
}

export const adaptLearningPath = (
  progress: LearningProgress[],
): LearningModule[] => {
  // Analyze user performance and suggest next modules
  const averageScore =
    progress.reduce((sum, p) => sum + p.overallScore, 0) / progress.length;

  if (averageScore > 0.8) {
    // High performer - suggest advanced content
    return createAdvancedModules();
  } else if (averageScore > 0.6) {
    // Good performer - continue with current level
    return createIntermediateModules();
  } else {
    // Needs more practice - provide additional beginner content
    return createBeginnerModules();
  }
};

const createAdvancedModules = async (): Promise<LearningModule[]> => {
  const videos = await fetchEducationalVideos("advanced trading strategies", 5);
  return [
    {
      id: "advanced_strategies",
      title: "Advanced Trading Strategies",
      description: "Complex trading techniques for experienced traders",
      category: "advanced",
      difficulty: "advanced",
      videos,
      estimatedDuration: "75 minutes",
      objectives: [
        "Master complex strategies",
        "Manage multiple positions",
        "Optimize returns",
      ],
      quiz: generateQuizForTopic("Advanced Strategies", "advanced"),
    },
  ];
};

const createIntermediateModules = async (): Promise<LearningModule[]> => {
  const videos = await fetchEducationalVideos(
    "intermediate trading techniques",
    5,
  );
  return [
    {
      id: "intermediate_techniques",
      title: "Intermediate Trading Techniques",
      description: "Build on fundamentals with advanced concepts",
      category: "intermediate",
      difficulty: "intermediate",
      videos,
      estimatedDuration: "60 minutes",
      objectives: [
        "Apply technical analysis",
        "Develop trading strategies",
        "Manage risk effectively",
      ],
      quiz: generateQuizForTopic("Technical Analysis", "intermediate"),
    },
  ];
};

const createBeginnerModules = async (): Promise<LearningModule[]> => {
  const videos = await fetchEducationalVideos("stock market basics", 5);
  return [
    {
      id: "basics_review",
      title: "Trading Fundamentals Review",
      description: "Reinforce basic concepts and terminology",
      category: "basics",
      difficulty: "beginner",
      videos,
      estimatedDuration: "45 minutes",
      objectives: [
        "Master basic concepts",
        "Understand market mechanics",
        "Build confidence",
      ],
      quiz: generateQuizForTopic("Fundamentals", "beginner"),
    },
  ];
};
