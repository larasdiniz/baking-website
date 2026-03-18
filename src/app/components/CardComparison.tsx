import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    name: "Standard",
    price: "Free",
    color: "bg-zinc-100",
    gradient: "from-zinc-200 to-zinc-300",
    textColor: "text-black",
    features: ["Virtual card included", "Free ATM withdrawals up to $200", "0.5% Cashback on groceries", "Basic customer support"],
    buttonStyle: "bg-zinc-100 text-black hover:bg-zinc-200",
    popular: false
  },
  {
    name: "Premium",
    price: "$9.99/mo",
    color: "bg-orange-500",
    gradient: "from-orange-400 to-orange-600",
    textColor: "text-white",
    features: ["Physical & Virtual cards", "Free ATM withdrawals up to $800", "2% Cashback on everything", "Priority 24/7 support", "Travel insurance included"],
    buttonStyle: "bg-orange-500 text-white hover:bg-orange-600",
    popular: true
  },
  {
    name: "Metal",
    price: "$19.99/mo",
    color: "bg-black",
    gradient: "from-zinc-800 to-black",
    textColor: "text-white",
    features: ["18g Stainless Steel card", "Unlimited free ATM withdrawals", "3% Cashback on everything", "Dedicated account manager", "Premium airport lounge access"],
    buttonStyle: "bg-black text-white hover:bg-zinc-800",
    popular: false
  }
];

export function CardComparison() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70 } }
  };

  return (
    <section id="cards" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4">Choose the card that fits you</h2>
          <p className="text-lg text-zinc-600 font-medium">From everyday spending to premium perks, we have a plan designed for your financial journey.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -15, scale: card.popular ? 1.07 : 1.03 }}
              className={`relative bg-white rounded-[2.5rem] p-8 shadow-lg border transition-shadow duration-300 ${card.popular ? 'border-orange-500 shadow-orange-500/20 scale-105 z-10 py-12' : 'border-zinc-100 shadow-black/5 hover:shadow-black/10'}`}
            >
              {card.popular && (
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-lg shadow-orange-500/30"
                >
                  Most Popular
                </motion.div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black text-black mb-2">{card.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-zinc-900">{card.price.split('/')[0]}</span>
                  {card.price.includes('/') && <span className="text-zinc-500 font-bold">/mo</span>}
                </div>
              </div>

              {/* Minimal Card Representation */}
              <motion.div 
                whileHover={{ rotateY: 10, rotateX: -10, scale: 1.05 }}
                className={`w-full h-44 rounded-2xl bg-gradient-to-br ${card.gradient} shadow-xl mb-10 p-6 flex flex-col justify-between ${card.textColor} relative overflow-hidden`}
                style={{ perspective: 1000 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <div className="text-lg font-black opacity-90 tracking-tight">NovaBank</div>
                <div className="flex justify-between items-end">
                  <div className="font-mono text-sm opacity-90 font-medium tracking-widest">**** 4289</div>
                  <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-md">
                    <div className="w-5 h-5 rounded-full bg-black/40 -mr-2" />
                    <div className="w-5 h-5 rounded-full bg-white/60" />
                  </div>
                </div>
              </motion.div>

              <ul className="space-y-5 mb-10">
                {card.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-3 text-zinc-700 font-medium"
                  >
                    <div className={`mt-0.5 rounded-full p-1 ${card.popular ? 'bg-orange-100 text-orange-600' : 'bg-zinc-100 text-zinc-800'}`}>
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 rounded-xl font-black tracking-wide transition-colors ${card.buttonStyle}`}
              >
                Choose {card.name}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
