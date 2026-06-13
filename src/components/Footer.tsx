/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, MapPin, ShieldCheck, Flame, Star, Facebook, Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="sobre" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200">
          
          {/* Brand pitch description */}
          <div className="col-span-1 md:col-span-5 space-y-4 text-left">
            <div onClick={scrollToTop} className="cursor-pointer inline-block">
              <Logo lightBg={true} />
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              A Smartweld Brasil é pioneira em engenharia avançada de soldagem, desenvolvimento de Especificações de Procedimento de Soldagem (EPS, RQP, RQS) e no treinamento preparatório especializado para qualificações de Inspetor N1 e N2, de acordo com as diretrizes rigorosas da NBR 14842 (Critérios para a qualificação e certificação de inspetores de soldagem) e de integridade mecânica de plantas industriais.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-450 text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>Garantia de Qualidade e Conformidade do Setor Metalmecânico</span>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a href="https://www.facebook.com/smartweld.treinamentos/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-orange transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/smartweld.brasil/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-orange transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/smartweld-brasil" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-brand-orange transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links columns */}
          <div className="col-span-1 md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800">Navegação Rápida</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#hero" className="hover:text-brand-orange transition-colors">Voltar ao Topo</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-brand-orange transition-colors">Serviços de Engenharia</a>
              </li>
              <li>
                <a href="#cursos" className="hover:text-brand-orange transition-colors">Treinamentos & Programas</a>
              </li>
              <li>
                <a href="#avaliador" className="hover:text-brand-orange transition-colors">Simulador de Habilitação N1/N2</a>
              </li>
              <li>
                <a href="#consultor" className="hover:text-brand-orange transition-colors">IA Consultor Integrado</a>
              </li>
            </ul>
          </div>

          {/* Contacts info column */}
          <div className="col-span-1 md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-800">Canais de Atendimento</h4>
            <ul className="space-y-3.5 text-xs text-slate-500">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <span>Condomínio do Edifício Open 44<br/>Blvd. 28 de Setembro, 44 - 508 - Vila Isabel<br/>Rio de Janeiro - RJ, 20551-031</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="https://wa.me/5521968998282?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20Smartweld%20Brasil." target="_blank" rel="noreferrer" className="hover:text-brand-orange transition-colors">
                  +55 (21) 96899-8282 (WhatsApp Comercial)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-orange shrink-0" />
                <a href="mailto:smartweldsw@gmail.com" className="hover:text-brand-orange transition-colors">
                  smartweldsw@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Corporate branding and copyright terms of footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-mono">
          <p>© {currentYear} Smartweld Brasil. Engenharia e Treinamentos LTDA. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <span>CNPJ: 30.682.000/0001-80</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
