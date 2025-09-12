import React, { useState, useEffect } from "react";
import WelcomeModal from "./WelcomeModal";
import { useAuth } from "@/contexts/AuthContext";

const FirstVisitHandler: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Only check for first visit after auth context has loaded
    if (!isLoading) {
      const hasVisitedBefore = localStorage.getItem("financial-empire-visited");

      // Show welcome modal if:
      // 1. User hasn't visited before
      // 2. User is not authenticated
      if (!hasVisitedBefore && !isAuthenticated) {
        setShowWelcome(true);
      }
    }
  }, [isLoading, isAuthenticated]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    // Mark as visited regardless of whether they completed signup
    localStorage.setItem("financial-empire-visited", "true");
  };

  return <WelcomeModal isOpen={showWelcome} onClose={handleWelcomeClose} />;
};

export default FirstVisitHandler;
