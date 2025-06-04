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
import { FieldType } from '@rhino/utils';

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
  const { setFavoriteMeter } = useFavoriteMeter();
  const [locations, setLocations] = useState<Location[]>([]);
  const { data: locationsData } = useGetLocations({
    clientId: selectedClient ? selectedClient?.uuid : null,
    queryKey: [selectedClient],
  });
  const [clients, setClients] = useState<Client[]>([]);

  const { data: clientsData } = useGetClients({
    userUuid: user ? user?.uuid : '',
  });

  useEffect(() => {
    if (clientsData) {
      const sortedClients = [...clientsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setClients(sortedClients);
    }
  }, [clientsData, user]);

  useEffect(() => {
    if (locationsData) {
      const sortedLocations = [...locationsData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setLocations(sortedLocations);
    }
    if (selectedClient?.name === null) {
      setSelectedGroup(null);
      setSelectedLocation(null);
    }
    if (user && shouldSetInitialClient(user)) {
      setDisableDropdown(true);
    }
    setSelectedGroup(null);
    setSelectedLocation(null);
    setFavoriteMeter(null);
  }, [
    locationsData,
    selectedClient,
    setSelectedClient,
    setSelectedGroup,
    setSelectedLocation,
    setFavoriteMeter,
    user,
  ]);

  useEffect(() => {
    if (
      selectedLocation !== null &&
      !locations
        ?.filter((location) => location.name === selectedLocation.name)
        .some((location) =>
          location.groups?.some((group) => group.name === selectedGroup?.name)
        )
    ) {
      setSelectedGroup(null);
    }
  }, [
    locations,
    selectedGroup?.name,
    selectedLocation,
    setSelectedGroup,
    user,
  ]);

  const onFilterChange = (
    type: FieldType,
    value: {
      name: string;
      uuid: string;
    } | null
  ) => {
    switch (type) {
      case FieldType.CLIENT:
        setSelectedClient(value);
        break;
      case FieldType.LOCATION:
        setSelectedLocation(value);
        break;
      case FieldType.GROUP:
        setSelectedGroup(value);
        break;
    }
  };

  const Items: { labelKey: string; component: JSX.Element }[] = [
    {
      labelKey: 'topRibbon.client', // from i18n
      component: (
        <ClientCombobox
          onSelect={onFilterChange}
          disableDropdown={disableDropdown}
          clients={clients}
          selectedClient={selectedClient}
        />
      ),
    },
    {
      labelKey: 'topRibbon.location',
      component: (
        <LocationCombobox
          onSelect={onFilterChange}
          locations={locations}
          disabled={selectedClient == null ? true : false}
          selectedLocation={selectedLocation}
        />
      ),
    },
    {
      labelKey: 'topRibbon.group',
      component: (
        <GroupCombobox
          onSelect={onFilterChange}
          locations={locations}
          disabled={selectedClient == null ? true : false}
          selectedGroup={selectedGroup}
          selectedLocation={selectedLocation}
        />
      ),
    },
    {
      labelKey: 'topRibbon.favoriteMeters',
      component: <FavoriteMeter />,
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
