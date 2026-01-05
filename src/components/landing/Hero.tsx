import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingDown, Zap, Shield, Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

// Import diverse family photos
import familyMotherDaughter from "@/assets/family-mother-daughter.jpg";
import coupleDiverse from "@/assets/couple-diverse.jpg";
import seniorsWithPet from "@/assets/seniors-with-pet.jpg";

export function Hero() {
  const { t } = useLanguage();

  const testimonialImages = [
    { src: familyMotherDaughter, alt: "Mãe e filha felizes" },
    { src: coupleDiverse, alt: "Casal diverso a usar tablet" },
    { src: seniorsWithPet, alt: "Casal sénior com animais de estimação" },
  ];

  return (
    <section className="relative pt-28 pb-20 overflow-hidden">
      {/* Nature-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px]" />
      <div className="absolute top-32 right-1/4 w-[400px] h-[400px] bg-success/8 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="text-left">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Leaf className="w-4 h-4" />
              {t.hero.badge}
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
            >
              {t.hero.title}{" "}
              <span className="gradient-text">{t.hero.titleHighlight}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-foreground/70 max-w-xl mb-8"
            >
              {t.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-8"
            >
              <Button variant="hero" size="xl" asChild>
                <Link to="/onboarding">
                  {t.hero.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/pricing">{t.hero.secondaryCta}</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="max-[600px]:justify-center flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span>Dados seguros</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-success" />
                <span>100% Verde</span>
              </div>
              <span className="text-muted-foreground/60">{t.hero.noCreditCard}</span>
            </motion.div>
          </div>

          {/* Right column - Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Main photo grid */}
            <div className="relative">
              {/* Large featured photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-nature"
              >
                <img
                  src={familyMotherDaughter}
                  alt="Mãe e filha felizes a poupar energia"
                  className="w-full h-[320px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass-card rounded-xl p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">-23% consumo</p>
                      <p className="text-xs text-muted-foreground">Este mês</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Secondary photos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="absolute -bottom-8 -left-8 z-20 w-48 rounded-xl overflow-hidden shadow-soft border-4 border-background"
              >
                <img
                  src={coupleDiverse}
                  alt="Casal diverso a gerir energia"
                  className="w-full h-32 object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-6 -right-4 z-20 w-44 rounded-xl overflow-hidden shadow-soft border-4 border-background"
              >
                <img
                  src={seniorsWithPet}
                  alt="Casal sénior com animais"
                  className="w-full h-28 object-cover"
                />
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-12 left-8 w-20 h-20 bg-success/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-12 right-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Stats - Below on mobile, integrated on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mt-16 lg:mt-20"
        >
          {[
            { icon: TrendingDown, value: "23%", label: t.hero.stats.savings, color: "text-success" },
            { icon: Zap, value: "50K+", label: t.hero.stats.users, color: "text-primary" },
            { icon: Sparkles, value: "4.9★", label: t.hero.stats.rating, color: "text-warning" },
          ].map((stat, index) => (
            <div key={index} className="text-center lg:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-bold font-display">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
