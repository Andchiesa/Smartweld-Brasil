/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Send,
  Zap
} from 'lucide-react';
import { SchoolingLevelStatus, TechnicalFieldStatus, QuizState, EligibilityResult } from '../types';

export default function EligibilityQuiz() {
  const initialState: QuizState = {
    currentStep: 1,
    schooling: '',
    technicalField: 'outros_nao_relacionado',
    experienceMonths: 0,
    isRegisteredN1: false,
    n1Months: 0
  };

  const [state, setState] = useState<QuizState>(initialState);
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const setSchooling = (level: SchoolingLevelStatus) => {
    setState(prev => {
      const nextStepNum = (level === 'fundamental_completo' || level === 'medio_completo') ? 3 : 2;
      return {
        ...prev,
        schooling: level,
        technicalField: (level === 'tecnico' || level === 'superior') ? 'mecanica_metalurgia' : 'outros_nao_relacionado',
        currentStep: nextStepNum
      };
    });
  };

  const nextStep = () => {
    // Validation for Step 1
    if (state.currentStep === 1 && !state.schooling) return;
    
    // Jump Step 2 if schooling is Fundamental or Médio
    if (state.currentStep === 1 && (state.schooling === 'fundamental_completo' || state.schooling === 'medio_completo')) {
      setState(prev => ({ ...prev, currentStep: 3 }));
    } else {
      setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const prevStep = () => {
    if (state.currentStep === 3 && (state.schooling === 'fundamental_completo' || state.schooling === 'medio_completo')) {
      setState(prev => ({ ...prev, currentStep: 1 }));
    } else {
      setState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  // NBR 14842 eligibility evaluation math
  const calculateResult = () => {
    const { schooling, technicalField, experienceMonths, isRegisteredN1, n1Months } = state;

    let elN1 = false;
    let elN2Dir = false;
    let elN2Prog = false;

    let reqN1 = 0;
    let reqN2Dir = 0;
    let reqN2Prog = 0;

    // --- LEVEL 1 (N1) COMPILATION ---
    if (schooling === 'fundamental_completo') {
      reqN1 = 60;
    } else if (schooling === 'medio_completo') {
      reqN1 = 24;
    } else if (schooling === 'tecnico') {
      // Technical school has a subfield check
      reqN1 = (technicalField === 'mecanica_metalurgia' || technicalField === 'naval_civil' || technicalField === 'eletrotecnica') ? 12 : 24;
    } else if (schooling === 'superior') {
      // Engineering / Metalmecânica technologists
      reqN1 = (technicalField === 'mecanica_metalurgia' || technicalField === 'naval_civil' || technicalField === 'eletrotecnica') ? 6 : 12;
    }

    elN1 = experienceMonths >= reqN1;
    const missN1 = Math.max(0, reqN1 - experienceMonths);

    // --- LEVEL 2 DIRECT (N2 DIRETO) COMPILATION ---
    if (schooling === 'superior') {
      reqN2Dir = (technicalField === 'mecanica_metalurgia' || technicalField === 'naval_civil' || technicalField === 'eletrotecnica') ? 12 : 24;
      elN2Dir = experienceMonths >= reqN2Dir;
    } else if (schooling === 'tecnico') {
      reqN2Dir = (technicalField === 'mecanica_metalurgia' || technicalField === 'naval_civil' || technicalField === 'eletrotecnica') ? 36 : 48;
      elN2Dir = experienceMonths >= reqN2Dir;
    } else {
      // Fundamental or Médio can't directly qualify for N2
      reqN2Dir = 999; 
      elN2Dir = false;
    }
    const missN2Dir = reqN2Dir === 999 ? 999 : Math.max(0, reqN2Dir - experienceMonths);

    // --- LEVEL 2 PROGRESSION (N2 PROGRESSÃO SE FOR N1) ---
    if (isRegisteredN1) {
      if (schooling === 'superior') {
        reqN2Prog = 12; // 12 months as active N1
      } else if (schooling === 'tecnico') {
        reqN2Prog = 24; // 24 months as active N1
      } else if (schooling === 'medio_completo') {
        reqN2Prog = 36; // 36 months as active N1
      } else {
        // Fundamental cannot progress directly to N2 without completing medium school
        reqN2Prog = 999;
      }
      elN2Prog = n1Months >= reqN2Prog && reqN2Prog !== 999;
    }
    const missN2Prog = reqN2Prog === 999 ? 999 : Math.max(0, reqN2Prog - n1Months);

    // Determine custom tailored Portuguese feedbacks
    let schoolingLabel = '';
    if (schooling === 'fundamental_completo') schoolingLabel = 'Ensino Fundamental';
    if (schooling === 'medio_completo') schoolingLabel = 'Ensino Médio';
    if (schooling === 'tecnico') schoolingLabel = 'Ensino Técnico';
    if (schooling === 'superior') schoolingLabel = 'Ensino Superior / Engenharia';

    let fb = '';
    if (elN2Dir) {
      fb = `Excelente notícia! Com seu perfil de ${schoolingLabel}, você possui os requisitos oficiais da NBR 14842 para acessar diretamente os exames de qualificação e certificação do nível N1 e do nível N2 (Direto)! Você economiza etapas e já pode postular à liderança de controle e garantia de qualidade na indústria nacional.`;
    } else if (elN1) {
      if (isRegisteredN1 && elN2Prog) {
        fb = `Parabéns! Você já é Inspetor N1 certificado e possui o tempo necessário como ativo (${n1Months} meses/mínimo ${reqN2Prog}) para se qualificar para a promoção de nível N2 (Progressão). Sua jornada rumo à certificação plena está pronta decolar!`;
      } else if (isRegisteredN1) {
        fb = `Você já é certificado N1, mas para progredir ao N2 ainda faltam ${missN2Prog} meses de atuação como inspetor ativo certificado. A Smartweld Brasil oferece mentoria de liderança para acelerar seu amadurecimento técnico!`;
      } else {
        fb = `Sucesso! Seus critérios de ${schoolingLabel} com ${experienceMonths} meses de atividade industrial comprovada te tornam elegível para ingressar na qualificação de Inspetor de Soldagem N1. Os treinamentos da Smartweld Brasil fornecerão todo o rigor necessário para seu sucesso prático e teórico.`;
      }
    } else {
      // Ineligible yet
      if (schooling === 'fundamental_completo') {
        fb = `Atualmente você possui ${experienceMonths} meses de experiência. No Ensino Fundamental, a norma NBR 14842 exige 60 meses (5 anos) para o N1. Faltam ${missN1} meses. Recomendamos conversar com nossos consultores para estruturar seu plano de carreira e acompanhar sua evolução profissional.`;
      } else if (schooling === 'medio_completo') {
        fb = `Quase lá! Para Ensino Médio completo comercial ou comum, são necessários 24 meses de vivência técnica e você conta com ${experienceMonths} meses (faltando ${missN1} meses). A Smartweld Brasil pode te orientar a obter sua qualificação mais rapidamente!`;
      } else {
        fb = `Seu perfil está em desenvolvimento. Para nível ${schoolingLabel}, com a sua formação técnica associada, são mínimos ${reqN1} meses de experiência técnica para o N1. Você declarou ${experienceMonths} meses (faltando ${missN1} meses). Consulte-nos sobre cursos preparatórios complementares!`;
      }
    }

    setResult({
      eligibleN1: elN1,
      eligibleN2Direct: elN2Dir,
      eligibleN2Progression: elN2Prog,
      n1RequiredMonths: reqN1,
      n1MissingMonths: missN1,
      n2DirectRequiredMonths: reqN2Dir,
      n2DirectMissingMonths: missN2Dir,
      n2ProgressionRequiredMonths: reqN2Prog,
      n2ProgressionMissingMonths: missN2Prog,
      feedback: fb
    });
  };

  const getPercentage = (current: number, required: number) => {
    if (required === 0) return 100;
    if (required === 999) return 0;
    const p = Math.round((current / required) * 100);
    return Math.min(100, Math.max(0, p));
  };

  const startWhatsAppChat = () => {
    if (!result) return;
    const { schooling, experienceMonths, isRegisteredN1, n1Months } = state;
    
    let profileStr = `Escolaridade: ${schooling}. Experiência: ${experienceMonths} meses.`;
    if (isRegisteredN1) {
      profileStr += ` (Já certificado N1 com ${n1Months} meses de ativo).`;
    }

    const eligibleStr = result.eligibleN2Direct 
      ? 'Elegível para N1 ou N2 Direto!' 
      : result.eligibleN1 
        ? (result.eligibleN2Progression ? 'Elegível para N2 por Progressão!' : 'Elegível para N1!')
        : `Em progresso (Faltam ${result.n1MissingMonths} meses para N1)`;

    const text = `Olá, Equipe Smartweld Brasil! Fiz o simulador de elegibilidade no site. \n\n*Meu Perfil:*\n• ${profileStr}\n\n*Resultado:*\n• *${eligibleStr}*\n• ${result.feedback}\n\nQuero conversar com o consultor para planejar minha qualificação!`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5521968998282?text=${encodedText}`, '_blank');
  };

  return (
    <section id="avaliador" className="py-24 bg-white relative border-t border-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-40"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title elements */}
        <div className="text-center max-w-2xl mx-auto pb-12">
          <span className="text-brand-orange text-xs font-mono font-bold tracking-widest uppercase bg-brand-orange/5 px-3.5 py-1.5 rounded-full inline-block border border-brand-orange/10">
            Simulador de Habilitação
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 font-display">
            Descubra Sua Elegibilidade N1 ou N2
          </h2>
          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            De acordo com a norma ABNT NBR 14842 (Critérios para a qualificação e certificação de inspetores de soldagem).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50">
          {/* Header indicator */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center text-xs text-slate-500 font-mono">
            <span>Diagnóstico Smartweld</span>
            {!result ? (
              <span>Etapa {state.currentStep} de {state.schooling === 'tecnico' || state.schooling === 'superior' ? '4' : '3'}</span>
            ) : (
              <span className="text-brand-orange">Resultado Disponível</span>
            )}
          </div>

          <div className="p-6 sm:p-10 min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!result ? (
                <div id="quiz-flow-container">
                  {/* STEP 1: Schooling selection */}
                  {state.currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-brand-orange" />
                        1. Qual o seu grau de escolaridade atual?
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { value: 'fundamental_completo', label: 'Ensino Fundamental Completo', desc: 'Exige o tempo regulamentar de prática industrial (60 meses).' },
                          { value: 'medio_completo', label: 'Ensino Médio Completo', desc: 'Segundo grau regular de formação comum (Exige 24 meses).' },
                          { value: 'tecnico', label: 'Ensino Técnico', desc: 'Técnico de mecânica, metalurgia, civil, elétrica, soldagem, etc. (Exige 12 meses).' },
                          { value: 'superior', label: 'Curso Superior ou Engenharia', desc: 'Graduação tecnológica metalmecânica ou engenharias correlatas (Exige 6 meses).' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            id={`schooling-opt-${opt.value}`}
                            type="button"
                            onClick={() => setSchooling(opt.value as SchoolingLevelStatus)}
                            className={`p-5 rounded-2xl text-left border transition-all duration-200 cursor-pointer ${
                              state.schooling === opt.value
                                ? 'border-brand-orange bg-brand-orange/[0.04] text-slate-800 shadow-md shadow-brand-orange/5'
                                : 'border-slate-200 bg-slate-50 hover:border-brand-orange/30 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                                state.schooling === opt.value
                                  ? 'border-brand-orange bg-brand-orange'
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {state.schooling === opt.value && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <span className={`block font-bold text-sm ${state.schooling === opt.value ? 'text-brand-orange font-extrabold' : 'text-slate-800'}`}>
                                  {opt.label}
                                </span>
                                <span className={`block text-xs leading-relaxed ${state.schooling === opt.value ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                  {opt.desc}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Field selection (Only for technical/university candidates) */}
                  {state.currentStep === 2 && (state.schooling === 'tecnico' || state.schooling === 'superior') && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-brand-orange" />
                        2. Sua formação é em qual área técnica?
                      </h3>
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { value: 'mecanica_metalurgia', label: 'Mecânica, Metalurgia ou Soldagem', desc: 'Enquadramentos com o melhor aproveitamento de créditos e meses reduzidos pela NBR 14842.' },
                          { value: 'naval_civil', label: 'Civil, Naval ou Tecnologia Industrial Mecânica', desc: 'Ramos correlatos e válidos sob a norma ABNT NBR 14842.' },
                          { value: 'eletrotecnica', label: 'Eletrotécnica, Elétrica, Química ou Controle da Qualidade', desc: 'Aceitabilidade oficial válida de acordo com o plano letivo.' },
                          { value: 'outros_nao_relacionado', label: 'Outra área profissional / Sem relação direta', desc: 'Diferentes técnicos que não metalmecânicos ou sem formação correlata declarada.' }
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            id={`area-opt-${opt.value}`}
                            type="button"
                            onClick={() => setState(prev => ({ ...prev, technicalField: opt.value as TechnicalFieldStatus, currentStep: 3 }))}
                            className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                              state.technicalField === opt.value
                                ? 'border-brand-orange bg-brand-orange/[0.04] text-slate-800 shadow-sm'
                                : 'border-slate-200 bg-slate-50 hover:border-brand-orange/30 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                                state.technicalField === opt.value
                                  ? 'border-brand-orange bg-brand-orange'
                                  : 'border-slate-300 bg-white'
                              }`}>
                                {state.technicalField === opt.value && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                )}
                              </div>
                              <div className="space-y-1">
                                <span className={`block text-sm font-semibold ${state.technicalField === opt.value ? 'text-brand-orange font-bold' : 'text-slate-800'}`}>
                                  {opt.label}
                                </span>
                                <span className={`block text-xs mt-1 font-sans ${state.technicalField === opt.value ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                                  {opt.desc}
                                </span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Experience selection */}
                  {state.currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-brand-orange" />
                        3. Quanto tempo de experiência de campo você possui na área industrial/soldas?
                      </h3>
                      
                      <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-6 text-center">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <span className="text-4xl font-extrabold text-brand-orange font-mono">
                            {state.experienceMonths}
                          </span>
                          <span className="text-xs font-bold uppercase font-mono tracking-widest text-brand-orange">
                            {state.experienceMonths === 1 ? 'Mês Declarado' : 'Meses Declarados'}
                            <span className="text-slate-500 font-sans tracking-normal capitalize ml-1">
                              ({Math.floor(state.experienceMonths / 12)} {Math.floor(state.experienceMonths / 12) === 1 ? 'ano' : 'anos'} e {state.experienceMonths % 12} meses)
                            </span>
                          </span>
                        </div>

                        <div className="px-2">
                          <input
                            id="exp-slider-months"
                            type="range"
                            min="0"
                            max="120"
                            step="1"
                            value={state.experienceMonths}
                            onChange={(e) => setState(prev => ({ ...prev, experienceMonths: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-slate-250 rounded-lg appearance-none cursor-pointer accent-brand-orange focus:outline-none"
                          />
                          <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                            <span>Nenhuma (0)</span>
                            <span>2 anos (24m)</span>
                            <span>5 anos (60m)</span>
                            <span>10 anos (120m+)</span>
                          </div>
                        </div>

                        {/* Quick increment buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                          {[
                            { value: 0, label: 'Sem Exp.' },
                            { value: 6, label: '6 meses' },
                            { value: 12, label: '1 Ano (12m)' },
                            { value: 24, label: '2 Anos (24m)' },
                            { value: 36, label: '3 Anos (36m)' },
                            { value: 60, label: '5 Anos (60m)' }
                          ].map((pill) => (
                            <button
                              key={pill.value}
                              id={`pill-exp-${pill.value}`}
                              type="button"
                              onClick={() => setState(prev => ({ ...prev, experienceMonths: pill.value }))}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                                state.experienceMonths === pill.value
                                  ? 'bg-brand-orange text-white border-brand-orange shadow-md shadow-brand-orange/15'
                                  : 'bg-white text-slate-600 border-slate-200 hover:text-brand-orange hover:border-slate-300'
                              }`}
                            >
                              {pill.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: Current Inspector progression check */}
                  {state.currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Award className="w-5 h-5 text-brand-orange" />
                        4. Você já é um Inspetor de Soldagem N1 Ativo Certificado?
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4 pb-4">
                        <button
                          id="opt-n1-yes"
                          type="button"
                          onClick={() => setState(prev => ({ ...prev, isRegisteredN1: true }))}
                          className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${
                            state.isRegisteredN1
                              ? 'border-brand-orange bg-brand-orange/[0.04] text-slate-800 shadow-md shadow-brand-orange/5'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            state.isRegisteredN1
                              ? 'border-brand-orange bg-brand-orange'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {state.isRegisteredN1 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <div className="text-center">
                            <span className={`block text-sm font-bold ${state.isRegisteredN1 ? 'text-brand-orange font-extrabold' : 'text-slate-850'}`}>Sim, Sou N1</span>
                            <span className="block text-xs font-sans text-slate-400 mt-1">Busco progressão ao N2</span>
                          </div>
                        </button>

                        <button
                          id="opt-n1-no"
                          type="button"
                          onClick={() => setState(prev => ({ ...prev, isRegisteredN1: false, n1Months: 0 }))}
                          className={`p-5 rounded-2xl flex flex-col items-center justify-center gap-3 border transition-all cursor-pointer ${
                            !state.isRegisteredN1
                              ? 'border-brand-orange bg-brand-orange/[0.04] text-slate-800 shadow-md shadow-brand-orange/5'
                              : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            !state.isRegisteredN1
                              ? 'border-brand-orange bg-brand-orange'
                              : 'border-slate-300 bg-white'
                          }`}>
                            {!state.isRegisteredN1 && (
                              <div className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <div className="text-center">
                            <span className={`block text-sm font-bold ${!state.isRegisteredN1 ? 'text-brand-orange font-extrabold' : 'text-slate-850'}`}>Não</span>
                            <span className="block text-xs font-sans text-slate-400 mt-1">Primeira certificação</span>
                          </div>
                        </button>
                      </div>

                      {state.isRegisteredN1 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4"
                        >
                          <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                            <span>Tempo de atuação como N1 ativo:</span>
                            <span className="text-brand-orange font-bold text-lg">{state.n1Months} meses</span>
                          </div>
                          <input
                            id="n1-slider-months"
                            type="range"
                            min="0"
                            max="60"
                            step="1"
                            value={state.n1Months}
                            onChange={(e) => setState(prev => ({ ...prev, n1Months: parseInt(e.target.value) }))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange focus:outline-none"
                          />
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* Results Section layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                    
                    {/* Gauge 1: Level N1 eligibility */}
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col items-center text-center relative overflow-hidden shadow-sm">
                      {/* Glow indicator */}
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${result.eligibleN1 ? 'from-green-500 to-green-400' : 'from-brand-orange to-brand-amber'}`}></div>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Award className={`w-5 h-5 ${result.eligibleN1 ? 'text-green-500' : 'text-brand-orange'}`} />
                        <span className="text-sm font-bold text-slate-800 font-display">QUALIFICAÇÃO N1</span>
                      </div>

                      <div className="relative flex items-center justify-center my-4 h-24 w-24">
                        {/* Circular progress meter */}
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40"/>
                          <circle className={result.eligibleN1 ? "text-green-500" : "text-brand-orange"} strokeWidth="8" strokeDasharray={`${Math.PI * 60}`} strokeDashoffset={`${Math.PI * 60 * (1 - getPercentage(state.experienceMonths, result.n1RequiredMonths) / 100)}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40"/>
                        </svg>
                        <span className="absolute text-sm font-mono font-bold text-slate-800">
                          {getPercentage(state.experienceMonths, result.n1RequiredMonths)}%
                        </span>
                      </div>

                      {result.eligibleN1 ? (
                        <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                          <CheckCircle2 className="w-4.5 h-4.5 text-green-500" />
                          APTO PARA INGRESSAR
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-xs text-brand-orange bg-brand-orange/5 px-2.5 py-1 rounded-full border border-brand-orange/15 font-bold">
                            Pendente ({state.experienceMonths}/{result.n1RequiredMonths} meses)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Gauge 2: Level N2 eligibility */}
                    <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col items-center text-center relative overflow-hidden shadow-sm">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${(result.eligibleN2Direct || result.eligibleN2Progression) ? 'from-green-500 to-green-400' : 'from-brand-orange/30 to-brand-amber/30'}`}></div>

                      <div className="flex items-center gap-2 mb-3">
                        <Award className={`w-5 h-5 ${(result.eligibleN2Direct || result.eligibleN2Progression) ? 'text-green-500' : 'text-slate-400'}`} />
                        <span className="text-sm font-bold text-slate-800 font-display">QUALIFICAÇÃO N2</span>
                      </div>

                      {/* Display progression or direct accessibility */}
                      {state.schooling === 'tecnico' || state.schooling === 'superior' ? (
                        <>
                          <div className="relative flex items-center justify-center my-4 h-24 w-24">
                            <svg className="w-20 h-20 transform -rotate-90">
                              <circle className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40"/>
                              <circle className={(result.eligibleN2Direct || result.eligibleN2Progression) ? "text-green-500" : "text-brand-amber"} strokeWidth="8" strokeDasharray={`${Math.PI * 60}`} strokeDashoffset={`${Math.PI * 60 * (1 - getPercentage(state.isRegisteredN1 && result.n2ProgressionRequiredMonths !== 999 ? state.n1Months : state.experienceMonths, state.isRegisteredN1 && result.n2ProgressionRequiredMonths !== 999 ? result.n2ProgressionRequiredMonths : result.n2DirectRequiredMonths) / 100)}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40"/>
                            </svg>
                            <span className="absolute text-sm font-mono font-bold text-slate-800">
                              {getPercentage(state.isRegisteredN1 && result.n2ProgressionRequiredMonths !== 999 ? state.n1Months : state.experienceMonths, state.isRegisteredN1 && result.n2ProgressionRequiredMonths !== 999 ? result.n2ProgressionRequiredMonths : result.n2DirectRequiredMonths)}%
                            </span>
                          </div>

                          {(result.eligibleN2Direct || result.eligibleN2Progression) ? (
                            <div className="flex items-center gap-1.5 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                              <CheckCircle2 className="w-4.5 h-4.5 text-green-500" />
                              APTO PARA INGRESSAR
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <span className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 font-bold whitespace-nowrap">
                                Faltam {state.isRegisteredN1 && result.n2ProgressionMissingMonths !== 999 ? `${result.n2ProgressionMissingMonths} meses de N1` : `${result.n2DirectMissingMonths} meses de exp.`}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-2 py-4">
                          <AlertTriangle className="w-8 h-8 text-yellow-500 opacity-60 animate-bounce" />
                          <span className="text-xs text-slate-500 font-sans px-4 font-semibold">
                            Exige no mínimo diploma Técnico ou Superior (Engenharia) completo.
                          </span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Verbal Feedback Narrative */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner mt-4">
                    <h4 className="text-xs font-mono text-brand-orange uppercase tracking-widest flex items-center gap-2 mb-2 font-bold">
                      <Zap className="w-4 h-4 text-brand-orange animate-pulse" />
                      Diagnóstico de Engenharia Smartweld
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-sans font-normal">
                      {result.feedback}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stepper Footer Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Back Btn */}
              {!result && state.currentStep > 1 ? (
                <button
                  id="quiz-prev-btn"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-xs font-mono font-semibold uppercase text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 bg-white rounded-xl shadow-sm transition-all cursor-pointer"
                >
                  Voltar
                </button>
              ) : (
                <div className="hidden sm:block"></div>
              )}

              {/* Central text indicators */}
              {!result && (
                <span className="hidden sm:inline text-xs text-slate-500 font-mono font-medium">
                  Sua elegibilidade é determinada na hora pelos critérios normativos.
                </span>
              )}

              {/* Main Action (Next, Calculate, and WA hooks) */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {!result ? (
                  state.currentStep === (state.schooling === 'tecnico' || state.schooling === 'superior' ? 4 : 3) ? (
                    <button
                      id="quiz-calc-btn"
                      onClick={calculateResult}
                      className="w-full sm:w-auto bg-gradient-to-r from-brand-orange to-brand-amber text-white font-bold text-sm px-6 py-3.5 rounded-xl hover:shadow-lg shadow-brand-orange/20 cursor-pointer"
                    >
                      Calcular Elegibilidade
                    </button>
                  ) : (
                    <button
                      id="quiz-next-btn"
                      onClick={nextStep}
                      disabled={state.currentStep === 1 && !state.schooling}
                      className={`w-full sm:w-auto text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer ${
                        state.currentStep === 1 && !state.schooling
                          ? 'bg-slate-100 text-slate-400 border border-slate-200 opacity-60 cursor-not-allowed'
                          : 'bg-brand-orange hover:bg-brand-orange/90'
                      }`}
                    >
                      Avançar
                    </button>
                  )
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <button
                      id="quiz-retry-btn"
                      onClick={() => {
                        setResult(null);
                        setState(initialState);
                      }}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-3 text-xs bg-white text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl hover:text-brand-orange transition-all cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Refazer Simulação
                    </button>
                    
                    <button
                      id="quiz-wa-btn"
                      onClick={startWhatsAppChat}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all shadow-md hover:scale-[1.01] cursor-pointer animate-pulse"
                    >
                      <Send className="w-4.5 h-4.5 text-white fill-white" />
                      Enviar Resultado no WhatsApp
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Informative Disclaimer card explaining standard */}
        <div className="mt-8 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 flex gap-4 items-start text-xs text-slate-500">
          <AlertTriangle className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-slate-700">Aviso sobre os Critérios Normativos NBR 14842:</h5>
            <p className="leading-relaxed text-slate-600">
              O tempo de experiência profissional exigido refere-se a atividades contínuas ou não, na área de soldagem para preparação, execução ou controle de qualidade (incluindo metalurgia, inspeção, ensaios não destrutivos e usinagem correlata). Este sistema fornece uma estimativa de compatibilidade baseada na norma, sujeita à validação de documentos oficiais da sua ementa de carteira profissional ou diploma.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
