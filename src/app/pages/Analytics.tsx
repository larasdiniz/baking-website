// src/app/pages/Analytics.tsx
import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, TrendingDown, PieChart, BarChart3,
  Calendar, Download, ArrowUpRight, ArrowDownLeft 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Analytics() {
  const { user } = useAuth();

  // Dados mockados para gráficos
  const monthlyData = [
    { month: "Jan", income: 3200, expenses: 2100 },
    { month: "Feb", income: 3400, expenses: 2300 },
    { month: "Mar", income: 3500, expenses: 1900 },
    { month: "Apr", income: 3800, expenses: 2400 },
    { month: "May", income: 3600, expenses: 2200 },
    { month: "Jun", income: 3900, expenses: 2100 },
  ];

  const categorySpending = [
    { category: "Housing", amount: 1200, color: "bg-blue-500" },
    { category: "Food", amount: 450, color: "bg-green-500" },
    { category: "Transport", amount: 320, color: "bg-yellow-500" },
    { category: "Entertainment", amount: 280, color: "bg-purple-500" },
    { category: "Shopping", amount: 420, color: "bg-pink-500" },
    { category: "Others", amount: 180, color: "bg-gray-500" },
  ];

  const totalSpending = categorySpending.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-foreground">Analytics</h1>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 bg-input-background rounded-xl text-muted-foreground hover:bg-accent transition-colors flex items-center gap-2"
          >
            <Calendar size={18} />
            <span className="font-bold">Last 6 months</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold flex items-center gap-2"
          >
            <Download size={18} />
            Report
          </motion.button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp size={24} className="text-green-600" />
            </div>
            <span className="text-green-600 font-bold">+8.2%</span>
          </div>
          <p className="text-2xl font-black text-foreground">$21,240</p>
          <p className="text-sm text-muted-foreground">Total Income (6mo)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <TrendingDown size={24} className="text-red-600" />
            </div>
            <span className="text-red-600 font-bold">-2.1%</span>
          </div>
          <p className="text-2xl font-black text-foreground">$13,080</p>
          <p className="text-sm text-muted-foreground">Total Expenses (6mo)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <PieChart size={24} className="text-primary" />
            </div>
            <span className="text-primary font-bold">38%</span>
          </div>
          <p className="text-2xl font-black text-foreground">$8,160</p>
          <p className="text-sm text-muted-foreground">Savings Rate</p>
        </motion.div>
      </div>

      {/* Gráfico de Barras (simulado) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-foreground">Monthly Overview</h2>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground">Income</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-sm text-muted-foreground">Expenses</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {monthlyData.map((month) => (
            <div key={month.month} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-foreground">{month.month}</span>
                <span className="text-muted-foreground">
                  ${month.income} / ${month.expenses}
                </span>
              </div>
              <div className="h-8 flex gap-1">
                <div 
                  className="h-full bg-green-500 rounded-l-xl"
                  style={{ width: `${(month.income / 4000) * 100}%` }}
                />
                <div 
                  className="h-full bg-red-500 rounded-r-xl"
                  style={{ width: `${(month.expenses / 4000) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Spending by Category */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-6">Spending by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lista de categorias */}
          <div className="space-y-4">
            {categorySpending.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-foreground">{category.category}</span>
                  <span className="text-muted-foreground">
                    ${category.amount} ({Math.round((category.amount / totalSpending) * 100)}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${category.color}`}
                    style={{ width: `${(category.amount / totalSpending) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico de Pizza Simulado */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-blue-500" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }} />
              <div className="absolute inset-0 rounded-full border-8 border-green-500" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 30%, 50% 30%)" }} />
              <div className="absolute inset-0 rounded-full border-8 border-yellow-500" style={{ clipPath: "polygon(50% 30%, 100% 30%, 100% 60%, 50% 60%)" }} />
              <div className="absolute inset-0 rounded-full border-8 border-purple-500" style={{ clipPath: "polygon(50% 60%, 100% 60%, 100% 85%, 50% 85%)" }} />
              <div className="absolute inset-0 rounded-full border-8 border-pink-500" style={{ clipPath: "polygon(50% 85%, 100% 85%, 100% 100%, 50% 100%)" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-black text-foreground">100%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}