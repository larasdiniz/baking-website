// src/app/components/Navbar.tsx
import React, { useState, useEffect } from "react";
import { Menu, X, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../contexts/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Se não for homepage, mostrar navbar simplificada
  if (!isHomePage) {
    return (
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
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black text-black tracking-tight drop-shadow-sm">
                NizBank
              </span>
            </motion.div>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link to="/">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-black hover:text-orange-500 font-bold transition-colors px-4 py-2"
              >
                {t('nav.backToHome')}
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>
    );
  }

  // Navbar original para homepage
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:w-[calc(100%-4rem)] lg:max-w-6xl z-50 transition-all duration-500 rounded-full border ${
          isScrolled
            ? "top-4 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] border-white/60 py-3"
            : "top-6 bg-white/20 backdrop-blur-md shadow-[0_8px_24px_0_rgba(0,0,0,0.04)] border-white/40 py-4"
        }`}
        style={{
          boxShadow: isScrolled 
            ? "0 8px 32px 0 rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5)" 
            : "0 8px 24px 0 rgba(0, 0, 0, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.3)"
        }}
      >
        <div className="px-6 md:px-8 flex items-center justify-between">
          <Link to="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black text-black tracking-tight drop-shadow-sm">
                NizBank
              </span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Features", "Cards", "App", "Reviews"].map((item) => (
              <motion.a 
                key={item}
                whileHover={{ y: -2 }}
                href={`#${item.toLowerCase()}`} 
                className="text-zinc-800 hover:text-orange-500 font-bold transition-colors drop-shadow-sm"
              >
                {t(`nav.${item.toLowerCase()}`)}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-black font-bold hover:text-orange-500 transition-colors px-4 drop-shadow-sm"
              >
                {t('nav.login')}
              </motion.button>
            </Link>
            
            <Link to="/register">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(249,115,22,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-black hover:bg-orange-500 text-white px-6 py-2.5 rounded-full font-bold transition-colors"
              >
                {t('nav.openAccount')}
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-black p-2 bg-white/50 backdrop-blur-md rounded-full hover:bg-white/80 hover:text-orange-500 transition-colors border border-white/50 shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Floating Mobile Menu with Glassmorphism */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden fixed top-24 left-4 right-4 z-40 bg-white/70 backdrop-blur-2xl rounded-3xl py-6 px-6 flex flex-col gap-4 border border-white/60 origin-top shadow-[0_16px_40px_0_rgba(0,0,0,0.1)]"
            style={{ boxShadow: "0 16px 40px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.6)" }}
          >
            {/* Language switcher no mobile */}
            <div className="flex justify-end mb-2">
              <LanguageSwitcher />
            </div>

            {["Features", "Cards", "App", "Reviews"].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-zinc-800 font-bold text-lg p-2 rounded-xl hover:bg-white/50 hover:text-orange-500 transition-colors" 
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(`nav.${item.toLowerCase()}`)}
              </a>
            ))}
            
            <hr className="border-zinc-200/50 my-2" />
            
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full text-center text-black font-bold py-3 rounded-xl hover:bg-white/50 transition-colors">
                {t('nav.login')}
              </button>
            </Link>
            
            <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/20">
                {t('nav.openAccount')}
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}