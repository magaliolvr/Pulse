import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingDown, TrendingUp, Zap, Clock, Calendar } from "lucide-react";

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}h`,
  consumption: Math.floor(Math.random() * 5) + (i >= 18 && i <= 22 ? 8 : 2),
}));

const weeklyData = [
  { day: "Seg", current: 32, previous: 38 },
  { day: "Ter", current: 28, previous: 35 },
  { day: "Qua", current: 35, previous: 40 },
  { day: "Qui", current: 30, previous: 36 },
  { day: "Sex", current: 27, previous: 33 },
  { day: "Sáb", current: 22, previous: 28 },
  { day: "Dom", current: 18, previous: 25 },
];

const deviceData = [
  { name: "Ar Condicionado", value: 35, color: "hsl(var(--primary))" },
  { name: "Aquecedor", value: 25, color: "hsl(var(--accent))" },
  { name: "Eletrodomésticos", value: 20, color: "hsl(var(--success))" },
  { name: "Iluminação", value: 12, color: "hsl(var(--warning))" },
  { name: "Outros", value: 8, color: "hsl(var(--muted-foreground))" },
];

export const AnalyticsScreen = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">{t.dashboard.menu.analytics}</h2>
        <p className="text-muted-foreground">Análise detalhada do seu consumo energético</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Pico de consumo</span>
          </div>
          <p className="text-2xl font-bold">19h - 21h</p>
          <p className="text-sm text-muted-foreground">Período mais intenso</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">Redução semanal</span>
          </div>
          <p className="text-2xl font-bold text-success">-18%</p>
          <p className="text-sm text-muted-foreground">vs. semana anterior</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-accent" />
            <span className="text-sm text-muted-foreground">Média diária</span>
          </div>
          <p className="text-2xl font-bold">27 kWh</p>
          <p className="text-sm text-muted-foreground">Este mês</p>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly Consumption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Consumo por Hora (Hoje)</h3>
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="consumption"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Comparação Semanal</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                Esta semana
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                Anterior
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Device Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 bg-card rounded-2xl border border-border/50"
      >
        <h3 className="font-semibold mb-4">Consumo por Dispositivo</h3>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {deviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
