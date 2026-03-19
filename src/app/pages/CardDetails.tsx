import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, CreditCard, Lock, Eye, EyeOff,
  Shield, Clock, DollarSign, RefreshCw, AlertTriangle,
  TrendingUp, Wallet, Zap
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

// Definição dos tipos (pode ser movido para um arquivo separado)
type Transaction = {
  date: string;
  description: string;
  amount: number;
  category: string;
};

type CreditCard = {
  id: string;
  type: 'credit';
  brand: string;
  lastFour: string;
  expiry: string;
  status: string;
  limit: number;
  availableCredit: number;
  usedCredit: number;
  interest_rate: string;
  min_payment: number;
  due_date: string;
  isVirtual: boolean;
  isPhysical: boolean;
  issuedAt: string;
  rewards: string;
  transactions: Transaction[];
};

type DebitCard = {
  id: string;
  type: 'debit';
  brand: string;
  lastFour: string;
  expiry: string;
  status: string;
  linked_account: string;
  current_balance: number;
  daily_withdrawal_limit: number;
  daily_purchase_limit: number;
  isVirtual: boolean;
  isPhysical: boolean;
  issuedAt: string;
  features: string[];
  transactions: Transaction[];
};

type Card = CreditCard | DebitCard;

// Mock data (em produção viria de uma API)
const mockCards: Record<string, Card> = {
  card1: {
    id: "card1",
    type: "credit",
    brand: "visa",
    lastFour: "4289",
    expiry: "12/26",
    status: "active",
    limit: 5000,
    availableCredit: 3250.50,
    usedCredit: 1749.50,
    interest_rate: "2.99% APR",
    min_payment: 45.00,
    due_date: "2024-04-15",
    isVirtual: true,
    isPhysical: true,
    issuedAt: "2024-01-15",
    rewards: "2% cashback on all purchases",
    transactions: [
      { date: "2024-03-18", description: "Netflix", amount: -15.99, category: "Entertainment" },
      { date: "2024-03-15", description: "Amazon", amount: -89.90, category: "Shopping" },
      { date: "2024-03-14", description: "Uber", amount: -23.50, category: "Transport" },
      { date: "2024-03-12", description: "Restaurant", amount: -45.80, category: "Food" },
    ]
  },
  card2: {
    id: "card2",
    type: "debit",
    brand: "mastercard",
    lastFour: "1357",
    expiry: "09/25",
    status: "active",
    linked_account: "Checking Account •• 1234",
    current_balance: 3240.75,
    daily_withdrawal_limit: 1000,
    daily_purchase_limit: 3000,
    isVirtual: true,
    isPhysical: false,
    issuedAt: "2024-02-20",
    features: ["No fees", "ATM access", "Instant transfers"],
    transactions: [
      { date: "2024-03-17", description: "ATM Withdrawal", amount: -200.00, category: "Cash" },
      { date: "2024-03-16", description: "Grocery Store", amount: -85.30, category: "Food" },
      { date: "2024-03-15", description: "Gas Station", amount: -45.00, category: "Transport" },
      { date: "2024-03-13", description: "Pharmacy", amount: -32.50, category: "Health" },
    ]
  }
};

export function CardDetails() {
  const navigate = useNavigate();
  const { cardId } = useParams<{ cardId: string }>();
  const { user } = useAuth(); // Se não for usar, considere remover
  const [showDetails, setShowDetails] = useState(false);

  // Buscar cartão baseado no ID
  const card = useMemo(() => {
    if (!cardId) return null;
    return mockCards[cardId];
  }, [cardId]);

  // Loading state
  if (!card) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Card not found</p>
      </div>
    );
  }

  const isCreditCard = card.type === 'credit';
  const isDebitCard = card.type === 'debit';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-black text-foreground">
          {card.type === 'credit' ? 'Credit Card' : 'Debit Card'} Details
        </h1>
      </div>

      {/* Card Display */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-xl max-w-sm">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs opacity-80">{card.brand === "visa" ? "VISA" : "MASTERCARD"}</p>
              <p className="text-lg font-bold mt-1">NizBank</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">
                {card.type === 'credit' ? 'Credit' : 'Debit'}
              </span>
              <Shield size={16} className="opacity-90" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-mono tracking-wider">
              {showDetails ? `•••• •••• •••• ${card.lastFour}` : "•••• •••• •••• ••••"}
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1 text-[10px] bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 transition-colors"
            >
              {showDetails ? <EyeOff size={12} /> : <Eye size={12} />}
              {showDetails ? "Hide" : "Show"}
            </button>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs opacity-70">VALID THRU</p>
              <p className="text-sm font-bold">{card.expiry}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] px-2 py-1 rounded-full ${
                card.status === 'active' ? 'bg-green-500/30 text-green-100' :
                card.status === 'blocked' ? 'bg-red-500/30 text-red-100' :
                'bg-yellow-500/30 text-yellow-100'
              }`}>
                {card.status}
              </span>
              <div className="flex">
                <div className="w-6 h-6 rounded-full bg-black/40 -mr-1.5 border border-white/20" />
                <div className="w-6 h-6 rounded-full bg-white/60 border border-white/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Card Type</p>
          <p className="font-black capitalize">{card.type}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Brand</p>
          <p className="font-black uppercase">{card.brand}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Status</p>
          <p className={`font-black ${
            card.status === 'active' ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {card.status}
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Issued</p>
          <p className="font-black">{card.issuedAt}</p>
        </div>
      </div>

      {/* Virtual/Physical Info */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h2 className="text-lg font-black text-foreground mb-3">Card Format</h2>
        <div className="flex gap-4">
          {card.isVirtual && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <Zap size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Virtual Card</p>
                <p className="text-xs text-muted-foreground">Available instantly</p>
              </div>
            </div>
          )}
          {card.isPhysical && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <CreditCard size={16} className="text-orange-500" />
              </div>
              <div>
                <p className="font-bold text-sm">Physical Card</p>
                <p className="text-xs text-muted-foreground">Delivered</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Credit Card Specific Info */}
      {isCreditCard && (
        <>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
              <DollarSign size={20} className="text-orange-500" />
              Credit Information
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Total Limit</p>
                  <p className="text-xl font-black text-foreground">${card.limit.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Available</p>
                  <p className="text-xl font-black text-green-600">${card.availableCredit.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Used</span>
                  <span className="font-bold">${card.usedCredit.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(card.usedCredit / card.limit) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Interest Rate</p>
                  <p className="font-bold text-foreground">{card.interest_rate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Minimum Payment</p>
                  <p className="font-bold text-foreground">${card.min_payment.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Due Date</p>
                  <p className="font-bold text-foreground">{card.due_date}</p>
                </div>
              </div>

              <div className="bg-orange-50 rounded-xl p-3">
                <p className="text-xs text-orange-700 flex items-center gap-1">
                  <TrendingUp size={14} />
                  <span className="font-bold">Rewards: </span>
                  {card.rewards}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
              <DollarSign size={18} />
              Make Payment
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-orange-100 text-orange-700 rounded-xl font-bold hover:bg-orange-200 transition-colors">
              <RefreshCw size={18} />
              Request Increase
            </button>
          </div>
        </>
      )}

      {/* Debit Card Specific Info */}
      {isDebitCard && (
        <>
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-black text-foreground mb-4 flex items-center gap-2">
              <Wallet size={20} className="text-orange-500" />
              Account Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Linked Account</p>
                <p className="font-bold text-foreground">{card.linked_account}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Current Balance</p>
                <p className="text-3xl font-black text-foreground">${card.current_balance.toFixed(2)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Daily Withdrawal</p>
                  <p className="font-bold text-foreground">${card.daily_withdrawal_limit}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Daily Purchase</p>
                  <p className="font-bold text-foreground">${card.daily_purchase_limit}</p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-3">
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-white px-2 py-1 rounded-full text-blue-700">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors">
              <DollarSign size={18} />
              Transfer Money
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-orange-100 text-orange-700 rounded-xl font-bold hover:bg-orange-200 transition-colors">
              <Lock size={18} />
              Adjust Limits
            </button>
          </div>
        </>
      )}

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-lg font-black text-foreground mb-4">Recent Transactions</h2>
        
        <div className="space-y-3">
          {card.transactions.map((transaction, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b last:border-0">
              <div>
                <p className="font-bold text-foreground">{transaction.description}</p>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
                    {transaction.category}
                  </span>
                </div>
              </div>
              <p className={`font-black ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-center text-sm text-orange-500 font-bold hover:text-orange-600">
          View All Transactions →
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-black text-red-800 mb-4 flex items-center gap-2">
          <AlertTriangle size={20} />
          Danger Zone
        </h2>
        
        <div className="space-y-3">
          <button className="w-full text-left px-4 py-3 bg-white rounded-xl text-red-700 hover:bg-red-100 transition-colors font-bold">
            Report Card Lost/Stolen
          </button>
          <button className="w-full text-left px-4 py-3 bg-white rounded-xl text-red-700 hover:bg-red-100 transition-corlors font-bold">
            Block Card Temporarily
          </button>
        </div>
      </div>
    </div>
  );
}