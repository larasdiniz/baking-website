// src/app/pages/RequestNewCard.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  CreditCard, ArrowLeft, Check, Shield, 
  AlertCircle, Smartphone, Globe, Lock,
  ChevronRight, Info, DollarSign
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function RequestNewCard() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cardData, setCardData] = useState({
    type: "credit" as "credit" | "debit" | "prepaid",
    isVirtual: true,
    isPhysical: true,
    sameAsRegistered: true,
    deliveryAddress: "",
    cardName: "",
    dailyLimit: 1000,
    monthlyLimit: 5000
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    
    if (step === 2 && !cardData.sameAsRegistered && !cardData.deliveryAddress) {
      newErrors.deliveryAddress = "Delivery address is required";
    }
    
    if (step === 3 && !cardData.cardName) {
      newErrors.cardName = "Card name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      // Atualizar status do cartão no AuthContext
      updateUser({ cardStatus: "pending" });
      setIsLoading(false);
      navigate("/dashboard/cards/request-success", { 
        state: { cardData } 
      });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-foreground">Request New Card</h1>
          <p className="text-muted-foreground">Complete the steps below to order your new card</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: step === i ? 1.1 : 1,
                  backgroundColor: step >= i ? "#f97316" : "#e5e7eb"
                }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold`}
              >
                {step > i ? <Check size={18} /> : i}
              </motion.div>
              <span className="text-xs mt-2 font-medium">
                {i === 1 && "Card Type"}
                {i === 2 && "Delivery"}
                {i === 3 && "Customize"}
                {i === 4 && "Review"}
              </span>
            </div>
            {i < 4 && (
              <div className="flex-1 h-1 bg-gray-200 rounded-full mx-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: step > i ? "100%" : "0%" }}
                  className="h-full bg-orange-500 rounded-full"
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-foreground">Select Card Type</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setCardData({ ...cardData, type: "credit" })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  cardData.type === "credit" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-border hover:border-orange-200"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <CreditCard size={24} className="text-orange-500" />
                </div>
                <h3 className="font-black text-foreground mb-1">Credit Card</h3>
                <p className="text-sm text-muted-foreground mb-2">Build credit, earn rewards</p>
                <ul className="space-y-1">
                  <li className="text-xs flex items-center gap-1">
                    <Check size={12} className="text-green-500" /> Up to $5,000 limit
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <Check size={12} className="text-green-500" /> 2% cashback
                  </li>
                </ul>
              </button>

              <button
                onClick={() => setCardData({ ...cardData, type: "debit" })}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  cardData.type === "debit" 
                    ? "border-orange-500 bg-orange-50" 
                    : "border-border hover:border-orange-200"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Smartphone size={24} className="text-orange-500" />
                </div>
                <h3 className="font-black text-foreground mb-1">Debit Card</h3>
                <p className="text-sm text-muted-foreground mb-2">Direct access to your money</p>
                <ul className="space-y-1">
                  <li className="text-xs flex items-center gap-1">
                    <Check size={12} className="text-green-500" /> No fees
                  </li>
                  <li className="text-xs flex items-center gap-1">
                    <Check size={12} className="text-green-500" /> ATM access
                  </li>
                </ul>
              </button>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info size={20} className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold text-orange-800">Important Information</p>
                  <p className="text-sm text-orange-700">
                    Credit cards are subject to credit approval. Debit cards provide direct access to your funds.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-foreground">Card Format</h3>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={cardData.isVirtual}
                    onChange={(e) => setCardData({ ...cardData, isVirtual: e.target.checked })}
                    className="rounded text-orange-500"
                  />
                  <span className="text-sm">Virtual Card (instant use)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={cardData.isPhysical}
                    onChange={(e) => setCardData({ ...cardData, isPhysical: e.target.checked })}
                    className="rounded text-orange-500"
                  />
                  <span className="text-sm">Physical Card (delivered)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-foreground">Delivery Address</h2>
            
            <label className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={cardData.sameAsRegistered}
                onChange={(e) => setCardData({ ...cardData, sameAsRegistered: e.target.checked })}
                className="rounded text-orange-500"
              />
              <span className="text-sm">Use registered address</span>
            </label>

            {!cardData.sameAsRegistered && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Street Address</label>
                  <input
                    type="text"
                    value={cardData.deliveryAddress}
                    onChange={(e) => setCardData({ ...cardData, deliveryAddress: e.target.value })}
                    className="w-full px-4 py-3 bg-input-background border border-input rounded-xl"
                    placeholder="123 Main St"
                  />
                  {errors.deliveryAddress && (
                    <p className="text-sm text-red-500 mt-1">{errors.deliveryAddress}</p>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield size={20} className="text-blue-500" />
                <div>
                  <p className="font-bold text-blue-800">Secure Delivery</p>
                  <p className="text-sm text-blue-700">
                    Your card will be delivered in a secure, discreet envelope within 5-7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-foreground">Customize Your Card</h2>
            
            <div>
              <label className="block text-sm font-bold mb-2">Card Name (optional)</label>
              <input
                type="text"
                value={cardData.cardName}
                onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-xl"
                placeholder="e.g., My Travel Card"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Maximum 20 characters. This name will appear on your card statement.
              </p>
            </div>

            {cardData.type === "credit" && (
              <>
                <h3 className="font-bold text-foreground">Set Spending Limits</h3>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Daily Limit</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-l-xl border border-r-0">$</span>
                    <input
                      type="number"
                      value={cardData.dailyLimit}
                      onChange={(e) => setCardData({ ...cardData, dailyLimit: parseInt(e.target.value) })}
                      className="flex-1 px-4 py-2 bg-input-background border border-input rounded-r-xl"
                      min="100"
                      max="5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Monthly Limit</label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2 bg-gray-100 rounded-l-xl border border-r-0">$</span>
                    <input
                      type="number"
                      value={cardData.monthlyLimit}
                      onChange={(e) => setCardData({ ...cardData, monthlyLimit: parseInt(e.target.value) })}
                      className="flex-1 px-4 py-2 bg-input-background border border-input rounded-r-xl"
                      min="1000"
                      max="10000"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black text-foreground">Review Your Request</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Card Type</span>
                <span className="font-bold capitalize">{cardData.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Format</span>
                <span className="font-bold">
                  {cardData.isVirtual && "Virtual "}
                  {cardData.isPhysical && "Physical"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Delivery Address</span>
                <span className="font-bold">
                  {cardData.sameAsRegistered ? "Registered Address" : cardData.deliveryAddress}
                </span>
              </div>
              {cardData.cardName && (
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Card Name</span>
                  <span className="font-bold">{cardData.cardName}</span>
                </div>
              )}
              {cardData.type === "credit" && (
                <>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Daily Limit</span>
                    <span className="font-bold">${cardData.dailyLimit}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Monthly Limit</span>
                    <span className="font-bold">${cardData.monthlyLimit}</span>
                  </div>
                </>
              )}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-yellow-600" />
                <div>
                  <p className="font-bold text-yellow-800">Please confirm</p>
                  <p className="text-sm text-yellow-700">
                    By submitting this request, you agree to the terms and conditions of the card agreement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2"
          >
            Next
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? "Processing..." : "Submit Request"}
            {!isLoading && <Check size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}