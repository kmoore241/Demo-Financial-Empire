import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  Eye,
  EyeOff,
  Crown,
  Mail,
  Lock,
  User,
  ArrowRight,
  Chrome,
  Github,
  Smartphone,
  CheckCircle,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    riskTolerance: "",
    tradingGoals: [] as string[],
    agreeToTerms: false,
    subscribeNewsletter: true,
  });

  const totalSteps = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsLoading(true);
    // Simulate registration process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Redirect to onboarding or dashboard
    window.location.href = "/dashboard";
  };

  const handleInputChange = (
    field: string,
    value: string | boolean | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalToggle = (goal: string) => {
    const updatedGoals = formData.tradingGoals.includes(goal)
      ? formData.tradingGoals.filter((g) => g !== goal)
      : [...formData.tradingGoals, goal];
    handleInputChange("tradingGoals", updatedGoals);
  };

  const tradingGoals = [
    {
      id: "passive-income",
      label: "Generate Passive Income",
      icon: TrendingUp,
    },
    { id: "wealth-building", label: "Long-term Wealth Building", icon: Target },
    { id: "active-trading", label: "Active Day Trading", icon: Zap },
    { id: "learn-trading", label: "Learn Trading Skills", icon: User },
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return formData.experience && formData.riskTolerance;
      case 3:
        return formData.agreeToTerms;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-empire-emerald-500 to-empire-emerald-600 rounded-xl flex items-center justify-center mr-3">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-empire-navy-500 to-empire-navy-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-emerald-400 to-empire-emerald-600 bg-clip-text text-transparent">
            Financial Empire
          </h1>
          <p className="text-muted-foreground mt-2">
            Join the elite trading community
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    i + 1 <= currentStep
                      ? "bg-empire-emerald-500 text-white"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1 < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-2 transition-colors ${
                      i + 1 < currentStep ? "bg-empire-emerald-500" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2 text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle>
                {currentStep === 1 && "Create Your Account"}
                {currentStep === 2 && "Trading Experience"}
                {currentStep === 3 && "Finalize Registration"}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Start your journey to financial freedom"}
                {currentStep === 2 && "Help us personalize your experience"}
                {currentStep === 3 && "Complete your account setup"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="pl-10"
                            value={formData.firstName}
                            onChange={(e) =>
                              handleInputChange("firstName", e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-7 w-7 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange("confirmPassword", e.target.value)
                          }
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-7 w-7 p-0"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      {formData.password &&
                        formData.confirmPassword &&
                        formData.password !== formData.confirmPassword && (
                          <p className="text-sm text-red-400">
                            Passwords do not match
                          </p>
                        )}
                    </div>

                    <div className="mt-6">
                      <Separator />
                      <div className="relative flex justify-center text-xs uppercase mt-4 mb-4">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or sign up with
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant="outline"
                          type="button"
                          className="h-10"
                        >
                          <Chrome className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          className="h-10"
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          className="h-10"
                        >
                          <Smartphone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Trading Experience */}
                {currentStep === 2 && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-medium">
                          Trading Experience
                        </Label>
                        <RadioGroup
                          value={formData.experience}
                          onValueChange={(value) =>
                            handleInputChange("experience", value)
                          }
                          className="mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="beginner" id="beginner" />
                            <Label htmlFor="beginner">
                              Beginner (0-1 years)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="intermediate"
                              id="intermediate"
                            />
                            <Label htmlFor="intermediate">
                              Intermediate (1-3 years)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="advanced" id="advanced" />
                            <Label htmlFor="advanced">
                              Advanced (3+ years)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label
                          htmlFor="riskTolerance"
                          className="text-base font-medium"
                        >
                          Risk Tolerance
                        </Label>
                        <Select
                          value={formData.riskTolerance}
                          onValueChange={(value) =>
                            handleInputChange("riskTolerance", value)
                          }
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select your risk tolerance" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conservative">
                              Conservative - Preserve capital
                            </SelectItem>
                            <SelectItem value="moderate">
                              Moderate - Balanced approach
                            </SelectItem>
                            <SelectItem value="aggressive">
                              Aggressive - Maximum growth
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-base font-medium">
                          Trading Goals (Select all that apply)
                        </Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {tradingGoals.map((goal) => {
                            const Icon = goal.icon;
                            const isSelected = formData.tradingGoals.includes(
                              goal.id,
                            );
                            return (
                              <Button
                                key={goal.id}
                                type="button"
                                variant={isSelected ? "default" : "outline"}
                                className="h-auto p-3 flex flex-col items-center text-center"
                                onClick={() => handleGoalToggle(goal.id)}
                              >
                                <Icon className="w-5 h-5 mb-1" />
                                <span className="text-xs">{goal.label}</span>
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Terms and Completion */}
                {currentStep === 3 && (
                  <>
                    <div className="space-y-4">
                      <div className="bg-empire-emerald-500/10 border border-empire-emerald-400/30 rounded-lg p-4">
                        <h3 className="font-semibold text-empire-emerald-400 mb-2">
                          Welcome to Financial Empire!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          You're about to join an exclusive community of
                          traders. Here's what you'll get:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                            <span>
                              Access to advanced trading tools and bots
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                            <span>
                              Real-time market analysis and whale tracking
                            </span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                            <span>Comprehensive trading education academy</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-empire-emerald-400" />
                            <span>Secure multi-wallet integration</span>
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) =>
                              handleInputChange("agreeToTerms", !!checked)
                            }
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm leading-relaxed"
                          >
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              className="text-empire-emerald-400 hover:text-empire-emerald-300"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              to="/privacy"
                              className="text-empire-emerald-400 hover:text-empire-emerald-300"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.subscribeNewsletter}
                            onCheckedChange={(checked) =>
                              handleInputChange(
                                "subscribeNewsletter",
                                !!checked,
                              )
                            }
                          />
                          <Label htmlFor="newsletter" className="text-sm">
                            Subscribe to our newsletter for market insights and
                            updates
                          </Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between mt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </Button>
                  )}

                  <Button
                    type="submit"
                    className={`${currentStep === 1 ? "w-full" : "ml-auto"} bg-empire-emerald-500 hover:bg-empire-emerald-600`}
                    disabled={!canProceed() || isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : currentStep === totalSteps ? (
                      <Shield className="w-4 h-4 mr-2" />
                    ) : (
                      <ArrowRight className="w-4 h-4 mr-2" />
                    )}
                    {isLoading
                      ? "Creating Account..."
                      : currentStep === totalSteps
                        ? "Create Account"
                        : "Continue"}
                  </Button>
                </div>
              </form>

              {currentStep === 1 && (
                <div className="mt-6 text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="text-empire-emerald-400 hover:text-empire-emerald-300 font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Shield className="w-3 h-3" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
