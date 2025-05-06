import UuidCombobox from '../UuidCombobox';
import { Client } from './api';
import { useTranslation } from 'react-i18next';
import { FieldType } from '../../TopRibbon';
import { FilterData } from '../../../../context/useFilter';

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
      disenabled={disableDropdown || false}
      setReturnValue={(client) => {
        if (onFliterSelect) onFliterSelect(FieldType.CLIENT, client);
      }}
      selectedValue={selectedClient ?? null}
    />
  );
};

export default ClientCombobox;
