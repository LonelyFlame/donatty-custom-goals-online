import Hint from '@/components/ui/Hint';
import translations from '@/translations';

const { forms: { labelTemplate: { hintBoosty: t } } } = translations;

const LabelTemplatePopover = () => {
  return (
    <Hint>
      <ul>
        <li><b>{'{count}'}</b> — {t.count}</li>
      </ul>
    </Hint>
  );
};

export default LabelTemplatePopover;
