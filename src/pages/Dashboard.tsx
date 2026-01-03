import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  ChevronDown, 
  Home, 
  Leaf, 
  LineChart, 
  Menu,
  Settings,
  Wallet, 
  Zap,
  AlertCircle,
  RefreshCw,
  LogOut,
  User,
  Database
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OverviewScreen } from "@/components/dashboard/OverviewScreen";
import { AnalyticsScreen } from "@/components/dashboard/AnalyticsScreen";
import { FinancesScreen } from "@/components/dashboard/FinancesScreen";
import { ImpactScreen } from "@/components/dashboard/ImpactScreen";
import { AlertsScreen } from "@/components/dashboard/AlertsScreen";
import { SettingsScreen } from "@/components/dashboard/SettingsScreen";
import { DataScreen, DataSource, ManualDataEntry } from "@/components/dashboard/DataScreen";
import { getInitials } from "@/utils/formatters";
import { DEFAULT_PLAN } from "@/constants/plans";
import { ROUTES } from "@/constants/routes";

type DashboardScreen = "overview" | "analytics" | "finances" | "impact" | "alerts" | "settings" | "data";

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { profile, signOut } = useAuth();
  
  const plan = profile?.subscription_plan || DEFAULT_PLAN;
  const [activeScreen, setActiveScreen] = useState<DashboardScreen>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource>("simulated");
  const [manualData, setManualData] = useState<ManualDataEntry[]>([]);

  const handleRetry = () => {
    setError(false);
    setActiveScreen("overview");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  const menuItems: { id: DashboardScreen; icon: typeof Home; label: string }[] = [
    { id: "overview", icon: Home, label: t.dashboard.menu.overview },
    { id: "analytics", icon: LineChart, label: t.dashboard.menu.analytics },
    { id: "finances", icon: Wallet, label: t.dashboard.kpi.cost.title },
    { id: "impact", icon: Leaf, label: t.features.items[5]?.title || "Impacto" },
    { id: "alerts", icon: Bell, label: t.dashboard.menu.alerts },
    { id: "data", icon: Database, label: "Dados" },
    { id: "settings", icon: Settings, label: t.dashboard.menu.settings },
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case "overview":
        return <OverviewScreen dataSource={dataSource} manualData={manualData} />;
      case "analytics":
        return <AnalyticsScreen dataSource={dataSource} manualData={manualData} />;
      case "finances":
        return <FinancesScreen dataSource={dataSource} manualData={manualData} />;
      case "impact":
        return <ImpactScreen />;
      case "alerts":
        return <AlertsScreen />;
      case "data":
        return (
          <DataScreen 
            dataSource={dataSource}
            onDataSourceChange={setDataSource}
            manualData={manualData}
            onManualDataChange={setManualData}
          />
        );
      case "settings":
        return <SettingsScreen />;
      default:
        return <OverviewScreen dataSource={dataSource} manualData={manualData} />;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">{t.dashboard.error.title}</h2>
          <p className="text-muted-foreground mb-6">
            {t.dashboard.error.description}
          </p>
          <Button variant="hero" onClick={handleRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.dashboard.error.retry}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 256 : 72 }}
        className="bg-card border-r border-border flex flex-col fixed h-full z-40"
      >
        <div className="p-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            {sidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-display font-bold text-xl gradient-text"
              >
                Pulse
              </motion.span>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                activeScreen === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarOpen ? 256 : 72 }}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold">
                {profile?.full_name 
                  ? `${t.dashboard.welcomeUser} ${profile.full_name.split(" ")[0]}!`
                  : t.dashboard.welcome
                }
              </h1>
              <p className="text-muted-foreground text-sm">
                {t.dashboard.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10">
                <span className="text-sm font-medium text-primary">{plan}</span>
                {plan !== "Free" && (
                  <ChevronDown className="w-4 h-4 text-primary" />
                )}
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 rounded-full gradient-hero flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {profile?.full_name ? getInitials(profile.full_name) : <User className="w-4 h-4" />}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="font-medium text-sm">{profile?.full_name}</p>
                    <p className="text-xs text-muted-foreground">{profile?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.HOME} className="cursor-pointer">
                      <Home className="w-4 h-4 mr-2" />
                      {t.nav.home}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.dashboard.signOut}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
