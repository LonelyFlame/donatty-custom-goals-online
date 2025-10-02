import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { forms: { valueOverflow: { hint: t } } } = translations;

const ValueOverflowPopover = () => {
  return (
    <Hint>
      <ul>
        <li>{t.units}</li>
        <li>{t.description}</li>
      </ul>
    </Hint>
  );
};

export default ValueOverflowPopover;
