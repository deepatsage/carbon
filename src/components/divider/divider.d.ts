import * as React from 'react';
import { FormFieldSpacing } from '../../utils/helpers/options-helper/options-helper';

export interface DividerProps {
  /** Margin top, this value will be multiplied by the theme spacing constant (8) */
  marginTop: FormFieldSpacing,

  /** Margin bottom, this value will be multiplied by the theme spacing constant (8) */
  marginBottom: FormFieldSpacing,

  /** Margin left, any valid css value */
  marginLeft: string,

  /** Margin right, any valid css value */
  marginRight: string
}

declare const Divider: React.FunctionComponent<DividerProps>;
export default Divider;