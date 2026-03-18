// src/app/pages/Transactions.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowUpRight, ArrowDownLeft, Search, Filter, 
  Calendar, Download, ChevronLeft, ChevronRight 
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Transactions() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, income, expense

  // Dados mockados
  const allTransactions = [
    { id: 1, description: "Salary Deposit", amount: 3500.00, date: "2024-03-15", type: "income", category: "Salary" },
    { id: 2, description: "Netflix Subscription", amount: -15.99, date: "2024-03-18", type: "expense", category: "Entertainment" },
    { id: 3, description: "Amazon Purchase", amount: -89.90, date: "2024-03-14", type: "expense", category: "Shopping" },
    { id: 4, description: "Uber Ride", amount: -23.50, date: "2024-03-13", type: "expense", category: "Transport" },
    { id: 5, description: "Restaurant", amount: -45.80, date: "2024-03-12", type: "expense", category: "Food" },
    { id: 6, description: "Freelance Payment", amount: 850.00, date: "2024-03-10", type: "income", category: "Freelance" },
    { id: 7, description: "Gym Membership", amount: -49.90, date: "2024-03-05", type: "expense", category: "Health" },
    { id: 8, description: "Transfer to Savings", amount: -500.00, date: "2024-03-01", type: "expense", category: "Savings" },
  ];

  // Filtrar transações
  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" ? true : transaction.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-foreground">Transactions</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold flex items-center gap-2"
        >
          <Download size={18} />
          Export
        </motion.button>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                filter === "all" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-input-background text-muted-foreground hover:bg-accent"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("income")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                filter === "income" 
                  ? "bg-green-600 text-white" 
                  : "bg-input-background text-muted-foreground hover:bg-accent"
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilter("expense")}
              className={`px-4 py-2 rounded-xl font-bold transition-colors ${
                filter === "expense" 
                  ? "bg-red-600 text-white" 
                  : "bg-input-background text-muted-foreground hover:bg-accent"
              }`}
            >
              Expenses
            </button>
          </div>

          {/* Filtro de data */}
          <button className="flex items-center gap-2 px-4 py-2 bg-input-background rounded-xl text-muted-foreground hover:bg-accent transition-colors">
            <Calendar size={18} />
            <span className="font-bold">This Month</span>
          </button>
        </div>
      </div>

      {/* Lista de Transações */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="space-y-4">
          {filteredTransactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' 
                    ? <ArrowDownLeft size={20} className="text-green-600" />
                    : <ArrowUpRight size={20} className="text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-bold text-foreground">{transaction.description}</p>
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>{transaction.date}</span>
                    <span>•</span>
                    <span>{transaction.category}</span>
                  </div>
                </div>
              </div>
              <p className={`text-xl font-black ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Paginação */}
        <div className="flex justify-between items-center mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing 1-{filteredTransactions.length} of {allTransactions.length} transactions
          </p>
          <div className="flex gap-2">
            <button className="p-2 rounded-xl bg-input-background text-muted-foreground hover:bg-accent transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 rounded-xl bg-input-background text-muted-foreground hover:bg-accent transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}