import { TFVTTFlags } from './common';

export interface FVTTToken {
  name: string;
  displayName: number;
  actorLink: boolean;
  appendNumber: boolean;
  prependAdjective: boolean;
  texture: {
    src: string;
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
    rotation: number;
  };
  width: number;
  height: number;
  lockRotation: boolean;
  rotation: number;
  alpha: number;
  disposition: number;
  displayBars: number;
  bar1: {
    attribute: string;
  };
  bar2: {
    attribute: string;
  };
  light: {
    alpha: number;
    angle: number;
    bright: number;
    coloration: number;
    dim: number;
    attenuation: number;
    luminosity: number;
    saturation: number;
    contrast: number;
    shadows: number;
    animation: {
      type: null; // TODO
      speed: number;
      intensity: number;
      reverse: boolean;
    };
    darkness: {
      min: number;
      max: number;
    };
  };
  sight: {
    enabled: boolean;
    range: number;
    angle: number;
    visionMode: 'basic'; // TODO
    attenuation: number;
    brightness: number;
    saturation: number;
    contrast: number;
  };
  detectionModes: []; // TODO
  flags: TFVTTFlags;
  randomImg: boolean;
}
