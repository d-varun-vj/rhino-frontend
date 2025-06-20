/* eslint-disable react-hooks/exhaustive-deps */
import UserDropDown from './UserDropDown';
import ClientCombobox from '../Comboboxes/ClientCombobox';
import LocationCombobox from '../Comboboxes/LocationCombobox';
import GroupCombobox from '../Comboboxes/GroupCombobox';
import { useTranslation } from 'react-i18next';
import FavoriteMeter from './FavoriteMeter';
import { useUserFilter } from '../../context/userFilter';
import { useEffect, useState } from 'react';
import { useUser } from '../../context/user';
import { useFavoriteMeter } from '../../context/favoriteMeter';
import { Location, useGetLocations, Client, useGetClients } from '@rhino/apis';
import { shouldSetInitialClient } from '../../helpers/client';
import { FieldType, useSearchParamsState } from '@rhino/utils';

const TopRibbon = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const [disableDropdown, setDisableDropdown] = useState<boolean>(false);
  const {
    setClient: setSelectedClient,
    setLocation: setSelectedLocation,
    setGroup: setSelectedGroup,
    client: selectedClient,
    group: selectedGroup,
    location: selectedLocation,
  } = useUserFilter();
  const { favoriteMeter, setFavoriteMeter } = useFavoriteMeter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchParams, setSearchParams] = useSearchParamsState(
    'routeParam',
    undefined
  );

  const selectedClientId =
    (searchParams?.['client'] as string) || selectedClient?.uuid || null;

  const { data: locationsData } = useGetLocations({
    clientId: selectedClientId,
    queryKey: [selectedClient],
  });
  const [clients, setClients] = useState<Client[]>([]);

  const { data: clientsData } = useGetClients({ userUuid: user?.uuid || '' });

  useEffect(() => {
    if (clientsData) {
      const sortedClients = [...clientsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setClients(sortedClients);
    }
  }, [clientsData, user]);

  useEffect(() => {
    setSearchParams(searchParams);
  }, []);

  useEffect(() => {
    if (favoriteMeter?.uuid) {
      setSearchParams({
        ...searchParams,
        favoriteMeterUuid: favoriteMeter.uuid,
        favoriteMeterName: favoriteMeter.name,
      });
    }
  }, [favoriteMeter]);

  const activeClient = clients.find(
    (client) => client.uuid === (searchParams?.['client'] as string)
  );
  const activeLocation = locations.find(
    (location) => location.uuid === (searchParams?.['location'] as string)
  );
  const activeGroup = locations
    .flatMap((location) => location.groups)
    .find((group) => group.uuid === (searchParams?.['group'] as string));
  const activeFavoriteMeter = {
    uuid: searchParams?.['favoriteMeterUuid'] as string,
    name: searchParams?.['favoriteMeterName'] as string,
  };

  useEffect(() => {
    setSelectedClient(
      activeClient
        ? {
            name: activeClient.name,
            uuid: activeClient.uuid,
            logo: activeClient.logo,
          }
        : null
    );
    setSelectedLocation(
      activeLocation
        ? { name: activeLocation.name, uuid: activeLocation.uuid }
        : null
    );
    setSelectedGroup(activeGroup || null);
    setFavoriteMeter(activeFavoriteMeter);
  }, [activeClient, activeLocation, activeGroup]);

  useEffect(() => {
    if (locationsData) {
      const sortedLocations = [...locationsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setLocations(sortedLocations);
    }

    if (user && shouldSetInitialClient(user)) {
      setDisableDropdown(true);
    }
  }, [selectedClient, locationsData, user, selectedGroup, selectedLocation]);

  const onFilterChange = (
    type: FieldType,
    value: {
      name: string;
      uuid: string;
      logo?: string;
    } | null
  ) => {
    switch (type) {
      case FieldType.CLIENT:
        setSelectedClient(value);
        setSelectedLocation(null);
        setSelectedGroup(null);
        setFavoriteMeter(null);
        setSearchParams({
          ...searchParams,
          location: null,
          group: null,
          client: value ? value.uuid : null,
          favoriteMeterUuid: null,
          favoriteMeterName: null,
        });
        break;
      case FieldType.LOCATION:
        setSelectedLocation(value);
        setSelectedGroup(null);
        setSearchParams({
          ...searchParams,
          location: value ? value.uuid : null,
          group: null,
        });
        break;
      case FieldType.GROUP:
        setSelectedGroup(value);
        setSearchParams({
          ...searchParams,
          group: value ? value.uuid : null,
        });
        break;
    }
  };

  const isComboboxDisabled =
    (searchParams?.['client'] as string) === null || selectedClient == null;

  const Items: { labelKey: string; component: JSX.Element }[] = [
    {
      labelKey: 'topRibbon.client', // from i18n
      component: (
        <ClientCombobox
          onSelect={onFilterChange}
          disableDropdown={disableDropdown}
          clients={clients}
          selectedClient={activeClient ?? selectedClient}
        />
      ),
    },
    {
      labelKey: 'topRibbon.location',
      component: (
        <LocationCombobox
          onSelect={onFilterChange}
          locations={locations}
          disabled={isComboboxDisabled}
          selectedLocation={activeLocation}
        />
      ),
    },
    {
      labelKey: 'topRibbon.group',
      component: (
        <GroupCombobox
          onSelect={onFilterChange}
          locations={locations}
          disabled={isComboboxDisabled}
          selectedGroup={activeGroup}
          selectedLocation={selectedLocation}
        />
      ),
    },
    {
      labelKey: 'topRibbon.favoriteMeters',
      component: (
        <FavoriteMeter
          selectedFavoriteMeter={searchParams?.['favoriteMeterName'] as string}
          removeSelectedFavoriteMeter={() => {
            setSearchParams({
              ...searchParams,
              favoriteMeterUuid: null,
              favoriteMeterName: null,
            });
          }}
          selectedClientUuid={
            (searchParams?.['client'] as string) || selectedClient?.uuid || null
          }
        />
      ),
    },
  ];

  return (
    <header className="flex basis-auto h-auto  z-30 justify-between max-sm:flex-col">
      <div className="mt-[1rem]  px-[.75rem] ">
        <div className="flex flex-row ">
          <div className="pl-[1rem] mt-[.25rem] items-baseline flex flex-row flex-wrap gap-10 ">
            {Items.map((item) => (
              <div
                className="flex items-center max-md:justify-between max-md:w-full"
                key={item.labelKey}
              >
                <div className="text-[.9rem] font-bold text-[#91A0B1] mr-[1rem]">
                  {t(item.labelKey)}
                </div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* User Profile */}
      <UserDropDown />
    </header>
  );
};

export default TopRibbon;
