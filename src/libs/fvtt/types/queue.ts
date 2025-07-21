import {
  FVTTAbilityType,
  FVTTSkillType,
  FVTTRollTypes,
} from '../types';

export interface TRoll {
  rollValue: number;
  rollFlavor?: string;
  rollType?: FVTTRollTypes;
  rollOption?: FVTTAbilityType | FVTTSkillType;
  actorName?: string;
  actorImage?: string;
  actorRace?: string;
  actorClass?: string;
  actorLevel?: number;
}

export interface TRollFlags {
  abilityId?: FVTTAbilityType;
  skillId?: FVTTSkillType;
  toolId?: string;
  type?: FVTTRollTypes;
}
