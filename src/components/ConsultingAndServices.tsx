/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClipboardCheck, FileText, Search, Briefcase, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function ConsultingAndServices() {
  const services = [
    {
      icon: <FileText className="w-6 h-6 text-brand-orange" />,
      title: "Documentação Técnica de Soldagem (EPS, RQPS, RQS)",
      desc: "Elaboração estruturada de documentos essenciais de engenharia - como a EPS, o RQPS e o RQS. Especificamos parâmetros detalhados, comprovamos a qualificação de procedimentos e atestamos a habilidade dos profissionais para garantir conformidade legal, segurança absoluta e qualidade rigorosa nas estruturas soldadas.",
      tag: "Normas & Engenharia"
    },
    {
      icon: <Search className="w-6 h-6 text-brand-orange" />,
      title: "Procedimentos de Ensaios Não Destrutivos (END)",
      desc: "Desenvolvimento técnico detalhado de procedimentos para inspecionar integridade física de materiais sem causar danos. Criamos roteiros precisos com base em padrões nacionais e internacionais (ASME, API, Petrobras, NBR), garantindo critérios de aceitação seguros e rigorosa conformidade industrial.",
      tag: "Inspeção & Qualidade"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-brand-orange" />,
      title: "Consultoria em Metalurgia e Soldagem",
      desc: "Assessoria estratégica integral para empresas e novos negócios na área de soldagem, metalurgia aplicada e controle de qualidade. Orientamos sua operação sobre a correta aplicação de normas técnicas vigentes, melhoria de produtividade, prevenção de falhas e homologação de processos.",
      tag: "Consultoria & Suporte"
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-brand-dark relative">
      {/* Visual wirelines inside layout to match tech pins */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange/15 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase bg-brand-orange/5 px-3.5 py-1.5 rounded-full inline-block border border-brand-orange/10">
              Serviços & Engenharia
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Soluções Integradas em Metalurgia e Soldagem
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Auxiliamos indústrias, estaleiros, caldeirarias e prestadores de serviços de engenharia a operar em conformidade técnica integral, prevenindo falhas estruturais e atendendo a auditorias reguladoras.
            </p>
          </div>

          <a
            href="https://wa.me/5521968998282?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20consultoria%20de%20soldagem%20e%20engenharia."
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white border border-slate-200 hover:border-brand-orange/30 text-slate-800 hover:bg-slate-50 font-bold text-xs px-5 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm shrink-0 w-fit"
          >
            Fazer Orçamento de Consultoria
            <ArrowUpRight className="w-4 h-4 text-brand-orange" />
          </a>
        </div>

        {/* Services Showcase grid system */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 hover:border-brand-orange/20 transition-all duration-300 shadow-sm hover:shadow-md relative group overflow-hidden flex flex-col justify-between"
            >
              {/* Shimmer background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Header card metrics */}
                <div className="flex items-center justify-between">
                  {/* Icon wrap */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-brand-orange/5 group-hover:border-brand-orange/10 transition-all text-brand-orange">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-orange bg-brand-orange/5 px-3 py-1 rounded-md border border-brand-orange/10">
                    {srv.tag}
                  </span>
                </div>

                {/* Typography details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-brand-orange transition-colors font-display">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {srv.desc}
                  </p>
                </div>
              </div>

              {/* Interaction hook */}
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-end">
                <a
                  href={`https://wa.me/5521968998282?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20servi%C3%A7o%3A%20${encodeURIComponent(srv.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 group-hover:text-brand-orange transition-colors"
                >
                  Saiba mais
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Mini stat/quote banner at bottom of services */}
        <div className="mt-16 bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="space-y-2 lg:max-w-2xl text-left relative z-10">
            <h4 className="text-lg font-bold text-slate-800 font-display">
              Precisa de ajuda em Auditorias de WPS ou Qualificação Expressa?
            </h4>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Nossa engenharia apoia indústrias em inspeções de juntas soldadas estruturais nacionais sob padrões NBR, AWS e ASME, preparando toda a documentação da metalúrgica para vistorias fiscais, prevenindo falhas mecânicas com excelência.
            </p>
          </div>

          <a
            href="https://wa.me/5521968998282?text=Falar%20diretamente%20com%20engenheiro%20respons%C3%A1vel"
            target="_blank"
            rel="noreferrer"
            className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold text-xs px-6 py-4 rounded-xl transition-all shadow-md inline-flex items-center gap-2 group shrink-0 relative z-10 cursor-pointer"
          >
            Falar Diretamente com Engenheiro Responsável
            <ArrowUpRight className="w-4.5 h-4.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
