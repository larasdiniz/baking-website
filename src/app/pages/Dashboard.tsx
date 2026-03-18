// src/app/pages/Dashboard.tsx
import React from "react";
import { motion } from "motion/react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Wallet, TrendingUp } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user } = useAuth();

  const recentTransactions = [
    { id: 1, description: "Netflix Subscription", amount: -15.99, date: "2024-03-18", type: "expense" },
    { id: 2, description: "Salary Deposit", amount: 3500.00, date: "2024-03-15", type: "income" },
    { id: 3, description: "Amazon Purchase", amount: -89.90, date: "2024-03-14", type: "expense" },
    { id: 4, description: "Uber Ride", amount: -23.50, date: "2024-03-13", type: "expense" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-foreground">Dashboard</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-primary to-destructive p-6 rounded-2xl text-white"
        >
          <p className="text-sm opacity-90 mb-2">Total Balance</p>
          <p className="text-3xl font-black mb-4">
            ${user?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp size={16} />
            <span>+2.5% from last month</span>
          </div>
        </motion.div>

        {/* Income Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <ArrowDownLeft size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-xl font-black text-foreground">$5,240.00</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </motion.div>

        {/* Expenses Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border p-6 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <ArrowUpRight size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expenses</p>
              <p className="text-xl font-black text-foreground">$1,890.50</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">-3% from last month</p>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h2 className="text-xl font-black text-foreground mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'income' 
                    ? <ArrowDownLeft size={18} className="text-green-600" />
                    : <ArrowUpRight size={18} className="text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-bold text-foreground">{transaction.description}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <p className={`font-black ${
                transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card Status - AGORA LARANJA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-foreground">Your Card</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            user?.cardStatus === 'active' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {user?.cardStatus === 'active' ? 'Active' : 'Pending'}
          </span>
        </div>
        
        {/* Card Preview - LARANJA */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white relative overflow-hidden max-w-md shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10">
            <p className="text-sm opacity-90 mb-6">NovaBank</p>
            <p className="text-lg font-mono mb-4">**** **** **** {user?.cardNumber || "4289"}</p>
            <div className="flex justify-between items-center">
              <p className="text-xs opacity-90">{user?.cardExpiry || "12/26"}</p>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-black/40 -mr-2" />
                <div className="w-6 h-6 rounded-full bg-white/60" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}