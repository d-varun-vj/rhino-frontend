import { TagsInput, TagsInputProps } from '@mantine/core';
import { forwardRef } from 'react';
import Label from '../../../typography/Label';

interface MultiTextFieldProps extends TagsInputProps {
  label?: string;
}

const MultiTextField = forwardRef<HTMLInputElement, MultiTextFieldProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={props.required}
          />
        )}
        <TagsInput {...props} id={label ? label.toLowerCase() : ''} ref={ref} />
      </div>
    );
  }
);

MultiTextField.displayName = 'MultiTextField';

export default MultiTextField;
