/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, ArrowRight, Award, Flame, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Background glowing particles/circles (Subtle Orange and Amber flares for light bg) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[130px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-brand-amber/3 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Decorative metal-grid patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:20px_20px] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text and Primary CTAs */}
          <div className="col-span-1 lg:col-span-7 space-y-8 text-left">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-brand-orange/5 border border-brand-orange/20 px-3.5 py-1.5 rounded-full"
            >
              <Flame className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-mono font-bold tracking-wider text-brand-orange uppercase">
                Excelência Tecnológica em Soldagem
              </span>
            </motion.div>

            {/* Display Header */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Engenharia, Auditoria e <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">
                Treinamento de Soldagem
              </span>
            </motion.h1>

            {/* Structured description updated and improved as requested by user */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal"
            >
              A <span className="text-slate-900 font-bold">Smartweld Brasil</span> é uma engenharia especializada que auxilia indústrias a otimizarem fabricações mecânicas e capacita especialistas de elite. Oferecemos preparação técnica avançada para os rigorosos exames oficiais de qualificação e certificação de <span className="text-brand-orange font-semibold">Inspetor de Soldagem N1 e N2</span> de acordo com a norma NBR 14842.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                id="hero-cta-quiz"
                onClick={() => scrollToSection('#avaliador')}
                className="group flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber hover:from-brand-orange hover:to-[#E05A10] text-white font-bold px-7 py-4 rounded-xl transition-all duration-300 shadow-md shadow-brand-orange/15 hover:shadow-lg cursor-pointer"
              >
                Verificar Habilitação N1/N2
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                id="hero-cta-courses"
                onClick={() => scrollToSection('#cursos')}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold px-7 py-4 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Conhecer Cursos
              </button>
            </motion.div>

            {/* Trust points / mini badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-200"
            >
              <div className="space-y-1">
                <span className="block text-2xl font-black text-slate-900 font-display">
                  94%
                </span>
                <span className="block text-xs font-mono text-slate-500 font-medium">
                  Taxa de Aprovação
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-black text-slate-900 font-display">
                  +1.5k
                </span>
                <span className="block text-xs font-mono text-slate-500 font-medium">
                  Profissionais Ativos
                </span>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-black text-slate-900 font-display">
                  NBR 14842
                </span>
                <span className="block text-xs font-mono text-slate-500 font-medium">
                  Formato NBR 14842
                </span>
              </div>
            </motion.div>

          </div>

          {/* Graphic visual side card mimicking Pinterest "Inference at the Edge" dashboard styling */}
          <div className="col-span-1 lg:col-span-5 h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-100/50 overflow-hidden"
            >
              {/* Decorative circuit line on the card banner */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange via-brand-amber to-orange-400"></div>

              {/* Header metrics interface */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 bg-brand-orange/5 rounded-xl text-brand-orange border border-brand-orange/10">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Smartweld Monitor</h3>
                    <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">Weld QA Status</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono bg-green-50 text-green-600 border border-green-100 px-2.5 py-0.5 rounded-full font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping"></span>
                  OPERACIONAL
                </span>
              </div>

              {/* Mock welding gauge controls simulating edge software metrics */}
              <div className="space-y-6 pt-6">
                <div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono pb-2">
                    <span>Aporte Térmico (Thermal Input)</span>
                    <span className="text-brand-orange font-bold">1.8 kJ/mm</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-gradient-to-r from-brand-orange to-brand-amber rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl relative">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Integridade</span>
                    <span className="block text-lg font-bold text-slate-800 font-display mt-0.5">99.85%</span>
                    <span className="absolute top-2 right-2 text-green-500 bg-green-100/50 p-1 rounded-full text-xs">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl relative">
                    <span className="block text-[10px] font-mono text-slate-400 uppercase font-bold">Aprovações</span>
                    <span className="block text-lg font-bold text-slate-800 font-display mt-0.5">Norma NBR 14842</span>
                    <span className="absolute top-2 right-2 text-brand-orange bg-orange-100/50 p-1 rounded-full text-xs">
                      <Star className="w-3.5 h-3.5 text-brand-orange fill-brand-orange/30" />
                    </span>
                  </div>
                </div>

                {/* Micro checklist representing the values of physical quality assurance */}
                <div className="space-y-2 text-xs text-slate-600 font-medium">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 bg-brand-orange rounded-full"></span>
                    <span>Inspeções não destrutivas mecânicas (NDT)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 bg-brand-orange rounded-full"></span>
                    <span>Gestão operacional de processos de fabricação</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 bg-brand-orange rounded-full"></span>
                    <span>Prevenção técnica ativa contra fadiga estrutural</span>
                  </div>
                </div>

                {/* Mini interactive prompt action to check compatibility */}
                <button
                  onClick={() => scrollToSection('#avaliador')}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Iniciar Teste de Habilitação do Inspetor
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
