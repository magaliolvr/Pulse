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

const features = [
  {
    icon: LineChart,
    title: "Real-time Monitoring",
    description: "Track your energy consumption as it happens with live updates and instant insights.",
  },
  {
    icon: Calculator,
    title: "Budget Tracking",
    description: "Set monthly budgets and get alerts before you exceed your energy spending limits.",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Understand your consumption patterns with detailed charts and historical comparisons.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Receive notifications for unusual consumption spikes or when approaching budget limits.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and track savings goals with personalized recommendations to achieve them.",
  },
  {
    icon: Leaf,
    title: "Eco Impact",
    description: "See your environmental impact and carbon footprint reduction over time.",
  },
  {
    icon: Lightbulb,
    title: "Smart Tips",
    description: "Get personalized tips based on your usage patterns to save more energy.",
  },
  {
    icon: Wallet,
    title: "Cost Predictions",
    description: "Accurate bill predictions so you're never surprised by your energy costs.",
  },
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
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold mb-4"
          >
            Everything you need to save energy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful tools designed to help you understand and optimize your 
            energy consumption for a more sustainable lifestyle.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group p-6 bg-card rounded-2xl shadow-soft border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
