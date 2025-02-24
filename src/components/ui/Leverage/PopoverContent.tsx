import translations from '@/translations';

const { components: { leverage: { popover: t } } } = translations;

const PopoverContent = () =>  {
  return (
    <ul>
      <li>{t.first}</li>
      <li>{t.second}</li>
      <li>{t.third}</li>
    </ul>
  );
};

export default PopoverContent;
