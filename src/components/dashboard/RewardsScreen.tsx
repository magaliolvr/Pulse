import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
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
  Lock
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useState } from "react";

interface Badge {
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

export function RewardsScreen() {
  const { t } = useLanguage();
  
  // Simulated user points and data
  const [userPoints] = useState(2450);
  const [level] = useState(5);
  const [streak] = useState(12);
  
  const badges: Badge[] = [
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

  const toggleChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(c => c.id === challengeId ? { ...c, active: !c.active } : c)
    );
  };

  const pointsToNextLevel = 3000;
  const levelProgress = (userPoints / pointsToNextLevel) * 100;

  const unlockedBadges = badges.filter(b => b.unlocked);
  const lockedBadges = badges.filter(b => !b.unlocked);

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
      </div>

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

      {/* Monthly Challenges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
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

      {/* How Points Work */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card className="p-6 bg-gradient-to-br from-muted/50 to-transparent">
          <h3 className="font-display font-semibold mb-4">
            {t.dashboard.rewards?.howItWorks || "Como funcionam os pontos?"}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t.dashboard.rewards?.reduceConsumption || "Reduza o consumo"}
                </p>
                <p className="text-xs text-muted-foreground">
                  +50 pts {t.dashboard.rewards?.perPercent || "por cada % reduzido"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t.dashboard.rewards?.stayBudget || "Fique no orçamento"}
                </p>
                <p className="text-xs text-muted-foreground">
                  +100 pts {t.dashboard.rewards?.perDay || "por dia abaixo da meta"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-sm">
                  {t.dashboard.rewards?.completeChallenges || "Complete desafios"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t.dashboard.rewards?.bonusPoints || "Bónus variável por desafio"}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}