import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart3, 
  Bell, 
  ChevronDown, 
  Home, 
  Leaf, 
  LineChart, 
  Menu,
  Settings,
  TrendingDown, 
  TrendingUp, 
  Wallet, 
  Zap,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// Mock data generation
const generateDailyData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    consumption: Math.floor(Math.random() * 30) + 20,
    cost: Math.floor(Math.random() * 15) + 5,
  }));
};

const generateMonthlyData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    consumption: Math.floor(Math.random() * 200) + 100,
    cost: Math.floor(Math.random() * 100) + 50,
  }));
};

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  trend: "up" | "down";
  loading?: boolean;
}

const KPICard = ({ title, value, change, icon: Icon, trend, loading }: KPICardProps) => {
  const isPositive = trend === "down"; // For energy, down is good
  
  if (loading) {
    return (
      <div className="p-6 bg-card rounded-2xl shadow-soft border border-border/50">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-secondary rounded mb-4" />
          <div className="h-8 w-32 bg-secondary rounded mb-2" />
          <div className="h-4 w-20 bg-secondary rounded" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground text-sm">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="text-3xl font-display font-bold mb-2">{value}</div>
      <div className="flex items-center gap-1 text-sm">
        {isPositive ? (
          <ArrowDown className="w-4 h-4 text-success" />
        ) : (
          <ArrowUp className="w-4 h-4 text-accent" />
        )}
        <span className={isPositive ? "text-success" : "text-accent"}>
          {Math.abs(change)}%
        </span>
        <span className="text-muted-foreground">vs last month</span>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state as { plan?: string; monthlyBudget?: string } | null;
  const plan = userData?.plan || "Free";
  const budget = parseInt(userData?.monthlyBudget || "150");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dailyData, setDailyData] = useState<ReturnType<typeof generateDailyData>>([]);
  const [monthlyData, setMonthlyData] = useState<ReturnType<typeof generateMonthlyData>>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Calculate dynamic values based on plan
  const planMultiplier = plan === "Premium" ? 0.85 : plan === "Family" ? 0.75 : 1;
  const currentSpend = Math.floor(budget * 0.72 * planMultiplier);
  const projectedSavings = Math.floor(budget * 0.23 * planMultiplier);
  const consumption = Math.floor(245 * planMultiplier);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setDailyData(generateDailyData());
      setMonthlyData(generateMonthlyData());
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      setDailyData(generateDailyData());
      setMonthlyData(generateMonthlyData());
      setLoading(false);
    }, 1500);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Unable to load data</h2>
          <p className="text-muted-foreground mb-6">
            There was a problem loading your dashboard. Please try again.
          </p>
          <Button variant="hero" onClick={handleRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        className="bg-card border-r border-border flex flex-col fixed h-full z-40"
      >
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-display font-bold text-xl gradient-text"
            >
              Pulse
            </motion.span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { icon: Home, label: "Dashboard", active: true },
            { icon: LineChart, label: "Analytics" },
            { icon: Wallet, label: "Budget" },
            { icon: Leaf, label: "Eco Impact" },
            { icon: Bell, label: "Alerts" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <Menu className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 256 : 72 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">
                Welcome back! Here's your energy overview.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10">
                <span className="text-sm font-medium text-primary">{plan} Plan</span>
                {plan !== "Free" && (
                  <ChevronDown className="w-4 h-4 text-primary" />
                )}
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard
              title="This Month's Usage"
              value={`${consumption} kWh`}
              change={12}
              icon={Zap}
              trend="down"
              loading={loading}
            />
            <KPICard
              title="Current Spend"
              value={`$${currentSpend}`}
              change={8}
              icon={Wallet}
              trend="down"
              loading={loading}
            />
            <KPICard
              title="Projected Savings"
              value={`$${projectedSavings}`}
              change={15}
              icon={TrendingDown}
              trend="down"
              loading={loading}
            />
            <KPICard
              title="Budget Remaining"
              value={`$${budget - currentSpend}`}
              change={5}
              icon={BarChart3}
              trend="up"
              loading={loading}
            />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Weekly Consumption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-card rounded-2xl shadow-soft border border-border/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg">Daily Consumption</h3>
                  <p className="text-muted-foreground text-sm">This week's usage pattern</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span>-8% vs last week</span>
                </div>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Bar dataKey="consumption" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </motion.div>

            {/* Monthly Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-card rounded-2xl shadow-soft border border-border/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-semibold text-lg">Monthly Trend</h3>
                  <p className="text-muted-foreground text-sm">Cost over the past year</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span>-15% YoY</span>
                </div>
              </div>
              {loading ? (
                <div className="h-64 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsLineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "12px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              )}
            </motion.div>
          </div>

          {/* Quick Actions / Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-lg mb-1">
                  💡 Energy Saving Tip
                </h3>
                <p className="text-muted-foreground mb-4">
                  Based on your usage patterns, switching to LED bulbs in your living room 
                  could save you approximately <strong className="text-foreground">$12/month</strong>.
                </p>
                <div className="flex gap-3">
                  <Button variant="hero" size="sm">
                    Learn More
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
