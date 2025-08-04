import { Switch, SwitchProps } from '@mantine/core';
import React from 'react';
import Label from '../../../typography/Label';

interface ToggleProps extends SwitchProps {
  label?: string;
  activeColor?: string;
}

const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    { label, activeColor = 'var(--color-rhino-energy-green)', ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5 w-fit">
        {label && <Label content={label} />}
        <Switch ref={ref} color={activeColor} {...props} />
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

export default Toggle;
