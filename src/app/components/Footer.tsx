import React from "react";
import { Wallet, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-zinc-400 py-16 border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Wallet size={20} />
              </div>
              <span className="text-xl font-black text-white">NizBank</span>
            </div>
            <p className="text-zinc-400 mb-6 max-w-sm font-medium">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.features')}</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.transfers')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.budgeting')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.vaults')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.analytics')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.press')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-3 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.terms')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.cookie')}</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">{t('footer.security')}</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500 font-medium">
          <p>{t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div> {t('footer.status')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}