import { Switch, SwitchProps } from '@mantine/core';
import Label from '../../../typography/Label';

interface ToggleProps extends SwitchProps {
  label?: string;
  activeColor?: string;
}

const Toggle = ({
  label,
  activeColor = 'var(--color-rhino-energy-green)',
  ...props
}: ToggleProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label content={label} />}
      <Switch {...props} color={activeColor} />
    </div>
  );
};

export default Toggle;
