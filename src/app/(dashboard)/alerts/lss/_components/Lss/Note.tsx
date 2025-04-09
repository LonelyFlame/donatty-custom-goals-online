import { Divider } from 'antd';

import translations from '@/translations';

const { pages: { alerts: { note: t } } } = translations;

const Note = () => {
  return (
    <>
      <Divider>{t.title}</Divider>
      <ul>
        <li>
          {t.currency}
        </li>
        <li>
          {t.reminder}
        </li>
        <li>
          {t.activation}
        </li>
        <li>
          {t.tests}
        </li>

        <li>
          {t.pause.init}
        </li>
        <li>
          {t.pause.process}
        </li>
        <li>
          {t.pause.control}
        </li>
      </ul>
    </>
  );
}

export default Note;
