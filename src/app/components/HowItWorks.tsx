import React from "react";
import { UserPlus, CreditCard, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <UserPlus size={36} className="text-orange-500" />,
      title: t('how.step1.title'),
      description: t('how.step1.desc')
    },
    {
      icon: <CreditCard size={36} className="text-black" />,
      title: t('how.step2.title'),
      description: t('how.step2.desc')
    },
    {
      icon: <Smartphone size={36} className="text-orange-500" />,
      title: t('how.step3.title'),
      description: t('how.step3.desc')
    }
  ];

  return (
    <section className="py-32 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">{t('how.title')}</h2>
          <p className="text-xl text-zinc-600 font-medium">{t('how.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center items-start gap-12 max-w-5xl mx-auto relative">
          {/* Animated Connector Line */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-1 bg-zinc-200 z-0 rounded-full overflow-hidden">
             <motion.div 
               initial={{ scaleX: 0 }}
               whileInView={{ scaleX: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               className="h-full bg-orange-500 origin-left"
             />
          </div>
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.6, type: "spring" }}
              className="flex-1 text-center relative z-10 w-full"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-28 h-28 mx-auto bg-white border-4 border-zinc-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-black/5 relative"
              >
                {/* Ping effect behind icon */}
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute inset-0 rounded-[2rem] bg-orange-200 -z-10"
                />
                {step.icon}
              </motion.div>
              <h3 className="text-2xl font-black text-black mb-4">{step.title}</h3>
              <p className="text-zinc-600 leading-relaxed font-medium text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}