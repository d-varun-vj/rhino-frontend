import clsx from 'clsx';
import React from 'react';
import { Button, ButtonProps } from '@mantine/core';

type CustomButtonProps = {
  text?: string;
  type?: 'primary';
  onClick: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
} & ButtonProps;

const CustomButton = ({
  text,
  type = 'primary',
  onClick,
  icon,
  iconPosition = 'left',
  ...props
}: CustomButtonProps) => {
  return (
    <div className="relative group inline-block">
      <Button
        className={clsx({
          '!bg-rhino-energy-green !text-white hover:!bg-rhino-green-accent !transition-all':
            type === 'primary' && !props.disabled,
          '!bg-gray-500': props.disabled,
          '!flex !items-center': !!icon,
        })}
        onClick={onClick}
        {...props}
      >
        <div
          className={clsx('flex gap-2', {
            '!flex-row-reverse': iconPosition === 'left',
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
