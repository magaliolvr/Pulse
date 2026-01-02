import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export function CTA() {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16 text-center"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
              {t.cta.title}
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                asChild
              >
                <Link to="/onboarding">
                  {t.cta.primaryCta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-primary-foreground hover:bg-white/10"
                asChild
              >
                <Link to="/pricing">{t.cta.secondaryCta}</Link>
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-6">
              {t.cta.noCreditCard}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
