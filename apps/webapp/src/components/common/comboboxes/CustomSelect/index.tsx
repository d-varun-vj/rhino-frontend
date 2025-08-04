import { Select, SelectProps } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Label from '../../../typography/Label';

interface CustomSelectProps extends SelectProps {
  label?: string;
}

const CustomSelect = React.forwardRef<HTMLInputElement, CustomSelectProps>(
  ({ label, required, ...props }, ref) => {
    const { t } = useTranslation('components');
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label
            content={label}
            htmlFor={label.toLowerCase()}
            required={required}
          />
        )}
        <Select
          ref={ref}
          searchable
          {...props}
          placeholder={t('comboBox.select')}
          checkIconPosition="right"
          nothingFoundMessage={t('comboBox.empty')}
        />
      </div>
    );
  }
);

CustomSelect.displayName = 'CustomSelect';

export default CustomSelect;
