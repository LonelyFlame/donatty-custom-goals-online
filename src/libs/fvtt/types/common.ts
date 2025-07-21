export type FVTTAbilityType = 'dex' | 'wis' | 'int' | 'str' | 'cha' | 'con';
export type FVTTSkillType =
  'acr' | // acrobatics
  'ani' | // animal handling
  'arc' | // arcana
  'ath' | // athletics
  'dec' | // deception
  'his' | // history
  'ins' | // insight
  'itm' | // intimidation
  'inv' | // investigation
  'med' | // medicine
  'nat' | // nature
  'prc' | // perception
  'prf' | // performance
  'per' | // persuasion
  'rel' | // religion
  'slt' | // sleight of hand
  'ste' | // stealth
  'sur'; // survivor

export type TFVTTOwnership = Record<'default' | string, number>;

export type TFVTTDocumentTypes = 'ActiveEffect'
  | 'Actor'
  | 'ActorDelta'
  | 'Adventure'
  | 'AmbientLight'
  | 'AmbientSound'
  | 'Card'
  | 'Cards'
  | 'ChatMessage'
  | 'Combat'
  | 'Combatant'
  | 'Drawing'
  | 'FogExploration'
  | 'Folder'
  | 'Item'
  | 'JournalEntry'
  | 'JournalEntryPage'
  | 'Macro'
  | 'MeasuredTemplate'
  | 'Note'
  | 'Playlist'
  | 'PlaylistSound'
  | 'RollTable'
  | 'Scene'
  | 'Setting'
  | 'TableResult'
  | 'Tile'
  | 'Token'
  | 'User'
  | 'Wall';

export type TFVTTFlags = Record<string, any>; // TODO

export interface TFVTTStats {
  systemId: string;
  systemVersion: string;
  coreVersion: string;
  createdTime: string;
  modifiedTime: string;
  lastModifiedBy: string;
}

export interface TFVTTSystemBonus {
  attack: string;
  damage: string;
}

export interface TFVTTItem {
  _id: string;
  name: string;
  type: 'class' | 'race' | 'feat' | 'weapon' | 'consumable';
  img: string;
  folder: string;
  sort: number;
  system: {
    advancement: any[]; // TODO
    description: {
      chat: string;
      value: string;
    };
    hitDice: 'd4' | 'd6' | 'd8' | 'd10' | 'd12';
    hitDiceUsed: number;
    identifier: 'bard'; // TODO
    levels: number;
    source: {
      book: string;
      custom: string;
      license: string;
      page: string;
    };
    spellcasting: {
      ability: 'cha'; // TODO
      progression: 'full';
    };
    startingEquipment: any[];
    wealth: string;
  };
}

export interface TFVTTFolder {
  _id: string;
  name: string;
  type: string;
  sorting: 'm';
  sort: number;
  color: string;
  folder: string;
  flags: TFVTTFlags;
  _stats: TFVTTStats;
}

export interface TFVTTMacro {
  name: string;
  type: 'script' | 'chat';
  scope: 'global';
  _id: string;
  author: string;
  img: string;
  command: string;
  folder: string | null;
  sort: number;
  ownership: TFVTTOwnership;
  flags: TFVTTFlags;
  _stats: TFVTTStats;
}

export interface TFVTTPack {
  name: string;
  label: string;
  path: string;
  type: 'Actor'; // TODO
  system: string;
  ownership: TFVTTOwnership;
  flags: {
    dnd5e: {
      types: ['character']; // TODO
    };
  };
  packageType: 'system'; // TODO
  packageName: string;
  id: string;
  index: {
    name: string;
    type: 'character'; // TODO
    img: string | null;
    folder: string | null;
    sort: number;
    _id: string;
  }[];
  folders: {
    name: string;
    type: 'Actor'; // TODO
    _id: string;
    folder: string | null;
    sorting: string;
    sort: number;
    flags: TFVTTFlags;
    _stats: TFVTTStats;
  }[];
}

export interface TFVTTPackFolder {
  name: string;
  sorting: string;
  color: string;
  packs: string[];
  folders: {
    name: string;
    sorting: string;
    color: string;
    packs: string[];
    folders: string[];
  }[];
}

export interface TFVTTSetting {
  key: string;
  value: string;
  _id: string;
  _stats: TFVTTStats;
}

export interface TFVTTAuthor {
  name: string;
  url: string;
  flags: TFVTTFlags;
}

export interface TFVTTLanguage {
  lang: string;
  name: string;
  path: string;
  flags: TFVTTFlags;
}

export interface TFVTTTemplate {
  types: string[];
  htmlFields: string[];
}
