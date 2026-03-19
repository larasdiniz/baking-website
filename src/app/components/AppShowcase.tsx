import React, { useState } from "react";
import { PieChart, Send, Lock, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

// Fallback apenas se a imagem original falhar
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='800' viewBox='0 0 400 800'%3E%3Crect width='400' height='800' fill='%23111111'/%3E%3Ctext x='50' y='400' font-family='Arial' font-size='24' fill='%23ffffff'%3ENiz Bank App%3C/text%3E%3C/svg%3E";

export function AppShowcase() {
  const [imageError, setImageError] = useState(false);
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 80 } }
  };

  const features = [
    { 
      icon: <Send size={24} className="text-orange-500" />, 
      title: "Instant Transfers", 
      desc: "Send money to friends and family globally without delays or hidden fees." 
    },
    { 
      icon: <PieChart size={24} className="text-orange-500" />, 
      title: "Smart Budgeting", 
      desc: "Auto-categorize your spending and get insights on where your money goes." 
    },
    { 
      icon: <Lock size={24} className="text-orange-500" />, 
      title: "Security Controls", 
      desc: "Freeze cards, set spending limits, and control online payments directly from the app." 
    }
  ];

  // Função para lidar com erro de imagem
  const handleImageError = () => {
    console.warn('Failed to load app showcase image');
    setImageError(true);
  };

  return (
    <section id="app" className="py-24 bg-black text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/20 blur-[120px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              {t('app.title')} <span className="text-orange-500">{t('app.titleHighlight')}</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg md:text-xl mb-12 max-w-lg font-medium"
            >
              {t('app.subtitle')}
            </motion.p>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  variants={item}
                  className="flex gap-5 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-orange-500/50 transition-colors"
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 font-medium text-lg">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* App Store Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 text-center inline-flex items-center justify-center gap-2 group"
                aria-label="Download on App Store"
              >
                {t('app.appStore')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-900 border-2 border-zinc-800 text-white px-8 py-4 rounded-full font-black hover:border-zinc-600 transition-colors text-center inline-flex items-center justify-center gap-2 group"
                aria-label="Get it on Google Play"
              >
                {t('app.googlePlay')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="w-full lg:w-1/2 relative flex justify-center mt-12 lg:mt-0">
            {/* Animated Phone Mockup */}
            <motion.div 
              animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[320px]"
            >
              <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />
              
              {/* SEU MOCKUP - com proteção contra falha */}
              <img 
                src={imageError ? FALLBACK_IMAGE : "/mockup.png"}
                alt="NizBank Mobile App - Interface do app mostrando cartões e transações"
                className="relative z-10 w-full rounded-[3rem] shadow-2xl border-[12px] border-zinc-900 object-cover aspect-[9/19] bg-black"
                loading="lazy"
                onError={handleImageError}
              />
              
              {/* Loading Skeleton (aparece apenas enquanto carrega) */}
              {!imageError && (
                <div className="absolute inset-0 bg-zinc-900 rounded-[3rem] animate-pulse -z-10" />
              )}
              
              {/* Floating UI Badge - Active Status */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 -right-12 bg-white text-black p-3 rounded-2xl font-black shadow-xl z-20 flex items-center gap-2 border border-zinc-200"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>{t('app.active')}</span>
              </motion.div>
              
              {/* Floating UI Badge - Live Indicator */}
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-20 -left-12 bg-orange-500 text-white p-3 rounded-2xl font-black shadow-xl z-20 flex items-center gap-2"
              >
                <Smartphone size={16} />
                <span>{t('app.live')}</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}