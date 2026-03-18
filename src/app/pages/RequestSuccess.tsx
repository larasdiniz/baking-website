// src/app/pages/RequestSuccess.tsx
import React from "react";
import { motion } from "motion/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, CreditCard, Mail, Clock, Home } from "lucide-react";

export function RequestSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardData } = location.state || {};

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-8 max-w-md text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <Check size={40} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-black text-foreground mb-2">Request Received!</h1>
        <p className="text-muted-foreground mb-6">
          Your card request has been submitted successfully.
        </p>

        <div className="bg-orange-50 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard size={18} className="text-orange-500" />
            <span className="font-bold capitalize">{cardData?.type} Card</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Clock size={18} className="text-orange-500" />
            <span className="text-sm">Delivery in 5-7 business days</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} className="text-orange-500" />
            <span className="text-sm">You'll receive a tracking number via email</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/cards")}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            View My Cards
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Go to Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}