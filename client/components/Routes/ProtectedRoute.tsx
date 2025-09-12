import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AccessGate from "@/components/Access/AccessGate";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredProgress?: number;
  requiredCourses?: number;
  requiredQuizzes?: number;
  feature?: string;
  fallbackPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requiredProgress = 0,
  requiredCourses = 0,
  requiredQuizzes = 0,
  feature,
  fallbackPath,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-empire-emerald-500/20 to-empire-gold-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-empire-emerald-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-muted-foreground">Loading Financial Empire...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If no progress requirements, just render children
  if (
    requiredProgress === 0 &&
    requiredCourses === 0 &&
    requiredQuizzes === 0
  ) {
    return <>{children}</>;
  }

  // Use AccessGate for progress-gated features
  return (
    <AccessGate
      feature={feature || "this feature"}
      requiredProgress={requiredProgress}
      requiredCourses={requiredCourses}
      requiredQuizzes={requiredQuizzes}
      unlockPath={fallbackPath || "/academy"}
    >
      {children}
    </AccessGate>
  );
};

export default ProtectedRoute;
