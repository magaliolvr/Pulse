import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Wallet, TrendingDown, Receipt, PiggyBank, CreditCard, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DataSource, ManualDataEntry } from "./DataScreen";

const projectionData = [
  { month: "Jan", projected: 82, optimized: 68 },
  { month: "Fev", projected: 78, optimized: 65 },
  { month: "Mar", projected: 75, optimized: 62 },
  { month: "Abr", projected: 72, optimized: 58 },
  { month: "Mai", projected: 70, optimized: 55 },
  { month: "Jun", projected: 68, optimized: 52 },
];

interface FinancesScreenProps {
  dataSource: DataSource;
  manualData: ManualDataEntry[];
}

export const FinancesScreen = ({ dataSource, manualData }: FinancesScreenProps) => {
  const { t } = useLanguage();
  const { profile } = useAuth();
  
  const budget = profile?.monthly_budget || 100;

  // Calculate values based on data source
  const financialData = useMemo(() => {
    if (dataSource === "manual" && manualData.length > 0) {
      const totalCost = manualData.reduce((sum, entry) => sum + entry.cost, 0);
      const avgCost = Math.round(totalCost / manualData.length);
      const savings = Math.round(budget - avgCost);
      
      // Generate expenses from manual data
      const expenses = manualData.map(entry => ({
        month: entry.month.substring(0, 3),
        actual: entry.cost,
        budget: budget,
      }));
      
      return {
        currentSpend: avgCost,
        savings: savings > 0 ? savings : 0,
        yearlyProjected: (savings > 0 ? savings : 0) * 12,
        expenses,
      };
    }
    
    // Default simulated values
    const currentSpend = Math.floor(budget * 0.72);
    const savings = Math.floor(budget * 0.23);
    const defaultExpenses = [
      { month: "Jul", actual: 95, budget: 120 },
      { month: "Ago", actual: 88, budget: 120 },
      { month: "Set", actual: 102, budget: 120 },
      { month: "Out", actual: 78, budget: 110 },
      { month: "Nov", actual: 85, budget: 110 },
      { month: "Dez", actual: 92, budget: 110 },
    ];
    
    return {
      currentSpend,
      savings,
      yearlyProjected: savings * 12,
      expenses: defaultExpenses,
    };
  }, [dataSource, manualData, budget]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">{t.dashboard.kpi.cost.title}</h2>
        <p className="text-muted-foreground">Gestão financeira e poupança energética</p>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Euro className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Orçamento Mensal</span>
          </div>
          <p className="text-2xl font-bold">€{budget}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Gasto Atual</span>
          </div>
          <p className="text-2xl font-bold">€{financialData.currentSpend}</p>
          <p className="text-xs text-muted-foreground">{Math.round((financialData.currentSpend / budget) * 100)}% do orçamento</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">Poupança Mensal</span>
          </div>
          <p className="text-2xl font-bold text-success">€{financialData.savings}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Projeção Anual</span>
          </div>
          <p className="text-2xl font-bold text-primary">€{financialData.yearlyProjected}</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Expenses vs Budget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Gastos vs Orçamento</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                Gasto
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                Orçamento
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={financialData.expenses}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`€${value}`, '']}
              />
              <Bar dataKey="actual" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="budget" fill="hsl(var(--muted-foreground) / 0.3)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Savings Projection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Projeção de Poupança</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-accent" />
                Normal
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-success" />
                Otimizado
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`€${value}`, '']}
              />
              <Line
                type="monotone"
                dataKey="projected"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="optimized"
                stroke="hsl(var(--success))"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-card rounded-2xl border border-border/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Histórico de Faturas</h3>
          <Button variant="outline" size="sm">
            <CreditCard className="w-4 h-4 mr-2" />
            Ver todas
          </Button>
        </div>
        <div className="space-y-3">
          {[
            { month: "Dezembro 2025", amount: 92, status: "Pago", date: "28/12/2025" },
            { month: "Novembro 2025", amount: 85, status: "Pago", date: "28/11/2025" },
            { month: "Outubro 2025", amount: 78, status: "Pago", date: "28/10/2025" },
          ].map((invoice) => (
            <div key={invoice.month} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="font-medium">{invoice.month}</p>
                <p className="text-sm text-muted-foreground">{invoice.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€{invoice.amount}</p>
                <span className="text-xs text-success">{invoice.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
