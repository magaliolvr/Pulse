import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Zap, 
  TrendingUp,
  Settings,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "warning" | "success" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialAlerts: Alert[] = [
  {
    id: "1",
    type: "warning",
    title: "Consumo acima da média",
    message: "O seu consumo hoje está 25% acima da média semanal. Verifique dispositivos ligados.",
    time: "Há 2 horas",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Meta semanal atingida!",
    message: "Parabéns! Economizou €12 esta semana comparado com a semana anterior.",
    time: "Há 5 horas",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Dica de poupança",
    message: "Sabia que desligar dispositivos em standby pode poupar até €50/ano?",
    time: "Há 1 dia",
    read: true,
  },
  {
    id: "4",
    type: "warning",
    title: "Pico de consumo detectado",
    message: "Detectámos um pico de consumo às 19h. Considere redistribuir o uso de eletrodomésticos.",
    time: "Há 2 dias",
    read: true,
  },
  {
    id: "5",
    type: "success",
    title: "Redução mensal confirmada",
    message: "Este mês consumiu menos 18% do que o mês anterior. Continue assim!",
    time: "Há 3 dias",
    read: true,
  },
];

const alertSettings = [
  { id: "consumption", label: "Alertas de consumo elevado", enabled: true },
  { id: "savings", label: "Metas de poupança", enabled: true },
  { id: "tips", label: "Dicas de eficiência", enabled: true },
  { id: "peak", label: "Picos de consumo", enabled: false },
  { id: "budget", label: "Alertas de orçamento", enabled: true },
];

export const AlertsScreen = () => {
  const { t } = useLanguage();
  const [alerts, setAlerts] = useState(initialAlerts);
  const [settings, setSettings] = useState(alertSettings);
  const [showSettings, setShowSettings] = useState(false);

  const unreadCount = alerts.filter((a) => !a.read).length;

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "info":
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getAlertBg = (type: Alert["type"], read: boolean) => {
    if (read) return "bg-card";
    switch (type) {
      case "warning":
        return "bg-warning/5 border-warning/20";
      case "success":
        return "bg-success/5 border-success/20";
      case "info":
        return "bg-primary/5 border-primary/20";
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map((a) => ({ ...a, read: true })));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  const toggleSetting = (id: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold">{t.dashboard.menu.alerts}</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} ${t.dashboard.alerts.unreadAlerts}` : t.dashboard.alerts.noNewAlerts}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowSettings(!showSettings)}>
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Marcar tudo como lido
            </Button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="p-4 bg-card rounded-xl border border-border/50"
        >
          <h3 className="font-semibold mb-4">Preferências de Notificação</h3>
          <div className="space-y-3">
            {settings.map((setting) => (
              <div key={setting.id} className="flex items-center justify-between">
                <span className="text-sm">{setting.label}</span>
                <Switch
                  checked={setting.enabled}
                  onCheckedChange={() => toggleSetting(setting.id)}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Não há alertas no momento</p>
          </div>
        ) : (
          alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "p-4 rounded-xl border transition-all cursor-pointer",
                getAlertBg(alert.type, alert.read),
                !alert.read && "shadow-sm"
              )}
              onClick={() => markAsRead(alert.id)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn("font-medium", !alert.read && "font-semibold")}>
                      {alert.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissAlert(alert.id);
                        }}
                        className="p-1 hover:bg-secondary rounded-full transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
          <Zap className="w-6 h-6 text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold">3</p>
          <p className="text-sm text-muted-foreground">Alertas esta semana</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
          <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-2xl font-bold">87%</p>
          <p className="text-sm text-muted-foreground">Metas cumpridas</p>
        </div>
        <div className="p-4 bg-card rounded-xl border border-border/50 text-center">
          <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-sm text-muted-foreground">Ações tomadas</p>
        </div>
      </motion.div>
    </div>
  );
};
