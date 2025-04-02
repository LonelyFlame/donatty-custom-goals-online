import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { components: { leverage: { popover: t } } } = translations;

const Popover = () => {
  return (
    <Hint>
      <ul>
        <li>{t.first}</li>
        <li>{t.second}</li>
        <li>{t.third}</li>
        <li>{t.fourth}</li>
      </ul>
    </Hint>
  );
};

export default Popover;
