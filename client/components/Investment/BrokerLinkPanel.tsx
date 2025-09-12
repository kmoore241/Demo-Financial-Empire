import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Link as LinkIcon,
  ExternalLink,
  Shield,
  CheckCircle,
  AlertCircle,
  Loader2,
  Building,
  DollarSign,
  TrendingUp,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BrokerPlatform {
  id: string;
  name: string;
  description: string;
  type: "traditional" | "crypto" | "robo" | "international";
  features: string[];
  fees: string;
  minimumDeposit: string;
  logo?: string;
  website: string;
  isConnected: boolean;
  connectionStatus: "connected" | "pending" | "error" | "disconnected";
  lastSync?: string;
  accountValue?: number;
}

export default function BrokerLinkPanel() {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<BrokerPlatform[]>([
    {
      id: "fidelity",
      name: "Fidelity",
      description: "Full-service brokerage with extensive research tools",
      type: "traditional",
      features: ["$0 Stock Trades", "Research Tools", "Mutual Funds", "IRAs"],
      fees: "No account fees",
      minimumDeposit: "$0",
      website: "https://www.fidelity.com",
      isConnected: true,
      connectionStatus: "connected",
      lastSync: "2 hours ago",
      accountValue: 45230.75,
    },
    {
      id: "robinhood",
      name: "Robinhood",
      description: "Commission-free trading with user-friendly mobile app",
      type: "traditional",
      features: ["$0 Trades", "Fractional Shares", "Crypto", "Mobile First"],
      fees: "No commission fees",
      minimumDeposit: "$0",
      website: "https://www.robinhood.com",
      isConnected: false,
      connectionStatus: "disconnected",
    },
    {
      id: "coinbase",
      name: "Coinbase",
      description: "Leading cryptocurrency exchange platform",
      type: "crypto",
      features: ["Crypto Trading", "Staking", "DeFi", "NFTs"],
      fees: "Variable trading fees",
      minimumDeposit: "$2",
      website: "https://www.coinbase.com",
      isConnected: true,
      connectionStatus: "connected",
      lastSync: "1 hour ago",
      accountValue: 12847.32,
    },
    {
      id: "kraken",
      name: "Kraken",
      description: "Professional cryptocurrency trading platform",
      type: "crypto",
      features: ["Advanced Trading", "Futures", "Margin", "Staking"],
      fees: "0.16% - 0.26% trading fees",
      minimumDeposit: "$1",
      website: "https://www.kraken.com",
      isConnected: false,
      connectionStatus: "disconnected",
    },
    {
      id: "moomoo",
      name: "MooMoo",
      description: "Advanced trading platform with professional tools",
      type: "traditional",
      features: ["Advanced Charts", "Options", "Free Data", "Paper Trading"],
      fees: "$0 stock trades",
      minimumDeposit: "$0",
      website: "https://www.moomoo.com",
      isConnected: false,
      connectionStatus: "pending",
    },
    {
      id: "interactive_brokers",
      name: "Interactive Brokers",
      description: "Professional trading platform with global access",
      type: "international",
      features: ["Global Markets", "Low Costs", "Advanced Tools", "Algorithms"],
      fees: "IBKR Lite: $0 stocks",
      minimumDeposit: "$0",
      website: "https://www.interactivebrokers.com",
      isConnected: false,
      connectionStatus: "disconnected",
    },
  ]);

  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(
    null,
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "traditional":
        return <Building className="w-4 h-4" />;
      case "crypto":
        return <DollarSign className="w-4 h-4" />;
      case "robo":
        return <TrendingUp className="w-4 h-4" />;
      case "international":
        return <Globe className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "error":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case "error":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <LinkIcon className="w-4 h-4" />;
    }
  };

  const handleConnect = async (platformId: string) => {
    setConnectingPlatform(platformId);

    try {
      // Simulate API connection process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPlatforms((prev) =>
        prev.map((platform) =>
          platform.id === platformId
            ? {
                ...platform,
                isConnected: true,
                connectionStatus: "connected" as const,
                lastSync: "Just now",
                accountValue: Math.random() * 50000 + 10000,
              }
            : platform,
        ),
      );

      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${platforms.find((p) => p.id === platformId)?.name}`,
      });
    } catch (error) {
      setPlatforms((prev) =>
        prev.map((platform) =>
          platform.id === platformId
            ? { ...platform, connectionStatus: "error" as const }
            : platform,
        ),
      );

      toast({
        title: "Connection Failed",
        description: "Failed to connect to the platform. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? {
              ...platform,
              isConnected: false,
              connectionStatus: "disconnected" as const,
              lastSync: undefined,
              accountValue: undefined,
            }
          : platform,
      ),
    );

    toast({
      title: "Disconnected",
      description: `Disconnected from ${platforms.find((p) => p.id === platformId)?.name}`,
    });
  };

  const connectedPlatforms = platforms.filter((p) => p.isConnected);
  const totalAccountValue = connectedPlatforms.reduce(
    (sum, platform) => sum + (platform.accountValue || 0),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      {connectedPlatforms.length > 0 && (
        <Card className="bg-gradient-to-br from-empire-emerald-500/10 to-empire-emerald-600/5 border-empire-emerald-500/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Connected Accounts</span>
              <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                {connectedPlatforms.length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-empire-emerald-400">
                  $
                  {totalAccountValue.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </p>
                <p className="text-sm text-muted-foreground">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">
                  {connectedPlatforms.length}
                </p>
                <p className="text-sm text-muted-foreground">Platforms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(Math.random() * 10 + 5)}%
                </p>
                <p className="text-sm text-muted-foreground">Avg. Return</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Broker Platforms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LinkIcon className="w-5 h-5" />
            <span>Link Your Brokerage Accounts</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Connect your investment accounts to track your portfolio in one
            place
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {platforms.map((platform) => (
              <motion.div
                key={platform.id}
                layout
                className="border rounded-lg p-4 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-empire-emerald-500/20 to-empire-emerald-600/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(platform.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{platform.name}</h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {platform.type}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(platform.connectionStatus)}>
                    {getStatusIcon(platform.connectionStatus)}
                    <span className="ml-1 capitalize">
                      {platform.connectionStatus}
                    </span>
                  </Badge>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {platform.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {platform.features.slice(0, 3).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Account Value */}
                {platform.isConnected && platform.accountValue && (
                  <div className="bg-muted p-3 rounded mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Account Value</span>
                      <span className="font-bold text-empire-emerald-400">
                        ${platform.accountValue.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last sync: {platform.lastSync}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  {platform.isConnected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDisconnect(platform.id)}
                        className="flex-1"
                      >
                        Disconnect
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            platform.website,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleConnect(platform.id)}
                        disabled={connectingPlatform === platform.id}
                        className="flex-1 bg-empire-emerald-500 hover:bg-empire-emerald-600"
                        size="sm"
                      >
                        {connectingPlatform === platform.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <LinkIcon className="w-4 h-4 mr-2" />
                        )}
                        Connect
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            platform.website,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Connection Details */}
                <div className="mt-3 pt-3 border-t">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Fees: </span>
                      <span>{platform.fees}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Min: </span>
                      <span>{platform.minimumDeposit}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-empire-gold-500/20 bg-empire-gold-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-empire-gold-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-empire-gold-400">
                Security & Privacy
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                All connections use bank-level security with read-only access.
                We never store your login credentials and use OAuth 2.0 for
                secure authentication.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
