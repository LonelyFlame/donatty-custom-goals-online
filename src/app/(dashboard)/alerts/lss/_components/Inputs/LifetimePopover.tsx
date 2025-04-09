import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { forms: { lifetime: { hint: t } } } = translations;

const LifetimePopover = () => {
  return (
    <Hint>
      <ul>
        <li>{t.units}</li>
        <li>{t.description}</li>
        <li>{t.ticks}</li>
      </ul>
    </Hint>
  );
};

export default LifetimePopover;
