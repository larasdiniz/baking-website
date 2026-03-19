import React, { createContext, useState, useContext } from "react";

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    'nav.features': 'Features',
    'nav.cards': 'Cards',
    'nav.app': 'App',
    'nav.reviews': 'Reviews',
    'nav.login': 'Log In',
    'nav.openAccount': 'Open Account',
    'nav.backToHome': '← Back to Home',
    
    // Hero
    'hero.badge': 'Smart & Secure Banking',
    'hero.title': 'Banking that works ',
    'hero.titleHighlight': 'for you',
    'hero.subtitle': 'Experience seamless control over your finances with zero hidden fees, instant transfers, and intelligent tracking. Your money, elevated.',
    'hero.openAccount': 'Open an Account',
    'hero.getStarted': 'Get Started',
    'hero.security': 'Bank-level Security',
    'hero.fastSetup': 'Fast Setup',
    
    // Features
    'features.title': 'Banking designed for your lifestyle',
    'features.subtitle': 'Everything you need to manage your money efficiently, beautifully packaged into one single app.',
    'features.instant.title': 'Lightning Fast',
    'features.instant.desc': 'Send and receive money instantly, anywhere in the world. No more waiting days for clearance.',
    'features.fees.title': 'Zero Hidden Fees',
    'features.fees.desc': 'What you see is what you pay. We don\'t charge maintenance fees or surprise transaction costs.',
    'features.security.title': 'Ironclad Security',
    'features.security.desc': 'Your funds are protected with 256-bit encryption, biometric login, and virtual card numbers.',
    'features.support.title': '24/7 Support',
    'features.support.desc': 'Our dedicated team is always here to help you, anytime, anywhere, in over 15 languages.',
    
    // Cards
    'cards.title': 'Choose the card that fits you',
    'cards.subtitle': 'From everyday spending to premium perks, we have a plan designed for your financial journey.',
    'cards.popular': 'Most Popular',
    'cards.standard.name': 'Standard',
    'cards.standard.feature1': 'Virtual card included',
    'cards.standard.feature2': 'Free ATM withdrawals up to $200',
    'cards.standard.feature3': '0.5% Cashback on groceries',
    'cards.standard.feature4': 'Basic customer support',
    'cards.premium.name': 'Premium',
    'cards.premium.feature1': 'Physical & Virtual cards',
    'cards.premium.feature2': 'Free ATM withdrawals up to $800',
    'cards.premium.feature3': '2% Cashback on everything',
    'cards.premium.feature4': 'Priority 24/7 support',
    'cards.premium.feature5': 'Travel insurance included',
    'cards.metal.name': 'Metal',
    'cards.metal.feature1': '18g Stainless Steel card',
    'cards.metal.feature2': 'Unlimited free ATM withdrawals',
    'cards.metal.feature3': '3% Cashback on everything',
    'cards.metal.feature4': 'Dedicated account manager',
    'cards.metal.feature5': 'Premium airport lounge access',
    'cards.free': 'Free',
    'cards.perMonth': '/mo',
    'cards.choose': 'Choose {name}',
    
    // App Showcase
    'app.title': 'Your entire financial life, ',
    'app.titleHighlight': 'in one app.',
    'app.subtitle': 'Download the NizBank app to manage your cards, track expenses in real-time, and send money globally with just a few taps.',
    'app.instant.title': 'Instant Transfers',
    'app.instant.desc': 'Send money to friends and family globally without delays or hidden fees.',
    'app.budgeting.title': 'Smart Budgeting',
    'app.budgeting.desc': 'Auto-categorize your spending and get insights on where your money goes.',
    'app.security.title': 'Security Controls',
    'app.security.desc': 'Freeze cards, set spending limits, and control online payments directly from the app.',
    'app.appStore': 'App Store',
    'app.googlePlay': 'Google Play',
    'app.active': 'Active',
    'app.live': 'Live',
    
    // How It Works
    'how.title': 'How it works',
    'how.subtitle': 'Opening a bank account has never been easier. Skip the branches and paperwork.',
    'how.step1.title': '1. Download & Register',
    'how.step1.desc': 'Download the app and create your account in under 3 minutes using your ID.',
    'how.step2.title': '2. Choose Your Plan',
    'how.step2.desc': 'Select the card and plan that perfectly matches your lifestyle and financial needs.',
    'how.step3.title': '3. Start Banking',
    'how.step3.desc': 'Instantly use your virtual card for online purchases while you wait for the physical one.',
    
    // Testimonials
    'testimonials.title': 'Loved by millions globally',
    'testimonials.subtitle': "Don't just take our word for it. Here's what our users have to say about their experience with NizBank.",
    'testimonials.activeUsers': 'Active Users',
    'testimonials.rating': 'App Store Rating',
    'testimonials.processed': 'Processed Monthly',
    
    // Footer
    'footer.tagline': 'Building the financial ecosystem of the future. Seamless, borderless, and built around your lifestyle.',
    'footer.features': 'Features',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.transfers': 'Transfers',
    'footer.budgeting': 'Budgeting',
    'footer.vaults': 'Vaults',
    'footer.analytics': 'Analytics',
    'footer.about': 'About Us',
    'footer.careers': 'Careers',
    'footer.blog': 'Blog',
    'footer.press': 'Press',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.cookie': 'Cookie Policy',
    'footer.security': 'Security',
    'footer.copyright': '© {year} NizBank. All rights reserved.',
    'footer.status': 'System Operational',
  },
  pt: {
    // Navbar
    'nav.features': 'Recursos',
    'nav.cards': 'Cartões',
    'nav.app': 'App',
    'nav.reviews': 'Avaliações',
    'nav.login': 'Entrar',
    'nav.openAccount': 'Abrir Conta',
    'nav.backToHome': '← Voltar para Início',
    
    // Hero
    'hero.badge': 'Banco Inteligente e Seguro',
    'hero.title': 'Banco que trabalha ',
    'hero.titleHighlight': 'para você',
    'hero.subtitle': 'Experimente o controle total das suas finanças com zero taxas ocultas, transferências instantâneas e acompanhamento inteligente. Seu dinheiro, elevado.',
    'hero.openAccount': 'Abrir Conta',
    'hero.getStarted': 'Começar Agora',
    'hero.security': 'Segurança Bancária',
    'hero.fastSetup': 'Configuração Rápida',
    
    // Features
    'features.title': 'Banco feito para seu estilo de vida',
    'features.subtitle': 'Tudo que você precisa para gerenciar seu dinheiro de forma eficiente, lindamente embalado em um único app.',
    'features.instant.title': 'Rápido como um Raio',
    'features.instant.desc': 'Envie e receba dinheiro instantaneamente, em qualquer lugar do mundo. Sem esperar dias pela compensação.',
    'features.fees.title': 'Zero Taxas Ocultas',
    'features.fees.desc': 'O que você vê é o que você paga. Sem taxas de manutenção ou custos surpresa.',
    'features.security.title': 'Segurança Reforçada',
    'features.security.desc': 'Seus fundos protegidos com criptografia de 256 bits, login biométrico e números de cartão virtuais.',
    'features.support.title': 'Suporte 24/7',
    'features.support.desc': 'Nossa equipe dedicada está sempre aqui para ajudar, em qualquer lugar, em mais de 15 idiomas.',
    
    // Cards
    'cards.title': 'Escolha o cartão ideal para você',
    'cards.subtitle': 'De gastos diários a benefícios premium, temos um plano para sua jornada financeira.',
    'cards.popular': 'Mais Popular',
    'cards.standard.name': 'Padrão',
    'cards.standard.feature1': 'Cartão virtual incluso',
    'cards.standard.feature2': 'Saques gratuitos em ATMs até $200',
    'cards.standard.feature3': '0.5% Cashback em compras',
    'cards.standard.feature4': 'Suporte básico',
    'cards.premium.name': 'Premium',
    'cards.premium.feature1': 'Cartões físico e virtual',
    'cards.premium.feature2': 'Saques gratuitos em ATMs até $800',
    'cards.premium.feature3': '2% Cashback em todas as compras',
    'cards.premium.feature4': 'Suporte prioritário 24/7',
    'cards.premium.feature5': 'Seguro viagem incluso',
    'cards.metal.name': 'Metal',
    'cards.metal.feature1': 'Cartão em aço inoxidável 18g',
    'cards.metal.feature2': 'Saques ilimitados em ATMs',
    'cards.metal.feature3': '3% Cashback em todas as compras',
    'cards.metal.feature4': 'Gerente de conta dedicado',
    'cards.metal.feature5': 'Acesso premium a salas VIP',
    'cards.free': 'Grátis',
    'cards.perMonth': '/mês',
    'cards.choose': 'Escolher {name}',
    
    // App Showcase
    'app.title': 'Toda sua vida financeira, ',
    'app.titleHighlight': 'em um app.',
    'app.subtitle': 'Baixe o app NizBank para gerenciar seus cartões, acompanhar despesas em tempo real e enviar dinheiro globalmente com apenas alguns toques.',
    'app.instant.title': 'Transferências Instantâneas',
    'app.instant.desc': 'Envie dinheiro para amigos e familiares globalmente sem atrasos ou taxas ocultas.',
    'app.budgeting.title': 'Orçamento Inteligente',
    'app.budgeting.desc': 'Categorize automaticamente seus gastos e obtenha insights sobre seu dinheiro.',
    'app.security.title': 'Controles de Segurança',
    'app.security.desc': 'Congele cartões, defina limites e controle pagamentos online diretamente do app.',
    'app.appStore': 'App Store',
    'app.googlePlay': 'Google Play',
    'app.active': 'Ativo',
    'app.live': 'Ao Vivo',
    
    // How It Works
    'how.title': 'Como funciona',
    'how.subtitle': 'Abrir uma conta nunca foi tão fácil. Sem filas ou papelada.',
    'how.step1.title': '1. Baixe e Registre',
    'how.step1.desc': 'Baixe o app e crie sua conta em menos de 3 minutos usando seu documento.',
    'how.step2.title': '2. Escolha seu Plano',
    'how.step2.desc': 'Selecione o cartão que melhor combina com seu estilo de vida e necessidades financeiras.',
    'how.step3.title': '3. Comece a Usar',
    'how.step3.desc': 'Use seu cartão virtual imediatamente para compras online enquanto espera o físico.',
    
    // Testimonials
    'testimonials.title': 'Amado por milhões globalmente',
    'testimonials.subtitle': 'Não acredite apenas em nossa palavra. Veja o que nossos usuários dizem sobre sua experiência com o NizBank.',
    'testimonials.activeUsers': 'Usuários Ativos',
    'testimonials.rating': 'Avaliação na App Store',
    'testimonials.processed': 'Processado Mensalmente',
    
    // Footer
    'footer.tagline': 'Construindo o ecossistema financeiro do futuro. Simples, sem fronteiras e feito para seu estilo de vida.',
    'footer.features': 'Recursos',
    'footer.company': 'Empresa',
    'footer.legal': 'Legal',
    'footer.transfers': 'Transferências',
    'footer.budgeting': 'Orçamento',
    'footer.vaults': 'Cofres',
    'footer.analytics': 'Análises',
    'footer.about': 'Sobre Nós',
    'footer.careers': 'Carreiras',
    'footer.blog': 'Blog',
    'footer.press': 'Imprensa',
    'footer.terms': 'Termos de Uso',
    'footer.privacy': 'Política de Privacidade',
    'footer.cookie': 'Política de Cookies',
    'footer.security': 'Segurança',
    'footer.copyright': '© {year} NizBank. Todos os direitos reservados.',
    'footer.status': 'Sistema Operacional',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}