import Hint from '../../../../../components/ui/Hint';
import translations from '../../../../../translations';

const { forms: { labelAlertTemplate: { hint: t } } } = translations;

const LabelTemplatePopover = () => {
  return (
    <Hint>
      <ul>
        <li><b>{'{title}'}</b> — {t.title}</li>
        <li><b>{'{copies}'}</b> — {t.copies}</li>
        <li><b>{'{soldCopies}'}</b> — {t.soldCopies}</li>
        <li><b>{'{backers}'}</b> — {t.backers}</li>
      </ul>
    </Hint>
  );
};

export default LabelTemplatePopover;
