export interface TDStyledBlock {
  position?: string;
  rounding?: number;
  template?: string;
  heightRate: number;
  font: TDStyleFont;
  shadow: TDStyleShadow;
  stroke: TDStyleStroke;
  geometry: TDStyleGeometry;
}
export interface TDStyledBlockTextable extends TDStyledBlock {
  template: string;
}

export interface TDStyleFont {
  bold: boolean;
  size: number;
  align: 'left' | 'center' | 'right' | 'justify';
  color: string;
  cssUri: string;
  family: string;
  italic: boolean;
}
export interface TDStyleShadow {
  blur: number;
  color: string;
  enabled: boolean;
  offsetX: number;
  offsetY: number;
}
export interface TDStyleStroke {
  color: string;
  width: number;
  enabled: boolean;
}
export interface TDStyleGeometry {
  width: number;
  offsetX: number;
  offsetY: number;
  maxWidth: number;
}
