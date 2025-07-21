import { Checkbox, CheckboxProps } from '@mantine/core';
import clsx from 'clsx';
import Label from '../../../typography/Label';

interface CheckBoxProps extends CheckboxProps {
  label?: string;
}

const CheckBox = ({ label, ...props }: CheckBoxProps) => {
  return (
    <div
      className={clsx('flex gap-2', {
        'flex-row-reverse': props.labelPosition == 'left',
      })}
    >
      <Checkbox color="var(--color-rhino-indigo-blue-highlight)" {...props} />
      {label && <Label content={label} />}
    </div>
  );
};

export default CheckBox;
