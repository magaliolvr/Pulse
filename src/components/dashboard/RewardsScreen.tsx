import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  TrendingDown, 
  Calendar,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  Gift,
  Leaf,
  CreditCard,
  Coffee,
  ShoppingBag,
  TreePine,
  Sun,
  Users,
  Building2,
  ChevronRight,
  Sparkles,
  Shield,
  Clock,
  Percent
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  unlocked: boolean;
  unlockedAt?: string;
  color: string;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  progress: number;
  target: number;
  unit: string;
  active: boolean;
  reward: number;
  deadline: string;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  icon: typeof Gift;
  category: "discount" | "voucher" | "eco" | "experience";
  color: string;
}

export function RewardsScreen() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Simulated user points and data
  const [userPoints, setUserPoints] = useState(2450);
  const [level] = useState(5);
  const [streak] = useState(12);
  
  const badges: BadgeType[] = [
    {
      id: "first-savings",
      name: t.dashboard.rewards?.badges?.firstSavings || "Primeira Poupança",
      description: t.dashboard.rewards?.badges?.firstSavingsDesc || "Poupou energia pela primeira vez",
      icon: Star,
      unlocked: true,
      unlockedAt: "2024-01-15",
      color: "text-yellow-500"
    },
    {
      id: "budget-master",
      name: t.dashboard.rewards?.badges?.budgetMaster || "Mestre do Orçamento",
      description: t.dashboard.rewards?.badges?.budgetMasterDesc || "3 meses consecutivos abaixo do orçamento",
      icon: Target,
      unlocked: true,
      unlockedAt: "2024-03-01",
      color: "text-green-500"
    },
    {
      id: "efficiency-pro",
      name: t.dashboard.rewards?.badges?.efficiencyPro || "Eficiência Pro",
      description: t.dashboard.rewards?.badges?.efficiencyProDesc || "Reduziu 20% do consumo mensal",
      icon: TrendingDown,
      unlocked: true,
      unlockedAt: "2024-02-20",
      color: "text-blue-500"
    },
    {
      id: "streak-7",
      name: t.dashboard.rewards?.badges?.streak7 || "Semana Verde",
      description: t.dashboard.rewards?.badges?.streak7Desc || "7 dias seguidos abaixo da meta",
      icon: Flame,
      unlocked: true,
      unlockedAt: "2024-03-10",
      color: "text-orange-500"
    },
    {
      id: "eco-warrior",
      name: t.dashboard.rewards?.badges?.ecoWarrior || "Guerreiro Eco",
      description: t.dashboard.rewards?.badges?.ecoWarriorDesc || "Evitou 100kg de CO₂ num ano",
      icon: Award,
      unlocked: false,
      color: "text-emerald-500"
    },
    {
      id: "yearly-champion",
      name: t.dashboard.rewards?.badges?.yearlyChampion || "Campeão Anual",
      description: t.dashboard.rewards?.badges?.yearlyChampionDesc || "Melhor desempenho do ano",
      icon: Trophy,
      unlocked: false,
      color: "text-purple-500"
    },
  ];

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "reduce-5-percent",
      name: t.dashboard.rewards?.challenges?.reduce5 || "Redutor de 5%",
      description: t.dashboard.rewards?.challenges?.reduce5Desc || "Reduzir o consumo em 5% este mês",
      progress: 3.2,
      target: 5,
      unit: "%",
      active: true,
      reward: 500,
      deadline: "31 Jan"
    },
    {
      id: "budget-week",
      name: t.dashboard.rewards?.challenges?.budgetWeek || "Semana Económica",
      description: t.dashboard.rewards?.challenges?.budgetWeekDesc || "Ficar abaixo do orçamento diário por 7 dias",
      progress: 5,
      target: 7,
      unit: "dias",
      active: true,
      reward: 300,
      deadline: "28 Jan"
    },
    {
      id: "off-peak-hero",
      name: t.dashboard.rewards?.challenges?.offPeak || "Herói Fora de Pico",
      description: t.dashboard.rewards?.challenges?.offPeakDesc || "80% do consumo em horário económico",
      progress: 65,
      target: 80,
      unit: "%",
      active: false,
      reward: 400,
      deadline: "31 Jan"
    },
  ]);

  const rewards: Reward[] = [
    // Discounts
    {
      id: "discount-5",
      name: "€5 na Fatura",
      description: "Desconto direto na próxima fatura",
      points: 500,
      icon: CreditCard,
      category: "discount",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      id: "discount-12",
      name: "€12 na Fatura",
      description: "Desconto direto na próxima fatura",
      points: 1000,
      icon: CreditCard,
      category: "discount",
      color: "from-blue-500/20 to-blue-600/10"
    },
    {
      id: "discount-35",
      name: "€35 na Fatura",
      description: "Desconto direto na próxima fatura",
      points: 2500,
      icon: CreditCard,
      category: "discount",
      color: "from-blue-500/20 to-blue-600/10"
    },
    // Vouchers
    {
      id: "coffee",
      name: "Café Grátis",
      description: "Em parceiros locais selecionados",
      points: 300,
      icon: Coffee,
      category: "voucher",
      color: "from-amber-500/20 to-amber-600/10"
    },
    {
      id: "supermarket-10",
      name: "€10 Supermercado",
      description: "Vale em supermercados parceiros",
      points: 800,
      icon: ShoppingBag,
      category: "voucher",
      color: "from-amber-500/20 to-amber-600/10"
    },
    {
      id: "appliance-25",
      name: "€25 Eletrodomésticos",
      description: "Em lojas de eletrodomésticos A+++",
      points: 1500,
      icon: Zap,
      category: "voucher",
      color: "from-amber-500/20 to-amber-600/10"
    },
    // Eco
    {
      id: "plant-tree",
      name: "Plantar 1 Árvore",
      description: "Em parceria com associações ambientais",
      points: 200,
      icon: TreePine,
      category: "eco",
      color: "from-green-500/20 to-green-600/10"
    },
    {
      id: "solar-contribution",
      name: "Painel Solar Comunitário",
      description: "Contribua para energia limpa local",
      points: 1000,
      icon: Sun,
      category: "eco",
      color: "from-green-500/20 to-green-600/10"
    },
    {
      id: "forest-sponsor",
      name: "Patrocinar 1m² Floresta",
      description: "Apoie a reflorestação nacional",
      points: 5000,
      icon: Leaf,
      category: "eco",
      color: "from-green-500/20 to-green-600/10"
    },
    // Experiences
    {
      id: "wind-farm-visit",
      name: "Visita a Parque Eólico",
      description: "Tour guiado exclusivo",
      points: 3000,
      icon: Sparkles,
      category: "experience",
      color: "from-purple-500/20 to-purple-600/10"
    },
    {
      id: "efficiency-workshop",
      name: "Workshop Eficiência",
      description: "Aprenda a poupar mais em casa",
      points: 5000,
      icon: Users,
      category: "experience",
      color: "from-purple-500/20 to-purple-600/10"
    },
  ];

  const toggleChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(c => c.id === challengeId ? { ...c, active: !c.active } : c)
    );
  };

  const redeemReward = (reward: Reward) => {
    if (userPoints >= reward.points) {
      setUserPoints(prev => prev - reward.points);
      toast({
        title: t.dashboard.rewards?.rewardRedeemed || "Recompensa resgatada!",
        description: `${reward.name} - ${t.dashboard.rewards?.checkEmail || "Verifique o seu email para mais detalhes."}`,
      });
    } else {
      toast({
        title: t.dashboard.rewards?.insufficientPoints || "Pontos insuficientes",
        description: t.dashboard.rewards?.needMorePoints || "Continue a poupar para desbloquear esta recompensa.",
        variant: "destructive",
      });
    }
  };

  const pointsToNextLevel = 3000;
  const levelProgress = (userPoints / pointsToNextLevel) * 100;

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

  const getLevelName = (lvl: number) => {
    if (lvl < 3) return { name: "Bronze", color: "text-amber-600" };
    if (lvl < 6) return { name: "Prata", color: "text-slate-400" };
    if (lvl < 10) return { name: "Ouro", color: "text-yellow-500" };
    return { name: "Platina", color: "text-purple-400" };
  };

  const currentTier = getLevelName(level);

  return (
    <div className="space-y-8">
      {/* Header with Points */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">
            {t.dashboard.rewards?.title || "Recompensas"}
          </h2>
          <p className="text-muted-foreground">
            {t.dashboard.rewards?.subtitle || "Acompanhe o seu progresso e conquistas"}
          </p>
        </div>
        <Badge variant="outline" className={`text-sm px-3 py-1 ${currentTier.color}`}>
          <Trophy className="w-4 h-4 mr-1" />
          {t.dashboard.rewards?.tier || "Nível"} {currentTier.name}
        </Badge>
      </div>

      {/* Program Advantages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Gift className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">
                {t.dashboard.rewards?.programAdvantages || "Vantagens do Programa"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.dashboard.rewards?.whyParticipate || "Porque vale a pena participar"}
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="font-medium mb-1">{t.dashboard.rewards?.billDiscounts || "Descontos na Fatura"}</h4>
              <p className="text-sm text-muted-foreground">
                {t.dashboard.rewards?.billDiscountsDesc || "Troque pontos por descontos diretos na sua conta de eletricidade."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
              </div>
              <h4 className="font-medium mb-1">{t.dashboard.rewards?.partnerVouchers || "Vouchers de Parceiros"}</h4>
              <p className="text-sm text-muted-foreground">
                {t.dashboard.rewards?.partnerVouchersDesc || "Use pontos em supermercados, cafés e lojas de eletrodomésticos."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-3">
                <Leaf className="w-5 h-5 text-green-500" />
              </div>
              <h4 className="font-medium mb-1">{t.dashboard.rewards?.ecoImpact || "Impacto Ambiental"}</h4>
              <p className="text-sm text-muted-foreground">
                {t.dashboard.rewards?.ecoImpactDesc || "Contribua para plantar árvores e apoiar energia renovável."}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Points & Level Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    {t.dashboard.rewards?.points || "Pontos de Eficiência"}
                  </p>
                  <p className="text-3xl font-display font-bold text-primary">
                    {userPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t.dashboard.rewards?.level || "Nível"} {level}
                  </span>
                  <span className="text-muted-foreground">
                    {t.dashboard.rewards?.level || "Nível"} {level + 1}
                  </span>
                </div>
                <Progress value={levelProgress} className="h-2" />
                <p className="text-xs text-muted-foreground text-center">
                  {pointsToNextLevel - userPoints} {t.dashboard.rewards?.pointsToLevel || "pontos para o próximo nível"}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.rewards?.streak || "Sequência Atual"}
                </p>
                <p className="text-3xl font-display font-bold">
                  {streak} <span className="text-lg font-normal text-muted-foreground">{t.dashboard.rewards?.days || "dias"}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.dashboard.rewards?.streakDesc || "Dias consecutivos abaixo da meta de consumo"}
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.rewards?.badgesEarned || "Badges Conquistadas"}
                </p>
                <p className="text-3xl font-display font-bold">
                  {unlockedBadges.length} <span className="text-lg font-normal text-muted-foreground">/ {badges.length}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.dashboard.rewards?.keepGoing || "Continue assim para desbloquear mais!"}
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Rewards Catalog */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">
                  {t.dashboard.rewards?.rewardsCatalog || "Catálogo de Recompensas"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.rewards?.redeemPoints || "Troque os seus pontos por recompensas reais"}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="hidden md:flex">
              {userPoints.toLocaleString()} pts {t.dashboard.rewards?.available || "disponíveis"}
            </Badge>
          </div>

          {/* Discounts Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-blue-500 mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              {t.dashboard.rewards?.discountsCategory || "Descontos na Fatura"}
            </h4>
            <div className="grid gap-3 md:grid-cols-3">
              {rewards.filter(r => r.category === "discount").map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${reward.color} border border-blue-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <reward.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.points} pts
                    </Badge>
                  </div>
                  <h5 className="font-medium mb-1">{reward.name}</h5>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{reward.description}</p>
                  <Button
                    size="sm"
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    onClick={() => redeemReward(reward)}
                    disabled={userPoints < reward.points}
                    className="w-full"
                  >
                    {userPoints >= reward.points 
                      ? (t.dashboard.rewards?.redeem || "Trocar")
                      : `${reward.points - userPoints} pts ${t.dashboard.rewards?.missing || "em falta"}`
                    }
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Vouchers Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-amber-500 mb-3 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {t.dashboard.rewards?.vouchersCategory || "Vouchers de Parceiros"}
            </h4>
            <div className="grid gap-3 md:grid-cols-3">
              {rewards.filter(r => r.category === "voucher").map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${reward.color} border border-amber-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <reward.icon className="w-5 h-5 text-amber-500" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.points} pts
                    </Badge>
                  </div>
                  <h5 className="font-medium mb-1">{reward.name}</h5>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{reward.description}</p>
                  <Button
                    size="sm"
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    onClick={() => redeemReward(reward)}
                    disabled={userPoints < reward.points}
                    className="w-full"
                  >
                    {userPoints >= reward.points 
                      ? (t.dashboard.rewards?.redeem || "Trocar")
                      : `${reward.points - userPoints} pts ${t.dashboard.rewards?.missing || "em falta"}`
                    }
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Eco Section */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-green-500 mb-3 flex items-center gap-2">
              <Leaf className="w-4 h-4" />
              {t.dashboard.rewards?.ecoCategory || "Impacto Ambiental"}
            </h4>
            <div className="grid gap-3 md:grid-cols-3">
              {rewards.filter(r => r.category === "eco").map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${reward.color} border border-green-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <reward.icon className="w-5 h-5 text-green-500" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.points} pts
                    </Badge>
                  </div>
                  <h5 className="font-medium mb-1">{reward.name}</h5>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{reward.description}</p>
                  <Button
                    size="sm"
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    onClick={() => redeemReward(reward)}
                    disabled={userPoints < reward.points}
                    className="w-full"
                  >
                    {userPoints >= reward.points 
                      ? (t.dashboard.rewards?.redeem || "Trocar")
                      : `${reward.points - userPoints} pts ${t.dashboard.rewards?.missing || "em falta"}`
                    }
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div>
            <h4 className="text-sm font-medium text-purple-500 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {t.dashboard.rewards?.experiencesCategory || "Experiências Exclusivas"}
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              {rewards.filter(r => r.category === "experience").map((reward) => (
                <motion.div
                  key={reward.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${reward.color} border border-purple-500/20 flex flex-col`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <reward.icon className="w-5 h-5 text-purple-500" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {reward.points} pts
                    </Badge>
                  </div>
                  <h5 className="font-medium mb-1">{reward.name}</h5>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">{reward.description}</p>
                  <Button
                    size="sm"
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    onClick={() => redeemReward(reward)}
                    disabled={userPoints < reward.points}
                    className="w-full"
                  >
                    {userPoints >= reward.points 
                      ? (t.dashboard.rewards?.redeem || "Trocar")
                      : `${reward.points - userPoints} pts ${t.dashboard.rewards?.missing || "em falta"}`
                    }
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Program Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold">
                {t.dashboard.rewards?.programRules || "Regras do Programa"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t.dashboard.rewards?.howToEarnAndSpend || "Como ganhar e usar os seus pontos"}
              </p>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="earn-points">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  {t.dashboard.rewards?.howToEarn || "Como Ganhar Pontos"}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <TrendingDown className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{t.dashboard.rewards?.reduceConsumption || "Reduza o consumo"}</span>
                    </div>
                    <Badge variant="secondary">+50 pts / 1%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{t.dashboard.rewards?.stayOnBudget || "Manter-se no orçamento"}</span>
                    </div>
                    <Badge variant="secondary">+100 pts / dia</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">{t.dashboard.rewards?.completeChallenges || "Complete desafios"}</span>
                    </div>
                    <Badge variant="secondary">+300-500 pts</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">{t.dashboard.rewards?.offPeakUsage || "Consumo fora de pico"}</span>
                    </div>
                    <Badge variant="secondary">+20 pts / kWh</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-pink-500" />
                      <span className="text-sm">{t.dashboard.rewards?.referFriends || "Referir amigos"}</span>
                    </div>
                    <Badge variant="secondary">+1000 pts</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="levels">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  {t.dashboard.rewards?.levelsAndBenefits || "Níveis e Benefícios"}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div>
                      <span className="font-medium text-amber-600">Bronze</span>
                      <p className="text-xs text-muted-foreground">0 - 1.000 pts</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{t.dashboard.rewards?.basicAccess || "Acesso básico"}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                    <div>
                      <span className="font-medium text-slate-400">Prata</span>
                      <p className="text-xs text-muted-foreground">1.000 - 5.000 pts</p>
                    </div>
                    <Badge variant="outline" className="text-xs">+10% {t.dashboard.rewards?.inRewards || "em recompensas"}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <div>
                      <span className="font-medium text-yellow-500">Ouro</span>
                      <p className="text-xs text-muted-foreground">5.000 - 15.000 pts</p>
                    </div>
                    <Badge variant="outline" className="text-xs">+25% + {t.dashboard.rewards?.exclusive || "exclusivos"}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div>
                      <span className="font-medium text-purple-400">Platina</span>
                      <p className="text-xs text-muted-foreground">15.000+ pts</p>
                    </div>
                    <Badge variant="outline" className="text-xs">+50% + {t.dashboard.rewards?.events || "eventos"}</Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="conditions">
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  {t.dashboard.rewards?.termsAndConditions || "Condições e Validade"}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{t.dashboard.rewards?.pointsExpiry || "Pontos expiram após 12 meses de inatividade"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Percent className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{t.dashboard.rewards?.minimumRedeem || "Mínimo de 200 pontos para trocar recompensas"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{t.dashboard.rewards?.voucherValidity || "Vouchers válidos por 6 meses após resgate"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>{t.dashboard.rewards?.nonTransferable || "Pontos e recompensas são pessoais e intransferíveis"}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </motion.div>

      {/* Monthly Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-display font-semibold">
                  {t.dashboard.rewards?.monthlyChallenges || "Desafios Mensais"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.rewards?.challengesSubtitle || "Ative desafios e ganhe pontos extra"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`p-4 rounded-xl border transition-all ${
                  challenge.active 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/30 border-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{challenge.name}</h4>
                      <Badge variant={challenge.active ? "default" : "secondary"} className="text-xs">
                        +{challenge.reward} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                    {challenge.active && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{challenge.progress}{challenge.unit} / {challenge.target}{challenge.unit}</span>
                          <span className="text-muted-foreground">
                            {t.dashboard.rewards?.until || "Até"} {challenge.deadline}
                          </span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.target) * 100} 
                          className="h-2"
                        />
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={challenge.active}
                    onCheckedChange={() => toggleChallenge(challenge.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Badges */}
      <div className="space-y-6">
        {/* Unlocked Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-display font-semibold">
                  {t.dashboard.rewards?.unlockedBadges || "Badges Desbloqueadas"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.dashboard.rewards?.yourAchievements || "As suas conquistas"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {unlockedBadges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10 text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-background flex items-center justify-center ${badge.color}`}>
                    <badge.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {badge.unlockedAt && (
                    <div className="flex items-center justify-center gap-1 mt-2 text-xs text-primary">
                      <CheckCircle2 className="w-3 h-3" />
                      {new Date(badge.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                  <Lock className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">
                    {t.dashboard.rewards?.lockedBadges || "Por Desbloquear"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.dashboard.rewards?.keepGoing || "Continue assim para desbloquear mais!"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {lockedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-xl bg-muted/30 border border-transparent text-center opacity-60"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* B2B Section - For Energy Companies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/20">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">
                    {t.dashboard.rewards?.forEnergyCompanies || "Para Empresas de Energia"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t.dashboard.rewards?.b2bSubtitle || "Implemente gamificação na sua empresa"}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingDown className="w-3 h-3 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.dashboard.rewards?.roiTitle || "ROI Comprovado"}</p>
                    <p className="text-xs text-muted-foreground">{t.dashboard.rewards?.roiDesc || "8-15% redução em picos"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-3 h-3 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.dashboard.rewards?.loyaltyTitle || "Fidelização"}</p>
                    <p className="text-xs text-muted-foreground">{t.dashboard.rewards?.loyaltyDesc || "+40% retenção de clientes"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="w-3 h-3 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{t.dashboard.rewards?.esgTitle || "Metas ESG"}</p>
                    <p className="text-xs text-muted-foreground">{t.dashboard.rewards?.esgDesc || "Relatórios de sustentabilidade"}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {t.dashboard.rewards?.b2bDescription || "Solução white-label com API completa para integração com sistemas de faturação existentes. Personalização total da marca e recompensas."}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="hero" className="gap-2">
                {t.dashboard.rewards?.contactSales || "Contactar Vendas"}
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                {t.dashboard.rewards?.downloadBrochure || "Descarregar Brochura"}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
