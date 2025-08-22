import { TextInput, TextInputProps } from '@mantine/core';
import React from 'react';
import Label from '../../../typography/Label';

interface TextFieldProps extends TextInputProps {
  label?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, required, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
          />
        )}
        <TextInput ref={ref} id={label ? label.toLowerCase() : ''} {...props} />
      </div>
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
