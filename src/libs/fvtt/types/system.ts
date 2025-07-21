import { TFVTTAuthor, TFVTTFlags, TFVTTPack, TFVTTPackFolder, TFVTTLanguage } from './common';

export interface TFVTTSystem {
  id: string;
  title: string;
  description: string;
  authors: TFVTTAuthor[];
  url: string;
  flags: TFVTTFlags;
  media: {
    type: 'setup' | 'cover';
    url: string;
    loop: boolean;
    thumbnail: string;
    flags: TFVTTFlags;
  }[];
  version: 'cover';
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
  manifest: string;
  download: string;
  protected: boolean;
  exclusive: boolean;
  persistentStorage: boolean;
  background: string;
  gridDistance: number;
  gridUnits: 'ft'; // TODO
  primaryTokenAttribute: string;
  availability: number;
  locked: boolean;
  owned: boolean;
  tags: []; // TODO
  hasStorage: boolean;
}
