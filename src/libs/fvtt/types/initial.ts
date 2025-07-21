import {
  TFVTTDocumentTypes,
  TFVTTFolder,
  TFVTTMacro,
  TFVTTPack,
  TFVTTSetting,
  TFVTTTemplate,
} from './common';
import {
  TFVTTActor,
} from './actor';
import {
  TFVTTMessage,
} from './message';
import {
  TFVTTWorld,
} from './world';
import {
  TFVTTSystem,
} from './system';
import {
  TFVTTUser,
} from './user';

export interface TFVTTInitialData {
  activeUsers: string[];
  actors: TFVTTActor[];
  addresses: {
    local: string;
    remote: string;
    remoteIsAccessible: boolean;
  };
  cards: []; // TODO
  combats: []; // TODO
  coreUpdate: {
    hasUpdate: boolean;
    couldReachWebsite: boolean;
    slowResponse: boolean;
    version: string;
    channel: 'stable';
    willDisableModules: boolean;
  };
  demoMode: boolean;
  documentTypes: Record<TFVTTDocumentTypes, ('base' | string | number)[]>;
  files: {
    storages: ('data' | 'public')[];
    s3: null;
  };
  folders: TFVTTFolder[];
  items: [];
  journal: [];
  macros: TFVTTMacro[];
  messages: TFVTTMessage[];
  model: { // TODO
    Actor: { base: {}, character: {}, npc: {}, vehicle: {}, group: {} };
    Card: { base: {} };
    Cards: { base: {}, deck: {}, hand: {}, pile: {} };
    Item: {
      base: {};
      weapon: {};
      equipment: {};
      consumable: {};
      tool: {};
      loot: {};
      race: {};
      background: {};
      class: {};
      subclass: {};
      spell: {};
      feat: {};
      container: {};
      backpack: {};
    };
    JournalEntryPage: {
      base: {};
      image: {};
      pdf: {};
      text: {};
      video: {};
      class: {};
      map: {};
      rule: {};
      spells: {};
      subclass: {};
    }
  };
  modules: [];
  options: {
    language: string;
    port: number;
    routePrefix: string | null;
    updateChannel: 'stable';
  };
  packageWarnings: {};
  packs: TFVTTPack[];
  paused: boolean;
  playlists: []; // TODO
  release: {
    generation: number;
    channel: 'stable';
    suffix: 'Stable';
    build: number;
    node_version: number;
    maxGeneration: number;
    maxStableGeneration: number;
    time: number;
  };
  scenes: []; // TODO
  settings: TFVTTSetting[];
  system: TFVTTSystem;
  systemUpdate: {
    hasUpdate: boolean;
    version: string;
  };
  tables: []; // TODO
  template: Record<TFVTTDocumentTypes, TFVTTTemplate>;
  userId: string;
  users: TFVTTUser[];
  world: TFVTTWorld;
}
