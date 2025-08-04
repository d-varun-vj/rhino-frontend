import { MultiSelect, MultiSelectProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import Label from '../../../typography/Label';

export interface MultiSelectComboBoxProps extends MultiSelectProps {
  label?: string;
}

const MultiSelectComboBox = ({ label, ...props }: MultiSelectComboBoxProps) => {
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
      />
    </div>
  );
};

export default MultiSelectComboBox;
