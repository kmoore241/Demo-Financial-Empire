import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  PieChart,
  DollarSign,
  TrendingUp,
  Target,
  Calculator,
  Receipt,
  Wallet,
  Calendar,
  BarChart3,
  PiggyBank,
  Shield,
  Trophy,
  Crown,
  CheckCircle,
  AlertTriangle,
  Users,
  Home,
  Car,
  Briefcase,
  GraduationCap,
  Heart,
  Plane,
  Coffee,
  ShoppingCart,
  Zap,
  Award,
  Star,
  Clock,
} from "lucide-react";
import BrokerLinkPanel from "@/components/Investment/BrokerLinkPanel";

interface InvestmentGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: "high" | "medium" | "low";
  category:
    | "retirement"
    | "education"
    | "house"
    | "emergency"
    | "travel"
    | "other";
}

interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  limit: number;
  icon: any;
  color: string;
}

interface TaxOptimization {
  strategy: string;
  potentialSavings: number;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  timeline: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  target?: number;
}

const InvestmentPlanner = () => {
  const [activeTab, setActiveTab] = useState("planner");
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [riskTolerance, setRiskTolerance] = useState([50]);
  const [timeHorizon, setTimeHorizon] = useState("10-20");
  const [investmentGoals, setInvestmentGoals] = useState<InvestmentGoal[]>([]);
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(
    [],
  );
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // Initialize data
  useEffect(() => {
    setInvestmentGoals([
      {
        id: "1",
        name: "Emergency Fund",
        targetAmount: 25000,
        currentAmount: 8500,
        targetDate: `${new Date().getFullYear() + 1}-12-31`,
        priority: "high",
        category: "emergency",
      },
      {
        id: "2",
        name: "Retirement Fund",
        targetAmount: 1000000,
        currentAmount: 85000,
        targetDate: "2045-01-01",
        priority: "high",
        category: "retirement",
      },
      {
        id: "3",
        name: "House Down Payment",
        targetAmount: 100000,
        currentAmount: 35000,
        targetDate: "2026-06-01",
        priority: "medium",
        category: "house",
      },
      {
        id: "4",
        name: "European Vacation",
        targetAmount: 8000,
        currentAmount: 2500,
        targetDate: `${new Date().getFullYear() + 1}-08-01`,
        priority: "low",
        category: "travel",
      },
    ]);

    setBudgetCategories([
      {
        id: "1",
        name: "Housing",
        allocated: 2200,
        spent: 2200,
        limit: 2500,
        icon: Home,
        color: "bg-blue-500",
      },
      {
        id: "2",
        name: "Transportation",
        allocated: 600,
        spent: 520,
        limit: 800,
        icon: Car,
        color: "bg-green-500",
      },
      {
        id: "3",
        name: "Food & Dining",
        allocated: 800,
        spent: 675,
        limit: 1000,
        icon: Coffee,
        color: "bg-orange-500",
      },
      {
        id: "4",
        name: "Entertainment",
        allocated: 400,
        spent: 380,
        limit: 500,
        icon: Plane,
        color: "bg-purple-500",
      },
      {
        id: "5",
        name: "Healthcare",
        allocated: 300,
        spent: 150,
        limit: 400,
        icon: Heart,
        color: "bg-red-500",
      },
      {
        id: "6",
        name: "Shopping",
        allocated: 500,
        spent: 420,
        limit: 600,
        icon: ShoppingCart,
        color: "bg-pink-500",
      },
      {
        id: "7",
        name: "Investments",
        allocated: 1500,
        spent: 1500,
        limit: 2000,
        icon: TrendingUp,
        color: "bg-empire-emerald-500",
      },
    ]);

    setAchievements([
      {
        id: "1",
        title: "First Investment",
        description: "Made your first investment trade",
        icon: Zap,
        earned: true,
        earnedDate: new Date().toISOString().split("T")[0],
      },
      {
        id: "2",
        title: "Budget Master",
        description: "Stayed within budget for 3 consecutive months",
        icon: Target,
        earned: true,
        earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "3",
        title: "Emergency Ready",
        description: "Built an emergency fund of $10,000",
        icon: Shield,
        earned: false,
        progress: 8500,
        target: 10000,
      },
      {
        id: "4",
        title: "Diversification Pro",
        description: "Diversified portfolio across 5+ asset classes",
        icon: PieChart,
        earned: true,
        earnedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      },
      {
        id: "5",
        title: "Tax Optimizer",
        description: "Implemented 3+ tax optimization strategies",
        icon: Receipt,
        earned: false,
        progress: 2,
        target: 3,
      },
      {
        id: "6",
        title: "Millionaire Journey",
        description: "Reach $100,000 in total investments",
        icon: Crown,
        earned: false,
        progress: 85000,
        target: 100000,
      },
      {
        id: "7",
        title: "Goal Crusher",
        description: "Achieved 5 financial goals",
        icon: Trophy,
        earned: false,
        progress: 2,
        target: 5,
      },
      {
        id: "8",
        title: "Consistency King",
        description: "Made regular investments for 12 months",
        icon: Calendar,
        earned: false,
        progress: 8,
        target: 12,
      },
    ]);
  }, []);

  const taxOptimizations: TaxOptimization[] = [
    {
      strategy: "Maximize 401(k) Contributions",
      potentialSavings: 5500,
      description: "Contribute the full $23,000 limit to reduce taxable income",
      difficulty: "easy",
      timeline: "Immediate",
    },
    {
      strategy: "Traditional to Roth IRA Conversion",
      potentialSavings: 3200,
      description: "Convert traditional IRA funds during low-income years",
      difficulty: "medium",
      timeline: "1-2 years",
    },
    {
      strategy: "Tax-Loss Harvesting",
      potentialSavings: 1800,
      description: "Realize losses to offset capital gains",
      difficulty: "medium",
      timeline: "Ongoing",
    },
    {
      strategy: "HSA Triple Tax Advantage",
      potentialSavings: 1200,
      description: "Maximize HSA contributions for tax-free healthcare",
      difficulty: "easy",
      timeline: "Immediate",
    },
    {
      strategy: "Municipal Bond Investment",
      potentialSavings: 2100,
      description: "Invest in tax-free municipal bonds",
      difficulty: "hard",
      timeline: "3-6 months",
    },
  ];

  const calculateAllocation = () => {
    const conservative = 100 - riskTolerance[0];
    const aggressive = riskTolerance[0];

    return {
      stocks: Math.round(aggressive * 0.7),
      bonds: Math.round(conservative * 0.6),
      crypto: Math.round(aggressive * 0.15),
      reits: Math.round(aggressive * 0.1),
      cash: Math.round(conservative * 0.4),
      commodities: Math.round(aggressive * 0.05),
    };
  };

  const allocation = calculateAllocation();
  const totalBudget = budgetCategories.reduce(
    (sum, cat) => sum + cat.allocated,
    0,
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalSavings = taxOptimizations.reduce(
    (sum, opt) => sum + opt.potentialSavings,
    0,
  );
  const earnedAchievements = achievements.filter((a) => a.earned).length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400";
      case "medium":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "low":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-empire-emerald-500/20 text-empire-emerald-400";
      case "medium":
        return "bg-empire-gold-500/20 text-empire-gold-400";
      case "hard":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-empire-navy-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-empire-gold-500 to-empire-gold-600 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-empire-gold-400 to-empire-gold-600 bg-clip-text text-transparent">
                Investment Planner
              </h1>
              <p className="text-muted-foreground">
                Smart financial planning with tax optimization and goal tracking
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-empire-gold-500/20 text-empire-gold-400">
              <Trophy className="w-3 h-3 mr-1" />
              {earnedAchievements} Achievements
            </Badge>
            <Badge className="bg-empire-emerald-500/20 text-empire-emerald-400">
              <DollarSign className="w-3 h-3 mr-1" />$
              {totalSavings.toLocaleString()} Potential Savings
            </Badge>
          </div>
        </motion.div>

        {/* Main Tabs */}
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
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger
                value="planner"
                className="flex items-center space-x-2"
              >
                <Calculator className="w-4 h-4" />
                <span>Planner</span>
              </TabsTrigger>
              <TabsTrigger
                value="budget"
                className="flex items-center space-x-2"
              >
                <PiggyBank className="w-4 h-4" />
                <span>Budget</span>
              </TabsTrigger>
              <TabsTrigger
                value="goals"
                className="flex items-center space-x-2"
              >
                <Target className="w-4 h-4" />
                <span>Goals</span>
              </TabsTrigger>
              <TabsTrigger value="tax" className="flex items-center space-x-2">
                <Receipt className="w-4 h-4" />
                <span>Tax Optimizer</span>
              </TabsTrigger>
              <TabsTrigger
                value="accounts"
                className="flex items-center space-x-2"
              >
                <Wallet className="w-4 h-4" />
                <span>Accounts</span>
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="flex items-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Achievements</span>
              </TabsTrigger>
            </TabsList>

            {/* Investment Planner Tab */}
            <TabsContent value="planner" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-1">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Briefcase className="w-5 h-5" />
                        <span>Investment Profile</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="income">Annual Income</Label>
                        <Input
                          id="income"
                          type="number"
                          value={annualIncome}
                          onChange={(e) =>
                            setAnnualIncome(Number(e.target.value))
                          }
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label>Risk Tolerance: {riskTolerance[0]}%</Label>
                        <Slider
                          value={riskTolerance}
                          onValueChange={setRiskTolerance}
                          max={100}
                          step={5}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Conservative</span>
                          <span>Aggressive</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="horizon">Time Horizon</Label>
                        <Select
                          value={timeHorizon}
                          onValueChange={setTimeHorizon}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-3">1-3 years</SelectItem>
                            <SelectItem value="3-5">3-5 years</SelectItem>
                            <SelectItem value="5-10">5-10 years</SelectItem>
                            <SelectItem value="10-20">10-20 years</SelectItem>
                            <SelectItem value="20+">20+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full bg-empire-gold-500 hover:bg-empire-gold-600">
                        <Calculator className="w-4 h-4 mr-2" />
                        Recalculate Portfolio
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Portfolio Allocation */}
                <div className="lg:col-span-2">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PieChart className="w-5 h-5" />
                        <span>Recommended Portfolio Allocation</span>
                      </CardTitle>
                      <CardDescription>
                        Based on your risk tolerance and time horizon
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(allocation).map(
                          ([asset, percentage]) => (
                            <div key={asset} className="text-center">
                              <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-empire-gold-500/20 to-empire-gold-600/20">
                                <span className="text-lg font-bold text-empire-gold-400">
                                  {percentage}%
                                </span>
                              </div>
                              <h3 className="font-medium capitalize">
                                {asset}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                $
                                {(
                                  (annualIncome * 0.15 * percentage) /
                                  100
                                ).toLocaleString()}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Recommendations */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm mt-6">
                    <CardHeader>
                      <CardTitle>Investment Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border border-border/50">
                          <h4 className="font-semibold mb-2">
                            Monthly Investment Target
                          </h4>
                          <p className="text-2xl font-bold text-empire-gold-400">
                            ${((annualIncome * 0.15) / 12).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            15% of annual income for optimal growth
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border border-border/50">
                            <h4 className="font-semibold mb-2">
                              Emergency Fund Priority
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Build 3-6 months of expenses before aggressive
                              investing
                            </p>
                          </div>
                          <div className="p-4 rounded-lg border border-border/50">
                            <h4 className="font-semibold mb-2">
                              Tax-Advantaged Accounts
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              Maximize 401(k) and IRA contributions first
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Budget Overview */}
                <div className="lg:col-span-2">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <PiggyBank className="w-5 h-5" />
                        <span>Monthly Budget Breakdown</span>
                      </CardTitle>
                      <CardDescription>
                        Track your spending across categories
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {budgetCategories.map((category) => {
                          const Icon = category.icon;
                          const utilization =
                            (category.spent / category.limit) * 100;
                          const isOverBudget = category.spent > category.limit;

                          return (
                            <div key={category.id} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`w-8 h-8 rounded-lg ${category.color} flex items-center justify-center`}
                                  >
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-medium">
                                    {category.name}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <div className="font-medium">
                                    ${category.spent.toLocaleString()} / $
                                    {category.limit.toLocaleString()}
                                  </div>
                                  <div
                                    className={`text-sm ${isOverBudget ? "text-red-400" : "text-muted-foreground"}`}
                                  >
                                    {utilization.toFixed(1)}% used
                                  </div>
                                </div>
                              </div>
                              <Progress
                                value={Math.min(utilization, 100)}
                                className={`h-2 ${isOverBudget ? "bg-red-500/20" : ""}`}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Budget Summary */}
                <div className="space-y-6">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Budget Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Budget
                        </span>
                        <span className="font-bold">
                          ${totalBudget.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Total Spent
                        </span>
                        <span className="font-bold">
                          ${totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining</span>
                        <span
                          className={`font-bold ${totalBudget - totalSpent >= 0 ? "text-empire-emerald-400" : "text-red-400"}`}
                        >
                          ${(totalBudget - totalSpent).toLocaleString()}
                        </span>
                      </div>
                      <Progress
                        value={(totalSpent / totalBudget) * 100}
                        className="mt-4"
                      />
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Income Allocation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Monthly Income
                        </span>
                        <span className="font-medium">
                          ${(annualIncome / 12).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Fixed Expenses
                        </span>
                        <span className="font-medium">
                          ${totalSpent.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Investments (15%)
                        </span>
                        <span className="font-medium text-empire-emerald-400">
                          ${((annualIncome * 0.15) / 12).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Emergency Fund
                        </span>
                        <span className="font-medium text-empire-gold-400">
                          ${((annualIncome / 12) * 0.1).toLocaleString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {investmentGoals.map((goal) => {
                  const progress =
                    (goal.currentAmount / goal.targetAmount) * 100;
                  const remaining = goal.targetAmount - goal.currentAmount;
                  const daysUntilTarget = Math.ceil(
                    (new Date(goal.targetDate).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  );
                  const monthlyRequired = remaining / (daysUntilTarget / 30);

                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center space-x-2">
                              <Target className="w-5 h-5" />
                              <span>{goal.name}</span>
                            </CardTitle>
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{progress.toFixed(1)}%</span>
                            </div>
                            <Progress value={progress} className="h-3" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>
                                ${goal.currentAmount.toLocaleString()}
                              </span>
                              <span>${goal.targetAmount.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label className="text-muted-foreground">
                                Remaining
                              </Label>
                              <div className="font-semibold">
                                ${remaining.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">
                                Target Date
                              </Label>
                              <div className="font-semibold">
                                {new Date(goal.targetDate).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">
                                Days Left
                              </Label>
                              <div className="font-semibold">
                                {daysUntilTarget} days
                              </div>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">
                                Monthly Needed
                              </Label>
                              <div className="font-semibold text-empire-gold-400">
                                ${monthlyRequired.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          <Button className="w-full" variant="outline">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Add Contribution
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Tax Optimization Tab */}
            <TabsContent value="tax" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Receipt className="w-5 h-5" />
                        <span>Tax Optimization Strategies</span>
                      </CardTitle>
                      <CardDescription>
                        Maximize your after-tax returns with these strategies
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {taxOptimizations.map((strategy, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">
                                  {strategy.strategy}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {strategy.description}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-lg font-bold text-empire-emerald-400">
                                  ${strategy.potentialSavings.toLocaleString()}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  potential savings
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={getDifficultyColor(
                                    strategy.difficulty,
                                  )}
                                >
                                  {strategy.difficulty}
                                </Badge>
                                <Badge variant="outline">
                                  {strategy.timeline}
                                </Badge>
                              </div>
                              <Button size="sm" variant="outline">
                                Learn More
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Tax Savings Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-empire-emerald-400 mb-1">
                          ${totalSavings.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Potential Annual Savings
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Current Tax Rate
                          </span>
                          <span className="font-medium">22%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Optimized Rate
                          </span>
                          <span className="font-medium text-empire-emerald-400">
                            18%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">
                            Annual Savings
                          </span>
                          <span className="font-medium">
                            ${totalSavings.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full bg-empire-emerald-500 hover:bg-empire-emerald-600">
                        <Receipt className="w-4 h-4 mr-2" />
                        Start Optimization
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  const progress =
                    achievement.progress && achievement.target
                      ? (achievement.progress / achievement.target) * 100
                      : 0;

                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card
                        className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 ${
                          achievement.earned
                            ? "border-empire-gold-400/50 bg-empire-gold-500/10"
                            : "border-border/50"
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                              achievement.earned
                                ? "bg-gradient-to-br from-empire-gold-500 to-empire-gold-600"
                                : "bg-muted"
                            }`}
                          >
                            <Icon
                              className={`w-8 h-8 ${
                                achievement.earned
                                  ? "text-white"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </div>

                          <h3
                            className={`font-semibold mb-2 ${
                              achievement.earned
                                ? "text-empire-gold-400"
                                : "text-foreground"
                            }`}
                          >
                            {achievement.title}
                          </h3>

                          <p className="text-sm text-muted-foreground mb-4">
                            {achievement.description}
                          </p>

                          {achievement.earned ? (
                            <div className="space-y-2">
                              <Badge className="bg-empire-gold-500/20 text-empire-gold-400">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Earned
                              </Badge>
                              {achievement.earnedDate && (
                                <div className="text-xs text-muted-foreground">
                                  {new Date(
                                    achievement.earnedDate,
                                  ).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ) : achievement.progress !== undefined &&
                            achievement.target ? (
                            <div className="space-y-2">
                              <Progress value={progress} className="h-2" />
                              <div className="text-xs text-muted-foreground">
                                {achievement.progress.toLocaleString()} /{" "}
                                {achievement.target.toLocaleString()}
                              </div>
                            </div>
                          ) : (
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              In Progress
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            {/* Accounts Tab */}
            <TabsContent value="accounts" className="space-y-6">
              <BrokerLinkPanel />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default InvestmentPlanner;
