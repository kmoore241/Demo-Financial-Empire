// 🧩 USER ONBOARDING: Fallback implementation
// This provides the same interface but uses localStorage for demo

export async function initializeNewUser(uid, userEmail = "", userName = "") {
  if (!uid) {
    console.log("No UID provided, skipping initialization");
    return false;
  }

  try {
    // Check if user already exists in localStorage
    const existingUser = localStorage.getItem(`user_${uid}`);
    if (existingUser) {
      console.log("User already initialized");
      return true;
    }

    // Initialize user data in localStorage
    const userData = {
      account: {
        name: userName || "Financial Empire Trader",
        email: userEmail,
        createdAt: Date.now(),
        lastLogin: Date.now(),
        preferences: {
          darkMode: false,
          notifications: true,
          music: true,
          colorScheme: "empire-green",
          fontSize: "medium",
        },
      },
      progress: {
        percent: 0,
        quizzesCompleted: 0,
        coursesCompleted: 0,
        lastLesson: null,
        totalTimeSpent: 0,
        academyUnlocked: true,
        currentLevel: "beginner",
        streakDays: 0,
        lastStudyDate: null,
      },
      portfolio: {
        balance: 5000,
        totalValue: 5000,
        manualBotUnlocked: false,
        aggressiveBotUnlocked: false,
        plannerUnlocked: false,
        positions: [],
        tradingHistory: [],
        achievements: [],
        riskLevel: "medium",
        monthlyReturn: 0,
        totalReturn: 0,
      },
      achievements: {
        earned: [
          {
            id: "first_login",
            title: "Welcome to Financial Empire",
            description: "Signed up and joined the community",
            points: 100,
            category: "milestone",
            unlockedAt: Date.now(),
          },
        ],
        available: [
          {
            id: "academy_start",
            title: "Learning Journey Begins",
            description: "Started your first lesson",
            points: 50,
            category: "education",
            locked: true,
          },
          {
            id: "manual_bot_unlock",
            title: "Bot Commander",
            description: "Unlocked the Manual Trading Bot",
            points: 200,
            category: "trading",
            locked: true,
          },
        ],
        totalPoints: 100,
      },
    };

    localStorage.setItem(`user_${uid}`, JSON.stringify(userData));
    console.log("User initialized successfully in localStorage");
    return true;
  } catch (error) {
    console.error("Error initializing user:", error);
    return false;
  }
}

export async function loadUserData(uid) {
  if (!uid) {
    return null;
  }

  try {
    const userData = localStorage.getItem(`user_${uid}`);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error loading user data:", error);
    return null;
  }
}

export async function updateUserProgress(uid, progressUpdate) {
  if (!uid) {
    return false;
  }

  try {
    const existingData = await loadUserData(uid);
    if (!existingData) return false;

    const newProgress = {
      ...existingData.progress,
      ...progressUpdate,
      lastUpdated: Date.now(),
    };

    // Check for unlocks based on progress
    if (
      newProgress.percent >= 50 &&
      !existingData.portfolio.manualBotUnlocked
    ) {
      existingData.portfolio.manualBotUnlocked = true;

      // Award achievement
      const newAchievement = {
        id: "manual_bot_unlock",
        title: "Bot Commander",
        unlockedAt: Date.now(),
        points: 200,
      };

      existingData.achievements.earned.push(newAchievement);
      existingData.achievements.totalPoints += 200;
    }

    existingData.progress = newProgress;
    localStorage.setItem(`user_${uid}`, JSON.stringify(existingData));
    return true;
  } catch (error) {
    console.error("Error updating user progress:", error);
    return false;
  }
}
