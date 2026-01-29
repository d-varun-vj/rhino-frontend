import { TagsInput, TagsInputProps } from '@mantine/core';
import { forwardRef } from 'react';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';

interface MultiTextFieldProps extends TagsInputProps {
  label?: string;
  error?: string;
  dataTestIdPrefix?: string;
}

const MultiTextField = forwardRef<HTMLInputElement, MultiTextFieldProps>(
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
        <TagsInput
          data-testid={`${dataTestIdPrefix}-val`}
          {...props}
          id={label ? label.toLowerCase() : ''}
          error={!!error}
          ref={ref}
        />
        {error && <ErrorText content={error} />}
      </div>
    );
  }
);

MultiTextField.displayName = 'MultiTextField';

export default MultiTextField;
