import Hint from '@/components/ui/Hint';
import translations from '@/translations';

import { animationFunctionSite } from './constants';

const { forms: t } = translations;

export const AnimationFunctionHint = () => {
  return (
    <Hint>
      {t.animationFunction.hint}
      <br />
      <a href={`https://${animationFunctionSite}`} target="_blank">{animationFunctionSite}</a>
    </Hint>
  );
};

export default AnimationFunctionHint;
