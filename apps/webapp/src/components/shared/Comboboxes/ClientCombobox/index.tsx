import { useEffect, useState } from 'react';
import UuidCombobox from '../UuidCombobox';
import { useFilter } from '../../../../context/useFilter';
import { useQuery } from '@tanstack/react-query';
import { Client, getClients } from './api';
import { useTranslation } from 'react-i18next';
import { useFavoriteMeter } from '../../../../context/useFavoriteMeter';
import { initHttpClient } from '../../../../api/httpClient';
import { BASE_URL } from '../../../../api/endpoints';

const ClientCombobox = () => {
  useEffect(() => {
    initHttpClient(BASE_URL);
  }, []);
  const { t } = useTranslation();
  const {
    setClient: setSelectedClient,
    setLocation: setSelectedLocation,
    setGroup: setSelectedGroup,
    client: selectedClient,
  } = useFilter();
  const [clients, setClients] = useState<Client[]>();
  const { clearFavoriteMeter } = useFavoriteMeter();

  const { data: clientsData } = useQuery({
    queryKey: ['clients'],
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
          clearFavoriteMeter();
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
