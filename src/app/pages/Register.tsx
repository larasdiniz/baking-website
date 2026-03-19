// src/app/pages/Register.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wallet, User, Mail, Phone, Lock, ArrowRight, Check, 
  CreditCard, Shield, Zap, Briefcase, Home, Calendar,
  ChevronLeft, ChevronRight, Eye, EyeOff, ArrowLeft, CheckCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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
  const { t } = useLanguage();
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
    setIsLoading(true);
    
    // Simulando criação de conta
    console.log("Account creation:", formData);
    
    // Simula um delay de rede
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    
    // Mostra a mensagem de sucesso por 3 segundos e redireciona
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const steps = [
    { number: 1, title: t('register.step1.title'), icon: <User size={20} /> },
    { number: 2, title: t('register.step2.title'), icon: <Mail size={20} /> },
    { number: 3, title: t('register.step3.title'), icon: <Briefcase size={20} /> },
    { number: 4, title: t('register.step4.title'), icon: <Shield size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-orange-200">
      {/* Left Side - Formulário (ocupando toda a largura) */}
      <div className="w-full flex flex-col relative px-8 py-10 md:px-16 lg:px-24">
        {/* Back to Home - IGUAL AO LOGIN */}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-bold transition-colors w-fit mb-12">
          <ArrowLeft size={20} /> {t('nav.backToHome')}
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-3xl w-full mx-auto">
          {/* Logo e título - IGUAL AO LOGIN */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Wallet size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight">NizBank</span>
          </div>

          <h1 className="text-4xl font-black mb-2">{t('register.title')}</h1>
          <p className="text-zinc-500 font-medium mb-10">{t('register.subtitle')}</p>

          {/* Mensagem de Sucesso */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-green-800">Account Created Successfully!</p>
                  <p className="text-sm text-green-600">Redirecting you to login in 3 seconds...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Steps - só mostra se não estiver em modo de sucesso */}
          {!showSuccess && (
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
                          step >= s.number ? 'bg-orange-500' : 'bg-zinc-200'
                        }`}
                      >
                        {step > s.number ? <Check size={20} /> : s.icon}
                      </motion.div>
                      <span className={`text-sm font-bold mt-2 ${
                        step >= s.number ? 'text-orange-500' : 'text-zinc-400'
                      }`}>
                        {s.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-1 mx-4 bg-zinc-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ 
                            width: step > s.number ? '100%' : 
                                   step === s.number ? '50%' : '0%' 
                          }}
                          transition={{ duration: 0.5 }}
                          className="h-full bg-orange-500"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}

          {/* Form Card - só mostra se não estiver em modo de sucesso */}
          {!showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-zinc-100"
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
                      <h3 className="text-2xl font-black text-black mb-6">{t('register.step1.title')}</h3>
                      
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.fullName')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => updateFormData("fullName", e.target.value)}
                            required
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder={t('register.fullNamePlaceholder')}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.dateOfBirth')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Calendar size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                            required
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.idNumber')}
                        </label>
                        <input
                          type="text"
                          value={formData.idNumber}
                          onChange={(e) => updateFormData("idNumber", e.target.value)}
                          required
                          className="block w-full px-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                          placeholder={t('register.idNumberPlaceholder')}
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
                      <h3 className="text-2xl font-black text-black mb-6">{t('register.step2.title')}</h3>
                      
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.email')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            required
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.phone')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                            required
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.address')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Home size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => updateFormData("address", e.target.value)}
                            required
                            className="block w-full pl-11 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder="123 Main St"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-zinc-700 mb-2">
                            {t('register.city')}
                          </label>
                          <input
                            type="text"
                            value={formData.city}
                            onChange={(e) => updateFormData("city", e.target.value)}
                            required
                            className="block w-full px-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder={t('register.cityPlaceholder')}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-zinc-700 mb-2">
                            {t('register.postalCode')}
                          </label>
                          <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => updateFormData("postalCode", e.target.value)}
                            required
                            className="block w-full px-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
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
                      <h3 className="text-2xl font-black text-black mb-6">{t('register.step3.title')}</h3>
                      
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.employmentStatus')}
                        </label>
                        <select
                          value={formData.employmentStatus}
                          onChange={(e) => updateFormData("employmentStatus", e.target.value)}
                          required
                          className="block w-full px-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                        >
                          <option value="">{t('register.selectStatus')}</option>
                          <option value="employed">{t('register.employed')}</option>
                          <option value="self-employed">{t('register.selfEmployed')}</option>
                          <option value="part-time">{t('register.partTime')}</option>
                          <option value="student">{t('register.student')}</option>
                          <option value="retired">{t('register.retired')}</option>
                          <option value="other">{t('register.other')}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.annualIncome')}
                        </label>
                        <select
                          value={formData.annualIncome}
                          onChange={(e) => updateFormData("annualIncome", e.target.value)}
                          required
                          className="block w-full px-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                        >
                          <option value="">{t('register.selectRange')}</option>
                          <option value="0-25000">$0 - $25,000</option>
                          <option value="25001-50000">$25,001 - $50,000</option>
                          <option value="50001-75000">$50,001 - $75,000</option>
                          <option value="75001-100000">$75,001 - $100,000</option>
                          <option value="100001-150000">$100,001 - $150,000</option>
                          <option value="150001+">$150,001+</option>
                        </select>
                      </div>

                      <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                            <Zap size={24} className="text-orange-500" />
                          </div>
                          <div>
                            <h4 className="font-black text-black mb-1">{t('register.quickTip')}</h4>
                            <p className="text-sm text-zinc-600 font-medium">
                              {t('register.quickTipText')}
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
                      <h3 className="text-2xl font-black text-black mb-6">{t('register.step4.title')}</h3>
                      
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.password')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => updateFormData("password", e.target.value)}
                            required
                            className="block w-full pl-11 pr-12 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        <p className="mt-2 text-xs text-zinc-500 font-medium">
                          {t('register.passwordHint')}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">
                          {t('register.confirmPassword')}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock size={18} className="text-zinc-400" />
                          </div>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                            required
                            className="block w-full pl-11 pr-12 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
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
                            className="w-5 h-5 rounded border-zinc-300 text-orange-500 focus:ring-orange-500"
                          />
                          <label htmlFor="terms" className="ml-3 block text-sm text-zinc-600 font-medium">
                            {t('register.agreeToTerms')}{' '}
                            <a href="#" className="text-orange-500 hover:text-orange-600 font-bold">{t('register.termsOfService')}</a>
                            {' '}{t('register.and')}{' '}
                            <a href="#" className="text-orange-500 hover:text-orange-600 font-bold">{t('register.privacyPolicy')}</a>
                          </label>
                        </div>
                      </div>

                      <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                        <div className="flex items-center gap-3">
                          <Shield size={20} className="text-orange-500" />
                          <span className="text-sm text-zinc-600 font-medium">
                            {t('register.encryption')}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-8 pt-6 border-t border-zinc-100">
                  {step > 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={prevStep}
                      disabled={isLoading}
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-zinc-600 rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={18} />
                      {t('register.previous')}
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
                      disabled={isLoading}
                      className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Processing..." : t('register.nextStep')}
                      {!isLoading && <ChevronRight size={18} />}
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-colors shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          {t('register.createAccount')}
                          <ArrowRight size={18} />
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-zinc-500 font-medium">
                {t('register.alreadyHaveAccount')}{' '}
                <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">
                  {t('register.signIn')}
                </Link>
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}