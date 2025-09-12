import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Volume2,
  VolumeX,
  Palette,
  Moon,
  Sun,
  DollarSign,
  Shield,
  Bell,
} from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";

export const SettingsDemo: React.FC = () => {
  const { notifications, trading, appearance, updateAppearance } =
    useSettings();

  const toggleDarkMode = () => {
    updateAppearance({ darkMode: !appearance.darkMode });
  };

  const cycleColorScheme = () => {
    const schemes = ["empire-green", "royal-gold", "navy-blue"] as const;
    const currentIndex = schemes.indexOf(appearance.colorScheme);
    const nextIndex = (currentIndex + 1) % schemes.length;
    updateAppearance({ colorScheme: schemes[nextIndex] });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>Settings Status Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Appearance Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Appearance</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <Badge
                  variant={appearance.darkMode ? "default" : "outline"}
                  className="flex items-center space-x-1"
                >
                  {appearance.darkMode ? (
                    <Moon className="w-3 h-3" />
                  ) : (
                    <Sun className="w-3 h-3" />
                  )}
                  <span>{appearance.darkMode ? "Dark" : "Light"}</span>
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={toggleDarkMode}
                className="w-full"
              >
                Toggle Theme
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Color Scheme</span>
                <Badge variant="outline" className="capitalize">
                  {appearance.colorScheme.replace("-", " ")}
                </Badge>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={cycleColorScheme}
                className="w-full"
              >
                Change Colors
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Font Size</span>
            <Badge variant="outline" className="capitalize">
              {appearance.fontSize.replace("-", " ")}
            </Badge>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(notifications).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-2 bg-muted rounded"
              >
                <span className="text-sm capitalize">{key}</span>
                <Badge
                  variant={value ? "default" : "outline"}
                  className="text-xs"
                >
                  {value ? "On" : "Off"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Trading Settings */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>Trading</span>
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto Trading</span>
              <Badge
                variant={trading.autoTrade ? "default" : "outline"}
                className="flex items-center space-x-1"
              >
                <Shield className="w-3 h-3" />
                <span>{trading.autoTrade ? "Enabled" : "Disabled"}</span>
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Sound Alerts</span>
              <Badge
                variant={trading.soundAlerts ? "default" : "outline"}
                className="flex items-center space-x-1"
              >
                {trading.soundAlerts ? (
                  <Volume2 className="w-3 h-3" />
                ) : (
                  <VolumeX className="w-3 h-3" />
                )}
                <span>{trading.soundAlerts ? "On" : "Off"}</span>
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Risk Level</span>
              <Badge
                variant="outline"
                className={`capitalize ${
                  trading.riskLevel === "high"
                    ? "text-red-400"
                    : trading.riskLevel === "medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                }`}
              >
                {trading.riskLevel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Daily Loss</span>
              <Badge variant="outline">${trading.maxDailyLoss}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Default Currency</span>
              <Badge variant="outline" className="uppercase">
                {trading.defaultCurrency}
              </Badge>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              All settings are active and synchronized across the application
            </span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Changes are automatically saved to local storage and applied
            immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsDemo;
