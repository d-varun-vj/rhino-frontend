import { Client } from '@rhino/apis';
import { useTranslation } from 'react-i18next';
import UuidCombobox from '../UuidCombobox';
import { FieldType } from '@rhino/utils';
import { FilterData } from '../../../context/userFilter/user-filter-context';

type ClientComboboxProps = {
  onSelect: (
    type: FieldType,
    value: {
      name: string;
      uuid: string;
      logo?: string;
    } | null
  ) => void;
  clients: Client[] | null;
  disableDropdown?: boolean;
  selectedClient?: FilterData | null;
};

const ClientCombobox = ({
  onSelect: onFliterSelect,
  clients,
  disableDropdown,
  selectedClient,
}: ClientComboboxProps) => {
  const { t } = useTranslation();

  return (
    <UuidCombobox
      options={
        Array.isArray(clients)
          ? clients.map((client) => ({
              name: client.name,
              uuid: client.uuid,
              logo: client.logo,
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
