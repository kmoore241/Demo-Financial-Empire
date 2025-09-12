import React, { createContext, useContext, useState, useEffect } from "react";
import {
  initializeNewUser,
  loadUserData,
  updateUserProgress,
} from "@/lib/initializeNewUser";

interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  twoFactorEnabled: boolean;
  touchIdEnabled: boolean;
  joinDate: string;
  avatar?: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    darkMode: boolean;
  };
  progress?: {
    percent: number;
    coursesCompleted: number;
    quizzesCompleted: number;
    manualBotUnlocked: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    name: string,
    email: string,
    password: string,
    preferences?: Partial<User["preferences"]>,
  ) => Promise<boolean>;
  logout: () => void;
  verify2FA: (code: string) => Promise<boolean>;
  enable2FA: (method: "email" | "sms") => Promise<string>;
  enableTouchId: () => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const initAuth = async () => {
      const savedUser = localStorage.getItem("financial-empire-user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);

          // Load additional user data if available
          const fullUserData = await loadUserData(userData.id);
          if (fullUserData) {
            const enhancedUser = {
              ...userData,
              progress: {
                percent: fullUserData.progress?.percent || 0,
                coursesCompleted: fullUserData.progress?.coursesCompleted || 0,
                quizzesCompleted: fullUserData.progress?.quizzesCompleted || 0,
                manualBotUnlocked:
                  fullUserData.portfolio?.manualBotUnlocked || false,
              },
            };
            setUser(enhancedUser);
          } else {
            setUser(userData);
          }
        } catch (error) {
          localStorage.removeItem("financial-empire-user");
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (email && password.length >= 6) {
        const userId = `user_${Date.now()}`;

        // Initialize user data
        await initializeNewUser(userId, email, email.split("@")[0]);

        const mockUser: User = {
          id: userId,
          name: email.split("@")[0],
          email,
          verified: true,
          twoFactorEnabled: false,
          touchIdEnabled: false,
          joinDate: new Date().toISOString(),
          preferences: {
            newsletter: false,
            notifications: true,
            darkMode: false,
          },
          progress: {
            percent: 25,
            coursesCompleted: 2,
            quizzesCompleted: 1,
            manualBotUnlocked: false,
          },
        };

        setUser(mockUser);
        localStorage.setItem("financial-empire-user", JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    preferences?: Partial<User["preferences"]>,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (name && email && password.length >= 6) {
        const userId = `user_${Date.now()}`;

        // Initialize user data
        await initializeNewUser(userId, email, name);

        const newUser: User = {
          id: userId,
          name,
          email,
          verified: false,
          twoFactorEnabled: false,
          touchIdEnabled: false,
          joinDate: new Date().toISOString(),
          preferences: {
            newsletter: false,
            notifications: true,
            darkMode: false,
            ...preferences,
          },
          progress: {
            percent: 0,
            coursesCompleted: 0,
            quizzesCompleted: 0,
            manualBotUnlocked: false,
          },
        };

        setUser(newUser);
        localStorage.setItem("financial-empire-user", JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("financial-empire-user");
  };

  const refreshUserData = async () => {
    if (user) {
      const userData = await loadUserData(user.id);
      if (userData) {
        const updatedUser = {
          ...user,
          progress: {
            percent: userData.progress?.percent || 0,
            coursesCompleted: userData.progress?.coursesCompleted || 0,
            quizzesCompleted: userData.progress?.quizzesCompleted || 0,
            manualBotUnlocked: userData.portfolio?.manualBotUnlocked || false,
          },
        };
        setUser(updatedUser);
        localStorage.setItem(
          "financial-empire-user",
          JSON.stringify(updatedUser),
        );
      }
    }
  };

  const verify2FA = async (code: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return code === "123456" || code === "000000";
  };

  const enable2FA = async (method: "email" | "sms"): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (user) {
      const updatedUser = { ...user, twoFactorEnabled: true };
      setUser(updatedUser);
      localStorage.setItem(
        "financial-empire-user",
        JSON.stringify(updatedUser),
      );
    }

    return "BACKUP-CODE-123456,BACKUP-CODE-789012";
  };

  const enableTouchId = async (): Promise<boolean> => {
    try {
      if (
        !window.PublicKeyCredential ||
        !navigator.credentials ||
        !navigator.credentials.create
      ) {
        return false;
      }

      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: {
            name: "Financial Empire",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(user?.id || ""),
            name: user?.email || "",
            displayName: user?.name || "",
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "direct",
        },
      });

      if (credential && user) {
        const updatedUser = { ...user, touchIdEnabled: true };
        setUser(updatedUser);
        localStorage.setItem(
          "financial-empire-user",
          JSON.stringify(updatedUser),
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("TouchID enrollment error:", error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(
        "financial-empire-user",
        JSON.stringify(updatedUser),
      );

      // Update progress in user data store if progress is being updated
      if (updates.progress && user.id) {
        await updateUserProgress(user.id, updates.progress);
      }

      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error("Password reset error:", error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    verify2FA,
    enable2FA,
    enableTouchId,
    updateProfile,
    resetPassword,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
