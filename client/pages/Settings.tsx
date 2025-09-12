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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Palette,
  Bot,
  DollarSign,
  Globe,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Phone,
  Key,
  CreditCard,
  Zap,
  Target,
  Volume2,
  VolumeX,
  Activity,
} from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import SettingsDemo from "@/components/Settings/SettingsDemo";

const Settings = () => {
  const {
    notifications,
    trading: tradingSettings,
    appearance,
    updateNotifications,
    updateTrading,
    updateAppearance,
    resetToDefaults,
    exportSettings,
    importSettings,
  } = useSettings();
  const [activeTab, setActiveTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handleNotificationChange = (key: string, value: boolean) => {
    updateNotifications({ [key]: value } as any);
  };

  const handleTradingChange = (key: string, value: any) => {
    updateTrading({ [key]: value } as any);
  };

  const handleAppearanceChange = (key: string, value: any) => {
    updateAppearance({ [key]: value } as any);
  };

  const handleSaveSettings = () => {
    // Settings are automatically saved to localStorage through context
    console.log("All settings have been saved successfully!");
  };

  const handleExportData = () => {
    const settingsData = exportSettings();
    const blob = new Blob([settingsData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `financial-empire-settings-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    // Implementation for account deletion
    console.log("Account deletion requested...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-empire-navy-500 to-empire-navy-600 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-navy-400 to-empire-navy-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account preferences and trading configurations
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={handleSaveSettings}
              className="bg-empire-emerald-500 hover:bg-empire-emerald-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-muted/50">
              <TabsTrigger
                value="profile"
                className="flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center space-x-2"
              >
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className="flex items-center space-x-2"
              >
                <Bot className="w-4 h-4" />
                <span className="hidden sm:inline">Trading</span>
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="flex items-center space-x-2"
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger
                value="status"
                className="flex items-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Status</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Data</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and contact information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="utc-5">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utc-8">
                            Pacific Time (UTC-8)
                          </SelectItem>
                          <SelectItem value="utc-7">
                            Mountain Time (UTC-7)
                          </SelectItem>
                          <SelectItem value="utc-6">
                            Central Time (UTC-6)
                          </SelectItem>
                          <SelectItem value="utc-5">
                            Eastern Time (UTC-5)
                          </SelectItem>
                          <SelectItem value="utc+0">UTC+0</SelectItem>
                          <SelectItem value="utc+1">
                            Central European Time (UTC+1)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CreditCard className="w-5 h-5" />
                      <span>Account Details</span>
                    </CardTitle>
                    <CardDescription>
                      Account status and subscription information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Account Type</span>
                      <Badge className="bg-empire-gold-500/20 text-empire-gold-400">
                        Premium
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Member Since</span>
                      <span className="text-sm font-medium">January 2024</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Subscription Status</span>
                      <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Next Billing</span>
                      <span className="text-sm font-medium">Feb 15, 2024</span>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself..."
                        defaultValue="Professional trader with 5+ years experience in cryptocurrency and traditional markets."
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span>Authentication</span>
                    </CardTitle>
                    <CardDescription>
                      Manage your login security and authentication methods
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button className="w-full">
                      <Key className="w-4 h-4 mr-2" />
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Smartphone className="w-5 h-5" />
                      <span>Two-Factor Authentication</span>
                    </CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="2fa">Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">
                          Require a verification code from your phone
                        </p>
                      </div>
                      <Switch
                        id="2fa"
                        checked={twoFactorEnabled}
                        onCheckedChange={setTwoFactorEnabled}
                      />
                    </div>
                    {twoFactorEnabled && (
                      <div className="p-4 border border-empire-emerald-400/30 rounded-lg bg-empire-emerald-500/10">
                        <div className="flex items-center space-x-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                          <span className="font-medium text-sm">
                            2FA Enabled
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your account is protected with Google Authenticator
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View Backup Codes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="w-5 h-5" />
                      <span>API Access</span>
                    </CardTitle>
                    <CardDescription>
                      Manage API keys for third-party applications and trading
                      bots
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          defaultValue="fe_1234567890abcdef1234567890abcdef"
                          readOnly
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download Key
                      </Button>
                      <Button variant="outline">Regenerate Key</Button>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Key
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Choose how you want to receive updates and alerts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Delivery Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <Label htmlFor="email-notif">
                              Email Notifications
                            </Label>
                          </div>
                          <Switch
                            id="email-notif"
                            checked={notifications.email}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("email", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Smartphone className="w-4 h-4" />
                            <Label htmlFor="push-notif">
                              Push Notifications
                            </Label>
                          </div>
                          <Switch
                            id="push-notif"
                            checked={notifications.push}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("push", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4" />
                            <Label htmlFor="sms-notif">SMS Notifications</Label>
                          </div>
                          <Switch
                            id="sms-notif"
                            checked={notifications.sms}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("sms", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Notification Types</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4" />
                            <Label htmlFor="trading-notif">
                              Trading Alerts
                            </Label>
                          </div>
                          <Switch
                            id="trading-notif"
                            checked={notifications.trading}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("trading", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4" />
                            <Label htmlFor="news-notif">Market News</Label>
                          </div>
                          <Switch
                            id="news-notif"
                            checked={notifications.news}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("news", checked)
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4" />
                            <Label htmlFor="security-notif">
                              Security Alerts
                            </Label>
                          </div>
                          <Switch
                            id="security-notif"
                            checked={notifications.security}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("security", checked)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trading Settings */}
            <TabsContent value="trading" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5" />
                      <span>Automated Trading</span>
                    </CardTitle>
                    <CardDescription>
                      Configure your automated trading preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-trade">Enable Auto Trading</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow bots to execute trades automatically
                        </p>
                      </div>
                      <Switch
                        id="auto-trade"
                        checked={tradingSettings.autoTrade}
                        onCheckedChange={(checked) =>
                          handleTradingChange("autoTrade", checked)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="risk-level">Risk Level</Label>
                      <Select
                        value={tradingSettings.riskLevel}
                        onValueChange={(value) =>
                          handleTradingChange("riskLevel", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Conservative</SelectItem>
                          <SelectItem value="medium">Moderate</SelectItem>
                          <SelectItem value="high">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="max-loss">Max Daily Loss ($)</Label>
                      <Input
                        id="max-loss"
                        type="number"
                        value={tradingSettings.maxDailyLoss}
                        onChange={(e) =>
                          handleTradingChange("maxDailyLoss", e.target.value)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="w-5 h-5" />
                      <span>Trading Preferences</span>
                    </CardTitle>
                    <CardDescription>
                      Customize your trading interface and behavior
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="confirm-orders">Confirm Orders</Label>
                        <p className="text-sm text-muted-foreground">
                          Require confirmation for all trades
                        </p>
                      </div>
                      <Switch
                        id="confirm-orders"
                        checked={tradingSettings.confirmOrders}
                        onCheckedChange={(checked) =>
                          handleTradingChange("confirmOrders", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sound-alerts">Sound Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Play sounds for trading events
                        </p>
                      </div>
                      <Switch
                        id="sound-alerts"
                        checked={tradingSettings.soundAlerts}
                        onCheckedChange={(checked) =>
                          handleTradingChange("soundAlerts", checked)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="default-currency">Default Currency</Label>
                      <Select
                        value={tradingSettings.defaultCurrency}
                        onValueChange={(value) =>
                          handleTradingChange("defaultCurrency", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="btc">BTC (₿)</SelectItem>
                          <SelectItem value="eth">ETH (Ξ)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Settings */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="w-5 h-5" />
                    <span>Appearance & Theme</span>
                  </CardTitle>
                  <CardDescription>
                    Customize the look and feel of your trading interface
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Switch between light and dark themes
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <Switch
                        id="dark-mode"
                        checked={appearance.darkMode}
                        onCheckedChange={(checked) =>
                          handleAppearanceChange("darkMode", checked)
                        }
                      />
                      <Moon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <Label>Color Scheme</Label>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div
                        className={`p-3 border rounded-lg cursor-pointer ${
                          appearance.colorScheme === "empire-green"
                            ? "border-empire-emerald-400 bg-empire-emerald-500/10"
                            : "border-border hover:border-empire-emerald-400"
                        }`}
                        onClick={() =>
                          handleAppearanceChange("colorScheme", "empire-green")
                        }
                      >
                        <div className="w-full h-4 bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 rounded mb-2"></div>
                        <span className="text-xs font-medium">
                          Empire Green
                        </span>
                      </div>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer ${
                          appearance.colorScheme === "royal-gold"
                            ? "border-empire-gold-400 bg-empire-gold-500/10"
                            : "border-border hover:border-empire-gold-400"
                        }`}
                        onClick={() =>
                          handleAppearanceChange("colorScheme", "royal-gold")
                        }
                      >
                        <div className="w-full h-4 bg-gradient-to-r from-empire-gold-500 to-empire-gold-600 rounded mb-2"></div>
                        <span className="text-xs font-medium">Royal Gold</span>
                      </div>
                      <div
                        className={`p-3 border rounded-lg cursor-pointer ${
                          appearance.colorScheme === "navy-blue"
                            ? "border-empire-navy-400 bg-empire-navy-500/10"
                            : "border-border hover:border-empire-navy-400"
                        }`}
                        onClick={() =>
                          handleAppearanceChange("colorScheme", "navy-blue")
                        }
                      >
                        <div className="w-full h-4 bg-gradient-to-r from-empire-navy-500 to-empire-navy-600 rounded mb-2"></div>
                        <span className="text-xs font-medium">Navy Blue</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="chart-style">Chart Style</Label>
                    <Select
                      value={appearance.chartStyle}
                      onValueChange={(value) =>
                        handleAppearanceChange("chartStyle", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="candlestick">Candlestick</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="area">Area Chart</SelectItem>
                        <SelectItem value="ohlc">OHLC Bars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="font-size">Interface Font Size</Label>
                    <Select
                      value={appearance.fontSize}
                      onValueChange={(value) =>
                        handleAppearanceChange("fontSize", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Status */}
            <TabsContent value="status" className="space-y-6">
              <SettingsDemo />
            </TabsContent>

            {/* Data Management */}
            <TabsContent value="data" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Data Export</span>
                    </CardTitle>
                    <CardDescription>
                      Download your trading data and account information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      onClick={handleExportData}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export All Data
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Trading History
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Transaction Records
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Data will be exported in JSON format and sent to your
                      email
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur-sm border-red-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-400">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Danger Zone</span>
                    </CardTitle>
                    <CardDescription>
                      Irreversible actions that affect your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">
                        Clear Trading History
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        This will permanently delete all your trading records
                      </p>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear History
                      </Button>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Delete Account</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Permanently delete your account and all associated data
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="w-full">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
