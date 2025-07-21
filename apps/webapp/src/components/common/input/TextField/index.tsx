import { TextInput, TextInputProps } from '@mantine/core';
import Label from '../../../typography/Label';

interface TextFieldProps extends TextInputProps {
  label?: string;
}

const TextField = ({ label, ...props }: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          content={label}
          htmlFor={label.toLowerCase()}
          required={props.required}
        />
      )}
      <TextInput id={label && label.toLowerCase()} {...props} />
    </div>
  );
};

export default TextField;
