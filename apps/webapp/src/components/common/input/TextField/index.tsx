import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';
import Label from '../../../typography/Label';

interface TextFieldProps extends TextInputProps {
  label?: string;
  dataTestIdPrefix?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required, dataTestIdPrefix, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
            data-testid={`${dataTestIdPrefix}-label`}
          />
        )}
        <TextInput
          ref={ref}
          id={label ? label.toLowerCase() : ''}
          data-testid={`${dataTestIdPrefix}-val`}
          {...props}
        />
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
