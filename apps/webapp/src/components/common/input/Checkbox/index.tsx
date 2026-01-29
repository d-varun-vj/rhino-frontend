import { Checkbox, CheckboxProps } from '@mantine/core';

import clsx from 'clsx';
import Label from '../../../typography/Label';

interface CheckBoxProps extends CheckboxProps {
  label?: string;
  dataTestIdPrefix?: string;
}

const CheckBox = ({ label, dataTestIdPrefix, ...props }: CheckBoxProps) => {
  return (
    <div
      className={clsx('flex gap-2', {
        'flex-row-reverse': props.labelPosition == 'left',
      })}
    >
      <Checkbox
        color="var(--color-rhino-indigo-blue)"
        data-testid={`${dataTestIdPrefix}-val`}
        {...props}
      />
      {label && (
        <Label content={label} data-testid={`${dataTestIdPrefix}-label`} />
      )}
    </div>
  );
};

export default CheckBox;
