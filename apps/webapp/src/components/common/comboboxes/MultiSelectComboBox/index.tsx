import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import ErrorText from '../../../typography/ErrorText';
import Label from '../../../typography/Label';

export interface MultiSelectComboBoxProps extends MultiSelectProps {
  label?: string;
  error?: string;
}

const MultiSelectComboBox = ({
  label,
  error,
  ...props
}: MultiSelectComboBoxProps) => {
  const { t } = useTranslation('components');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label
          content={label}
          htmlFor={label.toLowerCase()}
          required={props.required}
        />
      )}
      <MultiSelect
        searchable
        {...props}
        placeholder={t('comboBox.select')}
        checkIconPosition="right"
        nothingFoundMessage={t('comboBox.empty')}
        error={!!error}
      />
      {error && <ErrorText content={error} />}
    </div>
  );
};

export default MultiSelectComboBox;
