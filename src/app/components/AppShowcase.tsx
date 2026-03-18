import React from "react";
import { PieChart, Send, Lock } from "lucide-react";
import { motion } from "motion/react";

export function AppShowcase() {
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
          
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
            >
              Your entire financial life, <span className="text-orange-500">in one app.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg md:text-xl mb-12 max-w-lg font-medium"
            >
              Download the NovaBank app to manage your cards, track expenses in real-time, and send money globally with just a few taps.
            </motion.p>

            <motion.div 
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-8"
            >
              {[
                { icon: <Send size={24} className="text-orange-500" />, title: "Instant Transfers", desc: "Send money to friends and family globally without delays or hidden fees." },
                { icon: <PieChart size={24} className="text-orange-500" />, title: "Smart Budgeting", desc: "Auto-categorize your spending and get insights on where your money goes." },
                { icon: <Lock size={24} className="text-orange-500" />, title: "Security Controls", desc: "Freeze cards, set spending limits, and control online payments directly from the app." }
              ].map((feature, i) => (
                <motion.div key={i} variants={item} className="flex gap-5 group">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-orange-500/50 transition-colors"
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{feature.title}</h3>
                    <p className="text-zinc-400 font-medium text-lg">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-14 flex gap-4"
            >
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white text-black px-8 py-4 rounded-full font-black hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10">
                App Store
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-zinc-900 border-2 border-zinc-800 text-white px-8 py-4 rounded-full font-black hover:border-zinc-600 transition-colors">
                Google Play
              </motion.button>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-center mt-12 lg:mt-0">
            {/* Animated Phone Mockup */}
            <motion.div 
              animate={{ y: [-15, 15, -15], rotate: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[320px]"
            >
               <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full scale-110" />
              <img 
                src="https://images.unsplash.com/photo-1758598303969-9cd99a0a585e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBob2xkaW5nJTIwbW9kZXJuJTIwc21hcnRwaG9uZSUyMHNjcmVlbiUyMG1vY2t8ZW58MXx8fHwxNzczNzc0MzIxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="NovaBank Mobile App"
                className="relative z-10 w-full rounded-[3rem] shadow-2xl border-[12px] border-zinc-900 object-cover aspect-[9/19] grayscale-[40%] contrast-125 bg-black"
              />
              
              {/* Floating UI Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-20 -right-12 bg-white text-black p-3 rounded-2xl font-black shadow-xl z-20 flex items-center gap-2 border border-zinc-200"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Active
              </motion.div>
              
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
