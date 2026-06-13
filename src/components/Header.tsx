/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Phone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Serviços & Engenharia', href: '#servicos' },
    { label: 'Cursos', href: '#cursos' },
    { label: 'Simulador N1/N2', href: '#avaliador' },
    { label: 'IA Consultor', href: '#consultor' },
    { label: 'Sobre Nós', href: '#sobre' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            id="header-logo-link"
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center group"
          >
            <Logo lightBg={true} />
          </a>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item, idx) => (
              <a
                key={idx}
                id={`nav-link-${idx}`}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-semibold text-slate-700 hover:text-brand-orange transition-colors duration-200 uppercase tracking-wider text-[11px] sm:text-[12px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            <button
              id="header-cta-quiz"
              onClick={() => scrollToSection('#avaliador')}
              className="group flex items-center gap-1.5 bg-white border border-slate-200 hover:border-brand-orange/40 hover:shadow-md text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-brand-orange group-hover:text-yellow-500 transition-colors" />
              Simular Elegibilidade
            </button>

            <button
              id="header-cta-consultant"
              onClick={() => scrollToSection('#consultor')}
              className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              Consultor Virtual IA
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 rounded-lg bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-orange/50 mr-1.5 sm:mr-0 cursor-pointer transition-all duration-150"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              {menuItems.map((item, idx) => (
                <a
                  key={idx}
                  id={`mobile-nav-link-${idx}`}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-3 py-2.5 text-base font-semibold text-slate-700 hover:text-brand-orange hover:bg-slate-50 rounded-lg transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-3">
                <button
                  id="mobile-cta-quiz"
                  onClick={() => scrollToSection('#avaliador')}
                  className="w-full text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-sm py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-brand-orange" />
                  Simulador de Habilitação N1/N2
                </button>
                <a
                  id="mobile-cta-whatsapp"
                  href="https://wa.me/5521968998282?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20em%20contato%20com%20a%20Smartweld%20Brasil."
                  target="_blank"
                  rel="noreferrer"
                  className="w-full text-center bg-gradient-to-r from-brand-orange to-brand-amber text-white font-semibold text-sm py-2.5 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Contato Oficial WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
