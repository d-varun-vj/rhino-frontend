import { useEffect, useState } from 'react';
import UuidCombobox from '../UuidCombobox';
import { useFilter } from '../../../../context/useFilter';
import { useQuery } from '@tanstack/react-query';
import { Client, getClients } from './api';
import { useTranslation } from 'react-i18next';

const ClientCombobox = () => {
  const { t } = useTranslation();
  const {
    setClient: setSelectedClient,
    setLocation: setSelectedLocation,
    setGroup: setSelectedGroup,
    client: selectedClient,
  } = useFilter();
  const [clients, setClients] = useState<Client[]>();

  const { data: clientsData } = useQuery({
    queryKey: ['clents'],
    queryFn: () => getClients(),
  });

  useEffect(() => {
    if (selectedClient?.name === null) {
      setSelectedGroup(null);
      setSelectedLocation(null);
    }

    if (clientsData) {
      setClients(clientsData);
    }
  }, [selectedClient, clientsData, setSelectedLocation, setSelectedGroup]);
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
      disabled={false}
      setReturnValue={(client) => {
        if (client?.name !== selectedClient?.name) {
          setSelectedClient(client);
          setSelectedGroup(null);
          setSelectedLocation(null);
        }
      }}
      selectedValue={selectedClient}
    />
  );
};

export default ClientCombobox;
