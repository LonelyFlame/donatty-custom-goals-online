type FVTTRollTermModifiers = 'kh' | 'kl'; // TODO
type FVTTRollTermOperators = '+' | '-' | '*' | '/'; // TODO
export type FVTTRollTypes = 'ability' | 'skill' | 'save' | 'tool';

export interface FVTTRollTermDieResult {
  result: number;
  active: boolean;
}

export interface FVTTRollTerm {
  class: 'OperatorTerm' | 'NumericTerm' | 'Die';
  options: Record<string, any>;
  evaluated: boolean;
}

export interface FVTTRollTermOperator extends FVTTRollTerm {
  class: 'OperatorTerm';
  operator: FVTTRollTermOperators
}

export interface FVTTRollTermNumeric extends FVTTRollTerm {
  class: 'NumericTerm';
  number: number;
}

export interface FVTTRollTermDie extends FVTTRollTerm {
  class: 'Die';
  options: {
    critical: number;
    fumble: number;
  };
  number: number;
  faces: number;
  modifiers: FVTTRollTermModifiers[],
  results: FVTTRollTermDieResult[];
}


export type FVTTRollTerms = FVTTRollTermDie | FVTTRollTermNumeric | FVTTRollTermOperator;

export interface FVTTRollOptions {
  flavor?: string;
  advantageMode?: 0 | 1 | -1;
  defaultRollMode?: 'publicroll';
  rollMode?: 'publicroll';
  critical?: number;
  fumble?: number;
  configured?: boolean;
  criticalBonusDice?: number;
  multiplyNumeric?: boolean;
  powerfulCritical?: boolean;
  preprocessed?: boolean;
  properties?: 'mgc'[]; // TODO
  type?: 'piercing' | 'slashing' | 'fire' // TODO
}

export interface FVTTRoll {
  class: 'Roll' | 'D20Roll' | 'DamageRoll',
  options: FVTTRollOptions,
  dice: [];
  formula: string;
  terms: FVTTRollTerms[];
  total: number;
  evaluated: boolean;
}

export interface FVTTRollSimple extends FVTTRoll {
  class: 'Roll',
}

export interface FVTTRollD20 extends FVTTRoll {
  class: 'D20Roll',
  options: {
    flavor: string;
    advantageMode: 0 | 1 | -1;
    defaultRollMode: 'publicroll';
    rollMode: 'publicroll';
    critical: number;
    fumble: number;
    configured: boolean;
  },
}

export interface FVTTRollDamage extends FVTTRoll {
  class: 'DamageRoll',
  options: {
    flavor: string;
    rollMode: 'publicroll';
    critical: number;
    configured: boolean;
    criticalBonusDice: number;
    multiplyNumeric: boolean;
    powerfulCritical: boolean;
    preprocessed: boolean;
    properties: 'mgc'[]; // TODO
    type: 'piercing' | 'slashing' | 'fire' // TODO
  },
}

export type FVTTRolls = FVTTRollSimple | FVTTRollD20 | FVTTRollDamage;
