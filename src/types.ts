/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SchoolingLevelStatus = 'fundamental_completo' | 'medio_completo' | 'tecnico' | 'superior';

export interface SchoolingOption {
  value: SchoolingLevelStatus;
  label: string;
  description: string;
}

export type TechnicalFieldStatus = 'mecanica_metalurgia' | 'naval_civil' | 'eletrotecnica' | 'outros_nao_relacionado';

export interface TechnicalFieldOption {
  value: TechnicalFieldStatus;
  label: string;
  description: string;
}

export interface QuizState {
  currentStep: number;
  schooling: SchoolingLevelStatus | '';
  technicalField: TechnicalFieldStatus | '';
  experienceMonths: number;
  isRegisteredN1: boolean;
  n1Months: number;
}

export interface EligibilityResult {
  eligibleN1: boolean;
  eligibleN2Direct: boolean;
  eligibleN2Progression: boolean;
  n1RequiredMonths: number;
  n1MissingMonths: number;
  n2DirectRequiredMonths: number;
  n2DirectMissingMonths: number;
  n2ProgressionRequiredMonths: number;
  n2ProgressionMissingMonths: number;
  feedback: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
