// src/app/pages/ReplaceCard.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, AlertTriangle, Shield, Check,
  Lock, RefreshCw, Clock, Info
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function ReplaceCard() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const [step, setStep] = useState(1);
  const [reason, setReason] = useState<"lost" | "stolen" | "damaged" | "expired">("lost");
  const [confirmBlock, setConfirmBlock] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [policeReport, setPoliceReport] = useState("");

  const reasons = [
    { 
      id: "lost", 
      label: "Lost Card", 
      icon: <AlertTriangle size={20} />, 
      description: "You've misplaced your card",
      color: "yellow"
    },
    { 
      id: "stolen", 
      label: "Stolen Card", 
      icon: <Lock size={20} />, 
      description: "Card was stolen, requires immediate block",
      color: "red"
    },
    { 
      id: "damaged", 
      label: "Damaged Card", 
      icon: <RefreshCw size={20} />, 
      description: "Card is physically damaged",
      color: "blue"
    },
    { 
      id: "expired", 
      label: "Expired Card", 
      icon: <Clock size={20} />, 
      description: "Card has expired",
      color: "gray"
    }
  ];

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      updateUser({ cardStatus: "pending" });
      setIsLoading(false);
      navigate("/dashboard/cards/replace-success", { 
        state: { reason } 
      });
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-foreground">Replace Card</h1>
          <p className="text-muted-foreground">Card ending in {useAuth().user?.cardNumber || "4289"}</p>
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 space-y-6"
        >
          <h2 className="text-xl font-black text-foreground">Why are you replacing your card?</h2>
          
          <div className="space-y-3">
            {reasons.map((r) => (
              <button
                key={r.id}
                onClick={() => setReason(r.id as any)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  reason === r.id 
                    ? `border-${r.color}-500 bg-${r.color}-50` 
                    : 'border-border hover:border-orange-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    reason === r.id ? `bg-${r.color}-500 text-white` : 'bg-gray-100'
                  }`}>
                    {r.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{r.label}</h3>
                    <p className="text-sm text-muted-foreground">{r.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {reason === "stolen" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex gap-3">
                <AlertTriangle size={20} className="text-red-600" />
                <div>
                  <p className="font-bold text-red-800">Immediate Action Required</p>
                  <p className="text-sm text-red-700">
                    Your card will be blocked immediately. A new card will be issued.
                  </p>
                </div>
              </div>
            </div>
          )}

          {reason === "lost" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Info size={20} className="text-yellow-600" />
                <div>
                  <p className="font-bold text-yellow-800">Temporary Block</p>
                  <p className="text-sm text-yellow-700">
                    Your card will be temporarily blocked. If you find it, you can unblock it.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 space-y-6"
        >
          <h2 className="text-xl font-black text-foreground">Confirmation</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Card to replace:</p>
              <p className="font-bold">•••• •••• •••• {useAuth().user?.cardNumber || "4289"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Reason:</p>
              <p className="font-bold capitalize">{reason}</p>
            </div>

            {reason === "stolen" && (
              <div>
                <label className="block text-sm font-bold mb-2">Police Report Number (optional)</label>
                <input
                  type="text"
                  value={policeReport}
                  onChange={(e) => setPoliceReport(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background border border-input rounded-xl"
                  placeholder="e.g., POL-2024-12345"
                />
              </div>
            )}

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={confirmBlock}
                onChange={(e) => setConfirmBlock(e.target.checked)}
                className="rounded text-orange-500"
              />
              <span className="text-sm">
                I understand that my current card will be {reason === "stolen" ? "permanently blocked" : "deactivated"} and a new card will be issued.
              </span>
            </label>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Shield size={20} className="text-orange-600" />
                <div>
                  <p className="font-bold text-orange-800">New Card Details</p>
                  <p className="text-sm text-orange-700">
                    Your new card will have a new number and expiry date. Virtual card will be available instantly, physical card in 5-7 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
          >
            Back
          </button>
        ) : (
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
          >
            Cancel
          </button>
        )}

        {step < 2 ? (
          <button
            onClick={() => setStep(2)}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600"
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!confirmBlock || isLoading}
            className="px-8 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Confirm Replacement"}
          </button>
        )}
      </div>
    </div>
  );
}