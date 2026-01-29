import { Switch, SwitchProps } from '@mantine/core';
import React from 'react';
import Label from '../../../typography/Label';

interface ToggleProps extends SwitchProps {
  label?: string;
  activeColor?: string;
  flex?: 'row' | 'col';
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      activeColor = 'var(--color-rhino-energy-green)',
      flex = 'row',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-${flex} gap-1.5 w-fit`}>
        {label && <Label content={label} data-testid="active-label" />}
        <Switch
          ref={ref}
          color={activeColor}
          data-testid="active-val"
          {...props}
        />
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
