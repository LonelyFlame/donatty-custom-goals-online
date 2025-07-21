import {
  FVTTAbilityType,
  TFVTTFlags,
  TFVTTItem,
  TFVTTOwnership,
  TFVTTStats,
  TFVTTSystemBonus,
} from './common';
import { FVTTToken } from './token';

export interface TFVTTSkill {
  ability: FVTTAbilityType;
  roll: {
    min: number | null;
    max: number | null;
    mode: 0; // TODO
  };
  value: number;
  bonuses: {
    check: string;
    passive: string;
  };
}
export interface TFVTTSkills {
  acr: TFVTTSkill;
  ani: TFVTTSkill;
  arc: TFVTTSkill;
  ath: TFVTTSkill;
  dec: TFVTTSkill;
  his: TFVTTSkill;
  ins: TFVTTSkill;
  itm: TFVTTSkill;
  inv: TFVTTSkill;
  med: TFVTTSkill;
  nat: TFVTTSkill;
  prc: TFVTTSkill;
  prf: TFVTTSkill;
  per: TFVTTSkill;
  rel: TFVTTSkill;
  slt: TFVTTSkill;
  ste: TFVTTSkill;
  sur: TFVTTSkill;
}
export interface TFVTTSpellSlot {
  value: number;
  override: null; // TODO
}
export interface TFVTTSpells {
  spell1: TFVTTSpellSlot;
  spell2: TFVTTSpellSlot;
  spell3: TFVTTSpellSlot;
  spell4: TFVTTSpellSlot;
  spell5: TFVTTSpellSlot;
  spell6: TFVTTSpellSlot;
  spell7: TFVTTSpellSlot;
  spell8: TFVTTSpellSlot;
  spell9: TFVTTSpellSlot;
  pact: TFVTTSpellSlot;
}
export interface TFVTTResource {
  value: number;
  max: number;
  sr: boolean;
  lr: boolean;
  label: string;
}
export interface TFVTTResources {
  primary: TFVTTResource;
  secondary: TFVTTResource;
  tertiary: TFVTTResource;
}

export interface TFVTTAbility {
  value: number;
  proficient: number;
  max: number | null;
  bonuses: {
    check: string;
    save: string;
  };
}
export interface TFVTTAbilities {
  str: TFVTTAbility;
  dex: TFVTTAbility;
  con: TFVTTAbility;
  int: TFVTTAbility;
  wis: TFVTTAbility;
  cha: TFVTTAbility;
}

export interface TFVTTActor {
  name: string;
  type: 'character' | 'npc' | 'group' | 'vehicle';
  _id: string;
  img: string;
  system: {
    currency: {
      pp: number;
      gp: number;
      ep: number;
      sp: number;
      cp: number;
    };
    abilities: TFVTTAbilities;
    bonuses: {
      mwak: TFVTTSystemBonus;
      rwak: TFVTTSystemBonus;
      msak: TFVTTSystemBonus;
      rsak: TFVTTSystemBonus;
      abilities: {
        check: string;
        save: string;
        skill: string;
      };
      spell: {
        dc: string
      };
    };
    skills: TFVTTSkills;
    tools: {}; // TODO
    spells: TFVTTSpells;
    attributes: {
      init: {
        ability: string;
        roll: {
          min: number | null;
          max: number | null;
          mode: 0; // TODO
        };
        bonus: string;
      };
      movement: {
        burrow: number | null;
        climb: number | null;
        fly: number | null;
        swim: number | null;
        walk: number | null;
        units: number | null;
        hover: boolean;
      };
      attunement: {
        max: number;
      };
      senses: {
        darkvision: number | null;
        blindsight: number | null;
        tremorsense: number | null;
        truesight: number | null;
        units: number | null;
        special: string;
      };
      spellcasting: FVTTAbilityType;
      exhaustion: number;
      concentration: {
        ability: string; // TODO
        roll: {
          min: number | null;
          max: number | null;
          mode: 0;
        };
        bonuses: {
          save: string;
        };
        limit: number;
      };
      ac: {
        flat: number | null;
        calc: 'default'; // TODO
      };
      hp: {
        value: number;
        max: number | null;
        temp: number;
        tempmax: number;
        bonuses: {}; // TODO
      };
      death: {
        ability: string; // TODO
        roll: {
          min: number | null;
          max: number | null;
          mode: 0;
        };
        success: number;
        failure: number;
      };
      inspiration: boolean;
    };
    details: {
      biography: {
        value: string;
        public: string;
      };
      alignment: string;
      ideal: string;
      bond: string;
      flaw: string;
      race: null | string; // TODO
      background: null | string; // TODO
      originalClass: string;
      xp: {
        value: number;
      };
      appearance: string;
      trait: string;
    };
    traits: {
      size: 'med'; // TODO
      di: {
        bypasses: []; // TODO
        value: []; // TODO
        custom: string;
      };
      dr: {
        bypasses: []; // TODO
        value: []; // TODO
        custom: string;
      };
      dv: {
        bypasses: []; // TODO
        value: []; // TODO
        custom: string;
      };
      dm: {
        amount: string;
        bypasses: []; // TODO
      };
      ci: {
        value: []; // TODO
        custom: string;
      };
      languages: {
        value: []; // TODO
        custom: string;
      };
      weaponProf: {
        value: ('sim' | 'mar')[];
        custom: string;
      };
      armorProf: {
        value: ('lgt' | 'med' | 'shl')[];
        custom: string;
      };
    };
    resources: TFVTTResources;
    favorites: [];
  };
  prototypeToken: FVTTToken;
  items: TFVTTItem[];
  effects: []; // TODO
  folder: string;
  sort: number;
  ownership: TFVTTOwnership;
  flags: TFVTTFlags;
  _stats: TFVTTStats;
}
