import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/i18n/LanguageContext";
import { 
  Database, 
  FileSpreadsheet, 
  PenLine, 
  Upload, 
  CheckCircle2,
  Plus,
  Trash2,
  Info
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export type DataSource = "simulated" | "manual" | "csv";

export interface ManualDataEntry {
  id: string;
  month: string;
  consumption: number;
  cost: number;
}

interface DataScreenProps {
  dataSource: DataSource;
  onDataSourceChange: (source: DataSource) => void;
  manualData: ManualDataEntry[];
  onManualDataChange: (data: ManualDataEntry[]) => void;
}

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function DataScreen({ 
  dataSource, 
  onDataSourceChange, 
  manualData, 
  onManualDataChange 
}: DataScreenProps) {
  const { t } = useLanguage();
  const [newEntry, setNewEntry] = useState({
    month: "",
    consumption: "",
    cost: ""
  });

  const handleAddEntry = () => {
    if (!newEntry.month || !newEntry.consumption || !newEntry.cost) {
      toast.error("Preencha todos os campos");
      return;
    }

    const entry: ManualDataEntry = {
      id: Date.now().toString(),
      month: newEntry.month,
      consumption: parseFloat(newEntry.consumption),
      cost: parseFloat(newEntry.cost)
    };

    onManualDataChange([...manualData, entry]);
    setNewEntry({ month: "", consumption: "", cost: "" });
    toast.success("Dados adicionados com sucesso!");
  };

  const handleRemoveEntry = (id: string) => {
    onManualDataChange(manualData.filter(entry => entry.id !== id));
    toast.success("Entrada removida");
  };

  const handleFileUpload = () => {
    toast.info("Funcionalidade de importação em desenvolvimento");
  };

  const dataSourceOptions = [
    {
      id: "simulated" as DataSource,
      icon: Database,
      title: "Dados Simulados",
      description: "Dados de exemplo para demonstração"
    },
    {
      id: "manual" as DataSource,
      icon: PenLine,
      title: "Inserção Manual",
      description: "Adicione seus dados manualmente"
    },
    {
      id: "csv" as DataSource,
      icon: FileSpreadsheet,
      title: "Importar Ficheiro",
      description: "Importe dados de um ficheiro CSV"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header explicativo */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">De onde vêm os seus dados</CardTitle>
              <CardDescription>
                Os dados exibidos no painel podem ter origem em diferentes fontes. 
                Escolha a fonte que melhor se adequa à sua situação.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Seletor de fonte de dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Fonte de Dados
          </CardTitle>
          <CardDescription>
            Selecione de onde pretende obter os dados de consumo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={dataSource} 
            onValueChange={(value) => onDataSourceChange(value as DataSource)}
            className="grid gap-4 md:grid-cols-3"
          >
            {dataSourceOptions.map((option) => (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Label
                  htmlFor={option.id}
                  className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    dataSource === option.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    dataSource === option.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{option.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                  </div>
                  {dataSource === option.id && (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  )}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Fonte ativa */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <span className="font-medium">Fonte ativa:</span>
            <span className="text-muted-foreground">
              {dataSourceOptions.find(o => o.id === dataSource)?.title}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Formulário de inserção manual */}
      {dataSource === "manual" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenLine className="w-5 h-5 text-primary" />
                Inserir Dados Manualmente
              </CardTitle>
              <CardDescription>
                Adicione os dados de consumo e custo por mês
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Formulário */}
              <div className="grid gap-4 md:grid-cols-4 items-end">
                <div className="space-y-2">
                  <Label htmlFor="month">Mês</Label>
                  <Select 
                    value={newEntry.month} 
                    onValueChange={(value) => setNewEntry({...newEntry, month: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="consumption">Consumo (kWh)</Label>
                  <Input
                    id="consumption"
                    type="number"
                    placeholder="Ex: 250"
                    value={newEntry.consumption}
                    onChange={(e) => setNewEntry({...newEntry, consumption: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cost">Custo (€)</Label>
                  <Input
                    id="cost"
                    type="number"
                    placeholder="Ex: 45"
                    value={newEntry.cost}
                    onChange={(e) => setNewEntry({...newEntry, cost: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddEntry} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Adicionar
                </Button>
              </div>

              {/* Lista de dados inseridos */}
              {manualData.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground">Dados inseridos</h4>
                  <div className="space-y-2">
                    {manualData.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                      >
                        <div className="flex items-center gap-6">
                          <span className="font-medium w-24">{entry.month}</span>
                          <span className="text-muted-foreground">{entry.consumption} kWh</span>
                          <span className="text-primary font-medium">€ {entry.cost.toFixed(2)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveEntry(entry.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {manualData.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <PenLine className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum dado inserido ainda</p>
                  <p className="text-sm">Use o formulário acima para adicionar dados</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Importação de ficheiro */}
      {dataSource === "csv" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary" />
                Importar Ficheiro CSV
              </CardTitle>
              <CardDescription>
                Importe os seus dados a partir de um ficheiro CSV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={handleFileUpload}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">Clique para selecionar um ficheiro</p>
                <p className="text-sm text-muted-foreground">ou arraste e largue aqui</p>
                <p className="text-xs text-muted-foreground mt-4">
                  Formatos suportados: CSV, XLSX
                </p>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  <strong>Nota:</strong> O ficheiro deve conter as colunas: Mês, Consumo (kWh), Custo (€)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Info sobre dados simulados */}
      {dataSource === "simulated" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Dados Simulados
              </CardTitle>
              <CardDescription>
                A utilizar dados de exemplo para demonstração
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 rounded-xl bg-secondary/50 text-center">
                <Database className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
                <p className="font-medium mb-2">Modo de demonstração ativo</p>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  Os gráficos e KPIs do painel estão a mostrar dados simulados. 
                  Para usar os seus próprios dados, selecione "Inserção Manual" ou "Importar Ficheiro".
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
