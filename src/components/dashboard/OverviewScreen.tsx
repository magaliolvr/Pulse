import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart3,
  Leaf,
  TrendingDown,
  Wallet,
  Zap,
  TreePine,
  Sun,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { DEFAULT_PLAN, PLAN_MULTIPLIERS } from "@/constants/plans";
import type { SubscriptionPlan } from "@/constants/plans";
import { APP_CONFIG } from "@/config/app";
import type { DataSource, ManualDataEntry } from "./DataScreen";

// Import nature icon
import iconTree from "@/assets/icon-tree.png";

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

interface OverviewScreenProps {
  dataSource: DataSource;
  manualData: ManualDataEntry[];
}

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
  const isPositive = trend === "down";

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
      className="p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-nature transition-shadow relative overflow-hidden group"
    >
      {/* Subtle nature decoration */}
      <div className="absolute -top-2 -right-2 w-16 h-16 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <img src={iconTree} alt="" className="w-full h-full object-contain" aria-hidden="true" />
      </div>
      
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

export const OverviewScreen = ({ dataSource, manualData }: OverviewScreenProps) => {
  const { t } = useLanguage();
  const { profile } = useAuth();

  const plan = (profile?.subscription_plan as SubscriptionPlan | undefined) || DEFAULT_PLAN;
  const budget = profile?.monthly_budget || APP_CONFIG.DEFAULT_BUDGET;

  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState<ReturnType<typeof generateDailyData>>([]);
  const [monthlyData, setMonthlyData] = useState<ReturnType<typeof generateMonthlyData>>([]);

  // Calculate values based on data source
  const calculatedValues = useMemo(() => {
    if (dataSource === "manual" && manualData.length > 0) {
      const totalConsumption = manualData.reduce((sum, entry) => sum + entry.consumption, 0);
      const totalCost = manualData.reduce((sum, entry) => sum + entry.cost, 0);
      const avgConsumption = Math.round(totalConsumption / manualData.length);
      const avgCost = Math.round(totalCost / manualData.length);
      const projectedSavings = Math.round(budget - avgCost);
      
      return {
        consumption: avgConsumption,
        currentSpend: avgCost,
        projectedSavings: projectedSavings > 0 ? projectedSavings : 0,
      };
    }
    
    // Default simulated values
    const planMultiplier = PLAN_MULTIPLIERS[plan];
    return {
      consumption: Math.floor(245 * planMultiplier),
      currentSpend: Math.floor(budget * 0.72 * planMultiplier),
      projectedSavings: Math.floor(budget * 0.23 * planMultiplier),
    };
  }, [dataSource, manualData, budget, plan]);

  // Convert manual data to chart format
  const manualMonthlyData = useMemo(() => {
    if (dataSource === "manual" && manualData.length > 0) {
      return manualData.map(entry => ({
        month: entry.month.substring(0, 3),
        consumption: entry.consumption,
        cost: entry.cost,
      }));
    }
    return monthlyData;
  }, [dataSource, manualData, monthlyData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDailyData(generateDailyData());
      setMonthlyData(generateMonthlyData());
      setLoading(false);
    }, APP_CONFIG.LOADING_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={t.dashboard.kpi.consumption.title}
          value={`${calculatedValues.consumption} ${t.dashboard.kpi.consumption.unit}`}
          change={12}
          changeLabel={t.dashboard.kpi.consumption.change}
          icon={Zap}
          trend="down"
          loading={loading}
        />
        <KPICard
          title={t.dashboard.kpi.cost.title}
          value={`€${calculatedValues.currentSpend}`}
          change={8}
          changeLabel={t.dashboard.kpi.cost.change}
          icon={Wallet}
          trend="down"
          loading={loading}
        />
        <KPICard
          title={t.dashboard.kpi.savings.title}
          value={`€${calculatedValues.projectedSavings}`}
          change={15}
          changeLabel={t.dashboard.kpi.savings.change}
          icon={TrendingDown}
          trend="down"
          loading={loading}
        />
        <KPICard
          title={t.dashboard.kpi.budget.title}
          value={`€${Math.round(budget - calculatedValues.currentSpend)}`}
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
              <RechartsLineChart data={manualMonthlyData}>
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

      {/* Quick Actions / Insights with nature theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 bg-gradient-to-r from-primary/10 via-success/5 to-primary/10 rounded-2xl border border-primary/20 relative overflow-hidden"
      >
        {/* Decorative nature elements */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <TreePine className="w-full h-full text-primary" />
        </div>
        <div className="absolute bottom-0 left-1/2 w-24 h-24 opacity-5">
          <Sun className="w-full h-full text-warning" />
        </div>
        
        <div className="flex items-start gap-4 relative">
          <div className="w-12 h-12 rounded-xl gradient-nature flex items-center justify-center flex-shrink-0">
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
                {t.cta.primaryCta}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Eco tip of the day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-success/5 rounded-xl border border-success/20 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-4 h-4 text-success" />
        </div>
        <p className="text-sm text-muted-foreground flex-1">
          <span className="font-medium text-foreground">Sabia que?</span> Desligar os aparelhos em standby pode poupar até 10% na fatura de eletricidade.
        </p>
      </motion.div>
    </div>
  );
};
