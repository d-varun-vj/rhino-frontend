import { Client } from '@rhino/apis';
import { useTranslation } from 'react-i18next';
import { FieldType } from '@rhino/utils';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import CustomComboBox from '../../common/comboboxes/CustomComboBox';

type ClientComboboxProps = {
  onSelect: (type: FieldType, value: Client | null) => void;
  clients: Client[] | null;
  disableDropdown?: boolean;
  selectedClient?: FilterData | null;
};

const ClientCombobox = ({
  onSelect: onFilterSelect,
  clients,
  disableDropdown,
  selectedClient,
}: ClientComboboxProps) => {
  const { t } = useTranslation();

  return (
    <CustomComboBox
      optionsList={
        Array.isArray(clients)
          ? [
              {
                name: 'Select',
                uuid: '',
              },
              ...clients.map((client) => ({
                name: client.name,
                uuid: client.uuid,
              })),
            ]
          : []
      }
      placeholder={t('comboBox.select')}
      selectedValue={selectedClient ?? null}
      setSelectedValue={(uuid) => {
        if (onFilterSelect) {
          const selectedClient = uuid
            ? clients?.find((client) => client.uuid === uuid)
            : null;
          onFilterSelect(FieldType.CLIENT, selectedClient ?? null);
        }
      }}
      disabled={disableDropdown || false}
    />
  );
};

export default ClientCombobox;
