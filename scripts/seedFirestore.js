// 🧪 FIREBASE SEEDING SCRIPT
// Run this script to populate Firestore with demo data
// Usage: node scripts/seedFirestore.js

import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

// You need to replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: "demo",
  authDomain: "financial-empire-demo.firebaseapp.com",
  projectId: "financial-empire-demo",
  storageBucket: "financial-empire-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedDatabase() {
  console.log("🌱 Starting Firestore seeding...");

  try {
    // Demo User Account
    await setDoc(doc(db, "userAccounts", "demoUser"), {
      name: "Demo Tester",
      email: "demo@financialempire.app",
      createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      lastLogin: Date.now(),
      preferences: {
        darkMode: true,
        notifications: true,
        music: false,
        colorScheme: "empire-green",
        fontSize: "medium",
      },
    });

    // Demo User Progress
    await setDoc(doc(db, "userProgress", "demoUser"), {
      percent: 80,
      quizzesCompleted: 5,
      coursesCompleted: 8,
      lastLesson: "Advanced Pattern Recognition",
      totalTimeSpent: 14400, // 4 hours in seconds
      academyUnlocked: true,
      currentLevel: "advanced",
      streakDays: 12,
      lastStudyDate: Date.now() - 24 * 60 * 60 * 1000, // yesterday
    });

    // Demo User Portfolio
    await setDoc(doc(db, "portfolios", "demoUser"), {
      balance: 12500,
      totalValue: 15240,
      manualBotUnlocked: true,
      aggressiveBotUnlocked: true,
      plannerUnlocked: true,
      positions: [
        {
          id: "pos_1",
          asset: "ETH",
          amount: 2.5,
          avgPrice: 1800,
          currentPrice: 2100,
          pnl: 750,
          pnlPercent: 16.67,
          entryDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
        },
        {
          id: "pos_2",
          asset: "SOL",
          amount: 20,
          avgPrice: 35,
          currentPrice: 42,
          pnl: 140,
          pnlPercent: 20,
          entryDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
        },
        {
          id: "pos_3",
          asset: "BTC",
          amount: 0.1,
          avgPrice: 45000,
          currentPrice: 48000,
          pnl: 300,
          pnlPercent: 6.67,
          entryDate: Date.now() - 20 * 24 * 60 * 60 * 1000,
        },
      ],
      tradingHistory: [
        {
          id: "trade_1",
          asset: "MATIC",
          type: "buy",
          amount: 100,
          price: 0.8,
          timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
          pnl: 15,
          status: "closed",
        },
        {
          id: "trade_2",
          asset: "ADA",
          type: "sell",
          amount: 500,
          price: 0.52,
          timestamp: Date.now() - 10 * 24 * 60 * 60 * 1000,
          pnl: -25,
          status: "closed",
        },
      ],
      riskLevel: "medium",
      monthlyReturn: 12.5,
      totalReturn: 28.7,
    });

    // Demo User Achievements
    await setDoc(doc(db, "achievements", "demoUser"), {
      earned: [
        {
          id: "first_login",
          title: "Welcome to Financial Empire",
          description: "Signed up and joined the community",
          points: 100,
          category: "milestone",
          unlockedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
        },
        {
          id: "academy_start",
          title: "Learning Journey Begins",
          description: "Started your first lesson",
          points: 50,
          category: "education",
          unlockedAt: Date.now() - 28 * 24 * 60 * 60 * 1000,
        },
        {
          id: "first_quiz",
          title: "Knowledge Tested",
          description: "Completed your first quiz",
          points: 75,
          category: "education",
          unlockedAt: Date.now() - 25 * 24 * 60 * 60 * 1000,
        },
        {
          id: "manual_bot_unlock",
          title: "Bot Commander",
          description: "Unlocked the Manual Trading Bot",
          points: 200,
          category: "trading",
          unlockedAt: Date.now() - 20 * 24 * 60 * 60 * 1000,
        },
        {
          id: "first_trade",
          title: "Market Debut",
          description: "Executed your first trade",
          points: 150,
          category: "trading",
          unlockedAt: Date.now() - 18 * 24 * 60 * 60 * 1000,
        },
        {
          id: "profit_maker",
          title: "Profit Maker",
          description: "Achieved positive returns",
          points: 300,
          category: "trading",
          unlockedAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
        },
      ],
      available: [
        {
          id: "advanced_trader",
          title: "Advanced Trader",
          description: "Complete all advanced courses",
          points: 500,
          category: "education",
          locked: true,
          requirements: {
            coursesCompleted: 12,
            level: "advanced",
          },
        },
        {
          id: "portfolio_master",
          title: "Portfolio Master",
          description: "Achieve 50% total returns",
          points: 1000,
          category: "trading",
          locked: true,
          requirements: {
            totalReturn: 50,
          },
        },
      ],
      totalPoints: 875,
    });

    // Demo User Certifications
    await setDoc(doc(db, "certifications", "demoUser"), {
      earned: [
        {
          id: "trading_fundamentals",
          title: "Trading Fundamentals",
          description: "Basic trading concepts and market understanding",
          issuedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
          certificateNumber: "FE-2024-001-DEMO",
          score: 92,
          validUntil: Date.now() + 365 * 24 * 60 * 60 * 1000,
        },
      ],
      available: [
        {
          id: "risk_management",
          title: "Risk Management Specialist",
          description: "Advanced risk assessment and portfolio protection",
          requirements: {
            coursesCompleted: 6,
            quizScore: 85,
            botTrades: 10,
          },
          locked: false, // unlocked for demo user
        },
        {
          id: "technical_analysis",
          title: "Technical Analysis Expert",
          description: "Master chart patterns and indicators",
          requirements: {
            coursesCompleted: 10,
            quizScore: 90,
            tradingDays: 30,
          },
          locked: true,
        },
      ],
    });

    // Community Stats (global data)
    await setDoc(doc(db, "communityStats", "global"), {
      totalUsers: 15847,
      activeUsers: 3645,
      coursesCompleted: 50704,
      totalAchievements: 91912,
      averageProgress: 34.2,
      topCountries: [
        { country: "United States", users: 4437 },
        { country: "United Kingdom", users: 2377 },
        { country: "Canada", users: 1902 },
        { country: "Germany", users: 1585 },
        { country: "Singapore", users: 1268 },
      ],
      lastUpdated: Date.now(),
    });

    // Demo content for testing
    await setDoc(doc(db, "demo", "sampleData"), {
      description: "Sample data for testing the platform",
      createdAt: Date.now(),
      features: [
        "User onboarding",
        "Progress tracking",
        "Achievement system",
        "Portfolio management",
        "Certification engine",
      ],
    });

    console.log("✅ Demo user 'demoUser' created successfully!");
    console.log("✅ Community stats populated!");
    console.log("✅ Sample data added!");
    console.log(
      "\n🎉 Seeding complete! You can now test the platform with the demo user.",
    );
    console.log("\nDemo User Credentials:");
    console.log("Email: demo@financialempire.app");
    console.log("Progress: 80% (Advanced level)");
    console.log("Features: All bots and features unlocked");
    console.log("Portfolio: $15,240 total value");
    console.log("Achievements: 6 earned, 875 points");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log("\n🏁 Seeding script completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seeding script failed:", error);
    process.exit(1);
  });
