import { TDWidgetsResponseGoal } from './goal';
import { TDWidgetsResponseAlert } from './alert';
import { TDWidgetType } from './widget';

export interface TDResponse<R extends any> {
  response: R;
}

export interface TDAuthResponse {
  accessToken: string;
  refreshToken: string;
  /**
   * datetime string: YYYY-MM-DDThh:mm:ss.sssssssssZ
   */
  expireAt: string;
}

export type TDWidgetsResponse = TDWidgetsResponseGoal | TDWidgetsResponseAlert;

export interface TDWidgetsResponseAbstract<Data extends Object, Style extends Object> {
  props: {
    data: Data;
    style: Style;
  };

  /**
   * datetime string: YYYY-MM-DDThh:mm:ss.sssssssssZ
   */
  createdAt: string;
  /**
   * datetime string: YYYY-MM-DDThh:mm:ss.sssssssssZ
   */
  updatedAt: string;
  /**
   * uuidV4
   */
  groupId: string;
  /**
   * uuidV4
   */
  refId: string;

  owner: {
    /**
     * uuidV4
     */
    refId: string;
  };

  type: TDWidgetType;
  name: string;
  token: string;
  weight: number;
  active: boolean;
}

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
export interface TDStyledBlockProgressBar extends TDStyledBlock {
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
