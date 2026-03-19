// src/app/pages/Login.tsx
import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Wallet, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(t('login.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans text-black selection:bg-orange-200">
      {/* Left Side - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col relative px-8 py-10 md:px-16 lg:px-24">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-black font-bold transition-colors w-fit mb-12">
          <ArrowLeft size={20} /> {t('nav.backToHome')}
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Wallet size={20} />
            </div>
            <span className="text-2xl font-black tracking-tight">NizBank</span>
          </div>

          <h1 className="text-4xl font-black mb-2">{t('login.welcomeBack')}</h1>
          <p className="text-zinc-500 font-medium mb-10">{t('login.enterDetails')}</p>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-2xl text-sm font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">{t('login.emailAddress')}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white" 
                  required 
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-zinc-700">{t('login.password')}</label>
                <a href="#" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors">{t('login.forgotPassword')}</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********" 
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-zinc-100 focus:border-orange-500 focus:outline-none transition-colors font-medium text-black bg-zinc-50 focus:bg-white" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-zinc-300 text-orange-500 focus:ring-orange-500" 
              />
              <label htmlFor="remember" className="text-sm font-bold text-zinc-600 cursor-pointer">{t('login.rememberMe')}</label>
            </div>

            {/* Sign In Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }} 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-black text-white font-bold py-4 rounded-2xl shadow-xl shadow-black/10 hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t('login.signingIn') : t('login.signIn')}
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-zinc-500 font-medium mt-10">
            {t('login.noAccount')}{' '}
            <Link to="/open-account" className="text-orange-500 font-bold hover:text-orange-600 transition-colors">{t('login.signUp')}</Link>
          </p>

          {/* Description Text - SEM FOOTER */}
          <p className="text-center text-zinc-400 text-sm mt-8 border-t border-zinc-100 pt-8">
            {t('login.manageFinances')}
            <br />
            {t('login.accessDashboard')}
          </p>
        </div>
      </div>

      {/* Right Side - Imagem */}
      <div className="hidden lg:flex w-1/2 bg-black relative items-center justify-center overflow-hidden p-12">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/30 blur-[120px] rounded-full pointer-events-none" 
        />
        
        <div className="relative z-10 max-w-lg text-center">
          <img 
            src="https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM3NzQzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Login visual" 
            className="w-full max-w-sm mx-auto rounded-[2.5rem] grayscale-[30%] shadow-2xl mb-12 border-4 border-zinc-900 object-cover aspect-[4/5]" 
          />
          <h2 className="text-4xl font-black text-white mb-4">{t('login.manageFinances')}</h2>
          <p className="text-zinc-400 font-medium text-lg">{t('login.accessDashboard')}</p>
        </div>
      </div>
    </div>
  );
}