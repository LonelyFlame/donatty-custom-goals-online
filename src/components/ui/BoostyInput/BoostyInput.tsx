'use client';

import { useState, useCallback, useEffect } from 'react';
import { Col, Row, Select, Form } from 'antd';
import type { SelectProps } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

import { boostyGetSubscriptionLevels } from '@/libs/boosty/requests/subscriptionLevels';

import { useCallbackDebounce } from '@/hooks/useCallbackDebounce';
import BlurredInput from '@/components/ui/BlurredInput';
import FormItem from '@/components/ui/FormItem';
import translations from '@/translations';
import { FOLOWERS_PRICE_TAG } from '@/libs/boosty/constants';

import styles from './BoostyInput.module.scss';

const { forms: { boostyInput: t } } = translations;

const BoostyInput = () => {
  const form = Form.useFormInstance();
  const secretValue = Form.useWatch('secret', form);
  const [levels, setLevels] = useState<NonNullable<SelectProps['options']>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchUser = useCallback(
    async (secret: string) => {
      setLevels([]);

      if (!secret.trim()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const data = await boostyGetSubscriptionLevels(undefined, secret);

        if (!data?.subscriptionLevels) {
          setLevels([]);

          return;
        }

        const mappedLevels = data.subscriptionLevels.reduce<NonNullable<SelectProps['options']>>((acc, { id, name, isDeleted, price }) => {
          if (isDeleted || price === FOLOWERS_PRICE_TAG) {
            return acc;
          }

          return [
            ...acc,
            { label: name, value: id },
          ];
        }, []);

        setLevels(mappedLevels);
      } catch (error) {
        console.error('Failed to fetch user:', error);

        setLevels([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const debouncedFetchUser = useCallbackDebounce(fetchUser, 500);

  const handleSecretChange = () => {
    form.setFieldsValue({ parts: [] });
  }

  useEffect(() => {
    debouncedFetchUser(secretValue);
  }, [secretValue, debouncedFetchUser]);

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <FormItem
            label={t.secret.label}
            rules={[
              { required: true, message: t.secret.required },
            ]}
            name="secret"
          >
            <BlurredInput
              onChange={handleSecretChange}
              placeholder={t.secret.placeholder}
              autoComplete="off"
            />
          </FormItem>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <FormItem
            rules={[
              { required: true, message: t.levels.required },
            ]}
            label={(
              <>
                {t.levels.label}
                {isLoading && <small>&nbsp;{t.levels.loading}</small>}
              </>
            )}
            className={styles.partsContainer}
            name="parts"
          >
            {isLoading && (
              <div className={styles.loader}>
                <LoadingOutlined />
              </div>
            )}
            <Select
              options={levels}
              disabled={!levels.length || isLoading}
              placeholder={t.levels.select}
              mode="tags"
            />
          </FormItem>
        </Col>
      </Row>
    </>
  );

};

export default BoostyInput;
