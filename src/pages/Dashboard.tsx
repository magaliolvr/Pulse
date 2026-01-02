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
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Mock data generation
const generateDailyData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    day: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"][i],
    consumption: Math.floor(Math.random() * 30) + 20,
    cost: Math.floor(Math.random() * 15) + 5,
  }));
};

const generateMonthlyData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][i],
    consumption: Math.floor(Math.random() * 200) + 100,
    cost: Math.floor(Math.random() * 100) + 50,
  }));
};

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  trend: "up" | "down";
  loading?: boolean;
}

const KPICard = ({ title, value, change, changeLabel, icon: Icon, trend, loading }: KPICardProps) => {
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
        <span className="text-muted-foreground">{changeLabel}</span>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const location = useLocation();
  const userData = location.state as { plan?: string; monthlyBudget?: string } | null;
  const plan = userData?.plan || "Free";
  const budget = parseInt(userData?.monthlyBudget || "150");
  const { t } = useLanguage();

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

  const menuItems = [
    { icon: Home, label: t.dashboard.menu.overview, active: true },
    { icon: LineChart, label: t.dashboard.menu.analytics },
    { icon: Wallet, label: t.dashboard.kpi.cost.title },
    { icon: Leaf, label: t.features.items[5]?.title || "Impacto" },
    { icon: Bell, label: t.dashboard.menu.alerts },
    { icon: Settings, label: t.dashboard.menu.settings },
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">{t.dashboard.error.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.dashboard.error.description}
          </p>
          <Button variant="hero" onClick={handleRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.dashboard.error.retry}
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
          {menuItems.map((item) => (
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
              <h1 className="text-2xl font-display font-bold">{t.dashboard.title}</h1>
              <p className="text-muted-foreground text-sm">
                {t.dashboard.welcome}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10">
                <span className="text-sm font-medium text-primary">{plan}</span>
                {plan !== "Free" && (
                  <ChevronDown className="w-4 h-4 text-primary" />
                )}
              </div>
              <Link to="/">
                <Button variant="outline" size="sm">
                  {t.nav.home}
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
              title={t.dashboard.kpi.consumption.title}
              value={`${consumption} ${t.dashboard.kpi.consumption.unit}`}
              change={12}
              changeLabel={t.dashboard.kpi.consumption.change}
              icon={Zap}
              trend="down"
              loading={loading}
            />
            <KPICard
              title={t.dashboard.kpi.cost.title}
              value={`R$${currentSpend}`}
              change={8}
              changeLabel={t.dashboard.kpi.cost.change}
              icon={Wallet}
              trend="down"
              loading={loading}
            />
            <KPICard
              title={t.dashboard.kpi.savings.title}
              value={`R$${projectedSavings}`}
              change={15}
              changeLabel={t.dashboard.kpi.savings.change}
              icon={TrendingDown}
              trend="down"
              loading={loading}
            />
            <KPICard
              title={t.dashboard.kpi.budget.title}
              value={`R$${budget - currentSpend}`}
              change={5}
              changeLabel={t.dashboard.kpi.budget.status.onTrack}
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
                  <h3 className="font-display font-semibold text-lg">{t.dashboard.charts.daily}</h3>
                  <p className="text-muted-foreground text-sm">{t.dashboard.kpi.consumption.change}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span>-8%</span>
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
                  <h3 className="font-display font-semibold text-lg">{t.dashboard.charts.monthly}</h3>
                  <p className="text-muted-foreground text-sm">{t.dashboard.kpi.cost.change}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-success">
                  <TrendingDown className="w-4 h-4" />
                  <span>-15%</span>
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
                  💡 {t.features.items[2]?.title || "Dica de Economia"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {t.features.items[2]?.description || "Acompanhe seu consumo para economizar."}
                </p>
                <div className="flex gap-3">
                  <Button variant="hero" size="sm">
                    {t.onboarding.next}
                  </Button>
                  <Button variant="ghost" size="sm">
                    {t.onboarding.previous}
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
