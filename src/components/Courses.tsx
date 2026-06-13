/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, BookOpen, Laptop, Milestone, ArrowRight, ClipboardCheck, ExternalLink, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';

export default function Courses() {
  const mainCourses = [
    {
      id: "course-n1",
      badge: "Formação Básica de Inspetor",
      title: "Inspetor de Soldagem Nível 1",
      desc: "Desenvolvido especificamente para formar profissionais capazes de atuar no controle de qualidade de fabricações e montagens soldadas.",
      duration: "Acessar Plataforma",
      format: "On-line",
      link: "https://hotmart.com/pt-br/marketplace/produtos/hagsxd-curso-de-inspetor-de-soldagem-nivel-1-k5xau/R94517441P?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      id: "course-n2",
      badge: "Especialização de Alto Nível",
      title: "Inspetor de Soldagem Nível 2",
      desc: "Voltado para profissionais que desejam assumir a responsabilidade final da controle de qualidade industrial.",
      duration: "Acessar Plataforma",
      format: "On-line",
      link: "https://hotmart.com/pt-br/marketplace/produtos/curso-de-inspetor-de-soldagem-nivel-2/C70457690Q"
    }
  ];

  const additionalCourses = [
    {
      title: "Rota Alternativa - AWS D1.1",
      type: "Curso de Qualificação",
      link: "https://pay.hotmart.com/O76296296A?bid=1706400174402"
    },
    {
      title: "Rota Alternativa - ASME B31.3",
      type: "Curso de Qualificação",
      link: "https://pay.hotmart.com/Q78333616S?bid=1706400058815"
    },
    {
      title: "Análise de Certificados de Consumíveis de Soldagem",
      type: "Módulo Técnico",
      link: "https://hotmart.com/pt-br/marketplace/produtos/analise-de-certificados-de-consumiveis-de-soldagem/K73076810H?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Norma AWS D1.1",
      type: "Módulo Normativo",
      link: "https://hotmart.com/pt-br/marketplace/produtos/norma-aws-d1-1/C76111533L?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Norma ASME B31.3",
      type: "Módulo Normativo",
      link: "https://hotmart.com/pt-br/marketplace/produtos/norma-asme-b31-3/F76739162P?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Qualificações de Procedimento de Soldagem",
      type: "Especialização RQP/EPS",
      link: "https://hotmart.com/pt-br/marketplace/produtos/qualificacoes-de-procedimento-de-soldagem/T73443690J?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Ensaio Macrográfico em Juntas Soldadas",
      type: "Ensaios Destrutivos",
      link: "https://hotmart.com/pt-br/marketplace/produtos/ensaio-macrografico-em-juntas-soldadas/G73449731E?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Documentos Técnicos de Soldagem",
      type: "Gestão da Qualidade",
      link: "https://hotmart.com/pt-br/marketplace/produtos/documentos-tecnicos-de-soldagem-ieis-rsq/T73227015L?sck=HOTMART_PRODUCT_PAGE"
    },
    {
      title: "Metais e Ligas - E-book Metalurgia Física",
      type: "E-book / Resumo Técnico",
      link: "https://pay.hotmart.com/Y90912018K?off=xc03ygua&_hi=eyJjaWQiOiIxNjUzMTU2MjIxNDUwODI0OTY4NTgxOTQwNjk0MzAwIiwiYmlkIjoiMTY1MzE1NjIyMTQ1MDgyNDk2ODU4MTk0MDY5NDMwMCIsInNpZCI6IjEwMTc2YjA1YjRlOTQ1Y2FiZDBiYTNjODJhMzJkNjI5In0=.1710093304039&bid=1780424277595"
    }
  ];

  const scrollToQuiz = () => {
    const quizEl = document.querySelector("#avaliador");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="cursos" className="py-24 bg-slate-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header information */}
        <div className="text-center max-w-3xl mx-auto pb-16 space-y-4">
          <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase bg-brand-orange/5 px-3.5 py-1.5 rounded-full inline-block border border-brand-orange/10">
            Trilhas de Aprendizagem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Catálogo de Treinamentos Industriais
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Seja um especialista em qualidade com nossos cursos normativos, preparatórios e módulos técnicos focados no desenvolvimento real do chão de fábrica (de acordo com a NBR 14842).
          </p>
        </div>

        {/* Main Formations N1/N2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mainCourses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-slate-200 hover:border-brand-orange/30 p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-lg relative group transition-all duration-300"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-orange bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
                    {course.badge}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-800 font-display">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {course.desc}
                  </p>
                </div>

              </div>

              <div className="pt-8 space-y-3 mt-auto">
                <button
                  onClick={scrollToQuiz}
                  className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Milestone className="w-4 h-4 text-brand-orange" />
                  Testar Elegibilidade
                </button>
                
                <a
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Inscrever-se Agora
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Modular Courses Grid */}
        <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-800 font-display mb-8">
              Módulos Técnicos e Rotas Alternativas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {additionalCourses.map((course, idx) => (
                <motion.a
                  href={course.link}
                  target="_blank"
                  rel="noreferrer"
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group block p-5 rounded-2xl border border-slate-200 bg-white hover:border-brand-orange/40 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-orange/5 flex-shrink-0 flex items-center justify-center border border-brand-orange/10 group-hover:bg-brand-orange/10 group-hover:scale-110 transition-all">
                      <Bookmark className="w-4.5 h-4.5 text-brand-orange" />
                    </div>
                    <div className="space-y-1 mt-0.5">
                      <span className="block text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                        {course.type}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-brand-orange transition-colors">
                        {course.title}
                      </h4>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
        </div>

      </div>
    </section>
  );
}
