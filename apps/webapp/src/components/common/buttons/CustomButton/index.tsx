import { Button, ButtonProps } from '@mantine/core';

import clsx from 'clsx';
import React from 'react';

type CustomButtonProps = {
  text?: string;
  type?: 'primary' | 'secondary' | 'default';
  btnType?: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
} & ButtonProps;

const CustomButton = ({
  text,
  type = 'primary',
  btnType = 'button',
  onClick,
  icon,
  iconPosition = 'start',
  ...props
}: CustomButtonProps) => {
  return (
    <div className="relative group inline-block">
      <Button
        className={clsx({
          '!bg-rhino-energy-green !text-white hover:!bg-rhino-green-accent !transition-all':
            type === 'primary' && !props.disabled,
          '!bg-rhino-indigo-blue': type == 'secondary' && !props.disabled,
          '!bg-rhino-white !text-rhino-indigo-blue !border-[1px] !border-rhino-indigo-blue hover:!bg-gray-100':
            type === 'default' && !props.disabled,
          '!bg-gray-500': props.disabled,
          '!flex !items-center': !!icon,
        })}
        onClick={onClick}
        type={btnType}
        {...props}
      >
        <div
          className={clsx('flex gap-2', {
            '!flex-row-reverse': iconPosition === 'end',
            '!flex !items-center': !!icon,
          })}
        >
          {icon && <span>{icon}</span>}
          {text && <span>{text}</span>}
        </div>
      </Button>
    </div>
  );
};

export default CustomButton;
