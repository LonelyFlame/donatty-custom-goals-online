import Hint from '../../../../../components/ui/Hint';
import translations from '../../../../../translations';

const { forms: { labelTemplate: { hint: t } } } = translations;

const LabelTemplatePopover = () => {
  return (
    <Hint>
      <ul>
        <li><b>{'{amount}'}</b> — {t.amount}</li>
        <li><b>{'{goal}'}</b> — {t.goal}</li>
        <li><b>{'{goalPercentage}'}</b> — {t.goalPercentage}</li>
        <li><b>{'{next}'}</b> — {t.next}</li>
        <li><b>{'{nextPercentage}'}</b> — {t.nextPercentage}</li>
        <li><b>{'{nextName}'}</b> — {t.nextName}</li>
        <li><b>{'{max}'}</b> — {t.max}</li>
        <li><b>{'{maxPercentage}'}</b> — {t.maxPercentage}</li>
        <li><b>{'{maxName}'}</b> — {t.maxName}</li>
      </ul>
    </Hint>
  );
};

export default LabelTemplatePopover;
