import { NumberInput, NumberInputProps } from '@mantine/core';
import React from 'react';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';

interface NumberFieldProps extends NumberInputProps {
  label?: string;
  error?: string;
  dataTestIdPrefix?: string;
}

const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  ({ label, required, error, dataTestIdPrefix, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
            data-testid={`${dataTestIdPrefix}-label`}
          />
        )}
        <NumberInput
          ref={ref}
          error={!!error}
          data-testid={`${dataTestIdPrefix}-val`}
          {...props}
        />
        {error && (
          <ErrorText content={error} dataTestIdPrefix={dataTestIdPrefix} />
        )}
      </div>
    );
  }
);

NumberField.displayName = 'NumberField';

export default NumberField;
