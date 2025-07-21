import { TFVTTAuthor, TFVTTFlags, TFVTTLanguage, TFVTTPack, TFVTTPackFolder } from './common';

export interface TFVTTWorld {
  id: string;
  title: string;
  description: string;
  authors: TFVTTAuthor[];
  flags: TFVTTFlags;
  media: []; // TODO
  version: string | null;
  compatibility: {
    minimum: string;
    verified: string;
  };
  scripts: []; // TODO
  esmodules: string[];
  styles: string[];
  languages: TFVTTLanguage[];
  packs: TFVTTPack[];
  packFolders: TFVTTPackFolder[];
  relationships: { // TODO
    systems: [];
    requires: [];
    recommends: [];
    conflicts: [];
    flags: TFVTTFlags;
  };
  socket: boolean;
  protected: boolean;
  exclusive: boolean;
  persistentStorage: boolean;
  system: string;
  background: string;
  joinTheme: 'default'; // TODO
  coreVersion: string;
  systemVersion: string;
  lastPlayed: string;
  playtime: number;
  nextSession: string | null;
  availability: number;
  locked: boolean;
  owned: boolean;
  tags: []; // TODO
  hasStorage: boolean;
}
