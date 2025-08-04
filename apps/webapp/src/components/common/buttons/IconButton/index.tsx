import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import React from 'react';

type IconButtonProps = {
  children: React.ReactNode;
  type?: 'primary' | 'secondary';
  size?: 'sm';
  action: () => void;
  popupContent?: string;
  dataTestId?: string;
} & ButtonProps;

const IconButton = ({
  children,
  type = 'primary',
  popupContent,
  action,
  dataTestId,
  size,
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={clsx(
        'font-bold px-4 py-2 rounded text-white cursor-pointer ',
        {
          '!bg-rhino-energy-green hover:!bg-rhino-green-accent !transition-all':
            type == 'primary' && !props.disabled,
          '!bg-rhino-indigo-blue': type == 'secondary' && !props.disabled,
          '!h-6.5': size == 'sm',
        }
      )}
      onClick={action}
      title={popupContent}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IconButton;
