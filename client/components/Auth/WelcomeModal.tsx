import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Mail,
  Smartphone,
  Fingerprint,
  Eye,
  EyeOff,
  Crown,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import TermsOfService from "../Legal/TermsOfService";
import PrivacyPolicy from "../Legal/PrivacyPolicy";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<
    "welcome" | "auth" | "2fa" | "touchid" | "complete"
  >("welcome");
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    newsletter: false,
    termsAccepted: false,
    privacyAccepted: false,
  });

  const [twoFACode, setTwoFACode] = useState("");
  const [twoFAMethod, setTwoFAMethod] = useState<"email" | "sms">("email");
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const { signup, login, verify2FA, enable2FA, enableTouchId } = useAuth();
  const { toast } = useToast();

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("welcome");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        newsletter: false,
        termsAccepted: false,
        privacyAccepted: false,
      });
    }
  }, [isOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (authMode === "signup") {
      if (!formData.name.trim()) {
        toast({
          title: "Name Required",
          description: "Please enter your full name",
          variant: "destructive",
        });
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return false;
      }
      if (!formData.termsAccepted || !formData.privacyAccepted) {
        toast({
          title: "Terms Required",
          description: "Please accept the terms and privacy policy",
          variant: "destructive",
        });
        return false;
      }
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleAuth = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      let success = false;

      if (authMode === "signup") {
        success = await signup(
          formData.name,
          formData.email,
          formData.password,
          { newsletter: formData.newsletter },
        );
      } else {
        success = await login(formData.email, formData.password);
      }

      if (success) {
        setStep("2fa");
        toast({
          title: "Success!",
          description: `Welcome to Financial Empire!`,
        });
      } else {
        toast({
          title: "Authentication Failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FA = async () => {
    if (!twoFACode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const verified = await verify2FA(twoFACode);
      if (verified) {
        await enable2FA(twoFAMethod);
        setStep("touchid");
        toast({
          title: "2FA Enabled",
          description: "Two-factor authentication has been enabled",
        });
      } else {
        toast({
          title: "Invalid Code",
          description: "Please check your code and try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTouchID = async () => {
    setIsLoading(true);
    try {
      const enabled = await enableTouchId();
      if (enabled) {
        toast({
          title: "Touch ID Enabled",
          description: "You can now use Touch/Face ID to login",
        });
      } else {
        toast({
          title: "Touch ID Not Available",
          description: "Your device doesn't support biometric authentication",
          variant: "destructive",
        });
      }
      setStep("complete");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to enable Touch ID",
        variant: "destructive",
      });
      setStep("complete");
    } finally {
      setIsLoading(false);
    }
  };

  const renderWelcomeStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-empire-gold-400 to-empire-gold-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Crown className="w-10 h-10 text-empire-navy-900" />
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-emerald-400 bg-clip-text text-transparent mb-4">
        Welcome to Financial Empire
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The ultimate trading education and platform experience. Build your
        financial empire with expert guidance and cutting-edge tools.
      </p>
      <Button
        onClick={() => setStep("auth")}
        className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600 hover:from-empire-emerald-600 hover:to-empire-emerald-700"
      >
        Get Started
      </Button>
    </motion.div>
  );

  const renderAuthStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="py-4"
    >
      <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>

        <TabsContent value="signup" className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              placeholder="Confirm your password"
            />
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) =>
                  handleInputChange("newsletter", !!checked)
                }
              />
              <Label htmlFor="newsletter" className="text-sm">
                Subscribe to newsletter and market updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  handleInputChange("termsAccepted", !!checked)
                }
              />
              <Label htmlFor="terms" className="text-sm">
                I accept the{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(true)}
                  className="text-empire-emerald-500 hover:underline"
                >
                  Terms of Service
                </button>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacy"
                checked={formData.privacyAccepted}
                onCheckedChange={(checked) =>
                  handleInputChange("privacyAccepted", !!checked)
                }
              />
              <Label htmlFor="privacy" className="text-sm">
                I accept the{" "}
                <button
                  type="button"
                  onClick={() => setShowPrivacy(true)}
                  className="text-empire-emerald-500 hover:underline"
                >
                  Privacy Policy
                </button>
              </Label>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="login" className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button
        onClick={handleAuth}
        disabled={isLoading}
        className="w-full mt-6 bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {authMode === "signup" ? "Create Account" : "Sign In"}
      </Button>
    </motion.div>
  );

  const render2FAStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-center py-6"
    >
      <Shield className="w-16 h-16 text-empire-emerald-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">
        Enable Two-Factor Authentication
      </h3>
      <p className="text-muted-foreground mb-6">
        Secure your account with an additional layer of protection
      </p>

      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={twoFAMethod === "email" ? "default" : "outline"}
          onClick={() => setTwoFAMethod("email")}
          className="flex items-center space-x-2"
        >
          <Mail className="w-4 h-4" />
          <span>Email</span>
        </Button>
        <Button
          variant={twoFAMethod === "sms" ? "default" : "outline"}
          onClick={() => setTwoFAMethod("sms")}
          className="flex items-center space-x-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>SMS</span>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="2fa-code">Enter verification code</Label>
          <Input
            id="2fa-code"
            value={twoFACode}
            onChange={(e) => setTwoFACode(e.target.value)}
            placeholder="000000"
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />
          <p className="text-xs text-muted-foreground">
            Try "123456" or "000000" for demo
          </p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => setStep("auth")}>
            Back
          </Button>
          <Button
            onClick={handle2FA}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Verify & Enable
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderTouchIDStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="text-center py-6"
    >
      <Fingerprint className="w-16 h-16 text-empire-gold-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Enable Touch/Face ID</h3>
      <p className="text-muted-foreground mb-6">
        Use biometric authentication for quick and secure access
      </p>

      <div className="flex space-x-3">
        <Button variant="outline" onClick={() => setStep("complete")}>
          Skip
        </Button>
        <Button
          onClick={handleTouchID}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-empire-gold-500 to-empire-gold-600"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
          Enable Touch ID
        </Button>
      </div>
    </motion.div>
  );

  const renderCompleteStep = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <CheckCircle className="w-16 h-16 text-empire-emerald-500 mx-auto mb-4" />
      <h3 className="text-2xl font-bold mb-2">Welcome Aboard!</h3>
      <p className="text-muted-foreground mb-6">
        Your Financial Empire account is ready. Start building your trading
        empire today!
      </p>

      <Button
        onClick={onClose}
        className="bg-gradient-to-r from-empire-emerald-500 to-empire-emerald-600"
      >
        Continue to Dashboard
      </Button>
    </motion.div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <VisuallyHidden>
            <DialogTitle>Welcome to Financial Empire</DialogTitle>
          </VisuallyHidden>
          <AnimatePresence mode="wait">
            {step === "welcome" && renderWelcomeStep()}
            {step === "auth" && renderAuthStep()}
            {step === "2fa" && render2FAStep()}
            {step === "touchid" && renderTouchIDStep()}
            {step === "complete" && renderCompleteStep()}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <TermsOfService
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        onAccept={() => {
          setShowTerms(false);
          handleInputChange("termsAccepted", true);
        }}
      />

      <PrivacyPolicy
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        onAccept={() => {
          setShowPrivacy(false);
          handleInputChange("privacyAccepted", true);
        }}
      />
    </>
  );
};

export default WelcomeModal;
