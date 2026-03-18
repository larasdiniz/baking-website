import React from "react";
import { Zap, ShieldCheck, RefreshCcw, Headset } from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: <Zap size={28} className="text-orange-500" />,
    title: "Lightning Fast",
    description: "Send and receive money instantly, anywhere in the world. No more waiting days for clearance.",
    bg: "bg-orange-100"
  },
  {
    icon: <RefreshCcw size={28} className="text-black" />,
    title: "Zero Hidden Fees",
    description: "What you see is what you pay. We don't charge maintenance fees or surprise transaction costs.",
    bg: "bg-zinc-100"
  },
  {
    icon: <ShieldCheck size={28} className="text-orange-500" />,
    title: "Ironclad Security",
    description: "Your funds are protected with 256-bit encryption, biometric login, and virtual card numbers.",
    bg: "bg-orange-100"
  },
  {
    icon: <Headset size={28} className="text-black" />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you, anytime, anywhere, in over 15 languages.",
    bg: "bg-zinc-100"
  }
];

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <section id="features" className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4">Banking designed for your lifestyle</h2>
          <p className="text-lg text-zinc-600 font-medium">Everything you need to manage your money efficiently, beautifully packaged into one single app.</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)"
              }}
              className="p-8 rounded-[2rem] bg-white border border-zinc-100 transition-all duration-300 group"
            >
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-black text-black mb-3">{feature.title}</h3>
              <p className="text-zinc-600 font-medium leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
