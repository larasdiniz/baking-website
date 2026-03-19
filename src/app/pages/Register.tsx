// src/app/pages/Register.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wallet, User, Mail, Phone, Lock, ArrowRight, Check, 
  CreditCard, Shield, Zap, Briefcase, Home, Calendar,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    postalCode: "",
    employmentStatus: "",
    annualIncome: "",
    idNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Account creation:", formData);
    await login(formData.email, formData.password);
    navigate("/dashboard");
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: <User size={20} /> },
    { number: 2, title: "Contact Details", icon: <Mail size={20} /> },
    { number: 3, title: "Financial Profile", icon: <Briefcase size={20} /> },
    { number: 4, title: "Security", icon: <Shield size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 30, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" 
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-4rem)] lg:max-w-6xl z-50 bg-white/40 backdrop-blur-xl rounded-full border border-white/60 py-3 px-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black text-primary tracking-tight">
                NizBank
              </span>
            </motion.div>
          </Link>
          <Link to="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-primary hover:text-destructive font-bold transition-colors px-4 py-2"
            >
              ← Back to Home
            </motion.button>
          </Link>
        </div>
      </motion.nav>

      <div className="max-w-3xl mx-auto relative z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto w-20 h-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl mb-6"
          >
            <CreditCard size={40} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-2">
            Open your account
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Join thousands of happy customers in under 5 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center">
            {steps.map((s, index) => (
              <React.Fragment key={s.number}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: step === s.number ? 1.1 : 1,
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 shadow-lg ${
                      step >= s.number ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    {step > s.number ? <Check size={20} /> : s.icon}
                  </motion.div>
                  <span className={`text-sm font-bold mt-2 ${
                    step >= s.number ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ 
                        width: step > s.number ? '100%' : 
                               step === s.number ? '50%' : '0%' 
                      }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-primary"
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-border"
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-foreground mb-6">Personal Information</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateFormData("fullName", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      ID Number / Passport
                    </label>
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => updateFormData("idNumber", e.target.value)}
                      required
                      className="block w-full px-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                      placeholder="ABC123456"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-foreground mb-6">Contact Details</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Home size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateFormData("address", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="123 Main St"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => updateFormData("city", e.target.value)}
                        required
                        className="block w-full px-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) => updateFormData("postalCode", e.target.value)}
                        required
                        className="block w-full px-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-foreground mb-6">Financial Profile</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Employment Status
                    </label>
                    <select
                      value={formData.employmentStatus}
                      onChange={(e) => updateFormData("employmentStatus", e.target.value)}
                      required
                      className="block w-full px-4 py-4 bg-input-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed Full-time</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="part-time">Employed Part-time</option>
                      <option value="student">Student</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Annual Income Range
                    </label>
                    <select
                      value={formData.annualIncome}
                      onChange={(e) => updateFormData("annualIncome", e.target.value)}
                      required
                      className="block w-full px-4 py-4 bg-input-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                    >
                      <option value="">Select range</option>
                      <option value="0-25000">$0 - $25,000</option>
                      <option value="25001-50000">$25,001 - $50,000</option>
                      <option value="50001-75000">$50,001 - $75,000</option>
                      <option value="75001-100000">$75,001 - $100,000</option>
                      <option value="100001-150000">$100,001 - $150,000</option>
                      <option value="150001+">$150,001+</option>
                    </select>
                  </div>

                  <div className="bg-accent/30 rounded-xl p-6 border border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                        <Zap size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-black text-foreground mb-1">Quick Tip</h4>
                        <p className="text-sm text-muted-foreground font-medium">
                          Providing accurate financial information helps us recommend the best card for your needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-foreground mb-6">Security Settings</h3>
                  
                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground font-medium">
                      Must be at least 8 characters with 1 number and 1 special character
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-foreground mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        required
                        className="block w-full pl-11 pr-4 py-4 bg-input-background border border-input rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-medium"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
                        required
                        className="h-5 w-5 rounded-md border-input text-primary focus:ring-primary focus:ring-offset-0 transition-colors"
                      />
                      <label htmlFor="terms" className="ml-3 block text-sm text-muted-foreground font-medium">
                        I agree to the{' '}
                        <a href="#" className="text-primary hover:text-destructive font-bold">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-primary hover:text-destructive font-bold">Privacy Policy</a>
                      </label>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 border border-border">
                    <div className="flex items-center gap-3">
                      <Shield size={20} className="text-primary" />
                      <span className="text-sm text-muted-foreground font-medium">
                        Your information is protected with 256-bit encryption
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              {step > 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-xl font-bold hover:bg-accent transition-colors"
                >
                  <ChevronLeft size={18} />
                  Previous
                </motion.button>
              ) : (
                <div></div>
              )}

              {step < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-destructive transition-colors"
                >
                  Next Step
                  <ChevronRight size={18} />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-destructive transition-colors"
                >
                  Create Account
                  <ArrowRight size={18} />
                </motion.button>
              )}
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-primary hover:text-destructive transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}