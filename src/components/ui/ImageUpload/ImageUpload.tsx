'use client';

import { useState } from 'react';
import { Image as AntdImage, Upload, Form } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { PlusOutlined, RetweetOutlined } from '@ant-design/icons';

import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import { ROUTES } from '@/constants/routes';
import type { TWidgetClockFormData } from '@/types/forms';

import styles from './ImageUpload.module.scss';

const { components: { image: t } } = translations;

interface Props {
  name: keyof TWidgetClockFormData;
  label: string;
  required?: boolean;
}

const ImageUpload = ({ name, label, required }: Props) => {
  const [open, setOpen] = useState(false);

  const form = Form.useFormInstance<TWidgetClockFormData>();
  const value = Form.useWatch<[UploadFile]>(name, form) || [];

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    const { status, response } = file;

    if (status === 'error') {
      const error = response.message;

      form.setFields([{ name, value: [], errors: [error] }]);

      return [];
    }

    if (status === 'removed') {
      return [];
    }

    const isDone = status === 'done';
    return [
      {
        ...file,
        percent: isDone ? 100 : 50,
        url: isDone ? response.src : undefined,
      },
    ];
  }

  return (
    <>
      <FormItem
        name={name}
        label={label}
        rules={[{ required: required, message: t.required }]}
        valuePropName="fileList"
        getValueFromEvent={handleChange}
      >
        <Upload
          onPreview={() => setOpen(true)}
          className={styles.image}
          action={ROUTES.API_UPLOAD}
          listType="picture-card"
          accept="image/png, image/gif, image/jpeg"
        >
          <button
            disabled={value.at(0)?.status === 'uploading'}
            style={{ border: 0, background: 'none', cursor: 'pointer' }}
            type="button"
          >
            {!value.length && (
              <div>
                <PlusOutlined style={{ fontSize: 20 }} />
                <div style={{ marginTop: 8 }}>
                  {t.upload}
                </div>
              </div>
            )}
            {!!value.length && (
              <div>
                <RetweetOutlined style={{ fontSize: 20 }} />
                <div style={{ marginTop: 8 }}>
                  {t.change}
                </div>
              </div>
            )}
          </button>
        </Upload>
      </FormItem>
      <AntdImage
        wrapperStyle={{ display: 'none' }}
        preview={{
          visible: open,
          onVisibleChange: (visible: boolean) => setOpen(visible),
          toolbarRender: () => null,
        }}
        src={value.at(0)?.url || undefined}
      />
    </>
  );
};

export default ImageUpload;
