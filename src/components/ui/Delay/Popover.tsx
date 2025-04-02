import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { components: { delay: t } } = translations;

const Popover = () => {
  return (
    <Hint>
      {t.popover}
    </Hint>
  );
};

export default Popover;
