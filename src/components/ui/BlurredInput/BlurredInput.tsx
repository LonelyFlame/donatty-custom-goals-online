'use client';

import { useState } from 'react';
import cn from 'classnames'
import { Input, Space, Button } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import type { PropsWithChildren } from 'react';
import type { InputProps } from 'antd';

import styles from './BlurredInput.module.scss';

interface Props extends PropsWithChildren {
  name?: InputProps['name'];
  value?: InputProps['value'];
  onChange?: InputProps['onChange'];
  placeholder?: InputProps['placeholder'];
  autoComplete?: InputProps['autoComplete'];
  className?: InputProps['className'];
  readOnly?: InputProps['readOnly'];
}

const eyeIcon = <EyeOutlined />;
const eyeInvisiblIcon = <EyeInvisibleOutlined />;

const BlurredInput = ({
  children,
  name,
  className,
  value,
  onChange,
  readOnly,
  placeholder,
  autoComplete,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(current => !current);
  };

  return (
    <Space.Compact className={styles.space}>
      <Input
        className={cn(className, { [styles.hidden]: !isVisible && value })}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <Button
        icon={isVisible ? eyeIcon : eyeInvisiblIcon}
        onClick={handleToggleVisibility}
      />
      {children}
    </Space.Compact>
  );
};

export default BlurredInput;
