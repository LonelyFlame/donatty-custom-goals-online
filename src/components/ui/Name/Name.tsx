import { Input } from 'antd';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';


const { components: { name: t } } = translations;

const Name = () => {
  return (
    <FormItem
      name="name"
      label={t.label}
      rules={[{ required: true, message: t.required }]}
    >
      <Input placeholder={t.placeholder} />
    </FormItem>
  );
};

export default Name;
