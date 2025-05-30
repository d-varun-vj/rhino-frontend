import { Client } from './api';
import { useTranslation } from 'react-i18next';
import UuidCombobox from '../UuidCombobox';
import { FieldType } from '../../../../types/shared/topribbon';
import { FilterData } from '../../../../context/userFilter/user-filter-context';

const ClientCombobox = ({
  onSelect: onFliterSelect,
  clients,
  disableDropdown,
  selectedClient,
}: {
  onSelect: (
    type: FieldType,
    value: {
      name: string;
      uuid: string;
    } | null
  ) => void;
  clients: Client[] | null;
  disableDropdown?: boolean;
  selectedClient?: FilterData | null;
}) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={
        Array.isArray(clients)
          ? clients.map((client) => ({
              name: client.name,
              uuid: client.uuid,
            }))
          : []
      }
      defaultPlaceholder={t('comboBox.select')}
      disabled={disableDropdown || false}
      onSelect={(client) => {
        if (onFliterSelect) onFliterSelect(FieldType.CLIENT, client);
      }}
      selectedValue={selectedClient ?? null}
    />
  );
};

export default ClientCombobox;
