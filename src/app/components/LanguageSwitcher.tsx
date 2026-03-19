import React from "react";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 hover:bg-white/30 transition-colors"
      >
        <Globe size={18} className="text-black" />
        <span className="text-sm font-bold text-black uppercase">{language}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 mt-2 w-32 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 overflow-hidden z-50"
            >
              <button
                onClick={() => {
                  setLanguage('en');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-orange-500 hover:text-white transition-colors font-bold ${
                  language === 'en' ? 'bg-orange-500 text-white' : 'text-black'
                }`}
              >
                🇺🇸 English
              </button>
              <button
                onClick={() => {
                  setLanguage('pt');
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-orange-500 hover:text-white transition-colors font-bold ${
                  language === 'pt' ? 'bg-orange-500 text-white' : 'text-black'
                }`}
              >
                🇧🇷 Português
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}