import { useEffect, useState } from 'react';
import UuidCombobox from '../UuidCombobox';
import { useFilter } from '../../../../context/useFilter';
import { useQuery } from '@tanstack/react-query';
import { Client, getClients } from './api';
import { useTranslation } from 'react-i18next';
import { useFavoriteMeter } from '../../../../context/useFavoriteMeter';
import { initHttpClient } from '../../../../api/httpClient';
import { BASE_URL } from '../../../../api/endpoints';
import { useUser } from '../../../../context/useUser';
import { UserType } from '../../../../api/User/types';

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
  const [disableDropdown, setDisableDropdown] = useState<boolean>();
  const { clearFavoriteMeter } = useFavoriteMeter();
  const { user } = useUser();

  const { data: clientsData } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients({ userUuid: user ? user?.uuid : '' }),
    enabled: user?.uuid ? true : false,
  });

  useEffect(() => {
    if (selectedClient?.name === null) {
      setSelectedGroup(null);
      setSelectedLocation(null);
    }

    if (clientsData) {
      setClients(clientsData);
    }

    if (user && user.userType === UserType.ClientAdmin) {
      setDisableDropdown(true);
    }
  }, [
    selectedClient,
    clientsData,
    setSelectedLocation,
    setSelectedGroup,
    user,
  ]);

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
