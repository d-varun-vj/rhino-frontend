import { NumberInput, NumberInputProps } from '@mantine/core';
import React from 'react';
import Label from '../../../typography/Label';

interface NumberFieldProps extends NumberInputProps {
  label?: string;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
          />
        )}
        <NumberInput ref={ref} {...props} />
      </div>
    );
  }
);

NumberField.displayName = 'NumberField';

export default NumberField;
