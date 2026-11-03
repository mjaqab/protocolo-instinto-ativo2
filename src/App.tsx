/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { 
  Check, 
  ChevronDown, 
  Heart, 
  Sparkles, 
  Calendar, 
  Info, 
  Clock, 
  Target, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Star,
  Cat,
  Gamepad2,
  Brain,
  Eye,
  Home,
  Menu,
  X,
  User,
  ShoppingBag,
  Mail
} from 'lucide-react';
import { useState, useEffect } from 'react';

// --- Configuração editável ---
const CHECKOUT_URL = "https://pay.hotmart.com/L108286178R?checkoutMode=10";
// Preço em dólar. Ajuste conforme a estratégia. Deixe ORIGINAL_PRICE vazio ("") para não mostrar preço "De".
const ORIGINAL_PRICE = "";
const PRICE_MAIN = "US$ 12,90";
// Opcional: texto abaixo do preço (ex.: "pagamento único"). Deixe "" para ocultar.
const PRICE_NOTE = "pagamento único • acesso imediato";
// Mostre os prints de depoimentos APENAS se forem de clientes reais deste kit.
const SHOW_TESTIMONIALS = false;
// Imagens: false = imagens atuais do site (imgur); true = imagens novas em /public/img
// Frase fixa no topo da página (cutuca a dor do tutor)
const TOP_MESSAGE = "Seu gato tem comida, casa e carinho. Mas quando foi a última vez que ele caçou alguma coisa?";
// Imagem da seção "erros" (abaixo da faixa de números). Troque por "/img/sinais.webp" quando tiver a nova.
const PAIN_IMAGE = "/img/sinais.webp";
const USE_NEW_IMAGES = false;
const IMG = USE_NEW_IMAGES ? {
  hero: "/img/instinto2.webp",
  mockup: "/img/oferta.webp",
  inventory: ["/img/preview_a.webp", "/img/preview_b.webp", "/img/preview_c.webp"],
  instinct: "/img/instinto.webp",
} : {
  hero: "/img/instinto2.webp",
  mockup: "https://i.imgur.com/VLRLnfV.png",
  inventory: ["https://i.imgur.com/vedI5ws.jpeg", "https://i.imgur.com/jSG0LQ7.jpeg", "https://i.imgur.com/ipbMxqr.jpeg"],
  instinct: "https://i.imgur.com/9EXVK6I.jpeg",
};
// Imagens de demonstração (páginas do kit V4, sempre as novas): coloque os arquivos em /public/demo/
const DEMO_IMAGES = ["/demo/1.webp", "/demo/2.webp", "/demo/3.webp", "/demo/4.webp", "/demo/5.webp"];

// --- Components ---

const InventoryCarousel = () => {
  const images = IMG.inventory;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          width={1000}
          height={667}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
          aria-hidden={i !== index}
          alt={`Preview do Kit ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            aria-label={`Ir para imagem ${i + 1}`}
            className={`relative after:absolute after:-inset-3 after:content-[''] h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-brand-olive w-8' : 'bg-white/40 w-4 hover:bg-white/60'}`} 
          />
        ))}
      </div>
    </div>
  );
};

const DemoCarousel = () => {
  const images = DEMO_IMAGES;
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [index, images.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      <div className="relative w-full aspect-[3/4] max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            width={800}
            height={1131}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
            aria-hidden={i !== index}
            alt={`Demonstração do Kit - Página ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          />
        ))}

        {/* Navigation arrows with glassmorphism */}
        <button 
          onClick={(e) => { e.preventDefault(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/95 backdrop-blur-md rounded-full p-2.5 text-brand-brown hover:scale-110 active:scale-95 transition-all shadow-md z-10"
          aria-label="Imagem anterior"
        >
          <ChevronDown className="w-5 h-5 rotate-90" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/95 backdrop-blur-md rounded-full p-2.5 text-brand-brown hover:scale-110 active:scale-95 transition-all shadow-md z-10"
          aria-label="Próxima imagem"
        >
          <ChevronDown className="w-5 h-5 -rotate-90" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="flex gap-2 mt-6">
        {images.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className={`relative after:absolute after:-inset-3 after:content-[''] h-2 rounded-full transition-all duration-300 ${i === index ? 'bg-brand-olive w-8' : 'bg-brand-brown/20 w-2 hover:bg-brand-brown/40'}`} 
            aria-label={`Ir para slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
    <div className="bg-brand-brown text-white text-center px-4 py-2.5 text-xs sm:text-sm font-semibold leading-snug tracking-wide">
      {TOP_MESSAGE}
    </div>
    <nav className={`transition-all duration-500 ${scrolled ? 'bg-brand-white-warm/95 backdrop-blur-md shadow-sm py-3' : 'bg-brand-white-warm/80 backdrop-blur-sm py-3'}`}>
      <div className="container mx-auto px-6 flex items-center">
        <div className="flex items-center gap-3">
          <Cat className="text-brand-olive w-8 h-8 shrink-0" />
          <div className="flex flex-col">
            <span className="font-display uppercase tracking-widest text-[10px] sm:text-xs font-bold text-brand-brown leading-tight">
              Protocolo Instinto Ativo
            </span>
            <span className="text-[8px] sm:text-[9px] font-medium text-brand-brown-light uppercase tracking-widest mt-0.5">
              Kit de Enriquecimento para Gatos
            </span>
          </div>
        </div>
      </div>
    </nav>
    </header>
  );
};

const SectionHeader = ({ subtitle, title, description, light = false }: { subtitle: string, title: string, description?: string, light?: boolean }) => (
  <div className="max-w-2xl mx-auto text-center mb-16 px-6">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`modern-display text-[10px] sm:text-xs font-bold ${light ? 'text-brand-beige' : 'text-brand-olive'} bg-brand-olive/5 px-4 py-1.5 rounded-full`}
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`editorial-title text-3xl md:text-4xl lg:text-5xl mt-6 leading-tight ${light ? 'text-white' : 'text-brand-brown'}`}
    >
      {title}
    </motion.h2>
    {description && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className={`mt-6 text-lg leading-relaxed ${light ? 'text-brand-beige' : 'text-brand-brown-light'}`}
      >
        {description}
      </motion.p>
    )}
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-beige py-6 last:border-0">
      <button 
        className="w-full flex justify-between items-center text-left gap-4"
        onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}
      >
        <span className="font-serif text-xl sm:text-2xl text-brand-brown">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="text-brand-olive" size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-brand-brown-light leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-olive selection:text-white overflow-x-hidden">
      <Navbar />
      <main>

      {/* 1. HOOK / HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-48 pb-20 px-6 bg-brand-white-warm md:overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-brand-olive/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-brown/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <span className="modern-display text-xs font-bold text-brand-olive bg-brand-olive/10 px-4 py-1.5 rounded-full mb-6">O erro invisível de quem tem gato dentro de casa</span>
            <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl mb-8 leading-[1.1] text-brand-brown">
              O erro que você nem percebe: seu gato recebe tudo pronto e o <span className="text-brand-olive italic">instinto de caça</span> dele nunca tem o que fazer
            </h1>
            <p className="text-lg md:text-xl text-brand-brown-light leading-relaxed mb-10 max-w-lg">
              Comida na tigela, brinquedos parados e a mesma rotina todo dia. Veja 50 atividades simples, com passo a passo em fotos, para devolver a ele a caça, a busca e a descoberta usando o que você já tem em casa.
            </p>
            
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-brand-brown-light/80 text-sm italic">
                <Sparkles className="w-4 h-4 text-brand-olive" />
                <span>Acesso imediato • Material digital em PDF</span>
              </div>
              
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-brand-beige rounded-[40px] overflow-hidden shadow-2xl relative">
              <img 
                src={IMG.hero} 
                width={1000} height={667} fetchPriority="high" decoding="async"
                alt="Gato em posição de caça atrás de uma caixa de papelão, olhando uma bolinha" 
                className="w-full h-full object-cover object-[70%_50%] hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* Selo + capa do kit */}
            <div className="absolute top-4 left-4 bg-white/95 text-brand-brown text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
              50 atividades • passo a passo em fotos
            </div>
            <motion.img
              src="/demo/1.webp" width={140} height={198} loading="lazy" decoding="async"
              alt="Capa do Protocolo Instinto Ativo"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-8 -right-3 w-28 sm:w-36 rounded-xl shadow-2xl border-4 border-white rotate-3"
            />
          </motion.div>
        </div>
      </section>

      {/* 2. PROVA SOCIAL / AUTORIDADE */}
      <section className="py-20 bg-brand-beige/30 border-y border-brand-beige">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <p className="editorial-title text-2xl sm:text-3xl text-brand-brown leading-relaxed">
                "Gatos que vivem dentro de casa precisam de oportunidades para caçar, explorar e resolver pequenos desafios. Pequenos estímulos diários ajudam a tornar o ambiente mais interessante."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <span className="editorial-title text-4xl text-brand-olive">50</span>
                <span className="modern-display text-[10px] text-brand-brown-light font-bold mt-2 uppercase tracking-widest">Atividades no kit</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="editorial-title text-4xl text-brand-olive">100%</span>
                <span className="modern-display text-[10px] text-brand-brown-light font-bold mt-2 uppercase tracking-widest">Digital e imediato</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PEDRA NO SAPATO (PAIN) */}
      <section className="py-24 px-6 bg-brand-white-warm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="aspect-square bg-brand-beige rounded-[40px] overflow-hidden shadow-xl">
                <img 
                  src={PAIN_IMAGE} loading="lazy" decoding="async" width={1000} height={1000} 
                  alt="Gato indiferente ao lado de uma tigela cheia e de um brinquedo parado" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <div className="order-1 md:order-2">
              <SectionHeader 
                subtitle="O erro invisível" 
                title="Você cuida de tudo. Mas talvez esteja cometendo estes erros:"
                description=""
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-[-40px]">
                {[
                  "Comida sempre pronta na tigela, sem esforço",
                  "Os mesmos brinquedos parados no chão",
                  "Rotina igual todos os dias",
                  "Brincar só quando sobra tempo",
                  "Achar que dormir muito é \"coisa de gato\"",
                  "Comprar mais brinquedos em vez de variar",
                  "Deixar a janela como único entretenimento",
                  "Esperar que o gato se vire sozinho"
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-brand-beige/50"
                  >
                    <div className="bg-brand-olive/10 p-1.5 rounded-full shrink-0">
                      <X className="w-3 h-3 text-brand-olive" />
                    </div>
                    <span className="text-sm font-medium text-brand-brown">{item}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-12 p-8 bg-brand-brown text-white rounded-[32px] shadow-lg">
                <h3 className="editorial-title text-xl mb-4 italic">Por que parece certo?</h3>
                <p className="text-brand-beige/80 leading-relaxed text-sm">
                  Porque o gato está alimentado, seguro e cheio de carinho. O que falta não é cuidado: é oportunidade de caçar, explorar e resolver pequenos desafios. Sinais como dormir demais, miar à noite ou arranhar os móveis podem ter várias causas; se forem intensos, persistentes ou aparecerem de repente, procure um veterinário antes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DIAGNÓSTICO */}
      <section className="py-24 bg-brand-olive text-white relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <Cat className="absolute top-10 -left-20 w-96 h-96 rotate-12" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <SectionHeader 
            subtitle="Por que os instintos importam" 
            title="Dentro de casa, o instinto de caça não desaparece: ele só fica sem uso."
            light
          />
          <div className="mb-16 rounded-[40px] overflow-hidden shadow-2xl border border-white/10 max-w-2xl mx-auto">
            <img src={IMG.instinct} loading="lazy" decoding="async" width={1000} height={667} alt="Gato em posição de caça atrás de uma caixa de papelão" className="w-full opacity-90" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Target, label: "Caçar" },
              { icon: Eye, label: "Observar" },
              { icon: Brain, label: "Desafiar" },
              { icon: Home, label: "Território" },
              { icon: Gamepad2, label: "Explorar" },
              { icon: Sparkles, label: "Sentir" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm group"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 3, delay: idx * 0.2 }}
                >
                  <item.icon className="w-8 h-8 mb-4 text-brand-beige group-hover:text-white transition-colors" />
                </motion.div>
                <span className="modern-display text-[10px] sm:text-xs font-bold tracking-widest">{item.label}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xl md:text-2xl font-serif italic text-brand-beige/90 leading-normal max-w-3xl mx-auto">
            "Você não precisa de uma casa grande nem de brinquedos caros. Pequenas atividades de caça, busca e descoberta já deixam o ambiente muito mais vivo para o seu gato."
          </p>
        </div>
      </section>

      {/* 5. COMO FUNCIONA (STEPS) */}
      <section className="py-24 bg-brand-white-warm px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            subtitle="A Prática" 
            title="Como funciona o sistema"
            description="Um passo a passo simples para despertar o instinto do seu gato, uma atividade por vez."
          />
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Escolha", desc: "Selecione uma atividade da nossa biblioteca de 50 sugestões premium." },
              { step: "02", title: "Reúna", desc: "Use materiais simples que você já tem em casa, como caixas, papel e potes." },
              { step: "03", title: "Monte", desc: "Siga o passo a passo com fotos e monte o estímulo em poucos minutos." },
              { step: "04", title: "Estimule", desc: "Observe seu gato explorar, interagir e demonstrar sua curiosidade natural." }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="bg-white p-10 rounded-[32px] border border-brand-beige h-full shadow-sm hover:shadow-xl transition-all hover:bg-brand-beige/10">
                  <span className="editorial-title text-5xl text-brand-olive/20 group-hover:text-brand-olive/40 transition-colors">{item.step}</span>
                  <h3 className="font-display font-bold uppercase tracking-widest text-sm mt-6 mb-4 text-brand-brown">{item.title}</h3>
                  <p className="text-brand-brown-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. O QUE TEM DENTRO (LIBRARY) */}
      <section id="conteudo" className="py-24 bg-brand-beige relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader 
                subtitle="O Inventário" 
                title="O que você vai receber"
                description="Material visual, feito para ser consultado no dia a dia, com fotos e instruções claras."
              />
              <div className="space-y-6 mt-[-40px]">
                {[
                  { title: "50 atividades prontas para aplicar", desc: "Cada uma com materiais, custo aproximado, passo a passo e tempo de preparo.", icon: Heart },
                  { title: "Ajuste para o jeito do seu gato", desc: "Dicas para gatos tímidos, ativos ou curiosos, e erros comuns a evitar.", icon: Brain },
                  { title: "Segurança em cada ficha", desc: "Avisos sobre materiais, supervisão e quando procurar o veterinário.", icon: ShieldCheck },
                                  ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6 p-6 bg-white rounded-3xl shadow-sm border border-white/50 group"
                  >
                    <motion.div 
                      className="bg-brand-olive/10 p-4 rounded-2xl shrink-0 h-fit"
                      whileInView={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, delay: 0.5 + (idx * 0.1) }}
                    >
                      <item.icon className="text-brand-olive w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="editorial-title text-xl text-brand-brown mb-1">{item.title}</h3>
                      <p className="text-brand-brown-light text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10">
                <div className="inline-block bg-brand-olive text-white px-5 py-1.5 rounded-full mb-5 font-display text-[10px] font-bold tracking-[0.2em] uppercase">
                  + 3 bônus incluídos
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Calendário Semanal Inteligente", desc: "Uma forma simples de alternar as atividades ao longo da semana e manter o ambiente sempre interessante.", icon: Calendar },
                    { title: "Checklist de Evolução do Seu Gato", desc: "Acompanhe com calma como seu gato responde às atividades e o que ajustar em cada fase.", icon: Check },
                    { title: "Guia Inteligente de Uso do Kit", desc: "Como aproveitar melhor os estímulos e por onde começar, sem se perder entre as 50 atividades.", icon: Target },
                  ].map((b, idx) => (
                    <div key={idx} className="flex gap-4 p-5 bg-white rounded-2xl border border-brand-olive/20">
                      <div className="bg-brand-olive/10 p-3 rounded-xl shrink-0 h-fit">
                        <b.icon className="text-brand-olive w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="editorial-title text-lg text-brand-brown mb-1">{b.title}</h3>
                        <p className="text-brand-brown-light text-sm leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-brand-white-warm rounded-[40px] overflow-hidden shadow-2xl relative border border-brand-beige">
                <InventoryCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMONSTRAÇÃO DO KIT (SNEAK PEEK) */}
      <section className="py-24 bg-brand-white-warm text-center border-t border-brand-beige/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionHeader 
            subtitle="Por Dentro do Material" 
            title="Demonstração Prática do Kit"
            description="Veja páginas reais do material: passo a passo com fotos, materiais e dicas de segurança."
          />
          <div className="mt-[-20px] mb-8">
            <DemoCarousel />
          </div>
        </div>
      </section>

      {/* 7. TESTEMUNHOS (SOCIAL PROOF) */}
      {SHOW_TESTIMONIALS && (
      <section className="py-24 bg-[#FAF9F5] border-t border-brand-beige/30">
        <div className="container mx-auto px-6">
          <SectionHeader 
            subtitle="Resultados Reais" 
            title="Quem já transformou a rotina do seu felino"
            description="Confira abaixo conversas e depoimentos reais enviados por tutores de gatos que aplicaram o material:"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              "https://i.imgur.com/Dv4sG5K.png",
              "https://i.imgur.com/KMYoWZt.png",
              "https://i.imgur.com/qUhROMG.png",
              "https://i.imgur.com/GDlTv3b.png"
            ].map((imgUrl, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-3 rounded-3xl shadow-sm border border-brand-beige/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center overflow-hidden group"
              >
                <img 
                  src={imgUrl} 
                  alt={`Feedback Real de Tutor ${idx + 1}`} 
                  className="w-full h-auto rounded-2xl group-hover:scale-102 transition-all duration-550 object-cover shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 8. PRA QUEM É (AUDIENCE) */}
      <section className="py-24 bg-brand-white-warm px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-brand-brown rounded-[48px] p-12 md:p-20 text-white overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="modern-display text-xs text-brand-beige tracking-widest font-bold mb-6 block">Destino</span>
                <h2 className="editorial-title text-4xl sm:text-5xl mb-8 leading-tight">Este kit foi desenhado <span className="italic text-brand-beige">exclusivamente</span> para:</h2>
                <div className="space-y-4">
                  {[
                    "Gatos que vivem 100% internos",
                    "Casas e apartamentos de qualquer tamanho",
                    "Tutores com rotinas corridas",
                    "Gatos que passam muito tempo sozinhos ou parados",
                    "Quem quer enriquecer a rotina do gato sem gastar muito"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="bg-white/10 p-1 rounded-full"><Check className="text-brand-olive w-3 h-4" /></div>
                      <span className="text-sm text-brand-beige/80 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-brand-white-warm/5 backdrop-blur-xl p-8 rounded-[32px] border border-white/10">
                <img 
                  src="https://i.imgur.com/VBp30qp.jpeg" 
                  alt="Gato feliz e estimulado" 
                  className="rounded-3xl mb-8"
                />
                <p className="editorial-title text-2xl italic text-brand-beige">Um ambiente mais interessante faz diferença na rotina do seu gato.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 & 9. ANCORAGEM + OFERTA */}
      <section id="oferta" className="py-24 bg-brand-white-warm">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <SectionHeader 
            subtitle="Invista no Bem-Estar" 
            title="Acesso completo ao Protocolo Instinto Ativo"
          />
          
          <div className="bg-white rounded-[48px] shadow-[0_32px_64px_-16px_rgba(125,138,111,0.15)] border border-brand-beige p-8 md:p-16 relative overflow-hidden">
            <img src="/img/oferta.webp" loading="lazy" decoding="async" width={1000} height={667} alt="Kit em tablet e celular" className="w-full rounded-3xl mb-10 object-cover aspect-[16/9]" />
            
            <div className="relative z-10">
              <div className="inline-block bg-brand-olive/10 text-brand-olive px-6 py-2 rounded-full mb-8 font-display text-[10px] font-bold tracking-[0.2em] uppercase">
                ACESSO COMPLETO • PDF
              </div>
              
              <div className="mb-12 flex flex-col items-center">
                {ORIGINAL_PRICE && (
                  <p className="text-brand-brown-light/60 line-through text-xl mb-3">De {ORIGINAL_PRICE}</p>
                )}

                <div className="flex flex-col items-center justify-center gap-1 mb-2">
                  <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
                    <span className="text-brand-olive text-6xl sm:text-8xl md:text-9xl font-sans font-black tracking-tighter leading-none">{PRICE_MAIN}</span>
                  </div>
                </div>
                {PRICE_NOTE && (
                  <p className="text-brand-brown-light font-display text-sm sm:text-base tracking-widest uppercase mt-4">{PRICE_NOTE}</p>
                )}
                

              </div>

              <div className="grid sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-12">
                <div className="flex items-center gap-3 bg-brand-beige/20 p-4 rounded-xl">
                  <Check className="text-brand-olive w-5 h-5" />
                  <span className="text-sm font-medium text-brand-brown">Acesso imediato</span>
                </div>
                <div className="flex items-center gap-3 bg-brand-beige/20 p-4 rounded-xl">
                  <Check className="text-brand-olive w-5 h-5" />
                  <span className="text-sm font-medium text-brand-brown">50 atividades com fotos</span>
                </div>
                <div className="flex items-center gap-3 bg-brand-beige/20 p-4 rounded-xl">
                  <Check className="text-brand-olive w-5 h-5" />
                  <span className="text-sm font-medium text-brand-brown">3 bônus incluídos</span>
                </div>
                <div className="flex items-center gap-3 bg-brand-beige/20 p-4 rounded-xl">
                  <Check className="text-brand-olive w-5 h-5" />
                  <span className="text-sm font-medium text-brand-brown">Garantia 15 dias</span>
                </div>
              </div>

              <motion.a 
                href={CHECKOUT_URL} 
                target="_blank"
                rel="noopener noreferrer"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
                className="block w-full bg-brand-olive text-white py-6 rounded-full font-bold tracking-[0.2em] text-sm hover:bg-brand-brown transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 mb-4 text-center"
              >
                QUERO DESPERTAR O INSTINTO DO MEU GATO
              </motion.a>
              
              <p className="text-center text-[11px] sm:text-xs text-brand-brown-light/75 font-medium tracking-wide flex items-center justify-center gap-1.5 mb-8">
                <Mail size={13} className="text-brand-olive shrink-0" />
                Acesso imediato • O link para o kit será enviado diretamente para o seu e-mail.
              </p>
              

            </div>
          </div>
        </div>
      </section>

      {/* 10. CONVERSA SÉRIA */}
      <section className="py-24 bg-brand-white-warm px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="border-t border-brand-beige pt-16 grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-2">
              <h3 className="editorial-title text-3xl text-brand-brown italic mb-8">O custo de não agir agora…</h3>
              <div className="space-y-6 text-brand-brown-light leading-relaxed">
                <p>Muitos tutores só percebem a falta de estímulos quando o comportamento já mudou. Tédio, sedentarismo e estresse podem passar despercebidos no dia a dia de um gato que vive só dentro de casa.</p>
                <p>O enriquecimento ambiental não é só brincadeira: é uma forma simples de oferecer ao gato o que a vida dentro de casa costuma tirar, como caçar, explorar e resolver desafios.</p>
              </div>
            </div>
            <div className="bg-brand-beige/30 p-8 rounded-[32px] border border-brand-beige">
              <Clock className="w-8 h-8 text-brand-olive mb-6" />
              <p className="text-sm font-bold text-brand-brown uppercase tracking-widest mb-4">Atenção</p>
              <p className="text-xs text-brand-brown-light leading-relaxed">Não espere o comportamento piorar para variar a rotina do seu gato. Este material complementa os cuidados veterinários e não os substitui.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. AUTORIDADE */}
      <section className="py-24 bg-brand-white-warm">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            
            <div>
              <span className="modern-display text-[10px] sm:text-xs font-bold text-brand-olive tracking-widest border border-brand-olive/20 px-4 py-1.5 rounded-full mb-6 inline-block uppercase">NOSSO PROPÓSITO</span>
              <h3 className="editorial-title text-3xl sm:text-4xl text-brand-brown mb-6 italic leading-tight">Um sistema real, para tutores reais.</h3>
              <p className="text-brand-brown-light leading-relaxed mb-6">
                Este material foi criado com foco absoluto no comportamento felino e enriquecimento ambiental prático. O objetivo nunca foi criar apenas mais um ebook genérico, mas sim um sistema simples, bonito e realmente útil que se encaixa na rotina moderna.
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-brand-olive/10 p-2 rounded-full"><ShieldCheck className="text-brand-olive w-5 h-5" /></div>
                <span className="text-xs font-bold modern-display text-brand-brown opacity-60">COMPROMISSO COM O BEM-ESTAR ANIMAL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ */}
      <section id="faq" className="py-24 bg-brand-beige/20 px-6">
        <div className="container mx-auto max-w-3xl">
          <SectionHeader 
            subtitle="FAQ" 
            title="Dúvidas Frequentes"
          />
          <div className="bg-white p-8 md:p-12 rounded-[48px] shadow-sm border border-brand-beige">
            <AccordionItem 
              question="Funciona para casas ou apartamentos?" 
              answer="Sim! O kit foi pensado para qualquer ambiente interno, focando em aproveitar o espaço disponível da melhor forma possível."
            />
            <AccordionItem 
              question="Já compro brinquedos. Por que isso é diferente?" 
              answer="Brinquedo parado perde a graça. O kit ensina a variar o estímulo (caçar comida, procurar, observar, explorar) com atividades que você monta e troca, sem comprar mais nada."
            />
            <AccordionItem 
              question="Preciso gastar muito com materiais?" 
              answer="De forma alguma. O pilar central do nosso enriquecimento é usar o que você já tem: caixas, papelão, potes e tecidos. A criatividade substitui o custo."
            />
            <AccordionItem 
              question="As atividades são difíceis de montar?" 
              answer="Não. Cada atividade tem passo a passo com fotos. A maioria leva de 2 a 20 minutos para preparar, e o tempo de cada uma aparece na ficha."
            />
            <AccordionItem 
              question="Serve para gatos idosos ou com mobilidade reduzida?" 
              answer="Sim, há atividades de estímulo sensorial e mental (faro, visão, tato) que não exigem esforço físico. Em gatos idosos ou com algum problema de saúde, converse antes com o veterinário."
            />
            <AccordionItem 
              question="As atividades são seguras?" 
              answer="Cada ficha traz erros comuns e dicas de segurança, como usar bolinhas grandes, supervisionar no início e evitar fios soltos. Se o seu gato tiver alguma condição de saúde, consulte o veterinário."
            />
            <AccordionItem 
              question="Em que idioma é o material e serve fora do Brasil?" 
              answer="O material é em português e usa itens fáceis de encontrar em qualquer lugar, como caixas, papel, tampinhas e potes. Os custos citados nas fichas são apenas uma indicação (muito econômico, econômico, baixo custo)."
            />
            <AccordionItem 
              question="Como recebo o acesso?" 
              answer="Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para baixar o kit em PDF."
            />
            <AccordionItem 
              question="Tem garantia?" 
              answer="Sim, oferecemos 15 dias de garantia incondicional. Se não ficar satisfeito com o material, devolvemos seu investimento."
            />
          </div>
          
          <div className="mt-20 text-center">
            <p className="editorial-title text-2xl text-brand-brown italic mb-8">Pequenos estímulos podem mudar o dia do seu gato.</p>
            <a 
              href={CHECKOUT_URL} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-olive text-white px-12 py-5 rounded-full font-bold tracking-[0.2em] text-sm hover:bg-brand-brown transition-all shadow-xl hover:shadow-2xl inline-block"
            >
              QUERO ACESSAR O KIT
            </a>
            <p className="text-center text-[11px] sm:text-xs text-brand-brown-light/75 font-medium tracking-wide flex items-center justify-center gap-1.5 mt-4">
              <Mail size={13} className="text-brand-olive shrink-0" />
              Acesso imediato • O link para o kit será enviado diretamente para o seu e-mail.
            </p>
          </div>
        </div>
      </section>

      </main>

      {/* FOOTER */}
      <footer className="py-12 bg-brand-white-warm border-t border-brand-beige">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8 opacity-40">
            <Cat className="text-brand-brown w-5 h-5" />
            <span className="font-display uppercase tracking-[0.4em] text-[10px] font-bold text-brand-brown">Protocolo Instinto Ativo</span>
          </div>
          <p className="text-[10px] text-brand-brown-light/60 uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} • Todos os direitos reservados • Política de Privacidade
          </p>
        </div>
      </footer>
    </div>
  );
}
