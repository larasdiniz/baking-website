// src/app/pages/Cards.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, Plus, Lock, Globe, Smartphone, Check, 
  RefreshCw, ArrowUpCircle, Shield, Zap, Award,
  AlertTriangle, MoreHorizontal, Clock, DollarSign
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type PlanType = "standard" | "premium" | "metal";

interface CardType {
  id: PlanType;
  name: string;
  price: string;
  gradient: string;
  textColor: string;
  features: string[];
  icon: JSX.Element;
  popular?: boolean;
}

const cardTypes: CardType[] = [
  {
    id: "standard",
    name: "Standard",
    price: "Free",
    gradient: "from-zinc-200 to-zinc-300",
    textColor: "text-black",
    icon: <CreditCard size={18} className="text-zinc-600" />,
    features: ["Virtual card included", "Free ATM up to $200/mo", "0.5% Cashback on groceries", "Basic support"]
  },
  {
    id: "premium",
    name: "Premium",
    price: "$9.99/mo",
    gradient: "from-orange-400 to-orange-600",
    textColor: "text-white",
    icon: <Zap size={18} className="text-orange-500" />,
    popular: true,
    features: ["Physical & Virtual cards", "Free ATM up to $800/mo", "2% Cashback on everything", "Priority 24/7 support", "Travel insurance"]
  },
  {
    id: "metal",
    name: "Metal",
    price: "$19.99/mo",
    gradient: "from-zinc-800 to-black",
    textColor: "text-white",
    icon: <Award size={18} className="text-orange-500" />,
    features: ["18g Stainless Steel card", "Unlimited free ATM", "3% Cashback on everything", "Dedicated manager", "Airport lounge access"]
  }
];

export function Cards() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(user?.plan || "standard");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState<"order" | "replace" | "upgrade">("order");
  const [showCardMenu, setShowCardMenu] = useState<string | null>(null);

  const handleSelectPlan = (planId: PlanType) => {
    setSelectedPlan(planId);
  };

  const handleOrderCard = () => {
    navigate("/dashboard/cards/request-new");
  };

  const handleReplaceCard = () => {
    navigate("/dashboard/cards/replace");
  };

  const handleChangePlan = () => {
    if (selectedPlan !== user?.plan) {
      setConfirmType("upgrade");
      setShowConfirm(true);
    }
  };

  const handleConfirmAction = () => {
    if (confirmType === "upgrade") {
      updateUser({ plan: selectedPlan, cardStatus: "pending" });
    }
    setShowConfirm(false);
  };

  // Dados mockados de cartões
  const userCards = [
    {
      id: "card1",
      type: "credit",
      brand: "visa",
      lastFour: user?.cardNumber || "4289",
      expiry: user?.cardExpiry || "12/26",
      status: user?.cardStatus || "active",
      limit: 5000,
      availableCredit: 3250.50,
      isVirtual: true,
      isPhysical: true,
    },
    {
      id: "card2",
      type: "debit",
      brand: "mastercard",
      lastFour: "1357",
      expiry: "09/25",
      status: "active",
      isVirtual: true,
      isPhysical: false,
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black text-foreground">Cards</h1>
        <button
          onClick={handleOrderCard}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
        >
          <Plus size={18} />
          Request New Card
        </button>
      </div>

      {/* SEÇÃO 1: Seus Cartões */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-orange-500" />
          Your Cards
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              {/* Card Container - TAMANHO NORMAL com proporção suave */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-xl max-w-sm">
                
                {/* Efeito de brilho */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                
                {/* Menu button */}
                <button
                  onClick={() => setShowCardMenu(showCardMenu === card.id ? null : card.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/30 transition-colors z-10"
                >
                  <MoreHorizontal size={16} />
                </button>

                {/* Dropdown Menu */}
                {showCardMenu === card.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-12 right-3 bg-white rounded-xl shadow-xl p-2 z-20 w-40"
                  >
                    <button
                      onClick={() => navigate(`/dashboard/cards/${card.id}`)}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-50 rounded-lg"
                    >
                      View Details
                    </button>
                    <button
                      onClick={handleReplaceCard}
                      className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-orange-50 rounded-lg"
                    >
                      Report Lost/Stolen
                    </button>
                    <button className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-lg">
                      Block Card
                    </button>
                  </motion.div>
                )}

                {/* Card Content */}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs opacity-80">{card.brand === "visa" ? "VISA" : "MASTERCARD"}</p>
                      <p className="text-lg font-bold mt-1">NizBank</p>
                    </div>
                    <div className="flex gap-1">
                      {card.isVirtual && (
                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">Virtual</span>
                      )}
                      {card.isPhysical && (
                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full">Physical</span>
                      )}
                    </div>
                  </div>

                  <p className="text-lg font-mono tracking-wider mb-6">
                    •••• •••• •••• {card.lastFour}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs opacity-70">VALID THRU</p>
                      <p className="text-sm font-bold">{card.expiry}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Status */}
                      <span className={`text-[10px] px-2 py-1 rounded-full ${
                        card.status === 'active' ? 'bg-green-500/30 text-green-100' :
                        card.status === 'blocked' ? 'bg-red-500/30 text-red-100' :
                        'bg-yellow-500/30 text-yellow-100'
                      }`}>
                        {card.status}
                      </span>
                      
                      {/* Chip e bolinhas */}
                      <div className="flex items-center">
                        <div className="w-8 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-sm mr-1" />
                        <div className="flex">
                          <div className="w-5 h-5 rounded-full bg-black/40 -mr-1.5 border border-white/20" />
                          <div className="w-5 h-5 rounded-full bg-white/60 border border-white/20" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Card Info - Agora compacto e opcional */}
                  {card.type === 'credit' && card.limit && (
                    <div className="mt-4 pt-3 border-t border-white/20">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="opacity-80">Available</span>
                        <span className="font-bold">${card.availableCredit?.toFixed(0)}</span>
                      </div>
                      <div className="w-full h-1 bg-white/20 rounded-full">
                        <div 
                          className="h-full bg-white rounded-full"
                          style={{ width: `${((card.limit - (card.availableCredit || 0)) / card.limit) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 2: Ações Rápidas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          onClick={handleOrderCard}
          className="bg-card border border-border rounded-xl p-6 text-left hover:border-orange-500 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
            <Plus size={24} className="text-orange-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-black text-foreground mb-1">New Card</h3>
          <p className="text-sm text-muted-foreground">Order an additional card</p>
          <p className="text-xs text-orange-500 mt-2">Choose credit or debit →</p>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={handleReplaceCard}
          className="bg-card border border-border rounded-xl p-6 text-left hover:border-orange-500 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
            <RefreshCw size={24} className="text-orange-500 group-hover:rotate-180 transition-transform" />
          </div>
          <h3 className="font-black text-foreground mb-1">Replace Card</h3>
          <p className="text-sm text-muted-foreground">Lost, stolen or damaged</p>
          <p className="text-xs text-orange-500 mt-2">Immediate block available →</p>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={() => alert("Adjust limits coming soon!")}
          className="bg-card border border-border rounded-xl p-6 text-left hover:border-orange-500 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
            <DollarSign size={24} className="text-orange-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="font-black text-foreground mb-1">Adjust Limits</h3>
          <p className="text-sm text-muted-foreground">Change spending limits</p>
          <p className="text-xs text-orange-500 mt-2">For credit cards →</p>
        </motion.button>
      </section>

      {/* SEÇÃO 3: Mudar de Plano */}
      <section className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-black text-foreground mb-2 flex items-center gap-2">
          <ArrowUpCircle size={20} className="text-orange-500" />
          Change Your Plan
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Upgrade or downgrade your plan anytime. Changes take effect next billing cycle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardTypes.map((card) => {
            const isCurrentPlan = card.id === user?.plan;
            
            return (
              <motion.div
                key={card.id}
                whileHover={{ y: -5 }}
                className={`relative p-6 rounded-2xl border-2 transition-all ${
                  selectedPlan === card.id 
                    ? 'border-orange-500 shadow-lg shadow-orange-500/20' 
                    : 'border-border hover:border-orange-500/50'
                } ${isCurrentPlan ? 'bg-orange-50/50' : ''}`}
              >
                {card.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                {isCurrentPlan && (
                  <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">
                    Current
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    card.id === 'premium' ? 'bg-orange-100' : 'bg-zinc-100'
                  }`}>
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black text-foreground">{card.name}</h3>
                </div>

                <p className="text-2xl font-black text-foreground mb-4">{card.price}</p>

                {/* Mini preview do cartão */}
                <div className={`h-24 rounded-xl bg-gradient-to-br ${card.gradient} mb-4 p-3 ${card.textColor}`}>
                  <p className="text-xs font-black opacity-90">NizBank</p>
                  <p className="text-[10px] font-mono mt-1 opacity-80">**** **** **** 4289</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {card.features.map((feature, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <Check size={14} className="text-orange-500 mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {!isCurrentPlan && (
                  <button
                    onClick={() => handleSelectPlan(card.id)}
                    className={`w-full py-3 rounded-xl font-bold transition-colors ${
                      selectedPlan === card.id
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    {selectedPlan === card.id ? 'Selected' : 'Select'}
                  </button>
                )}

                {isCurrentPlan && (
                  <div className="w-full py-3 rounded-xl bg-gray-100 text-gray-500 font-bold text-center">
                    Current Plan
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {selectedPlan !== user?.plan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex justify-end"
          >
            <button
              onClick={handleChangePlan}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
            >
              <ArrowUpCircle size={18} />
              Change to {cardTypes.find(c => c.id === selectedPlan)?.name} Plan
            </button>
          </motion.div>
        )}
      </section>

      {/* Modal de Confirmação para Mudança de Plano */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-card rounded-2xl p-6 max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <ArrowUpCircle size={32} className="text-orange-500" />
              </div>
              
              <h3 className="text-2xl font-black text-foreground text-center mb-2">
                Change Plan?
              </h3>
              
              <p className="text-muted-foreground text-center mb-6">
                You're changing to {cardTypes.find(c => c.id === selectedPlan)?.name} plan.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}