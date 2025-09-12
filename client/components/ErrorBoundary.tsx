import React, { Component, ReactNode } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Bug,
  Crown,
  Shield,
} from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // In production, you would send this to your error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full"
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <Shield className="absolute -top-1 -right-1 w-6 h-6 text-empire-emerald-400" />
                  </motion.div>
                </div>
                <CardTitle className="text-2xl font-bold mb-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Crown className="w-6 h-6 text-empire-gold-400" />
                    <span>Empire Encountered an Error</span>
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">
                  Don't worry, our empire's defenses are strong. This is a
                  temporary setback.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-red-500/10 border border-red-400/30 rounded-lg p-4"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Bug className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">
                        Development Error Details
                      </span>
                    </div>
                    <details className="text-xs text-red-300">
                      <summary className="cursor-pointer font-medium mb-2">
                        {this.state.error.name}: {this.state.error.message}
                      </summary>
                      <pre className="whitespace-pre-wrap overflow-x-auto bg-red-900/20 p-2 rounded">
                        {this.state.error.stack}
                      </pre>
                      {this.state.errorInfo && (
                        <pre className="whitespace-pre-wrap overflow-x-auto bg-red-900/20 p-2 rounded mt-2">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      )}
                    </details>
                  </motion.div>
                )}

                <div className="bg-empire-emerald-500/10 border border-empire-emerald-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-empire-emerald-400 mb-2">
                    What happened?
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    A component in the Financial Empire platform encountered an
                    unexpected error. Our error reporting system has been
                    notified and our engineering team will investigate.
                  </p>
                </div>

                <div className="bg-empire-gold-500/10 border border-empire-gold-400/30 rounded-lg p-4">
                  <h4 className="font-semibold text-empire-gold-400 mb-2">
                    What can you do?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Try refreshing the page</li>
                    <li>Clear your browser cache</li>
                    <li>Return to the homepage and navigate again</li>
                    <li>If the problem persists, contact our support team</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1 bg-empire-emerald-500 hover:bg-empire-emerald-600"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={this.handleReload}
                    variant="outline"
                    className="flex-1 border-empire-gold-400 text-empire-gold-400 hover:bg-empire-gold-400/10"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Page
                  </Button>
                  <Button
                    onClick={() => (window.location.href = "/")}
                    variant="outline"
                    className="flex-1"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                  </Button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                  Error ID: {Date.now().toString(36).toUpperCase()} •{" "}
                  {new Date().toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
