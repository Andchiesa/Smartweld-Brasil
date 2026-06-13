/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle,
  HelpCircle,
  Loader2,
  MessageCircle
} from 'lucide-react';
import { ChatMessage } from '../types';

export default function ConsultantChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Olá! Sou o Consultor Técnico Virtual da Smartweld Brasil, fundamentado exclusivamente no **LM Welding Inspector Qualification Guide**.\n\nEstou aqui para tirar todas as suas dúvidas sobre requisitos de escolaridade, experiência (NBR 14842), e processos de qualificação e certificação de forma estrita. Como posso te orientar hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [configError, setConfigError] = useState(false);

  const endOfChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      endOfChatRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isLoading]);

  const presetQuestions = [
    'Qual a diferença entre Inspetor N1 e N2?',
    'Engenharia reduz tempo de experiência?',
    'Como funciona a consultoria para EPS?',
    'O curso preparatório tem aulas on-line?',
    'Quais os requisitos da norma NBR 14842?'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMsg('');
    setIsLoading(true);
    setConfigError(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro na comunicação com o servidor.');
      }

      const botMessage: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'assistant',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Erro na requisição para o assistente:', error);
      
      const isApiKeyError = error.message?.includes('GEMINI_API_KEY') || error.message?.includes('chave') || error.message?.includes('Segredo');
      if (isApiKeyError) {
        setConfigError(true);
      }

      const errorMessage: ChatMessage = {
        id: `msg-${Date.now()}-err`,
        sender: 'assistant',
        text: isApiKeyError 
          ? '⚠️ **Aviso de Configuração:** O serviço de Inteligência Artificial está pronto para uso! Mas requer a configuração de sua `GEMINI_API_KEY` no painel de **Secrets (Segredos)** do Google AI Studio para responder.'
          : '⚠️ Não consegui me conectar ao servidor de inteligência artificial neste momento. Por favor, tente enviar sua mensagem novamente ou fale conosco pelo suporte de WhatsApp.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.add('cursor-grabbing');
      scrollContainerRef.current.classList.remove('cursor-grab');
      startX = e.pageX - scrollContainerRef.current.offsetLeft;
      scrollLeft = scrollContainerRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('cursor-grabbing');
      scrollContainerRef.current.classList.add('cursor-grab');
    }
  };

  const handleMouseUp = () => {
    isDown = false;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.classList.remove('cursor-grabbing');
      scrollContainerRef.current.classList.add('cursor-grab');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-fast
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section id="consultor" className="py-24 bg-slate-100/40 relative overflow-hidden border-t border-slate-100">
      {/* Light flares */}
      <div className="absolute top-1/2 left-2/3 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner introduction with icon */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="col-span-1 lg:col-span-5 space-y-6 text-left">
            <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase bg-brand-orange/5 px-3.5 py-1.5 rounded-full inline-block border border-brand-orange/10">
              Consultoria via IA
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
              Tire Suas Dúvidas Técnicas em Soldagem
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Nosso assistente virtual é especialista em normas industriais nacionais e internacionais de soldas, processos de usinagem e processos de qualificação e certificação de acordo com a norma NBR 14842.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Normas: ABNT NBR 14842, AWS D1.1, ASME IX, API 1104</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Documentos industrias: EPS, RQP, RQS, IEs de Soldagem</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-500 font-medium">
                <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Conselho técnico especializado e imediato</span>
              </div>
            </div>

            {/* Quick action button for WhatsApp standard support */}
            <div className="pt-4">
              <a
                href="https://wa.me/5521968998282?text=Falar%20com%20engenheiro%20humano"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 group text-xs font-bold text-brand-orange hover:text-brand-orange/80 transition-colors uppercase tracking-widest"
              >
                Falar com Engenheiro Humano
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Interactive Chat Window panel */}
          <div className="col-span-1 lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 flex flex-col h-[520px]">
              
              {/* Chat Header banner styling */}
              <div className="bg-slate-50 border-b border-slate-150 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-orange/5 border border-brand-orange/15 p-2 rounded-xl text-brand-orange">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1">
                      Consultor Virtual
                      <Sparkles className="w-3.5 h-3.5 text-brand-orange fill-brand-orange/30" />
                    </h4>
                    <p className="text-[10px] font-mono text-brand-orange font-bold">GUIA DE QUALIFICAÇÃO LM • ATIVO</p>
                  </div>
                </div>
                
                {configError && (
                  <span className="flex items-center gap-1 bg-yellow-500/10 text-yellow-600 px-2 py-0.5 rounded-md border border-yellow-500/20 text-[10px] font-mono font-bold">
                    <AlertTriangle className="w-3 h-3" /> API KEY REQUERIDA
                  </span>
                )}
              </div>

              {/* Message scroll container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 font-sans text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3.5 leading-relaxed relative ${
                        msg.sender === 'user'
                          ? 'bg-brand-orange text-white rounded-br-none shadow-md shadow-brand-orange/10'
                          : 'bg-slate-50 border border-slate-150 text-slate-700 rounded-bl-none'
                      }`}
                    >
                      {/* Message text rendering (with simple newline spacing rendering support) */}
                      <span className="block whitespace-pre-wrap font-normal">
                        {msg.text}
                      </span>
                      
                      {/* Message Timestamp */}
                      <span className={`block text-[9px] font-mono mt-1 text-right ${
                        msg.sender === 'user' ? 'text-orange-100 font-medium' : 'text-slate-400 font-medium'
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 border border-slate-150 rounded-2xl rounded-bl-none px-5 py-3.5 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 text-brand-orange animate-spin" />
                      <span className="text-xs text-slate-500 font-mono font-bold">Processando parecer técnico...</span>
                    </div>
                  </div>
                )}
                
                <div ref={endOfChatRef} />
              </div>

              {configError && (
                <div className="px-6 py-2.5 bg-yellow-400/5 border-t border-yellow-500/20 text-[11px] text-yellow-600 flex items-start gap-2">
                  <HelpCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 animate-bounce" />
                  <p>
                    <strong>Como configurar:</strong> Abra o painel **Secrets** no canto superior direito do Google AI Studio, adicione o segredo `GEMINI_API_KEY` com sua chave do Gemini, clique em salvar e atualize a página.
                  </p>
                </div>
              )}

              {/* Suggestion tags displayed on layout */}
              <div 
                ref={scrollContainerRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className="px-6 py-3.5 overflow-x-auto border-t border-slate-100 bg-slate-50/50 flex gap-2 shrink-0 scroll-smooth cursor-grab [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {presetQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    id={`preset-chat-${idx}`}
                    type="button"
                    onClick={() => handleSendMessage(q)}
                    className="whitespace-nowrap text-[11px] font-bold text-slate-600 hover:text-brand-orange border border-slate-200 hover:border-brand-orange/30 px-3.5 py-1.5 rounded-full transition-all cursor-pointer bg-white shadow-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* WhatsApp Banner after first interaction */}
              {messages.length > 1 && (
                <div className="bg-green-50 border-t border-green-100 px-6 py-3 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <MessageCircle className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-[11px] sm:text-xs text-green-800 font-medium">
                      Precisa de uma análise profunda? Eng. Responsável: <span className="font-bold select-all whitespace-nowrap">(21) 96899-8282</span>
                    </span>
                  </div>
                  <a
                    href="https://wa.me/5521968998282?text=Falar%20com%20engenheiro%20humano"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold transition-colors uppercase tracking-widest hidden sm:inline-flex"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="https://wa.me/5521968998282?text=Falar%20com%20engenheiro%20humano"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 bg-green-500 hover:bg-green-600 text-white p-1.5 rounded-lg transition-colors sm:hidden block"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Chat Input form styling */}
              <form
                id="chat-input-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMsg);
                }}
                className="bg-slate-50 px-6 py-4 border-t border-slate-150 flex items-center gap-3"
              >
                <input
                  id="chat-input-field"
                  type="text"
                  placeholder="Pergunte sobre qualificações NBR 14842, normas ou WPS..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 focus:border-brand-orange/45 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none placeholder-slate-400 transition-colors shadow-sm font-normal"
                />
                <button
                  id="chat-submit-btn"
                  type="submit"
                  disabled={!inputMsg.trim() || isLoading}
                  className={`p-3 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    !inputMsg.trim() || isLoading
                      ? 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60'
                      : 'bg-brand-orange text-white hover:bg-brand-orange/90 shadow-md shadow-brand-orange/15'
                  }`}
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
