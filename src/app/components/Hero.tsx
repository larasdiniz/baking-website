import React from "react";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const handleOpenAccount = () => {
    navigate('/register');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden bg-white">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-orange-200/40 blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-zinc-200/60 blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold text-zinc-800 mb-6 shadow-md shadow-black/5 hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black mb-6 leading-[1.1]">
              {t('hero.title')} <span className="text-orange-500 relative inline-block">
                {t('hero.titleHighlight')}
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full h-4 text-orange-400" 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                >
                  <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-600 mb-8 max-w-xl font-medium">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(249,115,22,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenAccount}
                className="bg-black hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {t('hero.openAccount')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="bg-white text-black border-2 border-zinc-200 px-8 py-4 rounded-full font-bold transition-colors flex items-center justify-center cursor-pointer"
              >
                {t('hero.getStarted')}
              </motion.button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6 text-sm text-zinc-500 font-bold">
              <div className="flex items-center gap-1.5"><ShieldCheck size={18} className="text-black"/> {t('hero.security')}</div>
              <div className="flex items-center gap-1.5"><Zap size={18} className="text-orange-500"/> {t('hero.fastSetup')}</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-lg aspect-square"
            >
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl" />
              
              {/* VÍDEO MP4 no lugar da imagem */}
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl z-10 relative"
              >
                <source src="/Credit_Card_Design_Animation_Request.mp4" type="video/mp4" />
                {/* Fallback caso o vídeo não carregue */}
                Seu navegador não suporta vídeo HTML5.
              </video>
              
              {/* Floating UI Elements for depth */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-10 -left-4 sm:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-3 z-20 border border-zinc-100"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <ArrowRight size={20} className="text-black -rotate-45" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Received</div>
                  <div className="text-base font-black text-black">+$1,250.00</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-20 -right-4 sm:-right-10 bg-white p-4 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-3 z-20 border border-zinc-100"
              >
                 <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Zap size={20} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Cashback</div>
                  <div className="text-base font-black text-black">2.5% Earned</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}







/*
import React from "react";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export function Hero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const handleOpenAccount = () => {
    navigate('/register');
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden bg-white">
      {/* Animated Background Elements }
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] rounded-full bg-orange-200/40 blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-zinc-200/60 blur-[100px] pointer-events-none" 
      />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 text-sm font-bold text-zinc-800 mb-6 shadow-md shadow-black/5 hover:scale-105 transition-transform cursor-default">
              <span className="flex h-2.5 w-2.5 rounded-full bg-orange-500 animate-pulse"></span>
              {t('hero.badge')}
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black mb-6 leading-[1.1]">
              {t('hero.title')} <span className="text-orange-500 relative inline-block">
                {t('hero.titleHighlight')}
                <motion.svg 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute -bottom-2 left-0 w-full h-4 text-orange-400" 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                >
                  <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </motion.svg>
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-600 mb-8 max-w-xl font-medium">
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(249,115,22,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenAccount}
                className="bg-black hover:bg-orange-500 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {t('hero.openAccount')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#f4f4f5" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="bg-white text-black border-2 border-zinc-200 px-8 py-4 rounded-full font-bold transition-colors flex items-center justify-center cursor-pointer"
              >
                {t('hero.getStarted')}
              </motion.button>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6 text-sm text-zinc-500 font-bold">
              <div className="flex items-center gap-1.5"><ShieldCheck size={18} className="text-black"/> {t('hero.security')}</div>
              <div className="flex items-center gap-1.5"><Zap size={18} className="text-orange-500"/> {t('hero.fastSetup')}</div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="w-full lg:w-1/2 relative flex justify-center lg:justify-end"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-full max-w-lg aspect-square"
            >
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1537724326059-2ea20251b9c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMG1vZGVybiUyMGNyZWRpdCUyMGNhcmQlMjBmbG9hdGluZ3xlbnwxfHx8fDE3NzM3NzQzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Modern Credit Card Mockup"
                className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl z-10 relative object-center mix-blend-multiply opacity-90 grayscale contrast-125"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
              />
              
              {/* Floating UI Elements for depth }
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-10 -left-4 sm:-left-10 bg-white p-4 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-3 z-20 border border-zinc-100"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center">
                  <ArrowRight size={20} className="text-black -rotate-45" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Received</div>
                  <div className="text-base font-black text-black">+$1,250.00</div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                className="absolute bottom-20 -right-4 sm:-right-10 bg-white p-4 rounded-2xl shadow-xl shadow-black/10 flex items-center gap-3 z-20 border border-zinc-100"
              >
                 <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Zap size={20} className="text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium">Cashback</div>
                  <div className="text-base font-black text-black">2.5% Earned</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

*/