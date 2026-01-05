import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  Calculator,
  Leaf,
  LineChart,
  Lightbulb,
  Target,
  Wallet
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const featureIcons = [
  LineChart,
  Calculator,
  BarChart3,
  Bell,
  Target,
  Leaf,
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  const { t } = useLanguage();

  return (
    <section className="max-[600px]:py-12 py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-[600px]:mb-12 text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
          >
            {t.features.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t.features.description}
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index] || Lightbulb;
            return (
              <motion.div
                key={index}
                variants={item}
                className="group p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
