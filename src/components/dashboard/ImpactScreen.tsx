import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { Leaf, TreePine, Car, Droplets, Wind, Sun, Award } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

// Import nature images
import solarPanelsHome from "@/assets/solar-panels-home.jpg";
import windTurbinesLandscape from "@/assets/wind-turbines-landscape.jpg";

const monthlyImpact = [
  { month: "Jul", co2: 45 },
  { month: "Ago", co2: 42 },
  { month: "Set", co2: 38 },
  { month: "Out", co2: 35 },
  { month: "Nov", co2: 32 },
  { month: "Dez", co2: 28 },
];

const energySourceData = [
  { name: "Solar", value: 35, color: "hsl(var(--warning))" },
  { name: "Eólica", value: 25, color: "hsl(var(--primary))" },
  { name: "Hídrica", value: 20, color: "hsl(190, 60%, 50%)" },
  { name: "Convencional", value: 20, color: "hsl(var(--muted-foreground))" },
];

export const ImpactScreen = () => {
  const { t } = useLanguage();
  const { profile } = useAuth();
  
  const plan = profile?.subscription_plan || "Free";
  const multiplier = plan === "Pro" ? 1.2 : plan === "Family" ? 1.5 : 1;
  
  const co2Saved = Math.floor(156 * multiplier);
  const treesEquivalent = Math.floor(co2Saved / 21);
  const kmNotDriven = Math.floor(co2Saved * 4);
  const waterSaved = Math.floor(co2Saved * 12);

  return (
    <div className="space-y-6">
      {/* Header with nature image */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <img
          src={windTurbinesLandscape}
          alt="Paisagem com turbinas eólicas"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        <div className="absolute inset-0 flex items-center p-6">
          <div className="text-white">
            <h2 className="text-2xl font-display font-bold mb-1">Impacto Ambiental</h2>
            <p className="text-white/80">O seu contributo para um planeta mais verde</p>
          </div>
        </div>
      </div>

      {/* Impact Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-xl border border-success/20 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-success/5 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-5 h-5 text-success" />
              <span className="text-sm text-muted-foreground">CO₂ Evitado</span>
            </div>
            <p className="text-2xl font-bold text-success">{co2Saved} kg</p>
            <p className="text-xs text-muted-foreground">Este ano</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/5 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <TreePine className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Árvores Equivalentes</span>
            </div>
            <p className="text-2xl font-bold text-primary">{treesEquivalent}</p>
            <p className="text-xs text-muted-foreground">Plantadas</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-accent/5 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground">Km Não Percorridos</span>
            </div>
            <p className="text-2xl font-bold text-accent">{kmNotDriven}</p>
            <p className="text-xs text-muted-foreground">De carro</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-gradient-to-br from-[hsl(190,60%,50%)]/10 to-[hsl(190,60%,50%)]/5 rounded-xl border border-[hsl(190,60%,50%)]/20 relative overflow-hidden"
        >
          <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[hsl(190,60%,50%)]/5 rounded-full blur-xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-[hsl(190,60%,50%)]" />
              <span className="text-sm text-muted-foreground">Água Poupada</span>
            </div>
            <p className="text-2xl font-bold text-[hsl(190,60%,50%)]">{waterSaved} L</p>
            <p className="text-xs text-muted-foreground">Indiretamente</p>
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* CO2 Reduction Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-card rounded-2xl border border-border/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Redução de CO₂ Mensal</h3>
            <Wind className="w-5 h-5 text-success" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyImpact}>
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} kg CO₂`, 'Evitado']}
              />
              <Bar dataKey="co2" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Energy Source Mix with solar image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-card rounded-2xl border border-border/50 relative overflow-hidden"
        >
          {/* Mini solar panel image */}
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-bl-2xl opacity-30">
            <img
              src={solarPanelsHome}
              alt="Painéis solares"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex items-center justify-between mb-4 relative">
            <h3 className="font-semibold">Mix Energético</h3>
            <Sun className="w-5 h-5 text-warning" />
          </div>
          <div className="grid grid-cols-2 gap-4 items-center relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={energySourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {energySourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {energySourceData.map((item) => (
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

      {/* Achievement Badge with nature gradient */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 bg-gradient-to-r from-success/10 via-primary/10 to-[hsl(190,60%,50%)]/10 rounded-2xl border border-success/20 relative overflow-hidden"
      >
        {/* Decorative leaf pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-success">
            <path
              fill="currentColor"
              d="M50 0C50 0 60 20 60 40C60 60 50 80 50 100C50 80 40 60 40 40C40 20 50 0 50 0Z"
            />
            <path
              fill="currentColor"
              d="M0 50C0 50 20 60 40 60C60 60 80 50 100 50C80 50 60 40 40 40C20 40 0 50 0 50Z"
            />
          </svg>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="w-16 h-16 rounded-2xl bg-success/20 flex items-center justify-center">
            <Award className="w-8 h-8 text-success" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg">Eco-Herói do Mês! 🌱</h3>
            <p className="text-muted-foreground">
              Parabéns! Está entre os 10% de utilizadores com maior redução de pegada de carbono.
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-success">#127</p>
            <p className="text-sm text-muted-foreground">Ranking Nacional</p>
          </div>
        </div>
      </motion.div>

      {/* Community impact visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="p-6 bg-card rounded-2xl border border-border/50"
      >
        <div className="flex items-center gap-3 mb-4">
          <TreePine className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Impacto da Comunidade Pulse</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-xl bg-success/5 border border-success/10">
            <p className="text-3xl font-bold text-success mb-1">12.4M</p>
            <p className="text-sm text-muted-foreground">kg CO₂ evitados</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-3xl font-bold text-primary mb-1">590K</p>
            <p className="text-sm text-muted-foreground">árvores equivalentes</p>
          </div>
          <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
            <p className="text-3xl font-bold text-accent mb-1">€2.8M</p>
            <p className="text-sm text-muted-foreground">poupados em faturas</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
