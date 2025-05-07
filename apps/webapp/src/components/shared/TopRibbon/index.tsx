import UserDropDown from './UserDropDown';
import ClientCombobox from '../Comboboxes/ClientCombobox';
import LocationCombobox from '../Comboboxes/LocationCombobox';
import GroupCombobox from '../Comboboxes/GroupCombobox';
import { useTranslation } from 'react-i18next';
import FavoriteMeter from './FavoriteMeter';
import { useFilter } from '../../../context/useFilter';
import { useEffect, useState } from 'react';
import { useUser } from '../../../context/useUser';
import { UserType } from '../../../api/User/types';
import { useFavoriteMeter } from '../../../context/useFavoriteMeter';
import { Location, useGetLocations } from '../Comboboxes/LocationCombobox/api';
import { Client, useGetClients } from '../Comboboxes/ClientCombobox/api';

// eslint-disable-next-line react-refresh/only-export-components
export const enum FieldType {
  CLIENT = 'client',
  GROUP = 'group',
  LOCATION = 'location',
}

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
  } = useFilter();
  const { clearFavoriteMeter } = useFavoriteMeter();
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
      setClients(clientsData);
    }
  }, [clientsData, user]);

  useEffect(() => {
    if (locationsData) {
      setLocations(locationsData);
    }
    if (selectedClient?.name === null) {
      setSelectedGroup(null);
      setSelectedLocation(null);
    }
    if (
      (user && user.userType === UserType.ClientAdmin) ||
      user?.userType === UserType.LocalisationAdmin ||
      user?.userType === UserType.RegularUser ||
      user?.userType === UserType.Tenant
    ) {
      setDisableDropdown(true);
    }
    clearFavoriteMeter();
    setSelectedGroup(null);
    setSelectedLocation(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    locationsData,
    selectedClient,
    setSelectedClient,
    setSelectedGroup,
    setSelectedLocation,
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
    if (
      (user?.structureAccess?.resourceAccesses ?? []).length > 0 &&
      user?.userType === UserType.LocalisationAdmin &&
      locations
    ) {
      const filterLocationUuid = user?.structureAccess?.resourceAccesses
        ?.filter((resource) => resource.source_type === 'LOCALISATION')
        .map((resource) => resource.source_uuid);
      const filteredLocations = locations.filter((location) =>
        filterLocationUuid?.includes(location.uuid)
      );
      setLocations(filteredLocations);
    } else if (locations) {
      setLocations(locations);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          disenabled={selectedClient == null ? true : false}
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
          disenabled={selectedClient == null ? true : false}
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
