import { Client } from '@rhino/apis';
import { FieldType } from '@rhino/utils';
import { useTranslation } from 'react-i18next';
import { FilterData } from '../../../context/userFilter/user-filter-context';
import CustomComboBox from '../../common/comboboxes/CustomComboBox';

type ClientComboboxProps = {
  onSelect: (type: FieldType, values: Client[] | null) => void;
  clients: Client[] | null;
  disableDropdown?: boolean;
  selectedClients?: FilterData[] | null;
};

const ClientCombobox = ({
  onSelect: onFilterSelect,
  clients,
  disableDropdown,
  selectedClients,
}: ClientComboboxProps) => {
  const { t } = useTranslation('components');

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
      selectedValue={selectedClients ? selectedClients[0] : null}
      setSelectedValue={(uuid) => {
        if (onFilterSelect) {
          const selectedClient = uuid
            ? clients?.find((client) => client.uuid === uuid)
            : null;
          onFilterSelect(
            FieldType.CLIENT,
            selectedClient ? [selectedClient] : null
          );
        }
      }}
      disabled={disableDropdown || false}
      data-testid="ribbon-client-selector"
    />
  );
};

export default ClientCombobox;
