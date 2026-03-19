import React from "react";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Freelance Designer",
    image: "https://images.unsplash.com/photo-1746632452765-05eeadb3c552?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjB3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM3MzQ3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "NizBank completely changed how I manage my international clients. The instant transfers and zero hidden fees have saved me hundreds of dollars every month."
  },
  {
    name: "Michael Chen",
    role: "Tech Entrepreneur",
    image: "https://images.unsplash.com/photo-1764816657425-b3c79b616d14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMG1hbiUyMGNhc3VhbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mzc3NDMzNHww&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "The budgeting tools in the app are phenomenal. It's like having a financial advisor in my pocket. The Metal card also gets a lot of compliments!"
  },
  {
    name: "Elena Rodriguez",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM3NzQzMjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    quote: "I travel full-time and rely entirely on my NizBank Premium card. The real-time exchange rates and free international ATM withdrawals are a lifesaver."
  }
];

export function Testimonials() {
  const { t } = useLanguage();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-black mb-6">{t('testimonials.title')}</h2>
          <p className="text-xl text-zinc-600 font-medium">{t('testimonials.subtitle')}</p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              variants={item}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}
              className="bg-zinc-50 p-10 rounded-[2.5rem] border border-zinc-100 flex flex-col justify-between hover:border-zinc-200 transition-colors"
            >
              <div>
                <div className="flex text-orange-500 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, rotate: -30 }} 
                      animate={{ opacity: 1, rotate: 0 }} 
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star size={20} fill="currentColor" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-black font-medium text-xl mb-10 leading-relaxed">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover grayscale-[20%] border-2 border-white shadow-md"
                />
                <div>
                  <h4 className="font-black text-black text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider mt-1">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
           <motion.div 
             whileHover={{ scale: 1.02 }}
             className="inline-flex items-center justify-center gap-8 py-8 px-14 bg-black rounded-[3rem] flex-wrap shadow-2xl shadow-black/20"
           >
              <div className="text-center px-4">
                <div className="text-4xl font-black text-orange-500 mb-1">5M+</div>
                <div className="text-sm text-zinc-400 font-bold uppercase tracking-wider">{t('testimonials.activeUsers')}</div>
              </div>
              <div className="w-px h-16 bg-zinc-800 hidden sm:block"></div>
              <div className="text-center px-4">
                <div className="text-4xl font-black text-orange-500 mb-1">4.9/5</div>
                <div className="text-sm text-zinc-400 font-bold uppercase tracking-wider">{t('testimonials.rating')}</div>
              </div>
              <div className="w-px h-16 bg-zinc-800 hidden sm:block"></div>
              <div className="text-center px-4">
                <div className="text-4xl font-black text-orange-500 mb-1">$10B+</div>
                <div className="text-sm text-zinc-400 font-bold uppercase tracking-wider">{t('testimonials.processed')}</div>
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
}