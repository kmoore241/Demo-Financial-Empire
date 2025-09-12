import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Wallet,
  Send,
  Download,
  History,
  Shield,
  Copy,
  QrCode,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const WalletUI = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedWalletData, setSelectedWalletData] = useState<any>(null);
  const [loginStep, setLoginStep] = useState<
    "wallet" | "auth" | "security" | "embedded"
  >("wallet");
  const [showEmbeddedWallet, setShowEmbeddedWallet] = useState(false);

  const walletTypes = [
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using MetaMask browser extension",
      popular: true,
      url: "https://metamask.io/",
      embedded: "https://metamask.io/",
      connector: "injected",
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      description: "Scan with WalletConnect to connect",
      popular: false,
      url: "https://walletconnect.com/",
      embedded: "https://cloud.walletconnect.com/",
      connector: "walletconnect",
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Connect with Coinbase Wallet",
      popular: true,
      url: "https://www.coinbase.com/wallet",
      embedded: "https://www.coinbase.com/wallet",
      connector: "coinbase",
    },
    {
      name: "Trust Wallet",
      icon: "🛡️",
      description: "Connect with Trust Wallet mobile app",
      popular: true,
      url: "https://trustwallet.com/",
      embedded: "https://trustwallet.com/",
      connector: "trust",
    },
    {
      name: "Phantom",
      icon: "👻",
      description: "Connect with Phantom Solana wallet",
      popular: false,
      url: "https://phantom.app/",
      embedded: "https://phantom.app/",
      connector: "phantom",
    },
    {
      name: "Ledger",
      icon: "📱",
      description: "Connect your Ledger hardware wallet",
      popular: false,
      url: "https://www.ledger.com/ledger-live",
      embedded: "https://www.ledger.com/ledger-live",
      connector: "ledger",
    },
    {
      name: "Fidelity",
      icon: "🏛️",
      description: "Connect your Fidelity investment account",
      popular: true,
      url: "https://www.fidelity.com/",
      embedded: "https://digital.fidelity.com/",
      connector: "fidelity",
    },
    {
      name: "Robinhood",
      icon: "🏹",
      description: "Connect your Robinhood trading account",
      popular: true,
      url: "https://robinhood.com/",
      embedded: "https://robinhood.com/",
      connector: "robinhood",
    },
    {
      name: "Kraken",
      icon: "🐙",
      description: "Connect your Kraken exchange account",
      popular: true,
      url: "https://www.kraken.com/",
      embedded: "https://pro.kraken.com/",
      connector: "kraken",
    },
    {
      name: "MooMoo",
      icon: "🐄",
      description: "Connect your MooMoo trading platform",
      popular: false,
      url: "https://www.moomoo.com/",
      embedded: "https://www.moomoo.com/",
      connector: "moomoo",
    },
    {
      name: "Interactive Brokers",
      icon: "🏢",
      description: "Connect your IBKR professional account",
      popular: false,
      url: "https://www.interactivebrokers.com/",
      embedded: "https://www.interactivebrokers.com/",
      connector: "ibkr",
    },
  ];

  const portfolioAssets = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: "0.5842",
      value: "$67,886.42",
      change: "+2.99%",
      positive: true,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: "8.239",
      value: "$21,833.14",
      change: "+6.29%",
      positive: true,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: "5,420.18",
      value: "$5,420.18",
      change: "0.00%",
      positive: true,
    },
    {
      symbol: "ADA",
      name: "Cardano",
      balance: "2,450.00",
      value: "$1,180.90",
      change: "-4.63%",
      positive: false,
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "received",
      asset: "BTC",
      amount: "0.1",
      value: "$4,285.32",
      time: "2 hours ago",
      status: "confirmed",
    },
    {
      id: 2,
      type: "sent",
      asset: "ETH",
      amount: "2.5",
      value: "$6,625.30",
      time: "1 day ago",
      status: "confirmed",
    },
    {
      id: 3,
      type: "received",
      asset: "USDC",
      amount: "1,000",
      value: "$1,000.00",
      time: "3 days ago",
      status: "confirmed",
    },
  ];

  const handleWalletConnect = async (walletName: string) => {
    const walletData = walletTypes.find((w) => w.name === walletName);
    setSelectedWallet(walletName);
    setSelectedWalletData(walletData);
    setIsConnecting(true);

    // Check if wallet is available (for browser extensions)
    if (walletData?.connector === "injected" && typeof window !== "undefined") {
      // Try to connect with MetaMask or other injected wallets
      try {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
          setLoginStep("auth");
          // Simulate real wallet connection
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
            setIsConnecting(false);
            setLoginStep("wallet");
            return;
          }
        }
      } catch (error) {
        console.log("MetaMask not available, showing embedded interface");
      }
    }

    // For other wallets or if injection failed, show embedded interface
    setLoginStep("embedded");
    setShowEmbeddedWallet(true);

    // Simulate connection process after user interacts with embedded interface
    setTimeout(() => {
      setLoginStep("auth");
      setTimeout(() => {
        setLoginStep("security");
        setTimeout(() => {
          setIsConnected(true);
          setIsConnecting(false);
          setWalletAddress("0x742d35Cc6535C0532925a3b8D2C4e91c89F2f23B");
          setLoginStep("wallet");
          setShowEmbeddedWallet(false);
        }, 1000);
      }, 1500);
    }, 3000);
  };

  const totalValue = portfolioAssets.reduce(
    (sum, asset) =>
      sum + parseFloat(asset.value.replace("$", "").replace(",", "")),
    0,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
              Secure Wallet
            </h1>
            <p className="text-muted-foreground">
              Multi-layer security for your digital assets
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <>
              <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-empire-emerald-500 hover:bg-empire-emerald-600">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Wallet className="w-5 h-5" />
                    <span>
                      {loginStep === "wallet"
                        ? "Connect Wallet"
                        : loginStep === "auth"
                          ? "Authenticating..."
                          : "Security Check"}
                    </span>
                  </DialogTitle>
                  <DialogDescription>
                    {loginStep === "wallet"
                      ? "Choose your preferred wallet to connect to Financial Empire"
                      : loginStep === "auth"
                        ? `Connecting to ${selectedWallet}...`
                        : "Verifying security credentials"}
                  </DialogDescription>
                </DialogHeader>

                {loginStep === "wallet" && (
                  <div className="space-y-3">
                    {walletTypes.map((wallet) => (
                      <Button
                        key={wallet.name}
                        variant="outline"
                        className="w-full justify-start h-auto p-4"
                        onClick={() => handleWalletConnect(wallet.name)}
                        disabled={isConnecting}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{wallet.icon}</span>
                          <div className="text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{wallet.name}</span>
                              {wallet.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {wallet.description}
                            </p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}

                {loginStep === "auth" && (
                  <div className="space-y-4 text-center py-8">
                    <div className="w-16 h-16 bg-empire-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                      <div className="w-6 h-6 border-2 border-empire-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Connecting to {selectedWallet}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Please authorize the connection in your wallet
                      </p>
                    </div>
                  </div>
                )}

                {loginStep === "embedded" && selectedWalletData && (
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      <h3 className="font-medium mb-2">
                        Connect with {selectedWallet}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Follow the instructions in the wallet interface below
                      </p>
                    </div>
                    <div className="border border-border rounded-lg overflow-hidden bg-muted/20">
                      <div className="bg-muted/50 px-3 py-2 border-b border-border flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {selectedWalletData.url}
                        </span>
                      </div>
                      <iframe
                        src={selectedWalletData.embedded}
                        className="w-full h-64 border-0"
                        title={`${selectedWallet} Connection`}
                        sandbox="allow-scripts allow-same-origin allow-forms"
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            selectedWalletData.url,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                      >
                        Open {selectedWallet} App
                      </Button>
                    </div>
                  </div>
                )}

                {loginStep === "security" && (
                  <div className="space-y-4 text-center py-8">
                    <div className="w-16 h-16 bg-empire-gold-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Shield className="w-8 h-8 text-empire-gold-400" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">
                        Security Verification
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Verifying your wallet and setting up secure
                        connection...
                      </p>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-empire-gold-400 h-2 rounded-full animate-pulse"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </motion.div>

      {!isConnected ? (
        /* Wallet Connection State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm max-w-md w-full">
            <CardContent className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-empire-emerald-500/20 to-empire-emerald-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="w-8 h-8 text-empire-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Connect Your Wallet
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to access secure trading, portfolio
                management, and transaction history.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-empire-emerald-500 hover:bg-empire-emerald-600">
                    <Wallet className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                    <DialogDescription>
                      Choose your preferred wallet to connect
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {walletTypes.map((wallet) => (
                      <Button
                        key={wallet.name}
                        variant="outline"
                        className="w-full justify-start h-auto p-4 hover:bg-muted/50 transition-colors"
                        onClick={() => handleWalletConnect(wallet.name)}
                        disabled={isConnecting}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{wallet.icon}</span>
                          <div className="text-left flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{wallet.name}</span>
                              {wallet.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {wallet.description}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {wallet.connector === "injected"
                              ? "Browser"
                              : wallet.connector === "walletconnect"
                                ? "QR Code"
                                : wallet.connector === "ledger"
                                  ? "Hardware"
                                  : "Mobile"}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Connected Wallet State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Portfolio Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Balance Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Portfolio Overview</span>
                  <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                    +12.8%
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Total value of your digital assets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${totalValue.toLocaleString()}
                </div>
                <p className="text-sm text-empire-emerald-400">
                  +$6,847.23 (12.8%) this month
                </p>
              </CardContent>
            </Card>

            {/* Assets List */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Assets</CardTitle>
                <CardDescription>Your cryptocurrency portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioAssets.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-empire-emerald-500/20 to-empire-emerald-600/20 rounded-full flex items-center justify-center">
                          <span className="font-bold text-sm">
                            {asset.symbol}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {asset.balance} {asset.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{asset.value}</div>
                        <div
                          className={`text-sm ${
                            asset.positive
                              ? "text-empire-emerald-400"
                              : "text-red-400"
                          }`}
                        >
                          {asset.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Recent Transactions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === "received"
                              ? "bg-empire-emerald-500/20"
                              : "bg-red-500/20"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="w-4 h-4 text-empire-emerald-400" />
                          ) : (
                            <ArrowUpRight className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">
                            {tx.type === "received" ? "Received" : "Sent"}{" "}
                            {tx.asset}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tx.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {tx.type === "received" ? "+" : "-"}
                          {tx.amount} {tx.asset}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tx.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-empire-emerald-500 hover:bg-empire-emerald-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-empire-emerald-400/50 hover:bg-empire-emerald-500/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receive
                </Button>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Buy Crypto
                </Button>
              </CardContent>
            </Card>

            {/* Wallet Details */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Wallet Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Wallet Address</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input
                      value={`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Network</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                      Ethereum Mainnet
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Wallet Type</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm">{selectedWallet}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-empire-gold-400" />
                  <span>Security</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hardware Wallet</span>
                  <Badge variant="secondary">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Recommended
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Backup Created</span>
                  <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Yes
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WalletUI;
