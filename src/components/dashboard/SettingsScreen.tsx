import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/hooks/useAuth";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  ChevronRight,
  Mail,
  Phone,
  Home as HomeIcon,
  Save,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SettingsSection = "profile" | "notifications" | "security" | "billing" | "help";

export const SettingsScreen = () => {
  const { t } = useLanguage();
  const { profile, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<SettingsSection>("profile");
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    monthly_budget: profile?.monthly_budget || 100,
    household_size: profile?.household_size || 1,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    weekly: true,
    monthly: true,
  });

  const menuItems = [
    { id: "profile" as const, icon: User, label: "Perfil" },
    { id: "notifications" as const, icon: Bell, label: "Notificações" },
    { id: "security" as const, icon: Shield, label: "Segurança" },
    { id: "billing" as const, icon: CreditCard, label: "Faturação" },
    { id: "help" as const, icon: HelpCircle, label: "Ajuda" },
  ];

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await updateProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        monthly_budget: formData.monthly_budget,
        household_size: formData.household_size,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={formData.email}
                    disabled
                    className="bg-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telemóvel</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+351 912 345 678"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="household">Agregado familiar</Label>
                  <Input
                    id="household"
                    type="number"
                    min={1}
                    max={10}
                    value={formData.household_size}
                    onChange={(e) => setFormData({ ...formData, household_size: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Preferências de Energia</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento mensal (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.monthly_budget}
                    onChange={(e) => setFormData({ ...formData, monthly_budget: parseInt(e.target.value) })}
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleSaveProfile} disabled={saving}>
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Guardar alterações
            </Button>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Canais de Notificação</h3>
            <div className="space-y-4">
              {[
                { key: "email", label: "Notificações por email", icon: Mail },
                { key: "push", label: "Notificações push", icon: Bell },
                { key: "sms", label: "Notificações por SMS", icon: Phone },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <span>{item.label}</span>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold">Relatórios</h3>
            <div className="space-y-4">
              {[
                { key: "weekly", label: "Resumo semanal" },
                { key: "monthly", label: "Relatório mensal" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <span>{item.label}</span>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Segurança da Conta</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">Alterar palavra-passe</p>
                  <p className="text-sm text-muted-foreground">Última alteração há 3 meses</p>
                </div>
                <Button variant="outline" size="sm">Alterar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">Autenticação de dois fatores</p>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline" size="sm">Configurar</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="font-medium">Sessões ativas</p>
                  <p className="text-sm text-muted-foreground">2 dispositivos conectados</p>
                </div>
                <Button variant="outline" size="sm">Ver</Button>
              </div>
            </div>
          </div>
        );

      case "billing":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Plano Atual</h3>
            <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{profile?.subscription_plan || "Free"}</p>
                  <p className="text-muted-foreground">
                    {profile?.subscription_plan === "Free" 
                      ? "Plano gratuito com funcionalidades básicas"
                      : "Acesso a todas as funcionalidades premium"}
                  </p>
                </div>
                <Button variant="hero">Fazer upgrade</Button>
              </div>
            </div>

            <h3 className="text-lg font-semibold">Método de Pagamento</h3>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-muted-foreground" />
                <div>
                  <p className="font-medium">Nenhum método configurado</p>
                  <p className="text-sm text-muted-foreground">Adicione um cartão para fazer upgrade</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "help":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Centro de Ajuda</h3>
            <div className="space-y-3">
              {[
                { title: "Perguntas frequentes", desc: "Respostas às dúvidas mais comuns" },
                { title: "Guia de utilização", desc: "Aprenda a usar todas as funcionalidades" },
                { title: "Contactar suporte", desc: "Fale com a nossa equipa" },
                { title: "Reportar problema", desc: "Informe-nos sobre bugs ou erros" },
              ].map((item) => (
                <button
                  key={item.title}
                  className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors text-left"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold">{t.dashboard.menu.settings}</h2>
        <p className="text-muted-foreground">Gerencie a sua conta e preferências</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Settings Menu */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left",
                activeSection === item.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-secondary text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 p-6 bg-card rounded-2xl border border-border/50"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
};
