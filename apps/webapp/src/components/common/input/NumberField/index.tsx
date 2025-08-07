import { NumberInput, NumberInputProps } from '@mantine/core';
import React from 'react';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';

interface NumberFieldProps extends NumberInputProps {
  label?: string;
  error?: string;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, required, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
          />
        )}
        <NumberInput ref={ref} error={!!error} {...props} />
        {error && <ErrorText content={error} />}
      </div>
    );
  }
);

NumberField.displayName = 'NumberField';

export default NumberField;
