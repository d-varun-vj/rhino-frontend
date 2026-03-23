/* eslint-disable react-hooks/exhaustive-deps */
import UserDropDown from './UserDropDown';

import { Client, Location, useGetClients, useGetLocations } from '@rhino/apis';
import { FieldType, useSearchParamsState } from '@rhino/utils';
import { useFavoriteMeter } from 'apps/webapp/src/context/favoriteMeter';
import { useUser } from 'apps/webapp/src/context/user';
import { useUserFilter } from 'apps/webapp/src/context/userFilter';
import { shouldSetInitialClient } from 'apps/webapp/src/helpers/client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClientCombobox from '../../client/ClientCombobox';
import GroupCombobox from '../../group/GroupCombobox';
import LocationCombobox from '../../location/LocationCombobox';
import FavoriteMeter from './FavoriteMeter';

type Config = {
  disabled?: boolean;
  hidden?: boolean;
  multiple?: boolean;
};

export type TopRibbonOptions = {
  client?: Omit<Config, 'hidden' | 'multiple'>;
  location?: Config;
  group?: Config;
  favoriteMeter?: Omit<Config, 'disabled' | 'multiple'>;
};

const TopRibbon = ({
  client,
  location,
  group,
  favoriteMeter: favMeter,
}: TopRibbonOptions) => {
  const { t } = useTranslation('layout');
  const { user } = useUser();
  const [disableDropdown, setDisableDropdown] = useState<boolean>(false);
  const {
    setClients: setSelectedClients,
    setLocations: setSelectedLocations,
    setGroups: setSelectedGroups,
    clients: selectedClients,
    groups: selectedGroups,
    locations: selectedLocations,
  } = useUserFilter();
  const { favoriteMeter, setFavoriteMeter } = useFavoriteMeter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchParams, setSearchParams] = useSearchParamsState(
    'routeParam',
    undefined
  );

  const selectedClientId = selectedClients?.[0]?.uuid || null;

  const { data: locationsData } = useGetLocations({
    clientId: selectedClientId,
    queryKey: [selectedClients],
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
    if (favoriteMeter?.uuid) {
      setSearchParams({
        ...searchParams,
        favoriteMeterUuid: favoriteMeter.uuid,
        favoriteMeterName: favoriteMeter.name,
      });
    }
  }, [favoriteMeter]);

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
  }, [selectedClients, locationsData, user, selectedGroups, selectedLocations]);

  const onFilterChange = (
    type: FieldType,
    values: Array<{
      name: string;
      uuid: string;
      logo?: string;
    }> | null
  ) => {
    const formatForUrl = (
      items: Array<{ uuid: string }> | null
    ): string | null => {
      if (!items || items.length === 0) return null;
      return items.map((item) => item.uuid).join(',');
    };

    switch (type) {
      case FieldType.CLIENT:
        setSelectedClients(values);
        setSelectedLocations(null);
        setSelectedGroups(null);
        setFavoriteMeter(null);
        setSearchParams({
          ...searchParams,
          location: null,
          group: null,
          client: formatForUrl(values),
          favoriteMeterUuid: null,
          favoriteMeterName: null,
        });
        break;
      case FieldType.LOCATION:
        setSelectedLocations(values);
        setSelectedGroups(null);
        setSearchParams({
          ...searchParams,
          location: formatForUrl(values),
          group: null,
        });
        break;
      case FieldType.GROUP:
        setSelectedGroups(values);
        setSearchParams({
          ...searchParams,
          group: formatForUrl(values),
        });
        break;
    }
  };

  const isComboboxDisabled =
    selectedClients == null || selectedClients.length === 0;

  const Items: {
    labelKey: string;
    component: JSX.Element;
    dataTestId?: string;
  }[] = [
    {
      labelKey: 'topRibbon.client',
      component: (
        <ClientCombobox
          onSelect={onFilterChange}
          disableDropdown={disableDropdown || client?.disabled}
          clients={clients}
          selectedClients={selectedClients}
        />
      ),
      dataTestId: 'ribbon-client-label',
    },
    ...(!location?.hidden
      ? [
          {
            labelKey: 'topRibbon.location',
            component: (
              <LocationCombobox
                onSelect={onFilterChange}
                locations={locations}
                disabled={isComboboxDisabled || location?.disabled}
                selectedLocations={selectedLocations}
                multiple={location?.multiple}
              />
            ),
            dataTestId: 'ribbon-location-label',
          },
        ]
      : []),
    ...(!group?.hidden
      ? [
          {
            labelKey: 'topRibbon.group',
            component: (
              <GroupCombobox
                onSelect={onFilterChange}
                locations={locations}
                disabled={isComboboxDisabled || group?.disabled}
                selectedGroups={selectedGroups}
                selectedLocations={selectedLocations}
                multiple={group?.multiple}
              />
            ),
            dataTestId: 'ribbon-group-label',
          },
        ]
      : []),
    ...(!favMeter?.hidden
      ? [
          {
            labelKey: 'topRibbon.favoriteMeters',
            component: (
              <FavoriteMeter
                selectedFavoriteMeter={
                  searchParams?.['favoriteMeterName'] as string
                }
                removeSelectedFavoriteMeter={() => {
                  setSearchParams({
                    ...searchParams,
                    favoriteMeterUuid: null,
                    favoriteMeterName: null,
                  });
                }}
                selectedClientUuid={selectedClients?.[0]?.uuid || null}
              />
            ),
            dataTestId: 'ribbon-favorite-meter-label',
          },
        ]
      : []),
  ];

  return (
    <header className="flex basis-auto h-auto  z-30 justify-between max-sm:flex-col">
      <div className="mt-[1rem]  px-[.75rem] ">
        <div className="flex flex-row ">
          <div
            className="pl-[1rem] mt-[.25rem] items-baseline flex flex-row flex-wrap gap-10 "
            data-testid="top-ribbon"
          >
            {Items.map((item) => (
              <div
                className="flex items-center max-md:justify-between max-md:w-full"
                key={item.labelKey}
              >
                <div
                  className="text-sm font-bold text-[#91A0B1] mr-[1rem]"
                  data-testid={item.dataTestId}
                >
                  {t(item.labelKey)}
                </div>
                {item.component}
              </div>
            ))}
          </div>
        </div>
      </div>
      <UserDropDown />
    </header>
  );
};

export default TopRibbon;
